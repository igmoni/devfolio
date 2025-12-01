import { NextRequest, NextResponse } from "next/server";
import * as z from 'zod'

const rateLimitStore = new Map()


const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  message: z.string().min(10).max(1000),
});

function getClientIP(request) {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip')

    if(forwarded) {
        return forwarded.split(',')[0].trim()
    }
    if(realIP) {
        return realIP
    }

    if(cfConnectingIP) {
        return cfConnectingIP
    }

    return 'unknown'
}

function checkRateLimit(clientIP) {
    const now = Date.now()

    const clientData = rateLimitStore.get(clientIP)

    if(!clientData || now > clientData.resetTime) {
        
    }
}