import MobileNavlink from './MobileNavlink';

interface MobileNavProps {
  isOpen: boolean;
  links: { href: string; label: string }[];
  onClose: () => void;
}

const MobileNav = ({ isOpen, links, onClose }: MobileNavProps) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden transform md:hidden ${
        isOpen
          ? 'max-h-96 scale-100 blur-0 opacity-100'
          : 'blur-sm max-h-0 opacity-0 scale-95 pointer-events-none'
      }`}
      id="mobile-menu"
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface border-t border-border">
        {links.map((link) => (
          <MobileNavlink
            key={link.href}
            href={link.href}
            onClick={onClose}
            className=""
          >
            {link.label}
          </MobileNavlink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
