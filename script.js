 // Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    const navArrows = document.querySelectorAll('.nav-arrow');
    const counter = document.querySelector('.portfolio-counter .current');
    let currentProject = 1;
    const totalProjects = 6;

    navArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', function() {
            if (index === 0) { // Left arrow
                currentProject = currentProject > 1 ? currentProject - 1 : totalProjects;
            } else { // Right arrow
                currentProject = currentProject < totalProjects ? currentProject + 1 : 1;
            }
            counter.textContent = currentProject.toString().padStart(2, '0');
        });
    });

    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        const navArrows = document.querySelectorAll('.nav-arrow');
        const counter = document.querySelector('.portfolio-counter .current');
        const progressBar = document.querySelector('.portfolio-progress-bar');
        let currentProject = 1;
        const totalProjects = 6;
    
        function updateProgress() {
            counter.textContent = currentProject.toString().padStart(2, '0');
            progressBar.style.width = `${(currentProject / totalProjects) * 100}%`;
        }
    
        navArrows[0].addEventListener('click', function() {
            currentProject = currentProject > 1 ? currentProject - 1 : totalProjects;
            updateProgress();
        });
        navArrows[1].addEventListener('click', function() {
            currentProject = currentProject < totalProjects ? currentProject + 1 : 1;
            updateProgress();
        });
    
        updateProgress();
    });
});

// Portfolio Slider Script
const projects = [
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Project 5",
  "Project 6"
];

let currentIndex = 0;

const projectTitle = document.getElementById("projectTitle");
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
// Removed portfolioThumbs logic

function updatePortfolio() {
  projectTitle.textContent = projects[currentIndex];
  counter.textContent = `${String(currentIndex + 1).padStart(2, '0')}/${String(projects.length).padStart(2, '0')}`;
  // Update project label under counter
  const projectLabel = document.getElementById('projectLabel');
  if (projectLabel) {
    if (currentIndex === 0) {
      projectLabel.textContent = 'Movik GoLive';
      projectLabel.href = 'projects.html#movik';
      projectLabel.style.pointerEvents = 'auto';
    } else if (currentIndex === 1) {
      projectLabel.textContent = 'KoraFund';
      projectLabel.href = 'projects.html#kora';
      projectLabel.style.pointerEvents = 'auto';
    } else if (currentIndex === 2) {
      projectLabel.textContent = 'TiGo';
      projectLabel.href = 'projects.html#tigo';
      projectLabel.style.pointerEvents = 'auto';
    } else {
      projectLabel.textContent = '';
      projectLabel.removeAttribute('href');
      projectLabel.style.pointerEvents = 'none';
    }
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updatePortfolio();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < projects.length - 1) {
      currentIndex++;
      updatePortfolio();
    }
  });

  // Initialize
  updatePortfolio();
}
// Removed portfolioThumbs event listeners

// Project image modal/lightbox for projects.html
if (window.location.pathname.includes('projects.html')) {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImage = document.getElementById('modalImage');
  const projectImages = document.querySelectorAll('.project-images img');

  projectImages.forEach(img => {
    img.addEventListener('click', () => {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalOverlay.style.display = 'flex';
    });
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay || e.target === modalImage) {
      modalOverlay.style.display = 'none';
      modalImage.src = '';
    }
  });
}

// TiGo Visit Site modal for projects.html
if (window.location.pathname.includes('projects.html')) {
  const tigoBtn = document.getElementById('tigoVisitBtn');
  const tigoModal = document.getElementById('tigoModal');
  const modalOverlay = document.getElementById('modalOverlay');
  if (tigoBtn && tigoModal) {
    tigoBtn.addEventListener('click', () => {
      // Close image modal if open
      if (modalOverlay && modalOverlay.style.display === 'flex') {
        modalOverlay.style.display = 'none';
        const modalImage = document.getElementById('modalImage');
        if (modalImage) modalImage.src = '';
      }
      tigoModal.style.display = 'flex';
    });
    tigoModal.addEventListener('click', (e) => {
      if (e.target === tigoModal) {
        tigoModal.style.display = 'none';
      }
    });
  }
}

// Contact form validation and feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formMessage = document.getElementById('formMessage');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    let valid = true;
    let errorMsg = '';
    if (!name) {
      valid = false;
      errorMsg = 'Please enter your name.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      valid = false;
      errorMsg = 'Please enter a valid email address.';
    } else if (!message) {
      valid = false;
      errorMsg = 'Please enter your message.';
    }
    if (valid) {
      formMessage.textContent = 'Thank you for reaching out! Your message has been sent.';
      formMessage.className = 'form-message success';
      contactForm.reset();
      setTimeout(() => { formMessage.textContent = ''; }, 4000);
    } else {
      formMessage.textContent = errorMsg;
      formMessage.className = 'form-message error';
    }
  });
}

// Loading greeting sequence
window.addEventListener('DOMContentLoaded', function() {
  const greeting = document.getElementById('loading-greeting');
  if (!greeting) return;
  const greetings = ['Welcome', 'Bienvenu', 'Willkommen'];
  let idx = 0;
  function showNextGreeting() {
    greeting.style.opacity = 0;
    setTimeout(() => {
      idx++;
      if (idx < greetings.length) {
        greeting.textContent = greetings[idx];
        greeting.style.opacity = 1;
        setTimeout(showNextGreeting, 1000);
      }
    }, 500);
  }
  setTimeout(() => {
    greeting.style.opacity = 1;
    setTimeout(showNextGreeting, 1000);
  }, 100);
});

// Hide loading overlay when page is fully loaded, but wait at least 5 seconds
window.addEventListener('load', function() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add('hidden');
      setTimeout(() => { overlay.style.display = 'none'; }, 500);
    }, 5000); // 5 seconds (user set to 4s)
  }
});

// <!-- Those codes are protected and cannot be used without permission 
// Please contact @reyzmerly2025 for any questions or inquiries or collaboration : reyzmerly9@gmail.com