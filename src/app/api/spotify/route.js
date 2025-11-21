async function getAccessToken() {
  const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/spotify/refresh`);
  const data = await refreshRes.json();
  return data.access_token;
}

export async function GET() {
  const token = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/me/player", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204 || res.status > 400) {
    return Response.json({ isPlaying: false });
  }

  const player = await res.json();

  if (!player.item) {
    return Response.json({ isPlaying: false });
  }

  return Response.json({
    isPlaying: player.is_playing,
    title: player.item.name,
    artist: player.item.artists.map((a) => a.name).join(", "),
    album: player.item.album.name,
    albumImageUrl: player.item.album.images[0].url,
    spotifyUrl: player.item.external_urls.spotify,
  });
}
