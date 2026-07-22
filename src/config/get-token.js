const clientId = "08997816bb7a42cb9a5a0d429de7c2ef";
const clientSecret = "a946309bcd924c2b950cd21ba3f48d37";
const redirectUri = "http://127.0.0.1:8888/callback";

const code =
  "AQAHWwIcgbvWT-xgkENUVNosGfASL6ckzdEGtN2ooH7Rl_DnOS8NDeR5RmjFIhfLl8A3nVDr4ebNmrgwDTD9Tmcw_aVxPUvMO_gfrqVq5EgIVb7gu_w4qcQ8Hfa7hODa3LeCkAHe36MwcW-xP4QvDdzRnL33QE896pi46RCpYyiM_fuqE8uEay0awH3so7G-gQuVFYgenOXvJttbvhYtiAm7Fz2Xzor9Q-9MHdeLiSlGgYitCftNGQa5QmEfPukirKudVpF1aXBstgWKao0NdCZFFlp4PoQEbKunNBhaRWA";

async function main() {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await res.json();
  console.log(data);
}

main();
