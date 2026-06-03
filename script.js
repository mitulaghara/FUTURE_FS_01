/* ==========================================================================
   Interactivity and Logic for Mitul Aghara Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // Header Sticky Scroll
  // ==========================================================================
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // Mobile Hamburger Menu
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navBar = document.getElementById('nav-bar');
  const navLinksList = document.querySelectorAll('.nav-links a');

  const toggleMobileMenu = () => {
    mobileToggle.classList.toggle('active');
    navBar.classList.toggle('active');
  };

  mobileToggle.addEventListener('click', toggleMobileMenu);

  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu if it is active
      if (navBar.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ==========================================================================
  // Active Navigation link and Scroll Reveal Animations
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const reveals = document.querySelectorAll('.reveal');

  // Intersection Observer for active sections in nav
  const navObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.35 // 35% of the section should be visible
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Intersection Observer for scroll reveal animations
  const revealObserverOptions = {
    root: null,
    threshold: 0.1, // trigger early when 10% enters
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  }, revealObserverOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // ==========================================================================
  // Dynamic Typewriter Effect for Hero Subtitle
  // ==========================================================================
  const dynamicText = document.getElementById('dynamic-text');
  const phrases = ['MERN Stack Developer 🚀', 'Computer Science Student 🎓', 'Full Stack Web Specialist 💻', 'Problem Solver 💡'];
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      dynamicText.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 50; // faster deletion
    } else {
      dynamicText.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 100; // normal typing
    }

    if (!isDeleting && characterIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // wait before deleting
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // brief pause before next word
    }

    setTimeout(type, typingSpeed);
  };

  // Start the typewriter effect
  type();

  // ==========================================================================
  // Skills Filter System
  // ==========================================================================
  const skillTabBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      skillTabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked tab
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // Projects Filter System
  // ==========================================================================
  const projectFilterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // Theme Engine (Dark/Light mode) - Default to Light ("white theme")
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  
  // Retrieve theme preference, default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';
    
    if (theme === 'light') {
      newTheme = 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================================================
  // Projects Detailed Metadata Database & Modals
  // ==========================================================================
  const projectsData = {
    perfume: {
      title: 'Luxe Fragrance Boutique',
      stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux Store', 'Stripe API'],
      repo: 'https://github.com/mitulaghara/perfume-store-using-mernstack',
      overview: 'Luxe Fragrance Boutique is a high-end, monochrome E-Commerce application specializing in premium perfumes. The project handles user flow from catalog exploration to payment processing in a fully secure MERN architecture.',
      features: [
        'JWT-based User Authentication & authorization filters.',
        'Dynamic product management dashboard with stock status controls.',
        'Interactive Shopping Cart state managed persistently via Redux.',
        'Stripe Checkout sandbox payment processing simulator.',
        'SEO-optimized, search-friendly product detail schemas.'
      ]
    },
    edutrack: {
      title: 'EduTrackPro Student Dashboard',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js Library', 'Local Storage'],
      repo: 'https://github.com/mitulaghara/EduTrackPro',
      overview: 'EduTrackPro provides academic counselors and teachers with an visual student analytics dashboard. It offers insights into student performance indicators, subject-wise trends, and attendance trackers.',
      features: [
        'Interactive data charts showing student scores using Chart.js.',
        'Dynamic record logging system (add, modify, remove student profiles).',
        'Attendance calculation and graphical highlight grids.',
        'Cached search filters for instant lookup of student records.'
      ]
    },
    portfolio: {
      title: 'Interactive Professional Portfolio',
      stack: ['HTML5 Semantic Elements', 'Vanilla CSS3 Stylesheet', 'JavaScript', 'Google Fonts API'],
      repo: 'https://github.com/mitulaghara/Portfolio',
      overview: 'An SEO-friendly professional portfolio showcasing educational qualifications, key skill sets, projects history, and contact details. Integrates premium web design principles including glassmorphism and subtle animations.',
      features: [
        'Responsive single-page structure conforming to strict semantic guidelines.',
        'Interactive modal display panels for detail expansion.',
        'Dedicated stylesheets targeting clean print formats (@media print).',
        'Theme configuration engine persisting parameters in local cache.'
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectOverlay = document.getElementById('project-modal-overlay');
  const projectCloseBtn = document.getElementById('pm-close');
  const projectFooterCloseBtn = document.getElementById('pm-footer-close');

  const pmTitle = document.getElementById('pm-title');
  const pmStack = document.getElementById('pm-stack');
  const pmRepo = document.getElementById('pm-repo');
  const pmOverview = document.getElementById('pm-overview');
  const pmFeatures = document.getElementById('pm-features');

  // Open Project Details Modal
  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    pmTitle.textContent = data.title;
    pmRepo.href = data.repo;
    pmOverview.textContent = data.overview;

    // Clear and populate stack tags
    pmStack.innerHTML = '';
    data.stack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tech;
      pmStack.appendChild(span);
    });

    // Clear and populate features list
    pmFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `<i class='bx bx-check-circle highlight' style="color: var(--primary); margin-right: 0.5rem;"></i> ${feat}`;
      pmFeatures.appendChild(li);
    });

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Add click handlers on all "Learn More" elements
  document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const projectId = trigger.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  projectOverlay.addEventListener('click', closeProjectModal);
  projectCloseBtn.addEventListener('click', closeProjectModal);
  projectFooterCloseBtn.addEventListener('click', closeProjectModal);

  // ==========================================================================
  // Interactive Resume Modal & Printing Engine
  // ==========================================================================
  const resumeModal = document.getElementById('resume-modal');
  const resumeOverlay = document.getElementById('resume-modal-overlay');
  const resumeCloseBtn = document.getElementById('resume-close');
  const resumeFooterCloseBtn = document.getElementById('resume-footer-close');
  const resumePrintBtn = document.getElementById('resume-print-btn');
  const resumeTrigger = document.getElementById('hero-btn-resume');

  const openResumeModal = () => {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeResumeModal = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  resumeTrigger.addEventListener('click', openResumeModal);
  resumeOverlay.addEventListener('click', closeResumeModal);
  resumeCloseBtn.addEventListener('click', closeResumeModal);
  resumeFooterCloseBtn.addEventListener('click', closeResumeModal);

  resumePrintBtn.addEventListener('click', () => {
    window.print();
  });

  // ==========================================================================
  // Contact Form Validations & Simulation
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  // Interactive helper for validating fields on input/blur
  const inputs = contactForm.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.checkValidity()) {
        input.style.borderColor = '#ef4444'; // Red border on invalid blur
      } else {
        input.style.borderColor = ''; // reset
      }
    });

    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.style.borderColor = '#10b981'; // Green border when valid
      } else {
        input.style.borderColor = '';
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    formStatus.className = 'form-status';
    formStatus.textContent = '';
    formStatus.style.display = 'none';

    // Validate fields
    let isValid = true;
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        input.style.borderColor = '#ef4444';
      }
    });

    if (!isValid) {
      formStatus.classList.add('error');
      formStatus.textContent = 'Please fill out all fields correctly before sending.';
      return;
    }

    // Disable button and show loading state
    formSubmitBtn.disabled = true;
    const originalBtnHTML = formSubmitBtn.innerHTML;
    formSubmitBtn.innerHTML = 'Opening WhatsApp <i class="bx bx-loader-alt bx-spin"></i>';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const msgText = document.getElementById('message').value;

    // Construct the WhatsApp message with formatting
    const whatsappMsg = `Hello Mitul! You have a new message from your Portfolio website:\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Subject:* ${subject}\n\n` +
      `*Message:*\n${msgText}`;

    // Target WhatsApp click-to-chat URL (Indian country code +91 added)
    const whatsappUrl = `https://wa.me/918488877692?text=${encodeURIComponent(whatsappMsg)}`;

    setTimeout(() => {
      // Re-enable submit button
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = originalBtnHTML;

      // Show redirection success message
      formStatus.classList.add('success');
      formStatus.innerHTML = `<strong>Opening WhatsApp...</strong><br>We are redirecting you to WhatsApp to send your message.`;

      // Open WhatsApp chat in a new tab
      window.open(whatsappUrl, '_blank');

      // Reset form fields
      contactForm.reset();
      inputs.forEach(input => {
        input.style.borderColor = '';
      });

      // Clear status after 5 seconds
      setTimeout(() => {
        formStatus.style.opacity = '0';
        formStatus.style.transition = 'opacity 1s ease';
        setTimeout(() => {
          formStatus.style.display = 'none';
          formStatus.style.opacity = '1';
        }, 1000);
      }, 5000);

    }, 800); // Small delay to show visual feedback
  });

  // Dynamic Copyright Year
  document.getElementById('copyright-year').textContent = new Date().getFullYear();

});
