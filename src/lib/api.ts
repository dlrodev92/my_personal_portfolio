import type {
  Project,
  BlogPost,
  Assessment,
  ApiResponse,
  ProjectFilters,
  BlogFilters,
  HealthStatus
} from './types';

import {
  fetchApi,
  buildQueryString,
  getEnvironmentUrl
} from '../helpers/apiHelpers';

class PortfolioAPI {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getEnvironmentUrl();
  }

  //
  // ─── PROJECTS ─────────────────────────────────────────────
  //

  async getProjects(filters: ProjectFilters = {}): Promise<ApiResponse<Project[]>> {
    const query = buildQueryString(filters);
    const endpoint = `${this.baseUrl}/projects${query}`;
    return fetchApi<Project[]>(endpoint);
  }

  async getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
    const endpoint = `${this.baseUrl}/projects/slug/${slug}`;
    return fetchApi<Project>(endpoint);
  }

  async getProjectCards(filters: ProjectFilters & { limit?: number; techLimit?: number } = {}): Promise<ApiResponse<Project[]>> {
    const query = buildQueryString({
      ...filters,
      limit: filters.limit?.toString(),
      techLimit: filters.techLimit?.toString(),
    });
    const endpoint = `${this.baseUrl}/projects/cards${query}`;
    return fetchApi<Project[]>(endpoint);
  }

  async getFeaturedProjects(limit: number = 3): Promise<ApiResponse<Project[]>> {
    const query = buildQueryString({ status: 'LIVE' });
    const endpoint = `${this.baseUrl}/projects${query}`;
    const response = await fetchApi<Project[]>(endpoint);

    if (response.success && response.data) {
      return {
        ...response,
        data: response.data.slice(0, limit),
      };
    }

    return response;
  }

  async getProjectsByType(): Promise<ApiResponse<Record<string, Project[]>>> {
    const response = await this.getProjects();
    if (!response.success || !response.data) {
      return { success: false, error: response.error || 'Failed to fetch projects' };
    }

    const grouped = response.data.reduce((acc, project) => {
      acc[project.type] = acc[project.type] || [];
      acc[project.type].push(project);
      return acc;
    }, {} as Record<string, Project[]>);

    return { success: true, data: grouped };
  }

  async getProjectsByStatus(): Promise<ApiResponse<Record<string, Project[]>>> {
    const response = await this.getProjects();
    if (!response.success || !response.data) {
      return { success: false, error: response.error || 'Failed to fetch projects' };
    }

    const grouped = response.data.reduce((acc, project) => {
      acc[project.status] = acc[project.status] || [];
      acc[project.status].push(project);
      return acc;
    }, {} as Record<string, Project[]>);

    return { success: true, data: grouped };
  }

  //
  // ─── BLOGS ────────────────────────────────────────────────
  //

  async getBlogPosts(filters: BlogFilters = {}): Promise<ApiResponse<BlogPost[]>> {
    const query = buildQueryString(filters);
    const endpoint = `${this.baseUrl}/blogs${query}`;
    return fetchApi<BlogPost[]>(endpoint);
  }

  async getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
    const endpoint = `${this.baseUrl}/blogs/${slug}`;
    return fetchApi<BlogPost>(endpoint);
  }

  async getLatestBlogPosts(limit: number = 3): Promise<ApiResponse<BlogPost[]>> {
    const response = await this.getBlogPosts();

    if (!response.success || !response.data) return response;

    const sorted = response.data
      .sort((a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
      )
      .slice(0, limit);

    return { ...response, data: sorted };
  }

  //
  // ─── ASSESSMENTS ─────────────────────────────────────────
  //

  async getAssessments(): Promise<ApiResponse<Assessment[]>> {
    const endpoint = `${this.baseUrl}/assessments`;
    return fetchApi<Assessment[]>(endpoint);
  }

  async getAssessmentBySlug(slug: string): Promise<ApiResponse<Assessment>> {
    const endpoint = `${this.baseUrl}/assessments/${slug}`;
    return fetchApi<Assessment>(endpoint);
  }

  //
  // ─── SYSTEM ──────────────────────────────────────────────
  //

  async healthCheck(): Promise<ApiResponse<HealthStatus>> {
    const endpoint = `${this.baseUrl}/health`;
    return fetchApi<HealthStatus>(endpoint);
  }

  //
  // ─── UTILITIES ───────────────────────────────────────────
  //

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

// Export singleton instance
export const portfolioAPI = new PortfolioAPI();

// Export class for testing or custom instancing
export default PortfolioAPI;
