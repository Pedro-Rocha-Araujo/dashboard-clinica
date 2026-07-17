import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")
  const redirecionamento = new URL("/auth/login", request.url)
  if(!token) {
    return NextResponse.redirect(redirecionamento)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/editar-profissional/:path*",
    "/encaminhamentos/:path*",
    "/encaminhar/:path*",
    "/gerar-senha",
    "/gerenciar-profissionais",
    "/novo-profissional",
  ]
}