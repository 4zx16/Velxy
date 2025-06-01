// script.js — vanilla JS, no modules
document.addEventListener('DOMContentLoaded', function() {
  fetchGames();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // You can add more stuff here later (theme toggles, modals, etc.)
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('games.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(games => {
      const grid = document.getElementById('game-grid');
      grid.innerHTML = ''; // Clear grid before appending

      if (!Array.isArray(games) || games.length === 0) {
        grid.innerHTML = '<p>No games found.</p>';
        return;
      }

      games.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.innerHTML = `
          ${game.image ? `<img src="${game.image}" alt="${game.name} Cover">` : ''}
          <div class="game-content">
            <h3 class="game-title">${game.name}</h3>
            <p class="game-desc">${game.desc || 'No description available.'}</p>
            ${game.link ? `<a href="${game.link}" target="_blank" rel="noopener noreferrer" class="btn-small">View Game</a>` : ''}
          </div>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Could not load games:', err);
      document.getElementById('game-grid').innerHTML = "<p>Failed to load games.>";
    });
});
