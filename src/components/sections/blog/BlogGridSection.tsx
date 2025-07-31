import { useState, useEffect } from 'react';
import type { BlogPost as APIBlogPost } from '../../../lib/types';
import CompactBlogCard from './CompactBlogCard';

interface Props {
  blogPosts: APIBlogPost[];
}

interface TransformedBlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
  image?: string;
  slug: string;
  featured?: boolean;
}

const BlogGridSection = ({ blogPosts }: Props) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState<TransformedBlogPost[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Transform API blog posts to component format
  const transformedPosts: TransformedBlogPost[] = blogPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt || post.createdAt,
    category: post.category?.name || 'uncategorized',
    readTime: post.readTime || 5,
    tags: post.blogPostTags?.map(tag => tag.blogTag.name) || [],
    image: post.heroImage || undefined,
    slug: post.slug,
    featured: false
  }));

  // Generate categories dynamically from blog posts
  const categories = [
    { 
      id: 'all', 
      label: 'All Entries', 
      count: transformedPosts.length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
        </svg>
      )
    },
    ...Array.from(new Set(transformedPosts.map(post => post.category)))
      .filter(category => category !== 'uncategorized')
      .map(category => ({
        id: category.toLowerCase(),
        label: category.charAt(0).toUpperCase() + category.slice(1),
        count: transformedPosts.filter(post => post.category.toLowerCase() === category.toLowerCase()).length,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.47.91 6.05 2.38"/>
          </svg>
        )
      }))
  ];

  useEffect(() => {
    setIsAnimating(true);
    
    const filtered = activeCategory === 'all' 
      ? transformedPosts 
      : transformedPosts.filter(post => post.category.toLowerCase() === activeCategory);
    
    const timer = setTimeout(() => {
      setFilteredPosts(filtered);
      setIsAnimating(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [activeCategory, transformedPosts]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                inline-flex items-center px-3 py-2 rounded-lg font-body text-sm font-medium transition-all duration-300 hover:scale-105
                ${
                  activeCategory === category.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === category.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className={`transition-all duration-300}`}>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post, index) => (
                <CompactBlogCard 
                  key={`${post.slug}-${activeCategory}`} 
                  post={post} 
                  index={index}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-16">
              <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-black mb-2">
                No entries found
              </h3>
              <p className="font-body text-gray-600 mb-4 text-sm">
                Try selecting a different category
              </p>
              <button 
                onClick={() => setActiveCategory('all')}
                className="font-body text-sm text-black hover:text-yellow-600 transition-colors underline font-medium"
              >
                Show all entries
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default BlogGridSection;