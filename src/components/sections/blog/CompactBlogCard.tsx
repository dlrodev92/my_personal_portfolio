interface BlogPost {
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

const CompactBlogCard = ({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) => {
  return (
    <article
      className="group bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:bg-white/90 hover:border-gray-300 relative p-6 opacity-0"
      style={{
        animation: `slideInUp 0.4s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <time className="text-xs text-gray-500 font-medium">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-xs text-gray-500">{post.readTime} min</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-xs text-gray-600 font-medium">
              {post.category}
            </span>
          </div>

          <h3 className="font-display text-lg font-bold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300 leading-snug">
            {post.title}
          </h3>
        </div>

        {/* Optional Image Thumbnail */}
        {post.image && (
          <div className="w-16 h-16 ml-4 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      {/* Excerpt */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-600 border border-gray-100"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="text-xs text-gray-400">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        {/* Read Link */}
        <a
          href={`/blog/${post.slug}`}
          className="text-xs font-medium text-gray-600 hover:text-black transition-colors duration-300 flex items-center"
        >
          Read
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>

      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </article>
  );
};

export default CompactBlogCard;
