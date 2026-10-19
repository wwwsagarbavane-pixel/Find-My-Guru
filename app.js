/**
 * FindMyGuru Pricing Page - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const tabSubscription = document.getElementById('tab-subscription');
  const tabCoins = document.getElementById('tab-coins');
  const subscriptionGrid = document.getElementById('subscription-plans-grid');
  const coinsGrid = document.getElementById('coins-plans-grid');
  const faqItems = document.querySelectorAll('.faq-item');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  // 1. Toggle Plan Type (Subscription Plan vs Coins Plan)
  function switchPlanTab(tab) {
    if (tab === 'subscription') {
      if (tabSubscription) tabSubscription.classList.add('active');
      if (tabCoins) tabCoins.classList.remove('active');
      if (subscriptionGrid) {
        subscriptionGrid.style.display = 'grid';
        subscriptionGrid.style.opacity = '1';
      }
      if (coinsGrid) {
        coinsGrid.style.display = 'none';
      }
    } else if (tab === 'coins') {
      if (tabCoins) tabCoins.classList.add('active');
      if (tabSubscription) tabSubscription.classList.remove('active');
      if (coinsGrid) {
        coinsGrid.style.display = 'grid';
        coinsGrid.style.opacity = '1';
      }
      if (subscriptionGrid) {
        subscriptionGrid.style.display = 'none';
      }
    }
  }

  if (tabSubscription) {
    tabSubscription.addEventListener('click', () => switchPlanTab('subscription'));
  }

  if (tabCoins) {
    tabCoins.addEventListener('click', () => switchPlanTab('coins'));
  }

  // 2. FAQ Accordion
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Open the first FAQ item by default for discovery
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstBtn = faqItems[0].querySelector('.faq-question');
    if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
  }

  // 3. Toast Notifications for interactive buttons
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Attach plan button actions
  const planButtons = [
    { id: 'btn-tier-starter', name: 'Starter Subscription Plan' },
    { id: 'btn-tier-growth', name: 'Growth Subscription Plan' },
    { id: 'btn-tier-pro', name: 'Pro Subscription Plan' },
    { id: 'btn-tier-elite', name: 'Elite Subscription Plan' },
    { id: 'btn-coins-starter', name: 'Coins Starter Plan (₹500 - 1,000)' },
    { id: 'btn-coins-growth', name: 'Coins Growth Plan (₹1,001 - 3,000)' },
    { id: 'btn-coins-power', name: 'Coins Power Plan (₹3,001 - 10,000)' },
    { id: 'buy-coins-btn', name: '100 Coins Pack (₹999)' },
    { id: 'create-profile-btn', name: 'Tutor Registration' },
    { id: 'signup-btn', name: 'Sign Up Modal' },
    { id: 'login-btn', name: 'Login Modal' }
  ];

  planButtons.forEach(btnInfo => {
    const el = document.getElementById(btnInfo.id);
    if (el) {
      el.addEventListener('click', (e) => {
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('#')) {
          e.preventDefault();
        }
        showToast(`Proceeding with: ${btnInfo.name}`);
      });
    }
  });

  // Smooth scroll for "View Plans →"
  const viewPlansCTA = document.getElementById('invest-view-plans-cta');
  if (viewPlansCTA) {
    viewPlansCTA.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('pricing-plans');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
