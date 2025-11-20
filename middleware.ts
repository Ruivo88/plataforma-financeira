import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthPage = req.nextUrl.pathname === '/login'
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isRoot = req.nextUrl.pathname === '/'

  // Se está na raiz, redireciona baseado na sessão
  if (isRoot) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    } else {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Se está na página de login e já está autenticado, redireciona para dashboard
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Se está tentando acessar dashboard sem estar autenticado, redireciona para login
  if (isDashboard && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}
