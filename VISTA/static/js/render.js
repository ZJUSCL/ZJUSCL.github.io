/**
 * VISTA project page renderer.
 */

(function() {
  'use strict';

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
    renderTeaserFigure();
    renderSections();
    renderBibTeX();
    renderMoreWorks();
  }

  function setMeta(name, content, attr = 'name') {
    const meta = document.querySelector(`meta[${attr}="${name}"]`);
    if (meta) meta.content = content || '';
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalizeUrl(url) {
    return url || '';
  }

  function renderMetaTags() {
    const { title, description, keywords, authors, seo } = CONFIG;
    const authorNames = authors.map(a => a.name).join(', ');

    document.title = title;
    setMeta('title', `${title} - ${authorNames}`);
    setMeta('description', description);
    setMeta('keywords', (keywords || []).join(', '));
    setMeta('author', authorNames);

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', seo.url, 'property');
    setMeta('og:image', seo.image, 'property');
    setMeta('og:image:alt', `${title} - project preview`, 'property');
    setMeta('og:site_name', seo.siteName, 'property');
    setMeta('article:published_time', `${seo.publishDate}T00:00:00.000Z`, 'property');
    setMeta('article:author', authors[0]?.name || '', 'property');

    setMeta('twitter:site', seo.twitterSite || '');
    setMeta('twitter:creator', seo.twitterCreator || '');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', seo.image);
    setMeta('twitter:image:alt', `${title} - project preview`);

    setMeta('citation_title', title);
    authors.forEach(author => {
      const parts = author.name.split(' ');
      const lastName = parts.pop();
      const firstName = parts.join(' ');
      const meta = document.createElement('meta');
      meta.name = 'citation_author';
      meta.content = `${lastName}, ${firstName}`;
      document.head.appendChild(meta);
    });
    setMeta('citation_publication_date', seo.publishDate.split('-')[0]);
    setMeta('citation_conference_title', CONFIG.conference);
  }

  function renderStructuredData() {
    const { title, description, keywords, authors, affiliations, conference, seo, bibtex } = CONFIG;

    const scholarlyArticle = {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: title,
      description,
      author: authors.map(author => ({
        '@type': 'Person',
        name: author.name,
        affiliation: (author.affiliations || []).map(i => ({
          '@type': 'Organization',
          name: affiliations[i - 1] || ''
        }))
      })),
      datePublished: seo.publishDate,
      publisher: { '@type': 'Organization', name: conference },
      url: seo.url,
      image: seo.image,
      keywords,
      citation: bibtex,
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/licenses/by/4.0/'
    };

    const sameAs = [seo.github, seo.twitterSite ? `https://twitter.com/${seo.twitterSite.replace('@', '')}` : null]
      .filter(Boolean);
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: seo.siteName,
      url: seo.institutionUrl,
      sameAs
    };

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

  function renderHero() {
    const { title, tagline, authors, affiliations, conference, showEqualContribution, showCorresponding, highlights } = CONFIG;

    const venueEl = document.getElementById('paper-venue');
    if (venueEl) {
      venueEl.textContent = conference || '';
      venueEl.style.display = conference ? '' : 'none';
    }

    const titleEl = document.getElementById('paper-title');
    if (titleEl) titleEl.textContent = title;

    const taglineEl = document.getElementById('paper-tagline');
    if (taglineEl) taglineEl.textContent = tagline || '';

    const authorsEl = document.getElementById('authors-list');
    if (authorsEl) {
      authorsEl.innerHTML = authors.map((author, i) => {
        const affSup = author.affiliations ? `<sup>${author.affiliations.join(',')}</sup>` : '';
        const eqSup = author.equalContribution ? '<sup>*</sup>' : '';
        const corrSup = author.corresponding ? '<sup>&dagger;</sup>' : '';
        const comma = i < authors.length - 1 ? ',' : '';
        const name = escapeHtml(author.name);
        const nameHtml = author.link
          ? `<a href="${normalizeUrl(author.link)}" target="_blank" rel="noopener">${name}</a>`
          : `<span>${name}</span>`;
        return `<span class="author-block">${nameHtml}${affSup}${eqSup}${corrSup}${comma}</span>`;
      }).join(' ');
    }

    const affiliationEl = document.getElementById('affiliation');
    if (affiliationEl && affiliations) {
      const affList = affiliations.map((aff, i) => `<sup>${i + 1}</sup>${escapeHtml(aff)}`).join('<span class="affiliation-gap"></span>');
      const equalNote = showEqualContribution ? '<span class="author-note"><sup>*</sup> Equal contribution</span>' : '';
      const corrNote = showCorresponding ? '<span class="author-note"><sup>&dagger;</sup> Corresponding authors</span>' : '';
      affiliationEl.innerHTML = `
        <span class="affiliation-line">${affList}</span>
        <span class="author-notes">${equalNote}${corrNote}</span>
      `;
    }

    const highlightsEl = document.getElementById('hero-highlights');
    if (highlightsEl && highlights && highlights.length > 0) {
      highlightsEl.style.display = '';
      highlightsEl.innerHTML = highlights.map(item => `
        <div class="highlight-card">
          <span class="highlight-value">${escapeHtml(item.value)}</span>
          <span class="highlight-label">${escapeHtml(item.label)}</span>
        </div>
      `).join('');
    } else if (highlightsEl) {
      highlightsEl.innerHTML = '';
      highlightsEl.style.display = 'none';
    }
  }

  function renderLinks() {
    const { links } = CONFIG;
    const linksContainer = document.getElementById('publication-links');
    if (!linksContainer) return;

    const linkConfigs = [
      { key: 'paper', icon: 'fas fa-file-pdf', text: 'Paper' },
      { key: 'code', icon: 'fab fa-github', text: 'Code' },
      { key: 'arxiv', icon: 'ai ai-arxiv', text: 'arXiv' },
      { key: 'supplementary', icon: 'fas fa-file-alt', text: 'Supplementary' },
      { key: 'huggingface', icon: 'fas fa-cube', text: 'Hugging Face' }
    ];

    linksContainer.innerHTML = linkConfigs
      .filter(cfg => links && links[cfg.key])
      .map(cfg => `
        <span class="link-block">
          <a href="${links[cfg.key]}" target="_blank" rel="noopener" class="external-link button is-normal is-dark">
            <span class="icon"><i class="${cfg.icon}"></i></span>
            <span>${cfg.text}</span>
          </a>
        </span>
      `).join('');
  }

  function renderTeaserFigure() {
    const teaser = CONFIG.teaserImage;
    const section = document.querySelector('.teaser-section');
    const figureEl = document.getElementById('teaser-figure');
    if (!teaser || !figureEl) {
      if (section) section.style.display = 'none';
      return;
    }

    if (Array.isArray(teaser.images) && teaser.images.length > 0) {
      figureEl.classList.add('is-diagnostics');
      figureEl.innerHTML = `
        ${teaser.title ? `<h2 class="teaser-title">${escapeHtml(teaser.title)}</h2>` : ''}
        ${teaser.description ? `<p class="teaser-description">${escapeHtml(teaser.description)}</p>` : ''}
        <div class="teaser-grid">
          ${teaser.images.map(image => `
            <figure class="teaser-panel">
              <img src="${image.src}" alt="${escapeHtml(image.alt || CONFIG.title)}" loading="eager">
              <figcaption>${escapeHtml(image.caption || '')}</figcaption>
            </figure>
          `).join('')}
        </div>
        ${teaser.caption ? `<figcaption class="teaser-summary">${escapeHtml(teaser.caption)}</figcaption>` : ''}
      `;
      return;
    }

    figureEl.classList.remove('is-diagnostics');
    figureEl.innerHTML = `
      <img src="${teaser.src}" alt="${escapeHtml(teaser.alt || CONFIG.title)}" id="teaser-image" loading="eager">
      <figcaption class="has-text-centered" id="teaser-caption">${escapeHtml(teaser.caption || '')}</figcaption>
    `;
  }

  function renderSections() {
    const { sections } = CONFIG;
    const container = document.getElementById('sections-container');
    if (!container || !sections || sections.length === 0) return;

    container.innerHTML = sections.map((section, i) => {
      const bandClass = i % 2 === 0 ? 'section-band' : '';
      const bodyHtml = section.html || (section.text ? `<p>${escapeHtml(section.text)}</p>` : '');
      const figureHtml = section.image ? renderFigure(section.image) : '';
      const gridHtml = section.images ? `<div class="figure-grid">${section.images.map(renderFigure).join('')}</div>` : '';

      return `
        <section class="section page-section ${bandClass}">
          <div class="container is-max-desktop">
            <div class="section-heading">
              <h2 class="title is-3">${escapeHtml(section.title)}</h2>
            </div>
            <div class="content section-content">
              ${bodyHtml}
            </div>
            ${figureHtml}
            ${gridHtml}
          </div>
        </section>
      `;
    }).join('');
  }

  function renderFigure(image) {
    return `
      <figure class="image section-figure">
        <img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="lazy">
        <figcaption>${escapeHtml(image.caption || '')}</figcaption>
      </figure>
    `;
  }

  function renderBibTeX() {
    const bibtexEl = document.getElementById('bibtex-code');
    if (bibtexEl) bibtexEl.textContent = CONFIG.bibtex;
  }

  function renderMoreWorks() {
    const { moreWorks } = CONFIG;
    const container = document.querySelector('.more-works-container');
    if (!moreWorks || moreWorks.length === 0) {
      if (container) container.style.display = 'none';
      return;
    }

    const worksList = document.getElementById('works-list');
    if (!worksList) return;

    worksList.innerHTML = moreWorks.map(work => `
      <a href="${work.link}" class="work-item" target="_blank" rel="noopener">
        <div class="work-info">
          <h5>${escapeHtml(work.title)}</h5>
          <p>${escapeHtml(work.description)}</p>
          <span class="work-venue">${escapeHtml(work.venue)}</span>
        </div>
        <i class="fas fa-external-link-alt"></i>
      </a>
    `).join('');
  }
})();
