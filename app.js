/**
 * ĐIỆN LẠNH 24H - JAVASCRIPT APPLICATION CORE (2026 Premium Edition)
 * Hotline & Zalo: 0896.988.045 | MST: 3703434341 | TP. Hồ Chí Minh
 * Features: Scroll-aware header, Intersection Observer animations, 
 *           Counter animation, Enhanced interactions, Social proof
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAwareHeader();
  initScrollReveal();
  initStatsCounter();
  initCostEstimator();
  initDiagnosticHub();
  initPricingTabs();
  initBranchSwitcher();
  initGalleryLightbox();
  initFaqAccordion();
  initBookingForm();
  initScrollTopAndFloating();
  initSocialProofToast();
  initSmoothPageLoad();
});

/* --------------------------------------------------------------------------
   0. SMOOTH PAGE LOAD ANIMATION
   -------------------------------------------------------------------------- */
function initSmoothPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
}

/* --------------------------------------------------------------------------
   1. NAVIGATION & ACTIVE MENU HIGHLIGHT
   -------------------------------------------------------------------------- */
function initNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link, .bottom-bar-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('#')[0];
    
    if (linkPath === currentPath || (currentPath === '' && (linkPath === 'index.html' || linkPath === './'))) {
      link.classList.add('active');
    } else if (linkPath && linkPath !== currentPath) {
      link.classList.remove('active');
    }
  });

  // Mobile Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openDrawer);
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeDrawer);
  }

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      if (!mobileDrawer.contains(e.target) && mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.drawer-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      // Also close modals
      document.querySelectorAll('.gallery-lightbox-modal.active, .booking-success-modal.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });
}

/* --------------------------------------------------------------------------
   1.5. SCROLL-AWARE HEADER (Shrink on scroll)
   -------------------------------------------------------------------------- */
function initScrollAwareHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL ANIMATIONS (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!revealElements.length) return;

  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   2.5. STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(element) {
  const target = element.getAttribute('data-count');
  const suffix = element.getAttribute('data-suffix') || '';
  const prefix = element.getAttribute('data-prefix') || '';
  const isDecimal = target.includes('.');
  const targetNum = parseFloat(target.replace(/[^0-9.]/g, ''));
  const duration = 2000;
  const startTime = performance.now();

  // Handle special formats like "15 - 30"
  if (target.includes(' - ')) {
    element.innerHTML = `${prefix}${target}<span>${suffix}</span>`;
    return;
  }

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal 
      ? (targetNum * easeOut).toFixed(1)
      : Math.floor(targetNum * easeOut).toLocaleString('vi-VN');
    
    element.innerHTML = `${prefix}${current}<span>${suffix}</span>`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.innerHTML = `${prefix}${target}<span>${suffix}</span>`;
    }
  }

  requestAnimationFrame(updateCounter);
}

/* --------------------------------------------------------------------------
   3. SMART COST ESTIMATOR
   -------------------------------------------------------------------------- */
