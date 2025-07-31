import { useState } from 'react';
import NavLink from './NavLink';
import MobileNav from './MobileNav';
import MobileMenuButton from './MobileMenuButton';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/playground', label: 'Playground' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] nav-container backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="font-display text-xl text-black hover:text-text-muted transition-colors"
            >
              Your Name
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
               <a 
                href="/cv.pdf"
                download="David_Rodriguez_CV.pdf"
                className="inline-flex items-center gap-2 bg-black text-white text-xs font-display font-bold px-4 py-2 rounded-lg hover:bg-text-secondary transition-all duration-300 transform hover:scale-105 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              toggle={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        links={navigationLinks}
        onClose={closeMobileMenu}
      />
    </nav>
  );
};

export default Navigation;
