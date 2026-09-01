import os
import json

docs_dir = os.path.join(os.getcwd(), 'docs')

count = 0
for root, dirs, files in os.walk(docs_dir):
    foldername = os.path.basename(root).lower()
    
    # If the folder acts as a chapter or module (it shouldn't have its own index page)
    if 'chapter' in foldername or 'module' in foldername:
        if '_category_.json' in files:
            filepath = os.path.join(root, '_category_.json')
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                if 'link' in data:
                    del data['link']
                    with open(filepath, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=2)
                    count += 1
                    print(f"Removed generated-index from {filepath}")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

print(f"Successfully removed generated-index from {count} chapter folders.")
