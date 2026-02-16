// GSAP Animations and Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initial Refresh
    ScrollTrigger.refresh();

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 1. Hero Section: Fade + Slide up
    const tlHero = gsap.timeline();
    tlHero.from('.hero-bg', { duration: 1.5, scale: 1.2, ease: 'power2.out' })
        .from('.hero-content h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=1')
        .from('.hero-content p', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.hero-btns', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.8');

    // 2. Search Section: Slide up (Pop up)
    gsap.from('.search-box', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'bottom 80%', // Trigger when hero bottom enters view
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'back.out(1.7)' // Pop up effect
    });

    // Common Section Title Animation (Fade Up)
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // 3. Destinations: Staggered Cards
    gsap.from('.dest-card', {
        scrollTrigger: {
            trigger: '.dest-grid',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2, // Stagger effect
        ease: 'power3.out'
    });

    // 4. Packages: Fade + Scale
    gsap.utils.toArray('.package-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            duration: 0.8,
            scale: 0.9,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // 5. Services: Staggered Slide Up
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // 6. Testimonials: Fade + Slide Left/Right
    // Animate the container or slider wrapper
    gsap.from('.testimonial-slider-container', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 75%'
        },
        duration: 1.2,
        x: 100, // Slide from right (or use -100 for left)
        opacity: 0,
        ease: 'power3.out'
    });

    // 7. Contact: Fade + Zoom In
    gsap.from('.contact-grid', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 75%'
        },
        duration: 1,
        scale: 0.9,
        opacity: 0,
        ease: 'back.out(1.2)' // Zoom in effect
    });

    // About Section (Bonus: Fade In)
    gsap.from('.about-img-container', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%'
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%'
        },
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out'
    });


    // Filter Logic (Destinations)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.dest-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            destCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    gsap.to(card, {
                        duration: 0.4,
                        scale: 1,
                        opacity: 1,
                        display: 'block',
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(card, {
                        duration: 0.4,
                        scale: 0.8,
                        opacity: 0,
                        display: 'none',
                        ease: 'power2.in'
                    });
                }
            });

            // Refresh ScrollTrigger after filtering changes layout
            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
    });

    // Travelers Counter Logic (Search Section)
    const travelersTrigger = document.querySelector('.travelers-trigger');
    const travelersDropdown = document.querySelector('.travelers-dropdown');

    // Toggle dropdown
    travelersTrigger?.addEventListener('click', (e) => {
        travelersDropdown.classList.toggle('active');
        e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (travelersTrigger && !travelersTrigger.contains(e.target)) {
            travelersDropdown?.classList.remove('active');
        }
    });

    // Counter Logic
    const counters = {
        adults: 2,
        children: 0,
        rooms: 1
    };

    document.querySelectorAll('.cnt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing dropdown
            const type = btn.getAttribute('data-type');
            const isPlus = btn.classList.contains('plus');

            if (isPlus) {
                counters[type]++;
            } else {
                if (type === 'adults' && counters[type] > 1) counters[type]--;
                if (type === 'rooms' && counters[type] > 1) counters[type]--;
                if (type === 'children' && counters[type] > 0) counters[type]--;
            }

            // Update UI
            document.getElementById(`${type}-count`).textContent = counters[type];
            updateSummary();
        });
    });

    function updateSummary() {
        const summary = `${counters.adults} Adults, ${counters.children > 0 ? counters.children + ' Child, ' : ''}${counters.rooms} Room`;
        document.getElementById('traveler-summary').textContent = summary;
    }


    // Responsive Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Testimonials Carousel Logic
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        const getCardWidth = () => {
            const card = slider.querySelector('.testimonial-card');
            return card ? card.offsetWidth + 30 : 0;
        };

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        });

        // Auto Play
        let autoPlayInterval;
        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                if (slider.scrollLeft >= maxScroll - 10) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
                }
            }, 3000);
        };

        const stopAutoPlay = () => clearInterval(autoPlayInterval);

        startAutoPlay();

        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
        slider.addEventListener('touchstart', stopAutoPlay);
        slider.addEventListener('touchend', startAutoPlay);
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks?.classList.remove('active');
                hamburger?.classList.remove('toggle');
            }
        });
    });

    // Force refresh again after everything loads
    window.addEventListener('load', () => ScrollTrigger.refresh());

});