const PRICING_RULES = {
  ac_wall: {
    vesinh: { label: 'Vệ sinh máy lạnh treo tường (Khử khuẩn sinh học)', price: '150.000đ - 180.000đ' },
    napgas: { label: 'Bơm bổ sung gas R32 / R410A máy lạnh treo tường', price: '200.000đ - 350.000đ' },
    suachua: { label: 'Sửa lỗi máy lạnh không mát / chảy nước / chập bo', price: '250.000đ - 450.000đ' },
    thaolap: { label: 'Tháo lắp & Di dời trọn gói máy lạnh treo tường', price: '300.000đ - 450.000đ' }
  },
  ac_cassette: {
    vesinh: { label: 'Vệ sinh máy lạnh âm trần / tủ đứng áp lực cao', price: '350.000đ - 550.000đ' },
    napgas: { label: 'Nạp gas chuẩn định lượng máy lạnh công nghiệp', price: '450.000đ - 850.000đ' },
    suachua: { label: 'Sửa chữa máy lạnh âm trần lỗi bo mạch / bơm xả', price: '500.000đ - 950.000đ' },
    thaolap: { label: 'Di dời lắp đặt máy lạnh âm trần kỹ thuật cao', price: '650.000đ - 1.200.000đ' }
  },
  fridge_home: {
    vesinh: { label: 'Bảo dưỡng, vệ sinh & khử mùi tủ lạnh gia đình', price: '200.000đ - 300.000đ' },
    napgas: { label: 'Hàn xì & Nạp gas R600a / R134a tủ lạnh gia đình', price: '450.000đ - 750.000đ' },
    suachua: { label: 'Sửa tủ không đông đá / hỏng quạt / lỗi cảm biến', price: '250.000đ - 550.000đ' },
    thaolap: { label: 'Vận chuyển di dời cân chỉnh tủ lạnh tại nhà', price: '250.000đ - 400.000đ' }
  },
  fridge_sidebyside: {
    vesinh: { label: 'Vệ sinh chuyên sâu tủ lạnh Side-By-Side Inverter', price: '350.000đ - 500.000đ' },
    napgas: { label: 'Xử lý xì giàn & Nạp gas tủ Side-By-Side', price: '650.000đ - 1.200.000đ' },
    suachua: { label: 'Sửa tủ Side-By-Side lỗi bo mạch Inverter / Block', price: '600.000đ - 1.500.000đ' },
    thaolap: { label: 'Di dời & Lắp đặt tủ Side-by-Side chống trầy xước', price: '400.000đ - 700.000đ' }
  },
  wm_top: {
    vesinh: { label: 'Vệ sinh rã lồng máy giặt cửa trên (Lồng đứng)', price: '250.000đ - 300.000đ' },
    napgas: { label: 'Kiểm tra & Cân chỉnh hệ thống treo máy giặt', price: '200.000đ - 350.000đ' },
    suachua: { label: 'Sửa máy giặt cửa trên không vắt / kêu to / lỗi xả', price: '250.000đ - 450.000đ' },
    thaolap: { label: 'Di dời lắp đặt ống cấp thoát nước máy giặt', price: '200.000đ - 300.000đ' }
  },
  wm_front: {
    vesinh: { label: 'Vệ sinh tháo lồng chuyên sâu máy giặt cửa ngang', price: '350.000đ - 500.000đ' },
    napgas: { label: 'Bảo dưỡng thụt giảm xóc & Cân bằng động lồng ngang', price: '300.000đ - 550.000đ' },
    suachua: { label: 'Sửa máy giặt cửa trước lỗi bo mạch / thay ron / kẹt cửa', price: '350.000đ - 750.000đ' },
    thaolap: { label: 'Di dời lắp đặt cân thủy lực máy giặt cửa trước', price: '250.000đ - 400.000đ' }
  }
};

function initCostEstimator() {
  const deviceSelect = document.getElementById('estimateDevice');
  const serviceSelect = document.getElementById('estimateService');
  const qtySelect = document.getElementById('estimateQty');
  const priceDisplay = document.getElementById('estimatePriceDisplay');
  const serviceDetail = document.getElementById('estimateServiceDetail');

  if (!deviceSelect || !serviceSelect || !priceDisplay) return;

  function updateEstimate() {
    const dev = deviceSelect.value;
    const srv = serviceSelect.value;
    const qty = parseInt(qtySelect ? qtySelect.value : 1, 10) || 1;

    if (PRICING_RULES[dev] && PRICING_RULES[dev][srv]) {
      const data = PRICING_RULES[dev][srv];
      
      // Animate price change
      priceDisplay.style.opacity = '0';
      priceDisplay.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        priceDisplay.textContent = data.price + (qty > 1 ? ` (x${qty})` : '');
        if (serviceDetail) serviceDetail.textContent = data.label;
        priceDisplay.style.opacity = '1';
        priceDisplay.style.transform = 'translateY(0)';
      }, 150);
    }
  }

  // Add transition styles
  if (priceDisplay) {
    priceDisplay.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
  }

  deviceSelect.addEventListener('change', updateEstimate);
  serviceSelect.addEventListener('change', updateEstimate);
  if (qtySelect) qtySelect.addEventListener('change', updateEstimate);
  updateEstimate();
}

/* --------------------------------------------------------------------------
   4. DIAGNOSTIC HUB
   -------------------------------------------------------------------------- */
