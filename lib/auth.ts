import { cookies } from 'next/headers';

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');
  return authCookie?.value === 'true';
}

export function authenticate(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  return password === adminPassword;
}