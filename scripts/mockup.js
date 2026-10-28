document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Navigation Tabs ---
  const navButtons = document.querySelectorAll('.nav-btn');
  const views = document.querySelectorAll('.app-view');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      
      const targetView = document.getElementById(`view-${btn.dataset.target}`);
      if (targetView) {
        targetView.classList.add('active');
        
        if (btn.dataset.target === 'quotes') {
          triggerQuoteCalculation();
        }
      }
    });
  });

  // --- 2. Dashboard Initial Setup ---
  const pipeline = document.getElementById('live-pipeline');
  
  // Initial cards
  const initialCards = [
    { type: 'incoming', name: 'Oliver Shaw', source: 'Getamover', route: 'Manchester to York', price: '£1,240' },
    { type: 'processing', name: 'Amelia Khan', source: 'Compare My Move', route: 'Croydon to Reading', price: '£980' },
    { type: 'booked', name: 'Jack Williams', source: 'Pinlocal', route: 'Bristol to Bath', price: '£1,760' }
  ];

  function createCardHTML(data) {
    let dotColor = 'var(--blue)';
    let tagBg = 'var(--grey-light)';
    let tagColor = 'var(--grey-mid)';
    
    if (data.type === 'incoming') { dotColor = 'var(--blue)'; tagBg = 'rgba(29, 92, 255, 0.1)'; tagColor = 'var(--blue)'; }
    if (data.type === 'processing') { dotColor = '#d97706'; tagBg = '#fef3c7'; tagColor = '#d97706'; }
    if (data.type === 'booked') { dotColor = 'var(--green)'; tagBg = '#ecfdf5'; tagColor = '#047857'; }

    return `
      <div class="mock-dot" style="background: ${dotColor};"></div>
      <div class="mock-lines"><b>${data.name}</b><span>${data.source} · ${data.route}</span></div>
      <div class="mock-tag" style="background: ${tagBg}; color: ${tagColor};">${data.price}</div>
    `;
  }

  initialCards.forEach(card => {
    const el = document.createElement('div');
    el.className = `mock-card ${card.type}`;
    el.innerHTML = createCardHTML(card);
    pipeline.appendChild(el);
  });

  // --- 3. Interactive AI Approval Flow ---
  let revenue = 48620;
  const revenueEl = document.getElementById('dynamic-revenue');
  const approveBtn = document.getElementById('btn-approve-quote');
  const aiCard = document.getElementById('ai-approval-card');
  const aiContent = document.getElementById('ai-card-content');
  const aiProcessing = document.getElementById('ai-processing-state');
  
  // AI Steps elements
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');

  if (approveBtn) {
    approveBtn.addEventListener('click', () => {
      // 1. Hide content, show processing steps
      aiContent.style.display = 'none';
      approveBtn.style.display = 'none'; // hide button during process
      aiProcessing.style.display = 'flex';
      
      // 2. Animate Steps
      setTimeout(() => {
        step1.classList.add('done');
        step2.style.opacity = '1';
      }, 1200);

      setTimeout(() => {
        step2.classList.add('done');
        step3.style.opacity = '1';
      }, 2400);

      setTimeout(() => {
        step3.classList.add('done');
      }, 3600);

      // 3. Complete Process
      setTimeout(() => {
        // Dismiss AI Card
        aiCard.classList.add('dismissed');
        
        // Update Revenue
        revenue += 980;
        revenueEl.textContent = `£${revenue.toLocaleString('en-GB')}`;
        revenueEl.classList.add('flash');
        setTimeout(() => revenueEl.classList.remove('flash'), 1000);

        // Remove the old "processing" Amelia Khan card
        const existingAmelia = Array.from(pipeline.children).find(child => child.innerHTML.includes('Amelia Khan'));
        if (existingAmelia) {
          existingAmelia.classList.add('removing');
          setTimeout(() => existingAmelia.remove(), 400); // wait for transition
        }

        // Add the newly booked lead after a slight delay to allow the removal to happen
        setTimeout(() => {
          const newCard = document.createElement('div');
          newCard.className = 'mock-card booked new-entry';
          newCard.innerHTML = createCardHTML({
            type: 'booked',
            name: 'Quote Accepted: Amelia Khan',
            source: 'Compare My Move',
            route: 'Croydon to Reading',
            price: '£980'
          });
          pipeline.prepend(newCard);
        }, 450);

        // Reset AI Card for the next simulated task (optional, brings it back after 15s)
        setTimeout(() => {
           aiCard.classList.remove('dismissed');
           aiContent.style.display = 'block';
           approveBtn.style.display = 'block';
           approveBtn.textContent = 'Approve and Send';
           aiProcessing.style.display = 'none';
           step1.classList.remove('done');
           step2.classList.remove('done');
           step2.style.opacity = '0';
           step3.classList.remove('done');
           step3.style.opacity = '0';
        }, 15000);

      }, 4800); // Wait for all steps to finish
    });
  }

  // --- 4. Background Automation Simulation ---
  // Every 15 seconds, a new lead slides into the top of the pipeline
  setInterval(() => {
    const dashboardView = document.getElementById('view-dashboard');
    if (!pipeline || !dashboardView.classList.contains('active')) return;
    
    // Only add if we have less than 5 cards to prevent overflow
    if (pipeline.children.length < 5 && aiCard.classList.contains('dismissed')) {
      const el = document.createElement('div');
      el.className = 'mock-card incoming new-entry';
      el.innerHTML = createCardHTML({
        type: 'incoming',
        name: 'New Lead: Sarah Jenkins',
        source: 'Sirelo',
        route: 'London to Surrey',
        price: '£850'
      });
      pipeline.prepend(el);
    }
  }, 15000);

  // --- 5. Quotes Calculation Animation (Unchanged) ---
  function triggerQuoteCalculation() {
    const calcItems = document.querySelectorAll('.quote-calc-item');
    const totalEl = document.getElementById('quote-total-val');
    const btn = document.getElementById('quote-send-btn');
    
    if(!calcItems.length) return;
    
    calcItems.forEach(item => item.classList.remove('visible'));
    if(totalEl) totalEl.textContent = 'Calculating...';
    if(btn) btn.style.opacity = '0.5';
    
    calcItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, (index + 1) * 400);
    });

    setTimeout(() => {
      if(totalEl) totalEl.textContent = '£1,080.00';
      if(btn) btn.style.opacity = '1';
    }, 1800);
  }
});