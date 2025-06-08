interface MobileNavlinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const MobileNavlink = ({
  href,
  children,
  onClick,
  className,
}: MobileNavlinkProps) => {
  return (
    <a
      href={href}
      className={`font-display text-black hover:text-text-muted hover:bg-interactive block px-3 py-2 rounded-md text-base transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default MobileNavlink;
