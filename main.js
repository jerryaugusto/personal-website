/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Script
 * AUTHOR: Jerry Augusto
 * DATE: 2025-12-22
 * DESCRIPTION: Handles global UI interactions, preloader timing, and
 * entrance animation orchestration.
 */

/* --- CONFIGURATION --- */

const MINIMUM_DURATION = 1000; // 1 second minimum visibility

/* --- STATE MANAGEMENT --- */

const startTime = Date.now();

/* --- EVENT LISTENERS --- */

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MINIMUM_DURATION - elapsedTime);

        setTimeout(() => {
            // 1. Fade out the "Ink Veil" curtain
            preloader.classList.add('fade-out');
            
            // 2. Cue the Actors: Trigger the content entrance animations
            // This class activates the CSS animations defined in style.css
            document.body.classList.add('reveal-content');
            
            // 3. Cleanup: Remove preloader from DOM
            setTimeout(() => {
                preloader.remove();
            }, 800);
            
        }, remainingTime);
    }
});
