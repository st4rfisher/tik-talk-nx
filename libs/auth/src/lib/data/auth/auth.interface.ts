export interface TokenResponse {
  access_token: string | null,
  refresh_token: string | null
}

export interface loginData {
  username: string,
  password: string
}
