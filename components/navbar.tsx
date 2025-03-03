import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Code } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold">DrasticCoder</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link 
              href="https://drasticcoder.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Website
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}