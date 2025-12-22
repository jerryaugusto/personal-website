/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Script
 * AUTHOR: Jerry Augusto
 * DATE: 2025-12-22
 */

/* --- CONFIGURATION --- */
const MINIMUM_DURATION = 2000; 

/* --- STATE MANAGEMENT --- */
const startTime = Date.now();

/* --- INIT --- */
window.addEventListener('load', () => {
    handlePreloader();
    initModal(); // Initialize the new modal logic
});

/* --- PRELOADER LOGIC --- */
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MINIMUM_DURATION - elapsedTime);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.add('reveal-content');
            setTimeout(() => preloader.remove(), 800);
        }, remainingTime);
    }
}

/* --- MODAL LOGIC (The Parchment) --- */
function initModal() {
    const artButton = document.querySelector('.art-button');
    const modal = document.getElementById('art-modal');
    const closeBtn = document.querySelector('.modal-close');

    // Open Modal
    if (artButton && modal) {
        artButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents bubbling issues
            modal.classList.add('is-open');
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Actions
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('is-open');
            document.body.style.overflow = ''; // Restore scroll
        }
    };

    // 1. Click X button
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // 2. Click Outside (Backdrop)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // 3. Press Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}
