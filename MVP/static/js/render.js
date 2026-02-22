/**
 * Academic Project Page Renderer
 *
 * This script reads the CONFIG object and populates the page content.
 * It runs automatically when the DOM is loaded.
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof CONFIG === 'undefined') {
      console.error('CONFIG is not defined. Make sure config.js is loaded before render.js');
      return;
    }
    renderPage();
  });

  function renderPage() {
    renderMetaTags();
    renderStructuredData();
    renderHero();
    renderLinks();
    renderTeaserVideo();
    renderAbstract();
    renderSections();
    renderBibTeX();
    renderMoreWorks();
  }

  // ============================================================================
  // META TAGS
  // ============================================================================

  function renderMetaTags() {
    const { title, description, keywords, authors, seo } = CONFIG;

    // Page title
    document.title = `${title}`;

    // Basic meta tags
    setMeta('title', `${title} - ${authors.map(a => a.name).join(', ')}`);
    setMeta('description', description);
    setMeta('keywords', keywords.join(', '));
    setMeta('author', authors.map(a => a.name).join(', '));

    // Open Graph
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', seo.url, 'property');
    setMeta('og:image', seo.image, 'property');
    setMeta('og:site_name', seo.siteName, 'property');
    setMeta('article:published_time', `${seo.publishDate}T00:00:00.000Z`, 'property');
    setMeta('article:author', authors[0]?.name || '', 'property');

    // Twitter
    setMeta('twitter:site', seo.twitterSite);
    setMeta('twitter:creator', seo.twitterCreator);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', seo.image);
    setMeta('twitter:image:alt', `${title} - Research Preview`);

    // Citation meta
    setMeta('citation_title', title);
    authors.forEach((author, i) => {
      const parts = author.name.split(' ');
      const lastName = parts.pop();
      const firstName = parts.join(' ');
      // Create new citation_author meta tags
      const meta = document.createElement('meta');
      meta.name = 'citation_author';
      meta.content = `${lastName}, ${firstName}`;
      document.head.appendChild(meta);
    });
    setMeta('citation_publication_date', seo.publishDate.split('-')[0]);
    setMeta('citation_conference_title', CONFIG.conference);
  }

  function setMeta(name, content, attr = 'name') {
    let meta = document.querySelector(`meta[${attr}="${name}"]`);
    if (meta) {
      meta.content = content;
    }
  }

  // ============================================================================
  // STRUCTURED DATA
  // ============================================================================

  function renderStructuredData() {
    const { title, description, keywords, authors, affiliations, conference, seo, abstract, bibtex } = CONFIG;

    // ScholarlyArticle
    const scholarlyArticle = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "headline": title,
      "description": description,
      "author": authors.map(author => ({
        "@type": "Person",
        "name": author.name,
        "affiliation": author.affiliations ? author.affiliations.map(i => ({
          "@type": "Organization",
          "name": affiliations[i - 1] || ""
        })) : []
      })),
      "datePublished": seo.publishDate,
      "publisher": {
        "@type": "Organization",
        "name": conference
      },
      "url": seo.url,
      "image": seo.image,
      "keywords": keywords,
      "abstract": abstract,
      "citation": bibtex,
      "isAccessibleForFree": true,
      "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    // Organization
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": seo.siteName,
      "url": seo.institutionUrl,
      "sameAs": [
        `https://twitter.com/${seo.twitterSite?.replace('@', '')}`,
        `https://github.com/${seo.github}`
      ]
    };

    // Update or create script tags
    updateStructuredData('structured-data-article', scholarlyArticle);
    updateStructuredData('structured-data-org', organization);
  }

  function updateStructuredData(id, data) {
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data, null, 2);
  }

  // ============================================================================
  // HERO SECTION
  // ============================================================================

  function renderHero() {
    const { title, authors, affiliations, conference, showEqualContribution } = CONFIG;

    // Title
    const titleEl = document.getElementById('paper-title');
    if (titleEl) titleEl.textContent = title;

    // Authors with affiliation superscripts
    const authorsEl = document.getElementById('authors-list');
    if (authorsEl) {
      authorsEl.innerHTML = authors.map((author, i) => {
        const affSup = author.affiliations ? `<sup>${author.affiliations.join(',')}</sup>` : '';
        const eqSup = author.equalContribution ? '<sup>*</sup>' : '';
        const comma = i < authors.length - 1 ? ',' : '';
        return `<span class="author-block">
          <a href="${author.link}" target="_blank">${author.name}</a>${affSup}${eqSup}${comma}
        </span>`;
      }).join(' ');
    }

    // Affiliations list
    const affiliationEl = document.getElementById('affiliation');
    if (affiliationEl && affiliations) {
      const affList = affiliations.map((aff, i) => `<sup>${i + 1}</sup>${aff}`).join('&nbsp;&nbsp;&nbsp;');
      affiliationEl.innerHTML = `
        <span class="affiliation-line">${affList}</span>
        <span class="conference-line">${conference}</span>
        ${showEqualContribution ? '<span class="eql-cntrb"><sup>*</sup>Indicates Equal Contribution</span>' : ''}
      `;
    }
  }

  // ============================================================================
  // LINKS
  // ============================================================================

  function renderLinks() {
    const { links } = CONFIG;

    const linksContainer = document.getElementById('publication-links');
    if (!linksContainer) return;

    const linkConfigs = [
      { key: 'paper', icon: 'fas fa-file-pdf', text: 'Paper' },
      { key: 'supplementary', icon: 'fas fa-file-pdf', text: 'Supplementary' },
      { key: 'code', icon: 'fab fa-github', text: 'Code' },
      { key: 'arxiv', icon: 'ai ai-arxiv', text: 'arXiv' },
      { key: 'huggingface', emoji: '🤗', text: 'HuggingFace' }
    ];

    linksContainer.innerHTML = linkConfigs
      .filter(cfg => links[cfg.key])
      .map(cfg => {
        const iconHtml = cfg.emoji
          ? `<span class="icon">${cfg.emoji}</span>`
          : `<span class="icon"><i class="${cfg.icon}"></i></span>`;
        return `
          <span class="link-block">
            <a href="${links[cfg.key]}" target="_blank" class="external-link button is-normal is-rounded is-dark">
              ${iconHtml}
              <span>${cfg.text}</span>
            </a>
          </span>
        `;
      }).join('\n');
  }

  // ============================================================================
  // TEASER VIDEO
  // ============================================================================

  function renderTeaserVideo() {
    const { teaserVideo } = CONFIG;
    if (!teaserVideo) return;

    const videoEl = document.getElementById('teaser-video');
    if (videoEl) {
      videoEl.querySelector('source').src = teaserVideo.src;
      videoEl.load();
    }

    const captionEl = document.getElementById('teaser-caption');
    if (captionEl) captionEl.textContent = teaserVideo.caption;
  }

  // ============================================================================
  // ABSTRACT
  // ============================================================================

  function renderAbstract() {
    const abstractEl = document.getElementById('abstract-text');
    if (abstractEl) abstractEl.innerHTML = `<p>${CONFIG.abstract}</p>`;
  }

  // ============================================================================
  // CONTENT SECTIONS
  // ============================================================================

  function renderSections() {
    const { sections } = CONFIG;
    if (!sections || sections.length === 0) return;

    const container = document.getElementById('sections-container');
    if (!container) return;

    container.innerHTML = sections.map((section, i) => {
      const isLight = i % 2 === 0 ? 'is-light' : '';
      return `
        <section class="section hero ${isLight}">
          <div class="container is-max-desktop">
            <div class="columns is-centered">
              <div class="column is-four-fifths">
                <h2 class="title is-3">${section.title}</h2>
                <div class="content has-text-justified">
                  <p>${section.text}</p>
                </div>
                <figure class="image section-figure">
                  <img src="${section.image.src}" alt="${section.image.alt}" loading="lazy"/>
                  <figcaption class="has-text-centered mt-2">${section.image.caption}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
      `;
    }).join('\n');
  }

  // ============================================================================
  // BIBTEX
  // ============================================================================

  function renderBibTeX() {
    const bibtexEl = document.getElementById('bibtex-code');
    if (bibtexEl) bibtexEl.textContent = CONFIG.bibtex;
  }

  // ============================================================================
  // MORE WORKS
  // ============================================================================

  function renderMoreWorks() {
    const { moreWorks } = CONFIG;
    if (!moreWorks || moreWorks.length === 0) {
      const container = document.querySelector('.more-works-container');
      if (container) container.style.display = 'none';
      return;
    }

    const worksList = document.getElementById('works-list');
    if (!worksList) return;

    worksList.innerHTML = moreWorks.map(work => `
      <a href="${work.link}" class="work-item" target="_blank">
        <div class="work-info">
          <h5>${work.title}</h5>
          <p>${work.description}</p>
          <span class="work-venue">${work.venue}</span>
        </div>
        <i class="fas fa-external-link-alt"></i>
      </a>
    `).join('\n');
  }

})();
