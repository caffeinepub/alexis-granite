import { Link, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import LoginButton from './LoginButton';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Alexis Granite</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                currentPath === '/' ? 'text-amber-600' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            {currentPath === '/' ? (
              <a
                href="#contact"
                onClick={scrollToContact}
                className="text-sm font-medium transition-colors hover:text-amber-600"
              >
                Get Estimate
              </a>
            ) : (
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-amber-600"
              >
                Get Estimate
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  currentPath === '/dashboard' ? 'text-amber-600' : 'text-foreground'
                }`}
              >
                Dashboard
              </Link>
            )}
            <LoginButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
              <Link
                to="/"
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {currentPath === '/' ? (
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="text-sm font-medium"
                >
                  Get Estimate
                </a>
              ) : (
                <Link
                  to="/"
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Estimate
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-2">
                <LoginButton />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <div className="mb-2 text-lg font-semibold">Alexis Granite</div>
              <div className="text-sm text-slate-400">
                Premium granite craftsmanship • Free estimates • Travel anywhere
              </div>
            </div>
            <div className="text-center text-sm text-slate-400 md:text-right">
              <div>© {new Date().getFullYear()} All rights reserved</div>
              <div className="mt-1">
                Built with{' '}
                <span className="text-red-400">♥</span> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.hostname : 'alexis-granite'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  caffeine.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
