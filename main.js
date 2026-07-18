/* ═══════════════════════════════════════════════════════
   AMARUKI — Landing Page Interactions
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Hide nav on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  });

  /* ── MOBILE MENU ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ── SCROLL ANIMATIONS (Intersection Observer) ── */
  // Soporta: data-aos, data-aos-scale, data-aos-left, data-aos-right, data-aos-zoom
  const aosSelectors = [
    '[data-aos]',
    '[data-aos-scale]',
    '[data-aos-left]',
    '[data-aos-right]',
    '[data-aos-zoom]',
  ];
  const aosElements = document.querySelectorAll(aosSelectors.join(','));

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Add stagger delay for children within a stagger container
        const parent = entry.target.closest('[data-aos-stagger]');
        if (parent) {
          const allVariants = parent.querySelectorAll(aosSelectors.join(','));
          allVariants.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, i * 100);
          });
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  aosElements.forEach(el => aosObserver.observe(el));

  // Also observe children inside stagger containers
  document.querySelectorAll('[data-aos-stagger]').forEach(container => {
    const children = container.querySelectorAll(aosSelectors.join(','));
    children.forEach(child => aosObserver.observe(child));
  });

  /* ── FAQ ACCORDION ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });


  /* ── WHATSAPP NUMBER CONFIGURATION ── */
  // 🔧 Tu número de WhatsApp (código país + número)
  const WHATSAPP_NUMBER = '56972347776';
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Reemplaza cualquier número (o placeholder X) después de wa.me/
      link.setAttribute('href', href.replace(/wa\.me\/\d+X*/, 'wa.me/' + WHATSAPP_NUMBER));
    }
  });

  // Tooltip del botón flotante
  const tooltip = document.querySelector('.whatsapp-tooltip');
  if (tooltip) tooltip.textContent = 'Escríbeme por WhatsApp';

});
