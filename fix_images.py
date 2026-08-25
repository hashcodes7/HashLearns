import os
import re

docs_dir = r"C:\Users\Harsh\HiHarsh\Coding\java\bigkart\HashLearns\docs"

def fix_images_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix standard markdown images: ![alt](Pasted%20image...) -> ![alt](./images/Pasted%20image...) or ./assets/
    # We will search for the actual image file in the same dir, images/, or assets/
    
    dir_path = os.path.dirname(filepath)
    
    def replacer(match):
        alt = match.group(1)
        url = match.group(2)
        
        # if it's already an absolute or correctly relative path that works, we can try to leave it
        # but the issue is they don't work.
        
        # unencode to find on disk
        decoded_url = url.replace('%20', ' ')
        
        # Check if the file exists in images/ or assets/
        if os.path.exists(os.path.join(dir_path, 'images', decoded_url)):
            return f"![{alt}](./images/{url})"
        elif os.path.exists(os.path.join(dir_path, 'assets', decoded_url)):
            return f"![{alt}](./assets/{url})"
        elif os.path.exists(os.path.join(dir_path, decoded_url)):
            return f"![{alt}](./{url})"
        else:
            # Maybe the url is a bad relative path like DevOps/5-...
            filename = os.path.basename(decoded_url)
            if os.path.exists(os.path.join(dir_path, 'images', filename)):
                return f"![{alt}](./images/{filename.replace(' ', '%20')})"
            elif os.path.exists(os.path.join(dir_path, 'assets', filename)):
                return f"![{alt}](./assets/{filename.replace(' ', '%20')})"
            elif os.path.exists(os.path.join(dir_path, filename)):
                return f"![{alt}](./{filename.replace(' ', '%20')})"
            
            return match.group(0) # unchanged

    new_content = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed: {filepath}")

for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file.endswith('.md') or file.endswith('.mdx'):
            fix_images_in_file(os.path.join(root, file))

print("Done.")
