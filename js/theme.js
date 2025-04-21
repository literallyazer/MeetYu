document.addEventListener('DOMContentLoaded', () => {
    // Set dark theme as the default now, only change if explicitly saved as light
    const savedTheme = localStorage.getItem('theme');
    
    // Always default to dark theme unless explicitly set to light
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        // Save dark theme as default if no preference was saved
        if (!savedTheme) {
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Add event listener to theme toggle buttons across all pages
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        // Update toggle position to show dark mode by default
        const toggleThumb = toggle.querySelector('.toggle-thumb');
        if (toggleThumb && savedTheme !== 'light') {
            toggleThumb.style.transform = 'translateX(24px)';
        }
        
        toggle.addEventListener('click', toggleTheme);
    });
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme attribute
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Additional theme-specific adjustments
        updateThemeSpecificElements(newTheme);
    }
    
    // Initial update for theme-specific elements
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeSpecificElements(currentTheme);
    
    // Update elements that need specific adjustments for each theme
    function updateThemeSpecificElements(theme) {
        // Navigation adjustments
        const nav = document.querySelector('nav');
        if (nav) {
            if (theme === 'dark') {
                nav.style.background = 'rgba(16, 16, 31, 0.8)';
                nav.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.8)';
                nav.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.05)';
            }
        }
        
        // Ambient background adjustments
        const ambientBg = document.querySelector('.ambient-background');
        const gradientSphere = document.querySelector('.gradient-sphere');
        
        if (ambientBg) {
            if (theme === 'dark') {
                ambientBg.style.opacity = '0.2';
                if (gradientSphere) {
                    gradientSphere.style.background = 'radial-gradient(circle at center, #342EAA 0%, rgba(16, 16, 31, 0) 70%)';
                }
            } else {
                ambientBg.style.opacity = '1';
                if (gradientSphere) {
                    gradientSphere.style.background = 'radial-gradient(circle at center, #5743FF 0%, rgba(255, 255, 255, 0) 70%)';
                }
            }
        }
        
        // Logo adjustments
        const logos = document.querySelectorAll('.logo-img');
        logos.forEach(logo => {
            if (theme === 'dark') {
                logo.style.filter = 'brightness(1.2) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))';
            } else {
                logo.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))';
            }
        });
        
        // Toggle thumb position
        const toggleThumbs = document.querySelectorAll('.toggle-thumb');
        toggleThumbs.forEach(thumb => {
            if (theme === 'dark') {
                thumb.style.transform = 'translateX(24px)';
            } else {
                thumb.style.transform = 'translateX(0)';
            }
        });
        
        // Adjust icon visibility in theme toggle
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');
        
        sunIcons.forEach(icon => {
            icon.style.opacity = theme === 'dark' ? '0.5' : '1';
        });
        
        moonIcons.forEach(icon => {
            icon.style.opacity = theme === 'dark' ? '1' : '0.5';
        });
        
        // Update button and interactive elements
        const buttons = document.querySelectorAll('.primary-button, .try-button, .text-button, .apply-button');
        buttons.forEach(button => {
            if (theme === 'dark') {
                button.style.boxShadow = '0 4px 20px rgba(123, 97, 255, 0.3)';
            } else {
                button.style.boxShadow = '0 4px 20px rgba(123, 97, 255, 0.15)';
            }
        });
    }
}); 