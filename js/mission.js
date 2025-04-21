document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const slidePanel = document.querySelector('.slide-panel');
    const closeBtn = document.querySelector('.close-btn');
    const panels = document.querySelectorAll('.panel-content');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const sdgId = card.dataset.sdg;
            const panel = document.querySelector(`.panel-content[data-sdg="${sdgId}"]`);
            
            // Show panel
            slidePanel.classList.add('active');
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
            
            // Disable scroll
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        slidePanel.classList.remove('active');
        document.body.style.overflow = '';
    });
});