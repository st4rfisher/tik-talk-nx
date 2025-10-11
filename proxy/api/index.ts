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
  // const username = process.env.API_USER;
  // const password = process.env.API_PASSWORD;
  // console.log(username, password)

  setCORS(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const path = (req.url || '').replace(/^\/api\/login/, '') || '/';
    const targetUrl = TARGET_BASE + path;
    console.log(targetUrl)
    if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer ')) {
      if (!['GET', 'HEAD'].includes((req.method || '').toUpperCase())) {
      let rawBody: any = (req as any).body;
      let body: string | undefined;

      if (!rawBody) {
        const text = await new Promise<string>((resolve) => {
          let data = '';
          req.on('data', (chunk) => (data += chunk));
          req.on('end', () => resolve(data));
        });
        try {
          rawBody = text ? JSON.parse(text) : {};
        } catch {
          // если не JSON — передаём как есть
          rawBody = text;
        }
      }

      if (rawBody !== null) {
        // если username === null или пустая строка -> подставляем из env
        rawBody.username = process.env.API_USER ?? rawBody.username;
        rawBody.password = process.env.API_PASSWORD ?? rawBody.password;

        console.log('Login body after substitution:', {
          username: rawBody.username,
          password: rawBody.password
        });

        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(rawBody)) {
          if (typeof value !== 'undefined' && value !== null) {
            params.append(key, String(value));
          }
        }
        body = params.toString();
      }

      const upstream = await fetch(targetUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain, */*'
        },
        body,
        // redirect: 'manual'
      });

      console.log("upstream", upstream)

      const contentType = upstream.headers.get('content-type') || 'application/json';
      const responseText = await upstream.text();


      res.setHeader('Content-Type', contentType);
      return res.status(upstream.status).send(responseText);
    }
    } else {
      const path = (req.url || '').replace(/^\/api/, '') || '/';
      const targetUrl = TARGET_BASE + path;
      console.log(targetUrl)
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
    }
  } catch (err: any) {
    console.log(err)
    res.status(502).json({
      error: 'Proxy failed',
      details: err.message
    });
  }
}
