(() => {
  const search = document.querySelector('#course-search');
  const filters = Array.from(document.querySelectorAll('.course-filter'));
  const cards = Array.from(document.querySelectorAll('.history-course'));
  const count = document.querySelector('#course-count');
  const empty = document.querySelector('#course-empty');
  if (!search || !cards.length) return;

  let active = 'all';
  const update = () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const level = card.dataset.level || '';
      const scope = card.dataset.scope || '';
      const matchesFilter = active === 'all' || level === active || scope === active;
      const matchesSearch = !q || card.textContent.toLowerCase().includes(q);
      const visible = matchesFilter && matchesSearch;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    count.textContent = `${shown} course record${shown === 1 ? '' : 's'} shown`;
    empty.classList.toggle('is-visible', shown === 0);
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      active = button.dataset.filter || 'all';
      filters.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
      update();
    });
  });
  search.addEventListener('input', update);
  update();
})();
