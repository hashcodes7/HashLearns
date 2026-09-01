import os

docs_dir = os.path.join(os.getcwd(), 'docs')

count = 0
for root, dirs, files in os.walk(docs_dir):
    foldername = os.path.basename(root).lower()
    
    # Check if this is a chapter folder (or any folder the user wants to act as a normal expanding folder)
    if 'chapter' in foldername or 'module' in foldername:
        for filename in files:
            if filename.lower() in ['index.md', 'index.mdx']:
                old_path = os.path.join(root, filename)
                # Rename to 00- Intro to ensure it acts as the first document rather than the folder index
                ext = os.path.splitext(filename)[1]
                new_path = os.path.join(root, f'00- Intro{ext}')
                
                try:
                    os.rename(old_path, new_path)
                    count += 1
                    print(f"Renamed {old_path} -> {new_path}")
                except Exception as e:
                    print(f"Failed to rename {old_path}: {e}")

print(f"Successfully renamed {count} index files in chapter folders.")
