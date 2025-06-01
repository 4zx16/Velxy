// script.js — main site logic
import { fetchGames } from './gamefetcher.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchGames();

  // Optional: smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Future hooks (theme toggle, modal triggers, etc.)
  // setupThemeToggle();
  // initHeaderObserver();
});
