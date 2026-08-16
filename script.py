import os
import re

dirs = [
    r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\docs\sys\Dockerization-Manually',
    r'C:\Users\Harsh\HiHarsh\Coding\React\HashLearns\docs\sys\Dockerization-using-CI-CD'
]

for d in dirs:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                
                # Match number prefix like "1-", "4.1-"
                match = re.match(r'^([0-9]+(?:\.[0-9]+)?)-', file)
                if not match:
                    continue
                    
                num_prefix = match.group(1)
                
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # We expect frontmatter to exist since we just added it
                if content.startswith('---'):
                    # Check if sidebar_position is already there
                    if 'sidebar_position:' not in content:
                        # Insert sidebar_position into frontmatter
                        # The frontmatter looks like:
                        # ---
                        # sidebar_label: "..."
                        # ---
                        content = content.replace(
                            '---\n\n',
                            f'sidebar_position: {num_prefix}\n---\n\n',
                            1
                        )
                        
                        # Just in case it wasn't exactly '---\n\n', let's use regex
                        if f'sidebar_position: {num_prefix}' not in content:
                            content = re.sub(
                                r'(^---\n(?:.*?\n)*?)(---)',
                                rf'\1sidebar_position: {num_prefix}\n\2',
                                content,
                                count=1
                            )
                        
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(content)

print("sidebar_position added!")
