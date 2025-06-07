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
      className={`nav-link ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavLink;