(() => {
  const data = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS : [];
  const featuredRoot = document.getElementById('featuredPublications');
  const listRoot = document.getElementById('publicationList');
  if (!featuredRoot || !listRoot) return;

  const searchInput = document.getElementById('publicationSearch');
  const yearFilter = document.getElementById('yearFilter');
  const sortFilter = document.getElementById('sortFilter');
  const resultCount = document.getElementById('resultCount');
  const loadMore = document.getElementById('loadMore');
  const clearFilters = document.getElementById('clearFilters');
  const chips = [...document.querySelectorAll('.filter-chip')];

  const state = { type: 'all', year: 'all', sort: 'newest', query: '', visible: 12 };
  const esc = (value = '') => String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const typeLabel = type => ({ journal: 'Journal article', conference: 'Conference paper', book: 'Book' }[type] || type);
  const doiHref = doi => doi ? `https://doi.org/${encodeURI(doi)}` : '';
  const scholarHref = title => `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`;

  const correctedCitation = r => {
    const year = r.year || 'Year not specified';
    if (r.type === 'book') return `${r.title}${r.authors ? ` — ${r.authors}` : ''}${r.year ? `, ${r.year}` : ''}.`;
    return `${r.authors}. “${r.title}.” ${r.venue || ''}${r.status === 'to appear' ? ', to appear' : ''}, ${year}${r.doi ? `. DOI: ${r.doi}` : ''}.`;
  };

  const linkSet = r => {
    const links = [];
    if (r.doi) links.push(`<a href="${esc(doiHref(r.doi))}" target="_blank" rel="noreferrer">DOI ↗</a>`);
    if (r.paper) links.push(`<a href="${esc(r.paper)}" target="_blank" rel="noreferrer">Preprint ↗</a>`);
    if (r.publisher) links.push(`<a href="${esc(r.publisher)}" target="_blank" rel="noreferrer">Publisher ↗</a>`);
    links.push(`<a href="${esc(scholarHref(r.title))}" target="_blank" rel="noreferrer">Scholar search ↗</a>`);
    return links.join('');
  };

  function renderFeatured() {
    const featured = data.filter(r => r.featured).sort((a,b) => (b.year || 0) - (a.year || 0)).slice(0, 6);
    featuredRoot.innerHTML = featured.map((r, i) => `
      <article class="featured-card ${i === 0 ? 'featured-card--navy' : i === 1 ? 'featured-card--orange' : ''}">
        <div class="featured-card-top"><time datetime="${esc(r.year || '')}">${esc(r.year || '—')}</time><span class="featured-type">${esc(typeLabel(r.type))} · ${esc(r.topic)}</span></div>
        <h3>${esc(r.title)}</h3>
        <p class="featured-authors">${esc(r.authors)} · ${esc(r.venue)}</p>
        <p class="featured-summary">${esc(r.summary || '')}</p>
        <div class="featured-links">${linkSet(r)}</div>
      </article>
    `).join('');
  }

  function populateYears() {
    [...new Set(data.map(r => r.year).filter(Boolean))].sort((a,b) => b-a).forEach(year => {
      const option = document.createElement('option');
      option.value = String(year); option.textContent = String(year); yearFilter.appendChild(option);
    });
  }

  function filteredData() {
    const q = state.query.trim().toLowerCase();
    let rows = data.filter(r => {
      if (state.type !== 'all' && r.type !== state.type) return false;
      if (state.year !== 'all' && String(r.year) !== state.year) return false;
      if (!q) return true;
      const haystack = [r.title, r.authors, r.venue, r.topic, r.year, r.type].join(' ').toLowerCase();
      return haystack.includes(q);
    });
    rows.sort((a,b) => {
      if (state.sort === 'oldest') return (a.year || 9999) - (b.year || 9999) || a.title.localeCompare(b.title);
      if (state.sort === 'title') return a.title.localeCompare(b.title);
      return (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title);
    });
    return rows;
  }

  function recordTemplate(r, index) {
    const hasSummary = Boolean(r.summary);
    const status = r.status === 'to appear' ? ' · To appear' : '';
    return `
      <article class="pub-record" data-record-index="${index}">
        <button class="pub-record-button" type="button" aria-expanded="false">
          <span class="pub-record-year">${esc(r.year || '—')}</span>
          <span>
            <span class="pub-record-type">${esc(typeLabel(r.type))}${esc(status)}</span>
            <span class="pub-record-title">${esc(r.title)}</span>
            <span class="pub-record-meta"><span>${esc(r.authors || 'Author information not listed')}</span><span>${esc(r.venue || '')}</span><span class="pub-record-topic">${esc(r.topic)}</span></span>
          </span>
          <span class="pub-record-toggle" aria-hidden="true"><span class="toggle-label">Details</span><span class="toggle-arrow">↓</span></span>
        </button>
        <div class="pub-record-detail">
          <div class="pub-record-detail-inner">
            <div class="pub-record-detail-grid">
              <div>
                <span class="pub-detail-label">${hasSummary ? 'Research summary' : 'Record note'}</span>
                <p class="pub-record-summary">${hasSummary ? esc(r.summary) : 'A full abstract is not included in the current source inventory. Use the publication links below for the authoritative record; an author-approved abstract can be added later.'}</p>
              </div>
              <div>
                <span class="pub-detail-label">Citation</span>
                <p class="pub-record-citation">${esc(correctedCitation(r))}</p>
                <div class="pub-record-links">${linkSet(r)}</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function bindRecordToggles() {
    listRoot.querySelectorAll('.pub-record-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const record = btn.closest('.pub-record');
        const isOpen = record.hasAttribute('open');
        if (isOpen) record.removeAttribute('open'); else record.setAttribute('open','');
        btn.setAttribute('aria-expanded', String(!isOpen));
        const label = btn.querySelector('.toggle-label');
        const arrow = btn.querySelector('.toggle-arrow');
        if (label) label.textContent = isOpen ? 'Details' : 'Close';
        if (arrow) arrow.textContent = isOpen ? '↓' : '↑';
      });
    });
  }

  function render() {
    const rows = filteredData();
    resultCount.textContent = String(rows.length);
    const visible = rows.slice(0, state.visible);
    listRoot.innerHTML = visible.length ? visible.map(recordTemplate).join('') : '<div class="no-results"><strong>No matching publications.</strong><span>Try a different keyword, type, or year.</span></div>';
    loadMore.hidden = rows.length <= state.visible;
    clearFilters.hidden = !state.query && state.type === 'all' && state.year === 'all' && state.sort === 'newest';
    bindRecordToggles();
  }

  searchInput.addEventListener('input', e => { state.query = e.target.value; state.visible = 12; render(); });
  yearFilter.addEventListener('change', e => { state.year = e.target.value; state.visible = 12; render(); });
  sortFilter.addEventListener('change', e => { state.sort = e.target.value; state.visible = 12; render(); });
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active')); chip.classList.add('active'); state.type = chip.dataset.type; state.visible = 12; render();
  }));
  loadMore.addEventListener('click', () => { state.visible += 12; render(); });
  clearFilters.addEventListener('click', () => {
    state.type='all'; state.year='all'; state.sort='newest'; state.query=''; state.visible=12;
    searchInput.value=''; yearFilter.value='all'; sortFilter.value='newest'; chips.forEach(c => c.classList.toggle('active', c.dataset.type==='all')); render();
  });

  populateYears(); renderFeatured(); render();
})();
