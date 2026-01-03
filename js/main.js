// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('active');
    });
  });
}

// RSVP Form Submission to Google Sheets
const rsvpForm = document.getElementById('rsvp-form');
const rsvpResult = document.getElementById('rsvp-result');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      attendance: document.getElementById('attendance').value,
      guests: document.getElementById('guests').value,
      notes: document.getElementById('notes').value
    };

    // Disable button and show loading state
    const submitButton = rsvpForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      // Send data to Google Sheets
      const response = await fetch('https://script.google.com/macros/s/AKfycbzJOabbiazb1h9CrPpr5o1kRpW8AQemPwCR_qIWsK1DIbZmel50qWLEFMMHYXlFNnYgbw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Show success message
      rsvpResult.innerHTML = '<p style="color: var(--sage); font-weight: 600; margin-top: 1rem;">✓ Thank you for your RSVP!</p>';
      rsvpResult.style.textAlign = 'center';

      // Reset form
      rsvpForm.reset();

    } catch (error) {
      // Show error message
      rsvpResult.innerHTML = '<p style="color: #c53030; font-weight: 600; margin-top: 1rem;">Sorry, there was an error. Please try again.</p>';
      rsvpResult.style.textAlign = 'center';
      console.error('Error:', error);
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
