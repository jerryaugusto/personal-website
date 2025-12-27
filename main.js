/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Controller
 * AUTHOR: Jerry Augusto
 * VERSION: v2.1.0
 * * DESCRIPTION:
 * Handles application lifecycle, modal interactions (Art & Colophon),
 * and developer-focused easter eggs.
 */

/* ==========================================================================
   1. SYSTEM INITIALIZATION & PRELOADER
   ========================================================================== */

/**
 * Initializes the application state once all resources are loaded.
 * Removes the preloader and reveals the main content.
 */
window.addEventListener('load', () => {
    // 1. Reveal Content (CSS transition handles the fade-out)
    document.body.classList.add('reveal-content');

    // 2. Initialize Subsystems
    logSignature();
    initUnifiedModals();
    initEasterEggs();
});

/* ==========================================================================
   2. UNIFIED MODAL SYSTEM (ARTWORK & COLOPHON)
   ========================================================================== */

/**
 * Manages the modal logic, allowing switching between the standard 
 * Artwork description and the technical "Colophon" (Inception) view
 * without losing original content.
 */
function initUnifiedModals() {
    const artBtn = document.querySelector('.art-button');
    const colophonBtn = document.getElementById('trigger-colophon');
    const backdrop = document.querySelector('.modal-backdrop');
    const contentContainer = document.querySelector('.parchment-content');
    const closeBtn = document.querySelector('.modal-close');
    const colophonTemplate = document.getElementById('colophon-content');

    // SAFETY: Cache the original HTML (The Painting Description) 
    // immediately upon load, before any interaction occurs.
    let originalArtHTML = "";
    if (contentContainer) {
        originalArtHTML = contentContainer.innerHTML;
    }

    /**
     * Opens the modal by adding the active CSS class.
     */
    function openModal() {
        if (backdrop) backdrop.classList.add('is-open');
    }

    /**
     * Closes the modal by removing the active CSS class.
     */
    function closeModal() {
        if (backdrop) backdrop.classList.remove('is-open');
    }

    // --- INTERACTION 1: THE QUILL (Restores Original Artwork) ---
    if (artBtn) {
        artBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Logic: If the content was changed (by the Colophon), restore the backup.
            if (contentContainer && contentContainer.innerHTML !== originalArtHTML) {
                contentContainer.innerHTML = originalArtHTML;
            }
            openModal();
        });
    }

    // --- INTERACTION 2: THE BADGE (Injects Technical Blueprint) ---
    if (colophonBtn && colophonTemplate) {
        colophonBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent bubbling issues

            if (contentContainer) {
                // 1. Clear current content
                contentContainer.innerHTML = '';
                
                // 2. Clone the template content (The Inception Data)
                const clone = colophonTemplate.content.cloneNode(true);
                
                // 3. Inject into the DOM
                contentContainer.appendChild(clone);
            }
            openModal();
        });
    }

    // --- CLOSING LOGIC (UI/UX) ---
    
    // Handle "X" button click
    if (closeBtn) {
        // Clone node to strip any previous event listeners (clean slate)
        const newCloseBtn = closeBtn.cloneNode(true);
        if (closeBtn.parentNode) {
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        }
        newCloseBtn.addEventListener('click', closeModal);
    }

    // Handle Backdrop click (Click outside to close)
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });

        // Handle ESC Key (Accessibility)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
                closeModal();
            }
        });
    }
}

/* ==========================================================================
   3. UTILITIES & TOAST NOTIFICATIONS
   ========================================================================== */

/**
 * Displays a non-intrusive toast notification at the bottom of the screen.
 * @param {string} message - The text to display.
 */
function showToast(message) {
    const toast = document.querySelector('.toast-notification');
    
    if (toast) {
        const toastMsg = toast.querySelector('.toast-message');
        if (toastMsg) toastMsg.innerText = message;
        
        toast.classList.add('show');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    } else {
        // Fallback for older browsers or missing HTML structure
        alert(message);
    }
}

/* ==========================================================================
   4. EASTER EGGS (DEVELOPER SECRETS)
   ========================================================================== */

