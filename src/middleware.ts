import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get("ci-session")?.value

  const protectedPaths = ["/admin", "/cleaner-portal", "/my-account"]

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtected && !token) {
    // Admin goes to its own separate login page
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/admin-signin", request.url))
    }

    let role = "customer"
    if (pathname.startsWith("/cleaner-portal")) role = "cleaner"

    const loginUrl = new URL("/auth/signin", request.url)
    loginUrl.searchParams.set("role", role)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/cleaner-portal/:path*", "/my-account/:path*"],
}
