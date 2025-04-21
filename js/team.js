document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section titles and content on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate manifesto cards
    gsap.utils.toArray('.manifesto-card').forEach((card, index) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.manifesto-cards',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate position cards
    gsap.utils.toArray('.position-card').forEach((card, index) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.positions-list',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate culture benefits
    gsap.utils.toArray('.culture-benefits li').forEach((item, index) => {
        gsap.from(item, {
            x: -50,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.culture-benefits',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate polaroid photos
    gsap.utils.toArray('.polaroid').forEach((polaroid, index) => {
        gsap.from(polaroid, {
            rotation: index === 0 ? -15 : 15,
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.polaroid-stack',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate CTA section
    gsap.from('.join-cta', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.join-cta',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Apply button hover effect
    const applyButtons = document.querySelectorAll('.apply-button');
    applyButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const icon = button.querySelector('.button-icon');
            gsap.to(icon, {
                x: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            const icon = button.querySelector('.button-icon');
            gsap.to(icon, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update the team.html link in the navigation to show as active
    const teamNavLink = document.querySelector('a[href="team.html"]');
    if (teamNavLink) {
        teamNavLink.classList.add('active');
    }
}); 