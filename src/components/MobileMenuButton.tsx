// components/MobileMenuButton.tsx
interface MobileMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

const MobileMenuButton = ({ isOpen, toggle }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={toggle}
      className="relative w-8 h-8 flex items-center justify-center group"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {/* Bar 1 */}
      <span
        className={`absolute h-0.5 w-6 bg-current transition-transform duration-500 ease-in-out 
            ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
      />
      {/* Bar 2 */}
      <span
        className={`absolute h-0.5 w-6 bg-current transition-opacity duration-200 ease-in-out 
            ${isOpen ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* Bar 3 */}
      <span
        className={`absolute h-0.5 w-6 bg-current transition-transform duration-500 ease-in-out 
            ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
      />
    </button>
  );
};

export default MobileMenuButton;
