import { accessGuard } from "./lib/auth/access.guard"
// import { accessGuard } from "./lib/data/auth/access.guard"
import { authTokenInterceptor } from "./lib/auth/auth.interceptor"
// import { authTokenInterceptor } from "./lib/data/auth/auth.interceptor"
import { AuthService } from "./lib/auth/auth.service"
// import { AuthService } from "./lib/data/auth/auth.service"
// export * from './lib/data';
export * from './lib/feature-login'

export {
  accessGuard,
  authTokenInterceptor,
  AuthService
}
