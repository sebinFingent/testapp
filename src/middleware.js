import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware hit: ', request.nextUrl.pathname);
  const role = request.cookies.get('role').value || 'guest';

  console.log("acl",JSON.parse(role))

  // redirect on restricted routes
  if (JSON.parse(role).includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/graphql', request.url));
  }
  
  // Let other routes pass
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/toaster','/calander/*path'],
};