export interface Project {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  status: 'LIVE' | 'IN_PROGRESS' | 'ARCHIVED';
  type: 'PERSONAL' | 'FREELANCE' | 'DEVOPS';
  heroImage: string;
  liveDemo?: string;
  github?: string;
  caseStudy?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  overview?: {
    problem: string;
    solution: string;
    role: string;
    impact: string;
  };
  metrics?: {
    launchDate: string;
    duration: string;
    teamSize: string;
  };
  technicalDetails?: {
    database: string;
    api: string;
    components: string;
  };
  screenshots: Array<{
    id: number;
    url: string;
    description: string;
    order: number;
  }>;
  technologies: Array<{
    id: number;
    name: string;
    reason?: string;
  }>;
  projectTags: Array<{
    tag: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
  lessons: Array<{ description: string }>;
  businessOutcomes: Array<{ description: string }>;
  improvements: Array<{ description: string }>;
  nextSteps: Array<{ description: string }>;
  futureTools: Array<{ name: string }>;
  performanceMetrics: Array<{ description: string }>;
}

export interface TransformedProject {
  hero: {
    title: string;
    subtitle: string;
    status: string;
    image: string;
    liveDemo?: string;
    github?: string;
    caseStudy?: string;
    metrics: {
      launchDate: string;
      duration: string;
      teamSize: string;
    };
  };
  overview: {
    problem: string;
    solution: string;
    role: string;
    impact: string;
  };
  technical: {
    technologies: Array<{
      name: string;
      reason: string;
    }>;
    architecture: {
      database: string;
      api: string;
      components: string;
    };
    performance: string[];
  };
  visual: {
    screenshots: Array<{
      url: string;
      description: string;
    }>;
  };
  lessons: {
    lessonsLearned: string[];
    businessOutcomes: string[];
    improvements: string[];
  };
  related: {
    relatedProjects: any[];
    nextSteps: string[];
    futureTools: string[];
  };
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  heroImage?: string;
  readTime: number;
  views: number;
  publishedAt?: string;
  createdAt: string;
  author: any;
  category?: {
    name: string;
    slug: string;
  };
  blogPostTags: Array<{
    blogTag: {
      name: string;
      slug: string;
    };
  }>;
  contentBlocks: Array<{
    type: string;
    content: string;
    order: number;
  }>;
}

export interface Assessment {
  id: number;
  title: string;
  description: string;
  slug: string;
  mainImage?: string;
  publishedAt?: string;
  createdAt: string;
  contentBlocks: Array<{
    type: string;
    content: string;
    order: number;
  }>;
  images: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
  technologies: Array<{
    name: string;
  }>;
  assessmentTags: Array<{
    tag: {
      name: string;
      slug: string;
    };
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

// Query parameters interfaces
export interface ProjectFilters {
  status?: 'LIVE' | 'IN_PROGRESS' | 'ARCHIVED';
  type?: 'PERSONAL' | 'FREELANCE' | 'DEVOPS';
  search?: string;
  technology?: string;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
}