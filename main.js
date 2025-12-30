/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Controller
 * AUTHOR: Jerry Augusto
 * VERSION: v2.1.2
 * DESCRIPTION:
 * Handles application lifecycle, exact HTML-to-Dictionary synchronization,
 * Unified Modal System (Art/Colophon), and Developer Easter Eggs.
 */

/* ==========================================================================
   1. DICTIONARY & TRANSLATIONS
   ========================================================================== */

const translations = {
    en: {
        avatarTooltip: "Open for new commissions",
        // Header & Identity
        role: "Software Engineering & Full-Stack Solutions",
        manifesto: "Your site doesn't need to look like everyone else's.",
        quote: "\"Age Quod Debes.\"",
        quoteMeaning: "Do what you must.",
        
        // Header Art Metadata
        artMetadata: "CARAVAGGIO. The Calling of Saint Matthew. 1599-1600. Oil on canvas. Rome: Contarelli Chapel.",
        
        // Main Content
        wipDesc: "The forge is lit, and the metal is being tempered.<br>Projects will be revealed in due time.",
        ctaTitle: "Start a Project",
        ctaSubtitle: "Request a handcrafted estimate",
        
        // Footer
        footerRole: "Engineering & Design",
        madeWith: "Made with",
        in: "in",
        using: "using",
        
        // Socials / Utilities
        copyLabel: "Copy Email",
        toastMessage: "Email copied",

        // Modal: The Art (HTML allowed)
        artTitle: "\"The Calling of Saint Matthew\"",
        artMeta: "Caravaggio, c. 1600 — Oil on canvas",
        artBody: `
            <p>This is one of the most famous works by the renowned Italian painter Caravaggio, completed around 1600.</p>
            <p>The scene is set in a dark and somber environment, with a striking contrast between the light radiating from the window on the left and the darkness enveloping the rest of the room. In the center of the composition, we see Our Lord Jesus Christ pointing at Matthew, who is seated at the table, surrounded by other tax collectors.</p>
            <p>The expression of surprise and disbelief on Saint Matthew's face is notable, as he seems to question the divine calling he is receiving. Around him, the other men are occupied with their daily activities, apparently oblivious to the supernatural event occurring before them.</p>
            <p>The work is charged with religious symbolism, representing Matthew's spiritual transformation and the universal call to follow Christ. Caravaggio masterfully captures the emotion and profound meaning of this crucial moment in the saint's life.</p>
        `
    },
    pt: {
        avatarTooltip: "Disponível para projetos",
        // Header & Identity
        role: "Engenharia de Software & Soluções Full-Stack",
        manifesto: "Seu site não precisa ser igual ao de todo mundo.",
        quote: "\"Age Quod Debes.\"",
        quoteMeaning: "Faça o que deve ser feito.",
        
        // Header Art Metadata
        artMetadata: "CARAVAGGIO. A Vocação de São Mateus. 1599-1600. Óleo sobre tela. Roma: Capela Contarelli.",
        
        // Main Content
        wipDesc: "A forja está acesa e o metal está sendo temperado.<br>Os projetos serão revelados no momento certo.",
        ctaTitle: "Iniciar um Projeto",
        ctaSubtitle: "Solicite um orçamento artesanal",
        
        // Footer
        footerRole: "Engenharia & Design",
        madeWith: "Feito com",
        in: "no",
        using: "usando",
        
        // Socials / Utilities
        copyLabel: "Copiar Email",
        toastMessage: "Email copiado",

        // Modal: The Art (HTML allowed)
        artTitle: "\"A Vocação de São Mateus\"",
        artMeta: "Caravaggio, c. 1600 — Óleo sobre tela",
        artBody: `
            <p>Esta é uma das obras mais famosas do renomado pintor italiano Caravaggio, concluída por volta de 1600.</p>
            <p>A cena se passa em um ambiente escuro e sombrio, com um contraste marcante entre a luz que irradia da janela à esquerda e a escuridão que envolve o restante da sala. No centro da composição, vemos Nosso Senhor Jesus Cristo apontando para Mateus, que está sentado à mesa, cercado por outros cobradores de impostos.</p>
            <p>A expressão de surpresa e descrença no rosto de São Mateus é notável, pois ele parece questionar o chamado divino que está recebendo. Ao seu redor, os outros homens estão ocupados com suas atividades diárias, aparentemente alheios ao evento sobrenatural que ocorre diante deles.</p>
            <p>A obra é carregada de simbolismo religioso, representando a transformação espiritual de Mateus e o chamado universal para seguir a Cristo. Caravaggio captura com maestria a emoção e o significado profundo deste momento crucial na vida do santo.</p>
        `
    }
};

// Global State
let currentLanguage = 'en';

/* ==========================================================================
   2. SYSTEM INITIALIZATION
   ========================================================================== */

window.addEventListener('load', () => {
    // 1. Reveal Content
    document.body.classList.add('reveal-content');

    // 2. Initialize Core Systems
    initLanguageSwitcher();
    initCopyEmail(); // Specific handler for the copy button
    initUnifiedModals();
    
    // 3. Initialize Easter Eggs
    logSignature();
    initEasterEggs();
});

/* ==========================================================================
   3. LANGUAGE SWITCHER LOGIC
   ========================================================================== */

/**
 * Initializes the language toggle buttons and handles text replacement.
 */
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLanguage) return;

            // Update State
            currentLanguage = lang;
            
            // Update UI Buttons
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Execute Translation
            applyTranslations(lang);
        });
    });
}

/**
 * Applies translations to the DOM based on the selected language key.
 * @param {string} lang - 'en' or 'pt'
 */
