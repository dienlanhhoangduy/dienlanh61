/**
 * ĐIỆN LẠNH 61 - CLIENT INTERACTION LOGIC (2026 ENGINE)
 * Hotline & Zalo: 0896.988.045 | Facebook: https://www.facebook.com/bgd.gd.5
 * Công Ty TNHH TM DV Điện Lạnh 61 | MST: 3703434341 | TP. Hồ Chí Minh
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initCostEstimator();
  initDiagnosticHub();
  initPricingFilter();
  initBranchSwitcher();
  initGalleryLightbox();
  initFaqAccordion();
  initBookingSystem();
  initScrollAnimations();
  initBackToTop();
  initSocialProofToast();
});

/* --------------------------------------------------------------------------
   1. HEADER SCROLL & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   2. INTERACTIVE COST ESTIMATOR
   -------------------------------------------------------------------------- */
const ESTIMATOR_DATA = {
  'ac_wall': {
    'vesinh': { price: '150.000đ - 200.000đ', warranty: 'Bảo hành chảy nước 30 ngày' },
    'napgas': { price: '250.000đ - 450.000đ', warranty: 'Bảo hành xì gas 6 tháng' },
    'khonglanh': { price: '350.000đ - 650.000đ', warranty: 'Bảo hành linh kiện 6 - 12 tháng' },
    'chaynuoc': { price: '150.000đ - 250.000đ', warranty: 'Bảo hành khắc phục 3 tháng' },
    'thaolap': { price: '300.000đ - 500.000đ', warranty: 'Bảo hành thi công 6 tháng' }
  },
  'ac_cassette': {
    'vesinh': { price: '350.000đ - 550.000đ', warranty: 'Bảo hành chảy nước 45 ngày' },
    'napgas': { price: '500.000đ - 900.000đ', warranty: 'Bảo hành áp suất gas 6 tháng' },
    'khonglanh': { price: '650.000đ - 1.500.000đ', warranty: 'Bảo hành mạch & block 6 - 12 tháng' },
    'chaynuoc': { price: '250.000đ - 450.000đ', warranty: 'Bảo hành bơm thoát 3 tháng' },
    'thaolap': { price: '600.000đ - 1.200.000đ', warranty: 'Bảo hành kỹ thuật 6 tháng' }
  },
  'fridge_standard': {
    'vesinh': { price: '180.000đ - 250.000đ', warranty: 'Khử khuẩn sinh học an toàn' },
    'napgas': { price: '450.000đ - 750.000đ', warranty: 'Bảo hành hàn kín 6 tháng' },
    'khonglanh': { price: '350.000đ - 850.000đ', warranty: 'Bảo hành linh kiện 6 tháng' },
    'chaynuoc': { price: '200.000đ - 350.000đ', warranty: 'Bảo hành nghẹt máng 3 tháng' },
    'thaolap': { price: '200.000đ - 350.000đ', warranty: 'Di dời an toàn bảo vệ lốc' }
  },
  'fridge_sidebyside': {
    'vesinh': { price: '350.000đ - 500.000đ', warranty: 'Bảo dưỡng dàn trao đổi nhiệt' },
    'napgas': { price: '700.000đ - 1.200.000đ', warranty: 'Bảo hành nạp gas R600a 6 tháng' },
    'khonglanh': { price: '650.000đ - 1.800.000đ', warranty: 'Bảo hành bo mạch/lốc 12 tháng' },
    'chaynuoc': { price: '300.000đ - 500.000đ', warranty: 'Bảo hành đường làm đá 6 tháng' },
    'thaolap': { price: '350.000đ - 600.000đ', warranty: 'Vận chuyển chuyên dụng đai bảo vệ' }
  },
  'washer_top': {
    'vesinh': { price: '250.000đ - 350.000đ', warranty: 'Rã lồng giặt tẩy cặn canxi' },
    'napgas': { price: 'Khảo sát trực tiếp', warranty: 'Bảo hành linh kiện 6 tháng' },
    'khonglanh': { price: '300.000đ - 650.000đ', warranty: 'Bảo hành sửa mạch/xả 6 tháng' },
    'chaynuoc': { price: '200.000đ - 350.000đ', warranty: 'Bảo hành đường cấp xả 3 tháng' },
    'thaolap': { price: '200.000đ - 300.000đ', warranty: 'Cân bằng chống rung lắc' }
  },
  'washer_front': {
    'vesinh': { price: '350.000đ - 450.000đ', warranty: 'Vệ sinh tháo lồng & gioăng cao su' },
    'napgas': { price: 'Khảo sát trực tiếp', warranty: 'Bảo hành chính hãng 6 tháng' },
    'khonglanh': { price: '450.000đ - 1.200.000đ', warranty: 'Bảo hành thay chốt cửa/mạch 6-12 tháng' },
    'chaynuoc': { price: '250.000đ - 450.000đ', warranty: 'Thay ron gioăng bảo hành 6 tháng' },
    'thaolap': { price: '250.000đ - 400.000đ', warranty: 'Cố định lồng chuyên nghiệp' }
  }
};

