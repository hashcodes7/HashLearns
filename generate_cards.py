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
        
        rel_path = os.path.relpath(root, docs_dir)
        depth = len(rel_path.split(os.sep))
        
        category_data = {}
        if os.path.exists(category_file):
            try:
                with open(category_file, 'r', encoding='utf-8') as f:
                    category_data = json.load(f)
            except json.JSONDecodeError:
                pass
                
        changed = False
        
        # Custom mapping for specific folder names
        custom_labels = {
            "ML-DL-LLM-SERIES": "Machine Learning & Deep Learning"
        }
        
        raw_title = custom_labels.get(folder_name, folder_name)
        new_label = format_title(raw_title)
        if category_data.get('label') != new_label:
            category_data['label'] = new_label
            changed = True
        
        lower_name = folder_name.lower()
        is_chapter = (
            depth >= 3 or
            'chapter' in lower_name or
            'module' in lower_name or
            bool(re.search(r'\bch[-\s_\d]', lower_name)) or
            lower_name.startswith('ch-') or
            lower_name.startswith('ch_') or
            lower_name.startswith('ch ')
        )
        
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

