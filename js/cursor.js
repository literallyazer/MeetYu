// Custom cursor implementation
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Track mouse position
    const updateCursorPosition = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Update cursor dot position immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay to outline for smooth effect
        requestAnimationFrame(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
    };
    
    // Add hover effect for interactive elements
    const addCursorHoverEffect = () => {
        const hoverElements = document.querySelectorAll('.cursor-hover');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('cursor-hover-active');
                cursorOutline.classList.add('cursor-hover-active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('cursor-hover-active');
                cursorOutline.classList.remove('cursor-hover-active');
            });
        });
    };
    
    // Add click effect
    const addCursorClickEffect = () => {
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('cursor-click');
            cursorOutline.classList.add('cursor-click');
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.classList.remove('cursor-click');
            cursorOutline.classList.remove('cursor-click');
        });
    };
    
    // Initialize
    const initCustomCursor = () => {
        // Hide cursor on mobile devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
            return;
        }
        
        document.addEventListener('mousemove', updateCursorPosition);
        addCursorHoverEffect();
        addCursorClickEffect();
    };
    
    initCustomCursor();
}); 