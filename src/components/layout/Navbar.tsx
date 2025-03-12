
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm py-3 dark:bg-jobfix-900/80" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img 
              src="/lovable-uploads/61a2ae97-5eb9-4749-9f10-377cb20c0e56.png" 
              alt="JobFix.ai" 
              className="h-8 mr-2" 
            />
            <span className="text-xl font-bold text-jobfix-900 dark:text-white">jobfix<span className="text-jobfix-600">.ai</span></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-jobfix-600 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-jobfix-600 transition-colors">
              Features
            </a>
            <a href="#faq" className="text-sm font-medium text-foreground/80 hover:text-jobfix-600 transition-colors">
              FAQ
            </a>
            <Button asChild className="bg-jobfix-600 hover:bg-jobfix-700 text-white">
              <a href="#waitlist">Join Waitlist</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 dark:text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white dark:bg-jobfix-900 shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-[400px] border-t" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <a 
            href="#how-it-works" 
            className="block py-2 text-foreground/80 hover:text-jobfix-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#features" 
            className="block py-2 text-foreground/80 hover:text-jobfix-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#faq" 
            className="block py-2 text-foreground/80 hover:text-jobfix-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </a>
          <Button 
            asChild 
            className="w-full bg-jobfix-600 hover:bg-jobfix-700 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <a href="#waitlist">Join Waitlist</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
