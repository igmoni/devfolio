export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json({ error: "No code provided " }, { status: 400 });
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    // redirect_uri: "http://127.0.0.1:8888/callback",
    redirect_uri: "https://monxdev.vercel.app/api/spotify/callback",
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
        Authorization: "Basic " + Buffer.from( `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params
  })

  const data = await res.json()

  return Response.json(data)
}
