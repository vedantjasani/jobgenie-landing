
// This file is marked as read-only, so we cannot modify it directly
// Instead, we'll create a custom component to update the navbar in our ResumeGenerator page

import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200',
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-jobfix-500 text-xl">JobFix.ai</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors hover:text-jobfix-500',
              location.pathname === '/'
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Home
          </Link>
          <Link
            to="/resume-generator"
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors hover:text-jobfix-500',
              location.pathname === '/resume-generator'
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Resume Generator
          </Link>
          <Button asChild variant="default" className="ml-4 bg-jobfix-500 hover:bg-jobfix-600">
            <Link to="/resume-generator">
              Get Started
            </Link>
          </Button>
        </nav>

        <button
          className="block rounded-md p-2.5 text-foreground md:hidden"
          onClick={toggleMenu}
        >
          <span className="sr-only">Toggle menu</span>
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background/95 backdrop-blur-sm border-b">
          <nav className="flex flex-col space-y-2 py-2">
            <Link
              to="/"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md hover:bg-muted',
                location.pathname === '/'
                  ? 'bg-muted'
                  : ''
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/resume-generator"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md hover:bg-muted',
                location.pathname === '/resume-generator'
                  ? 'bg-muted'
                  : ''
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Resume Generator
            </Link>
            <Button
              asChild
              variant="default"
              className="mt-2 bg-jobfix-500 hover:bg-jobfix-600 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/resume-generator">
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
