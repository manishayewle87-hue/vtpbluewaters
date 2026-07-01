import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const url = 'https://vtprealty.in/';

async function scrapeProjects() {
  try {
    console.log(`Scraping ${url}...`);
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    
    const projects = [];
    
    $('.project_home_wrap').each((index, element) => {
      const imgElem = $(element).find('.pro_img');
      const imgSrc = imgElem.attr('src');
      
      const txtElems = $(element).find('.project_txt_wrap p');
      const township = $(txtElems[0]).text().trim();
      const nameAndLocation = $(txtElems[1]).text().trim();
      
      const linkElem = $(element).find('a.page_cta');
      let link = linkElem.attr('href');
      
      if (!link) {
         const wrapperLink = $(element).find('.project_img_wrap a');
         link = wrapperLink.attr('href');
      }

      // Add full url
      if (link && link.startsWith('/')) {
        link = `https://vtprealty.in${link}`;
      }
      
      let image = imgSrc;
      if (image && image.startsWith('/')) {
        // extract the actual url from the next.js optimized image url
        const urlParamMatch = image.match(/url=([^&]+)/);
        if (urlParamMatch) {
            image = `https://vtprealty.in${decodeURIComponent(urlParamMatch[1])}`;
        } else {
            image = `https://vtprealty.in${image}`;
        }
      }

      if (nameAndLocation && link) {
        projects.push({
          id: index,
          township: township || 'Township',
          name: nameAndLocation.split('-')[0]?.trim() || nameAndLocation,
          location: nameAndLocation.split('-')[1]?.trim() || 'Pune',
          image: image || '',
          link: link
        });
      }
    });

    // Remove duplicates based on link
    const uniqueProjects = projects.filter((project, index, self) =>
      index === self.findIndex((t) => (
        t.link === project.link
      ))
    );

    const outputPath = path.resolve('src/data/projects.json');
    await fs.writeFile(outputPath, JSON.stringify(uniqueProjects, null, 2), 'utf-8');
    console.log(`Successfully scraped ${uniqueProjects.length} projects and saved to src/data/projects.json`);
    
  } catch (error) {
    console.error('Error scraping projects:', error);
  }
}

scrapeProjects();
