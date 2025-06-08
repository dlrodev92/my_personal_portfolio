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
    <nav className="fixed top-0 left-0 right-0 z-50 nav-container backdrop-blur-sm">
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
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenuButton isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />
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