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
        
        // Trigger specific animations when switching tabs
        if (btn.dataset.target === 'quotes') {
          triggerQuoteCalculation();
        }
        if (btn.dataset.target === 'dashboard') {
          // Reset AI prompt if returning to dashboard
          const aiCard = document.getElementById('ai-approval-card');
          if (aiCard && aiCard.classList.contains('dismissed')) {
             // Optional: bring it back after some time or leave it dismissed
          }
        }
      }
    });
  });

  // --- 2. Dashboard Interactive Flow ---
  let revenue = 48620;
  const revenueEl = document.getElementById('dynamic-revenue');
  const approveBtn = document.getElementById('btn-approve-quote');
  const aiCard = document.getElementById('ai-approval-card');
  const pipeline = document.getElementById('live-pipeline');

  if (approveBtn) {
    approveBtn.addEventListener('click', () => {
      // 1. Visual Feedback on Button
      approveBtn.textContent = 'Sending...';
      approveBtn.style.background = 'var(--grey-mid)';
      
      setTimeout(() => {
        // 2. Dismiss AI Card
        aiCard.classList.add('dismissed');
        
        // 3. Update Revenue KPI
        revenue += 980;
        revenueEl.textContent = `£${revenue.toLocaleString('en-GB')}`;
        revenueEl.classList.add('flash');
        setTimeout(() => revenueEl.classList.remove('flash'), 1000);

        // 4. Add the newly booked lead to the top of the pipeline
        const newCard = document.createElement('div');
        newCard.className = 'mock-card booked';
        // inline style for the slide-in animation
        newCard.style.animation = 'slideIn 0.5s forwards'; 
        newCard.innerHTML = `
          <div class="mock-dot" style="background: var(--green);"></div>
          <div class="mock-lines"><b>Quote Accepted: Amelia Khan</b><span>Compare My Move · Croydon to Reading</span></div>
          <div class="mock-tag" style="background: #ecfdf5; color: #047857;">£980</div>
        `;
        pipeline.prepend(newCard);
        
        // Optionally, remove the oldest card to keep the list tidy
        if (pipeline.children.length > 4) {
          pipeline.lastElementChild.remove();
        }
      }, 800); 
    });
  }

  // --- 3. Live Pipeline Auto-Updates (Simulating incoming leads) ---
  setInterval(() => {
    const dashboardView = document.getElementById('view-dashboard');
    if (!pipeline || !dashboardView.classList.contains('active')) return;
    
    // Only add a new lead if we don't have too many
    if (pipeline.children.length < 4) {
      const newCard = document.createElement('div');
      newCard.className = 'mock-card incoming';
      newCard.style.animation = 'slideIn 0.5s forwards';
      newCard.innerHTML = `
        <div class="mock-dot" style="background: var(--blue);"></div>
        <div class="mock-lines"><b>New Lead: Sarah Jenkins</b><span>Sirelo · London to Surrey</span></div>
        <div class="mock-tag">£850</div>
      `;
      pipeline.prepend(newCard);
    }
  }, 12000); // New lead every 12 seconds if on dashboard

  // --- 4. Quotes Calculation Animation ---
  function triggerQuoteCalculation() {
    const calcItems = document.querySelectorAll('.quote-calc-item');
    const totalEl = document.getElementById('quote-total-val');
    const btn = document.getElementById('quote-send-btn');
    
    if(!calcItems.length) return;
    
    // Reset
    calcItems.forEach(item => item.classList.remove('visible'));
    if(totalEl) totalEl.textContent = 'Calculating...';
    if(btn) btn.style.opacity = '0.5';
    
    // Reveal items step by step
    calcItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, (index + 1) * 400);
    });

    // Final total
    setTimeout(() => {
      if(totalEl) totalEl.textContent = '£1,080.00';
      if(btn) btn.style.opacity = '1';
    }, 1800);
  }
});