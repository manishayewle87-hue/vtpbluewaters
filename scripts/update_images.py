import json
import os

with open('app/data/projects.json', 'r') as f:
    projects = json.load(f)

for project in projects:
    if project['slug'] == 'earth-1-by-vtp-luxe':
        project['image'] = '/assets/projects/earth-1/hero.jpg'
        project['masterLayout'] = '/assets/projects/earth-1/master-plan.jpg'
        
        # update floor plans
        for fp in project['floorPlans']:
            fp['image'] = '/assets/projects/earth-1/floor-plan-3bhk.jpg'

with open('app/data/projects.json', 'w') as f:
    json.dump(projects, f, indent=2)

print("Updated projects.json with local high-quality assets.")
