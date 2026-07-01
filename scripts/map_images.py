import json
import os
import glob

def get_scraped_images(project_slug):
    path = os.path.join('public', 'assets', 'projects', project_slug)
    if not os.path.exists(path):
        return []
    
    # get all scraped-* files
    files = glob.glob(os.path.join(path, 'scraped-*'))
    # sort by size descending to put the highest quality images first
    files.sort(key=lambda x: os.path.getsize(x), reverse=True)
    
    # return just the relative paths from public/
    return ['/' + os.path.relpath(f, 'public') for f in files]

with open('app/data/projects.json', 'r') as f:
    projects = json.load(f)

for project in projects:
    slug = project.get('slug')
    if not slug: continue
    
    images = get_scraped_images(slug)
    if not images:
        continue
    
    # update main image
    project['image'] = images[0]
    
    # update masterLayout
    if len(images) > 1:
        project['masterLayout'] = images[1]
    
    # update floorPlans
    if 'floorPlans' in project:
        img_idx = 2
        for fp in project['floorPlans']:
            if img_idx < len(images):
                fp['image'] = images[img_idx]
                img_idx += 1
            else:
                fp['image'] = images[0]

with open('app/data/projects.json', 'w') as f:
    json.dump(projects, f, indent=2)

print("Updated projects.json with scraped images")
