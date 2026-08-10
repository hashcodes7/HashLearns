const fs = require('fs');
const path = require('path');

const ARCH_REPO = "C:\\Users\\Harsh\\HiHarsh\\Coding\\Python\\GPT2-End-to-End-Architecture";
const CHAT_REPO = "C:\\Users\\Harsh\\HiHarsh\\Coding\\Python\\GPT2-End-to-End-Chat";
const DOCS_DIR = path.join(__dirname, 'docs', 'ai', 'gpt2-architecture-end-to-end');

const mapping = [
    {
        title: "Chapter 6.3 - PyTorch Implementation",
        filename: "Chapter-6.3---PyTorch-Implementation.mdx",
        folder: "Chapter-6-Multi-Head-Attention",
        sources: [
            { repo: ARCH_REPO, file: "b_multiHeadAttention.py" }
        ]
    },
    {
        title: "Chapter 7.3 - PyTorch Implementation (LayerNorm)",
        filename: "Chapter-7.3---PyTorch-Implementation.mdx",
        folder: "Chapter-7-Pre-FFN-Cleanup",
        sources: [
            { repo: ARCH_REPO, file: "a_layerNorm.py" }
        ]
    },
    {
        title: "Chapter 8.4 - PyTorch Implementation (FFN)",
        filename: "Chapter-8.4---PyTorch-Implementation.mdx",
        folder: "Chapter-8-Feed-Forward-Network-FFN",
        sources: [
            { repo: ARCH_REPO, file: "c_ffn.py" }
        ]
    },
    {
        title: "Chapter 10.5 - PyTorch Implementation (Generation)",
        filename: "Chapter-10.5---PyTorch-Implementation.mdx",
        folder: "Chapter-10-Next-Word-Generation",
        sources: [
            { repo: ARCH_REPO, file: "e_gpt_model.py" },
            { repo: ARCH_REPO, file: "f_token_generator.py" },
            { repo: ARCH_REPO, file: "g_text_generator.py" }
        ]
    },
    {
        title: "Chapter 11.9 - PyTorch Implementation (Training)",
        filename: "Chapter-11.9---PyTorch-Implementation.mdx",
        folder: "Chapter-11-Training",
        sources: [
            { repo: ARCH_REPO, file: "i_gpt_dataset.py" },
            { repo: ARCH_REPO, file: "j_dataloader.py" },
            { repo: ARCH_REPO, file: "k_loss_calculator.py" },
            { repo: ARCH_REPO, file: "l_trainer.py" }
        ]
    },
    {
        title: "Chapter 12.5 - PyTorch Implementation (Weights)",
        filename: "Chapter-12.5---PyTorch-Implementation.mdx",
        folder: "Chapter-12-Pretrained-Weights",
        sources: [
            { repo: ARCH_REPO, file: "n_gpt_download.py" },
            { repo: ARCH_REPO, file: "o_tensorflow_model_loader.py" }
        ]
    },
    {
        title: "Chapter 13.5 - PyTorch Implementation (Instruction Finetuning)",
        filename: "Chapter-13.5---PyTorch-Implementation.mdx",
        folder: "Chapter-13-Finetuning",
        sources: [
            { repo: ARCH_REPO, file: "q_instructionDataSet.py" },
            { repo: ARCH_REPO, file: "r_collate.py" }
        ]
    },
    {
        title: "Chapter 15.6 - PyTorch Implementation (Chat & Masking)",
        filename: "Chapter-15.6---PyTorch-Implementation.mdx",
        folder: "Chapter-15-Multi turn chatting",
        sources: [
            { repo: CHAT_REPO, file: "q_chatDataSet.py" },
            { repo: CHAT_REPO, file: "r_collate.py" }
        ]
    }
];

mapping.forEach(task => {
    const destPath = path.join(DOCS_DIR, task.folder, task.filename);
    
    let content = `---\ntitle: "${task.title}"\n---\n\n# ${task.title}\n\nBelow is the complete PyTorch implementation for this module. You can copy and paste this code directly into your project.\n\n`;
    
    task.sources.forEach(src => {
        const srcPath = path.join(src.repo, src.file);
        if (fs.existsSync(srcPath)) {
            const code = fs.readFileSync(srcPath, 'utf8');
            content += `## \`${src.file}\`\n\n\`\`\`python\n${code}\n\`\`\`\n\n`;
        } else {
            console.error(`Warning: Source file not found: ${srcPath}`);
        }
    });
    
    // Create directory if it doesn't exist (though they should exist)
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Created: ${task.filename}`);
});

console.log("Code injection complete.");
