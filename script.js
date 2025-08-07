/*
  Dandy Pizza & Sushi website interactions

  This JavaScript file provides basic interactivity for the Dandy site. It
  enables smooth scrolling to sections when navigation links are clicked,
  highlights the current section in the navigation bar based on scroll
  position, and handles the addition of promotions via a small form. The
  cart functionality is currently a placeholder for future expansion.
*/

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-list a');
  const sections = document.querySelectorAll('main > section');
  const promoForm = document.getElementById('promo-form');
  const promoContainer = document.getElementById('promo-container');

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      // Only handle internal links starting with '#'
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const yOffset = -60; // account for sticky nav height
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  // Highlight nav item on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 70;
      const sectionBottom = sectionTop + section.offsetHeight;
      const link = document.querySelector(`.nav-list a[href="#${section.id}"]`);
      if (link) {
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // Handle promotion form submission
  if (promoForm) {
    promoForm.addEventListener('submit', e => {
      e.preventDefault();
      const titleInput = document.getElementById('promo-title');
      const descInput = document.getElementById('promo-desc');
      const priceInput = document.getElementById('promo-price');
      const title = titleInput.value.trim();
      const desc = descInput.value.trim();
      const price = priceInput.value.trim();
      if (!title || !desc || !price) return;
      // Create a new card element
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(desc)}</p>
        <div class="card-footer">
          <span class="price">${escapeHtml(price)}</span>
          <button class="order-btn">Заказать</button>
        </div>
      `;
      promoContainer.prepend(card);
      // Reset form fields
      titleInput.value = '';
      descInput.value = '';
      priceInput.value = '';
    });
  }

  // Sanitize user input to prevent injection when adding promo cards
  function escapeHtml(string) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };
    return String(string).replace(/[&<>"'\/]/g, (s) => entityMap[s]);
  }
});