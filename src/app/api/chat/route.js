import { systemPrompt } from '@/config/ChatPrompt';
import * as z from 'zod';

export const runtime = 'nodejs';

/* ---------------- RATE LIMIT ---------------- */

const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function getClientIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(clientIP) {
  const now = Date.now();
  const data = rateLimitStore.get(clientIP);

  if (!data || now > data.resetTime) {
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (data.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  data.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - data.count,
  };
}

/* ---------------- VALIDATION ---------------- */

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        parts: z.array(z.object({ text: z.string() })),
      }),
    )
    .optional()
    .default([]),
});

function sanitizeInput(input) {
  return input
    .replace(/ignore previous instructions|system prompt|act as/gi, '[REDACTED]')
    .trim()
    .slice(0, 2000);
}

/* ---------------- POST ---------------- */

export async function POST(request) {
  try {
    const rate = checkRateLimit(getClientIP(request));
    if (!rate.allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY missing');
    }

    const body = chatSchema.parse(await request.json());

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            {
              role: 'model',
              parts: [{ text: 'I will act as your portfolio assistant.' }],
            },
            ...body.history,
            {
              role: 'user',
              parts: [{ text: sanitizeInput(body.message) }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      },
    );

    if (!geminiRes.body) {
      throw new Error('No Gemini stream');
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiRes.body.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          // Gemini sends JSON objects per chunk
          const matches = chunk.match(/{[\s\S]*?}/g) || [];

          for (const raw of matches) {
            try {
              const json = JSON.parse(raw);
              const text =
                json?.candidates?.[0]?.content?.parts?.[0]?.text;

              if (text) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ text })}\n\n`,
                  ),
                );
              }
            } catch {
              // ignore malformed partials
            }
          }
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`),
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('CHAT API ERROR:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 },
    );
  }
}

/* ---------------- GET ---------------- */

export async function GET() {
  return new Response('Method Not Allowed', { status: 405 });
}
