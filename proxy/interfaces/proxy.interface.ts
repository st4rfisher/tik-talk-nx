export interface Endpoints {
  targetUrl: string;
  allowOrigins: Set<string>;
}

export interface ProxyRequestBody {
  method: string | undefined,
  headers: Record<string, string>;
  body: string | BodyInit | FormData | URLSearchParams | undefined //???
}

export type Credentials = {
  username: string | undefined,
  password: string | undefined
}
