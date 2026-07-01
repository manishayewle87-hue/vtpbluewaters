import json

with open('app/data/projects.json', 'r') as f:
    projects = json.load(f)

for project in projects:
    if project.get('image') and 'unsplash' in project['image']:
        project['image'] = '/assets/projects/earth-1/hero.jpg'

with open('app/data/projects.json', 'w') as f:
    json.dump(projects, f, indent=2)

print("Updated projects.json")
