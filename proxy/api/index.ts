import type { VercelRequest, VercelResponse } from '@vercel/node';
import { BaseProxy } from './baseProxy';
import { ApiProxy } from './apiProxy';
//@ts-ignore
import { endPoints } from './endpoints';

const baseProxy = new BaseProxy(endPoints)
const apiProxy = new ApiProxy()

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const allowOrigin = endPoints.allowOrigins.has(request.headers.origin as string)
    ? request.headers.origin
    : 'null';

  baseProxy.setHeaders(response, {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': allowOrigin as string,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization'
  })

  if (request.method === 'OPTIONS') {
    response.status(204).end();
  }

  try {
    apiProxy.handle(request, response)
  } catch (error: any) {
    console.log('Ошибка: ', error)
    response.status(502).json({
      error: 'Ошибка Proxy',
      details: error.message
    });
  }
}
