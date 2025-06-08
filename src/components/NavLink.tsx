interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ href, children, onClick, className = '' }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={`nav-link font-display  text-black px-3 py-2 rounded-md text-sm transition-all duration-300 relative overflow-hidden hover:text-text-muted md:text-[18px] lg:text-[20px] ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavLink;
