import { VercelRequest, VercelRequestBody, VercelResponse } from '@vercel/node';
import { BaseProxy } from './baseProxy';
//@ts-ignore
import { endPoints } from '../../global/variables';
import { Credentials } from '../interfaces/proxy.interface';

export class ApiProxy extends BaseProxy {
  constructor() {
    super(endPoints)
  }

  setCredentials(body: VercelRequestBody, credentials: Credentials | undefined) {
    body.username = credentials?.username
    body.password = credentials?.password

    console.log('Login body after substitution:', {
      username: body.username,
      password: body.password
    });
  }


  async handle(req: VercelRequest, res: VercelResponse) {
    const hasAuthorization = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
    const hasBody = !['GET', 'HEAD', 'OPTIONS'].includes((req.method as string).toUpperCase());

    if (!hasAuthorization && req.method==="POST") {
      const loginUrl = this.buildUrl(req.url as string, '/api/login')
      const params = new URLSearchParams();
      console.log('req.method', req.method)
      console.log('req.body до', req.body)

      this.setCredentials(req.body, {
        username: process.env.API_USER,
        password: process.env.API_PASSWORD}
      )

      for (let [key, value] of Object.entries(req.body)) {
        if (typeof value !== 'undefined' && value !== null) {
          params.append(key, String(value));
        }
      }

      const upstream = await this.generateUpstream(loginUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain, */*'
        },
        body: params.toString()
      })

        const data = await upstream.text();
        return res.status(upstream.status).send(data);
    } else {
      const apiUrl = this.buildUrl(req.url as string, '/api')
      const upstream = await this.generateUpstream(apiUrl, {
        method: req.method,
        headers: {
          'Authorization': req.headers['authorization']!,
          'Content-Type': req.headers['content-type'] || 'application/json',
          'Accept': req.headers['accept'] || 'application/json, text/plain, */*'
        },
        body: hasBody ? JSON.stringify(req.body) : undefined
      })
      const data = await upstream.text();
      return res.status(upstream.status).send(data);
    }
  }
}
