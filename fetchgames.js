document.addEventListener('DOMContentLoaded', () => {
  fetch('games.json')
    .then(res => res.json())
    .then(games => {
      const grid = document.getElementById('game-grid');
      if (!Array.isArray(games) || games.length === 0) {
        grid.innerHTML = "<p>No games found.</p>";
        return;
      }

      const fragment = document.createDocumentFragment();

      games.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game-card');

        card.innerHTML = `
          ${game.image ? `<img src="${game.image}" alt="${game.name} Cover">` : ''}
          <div class="game-content">
            <h3 class="game-title">${game.name}</h3>
            <p class="game-desc">${game.desc}</p>
            ${game.link ? `<a href="${game.link}" target="_blank" rel="noopener" class="btn-small">View Game</a>` : ''}
          </div>
        `;
        fragment.appendChild(card);
      });
      grid.appendChild(fragment);
    })
    .catch(err => {
      console.error('Could not load games:', err);
      const grid = document.getElementById('game-grid');
      grid.innerHTML = "<p>Failed to load games.</p>";
    });
});
