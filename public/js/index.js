    // Handle popup message after submit
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent page reload

    // ✅ Optionally: send form data to server here..
    fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(response => {
      if (response.ok) {
        popup.classList.add('show');
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    });
  });

  closePopup.addEventListener('click', () => {
    popup.classList.remove('show');
  });
  // About page functionality
function initAboutPage() {
    const articlesBtn = document.getElementById('articlesBtn');
    const newsletterModal = document.getElementById('newsletterModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Articles button click handler
    if (articlesBtn) {
        articlesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show newsletter modal for articles
            if (newsletterModal) {
                newsletterModal.style.display = 'block';
            }
        });
    }
    
    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (newsletterModal) {
                newsletterModal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside
    if (newsletterModal) {
        newsletterModal.addEventListener('click', function(e) {
            if (e.target === newsletterModal) {
                newsletterModal.style.display = 'none';
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (isValidEmail(email)) {
                alert('Thank you for subscribing! You\'ll receive updates soon.');
                this.reset();
                if (newsletterModal) {
                    newsletterModal.style.display = 'none';
                }
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize about page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    
    // Initialize about page if we're on the about page
    if (window.location.pathname === '/about') {
        initAboutPage();
    }
});