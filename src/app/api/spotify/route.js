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

  if (!res.ok) {
    throw new Error("Refresh token failed or expired");
  }

  return data.access_token;
}


export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch(
      "https://api.spotify.com/v1/me/player",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    // Spotify returns 204 when there is no active playback.
    if (res.status === 204) {
      return Response.json({ isPlaying: false });
    }

    // Read the body as text first so non-JSON responses
    // do not crash the route.
    const body = await res.text();

    if (!res.ok) {
      console.error("Spotify API error:", {
        status: res.status,
        body,
      });

      return Response.json(
        { isPlaying: false },
        { status: 200 }
      );
    }

    let player;

    try {
      player = JSON.parse(body);
    } catch {
      console.error(
        "Spotify returned a non-JSON response:",
        body
      );

      return Response.json({ isPlaying: false });
    }

    if (!player?.item) {
      return Response.json({ isPlaying: false });
    }

    return Response.json({
      isPlaying: player.is_playing,
      title: player.item.name,
      artist: player.item.artists
        .map((a) => a.name)
        .join(", "),
      album: player.item.album.name,
      albumImageUrl:
        player.item.album.images?.[0]?.url ?? null,
      spotifyUrl:
        player.item.external_urls?.spotify ?? null,
    });
  } catch (err) {
    console.error("Spotify route error:", err);

    return Response.json({ isPlaying: false });
  }
}

