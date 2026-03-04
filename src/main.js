document.addEventListener('DOMContentLoaded', () => {

    // ─── Scroll Reveal Animations ──────────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Staggered grid children animations
    document.querySelectorAll('.project-grid, .services-grid, .ongoing-grid').forEach(grid => {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(entry.target.children).forEach((child, i) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            child.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 100 + i * 80);
                    });
                }
            });
        }, { threshold: 0.05 }).observe(grid);
    });

    // ─── Video Modal ───────────────────────────────────────────────────────────
    const heroPlayBtn = document.getElementById('heroPlayBtn');
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const videoModalBackdrop = document.getElementById('videoModalBackdrop');
    const videoIframe = document.getElementById('videoIframe');

    function openVideoModal() {
        if (!videoModal || !videoIframe) return;
        videoIframe.src = videoIframe.dataset.src;
        videoModal.classList.add('open');
        document.body.classList.add('no-scroll');
    }

    function closeVideoModal() {
        if (!videoModal) return;
        videoModal.classList.remove('open');
        document.body.classList.remove('no-scroll');
        setTimeout(() => { if (videoIframe) videoIframe.src = ''; }, 400);
    }

    heroPlayBtn?.addEventListener('click', openVideoModal);
    videoModalClose?.addEventListener('click', closeVideoModal);
    videoModalBackdrop?.addEventListener('click', closeVideoModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal?.classList.contains('open')) {
            closeVideoModal();
        }
    });

    // ─── Mobile Menu Toggle ────────────────────────────────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ─── Smooth Scroll ─────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const top = targetEl.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ─── Navbar scroll shadow ──────────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 2px 20px rgba(0,0,0,0.06)'
            : 'none';
    });

});