const DIAGNOSTIC_DATA = {
  'ac-chay-nuoc': {
    title: 'Máy Lạnh Bị Chảy Nước Vào Phòng',
    desc: 'Nguyên nhân 90% do máng nước và ống thoát bị nghẹt cặn rêu sau 3-6 tháng sử dụng, hoặc máy bị bám tuyết do thiếu gas. Kỹ thuật viên sẽ thông ống và vệ sinh sạch sẽ chỉ trong 20 phút.',
    urgency: '⚠️ Cần xử lý sớm để tránh chập điện bo mạch và ẩm mốc tường!'
  },
  'ac-khong-lanh': {
    title: 'Máy Lạnh Chỉ Phả Gió Nóng, Không Lạnh',
    desc: 'Nguyên nhân thường do tụ đề quạt/block bị yếu, hết gas do xì đầu tán hoặc bo mạch Inverter không đóng relay cho cục nóng chạy.',
    urgency: '⚡ Kỹ thuật viên có mặt sau 15-30 phút kiểm tra bằng đồng hồ đo áp suất.'
  },
  'ac-keu-to': {
    title: 'Cục Nóng / Cục Lạnh Kêu To, Rung Rè Rè',
    desc: 'Nguyên nhân do quạt lồng sóc bị lệch tâm, cao su chân đế cục nóng bị chai vỡ hoặc ốc siết vỏ máy bị lỏng sau thời gian dài rung lắc.',
    urgency: '🔧 Cần cân chỉnh lại quạt để tránh gây hỏng motor và ảnh hưởng giấc ngủ.'
  },
  'tu-khong-dong': {
    title: 'Tủ Lạnh Không Đông Đá / Ngăn Mát Không Lạnh',
    desc: 'Do hệ thống xả đá tự động (sò lạnh, cầu chì nhiệt, timer) bị hỏng làm đóng tuyết bít đường gió, hoặc máy nén (Block) bị mất áp, xì gas giàn lạnh.',
    urgency: '🚨 Cứu hộ khẩn cấp để thực phẩm trong tủ không bị ôi thiu hỏng hóc!'
  },
  'tu-chay-nuoc': {
    title: 'Tủ Lạnh Bị Đọng Nước, Chảy Nước Ra Sàn',
    desc: 'Thường do lỗ thoát nước xả đá phía sau ngăn đá bị nghẹt, gioăng cao su cửa tủ bị hở làm lọt khí ẩm bên ngoài vào ngưng tụ.',
    urgency: '💡 Thay ron zin hoặc thông đường thoát nước sẽ khắc phục triệt để ngay.'
  },
  'mg-khong-vat': {
    title: 'Máy Giặt Không Vắt / Rung Lắc Dữ Dội',
    desc: 'Nguyên nhân do van xả nước không mở làm nước còn ứ trong thùng, quang treo thụt giảm xóc bị hỏng hoặc đồ giặt bị dồn về một góc.',
    urgency: '⚡ Cần ngắt máy kiểm tra van xả và thụt nhún để bảo vệ cốt lồng giặt.'
  }
};

function initDiagnosticHub() {
  const chips = document.querySelectorAll('.symptom-chip');
  const titleElem = document.getElementById('adviceTitle');
  const descElem = document.getElementById('adviceDesc');
  const urgencyElem = document.getElementById('adviceUrgency');
  const adviceBox = document.getElementById('diagnosticAdviceBox');

  if (!chips.length || !titleElem || !descElem) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const key = chip.getAttribute('data-symptom');
      if (DIAGNOSTIC_DATA[key]) {
        // Animate content change
        if (adviceBox) {
          adviceBox.style.opacity = '0';
          adviceBox.style.transform = 'translateY(6px)';
          
          setTimeout(() => {
            titleElem.textContent = DIAGNOSTIC_DATA[key].title;
            descElem.textContent = DIAGNOSTIC_DATA[key].desc;
            if (urgencyElem) urgencyElem.textContent = DIAGNOSTIC_DATA[key].urgency;
            adviceBox.style.opacity = '1';
            adviceBox.style.transform = 'translateY(0)';
          }, 180);
        } else {
          titleElem.textContent = DIAGNOSTIC_DATA[key].title;
          descElem.textContent = DIAGNOSTIC_DATA[key].desc;
          if (urgencyElem) urgencyElem.textContent = DIAGNOSTIC_DATA[key].urgency;
        }
      }
    });
  });

  // Add transition to advice box
  if (adviceBox) {
    adviceBox.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
  }

  // Activate first chip by default
  if (chips[0]) chips[0].click();
}

/* --------------------------------------------------------------------------
   5. PRICING TABS FILTER
   -------------------------------------------------------------------------- */
