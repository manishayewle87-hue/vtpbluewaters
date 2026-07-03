import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting Database Migration...');

  // 1. Read JSON files
  const projectsData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'app/data/projects.json'), 'utf-8')
  );
  
  const contentHub = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'app/data/content-hub.json'), 'utf-8')
  );

  // 2. Clear existing tables (optional, for idempotency)
  await prisma.project.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.location.deleteMany();
  
  console.log('Cleared existing data.');

  // 3. Seed Projects
  for (const p of projectsData) {
    await prisma.project.create({
      data: {
        slug: p.slug,
        name: p.name,
        township: p.township || '',
        location: p.location || '',
        image: p.image || '',
        link: p.link || '',
        seoTitle: p.seoTitle || '',
        seoDescription: p.seoDescription || '',
        overview: p.overview || '',
        masterLayout: p.masterLayout || '',
        
        // Stringify nested objects/arrays for SQLite compatibility
        amenities: JSON.stringify(p.amenities || []),
        specifications: JSON.stringify(p.specifications || []),
        locationHighlights: JSON.stringify(p.locationHighlights || []),
        floorPlans: JSON.stringify(p.floorPlans || []),
        maharera: JSON.stringify(p.maharera || []),
        gallery: JSON.stringify(p.gallery || [])
      }
    });
  }
  console.log(`Seeded ${projectsData.length} projects.`);

  // 4. Seed Blogs
  for (const b of contentHub.blogs || []) {
    await prisma.blog.create({
      data: {
        slug: b.slug,
        title: b.title,
        category: b.category || 'General',
        content: b.content
      }
    });
  }
  console.log(`Seeded ${(contentHub.blogs || []).length} blogs.`);

  // 5. Seed FAQs
  for (const f of contentHub.faqs || []) {
    await prisma.faq.create({
      data: {
        question: f.question,
        answer: f.answer
      }
    });
  }
  console.log(`Seeded ${(contentHub.faqs || []).length} FAQs.`);

  // 6. Seed Locations
  for (const l of contentHub.locations || []) {
    await prisma.location.create({
      data: {
        slug: l.slug,
        title: l.title,
        description: l.description
      }
    });
  }
  console.log(`Seeded ${(contentHub.locations || []).length} locations.`);

  console.log('Database Migration Completed Successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
