import os
import zipfile
import shutil
from pathlib import Path

def extract_comics():
    print("Extracting comic zip files...")
    # Walk through the docs folder
    docs_dir = Path('docs')
    if not docs_dir.exists():
        print("No docs directory found.")
        return
        
    for zip_path in docs_dir.rglob('*.zip'):
        # Target extraction folder (e.g., assets/logisticreg/)
        extract_dir = zip_path.parent / zip_path.stem
        
        # We clean the directory if it already exists to ensure no stale files remain
        if extract_dir.exists():
            shutil.rmtree(extract_dir)
            
        extract_dir.mkdir(parents=True, exist_ok=True)
        
        # Extract the zip
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_dir)
            print(f"Extracted {zip_path.name} to {extract_dir}/")
            

                
        except Exception as e:
            print(f"Failed to extract {zip_path.name}: {e}")

if __name__ == '__main__':
    extract_comics()
