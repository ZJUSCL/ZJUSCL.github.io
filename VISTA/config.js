/**
 * VISTA project page configuration.
 */

const CONFIG = {
  title: "VISTA: View-Consistent Self-Verified Training for GUI Grounding",
  tagline: "A GRPO-based training framework that compares rollouts across target-preserving GUI views and stabilizes coordinate learning with self-verified anchors.",
  description: "VISTA improves GUI grounding by constructing GRPO groups from target-preserving GUI views and adding a self-verified cross-view anchor.",
  keywords: [
    "GUI grounding",
    "reinforcement learning",
    "GRPO",
    "view consistency",
    "vision-language models",
    "coordinate prediction"
  ],

  authors: [
    { name: "Xinyu Qiu", link: null, affiliations: [1, 2] },
    { name: "Yunzhu Zhang", link: null, affiliations: [2] },
    { name: "Heng Jia", link: null, affiliations: [1] },
    { name: "Shuheng Shen", link: null, affiliations: [2], corresponding: true },
    { name: "Changhua Meng", link: null, affiliations: [2] },
    { name: "Linchao Zhu", link: null, affiliations: [1], corresponding: true }
  ],

  affiliations: [
    "Zhejiang University",
    "Venus Team, Ant Group"
  ],
  showEqualContribution: false,
  showCorresponding: true,
  conference: "",

  links: {
    paper: "static/pdfs/vista.pdf",
    code: "https://github.com/ZJUSCL/VISTA",
    arxiv: null,
    supplementary: null,
    huggingface: null
  },

  highlights: [],

  teaserImage: {
    title: "Training Diagnostics",
    description: "Qwen3-VL-8B training curves show how VISTA turns cross-view reward variation into stronger localization learning.",
    caption: "The diagnostics are measured on the Qwen3-VL-8B backbone. Higher ScreenSpot-Pro accuracy, content reward, and informative group ratio indicate stronger grounding signals during training.",
    images: [
      {
        src: "static/images/vista_sspro_accuracy.png",
        alt: "ScreenSpot-Pro accuracy during training",
        caption: "ScreenSpot-Pro accuracy"
      },
      {
        src: "static/images/vista_content_reward.png",
        alt: "Content reward during training",
        caption: "Content reward"
      },
      {
        src: "static/images/vista_informative_ratio.png",
        alt: "Informative group ratio during training",
        caption: "Informative group ratio"
      }
    ]
  },

  sections: [
    {
      title: "Motivation",
      html: `GUI grounding rewards are sparse and geometry-sensitive. In vanilla GRPO, repeated rollouts from the same screenshot often become all-zero on hard examples or all-one on easy examples, so the group-relative advantage collapses. VISTA changes the comparison unit: it keeps the instruction and target semantics fixed while varying the screenshot geometry through target-preserving crops.`,
      image: {
        src: "static/images/vista_motivation.png",
        alt: "Motivation diagram for VISTA",
        caption: "Target-preserving views expose useful reward variation that fixed-view GRPO often misses."
      }
    },
    {
      title: "Method",
      html: `<div class="feature-grid">
        <article class="feature-card"><h3>View-consistent rollout</h3><p>Each group is built from multiple cropped views of the same GUI instance. The target remains visible, and its box is remapped exactly into each crop's coordinate frame.</p></article>
        <article class="feature-card"><h3>Model-only baseline</h3><p>Group statistics are computed only from model-generated rollouts, so oracle answers cannot shift the GRPO baseline.</p></article>
        <article class="feature-card"><h3>Self-verified anchor</h3><p>A center-point oracle sequence is optimized only when at least one model rollout already reaches maximum reward, stabilizing coordinate format without unconditional imitation.</p></article>
      </div>`,
      image: {
        src: "static/images/vista_pipeline.png",
        alt: "VISTA framework overview",
        caption: "VISTA combines target-preserving view construction, exact coordinate remapping, and a gated cross-view anchor."
      }
    },
    {
      title: "Main Results",
      html: `<p>VISTA improves Qwen3-VL backbones across model scales on the reported evaluation suite. The largest gains appear on ScreenSpot-Pro, where high-resolution dense interfaces make small coordinate errors costly.</p>
      <div class="result-callouts">
        <div class="result-card"><span class="result-value">75.5</span><span class="result-label">Avg. score, VISTA-4B</span></div>
        <div class="result-card"><span class="result-value">76.3</span><span class="result-label">Avg. score, VISTA-8B</span></div>
        <div class="result-card"><span class="result-value">77.6</span><span class="result-label">Avg. score, VISTA-30A3B</span></div>
      </div>
      <div class="results-table-wrap">
        <table class="results-table">
          <thead><tr><th>Model</th><th>SSPro</th><th>SSV2</th><th>MMBench-L2</th><th>OSWorld-G-R</th><th>OSWorld-G</th><th>Avg.</th></tr></thead>
          <tbody>
            <tr><td>Qwen3-VL-4B</td><td>55.5</td><td>88.5</td><td>85.3</td><td>67.9</td><td>58.2</td><td>71.1</td></tr>
            <tr class="is-vista"><td>VISTA-4B</td><td>63.4</td><td>94.4</td><td>86.7</td><td>69.4</td><td>63.8</td><td>75.5</td></tr>
            <tr><td>Qwen3-VL-8B</td><td>52.7</td><td>91.7</td><td>81.3</td><td>64.4</td><td>54.8</td><td>69.0</td></tr>
            <tr class="is-vista"><td>VISTA-8B</td><td>65.8</td><td>95.5</td><td>86.8</td><td>70.8</td><td>62.4</td><td>76.3</td></tr>
            <tr><td>Qwen3-VL-30B-A3B</td><td>53.7</td><td>94.7</td><td>83.7</td><td>69.3</td><td>66.5</td><td>73.6</td></tr>
            <tr class="is-vista"><td>VISTA-30A3B</td><td>67.0</td><td>95.2</td><td>86.8</td><td>72.0</td><td>67.1</td><td>77.6</td></tr>
          </tbody>
        </table>
      </div>
      <h3 class="table-subtitle">Cross-Backbone Generalization with Qwen3.5</h3>
      <p>VISTA also transfers to Qwen3.5-initialized backbones, improving ScreenSpot-Pro and OSWorld-G-R across all reported scales.</p>
      <div class="results-table-wrap qwen-table">
        <table class="results-table">
          <thead><tr><th>Method</th><th>SSPro</th><th>SSV2</th><th>OSWorld-G</th><th>OSWorld-G-R</th></tr></thead>
          <tbody>
            <tr class="table-group-row"><td colspan="5">4B</td></tr>
            <tr><td>Qwen3.5-4B</td><td>60.3</td><td>90.4</td><td>54.4</td><td>66.8</td></tr>
            <tr><td>GRPO-4B</td><td>62.2</td><td>94.2</td><td>59.9</td><td>69.2</td></tr>
            <tr class="is-vista"><td>VISTA-4B</td><td>64.2</td><td>93.8</td><td>61.2</td><td>69.7</td></tr>
            <tr class="delta-row"><td>Delta</td><td>+2.0</td><td>-0.4</td><td>+1.3</td><td>+0.5</td></tr>
            <tr class="table-group-row"><td colspan="5">9B</td></tr>
            <tr><td>Qwen3.5-9B</td><td>65.2</td><td>91.9</td><td>63.1</td><td>74.6</td></tr>
            <tr><td>GRPO-9B</td><td>68.3</td><td>95.2</td><td>67.5</td><td>75.2</td></tr>
            <tr class="is-vista"><td>VISTA-9B</td><td>69.2</td><td>95.8</td><td>68.1</td><td>75.5</td></tr>
            <tr class="delta-row"><td>Delta</td><td>+0.9</td><td>+0.6</td><td>+0.6</td><td>+0.3</td></tr>
            <tr class="table-group-row"><td colspan="5">35B-A3B</td></tr>
            <tr><td>Qwen3.5-35B-A3B</td><td>68.6</td><td>93.8</td><td>65.8</td><td>72.5</td></tr>
            <tr><td>GRPO-35B-A3B</td><td>71.7</td><td>95.7</td><td>70.4</td><td>74.3</td></tr>
            <tr class="is-vista"><td>VISTA-35B-A3B</td><td>72.9</td><td>95.8</td><td>71.5</td><td>75.3</td></tr>
            <tr class="delta-row"><td>Delta</td><td>+1.2</td><td>+0.1</td><td>+1.1</td><td>+1.0</td></tr>
          </tbody>
        </table>
      </div>`
    },
    {
      title: "Robustness and Generalization",
      html: `<p>VISTA improves crop-view robustness and transfers beyond the Qwen3-VL initialization. In the crop perturbation diagnostic, VISTA raises crop accuracy from 93.00 to 96.25, improves worst-view accuracy from 87.63 to 92.42, and lowers prediction flip rate from 8.31 to 5.80.</p>
      <div class="results-table-wrap compact">
        <table class="results-table">
          <thead><tr><th>Model</th><th>Orig.</th><th>Crop</th><th>Worst</th><th>VCR</th><th>Flip</th></tr></thead>
          <tbody>
            <tr><td>Base</td><td>81.82</td><td>81.25</td><td>71.46</td><td>75.76</td><td>17.28</td></tr>
            <tr><td>GRPO</td><td>94.19</td><td>93.00</td><td>87.63</td><td>88.38</td><td>8.31</td></tr>
            <tr class="is-vista"><td>VISTA</td><td>95.71</td><td>96.25</td><td>92.42</td><td>90.40</td><td>5.80</td></tr>
          </tbody>
        </table>
      </div>`
    }
  ],

  bibtex: `@misc{qiu2026vista,
  title={VISTA: View-Consistent Self-Verified Training for GUI Grounding},
  author={Qiu, Xinyu and Zhang, Yunzhu and Jia, Heng and Shen, Shuheng and Meng, Changhua and Zhu, Linchao},
  year={2026},
  url={https://github.com/ZJUSCL/VISTA}
}`,

  moreWorks: null,

  seo: {
    url: "https://zjuscl.github.io/VISTA/",
    twitterSite: "",
    twitterCreator: "",
    publishDate: "2026-05-27",
    siteName: "Scaling Logger at Zhejiang University",
    institutionUrl: "https://zjuscl.github.io/",
    github: "https://github.com/ZJUSCL/VISTA",
    image: "https://zjuscl.github.io/VISTA/static/images/vista_sspro_accuracy.png"
  }
};
