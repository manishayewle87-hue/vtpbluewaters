import projectsData from '../data/projects.json';

// Abstracted CMS Service
// This acts as a facade. Currently reads from JSON, but can be easily
// swapped to fetch from Sanity, Contentful, or Strapi in the future.

export const cms = {
  /**
   * Fetch all projects
   * @returns {Promise<Array>} Array of all project objects
   */
  async getAllProjects() {
    // Simulate network delay for realistic CMS behavior
    // await new Promise(resolve => setTimeout(resolve, 100));
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
   * Fetch global site settings (e.g. for footer, nav)
   */
  async getGlobalSettings() {
    return {
      contactEmail: 'sales@vtprealty.in',
      contactPhone: '+91 20 6777 0000',
      officeAddress: 'VTP Realty, 9th Floor, Cerebrum IT Park, Kalyani Nagar, Pune 411006',
      socials: {
        instagram: 'https://instagram.com/vtprealty',
        facebook: 'https://facebook.com/vtprealty',
        youtube: 'https://youtube.com/vtprealty'
      }
    };
  }
};
