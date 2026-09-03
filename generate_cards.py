import os
import json
import re

def format_title(name):
    # Just remove leading numbers (e.g. "1- ", "01-") and keep original casing
    clean_name = re.sub(r'^\d+[\s-]*\.*[\s-]*', '', name)
    return clean_name.strip()

def main():
    docs_dir = os.path.join(os.getcwd(), 'docs')
    
    for root, dirs, files in os.walk(docs_dir):
        # Skip hidden directories like .docusaurus and Excalidraw
        dirs[:] = [d for d in dirs if not d.startswith('.') and d.lower() != 'excalidraw']
        
        # Don't create category.json for the root docs dir itself
        if root == docs_dir:
            continue
            
        folder_name = os.path.basename(root)
        category_file = os.path.join(root, '_category_.json')
        
        category_data = {}
        if os.path.exists(category_file):
            try:
                with open(category_file, 'r', encoding='utf-8') as f:
                    category_data = json.load(f)
            except json.JSONDecodeError:
                pass
                
        changed = True
        
        category_data['label'] = format_title(folder_name)
        
        is_chapter = 'chapter' in folder_name.lower() or 'module' in folder_name.lower()
        
        if is_chapter:
            if 'link' in category_data:
                del category_data['link']
                changed = True
        else:
            if 'link' not in category_data:
                category_data['link'] = {
                    "type": "generated-index",
                    "description": f"Explore courses and concepts related to {category_data['label']}."
                }
                changed = True
            
        if changed:
            with open(category_file, 'w', encoding='utf-8') as f:
                json.dump(category_data, f, indent=2)
                print(f"Updated category file: {category_file}")

if __name__ == "__main__":
    main()
