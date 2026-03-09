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



    // ─── Mobile Menu Toggle ────────────────────────────────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-links li');

        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');

            if (isActive) {
                mobileLinks.forEach((link, i) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        link.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, 200 + i * 100);
                });
            }
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

    // ─── Observers for New Sections ────────────────────────────────────────────
    document.querySelectorAll('.process-grid, .testimonial-grid, .contact-form-card').forEach(grid => {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    Array.from(entry.target.children).forEach((child, i) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 100 + i * 150);
                    });
                }
            });
        }, { threshold: 0.1 }).observe(grid);
    });

    // ─── Navbar scroll shadow ──────────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 2px 20px rgba(0,0,0,0.06)'
            : 'none';
        navbar.style.background = window.scrollY > 50
            ? 'rgba(251, 251, 249, 0.95)'
            : 'rgba(251, 251, 249, 0.85)';
    });

    // ─── Stat Counter Animation ────────────────────────────────────────────────
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16);

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsGrid = document.querySelector('.hero-stats-grid');
    if (statsGrid) statsObserver.observe(statsGrid);

    // ─── Magnetic Buttons ──────────────────────────────────────────────────────
    const magneticBtns = document.querySelectorAll('.btn-contact, .btn-submit');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // ─── Contact Form Submission ───────────────────────────────────────────────
    const contactForm = document.getElementById('mainContactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        setTimeout(() => {
            submitBtn.innerHTML = 'Success! Message Sent';
            submitBtn.style.background = '#28a745';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });

});
