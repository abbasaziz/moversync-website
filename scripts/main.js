document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const menuButton = document.getElementById('menuButton');
  const mobileNav = document.getElementById('mobileNav');
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('open', !isOpen);
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Smooth scroll to mockup
  const scrollBtn = document.getElementById('scrollToMockup');
  if(scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('app-mockup-section');
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // ROI Calculator
  const leadRange = document.getElementById('leadRange');
  const valueRange = document.getElementById('valueRange');
  const lostRange = document.getElementById('lostRange');
  const leadOutput = document.getElementById('leadOutput');
  const valueOutput = document.getElementById('valueOutput');
  const lostOutput = document.getElementById('lostOutput');
  const revenueOutput = document.getElementById('revenueOutput');
  const savingOutput = document.getElementById('savingOutput');

  const calculateROI = () => {
    if(!leadRange) return;
    const leads = Number(leadRange.value);
    const value = Number(valueRange.value);
    const lost = Number(lostRange.value);
    leadOutput.textContent = leads.toLocaleString('en-GB');
    valueOutput.textContent = `£${value.toLocaleString('en-GB')}`;
    lostOutput.textContent = `${lost}%`;
    const revenue = leads * (lost / 100) * 0.20 * value * 12;
    const savings = leads * 0.20 * 0.2 * 15 * 12;
    revenueOutput.textContent = `£${Math.round(revenue).toLocaleString('en-GB')}`;
    savingOutput.textContent = `£${Math.round(savings).toLocaleString('en-GB')}`;
  };

  if (leadRange) {
    [leadRange, valueRange, lostRange].forEach(el => el.addEventListener('input', calculateROI));
    calculateROI();
  }
});