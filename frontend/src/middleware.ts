import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"
import { Token } from "./interfaces"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")
  const redirecionamento = new URL("/auth/login", request.url)
  if(!token) {
    return NextResponse.redirect(redirecionamento)
  }
  const tokenDecodificado:Token = jwtDecode(token.value)
  const rotaAtual = request.nextUrl.pathname
  console.log(rotaAtual)
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/encaminhar/:path*",

    "/profissional/editar-profissional/:path*",
    
    "/recepcao/cadastrar-profissional/:path",
    "/recepcao/encaminhamentos",
    "/recepcao/encaminhamentos/:path*",
    "/recepcao/gerar-senha",
    "/recepcao/gerenciar-profissionais",
    "/recepcao/novo-profissional",
  ]
}