(() => {
  const records = Array.from(document.querySelectorAll('.supervision-record'));
  const filters = Array.from(document.querySelectorAll('.archive-filter'));
  const input = document.querySelector('#supervision-search');
  const count = document.querySelector('#archive-count');
  const empty = document.querySelector('#archive-empty');
  let degree = 'all';

  const normalize = (value) => (value || '').toLowerCase().replace(/\s+/g, ' ').trim();

  function applyFilters() {
    const query = normalize(input && input.value);
    let visible = 0;

    records.forEach((record) => {
      const matchesDegree = degree === 'all' || record.dataset.degree === degree;
      const matchesQuery = !query || normalize(record.textContent).includes(query);
      const show = matchesDegree && matchesQuery;
      record.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    if (count) count.textContent = `${visible} record${visible === 1 ? '' : 's'} shown`;
    if (empty) empty.classList.toggle('is-visible', visible === 0);
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      degree = button.dataset.filter || 'all';
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      applyFilters();
    });
  });

  if (input) input.addEventListener('input', applyFilters);
  applyFilters();
})();
