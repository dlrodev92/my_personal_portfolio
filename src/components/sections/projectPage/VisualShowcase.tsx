import { useState } from 'react';
import ExpandableImage from './ExpandableImage';
import ImageModal from './ImageModal';

interface Screenshot {
  url: string;
  description: string;
  id?: number;
  order?: number;
}

interface Project {
  screenshots: Screenshot[];
}

interface VisualShowcaseProps {
  project: Project;
}

const VisualShowcase = ({ project }: VisualShowcaseProps) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    src: '',
    alt: '',
    description: ''
  });

  const openModal = (src: string, alt: string, description: string) => {
    setModalState({
      isOpen: true,
      src,
      alt,
      description
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      src: '',
      alt: '',
      description: ''
    });
  };

  const layouts = [
    'col-span-8 row-span-4',
    'col-span-4 row-span-2',
    'col-span-4 row-span-2',
    'col-span-5 row-span-2',
    'col-span-3 row-span-2',
    'col-span-4 row-span-2',
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="font-body text-lg text-gray-600">
            A closer look at the interface and user experience
          </p>
        </div>
        
        {project.screenshots.length > 0 ? (
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px]">
            {project.screenshots.map((screenshot, index) => (
              <ExpandableImage
                key={index}
                src={screenshot.url}
                alt={screenshot.description}
                description={screenshot.description}
                index={index}
                className={layouts[index] || 'col-span-4 row-span-2'}
                onClick={() => openModal(screenshot.url, screenshot.description, screenshot.description)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <p className="font-body text-gray-500">No screenshots available for this project</p>
          </div>
        )}
        
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        src={modalState.src}
        alt={modalState.alt}
        description={modalState.description}
      />
    </section>
  );
};

export default VisualShowcase;