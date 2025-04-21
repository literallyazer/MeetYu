// Initialize core modules
document.addEventListener('DOMContentLoaded', () => {
    // Nav scroll effect
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Core modules initialization
    const AppShowcase = {
        init() {
            this.elements = {
                showcase: document.querySelector('.app-showcase'),
                device: document.querySelector('.iphone-pro'),
                screens: document.querySelectorAll('.screen-item'),
                features: document.querySelectorAll('.feature-item'),
                progress: document.querySelector('.progress-fill'),
                currentNum: document.querySelector('.progress-numbers .current'),
                dynamicIsland: document.querySelector('.dynamic-island')
            };

            this.state = {
                currentIndex: 0,
                isAnimating: false,
                lastScrollTop: 0,
                screenHeight: window.innerHeight,
                deviceInView: false
            };

            this.initializeGSAP();
            this.bindEvents();
            this.initializeObservers();
            this.initializeParallax();
            this.startAutoPlay();
        },

        initializeGSAP() {
            gsap.registerPlugin(ScrollTrigger);

            // Header animations
            gsap.to('.showcase-header h2', {
                scrollTrigger: {
                    trigger: '.showcase-header',
                    start: 'top 80%',
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.to('.showcase-header p', {
                scrollTrigger: {
                    trigger: '.showcase-header',
                    start: 'top 80%',
                },
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out'
            });

            // Device parallax effect
            gsap.to(this.elements.device, {
                scrollTrigger: {
                    trigger: '.device-showcase-wrapper',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1
                },
                y: 100,
                ease: 'none'
            });
        },

        initializeParallax() {
            const deviceParallax = (e) => {
                if (!this.state.deviceInView) return;

                const { device } = this.elements;
                const rect = device.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const moveX = (e.clientX - centerX) / 30;
                const moveY = (e.clientY - centerY) / 30;

                gsap.to(device, {
                    duration: 1,
                    x: moveX,
                    y: moveY,
                    rotateY: moveX / 2,
                    rotateX: -moveY / 2,
                    ease: 'power2.out'
                });
            };

            document.addEventListener('mousemove', deviceParallax);
        },

        bindEvents() {
            // Feature navigation
            this.elements.features.forEach((feature, index) => {
                feature.addEventListener('click', () => this.navigateToScreen(index));
                
                // Hover effects
                feature.addEventListener('mouseenter', () => {
                    if (this.state.currentIndex !== index) {
                        gsap.to(feature, {
                            scale: 1.02,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });

                feature.addEventListener('mouseleave', () => {
                    gsap.to(feature, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

            // Scroll-based interactions
            window.addEventListener('scroll', () => {
                this.handleScroll();
            });

            // Dynamic Island animations
            this.elements.dynamicIsland.addEventListener('mouseenter', () => {
                gsap.to(this.elements.dynamicIsland, {
                    width: 160,
                    height: 35,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            this.elements.dynamicIsland.addEventListener('mouseleave', () => {
                gsap.to(this.elements.dynamicIsland, {
                    width: 120,
                    height: 28,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        },

        initializeObservers() {
            // Device in view observer
            const deviceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.state.deviceInView = entry.isIntersecting;
                    if (entry.isIntersecting) {
                        this.elements.device.classList.add('in-view');
                    } else {
                        this.elements.device.classList.remove('in-view');
                    }
                });
            }, { threshold: 0.5 });

            deviceObserver.observe(this.elements.device);

            // Feature items observer
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Array.from(this.elements.features).indexOf(entry.target);
                        this.navigateToScreen(index, true);
                    }
                });
            }, { threshold: 0.7 });

            this.elements.features.forEach(feature => featureObserver.observe(feature));
        },

        navigateToScreen(index, skipAnimation = false) {
            if (this.state.isAnimating || index === this.state.currentIndex) return;

            this.state.isAnimating = true;
            this.state.currentIndex = index;

            // Update UI
            this.elements.screens.forEach((screen, i) => {
                screen.classList.toggle('active', i === index);
            });

            this.elements.features.forEach((feature, i) => {
                feature.classList.toggle('active', i === index);
            });

            // Update progress
            this.elements.progress.style.width = `${(index + 1) * 25}%`;
            this.elements.currentNum.textContent = `0${index + 1}`;

            // Animate device
            if (!skipAnimation) {
                gsap.to(this.elements.device, {
                    scale: 0.98,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(this.elements.device, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out',
                            onComplete: () => {
                                this.state.isAnimating = false;
                            }
                        });
                    }
                });
            } else {
                this.state.isAnimating = false;
            }
        },

        startAutoPlay() {
            setInterval(() => {
                if (!this.state.deviceInView) return;
                const nextIndex = (this.state.currentIndex + 1) % this.elements.screens.length;
                this.navigateToScreen(nextIndex);
            }, 5000);
        },

        handleScroll() {
            const scrollTop = window.pageYOffset;
            const scrollDirection = scrollTop > this.state.lastScrollTop ? 'down' : 'up';
            this.state.lastScrollTop = scrollTop;

            // Parallax effect for device
            if (this.state.deviceInView) {
                const moveY = (scrollTop * 0.1) % this.state.screenHeight;
                gsap.to(this.elements.device, {
                    y: moveY,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }   
        }
    };

    // Initialize the showcase
    AppShowcase.init();
});