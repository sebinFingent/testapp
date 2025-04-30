export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore =await  cookies();

  cookieStore.set('role', JSON.stringify(ACL), {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ message: 'Cookie set!' });
}

const ACL = [
    '/admin',
    '/calander',
    '/toaster'
  ]