/**
 * Initializes all hidden features for curious developers.
 */
function initEasterEggs() {
    initKonamiCode();
    initTechSpecs();
}

/**
 * EASTER EGG 1: LUXURY CONSOLE SIGNATURE
 * Prints a stylized ASCII art and system status to the browser DevTools console.
 */
function logSignature() {
    const titleStyle = [
        'font-family: "EB Garamond", serif',
        'font-size: 30px',
        'font-weight: bold',
        'color: #E3B505',
        'text-shadow: 2px 2px 0px #1C1917',
        'padding: 10px 0'
    ].join(';');

    const bodyStyle = [
        'font-family: "JetBrains Mono", monospace',
        'font-size: 12px',
        'color: #A8A29E',
        'background-color: #1C1917',
        'padding: 10px',
        'border: 1px solid #E3B505',
        'line-height: 1.5'
    ].join(';');

    const asciiArt = `
    .       .
    |\\     /|
    | \\   / |  THE ARCHITECT IS WATCHING.
     \\ \\ / / 
      \\ | /    Est. 2025
       \\|/
    `;

    console.clear();
    console.log(`%c Jerry Augusto %c`, titleStyle, 'background: transparent');
    console.log(`%c${asciiArt}`, 'color: #C5A059; font-family: monospace; font-weight: bold;');
    console.log(`%c
:: SYSTEM STATUS ::  [ONLINE]
:: RENDER ENGINE ::  [V8 / BLINK]
:: PHILOSOPHY    ::  [TOMISTA / STOIC]

"Nihil est in intellectu quod non prius fuerit in sensu."

> Curious about the code? 
> Check the repo: https://github.com/jerryaugusto
    `, bodyStyle);
}

/**
 * EASTER EGG 2: KONAMI CODE (X-RAY MODE)
 * Triggers a visual debug mode when the sequence is typed:
 * Up, Up, Down, Down, Left, Right, Left, Right, B, A
 */
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase() || e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                toggleXRayMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function toggleXRayMode() {
        const isActive = document.body.classList.toggle('debug-mode');
        const message = isActive ? "SYSTEM OVERRIDE: DEBUG MODE ACTIVE" : "SYSTEM NORMALIZED";
        
        console.log(`%c ${message} `, 'background: #782626; color: #fff; font-weight: bold; padding: 5px; border: 1px solid #E3B505;');
        showToast(message);
    }
}

/**
 * EASTER EGG 3: CLICK RAGE (TECH SPECS)
 * Copies system diagnostics to clipboard after 5 rapid clicks on the version tag.
 */
function initTechSpecs() {
    const versionTag = document.querySelector('.version-tag');
    let clicks = 0;
    let timer;

    if (versionTag) {
        // UX: Indicate interactivity subtly via tooltip
        versionTag.title = 'System Diagnostics'; 
        versionTag.style.cursor = 'help';

        versionTag.addEventListener('click', (e) => {
            e.preventDefault();
            clicks++;
            
            // Reset count if user stops clicking for 500ms
            clearTimeout(timer);
            timer = setTimeout(() => { clicks = 0; }, 500);

            if (clicks === 5) {
                // Gather environment data
                const specs = {
                    "System Status": "OPERATIONAL",
                    "Resolution": `${window.innerWidth}x${window.innerHeight}`,
                    "Pixel Ratio": window.devicePixelRatio,
                    "Touch Support": ('ontouchstart' in window) || (navigator.maxTouchPoints > 0),
                    "Renderer": navigator.vendor || "Unknown",
                    "User Agent": navigator.userAgent,
                    "Timestamp": new Date().toISOString()
                };

                const message = JSON.stringify(specs, null, 4);
                
                // Copy to clipboard with feedback
                navigator.clipboard.writeText(message).then(() => {
                     showToast("DIAGNOSTICS COPIED TO CLIPBOARD");
                }).catch(() => {
                    alert(":: SYSTEM DIAGNOSTICS ::\n\n" + message);
                });

                clicks = 0;
            }
        });
    }
}
