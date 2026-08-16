import os
import re

# 1. Delete files
files_to_delete = [
    r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\docs\intro.mdx',
    r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\docs\hello.md',
    r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\docs\my-doc.md'
]
for f in files_to_delete:
    if os.path.exists(f):
        os.remove(f)

# 2. Update sidebars.ts
sidebars_path = r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\sidebars.ts'
with open(sidebars_path, 'r', encoding='utf-8') as f:
    sidebars = f.read()

sidebars = re.sub(r"'intro',\s*'hello',\s*'my-doc-id',?", "", sidebars)
sidebars = sidebars.replace("href: '/docs/intro'", "href: '/'")

with open(sidebars_path, 'w', encoding='utf-8') as f:
    f.write(sidebars)

# 3. Update docusaurus.config.ts
config_path = r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\docusaurus.config.ts'
with open(config_path, 'r', encoding='utf-8') as f:
    config = f.read()

config = config.replace("to: '/docs/intro'", "to: '/'")

with open(config_path, 'w', encoding='utf-8') as f:
    f.write(config)

# 4. Update Footer index.tsx
footer_path = r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\src\theme\Footer\index.tsx'
if os.path.exists(footer_path):
    with open(footer_path, 'r', encoding='utf-8') as f:
        footer = f.read()
        
    footer = footer.replace('<Link to="/docs/intro">', '<Link to="/">')
    
    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(footer)

print('Cleanup completed.')
