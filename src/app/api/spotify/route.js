export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getAccessToken() {
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    throw new Error("Spotify env vars missing");
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Token refresh failed");

  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      return Response.json({ isPlaying: false });
    }

    const player = await res.json();
    if (!player?.item) {
      return Response.json({ isPlaying: false });
    }

    return Response.json({
      isPlaying: player.is_playing,
      title: player.item.name,
      artist: player.item.artists.map(a => a.name).join(", "),
      album: player.item.album.name,
      albumImageUrl: player.item.album.images[0].url,
      spotifyUrl: player.item.external_urls.spotify,
    });
  } catch (err) {
    console.error("Spotify route error:", err);
    return Response.json({ isPlaying: false });
  }
}
