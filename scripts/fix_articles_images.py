import json

def replace_unsplash_links(data):
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, str) and 'unsplash.com' in v:
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

with open('app/data/articles.json', 'r') as f:
    articles = json.load(f)

articles = replace_unsplash_links(articles)

with open('app/data/articles.json', 'w') as f:
    json.dump(articles, f, indent=2)

print("Replaced all unsplash links in articles.json")
