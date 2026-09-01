import os
import json

docs_dir = os.path.join(os.getcwd(), 'docs')

count = 0
for root, dirs, files in os.walk(docs_dir):
    if '_category_.json' in files:
        filepath = os.path.join(root, '_category_.json')
        try:
            # Read as raw bytes to handle the ANSI encoding issue
            with open(filepath, 'rb') as f:
                raw = f.read()
            
            # Try to decode, falling back to cp1252 if utf-8 fails
            try:
                # utf-8-sig handles the BOM if it exists
                text = raw.decode('utf-8-sig')
            except UnicodeDecodeError:
                # If it fails, it's likely the ANSI file I created via Set-Content
                text = raw.decode('cp1252')
            
            # Now parse the JSON
            data = json.loads(text)
            
            # Fix any corrupted characters in the label or description
            if 'label' in data:
                data['label'] = data['label'].replace('', '-')
            
            if 'link' in data and 'description' in data['link']:
                data['link']['description'] = data['link']['description'].replace('', '-')
                
            # Write back as pure UTF-8 (no BOM)
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
                
            count += 1
            print(f"Fixed encoding for {filepath}")
        except Exception as e:
            print(f"Failed to process {filepath}: {e}")

print(f"Successfully fixed {count} files.")
