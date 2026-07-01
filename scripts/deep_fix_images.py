import json

def replace_unsplash_links(data):
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, str) and 'unsplash.com' in v:
                if 'floorPlans' in k.lower() or 'floor' in k.lower() or 'plan' in k.lower():
                    data[k] = '/assets/projects/earth-1/floor-plan-3bhk.jpg'
                elif 'master' in k.lower() or 'layout' in k.lower():
                    data[k] = '/assets/projects/earth-1/master-plan.jpg'
                else:
                    data[k] = '/assets/projects/earth-1/hero.jpg'
            else:
                data[k] = replace_unsplash_links(v)
    elif isinstance(data, list):
        for i in range(len(data)):
            if isinstance(data[i], str) and 'unsplash.com' in data[i]:
                data[i] = '/assets/projects/earth-1/hero.jpg'
            else:
                data[i] = replace_unsplash_links(data[i])
    return data

with open('app/data/projects.json', 'r') as f:
    projects = json.load(f)

projects = replace_unsplash_links(projects)

with open('app/data/projects.json', 'w') as f:
    json.dump(projects, f, indent=2)

print("Replaced all unsplash links")
