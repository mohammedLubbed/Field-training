document.addEventListener('DOMContentLoaded', () => {
  // ===== سنة التذييل =====
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ===== محاكاة إرسال النماذج =====
  function handleFormSubmit(formId, msgId){
    const form = document.getElementById(formId);
    const msg = document.getElementById(msgId);
    if(!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      console.log('Form data:', data);

      if (msg) {
        msg.textContent = 'تم استلام طلبك. سنتواصل معك قريباً لتأكيد الموعد.';
        msg.style.color = '#1f7a8c';
      }
      form.reset();
    });
  }

  // تهيئة النماذج (إذا موجودة بالصفحة)
  handleFormSubmit('bookingForm', 'bookingMsg');
  handleFormSubmit('contactForm', 'contactMsg');

  // ===== HERO SLIDER =====
  const heroSlider = document.getElementById('heroSlider');
  const heroDots = document.querySelector('.hero-dots');
  const prevBtn = document.querySelector('.hero-btn.prev');
  const nextBtn = document.querySelector('.hero-btn.next');

  if (heroSlider) {
    const slides = heroSlider.children;
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'hero-dot';
      dot.setAttribute('aria-label', `السلايد ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      heroDots.appendChild(dot);
    }
    const dots = heroDots.children;

    function updateDots() {
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === currentIndex);
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      const slideWidth = slides[0].getBoundingClientRect().width;
      heroSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      updateDots();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      goToSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      goToSlide(currentIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // --- Touch / Drag support for manual sliding ---
    const swipeThreshold = 50; // px
    let startX = 0;
    let isMouseDown = false;

    // Touch events (mobile)
    heroSlider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

    // Mouse drag (desktop)
    heroSlider.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diff = e.clientX - startX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) nextSlide();
        else prevSlide();
      }
    });

    heroSlider.addEventListener('mouseleave', () => {
      isMouseDown = false;
    });

    // Recalculate transform on resize so current slide stays visible
    window.addEventListener('resize', () => goToSlide(currentIndex));

    // Initialize
    updateDots();
  }
});
