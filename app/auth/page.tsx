import { AuthForm } from '@/components/auth-form';

export const metadata = {
  title: 'Authentication | DrasticCoder',
};

export default function AuthPage() {
  return (
    <div className="container flex items-center justify-center py-12">
      <AuthForm />
    </div>
  );
}