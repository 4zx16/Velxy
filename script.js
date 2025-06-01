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

function fetchGames() {
  var grid = document.getElementById('game-grid');

  fetch('./games.json')
    .then(function(res) {
      if (!res.ok) throw new Error('Failed to fetch games.json: ' + res.status);
      return res.json();
    })
    .then(function(games) {
      if (!Array.isArray(games) || games.length === 0) {
        grid.innerHTML = '<p>No games found.</p>';
        return;
      }

      var fragment = document.createDocumentFragment();

      games.forEach(function(game) {
        var card = document.createElement('div');
        card.classList.add('game-card');

        var imgHTML = '';
        if (game.image && game.image !== 'N/A') {
          imgHTML = '<img src="' + game.image + '" alt="' + game.name + ' Cover">';
        }

        var linkHTML = '';
        if (game.link) {
          linkHTML = '<a href="' + game.link + '" target="_blank" rel="noopener noreferrer" class="btn-small">View Game</a>';
        }

        card.innerHTML =
          imgHTML +
          '<div class="game-content">' +
          '<h3 class="game-title">' + game.name + '</h3>' +
          '<p class="game-desc">' + (game.desc || 'No description available.') + '</p>' +
          linkHTML +
          '</div>';

        fragment.appendChild(card);
      });

      grid.innerHTML = '';
      grid.appendChild(fragment);
    })
    .catch(function(error) {
      console.error('Error loading games:', error);
      grid.innerHTML = '<p>Failed to load games.</p>';
    });
}