function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    // 1. Text Content ([data-i18n])
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerHTML = t[key]; // innerHTML allows bold/spans inside simple text keys
    });

    // 2. HTML Content ([data-i18n-html]) - For large blocks
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key]) el.innerHTML = t[key];
    });

    // 3. Special Attributes (Tooltips, Aria Labels, Data-Attrs)
    
    // Manifesto Subtext
    const manifestoEl = document.querySelector('.manifesto');
    if (manifestoEl && t.manifestoSubtext) {
        manifestoEl.setAttribute('data-subtext', t.manifestoSubtext);
    }

    // Quote Meaning
    const quoteEl = document.querySelector('.quote');
    if (quoteEl && t.quoteMeaning) {
        quoteEl.setAttribute('data-meaning', t.quoteMeaning);
    }

    // Copy Email Label
    const copyBtn = document.querySelector('.copy-email');
    if (copyBtn && t.copyLabel) {
        copyBtn.setAttribute('aria-label', t.copyLabel);
        copyBtn.setAttribute('title', t.copyLabel);
    }

    // 4. Footer Badge (Manual Handling due to complex structure)
    const badgeSpans = document.querySelectorAll('.made-in-badge span');
    // Expected order: [0]="Made with", [1]=Icon, [2]="in", [3]=Flag, [4]="using"
    if (badgeSpans.length >= 5) {
        badgeSpans[0].innerText = t.madeWith;
        badgeSpans[2].innerText = t.in;
        badgeSpans[4].innerText = t.using;
    }
}

/* ==========================================================================
   4. UTILITY: COPY EMAIL
   ========================================================================== */

function initCopyEmail() {
    const copyBtn = document.querySelector('.copy-email');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = copyBtn.getAttribute('data-email');
        
        navigator.clipboard.writeText(email).then(() => {
            // Get message based on current language
            const msg = translations[currentLanguage].toastMessage || "Email copied";
            showToast(msg);
        }).catch(() => {
            alert(email);
        });
    });
}

/* ==========================================================================
   5. UNIFIED MODAL SYSTEM (ARTWORK & COLOPHON)
   ========================================================================== */

function initUnifiedModals() {
    const artBtn = document.querySelector('.art-button');
    const colophonBtn = document.getElementById('trigger-colophon');
    const backdrop = document.querySelector('.modal-backdrop');
    const contentContainer = document.querySelector('.parchment-content');
    const closeBtn = document.querySelector('.modal-close');
    const colophonTemplate = document.getElementById('colophon-content');

    // State to track what should be in the modal
    let isShowingColophon = false;

    // Backup the Original DOM Structure (The Art Description)
    // We clone the node so we have a fresh copy of the structure
    let artStructureBackup = null;
    if (contentContainer) {
        artStructureBackup = contentContainer.innerHTML; 
    }

    function openModal() {
        if (backdrop) backdrop.classList.add('is-open');
    }

    function closeModal() {
        if (backdrop) backdrop.classList.remove('is-open');
    }

    // --- SCENARIO 1: OPEN ARTWORK (The Quill) ---
    if (artBtn) {
        artBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // If we are currently showing Colophon (or if content was cleared), restore Art
            if (isShowingColophon || contentContainer.innerHTML === '') {
                contentContainer.innerHTML = artStructureBackup;
                isShowingColophon = false;
                
                // CRITICAL: Re-apply translation to the restored HTML
                // because the backup might be in the wrong language (English default)
                applyTranslations(currentLanguage);
            }
            openModal();
        });
    }

    // --- SCENARIO 2: OPEN COLOPHON (The Badge) ---
    if (colophonBtn && colophonTemplate) {
        colophonBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); 

            if (contentContainer) {
                contentContainer.innerHTML = ''; // Clear Art
                const clone = colophonTemplate.content.cloneNode(true);
                contentContainer.appendChild(clone);
                isShowingColophon = true;
            }
            openModal();
        });
    }

    // --- CLOSING LOGIC ---
    if (closeBtn) {
        // Clean event listener replacement
        const newCloseBtn = closeBtn.cloneNode(true);
        if (closeBtn.parentNode) {
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        }
        newCloseBtn.addEventListener('click', closeModal);
    }

    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
                closeModal();
            }
        });
    }
}

/* ==========================================================================
   6. TOAST NOTIFICATIONS
   ========================================================================== */

function showToast(message) {
    const toast = document.querySelector('.toast-notification');
    
    if (toast) {
        const toastMsg = toast.querySelector('.toast-message');
        if (toastMsg) toastMsg.innerText = message;
        
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    } else {
        alert(message);
    }
}

/* ==========================================================================
   7. EASTER EGGS (DEVELOPER SECRETS)
   ========================================================================== */

function initEasterEggs() {
    initKonamiCode();
    initTechSpecs();
}

/**
 * EASTER EGG 1: LUXURY CONSOLE SIGNATURE
 */
function logSignature() {
    const titleStyle = 'font-family: "EB Garamond", serif; font-size: 30px; font-weight: bold; color: #E3B505; text-shadow: 2px 2px 0px #1C1917; padding: 10px 0';
    const bodyStyle = 'font-family: "JetBrains Mono", monospace; font-size: 12px; color: #A8A29E; background-color: #1C1917; padding: 10px; border: 1px solid #E3B505; line-height: 1.5';

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
 */
function initTechSpecs() {
    const versionTag = document.querySelector('.version-tag');
    let clicks = 0;
    let timer;

    if (versionTag) {
        versionTag.title = 'System Diagnostics'; 
        versionTag.style.cursor = 'help';

        versionTag.addEventListener('click', (e) => {
            e.preventDefault();
            clicks++;
            clearTimeout(timer);
            timer = setTimeout(() => { clicks = 0; }, 500);

            if (clicks === 5) {
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
