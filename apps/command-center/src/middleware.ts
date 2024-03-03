import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { GetEmployeeAccessPayload } from '@/server/actions';
import { GetApiVersion, GetShop } from '@/client/api';

const PAGES = {
  LOGIN: '/auth/login',
  DASHBOARD: '/dashboard',
  INSTALL: '/install',
  ERROR: '/error',
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();

  // Check API Version: is it healthy?
  const apiVersion = await GetApiVersion();
  if (!apiVersion?.ok || !apiVersion?.version) {
    // Api is not good...
    const isOnErrorPage = request.nextUrl.pathname.startsWith(PAGES.ERROR);

    if (!isOnErrorPage) {
      const errorMessage = 'Main API is not responding';
      return NextResponse.redirect(
        new URL(`${PAGES.ERROR}?message=${errorMessage}`, request.url),
      );
    }

    return response;
  }

  // Check if shop is OK
  const shop = await GetShop();
  if (!shop) {
    const isOnInstallPage = request.nextUrl.pathname.startsWith(PAGES.INSTALL);
    if (!isOnInstallPage) {
      return NextResponse.redirect(new URL(PAGES.INSTALL, request.url));
    }

    return response;
  }

  // Need to log in?
  const isOnLoginPage = request.nextUrl.pathname.startsWith(PAGES.LOGIN);
  let isLoggedIn = false;

  try {
    const employeePayload = await GetEmployeeAccessPayload();
    isLoggedIn = !!employeePayload.user;
  } catch (err) {
    // No Auth?
  }

  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL(PAGES.DASHBOARD, request.url));
  }
  if (!isOnLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
  }

  return response;
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - website-api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - static (folder in public)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!website-api|_next/static|_next/image|static|favicon.ico).*)'],
};
