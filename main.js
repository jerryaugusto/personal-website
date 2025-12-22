/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Script
 * AUTHOR: Jerry Augusto
 * DATE: 2025-12-22
 * DESCRIPTION: Handles global UI interactions, preloader timing, and
 * entrance animation orchestration.
 */

/* --- CONFIGURATION --- */

// Minimum time (in ms) the preloader must stay visible.
// Set to 2000ms to ensure the "Ink Veil" cinematic effect is perceived.
const MINIMUM_DURATION = 2000; 

/* --- STATE MANAGEMENT --- */

const startTime = Date.now();

/* --- EVENT LISTENERS --- */

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    if (preloader) {
        // Calculate elapsed time since script execution start
        const elapsedTime = Date.now() - startTime;

        // Determine remaining wait time to satisfy MINIMUM_DURATION
        const remainingTime = Math.max(0, MINIMUM_DURATION - elapsedTime);

        setTimeout(() => {
            // 1. Fade out the "Ink Veil" curtain
            preloader.classList.add('fade-out');

            // 2. Cue the Actors: Trigger the content entrance animations
            // This class activates the CSS animations defined in style.css
            document.body.classList.add('reveal-content');

            // 3. Cleanup: Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 800);

        }, remainingTime);
    }
});
