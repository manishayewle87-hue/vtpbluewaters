/**
 * Flat-File CMS Architecture
 * Reads directly from JSON files to ensure 100% compatibility with Edge SSR.
 * Bypasses Prisma/SQLite to allow massive SEO scaling on Cloudflare Pages.
 */

import projectsData from '../data/projects.json';
import locationsData from '../data/locations.json';
import articlesData from '../data/articles.json';
import contentHubData from '../data/content-hub.json';

export const cms = {
  /**
   * Fetch all projects
   * @returns {Promise<Array>} Array of all project objects
   */
  async getAllProjects() {
    return projectsData;
  },

  /**
   * Fetch a single project by its slug
   * @param {string} slug - The project slug
   * @returns {Promise<Object|null>} The project object or null
   */
  async getProjectBySlug(slug) {
    const project = projectsData.find(p => p.slug === slug);
    return project || null;
  },

  /**
   * Fetch all blogs
   */
  async getAllBlogs() {
    // Merge manually written articles with programmatic articles
    const allBlogs = [...articlesData, ...contentHubData.blogs];
    return allBlogs.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  },

  /**
   * Fetch a single blog by slug
   */
  async getBlogBySlug(slug) {
    const allBlogs = [...articlesData, ...contentHubData.blogs];
    const blog = allBlogs.find(b => b.slug === slug);
    return blog || null;
  },

  /**
   * Fetch all locations
   */
  async getAllLocations() {
    return locationsData;
  },

  /**
   * Fetch a single location by slug
   */
  async getLocationBySlug(slug) {
    const loc = locationsData.find(l => l.slug === slug);
    return loc || null;
  },

  /**
   * Fetch all FAQs
   */
  async getAllFaqs() {
    return contentHubData.faqs || [];
  },

  /**
   * Fetch global site settings (e.g. for footer, nav)
   */
  async getGlobalSettings() {
    return {
      contactEmail: 'sales@vtprealty.in',
      contactPhone: '+91 7744009295',
      officeAddress: 'Site Office: VTP Bluewaters Township, Mahalunge-411045',
      socials: {
        instagram: 'https://instagram.com/vtprealty',
        facebook: 'https://facebook.com/vtprealty',
        youtube: 'https://youtube.com/vtprealty'
      }
    };
  }
};
