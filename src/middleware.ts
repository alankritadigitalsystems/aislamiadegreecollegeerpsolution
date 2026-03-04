import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { roleAccess } from "./lib/roleAccess";

function getUserRole(req: NextRequest): string | null {
  const role = req.cookies.get("userRole")?.value;
  return role || null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userRole = getUserRole(req);
  if (
   pathname.startsWith("/_next") ||
   pathname.startsWith("/static") ||
  pathname === "/favicon.ico"
) {
  return NextResponse.next();
}
  const isPublic = roleAccess.public.some((route) =>
    pathname.startsWith(route)
  );
  if (isPublic) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/v2/")) {
  return NextResponse.next();
}
  if (pathname.startsWith("/api/v2/")) {
  return NextResponse.next();
}
  if (!userRole) {
    const url = req.nextUrl.clone();
    url.pathname = "/erp/login";
    return NextResponse.redirect(url);
  }

  const allowedRoutes = roleAccess[userRole as keyof typeof roleAccess];
  if (!allowedRoutes) {
    const url = req.nextUrl.clone();
    url.pathname = "/notfound";
    return NextResponse.redirect(url);
  }

  const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));
  if (!isAllowed) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
