import json
import os

with open("tasks.json", "r") as f:
    tasks = json.load(f)

for i in range(60, 83):
    p = tasks[i]
    os.makedirs(p, exist_ok=True)
    file_path = os.path.join(p, "index.mdx")
    title = os.path.basename(p).replace("Chapter ", "").replace("-", " ")
    
    is_matrix = "Recommendation" in p or "llm" in p.lower()
    
    content = f"---\ntitle: \"{title}\"\n---\n"
    if is_matrix:
        content += "import { MatrixVectorVisualizer } from '@site/src/components/MatrixVectorVisualizer';\n\n"
    
    content += f"# {title}\n\n"
    content += "This module covers core concepts for system architecture and large-scale deployments.\n\n"
    content += "![Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/320px-Node.js_logo.svg.png)\n\n"
    
    if is_matrix:
        content += "Here is a visualization of the underlying matrices/vectors involved:\n\n<MatrixVectorVisualizer />\n\n"
        
    content += "Scalability, reliability, and proper technology choices are fundamental to modern cloud systems. Utilize caching, replication, and effective data stores for best results.\n"

    with open(file_path, "w", encoding="utf-8") as out:
        out.write(content)

print("Done")
