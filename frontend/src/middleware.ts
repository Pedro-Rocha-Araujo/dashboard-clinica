import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"
import { Token } from "./interfaces"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")
  const redirecionarLogin = new URL("/auth/login", request.url)
  const redirecionarHome = new URL("/", request.url)
  if(!token) {
    return NextResponse.redirect(redirecionarLogin)
  }
  const tokenDecodificado:Token = jwtDecode(token.value)
  const rotaAtual = request.nextUrl.pathname
  if(tokenDecodificado.tipo === "PROFISSIONAL" && rotaAtual.startsWith("/recepcao/")) {
    return NextResponse.redirect(redirecionarHome)
  }
  if(tokenDecodificado.tipo === "RECEPCAO" && rotaAtual.startsWith("/profissional/")) {
    return NextResponse.redirect(redirecionarHome)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    
    "/profissional/editar-profissional/:path*",
    
    "/recepcao/encaminhar/:path*",
    "/recepcao/cadastrar-profissional/:path",
    "/recepcao/encaminhamentos",
    "/recepcao/encaminhamentos/:path*",
    "/recepcao/gerar-senha",
    "/recepcao/gerenciar-profissionais",
    "/recepcao/novo-profissional",
  ]
}