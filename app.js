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
  window.switchPlanTab = function(tab) {
    if (tab === 'coins') {
      if (tabCoins) tabCoins.classList.add('active');
      if (tabSubscription) tabSubscription.classList.remove('active');
      if (coinsGrid) {
        coinsGrid.style.display = 'grid';
        coinsGrid.style.opacity = '1';
      }
      if (subscriptionGrid) {
        subscriptionGrid.style.display = 'none';
      }
    } else {
      if (tabSubscription) tabSubscription.classList.add('active');
      if (tabCoins) tabCoins.classList.remove('active');
      if (subscriptionGrid) {
        subscriptionGrid.style.display = 'grid';
        subscriptionGrid.style.opacity = '1';
      }
      if (coinsGrid) {
        coinsGrid.style.display = 'none';
      }
    }
  };

  if (tabSubscription) {
    tabSubscription.addEventListener('click', () => window.switchPlanTab('subscription'));
  }

  if (tabCoins) {
    tabCoins.addEventListener('click', () => window.switchPlanTab('coins'));
  }

  // 2. Plan Selection / Activation Modal
  window.openPlanModal = function(cardElement) {
    if (!cardElement) return;
    const modal = document.getElementById('plan-modal');
    if (!modal) return;

    const name = cardElement.getAttribute('data-plan-name') || cardElement.querySelector('.tier-name').textContent.trim();
    const priceEl = cardElement.querySelector('.price-value');
    const currencyEl = cardElement.querySelector('.currency');
    const priceText = (currencyEl ? currencyEl.textContent.trim() : '') + (priceEl ? priceEl.textContent.trim() : '');
    const type = cardElement.getAttribute('data-plan-type') || 'Subscription Plan';

    const modalName = document.getElementById('modal-plan-name');
    const modalPrice = document.getElementById('modal-plan-price');
    const modalBadge = document.getElementById('modal-plan-badge');

    if (modalName) modalName.textContent = name;
    if (modalPrice) modalPrice.textContent = priceText;
    if (modalBadge) modalBadge.textContent = type.toUpperCase();

    // Highlight active card
    document.querySelectorAll('.pricing-tier-card').forEach(c => c.classList.remove('selected-card'));
    cardElement.classList.add('selected-card');

    // Populate features
    const featuresList = document.getElementById('modal-features-summary');
    if (featuresList) {
      featuresList.innerHTML = '';
      const featureItems = cardElement.querySelectorAll('.tier-features li');
      featureItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = '<span class="check">✓</span> <span>' + item.textContent.replace('✓', '').trim() + '</span>';
        featuresList.appendChild(li);
      });
    }

    // Reset views
    const formView = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');
    if (formView) formView.style.display = 'block';
    if (successView) successView.style.display = 'none';

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closePlanModal = function() {
    const modal = document.getElementById('plan-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.handlePlanSubmit = function(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('tutor-name');
    const planNameEl = document.getElementById('modal-plan-name');
    const planName = planNameEl ? planNameEl.textContent : 'Plan';
    const tutorName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Tutor';

    const msg = `Thank you, ${tutorName}! Your request for ${planName} has been received. Our tutor onboarding specialist will contact you on WhatsApp within 15 minutes.`;
    const successMsg = document.getElementById('modal-success-message');
    if (successMsg) successMsg.textContent = msg;

    const formView = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');
    if (formView) formView.style.display = 'none';
    if (successView) successView.style.display = 'block';
  };

  // Close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closePlanModal();
  });

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

  // Header "Create Profile" button triggers plan selection modal
  const createProfileBtns = document.querySelectorAll('#create-profile-btn');
  createProfileBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proCard = document.getElementById('card-pro');
      if (proCard) {
        window.openPlanModal(proCard);
      }
    });
  });
});
