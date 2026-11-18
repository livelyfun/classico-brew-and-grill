import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const configuredAdminPath = (
    process.env.ADMIN_PATH?.trim() || '/classic-admin'
  ).replace(/\/$/, '');

  // If ADMIN_PATH in .env is customized away from /classic-admin:
  // 1) Block direct hits to /classic-admin so the custom hidden path is enforced
  // 2) Rewrite custom path requests to the internal /classic-admin route
  if (configuredAdminPath !== '/classic-admin') {
    if (
      pathname === '/classic-admin' ||
      pathname.startsWith('/classic-admin/')
    ) {
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }
    if (
      pathname === configuredAdminPath ||
      pathname.startsWith(`${configuredAdminPath}/`)
    ) {
      const targetPath = pathname.replace(
        configuredAdminPath,
        '/classic-admin'
      );
      return NextResponse.rewrite(new URL(targetPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
