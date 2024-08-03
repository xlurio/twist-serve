import { UserRole } from '@/types/http/token';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export const config = {
  matcher: ['/my-matches/(.*)', '/my-tournaments/(.*)', '/tournaments/create/'],
};

export function middleware(request: NextRequest) {
  const isAuthenticated =
    request.cookies.get('token') || request.cookies.get('refresh');

  if (isAuthenticated) {
    return _checkRole(request);
  }
  return NextResponse.redirect(new URL('/login/', request.url));
}

function _checkRole(request: NextRequest) {
  const isPlayer =
    (request.cookies.get('role') as unknown as UserRole | string) ===
    UserRole.PLAYER;
  const isPathAnAdminSection = request.nextUrl.pathname.startsWith(
    '/tournaments/create/'
  );
  const isAPlayerAccessingAAdminSection = isPlayer && isPathAnAdminSection;

  if (isAPlayerAccessingAAdminSection) {
    return NextResponse.redirect(new URL('/forbidden/', request.url));
  }

  return NextResponse.next();
}
