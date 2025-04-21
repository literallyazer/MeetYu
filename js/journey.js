// Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Random rotation for journal entries
    document.querySelectorAll('.entry-content').forEach(entry => {
        const randomRotation = (Math.random() - 0.5) * 2;
        entry.style.transform = `rotate(${randomRotation}deg)`;
    });

    // Handwriting animation effect
    gsap.utils.toArray('.entry-content p').forEach(paragraph => {
        gsap.from(paragraph, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: paragraph,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Paper unfold effect
    gsap.utils.toArray('.timeline-entry').forEach(entry => {
        gsap.from(entry, {
            rotationX: 90,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: entry,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
});