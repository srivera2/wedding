// Force scroll to top on load to ensure animations are seen
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
  });

  // Close nav when clicking a link
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // RSVP Form Handling (Mockup)
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpResult = document.getElementById('rsvp-result');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate form submission
      const button = rsvpForm.querySelector('button');
      const originalText = button.innerText;

      button.disabled = true;
      button.innerText = 'Sending...';

      setTimeout(() => {
        rsvpForm.reset();
        button.disabled = false;
        button.innerText = originalText;
        rsvpResult.innerHTML = '<p style="color:var(--primary); margin-top:1rem; font-weight:bold;">Thank you! We have received your RSVP.</p>';

        // Clear success message after 5 seconds
        setTimeout(() => {
          rsvpResult.innerHTML = '';
        }, 5000);
      }, 1500);
    });
  }

  // Scroll Animations using IntersectionObserver
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .panel h2, .photo-splash img');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.tagName === 'IMG' && entry.target.parentElement.classList.contains('photo-splash')) {
          entry.target.parentElement.classList.add('visible');
        }
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Parallax / Smooth Scroll for Hero
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < 800) {
      hero.style.backgroundPositionY = `${scroll * 0.5}px`;
    }
  });

});
