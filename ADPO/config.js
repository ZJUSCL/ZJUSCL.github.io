/**
 * ADPO Project Page Configuration
 */

const CONFIG = {

  // ============================================================================
  // BASIC INFORMATION
  // ============================================================================

  title: "Unified Generation and Self-Verification for Vision-Language Models via Advantage Decoupled Preference Optimization",

  description: "ADPO is a unified RL framework that jointly learns answer generation and self-verification within a single policy, enabling efficient best-of-N test-time scaling.",

  keywords: [
    "test-time scaling",
    "self-verification",
    "vision-language models",
    "reinforcement learning",
    "preference optimization",
    "GRPO",
    "verification"
  ],

  // ============================================================================
  // AUTHORS & AFFILIATIONS
  // ============================================================================

  authors: [
    { name: "Xinyu Qiu", link: "", affiliations: [1, 2], equalContribution: true, corresponding: false },
    { name: "Heng Jia", link: "", affiliations: [1, 2], equalContribution: true, corresponding: false },
    { name: "Zhengwen Zeng", link: "", affiliations: [2], equalContribution: false, corresponding: false },
    { name: "Shuheng Shen", link: "", affiliations: [2], equalContribution: false, corresponding: true },
    { name: "Changhua Meng", link: "", affiliations: [2], equalContribution: false, corresponding: false },
    { name: "Yi Yang", link: "", affiliations: [1], equalContribution: false, corresponding: false },
    { name: "Linchao Zhu", link: "", affiliations: [1], equalContribution: false, corresponding: true }
  ],

  affiliations: [
    "College of Computer Science and Technology, Zhejiang University",
    "Venus Team, Ant Group"
  ],

  showEqualContribution: true,

  // ============================================================================
  // PUBLICATION INFO
  // ============================================================================

  conference: "",

  // ============================================================================
  // LINKS
  // ============================================================================

  links: {
    paper: "https://arxiv.org/pdf/2601.01483",
    slides: "https://github.com/ZJUSCL/ZJUSCL.github.io/blob/main/ADPO/static/pdfs/slides.pdf",
    supplementary: null,
    code: "https://github.com/ZJUSCL/ADPO",
    arxiv: "https://arxiv.org/abs/2601.01483",
    huggingface: null,
  },

  // ============================================================================
  // TEASER VIDEO
  // ============================================================================

  teaserVideo: null,

  // ============================================================================
  // ABSTRACT
  // ============================================================================

  abstract: `Parallel test-time scaling typically trains separate generation and verification models, incurring high training and inference costs. We propose Advantage Decoupled Preference Optimization (<b>ADPO</b>), a unified reinforcement learning framework that jointly learns answer generation and self-verification within a single policy. ADPO introduces two innovations: <b>a preference verification reward</b> improving verification capability and <b>a decoupled optimization mechanism</b> enabling synergistic optimization of generation and verification. Specifically, the preference verification reward computes mean verification scores from positive and negative samples as decision thresholds, providing positive feedback when prediction correctness aligns with answer correctness. Meanwhile, the advantage decoupled optimization computes separate advantages for generation and verification, applies token masks to isolate gradients, and combines masked GRPO objectives, preserving generation quality while calibrating verification scores. ADPO achieves up to <b>+34.1%</b> higher verification AUC and <b>-53.5%</b> lower inference time, with significant gains of <b>+2.8%/+1.4%</b> accuracy on MathVista/MMMU, <b>+1.9</b> cIoU on ReasonSeg, and <b>+1.7%/+1.0%</b> step success rate on AndroidControl/GUI Odyssey.`,

  // ============================================================================
  // CONTENT SECTIONS
  // ============================================================================

  sections: [
    {
      title: "Overview",
      text: "ADPO trains a single unified policy that both generates an answer and outputs a self-verification score. At inference, we sample multiple candidates and select the answer with the highest self-score, enabling reliable best-of-N test-time scaling without a separate verifier.",
      image: {
        src: "static/images/teaser.png",
        alt: "Overview of ADPO",
        caption: ""
      }
    },
    {
      title: "Training Pipeline",
      text: "The unified policy outputs an answer and a verification score token. ADPO combines a preference-based verification objective with advantage decoupling and token-level masking to jointly optimize generation and self-verification.",
      image: {
        src: "static/images/method.png",
        alt: "Training pipeline",
        caption: ""
      }
    },
    {
      title: "Experiments: Math",
      text: "",
      image: {
        src: "static/images/math.png",
        alt: "Experiments on Math",
        caption: "Math accuracy on MathVista and MMMU. Base model is Qwen2-VL-7B. The best results are in bold."
      }
    },
    {
      title: "Experiments: Grounding",
      text: "",
      image: {
        src: "static/images/grounding.png",
        alt: "Experiments on Grounding",
        caption: "Performance on ReasonSeg. Base model is Qwen2.5-VL-7B."
      }
    },
    {
      title: "Experiments: Mobile Agent",
      text: "",
      image: {
        src: "static/images/mobile_agent.png",
        alt: "Experiments on Mobile Agent",
        caption: "Results on AndroidControl and GUI Odyssey. Base model is Qwen2.5-VL-7B."
      }
    }


  ],

  // ============================================================================
  // BIBTEX CITATION
  // ============================================================================

  bibtex: `@misc{qiu2026unifiedgenerationselfverificationvisionlanguage,
      title={Unified Generation and Self-Verification for Vision-Language Models via Advantage Decoupled Preference Optimization}, 
      author={Xinyu Qiu and Heng Jia and Zhengwen Zeng and Shuheng Shen and Changhua Meng and Yi Yang and Linchao Zhu},
      year={2026},
      eprint={2601.01483},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2601.01483}, 
}`,

  // ============================================================================
  // MORE WORKS (Floating dropdown)
  // ============================================================================

  moreWorks: null,

  // ============================================================================
  // SEO & SOCIAL MEDIA
  // ============================================================================

  seo: {
    url: "https://zjuscl.github.io/ADPO/",
    twitterSite: "",
    twitterCreator: "",
    publishDate: "2026-01-01",
    siteName: "Zhejiang University & Ant Group",
    institutionUrl: "https://zjuscl.github.io/",
    github: "ZJUSCL",
    image: "https://zjuscl.github.io/ADPO/static/images/social_preview.png"
  }
};
