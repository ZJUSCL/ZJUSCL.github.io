/**
 * Academic Project Page Configuration
 *
 * Edit this file to customize your project page.
 * After making changes, simply refresh the browser to see updates.
 */

const CONFIG = {

  // ============================================================================
  // BASIC INFORMATION
  // ============================================================================

  // Paper title (displayed as main heading)
  title: "MVP: Multiple View Prediction Improves GUI Grounding",

  // Short description (150-160 characters for SEO)
  description: "A training-free framework that enhances GUI grounding through multi-view inference, addressing coordinate prediction instability.",

  // Keywords for SEO (5-10 relevant terms)
  keywords: [
    "GUI grounding",
    "multi-view prediction",
    "GUI agents",
    "computer vision",
    "vision-language models",
    "coordinate prediction",
    "ScreenSpot",
    "CVPR 2026"
  ],

  // ============================================================================
  // AUTHORS & AFFILIATIONS
  // ============================================================================

  // List all authors with their affiliation numbers
  authors: [
    {
      name: "Yunzhu Zhang",
      link: "https://github.com/YunzhuZhang0918",
      affiliations: [1],
      equalContribution: false
    },
    {
      name: "Zeyu Pan",
      link: "https://github.com/panzeyucs",
      affiliations: [2],
      equalContribution: false
    },
    {
      name: "Zhengwen Zeng",
      link: "",
      affiliations: [3],
      equalContribution: false
    },
    {
      name: "Shuheng Shen",
      link: "",
      affiliations: [3],
      equalContribution: false
    },
    {
      name: "Changhua Meng",
      link: "",
      affiliations: [3],
      equalContribution: false
    },
    {
      name: "Linchao Zhu",
      link: "https://github.com/zhulinchao",
      affiliations: [1],
      equalContribution: false
    }
  ],

  // List all affiliations (order matters - index starts at 1)
  affiliations: [
    "Zhejiang University",
    "Hangzhou Dianzi University",
    "Ant Group"
  ],

  // Show "Indicates Equal Contribution" note (set to false to hide)
  showEqualContribution: true,

  // ============================================================================
  // PUBLICATION INFO
  // ============================================================================

  conference: "arXiv preprint",

  // ============================================================================
  // LINKS
  // ============================================================================

  links: {
    // Paper PDF (arXiv or direct link)
    paper: "https://arxiv.org/pdf/2512.08529",

    // Supplementary material PDF (set to null to hide)
    supplementary: null,

    // GitHub repository (set to null to hide)
    code: "https://github.com/ZJUSCL/MVP",

    // Hugging Face Collection (set to null to hide)
    huggingface: null,
  },

  // ============================================================================
  // TEASER VIDEO
  // ============================================================================

  teaserVideo: {
    src: null,
    caption: null
  },

  // ============================================================================
  // ABSTRACT
  // ============================================================================

  abstract: `GUI grounding, which translates natural language instructions into precise pixel coordinates, is essential for developing practical GUI agents. However, we observe that existing grounding models exhibit significant coordinate prediction instability—minor visual perturbations (e.g., cropping a few pixels) can drastically alter predictions, flipping results between correct and incorrect. This instability severely undermines model performance, especially for samples with high-resolution and small UI elements. To address this issue, we propose Multi-View Prediction (MVP), a training-free framework that enhances grounding performance through multi-view inference. Our key insight is that while single-view predictions may be unstable, aggregating predictions from multiple carefully cropped views can effectively distinguish correct coordinates from outliers. MVP comprises two components: (1) Attention-Guided View Proposal, which derives diverse views guided by instruction-to-image attention scores, and (2) Multi-Coordinates Clustering, which ensembles predictions by selecting the centroid of the densest spatial cluster. Extensive experiments demonstrate MVP's effectiveness across various models and benchmarks. Notably, on ScreenSpot-Pro, MVP boosts UI-TARS-1.5-7B to 56.1%, GTA1-7B to 61.7%, Qwen3VL-8B-Instruct to 65.3%, and Qwen3VL-32B-Instruct to 74.0%.`,

  // ============================================================================
  // CONTENT SECTIONS
  // Each section has: title, text, and image
  // ============================================================================

  sections: [
    {
      title: "Coordinate Prediction Instability",
      text: `Existing GUI grounding models exhibit significant coordinate prediction instability. Minor visual perturbations, such as cropping a few pixels, can drastically alter predictions—flipping results between correct and incorrect. This instability is particularly severe for high-resolution screenshots with small UI elements. Our analysis reveals that single-view predictions are highly sensitive to input variations, making current models unreliable for practical GUI agent applications.`,
      image: {
        src: "static/images/resolution_analysis.png",
        alt: "Resolution analysis",
        caption: "Figure 1: Impact of resolution on grounding performance."
      }
    },
    {
      title: "Method Overview",
      text: `We propose Multi-View Prediction (MVP), a training-free framework that enhances grounding performance through multi-view inference. The key insight is that while single-view predictions may be unstable, aggregating predictions from multiple carefully cropped views can effectively distinguish correct coordinates from outliers. MVP consists of two main components: (1) Attention-Guided View Proposal derives diverse views guided by instruction-to-image attention scores, and (2) Multi-Coordinates Clustering ensembles predictions by selecting the centroid of the densest spatial cluster.`,
      image: {
        src: "static/images/fig1.pdf",
        alt: "MVP framework overview",
        caption: "Figure 2: Overview of the MVP framework."
      }
    },
    {
      title: "Attention-Guided View Proposal",
      text: `To generate informative views, we leverage the attention maps from vision-language models. The attention scores between the instruction and image regions guide us to identify and crop relevant areas. This attention-guided approach ensures that multiple views focus on different parts of the screen while maintaining relevance to the grounding task, enabling more robust coordinate predictions.`,
      image: {
        src: "static/images/arch.pdf",
        alt: "Architecture diagram",
        caption: "Figure 3: Architecture of the attention-guided view proposal module."
      }
    },
    {
      title: "Multi-Coordinates Clustering",
      text: `After obtaining predictions from multiple views, we aggregate them through spatial clustering. By clustering all predicted coordinates, we can identify the densest region where consistent predictions converge. The centroid of this cluster is selected as the final prediction, effectively filtering out outliers and unstable predictions from individual views.`,
      image: {
        src: "static/images/prediction_analysis_pie_chart.png",
        alt: "Prediction analysis",
        caption: "Figure 4: Distribution analysis of coordinate predictions across multiple views."
      }
    },
    {
      title: "Performance on ScreenSpot-Pro",
      text: `MVP significantly improves performance across various foundation models. On the ScreenSpot-Pro benchmark, our method boosts UI-TARS-1.5-7B from 49.3% to 56.1%, GTA1-7B from 54.9% to 61.7%, Qwen3VL-8B-Instruct from 59.6% to 65.3%, and Qwen3VL-32B-Instruct from 68.3% to 74.0%. These consistent improvements demonstrate the effectiveness and generalizability of our approach.`,
      image: {
        src: "static/images/multi_model_radar_comparison_grouped.png",
        alt: "Multi-model comparison",
        caption: "Figure 5: Performance comparison across different foundation models with MVP enhancement."
      }
    },
    {
      title: "Impact of View Number",
      text: `We analyze how the number of views affects grounding performance. As shown in the figure, using 3-5 views achieves the best balance between performance and computational cost. Too few views may not provide sufficient information for robust clustering, while too many views introduce noise and increase inference time without significant gains.`,
      image: {
        src: "static/images/sspro_avg_score_vs_view_number.png",
        alt: "View number analysis",
        caption: "Figure 6: Average accuracy versus number of views on ScreenSpot-Pro."
      }
    },
    {
      title: "Qualitative Results",
      text: `The figure visualizes qualitative examples of MVP improving GUI grounding. For each example, we show the original screenshot with the instruction, attention heatmap, cropped views, and final predictions. Our method successfully handles various challenges including small UI elements, complex layouts, and ambiguous instructions.`,
      image: {
        src: "static/images/example1.pdf",
        alt: "Qualitative examples",
        caption: "Figure 7: Qualitative examples demonstrating MVP's effectiveness on challenging GUI grounding cases."
      }
    }
  ],

  // ============================================================================
  // BIBTEX CITATION
  // ============================================================================

  bibtex: `@article{zhang2025mvp,
  title={MVP: Multiple View Prediction Improves GUI Grounding},
  author={Zhang, Yunzhu and Pan, Zeyu and Zeng, Zhengwen and Shen, Shuheng and Meng, Changhua and Zhu, Linchao},
  journal={arXiv preprint arXiv:2512.08529},
  year={2025},
  url={https://github.com/ZJUSCL/MVP}
}`,

  // ============================================================================
  // MORE WORKS (Floating dropdown)
  // ============================================================================

  moreWorks: null,

  // ============================================================================
  // SEO & SOCIAL MEDIA
  // ============================================================================

  seo: {
    // Full URL of this project page
    url: "https://zjuscl.github.io/MVP-Grounding/",

    // First author Twitter handle
    twitterCreator: "",

    // Publication date (ISO format: YYYY-MM-DD)
    publishDate: "2025-01-06",

    // Institution or Lab name
    siteName: "Zhejiang University & Ant Group",

    // Institution website URL
    institutionUrl: "https://zjuscl.github.io/",

    // GitHub username/organization
    github: "https://github.com/ZJUSCL/",

    // Social preview image (1200x630px recommended)
    image: "https://zjuscl.github.io/MVP-Grounding/static/images/output.png"
  }
};