function initCostEstimator() {
  const deviceSelect = document.getElementById('estimateDevice');
  const serviceSelect = document.getElementById('estimateService');
  const priceDisplay = document.getElementById('estimatePriceDisplay');
  const warrantyDisplay = document.getElementById('estimateWarrantyDisplay');
  const bookEstimateBtn = document.getElementById('bookEstimateBtn');

  function updatePrice() {
    const dev = deviceSelect.value;
    const srv = serviceSelect.value;

    if (ESTIMATOR_DATA[dev] && ESTIMATOR_DATA[dev][srv]) {
      const data = ESTIMATOR_DATA[dev][srv];
      priceDisplay.textContent = data.price;
      warrantyDisplay.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${data.warranty}`;
    } else {
      priceDisplay.textContent = '150.000đ - 450.000đ';
      warrantyDisplay.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Bảo hành chính hãng 6 - 12 tháng';
    }
  }

  if (deviceSelect && serviceSelect) {
    deviceSelect.addEventListener('change', updatePrice);
    serviceSelect.addEventListener('change', updatePrice);
    updatePrice();
  }

  if (bookEstimateBtn) {
    bookEstimateBtn.addEventListener('click', () => {
      const devText = deviceSelect.options[deviceSelect.selectedIndex].text;
      const srvText = serviceSelect.options[serviceSelect.selectedIndex].text;
      
      const bookingDevice = document.getElementById('bookingDevice');
      const bookingNote = document.getElementById('bookingNote');

      if (bookingDevice) {
        bookingDevice.value = devText;
      }
      if (bookingNote) {
        bookingNote.value = `Yêu cầu dịch vụ: ${srvText} cho ${devText}. Dự toán: ${priceDisplay.textContent}`;
      }

      const bookingSec = document.getElementById('dat-lich');
      if (bookingSec) {
        bookingSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. SMART DIAGNOSTIC HUB
   -------------------------------------------------------------------------- */
const DIAGNOSTIC_DATA = {
  'ac_leak': {
    title: 'Máy Lạnh Bị Chảy Nước Vào Phòng',
    desc: 'Nguyên nhân thường do ống thoát nước bị nghẹt rêu mốc, máng hứng nước bẩn sau 4-6 tháng chưa vệ sinh, hoặc thiếu gas làm đóng tuyết dàn lạnh. Cần xịt thông tắc áp lực cao và vệ sinh máng.',
    urgency: 'Nên xử lý ngay để tránh chập điện bo mạch và ẩm mốc tường nhà.'
  },
  'ac_warm': {
    title: 'Máy Lạnh Chỉ Phả Gió Không Mát',
    desc: 'Nguyên nhân do dàn tản nhiệt bám bụi dày đặc cản lưu thông gió, rò rỉ gas môi chất lạnh, hỏng tụ khởi động (Kapa) hoặc hỏng quạt dàn nóng. Kỹ thuật viên sẽ kiểm tra áp suất gas và tụ điện.',
    urgency: 'Máy nén có nguy cơ quá tải cháy block nếu cố tình chạy liên tục.'
  },
  'washer_shake': {
    title: 'Máy Giặt Rung Lắc Mạnh & Kêu To',
    desc: 'Do ty treo lồng giặt bị gãy/nhão lò xo, vòng bi (bạc đạn) bị vỡ do nước rỉ vào, hoặc máy giặt bị lệch chân đế không thăng bằng. Cần cân chỉnh hoặc thay bộ thụt giảm chấn chính hãng.',
    urgency: 'Nếu không sửa ngay có thể làm biến dạng lồng giặt và vỡ vỏ máy.'
  },
  'fridge_warm': {
    title: 'Tủ Lạnh Ngăn Mát Không Lạnh / Hư Thực Phẩm',
    desc: 'Do hệ thống xả đá tự động (sò lạnh, cầu chì nhiệt, timer) bị hỏng khiến tuyết bít kín đường gió xuống ngăn mát, hoặc quạt tản nhiệt dàn lạnh không quay.',
    urgency: 'Cần khắc phục trong ngày để bảo quản thực phẩm cho gia đình.'
  },
  'fridge_side': {
    title: 'Tủ Lạnh Side-By-Side Không Đông Đá / Mất Nguồn',
    desc: 'Nguyên nhân có thể do lỗi bo mạch điều khiển Inverter, cảm biến nhiệt độ báo sai, hoặc rò rỉ gas giàn nóng bên trong thân tủ.',
    urgency: 'Yêu cầu kỹ sư chuyên trách dòng Side-by-side đo đạc bo mạch.'
  },
  'ac_blink': {
    title: 'Máy Lạnh Báo Lỗi Nhấp Nháy Đèn Bo Mạch',
    desc: 'Mỗi thương hiệu (Daikin, Panasonic, LG, Samsung...) có mã lỗi riêng (mã U, L, F...). Kỹ thuật viên sẽ dùng thiết bị đọc mã lỗi chuyên dụng kiểm tra motor quạt, cảm biến phòng hoặc board vi xử lý.',
    urgency: 'Kỹ thuật viên Điện Lạnh 61 mang sẵn bo mạch test tận nơi.'
  }
};

function initDiagnosticHub() {
  const chips = document.querySelectorAll('.symptom-chip');
  const adviceBox = document.getElementById('diagnosticAdviceBox');
  const adviceTitle = document.getElementById('adviceTitle');
  const adviceDesc = document.getElementById('adviceDesc');
  const adviceUrgency = document.getElementById('adviceUrgency');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const code = chip.getAttribute('data-code');
      if (DIAGNOSTIC_DATA[code]) {
        const data = DIAGNOSTIC_DATA[code];
        adviceTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${data.title}`;
        adviceDesc.textContent = data.desc;
        adviceUrgency.textContent = data.urgency;
        adviceBox.classList.add('show');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. PRICING TABLE FILTER
   -------------------------------------------------------------------------- */
function initPricingFilter() {
  const tabs = document.querySelectorAll('.pricing-filter-tabs .tab-btn');
  const rows = document.querySelectorAll('.pricing-table tbody tr');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-filter');
      rows.forEach(row => {
        if (category === 'all' || row.getAttribute('data-category') === category) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. MULTI-BRANCH NETWORK SWITCHER (TP. HỒ CHÍ MINH)
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

  branchCards.forEach(card => {
    card.addEventListener('click', () => {
      branchCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const branchKey = card.getAttribute('data-branch');
      if (BRANCH_MAPS[branchKey] && mapIframe) {
        mapIframe.src = BRANCH_MAPS[branchKey];
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. GALLERY LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxLocation = document.getElementById('lightboxLocation');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const lightboxBookBtn = document.getElementById('lightboxBookBtn');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-overlay h4');
      const loc = item.querySelector('.gallery-overlay p');

      if (img && lightboxImg) lightboxImg.src = img.src;
      if (title && lightboxTitle) lightboxTitle.textContent = title.textContent;
      if (loc && lightboxLocation) lightboxLocation.innerHTML = loc.innerHTML;

      if (lightboxModal) lightboxModal.classList.add('active');
    });
  });

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxBookBtn && lightboxModal) {
    lightboxBookBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      const bookingSec = document.getElementById('dat-lich');
      if (bookingSec) bookingSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   8. BOOKING SYSTEM & SUCCESS MODAL
   -------------------------------------------------------------------------- */
function initBookingSystem() {
  const form = document.getElementById('serviceBookingForm');
  const modal = document.getElementById('bookingSuccessModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalZaloBtn = document.getElementById('modalZaloBtn');
  const bookingCodeDisplay = document.getElementById('bookingCodeDisplay');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('bookingName').value.trim();
      const phone = document.getElementById('bookingPhone').value.trim();
      const branch = document.getElementById('bookingBranch').value;
      const device = document.getElementById('bookingDevice').value;
      const timeSlot = document.getElementById('bookingTimeSlot') ? document.getElementById('bookingTimeSlot').value : 'Trong ngày';
      const note = document.getElementById('bookingNote').value.trim();

      if (!name || !phone) {
        alert('Vui lòng nhập Họ tên và Số điện thoại để kỹ thuật viên liên hệ!');
        return;
      }

      // Generate unique booking code
      const bookingCode = 'DL61-' + Math.floor(100000 + Math.random() * 900000);
      if (bookingCodeDisplay) {
        bookingCodeDisplay.textContent = bookingCode;
      }

      // Prepare Zalo deep-link
      const zaloMsg = encodeURIComponent(
        `Chào Điện Lạnh 61, tôi vừa đặt lịch trực tuyến:\n- Mã Đơn: ${bookingCode}\n- Khách hàng: ${name}\n- SĐT: ${phone}\n- Cơ sở: ${branch}\n- Thiết bị: ${device}\n- Khung giờ: ${timeSlot}\n- Ghi chú: ${note}`
      );
      if (modalZaloBtn) {
        modalZaloBtn.href = `https://zalo.me/0896988045?text=${zaloMsg}`;
      }

      // Show modal
      if (modal) {
        modal.classList.add('active');
      }

      form.reset();
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   9. COUNTER SCROLL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.ceil(target / 40);

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target.toLocaleString('vi-VN') + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = current.toLocaleString('vi-VN') + suffix;
        }
      }, 30);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   10. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const topBtn = document.getElementById('backToTopBtn');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        topBtn.classList.add('show');
      } else {
        topBtn.classList.remove('show');
      }
    });

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
  { name: 'Anh Minh', loc: 'Phường Khánh Bình, TP.HCM', action: 'vừa nạp gas R32 cho máy lạnh Daikin', time: '14 phút trước' }
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

  // Initial delay 4 seconds, then repeat every 14 seconds
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 14000);
  }, 4000);
}
