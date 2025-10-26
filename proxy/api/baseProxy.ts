import type { VercelResponse } from '@vercel/node';
import type { Endpoints, ProxyRequestBody } from './proxy.interface';
//@ts-ignore
import { replacePrefix } from "../../libs/shared/src/index"

export class BaseProxy {
  protected targetUrl: string;
  protected allowOrigins: Set<string>;

  constructor(endPoints: Endpoints) {
    this.targetUrl = endPoints.targetUrl;
    this.allowOrigins = endPoints.allowOrigins
  }

  setHeaders(
    response: VercelResponse,
    headers: Record<string, string>
  ) {
    for (const [key, value] of Object.entries(headers)) {
      response.setHeader(key, value);
    }
  }

  buildUrl(path: string, prefix: string = ''): string {
    const segment = replacePrefix(path, prefix);
    return this.targetUrl + segment;
  }

  async generateUpstream(targetUrl: string, requestFields: ProxyRequestBody) {
    return await fetch(targetUrl, {
      method: requestFields.method,
      headers: requestFields.headers,
      body: requestFields?.body || undefined
    }) ;
  }
}
