import { useState, useEffect } from 'react';

const categories = [
  { id: 'all', label: 'All', icon: '🎯' },
  { id: 'personal', label: 'Personal', icon: '🛠' },
  { id: 'freelance', label: 'Freelance', icon: '👨‍💻' },
  { id: 'devops', label: 'DevOps', icon: '☁️' }
];

const ProjectsFilter = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTech, setSearchTech] = useState('');

  // Filter projects whenever filters change
  useEffect(() => {
    filterProjects();
  }, [activeCategory, searchTech]);

  const filterProjects = () => {
    const projectCards = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('empty-state');
    const projectCount = document.getElementById('project-count');
    const resultsCount = document.getElementById('results-count');
    const loadMoreSection = document.getElementById('load-more-section');
    
    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardTech = card.getAttribute('data-tech');
      
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesTech = searchTech === '' || 
                         cardTech?.toLowerCase().includes(searchTech.toLowerCase());
      
      if (matchesCategory && matchesTech) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update UI based on results
    if (visibleCount === 0) {
      emptyState?.classList.remove('hidden');
      loadMoreSection?.classList.add('hidden');
    } else {
      emptyState?.classList.add('hidden');
      loadMoreSection?.classList.remove('hidden');
    }

    // Update count
    if (projectCount) {
      projectCount.textContent = visibleCount.toString();
    }

    // Update results description
    if (resultsCount) {
      const resultsText = resultsCount.querySelector('p');
      if (resultsText) {
        let description = `Showing ${visibleCount} project${visibleCount !== 1 ? 's' : ''}`;
        
        if (activeCategory !== 'all') {
          const categoryName = categories.find(c => c.id === activeCategory)?.label;
          description += ` in ${categoryName}`;
        }
        
        if (searchTech) {
          description += ` with "${searchTech}"`;
        }
        
        resultsText.textContent = description;
      }
    }
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchTech('');
  };

  // Handle clear filters button
  useEffect(() => {
    const clearButton = document.getElementById('clear-filters');
    if (clearButton) {
      clearButton.addEventListener('click', clearFilters);
      return () => {
        clearButton.removeEventListener('click', clearFilters);
      };
    }
  }, []);

  return (
    <div className="mb-8">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`project-filter-btn ${
              activeCategory === category.id ? 'active' : ''
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Tech Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by tech stack (e.g., React, AWS)..."
            value={searchTech}
            onChange={(e) => setSearchTech(e.target.value)}
            className="tech-search-input"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            🔍
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsFilter;