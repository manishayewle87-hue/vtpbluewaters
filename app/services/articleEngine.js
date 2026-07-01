import articlesData from '../data/articles.json';

export const articleEngine = {
  getAllArticles: async () => {
    return articlesData;
  },

  getArticleBySlug: async (slug) => {
    return articlesData.find(a => a.slug === slug);
  },

  getArticlesByCategory: async (categorySlug) => {
    return articlesData.filter(a => a.category === categorySlug);
  },

  getAllCategories: async () => {
    // Extract unique categories and their labels
    const categoriesMap = new Map();
    articlesData.forEach(a => {
      if (!categoriesMap.has(a.category)) {
        categoriesMap.set(a.category, {
          slug: a.category,
          label: a.categoryLabel
        });
      }
    });
    return Array.from(categoriesMap.values());
  }
};
