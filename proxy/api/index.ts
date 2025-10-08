import type { VercelRequest, VercelResponse } from '@vercel/node';

const TARGET_BASE = 'https://icherniakov.ru/yt-course';
const ALLOWED_ORIGINS = new Set([
  'http://localhost:4200'
]);

function setCORS(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'null';

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');
  // res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
}

//формируем конечный URL для внешнего API
function generateRequest(req: VercelRequest) {

}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const username = process.env.API_USER;
  const password = process.env.API_PASSWORD;
  console.log(username, password)
  
  setCORS(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (
      (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer '))

    ) {
      return res.status(401).json({
        error: 'Missing or invalid Authorization header'
      });
    }

    const path = (req.url || '').replace(/^\/api/, '') || '/';
    const targetUrl = TARGET_BASE + path;
    const hasBody = !['GET', 'HEAD'].includes((req.method || '').toUpperCase());
    const body = hasBody ? JSON.stringify((req as any).body || {}) : undefined;

    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Authorization': req.headers['authorization'],
        'Content-Type': req.headers['content-type'] || 'application/json' || 'image/jpeg',
        'Accept': 'application/json, text/plain, */*'
      },
      body
    });

    const text = await upstream.text();
    console.log('Request done')
    return res.status(upstream.status).send(text);

  } catch (err: any) {
    res.status(502).json({
      error: 'Proxy failed',
      details: err.message
    });
  }
}
