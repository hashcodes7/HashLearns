import re

with open('old_custom.css', 'r', encoding='utf-16') as f:
    css_content = f.read()

# Let's extract everything related to footer
footer_blocks = re.findall(r'(\.custom-footer[^{]*\{[^}]*\})', css_content, re.MULTILINE | re.DOTALL)

# Let's also grab any general footer tags if present
other_footer_blocks = re.findall(r'(footer\s*\{[^}]*\})', css_content, re.MULTILINE | re.DOTALL)

with open('src/css/custom.css', 'a', encoding='utf-8') as f:
    f.write('\n\n/* --- RESTORED FOOTER CSS --- */\n')
    for block in footer_blocks:
        f.write(block + '\n\n')
    for block in other_footer_blocks:
        f.write(block + '\n\n')
        
print(f"Restored {len(footer_blocks)} .custom-footer blocks and {len(other_footer_blocks)} generic footer blocks.")
