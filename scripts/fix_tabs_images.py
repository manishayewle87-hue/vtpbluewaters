import json

with open('app/data/projects.json', 'r') as f:
    projects = json.load(f)

# Use the robust local AI-generated assets from Earth One
local_master_plan = "/assets/projects/earth-1/master-plan.jpg"
local_floor_plan = "/assets/projects/earth-1/floor-plan-3bhk.jpg"

for p in projects:
    # Fix master layout
    if "unsplash.com" in p.get("masterLayout", "") or "vtprealty.in" in p.get("masterLayout", ""):
        p["masterLayout"] = local_master_plan

    # Fix floor plans
    for plan in p.get("floorPlans", []):
        if "unsplash.com" in plan.get("image", "") or "vtprealty.in" in plan.get("image", ""):
            plan["image"] = local_floor_plan

with open('app/data/projects.json', 'w') as f:
    json.dump(projects, f, indent=2)

print("Fixed all Floor Plan and Master Layout broken images.")
