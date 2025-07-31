import { useState, useEffect } from 'react';
import type { BlogPost as APIBlogPost } from '../../../lib/types';

interface Props {
  latestPost: APIBlogPost | null;
}

const LatestBlog = ({ latestPost }: Props) => {
  if (!latestPost) {
    return (
      <section className="pb-16 -mt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <h2 className="font-display text-2xl font-bold text-gray-400 mb-4">
              No blog posts yet
            </h2>
            <p className="text-gray-600">Check back soon for updates!</p>
          </div>
        </div>
      </section>
    );
  }

  // Transform API data to component format
  const transformedPost = {
    title: latestPost.title,
    excerpt: latestPost.excerpt,
    date: latestPost.publishedAt || latestPost.createdAt,
    category: latestPost.category?.name || 'Uncategorized',
    readTime: latestPost.readTime || 5,
    tags: latestPost.blogPostTags?.map(tag => tag.blogTag.name) || [],
    image: latestPost.heroImage,
    slug: latestPost.slug
  };

  return (
    <section className="pb-16 -mt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div 
          id="latest-blog-header"
          className="flex flex-col items-start gap-4 mb-12 opacity-0 transform transition-all duration-1000 ease-out"
        >
          <p className="uppercase text-sm tracking-widest text-text-secondary">Latest Entry</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-black">
            From the <span className="text-yellow-400">Journal</span>
          </h2>
        </div>

        {/* Featured Post */}
        <article className="featured-entry group bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-lg hover:bg-white/90 relative">
          
          {/* Image Section */}
          {transformedPost.image && (
            <div className="relative h-56 overflow-hidden">
              <img 
                src={transformedPost.image} 
                alt={transformedPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              
              {/* Category Overlay */}
              <div className="absolute top-4 left-4">
                <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20">
                  {transformedPost.category}
                </span>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            
            {/* Date & Read Time */}
            <div className="flex items-center justify-between mb-6">
              <time className="text-sm text-gray-600 font-medium">
                {new Date(transformedPost.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                {transformedPost.readTime} min read
              </span>
            </div>

            {/* Title & Excerpt */}
            <h3 className="font-display text-2xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors duration-300">
              {transformedPost.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              {transformedPost.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {transformedPost.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="text-xs px-3 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read More Button */}
            <a 
              href={`/blog/${transformedPost.slug}`}
              className="inline-flex items-center font-medium text-black hover:text-yellow-600 transition-colors duration-300 border-b border-transparent hover:border-yellow-600"
            >
              Read full entry
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M7 17L17 7"/>
                <path d="M7 7h10v10"/>
              </svg>
            </a>
          </div>

          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </article>

      </div>
    </section>
  );
};

export default LatestBlog;