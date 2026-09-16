import os
import subprocess
import sys

try:
    import emoji
except ImportError:
    print("Installing emoji package...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "emoji"])
    import emoji

def clean_text(text):
    # Remove all emojis
    return emoji.replace_emoji(text, replace='')

def process_content(filepath):
    # Only process text-based files
    ext = os.path.splitext(filepath)[1].lower()
    valid_exts = {'.md', '.mdx', '.js', '.jsx', '.ts', '.tsx', '.json', '.css'}
    if ext not in valid_exts:
        return
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        cleaned = clean_text(content)
        if cleaned != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)
            print(f"Cleaned content: {filepath}")
    except Exception as e:
        # Ignore binary or read-error files
        pass

def main():
    root_dir = r"C:\Users\Harsh\HiHarsh\Coding\Python\Recommendation System\HashLearns"
    
    # 1. Process contents
    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in root or '.git' in root or '.docusaurus' in root or 'build' in root:
            continue
            
        for file in files:
            process_content(os.path.join(root, file))
            
    # 2. Rename directories (bottom-up to avoid breaking paths)
    for root, dirs, files in os.walk(root_dir, topdown=False):
        if 'node_modules' in root or '.git' in root or '.docusaurus' in root or 'build' in root:
            continue
            
        for file in files:
            clean_name = clean_text(file).strip()
            if clean_name != file and clean_name:
                old_path = os.path.join(root, file)
                new_path = os.path.join(root, clean_name)
                os.rename(old_path, new_path)
                print(f"Renamed file: {file} -> {clean_name}")
                
        for d in dirs:
            clean_name = clean_text(d).strip()
            if clean_name != d and clean_name:
                old_path = os.path.join(root, d)
                new_path = os.path.join(root, clean_name)
                os.rename(old_path, new_path)
                print(f"Renamed directory: {d} -> {clean_name}")

if __name__ == '__main__':
    main()