function initPricingTabs() {
  const tabBtns = document.querySelectorAll('.pricing-tab-btn');
  const tableRows = document.querySelectorAll('.pricing-table tbody tr');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');
      tableRows.forEach(row => {
        if (cat === 'all' || row.getAttribute('data-category') === cat) {
          row.style.display = '';
          row.style.animation = 'fadeInUp 0.3s ease forwards';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. MULTI-BRANCH NETWORK SWITCHER (TP. HỒ CHÍ MINH)
   -------------------------------------------------------------------------- */
const BRANCH_MAPS = {
  'dian': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.527376092109!2d106.77258447481928!3d10.847424689305457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d96dad9ae675%3A0xd8a3f27858be8f33!2zxJBp4buHbiBM4bqhbmggNjE!5e0!3m2!1svi!2s!4v1742981064955!5m2!1svi!2s',
  'thuanan': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.925695029094!2d106.69974247481989!3d10.893262489262968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d754b20a3dd9%3A0x89e83ca5e1e1a53!2zVGjhu6dhbiBHcmFvLCBUaHXhuq1uIEFuLCBCw6xuaCBExrDGoW5n!5e0!3m2!1svi!2s!4v1742981064956!5m2!1svi!2s',
  'thudaumot': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.744158485292!2d106.6575124748211!3d10.982702589179555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1154f3b7cb9%3A0xc3f1ec2a8c3d3e2!2zNTUwIMSQ4bqhaSBs4buZIELDrG5oIETGsMahbmcsIEhp4buHcCBUaMOgbmgsIFRo4bunIEThuqd1IE3hu5l0!5e0!3m2!1svi!2s!4v1742981064957!5m2!1svi!2s',
  'tanuyen': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.128795719886!2d106.7725844748218!3d11.02983158913495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174cf30b02005a3%3A0x4a4b25687796d19!2zOSDEkFQ3NDUsIENow6FuaCBCw6xuaCwgVMOibiBVecOqbg!5e0!3m2!1svi!2s!4v1742981064958!5m2!1svi!2s',
  'thuduc': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.490795493202!2d106.74991247481932!3d10.850233489302868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752796df287b41%3A0x6b4fb6c189b87f2!2zOTEzIMSQLiBQaOG6oW0gVsSDbiDEkOG7k25nLCBMaW5oIFTDonksIFRo4bunIMSQ4bupYw!5e0!3m2!1svi!2s!4v1742981064959!5m2!1svi!2s',
  'quan12': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.291775836248!2d106.6800124748195!3d10.865402489289294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ea4b5b7b21%3A0x1b72e185e78c8a7!2zNzc5IEjDoCBIdXkgR2nDoXAsIFRo4bqhbmggTOG7mWMsIFF14bqtbiAxMg!5e0!3m2!1svi!2s!4v1742981064960!5m2!1svi!2s'
};

function initBranchSwitcher() {
  const branchCards = document.querySelectorAll('.branch-card');
  const mapIframe = document.getElementById('branchMapIframe');

  if (!branchCards.length) return;

  branchCards.forEach(card => {
    card.addEventListener('click', () => {
      branchCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const branchKey = card.getAttribute('data-branch');
      if (BRANCH_MAPS[branchKey] && mapIframe) {
        // Smooth map transition
        mapIframe.style.opacity = '0.5';
        mapIframe.src = BRANCH_MAPS[branchKey];
        mapIframe.onload = () => {
          mapIframe.style.opacity = '1';
        };
      }
    });
  });

  // Add transition to iframe
  if (mapIframe) {
    mapIframe.style.transition = 'opacity 0.3s ease';
  }
}

/* --------------------------------------------------------------------------
   7. GALLERY LIGHTBOX MODAL (Enhanced with Keyboard Nav)
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxLocation = document.getElementById('lightboxLocation');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  if (!galleryItems.length || !lightboxModal) return;

  let currentIndex = 0;
  const items = Array.from(galleryItems);

  function showLightbox(index) {
    currentIndex = index;
    const item = items[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h4');
    const loc = item.querySelector('.gallery-overlay p');

    if (img && lightboxImg) lightboxImg.src = img.src;
    if (title && lightboxTitle) lightboxTitle.textContent = title.textContent;
    if (loc && lightboxLocation) lightboxLocation.innerHTML = loc.innerHTML;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      showLightbox((currentIndex + 1) % items.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      showLightbox((currentIndex - 1 + items.length) % items.length);
    }
  });
}

/* --------------------------------------------------------------------------
   8. FAQ ACCORDION (Smooth Animation)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (!faqQuestions.length) return;

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
        // Scroll into view on mobile
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 150);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. BOOKING FORM HANDLER & ZALO DEEP LINK
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('serviceBookingForm');
  const successModal = document.getElementById('bookingSuccessModal');
  const bookingCodeDisplay = document.getElementById('bookingCodeDisplay');
  const modalZaloBtn = document.getElementById('modalZaloBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookingName')?.value || 'Khách Hàng';
    const phone = document.getElementById('bookingPhone')?.value || '';
    const branch = document.getElementById('bookingBranch')?.value || 'Trụ sở chính';
    const device = document.getElementById('bookingDevice')?.value || 'Máy lạnh';
    const timeSlot = document.getElementById('bookingTimeSlot')?.value || 'Càng sớm càng tốt';
    const note = document.getElementById('bookingNote')?.value || 'Cần thợ kiểm tra';

    // Validate phone
    const phoneRegex = /^(0[0-9]{9,10})$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      const phoneInput = document.getElementById('bookingPhone');
      if (phoneInput) {
        phoneInput.style.borderColor = '#ef4444';
        phoneInput.focus();
        setTimeout(() => { phoneInput.style.borderColor = ''; }, 3000);
      }
      return;
    }

    // Generate Booking Code
    const randomCode = 'DL24H-' + Math.floor(100000 + Math.random() * 900000);
    if (bookingCodeDisplay) bookingCodeDisplay.textContent = randomCode;

    // Build Zalo Deep-Link
    const zaloMsg = encodeURIComponent(
      `Chào Điện Lạnh 24H, tôi vừa đặt lịch [${randomCode}]:\n- Khách: ${name} (${phone})\n- Thiết bị: ${device}\n- Cơ sở gần: ${branch}\n- Thời gian: ${timeSlot}\n- Tình trạng: ${note}`
    );
    if (modalZaloBtn) {
      modalZaloBtn.href = `https://zalo.me/0896988045?text=${zaloMsg}`;
    }

    if (successModal) {
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    form.reset();
  });

  function closeSuccessModal() {
    if (successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeSuccessModal);
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeSuccessModal();
    });
  }
}

/* --------------------------------------------------------------------------
   10. SCROLL TO TOP & FLOATING PANEL
   -------------------------------------------------------------------------- */
function initScrollTopAndFloating() {
  const topBtn = document.getElementById('scrollToTopBtn');

  if (topBtn) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 400) {
            topBtn.classList.add('show');
          } else {
            topBtn.classList.remove('show');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   11. LIVE SOCIAL PROOF TOAST NOTIFICATION (TP. HỒ CHÍ MINH)
   -------------------------------------------------------------------------- */
const RECENT_ACTIVITIES = [
  { name: 'Anh Tuấn', loc: 'KDC Thống Nhất, Phường Dĩ An, TP.HCM', action: 'vừa đặt lịch Vệ sinh 2 máy lạnh Inverter', time: '2 phút trước' },
  { name: 'Chị Mai', loc: 'Phường Thuận Giao, TP.HCM', action: 'vừa gọi cấp cứu Tủ lạnh không đông đá', time: '5 phút trước' },
  { name: 'Anh Hoàng Long', loc: 'Phường Hiệp Thành, TP.HCM', action: 'vừa đặt sửa Máy giặt lồng ngang rung lắc', time: '7 phút trước' },
  { name: 'Chị Ngọc Bích', loc: 'Phường Linh Tây, TP.HCM', action: 'vừa đặt Tháo lắp di dời máy lạnh', time: '11 phút trước' },
  { name: 'Anh Minh', loc: 'Phường Khánh Bình, TP.HCM', action: 'vừa nạp gas R32 cho máy lạnh Daikin', time: '14 phút trước' },
  { name: 'Chị Hằng', loc: 'Phường Thạnh Lộc, TP.HCM', action: 'vừa đặt vệ sinh máy giặt rã lồng', time: '18 phút trước' },
  { name: 'Anh Phúc', loc: 'Phường Thủ Đức, TP.HCM', action: 'vừa sửa xong máy lạnh chảy nước', time: '22 phút trước' }
];

function initSocialProofToast() {
  const toast = document.getElementById('socialProofToast');
  if (!toast) return;

  const avatar = toast.querySelector('.toast-avatar');
  const text = toast.querySelector('.toast-text');

  let index = 0;
  function showNextToast() {
    const act = RECENT_ACTIVITIES[index];
    if (avatar) avatar.textContent = act.name.charAt(0);
    if (text) {
      text.innerHTML = `<strong>${act.name}</strong> (${act.loc})<br><span style="color:#38bdf8;">${act.action}</span> • <small style="color:#94a3b8;">${act.time}</small>`;
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);

    index = (index + 1) % RECENT_ACTIVITIES.length;
  }

  // Initial delay 5s, repeat every 18s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 18000);
  }, 5000);
}
