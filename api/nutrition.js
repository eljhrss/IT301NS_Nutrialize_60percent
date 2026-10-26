module.exports = async function handler(req, res) {
  try {
    const params = new URLSearchParams(req.query);
    params.set('json', '1');

    const url = `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Nutrialize/1.0 (your-real-email@gmail.com)' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Open Food Facts error' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Could not reach Open Food Facts' });
  }
};
