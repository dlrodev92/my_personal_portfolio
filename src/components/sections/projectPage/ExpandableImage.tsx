interface ExpandableImageProps {
  src: string;
  alt: string;
  description: string;
  index: number;
  className?: string;
  onClick: () => void;
}

const ExpandableImage = ({
  src,
  alt,
  description,
  className,
  onClick,
}: ExpandableImageProps) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer ${className || ''}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end opacity-0 group-hover:opacity-100">
        <div className="p-6 text-white">
          <p className="font-body text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      <button
        onClick={onClick}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M15 3h6v6" />
          <path d="M10 14L21 3" />
          <path d="M9 21H3v-6" />
          <path d="M14 10L3 21" />
        </svg>
      </button>
    </div>
  );
};

export default ExpandableImage;
