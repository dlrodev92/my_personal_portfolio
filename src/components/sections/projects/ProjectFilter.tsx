interface Props {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  projectCount: number;
}

const ProjectFilter = ({
  activeCategory,
  onCategoryChange,
  projectCount,
}: Props) => {
  const categories = [
    {
      id: 'all',
      label: 'All Projects',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: 'personal',
      label: 'Personal',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="m22 21-3-3m0 0a3 3 0 1 0-4.24-4.24 3 3 0 0 0 4.24 4.24Z" />
        </svg>
      ),
    },
    {
      id: 'freelance',
      label: 'Client Work',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </svg>
      ),
    },
    {
      id: 'devops',
      label: 'Infrastructure',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M10 2L5 7l5 5" />
          <path d="M14 2l5 5-5 5" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                inline-flex items-center px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-300 transform hover:scale-105
                ${
                  activeCategory === category.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center mb-8">
        <p className="font-body text-gray-600">
          <span className="font-medium text-black">{projectCount}</span> project
          {projectCount !== 1 ? 's' : ''}
          {activeCategory !== 'all' && (
            <span>
              {' '}
              in {categories.find((c) => c.id === activeCategory)?.label}
            </span>
          )}
        </p>
      </div>
    </>
  );
};

export default ProjectFilter;
