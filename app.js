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

  // 1. Toggle Plan Type (Subscription Plan vs Coins Plan) with Butter-Smooth Transitions
  window.switchPlanTab = function(tab) {
    if (tab === 'coins') {
      if (tabCoins) tabCoins.classList.add('active');
      if (tabSubscription) tabSubscription.classList.remove('active');
      if (subscriptionGrid) {
        subscriptionGrid.style.display = 'none';
        subscriptionGrid.classList.remove('active-grid-anim');
      }
      if (coinsGrid) {
        coinsGrid.style.display = 'grid';
        void coinsGrid.offsetWidth;
        coinsGrid.classList.add('active-grid-anim');
      }
    } else {
      if (tabSubscription) tabSubscription.classList.add('active');
      if (tabCoins) tabCoins.classList.remove('active');
      if (coinsGrid) {
        coinsGrid.style.display = 'none';
        coinsGrid.classList.remove('active-grid-anim');
      }
      if (subscriptionGrid) {
        subscriptionGrid.style.display = 'grid';
        void subscriptionGrid.offsetWidth;
        subscriptionGrid.classList.add('active-grid-anim');
      }
    }
  };

  if (tabSubscription) {
    tabSubscription.addEventListener('click', () => window.switchPlanTab('subscription'));
  }

  if (tabCoins) {
    tabCoins.addEventListener('click', () => window.switchPlanTab('coins'));
  }

  // Butter-Smooth Internal Anchor Navigation (Accounts for Floating Pill Navbar)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Ensure body scroll is completely free and active
  document.body.style.overflow = '';

  // 2. Plan Selection (Outline changes, old one removed, no popup, pure scroll freedom)
  window.selectPlanCard = function(cardElement) {
    if (!cardElement) return;
    const parentGrid = cardElement.closest('.pricing-grid') || document;
    parentGrid.querySelectorAll('.pricing-tier-card').forEach(c => {
      c.classList.remove('selected-card');
    });
    cardElement.classList.add('selected-card');
  };

  // 3. FAQ Accordion
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

  // 4. Toast Notifications for secondary interactive buttons
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Secondary CTA buttons (browse, login, etc)
  const secondaryButtons = [
    { id: 'signup-btn', name: 'Tutor Registration Modal' },
    { id: 'login-btn', name: 'Tutor Login' },
    { id: 'browse-tutors-btn', name: 'Browsing Tutor Directory' },
    { id: 'buy-coins-btn', name: '100 Coins Pack (₹999)' }
  ];

  secondaryButtons.forEach(btnInfo => {
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

  // Header "Create Profile" button selects Pro Plan card
  const createProfileBtns = document.querySelectorAll('#create-profile-btn');
  createProfileBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proCard = document.getElementById('card-pro');
      if (proCard) {
        window.selectPlanCard(proCard);
        proCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});
