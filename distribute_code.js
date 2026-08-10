const fs = require('fs');
const path = require('path');

const ARCH_REPO = "C:\\Users\\Harsh\\HiHarsh\\Coding\\Python\\GPT2-End-to-End-Architecture";
const CHAT_REPO = "C:\\Users\\Harsh\\HiHarsh\\Coding\\Python\\GPT2-End-to-End-Chat";
const DOCS_DIR = path.join(__dirname, 'docs', 'ai', 'gpt2-architecture-end-to-end');

function appendCode(chapterPath, code, title = "💻 Code Implementation") {
    const fullPath = path.join(DOCS_DIR, chapterPath);
    if (!fs.existsSync(fullPath)) {
        console.error(`Missing target file: ${fullPath}`);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Prevent double appending
    if (content.includes(`## ${title}`)) {
        console.log(`Skipping (already injected): ${fullPath}`);
        return;
    }
    
    content += `\n\n---\n\n## ${title}\n\nHere is the exact PyTorch implementation for the concepts discussed above:\n\n\`\`\`python\n${code}\n\`\`\`\n`;
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Injected code into: ${chapterPath}`);
}

// 1. MultiHeadAttention
const mhaCode = fs.readFileSync(path.join(ARCH_REPO, 'b_multiHeadAttention.py'), 'utf8');
appendCode('Chapter-6-Multi-Head-Attention/Chapter-6.1---Multi-Head-Self-Attention.mdx', mhaCode);

// 2. LayerNorm
const lnCode = fs.readFileSync(path.join(ARCH_REPO, 'a_layerNorm.py'), 'utf8');
appendCode('Chapter-7-Pre-FFN-Cleanup/Chapter-7.2---1st-Layer-Normalization.mdx', lnCode);

// 3. FFN (Split)
const ffnRaw = fs.readFileSync(path.join(ARCH_REPO, 'c_ffn.py'), 'utf8');
const geluSplit = ffnRaw.split('class GELU(nn.Module):');
const feedForwardCode = geluSplit[0].trim();
const geluCode = "import torch\nimport torch.nn as nn\n\nclass GELU(nn.Module):" + geluSplit[1].trim();

appendCode('Chapter-8-Feed-Forward-Network-FFN/Chapter-8.2---GELU-Activation-Function.mdx', geluCode);
appendCode('Chapter-8-Feed-Forward-Network-FFN/Chapter-8.3---Second-Linear-Layer.mdx', feedForwardCode);

// 4. Token Generation (Loop)
const genCode = fs.readFileSync(path.join(ARCH_REPO, 'f_token_generator.py'), 'utf8');
appendCode('Chapter-10-Next-Word-Generation/Chapter-10.3---Autoregressive-Generation-Loop.mdx', genCode);

// 5. GPT Model
const gptCode = fs.readFileSync(path.join(ARCH_REPO, 'e_gpt_model.py'), 'utf8');
appendCode('Chapter-10-Next-Word-Generation/Chapter-10.4---Complete-Inference-Walkthrough.mdx', gptCode);

// 6. Training Dataset
const dsCode = fs.readFileSync(path.join(ARCH_REPO, 'i_gpt_dataset.py'), 'utf8');
appendCode('Chapter-11-Training/Chapter-11.2---Generating-Text-Batches.mdx', dsCode);

// 7. Loss Calculator
const lossCode = fs.readFileSync(path.join(ARCH_REPO, 'k_loss_calculator.py'), 'utf8');
appendCode('Chapter-11-Training/Chapter-11.3---Calculating-the-Batch-Loss.mdx', lossCode);

// 8. Trainer Pipeline
const trainerCode = fs.readFileSync(path.join(ARCH_REPO, 'l_trainer.py'), 'utf8');
appendCode('Chapter-11-Training/Chapter-11.8---Complete-Training-Pipeline.mdx', trainerCode);

// 9. Finetuning Instruction Dataset
const instCode = fs.readFileSync(path.join(ARCH_REPO, 'q_instructionDataSet.py'), 'utf8');
appendCode('Chapter-13-Finetuning/Chapter-13.2---Instruction-Dataset.mdx', instCode);

// 10. Finetuning Collate
const collateArchCode = fs.readFileSync(path.join(ARCH_REPO, 'r_collate.py'), 'utf8');
appendCode('Chapter-13-Finetuning/Chapter-13.3---Collate-Function-Padding-Masking.mdx', collateArchCode);

// 11. Chat Dataset
const chatDsCode = fs.readFileSync(path.join(CHAT_REPO, 'q_chatDataSet.py'), 'utf8');
appendCode('Chapter-15-Multi turn chatting/Chapter-15.3---Chat Dataset.mdx', chatDsCode);

// 12. Chat Collate
const chatCollateCode = fs.readFileSync(path.join(CHAT_REPO, 'r_collate.py'), 'utf8');
appendCode('Chapter-15-Multi turn chatting/Chapter-15.4---Collate function.mdx', chatCollateCode);

console.log("Distribution complete.");
