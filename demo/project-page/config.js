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
  // TODO
  title: "Academic Project Page",

  // Short description (150-160 characters for SEO)
  // TODO
  description: "Brief description of your research contribution and findings. This will appear in search results and social media previews.",

  // Keywords for SEO (5-10 relevant terms)
  // TODO
  keywords: [
    "machine learning",
    "computer vision",
    "deep learning",
    "artificial intelligence",
    "neural networks"
  ],

  // ============================================================================
  // AUTHORS & AFFILIATIONS
  // ============================================================================

  // TODO: List all authors with their affiliation numbers
  authors: [
    {
      name: "First Author",
      link: "https://example.com/first-author",  // Personal website or Google Scholar
      affiliations: [1],                          // Affiliation numbers (can have multiple: [1, 2])
      equalContribution: true                     // Set to true for equal contribution marker (*)
    },
    {
      name: "Second Author",
      link: "https://example.com/second-author",
      affiliations: [1, 2],
      equalContribution: true
    },
    {
      name: "Third Author",
      link: "https://example.com/third-author",
      affiliations: [2],
      equalContribution: false
    }
  ],

  // TODO: List all affiliations (order matters - index starts at 1)
  affiliations: [
    "Zhejiang University",
    "Stanford University"
  ],

  // Show "Indicates Equal Contribution" note (set to false to hide)
  showEqualContribution: true,

  // ============================================================================
  // PUBLICATION INFO
  // ============================================================================

  // TODO
  conference: "Conference Name and Year",  // e.g., "CVPR 2024", "NeurIPS 2024"

  // ============================================================================
  // LINKS
  // ============================================================================

  // TODO
  links: {
    // Paper PDF (arXiv or direct link)
    paper: "https://arxiv.org/pdf/xxxx.xxxxx.pdf",

    // Supplementary material PDF (set to null to hide)
    supplementary: "static/pdfs/supplementary_material.pdf",

    // GitHub repository (set to null to hide)
    code: "https://github.com/your-username/your-repo",

    // Hugging Face Collection (set to null to hide)
    huggingface: "https://huggingface.co/ZJUSCL/your-collection",
  },

  // ============================================================================
  // TEASER VIDEO
  // ============================================================================

  // TODO
  teaserVideo: {
    src: "static/videos/banner_video.mp4",
    // Caption displayed below the video
    caption: "Aliquam vitae elit ullamcorper tellus egestas pellentesque. Ut lacus tellus, maximus vel lectus at, placerat pretium mi."
  },

  // ============================================================================
  // ABSTRACT
  // ============================================================================

  // TODO
  abstract: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper tellus sed ante aliquam tempus. Etiam porttitor urna feugiat nibh elementum, et tempor dolor mattis. Donec accumsan enim augue, a vulputate nisi sodales sit amet. Proin bibendum ex eget mauris cursus euismod nec et nibh. Maecenas ac gravida ante, nec cursus dui. Vivamus purus nibh, placerat ac purus eget, sagittis vestibulum metus. Sed vestibulum bibendum lectus gravida commodo. Pellentesque auctor leo vitae sagittis suscipit.`,

  // ============================================================================
  // CONTENT SECTIONS
  // Each section has: title, text, and image
  // ============================================================================


  // TODO
  sections: [
    {
      title: "Method Overview",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper tellus sed ante aliquam tempus. Etiam porttitor urna feugiat nibh elementum, et tempor dolor mattis.",
      image: {
        src: "static/images/carousel1.jpg",
        alt: "Method overview diagram",
        caption: "Figure 1: Overview of our proposed method."
      }
    },
    {
      title: "Experimental Results",
      text: "Donec accumsan enim augue, a vulputate nisi sodales sit amet. Proin bibendum ex eget mauris cursus euismod nec et nibh. Maecenas ac gravida ante, nec cursus dui.",
      image: {
        src: "static/images/carousel2.jpg",
        alt: "Experimental results",
        caption: "Figure 2: Quantitative comparison with baseline methods."
      }
    },
    {
      title: "Qualitative Analysis",
      text: "Vivamus purus nibh, placerat ac purus eget, sagittis vestibulum metus. Sed vestibulum bibendum lectus gravida commodo. Pellentesque auctor leo vitae sagittis suscipit.",
      image: {
        src: "static/images/carousel3.jpg",
        alt: "Qualitative analysis",
        caption: "Figure 3: Visual comparison of our method versus baselines."
      }
    }
  ],

  // ============================================================================
  // BIBTEX CITATION
  // ============================================================================
  // TODO
  bibtex: `@article{YourPaperKey2024,
  title={Your Paper Title Here},
  author={First Author and Second Author and Third Author},
  journal={Conference/Journal Name},
  year={2024},
  url={https://your-domain.com/your-project-page}
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
    // TODO
    url: "https://zjuscl.github.io/your-project-page",

    // First author Twitter handle
    // TODO
    twitterCreator: "@FirstAuthorHandle",

    // Publication date (ISO format: YYYY-MM-DD)
    // TODO
    publishDate: "2025-01-01",

    // Institution or Lab name
    siteName: "Scaling Logger at Zhejiang University",

    // Institution website URL
    institutionUrl: "https://zjuscl.github.io/",

    // GitHub username/organization
    github: "https://github.com/ZJUSCL/",

    // Social preview image (1200x630px recommended)
    image: "https://zjuscl.github.io/static/images/social_preview.png"
  }
};
