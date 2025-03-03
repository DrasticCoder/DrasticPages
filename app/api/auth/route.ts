
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  if (authenticate(password)) {
    const cookieStore = cookies();
    cookieStore.set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json(
    { success: false, message: 'Invalid password' },
    { status: 401 }
  );
}