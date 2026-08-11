export type ArchitectureNode = {
  id: string;
  label: string;
  route?: string;
  children?: ArchitectureNode[];
};

export const gpt2Architecture: ArchitectureNode = {
  id: "gpt2",
  label: "GPT-2",
  route: "/docs/ai/LLM Components/gpt2",
  children: [
    {
      id: "tokenizer",
      label: "Tokenizer",
      route: "/docs/ai/LLM Components/Chapter-1-Tokenizer/Chapter-1.1-BPE",
    },
    {
      id: "input-representation",
      label: "Input Representation",
      children: [
        {
          id: "token-embeddings",
          label: "Token Embeddings",
          route: "/docs/ai/LLM Components/Chapter-2-Token Embeddings/Chapter-2.1-Learned-Embeddings",
        },
        {
          id: "positional-embeddings",
          label: "Positional Embeddings",
          route: "/docs/ai/LLM Components/Chapter-3-Positional Encoding/Chapter-3.1-Sinusoidal",
        },
      ],
    },
    {
      id: "decoder-stack",
      label: "Transformer Decoder Stack",
      children: [
        {
          id: "layer-normalization-1",
          label: "Layer Normalization",
          route: "/docs/ai/LLM Components/Chapter-4-Layer Normalization/Chapter-4.1-Standard-LayerNorm",
        },
        {
          id: "masked-multi-head-attention",
          label: "Masked Multi-Head Self-Attention",
          route: "/docs/ai/LLM Components/Chapter-5-Self Attention/Chapter-5.1-Multi-Head-Attention",
          children: [
            { id: "query-proj", label: "Query Projection" },
            { id: "key-proj", label: "Key Projection" },
            { id: "value-proj", label: "Value Projection" },
            { id: "attention-scores", label: "Attention Scores" },
            { id: "causal-mask", label: "Causal Mask" },
            { id: "softmax-attn", label: "Softmax", route: "/docs/ai/LLM Components/Chapter-9-Output and Decoding/Chapter-9.2-Softmax" },
            { id: "output-proj", label: "Output Projection" },
          ],
        },
        {
          id: "residual-connection-1",
          label: "Residual Connection",
          route: "/docs/ai/LLM Components/Chapter-6-Residual Connections/Chapter-6.1-Pre-Norm-vs-Post-Norm",
        },
        {
          id: "layer-normalization-2",
          label: "Layer Normalization",
          route: "/docs/ai/LLM Components/Chapter-4-Layer Normalization/Chapter-4.1-Standard-LayerNorm",
        },
        {
          id: "feed-forward-network",
          label: "Feed Forward Network",
          route: "/docs/ai/LLM Components/Chapter-8-Feed Forward Network/Chapter-8.1-Standard-FFN",
          children: [
            { id: "ffn-linear-1", label: "Linear Layer", route: "/docs/ai/LLM Components/Chapter-8-Feed Forward Network/Chapter-8.1-Standard-FFN" },
            { id: "ffn-activation", label: "Activation Function", route: "/docs/ai/LLM Components/Chapter-7-Activation Functions/Chapter-7.2-GELU" },
            { id: "ffn-linear-2", label: "Linear Layer", route: "/docs/ai/LLM Components/Chapter-8-Feed Forward Network/Chapter-8.1-Standard-FFN" },
          ],
        },
        {
          id: "residual-connection-2",
          label: "Residual Connection",
          route: "/docs/ai/LLM Components/Chapter-6-Residual Connections/Chapter-6.1-Pre-Norm-vs-Post-Norm",
        },
      ],
    },
    {
      id: "final-layer-normalization",
      label: "Final Layer Normalization",
      route: "/docs/ai/LLM Components/Chapter-4-Layer Normalization/Chapter-4.1-Standard-LayerNorm",
    },
    {
      id: "vocabulary-projection",
      label: "Vocabulary Projection",
      route: "/docs/ai/LLM Components/Chapter-9-Output and Decoding/Chapter-9.1-Vocabulary-Projection",
    },
    {
      id: "softmax-final",
      label: "Softmax",
      route: "/docs/ai/LLM Components/Chapter-9-Output and Decoding/Chapter-9.2-Softmax",
    },
    {
      id: "token-sampling",
      label: "Token Sampling / Decoding",
      route: "/docs/ai/LLM Components/Chapter-9-Output and Decoding/Chapter-9.3-Greedy-Search",
    },
  ],
};
