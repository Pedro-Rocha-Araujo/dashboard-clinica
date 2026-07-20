import type { TokenPayload } from "./interfacesToken.ts"

declare global {
    namespace Express {
        interface Request {
            usuario: TokenPayload
        }
    }
}

export {}