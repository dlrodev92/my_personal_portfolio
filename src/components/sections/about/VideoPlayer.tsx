import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function VideoPlayer({
  videoUrl = '/PERSONAL_VIDEO.mp4',
  posterUrl = '/davidVideoCover.webp',
  title = 'Meet David',
  description = 'Full-stack developer from Spain, now in London',
  autoplay = false, // desactivado por defecto
  loop = false,
  muted = false, // sonido activado
}: VideoPlayerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ESC para cerrar modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  // Play video manualmente al abrir
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.muted = muted; // set mute
      videoRef.current.play().catch((err) => {
        console.warn('El navegador bloqueó la reproducción automática:', err);
      });
    }
  }, [isModalOpen, muted]);

  return (
    <>
      {/* Vista previa */}
      <div className="relative max-w-sm mx-auto">
        <div className="aspect-[9/16] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterUrl})` }}
          >
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

            {/* Contenido + botón */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center space-y-4">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 cursor-pointer relative z-30"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-white drop-shadow">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-200">{description}</p>
                  <p className="text-xs text-gray-300">Tap to watch</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Etiqueta inferior */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">👋 A quick intro from London</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <div
            className="absolute w-[90%] max-w-md aspect-[9/14] z-50 rounded-3xl overflow-hidden shadow-2xl scale-105 bg-black"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Botón cerrar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              className="absolute top-2 right-2 z-50 p-2 rounded-full bg-white/80 hover:bg-white transition-all"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Reproductor de video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              loop={loop}
              poster={posterUrl}
              muted={muted}
              onClick={(e) => e.stopPropagation()}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}
