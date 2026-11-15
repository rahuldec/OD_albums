export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return res.status(200).json({ count: null });

  try {
    const r    = await fetch(`${url}/incr/od-albums-visits`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await r.json();
    res.json({ count: data.result ?? null });
  } catch {
    res.json({ count: null });
  }
}
