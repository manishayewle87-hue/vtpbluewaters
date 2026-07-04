import { PrismaClient } from '@prisma/client';

// We instantiate a single PrismaClient for the build process.
// Note: Since this is used in Next.js generateStaticParams/getStaticProps 
// during `next build`, it will safely fetch from the local SQLite db.
const prisma = new PrismaClient();

/**
 * Utility to parse JSON fields safely from Prisma SQLite models
 */
function parsePrismaProject(p) {
  if (!p) return null;
  return {
    ...p,
    amenities: JSON.parse(p.amenities || '[]'),
    specifications: JSON.parse(p.specifications || '[]'),
    locationHighlights: JSON.parse(p.locationHighlights || '[]'),
    floorPlans: JSON.parse(p.floorPlans || '[]'),
    maharera: JSON.parse(p.maharera || '[]'),
    gallery: JSON.parse(p.gallery || '[]'),
  };
}

export const cms = {
  /**
   * Fetch all projects
   * @returns {Promise<Array>} Array of all project objects
   */
  async getAllProjects() {
    const projects = await prisma.project.findMany();
    return projects.map(parsePrismaProject);
  },

  /**
   * Fetch a single project by its slug
   * @param {string} slug - The project slug
   * @returns {Promise<Object|null>} The project object or null
   */
  async getProjectBySlug(slug) {
    const project = await prisma.project.findUnique({
      where: { slug }
    });
    return parsePrismaProject(project);
  },

  /**
   * Fetch all blogs
   */
  async getAllBlogs() {
    return prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  /**
   * Fetch all locations
   */
  async getAllLocations() {
    return prisma.location.findMany();
  },

  /**
   * Fetch all FAQs
   */
  async getAllFaqs() {
    return prisma.faq.findMany();
  },

  /**
   * Fetch global site settings (e.g. for footer, nav)
   */
  async getGlobalSettings() {
    return {
      contactEmail: 'sales@vtpbluewaters.com',
      contactPhone: '+91 77440 09295',
      officeAddress: 'Site Office: VTP Bluewaters Township, Mahalunge-411045',
      socials: {
        instagram: 'https://instagram.com/vtprealty',
        facebook: 'https://facebook.com/vtprealty',
        youtube: 'https://youtube.com/vtprealty'
      }
    };
  }
};
