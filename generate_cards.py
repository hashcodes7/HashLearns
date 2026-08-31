import os
import json
import re

def format_title(name):
    # Remove leading numbers (e.g. "1- ", "01-")
    clean_name = re.sub(r'^\d+[\s-]*\.*[\s-]*', '', name)
    # Split by hyphen or underscore and capitalize
    words = re.split(r'[-_]', clean_name)
    return ' '.join(word.capitalize() for word in words if word).strip()

def main():
    docs_dir = os.path.join(os.getcwd(), 'docs')
    
    for root, dirs, files in os.walk(docs_dir):
        # Skip hidden directories like .docusaurus
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
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
                
        changed = False
        
        if 'label' not in category_data:
            category_data['label'] = format_title(folder_name)
            changed = True
            
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
