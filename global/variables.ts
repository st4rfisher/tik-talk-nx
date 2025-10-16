import { Endpoints } from "../proxy/interfaces/proxy.interface";

// export const BASE_API_URL = 'https://icherniakov.ru/yt-course';
export const endPoints: Endpoints  = {
  targetUrl: 'https://icherniakov.ru/yt-course',
  allowOrigins: new Set([
    'http://localhost:4200',
    'https://tik-talk-demo.vercel.app'
  ])
}
