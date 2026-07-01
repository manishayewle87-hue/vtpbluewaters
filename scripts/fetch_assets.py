import os
import json
import urllib.request
from duckduckgo_search import DDGS
from pathlib import Path

def download_image(url, dest_path):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(dest_path, 'wb') as out_file:
                out_file.write(response.read())
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def search_and_download(project_name, slug, queries):
    ddgs = DDGS()
    base_dir = Path(f"public/assets/projects/{slug}")
    base_dir.mkdir(parents=True, exist_ok=True)
    
    results = {}
    
    for category, query in queries.items():
        print(f"Searching for {category}: '{query}'")
        try:
            images = list(ddgs.images(query, max_results=3))
            
            category_dir = base_dir / category
            category_dir.mkdir(exist_ok=True)
            
            downloaded = []
            count = 1
            for img in images:
                url = img.get('image')
                ext = url.split('.')[-1].split('?')[0]
                if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
                    ext = 'jpg'
                    
                filename = f"{category}-{count}.{ext}"
                dest_path = category_dir / filename
                
                if download_image(url, dest_path):
                    print(f"Downloaded {filename}")
                    downloaded.append(f"/assets/projects/{slug}/{category}/{filename}")
                    count += 1
                    
            results[category] = downloaded
        except Exception as e:
            print(f"Error searching {query}: {e}")
            
    with open(base_dir / 'assets.json', 'w') as f:
        json.dump(results, f, indent=2)

projects = [
    {
        "name": "VTP Earth One",
        "slug": "earth-1",
        "queries": {
            "hero": "VTP Earth One Mahalunge elevation high resolution",
            "floor_plans": "VTP Earth One Mahalunge floor plan 3 BHK",
            "master_layout": "VTP Earth One Mahalunge master plan layout",
            "gallery": "VTP Earth One Mahalunge amenities"
        }
    },
    {
        "name": "VTP Altamira",
        "slug": "altamira",
        "queries": {
            "hero": "VTP Altamira Kharadi elevation",
            "floor_plans": "VTP Altamira Kharadi floor plan",
            "master_layout": "VTP Altamira Kharadi master layout",
            "gallery": "VTP Altamira Kharadi club house amenities"
        }
    },
    {
        "name": "VTP Monarque",
        "slug": "monarque",
        "queries": {
            "hero": "VTP Monarque Hinjewadi phase 1 elevation",
            "floor_plans": "VTP Monarque Hinjewadi floor plan",
            "master_layout": "VTP Monarque Hinjewadi master plan",
            "gallery": "VTP Monarque Hinjewadi swimming pool"
        }
    }
]

for p in projects:
    print(f"\nProcessing {p['name']}...")
    search_and_download(p['name'], p['slug'], p['queries'])
