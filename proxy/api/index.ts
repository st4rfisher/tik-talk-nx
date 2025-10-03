import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_API_URL = 'https://icherniakov.ru/yt-course';

// --- МИНИМАЛЬНЫЙ CORS ---
// Для абсолютного минимума используем "*". Если хотите ограничить —
// замените "*" на конкретный домен GitHub Pages, напр.:
// const ALLOW_ORIGIN = "https://<username>.github.io/<repo-name>";
const ALLOWED_ORIGINS = new Set([
  'http://localhost:4200',
  'https://tik-talk.github.io',
]);

function setCORS(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'null';

  // CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  const reqHeaders = req.headers['access-control-request-headers'];
  res.setHeader('Access-Control-Allow-Headers', reqHeaders ? String(reqHeaders) : 'Content-Type,Authorization');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Если фронт вдруг шлёт withCredentials:true — это обязательно
  if (allowOrigin !== 'null') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCORS(req, res)

  console.log('[HIT]', req.method, req.url, 'origin=', req.headers.origin);

  if (req.method === 'OPTIONS') {
    // вернём диагностический JSON вместо пустого 204
    return res.status(200).send({
      note: 'This is a preflight OPTIONS response',
      method: req.method,
      url: req.url,
      origin: req.headers.origin,
      requestHeaders: req.headers['access-control-request-headers'] || null,
    });
  }

  // на любой другой запрос тоже вернём JSON-эхо
  return res.status(200).send({
    note: 'This is a diagnostic proxy response',
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    headers: req.headers,
    body: req.body || null,
  });


  const origin = req.headers.origin || '';
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'null';

  // Если фронт вдруг шлёт withCredentials:true — это обязательно
  // if (allowOrigin !== 'null') {
  //   res.setHeader('Access-Control-Allow-Credentials', 'true');
  // }

  // Собираем целевой URL: всё, что идёт после /api/proxy, добавляем к BASE_API_URL
  const originalUrl = req.url || '/';
  const pathAndQuery = originalUrl.replace(/^\/api/, '') || '/';
  const targetUrl = BASE_API_URL + pathAndQuery;
  const authHeader = req.headers['authorization'];
  console.log(pathAndQuery)
  // if (!authHeader || !/^Bearer\s+.+/i.test(String(authHeader))) {
  //   // Т.к. токен должен ставить твой интерсептор — без него смысла нет
  //   return res.status(401).json({ error: 'Missing or invalid Authorization Bearer token' });
  // }

  // Готовим тело (для не-GET запросов)
  const hasBody = !['GET', 'HEAD'].includes((req.method || 'GET').toUpperCase());
  const body =
    hasBody
      ? (typeof req.body === 'string' || Buffer.isBuffer(req.body))
          ? (req.body as any)
          : JSON.stringify(req.body ?? {})
      : undefined;

  try {
    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Authorization': String(authHeader),
        // Прокинем тип контента, если он есть у запроса
        ...(req.headers['content-type'] ? { 'Content-Type': String(req.headers['content-type']) } : {}),
        // На всякий случай нормальный Accept
        'Accept': 'application/json, */*',
      },
      body,
      redirect: 'manual',
    });

    const buf = Buffer.from(await upstream.arrayBuffer());
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';

    res.status(upstream.status);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store');
    res.send(buf);

    // console.log(res)
  } catch (e) {
    res.status(502).json({ error: 'Bad gateway' });
    // console.log(e)
  }
}




