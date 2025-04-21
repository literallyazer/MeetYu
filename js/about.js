document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // SDG panel functionality
    initSDGPanels();
    
    // Floating elements animation
    animateFloatingElements();
    
    // Video play button
    initVideoPlayButton();
    
    // Update cursor events after dynamic content
    if (window.updateCursorEvents) {
        window.updateCursorEvents();
    }
});

function initSDGPanels() {
    const sdgPills = document.querySelectorAll('.sdg-pill');
    const sdgClickables = document.querySelectorAll('.sdg-clickable');
    const slidingPanels = document.querySelectorAll('.sliding-panel');
    const closePanelButtons = document.querySelectorAll('.close-panel');
    
    // Function to open panel with animation
    const openPanel = (sdgNumber) => {
        const targetPanel = document.querySelector(`.sliding-panel[data-sdg="${sdgNumber}"]`);
        
        if (targetPanel) {
            // Close any open panels first
            slidingPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Open the selected panel
            targetPanel.classList.add('active');
            document.body.classList.add('panel-open');
            
            // Animate panel entry
            gsap.fromTo(targetPanel, 
                { x: '100%', opacity: 0 },
                { 
                    x: '0%', 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: 'power2.out',
                    onComplete: () => {
                        // Update cursor events after panel is fully open
                        if (window.updateCursorEvents) {
                            window.updateCursorEvents();
                        }
                    }
                }
            );
        }
    };
    
    // Open panel when clicking on an SDG pill
    sdgPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const sdgNumber = pill.getAttribute('data-sdg');
            openPanel(sdgNumber);
        });
    });
    
    // Open panel when clicking on an SDG floating element
    sdgClickables.forEach(element => {
        element.addEventListener('click', () => {
            const sdgNumber = element.getAttribute('data-sdg');
            openPanel(sdgNumber);
        });
    });
    
    // Close panel functionality
    closePanelButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const panel = e.target.closest('.sliding-panel');
            
            // Animate panel exit
            closePanel(panel);
        });
    });
    
    // Close panel when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('panel-open')) {
            const activePanel = document.querySelector('.sliding-panel.active');
            if (activePanel) {
                gsap.to(activePanel, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        activePanel.classList.remove('active');
                        document.body.classList.remove('panel-open');
                        
                        // Update cursor events after panel is closed
                        if (window.updateCursorEvents) {
                            window.updateCursorEvents();
                        }
                    }
                });
            }
        }
    });
    
    // Close panel when clicking outside - but only on the background
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('panel-open') && 
            !e.target.closest('.sliding-panel') && 
            !e.target.closest('.sdg-pill') &&
            !e.target.closest('.sdg-clickable')) {
            
            const activePanel = document.querySelector('.sliding-panel.active');
            if (activePanel) {
                gsap.to(activePanel, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        activePanel.classList.remove('active');
                        document.body.classList.remove('panel-open');
                        
                        // Update cursor events after panel is closed
                        if (window.updateCursorEvents) {
                            window.updateCursorEvents();
                        }
                    }
                });
            }
        }
    });
    
    // Animate feature cards on scroll
    ScrollTrigger.batch('.feature-card', {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power2.out'
            });
        },
        start: 'top 90%'
    });
}

function animateFloatingElements() {
    const floatElements = document.querySelectorAll('.float-element');
    
    // Create a timeline for each element with unique animation
    floatElements.forEach((element, index) => {
        // Position elements in different corners
        const positions = [
            { x: '20%', y: '20%' },
            { x: '70%', y: '30%' },
            { x: '30%', y: '70%' },
            { x: '75%', y: '65%' }
        ];
        
        // Set initial position
        gsap.set(element, {
            x: positions[index].x,
            y: positions[index].y,
            scale: 0,
            opacity: 0,
            rotation: gsap.utils.random(-10, 10)
        });
        
        // Create animation timeline
        const tl = gsap.timeline({
            delay: index * 0.3,
            repeat: -1,
            yoyo: true,
            repeatDelay: 1
        });
        
        // Entrance animation
        tl.to(element, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.7)'
        });
        
        // Floating animation
        tl.to(element, {
            y: `+=${gsap.utils.random(20, 40)}`,
            x: `+=${gsap.utils.random(-20, 20)}`,
            rotation: gsap.utils.random(-5, 5),
            duration: gsap.utils.random(3, 5),
            ease: 'sine.inOut'
        });
        
        // Additional movement
        tl.to(element, {
            y: `-=${gsap.utils.random(10, 30)}`,
            x: `-=${gsap.utils.random(-15, 15)}`,
            rotation: gsap.utils.random(-3, 3),
            duration: gsap.utils.random(2, 4),
            ease: 'sine.inOut'
        });
        
        // Add hover effects
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                scale: 1.15,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    // Hero section animations
    gsap.from('.mega-title .line', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top 80%'
        }
    });
    
    gsap.from('.hero-text', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top 80%'
        }
    });
    
    gsap.from('.sdg-pill', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top 80%'
        }
    });
}

function initVideoPlayButton() {
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.background-video');
    
    if (playButton && video) {
        playButton.addEventListener('click', () => {
            // Toggle video controls and full screen
            video.controls = true;
            video.muted = false;
            
            // Start playing if paused
            if (video.paused) {
                video.play();
            }
            
            // Try to go fullscreen
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }
}

// Handler for panel close
function closePanel(panel) {
    // Animate panel exit
    gsap.to(panel, {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
            panel.classList.remove('active');
            document.body.classList.remove('panel-open');
            
            // Update cursor events after panel is closed
            if (window.updateCursorEvents) {
                window.updateCursorEvents();
            }
        }
    });
}
