/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Script (with Internationalization)
 * AUTHOR: Jerry Augusto
 * DATE: 2025-12-26
 */

/* --- CONFIGURATION --- */
const MINIMUM_DURATION = 9000; 

/* --- I18N DICTIONARY --- */
const translations = {
    "en": {
        role: "Software Engineering & Full-Stack Solutions",
        // Updated English version to match the new Portuguese meaning accurately but elegantly
        manifesto: "Reject the generic that hides your project's true identity.<br>Embrace the absolute distinction of <span class='highlight'>hand-forged code</span>, tailored just for you.",
        manifestoSubtext: "Your site doesn't need to look like everyone else's.",
        quote: "\"Age Quod Debes.\"",
        quoteMeaning: "Do what you must.",
        copyLabel: "Copy Email",
        artMetadata: "CARAVAGGIO. The Calling of Saint Matthew. 1599-1600. Oil on canvas. Rome: Contarelli Chapel.",
        wipDesc: "The forge is lit, and the metal is being tempered.<br>Projects will be revealed in due time.",
        ctaTitle: "Start a Project",
        ctaSubtitle: "Request a handcrafted estimate",
        footerRole: "Engineering & Design",
        madeWith: "Made with",
        madeIn: "in",
        madeUsing: "using",
        artTitle: "\"The Calling of Saint Matthew\"",
        artMeta: "Caravaggio, c. 1600 — Oil on canvas",
        artBody: `
            <p>This is one of the most famous works by the renowned Italian painter Caravaggio, completed around 1600.</p>
            <p>The scene is set in a dark and somber environment, with a striking contrast between the light radiating from the window on the left and the darkness enveloping the rest of the room. In the center of the composition, we see Our Lord Jesus Christ pointing at Matthew, who is seated at the table, surrounded by other tax collectors.</p>
            <p>The expression of surprise and disbelief on Saint Matthew's face is notable, as he seems to question the divine calling he is receiving. Around him, the other men are occupied with their daily activities, apparently oblivious to the supernatural event occurring before them.</p>
            <p>The work is charged with religious symbolism, representing Matthew's spiritual transformation and the universal call to follow Christ. Caravaggio masterfully captures the emotion and profound meaning of this crucial moment in the saint's life.</p>
        `,
        toastMessage: "Email copied"
    },
    "pt": {
        role: "Engenharia de Software & Soluções Full-Stack",
        // Nova versão em Português solicitada
        manifesto: "Rejeite o genérico que esconde a verdadeira identidade do seu projeto.<br>Abrace o destaque absoluto de um <span class='highlight'>código forjado à mão</span>, feito sob medida.",
        manifestoSubtext: "Seu site não precisa ser igual a todos os outros que existem por aí.",
        quote: "\"Age Quod Debes.\"",
        quoteMeaning: "Faz o que deves.",
        copyLabel: "Copiar Email",
        artMetadata: "CARAVAGGIO. A Vocação de São Mateus. 1599-1600. Óleo sobre tela. Roma: Capela Contarelli.",
        wipDesc: "A forja está acesa e o metal sendo temperado.<br>Os projetos serão revelados no tempo devido.",
        ctaTitle: "Iniciar Projeto",
        ctaSubtitle: "Solicite um orçamento artesanal",
        footerRole: "Engenharia & Design",
        madeWith: "Feito com",
        madeIn: "no",
        madeUsing: "usando",
        artTitle: "\"A Vocação de São Mateus\"",
        artMeta: "Caravaggio, c. 1600 — Óleo sobre tela",
        artBody: `
            <p>Esta é uma das obras mais conhecidas do renomado pintor italiano Caravaggio, concluída por volta de 1600.</p>
            <p>A cena se passa em um ambiente escuro e sombrio, com um contraste marcante entre a luz que irradia da janela à esquerda e a escuridão que envolve o restante da sala. No centro da composição, vemos Nosso Senhor Jesus Cristo apontando para Mateus, que está sentado à mesa, rodeado por outros cobradores de impostos.</p>
            <p>A expressão de surpresa e incredulidade no rosto de São Mateus é notável, enquanto ele parece se questionar sobre a chamada divina que está recebendo. Ao seu redor, os outros homens estão ocupados com suas atividades cotidianas, aparentemente alheios ao evento sobrenatural que está ocorrendo diante deles.</p>
            <p>A obra é carregada de simbolismo religioso, representando a transformação espiritual de Mateus e o chamado universal para seguir Cristo. Caravaggio captura magistralmente a emoção e o significado profundo desse momento crucial na vida do santo.</p>
        `,
        toastMessage: "Email copiado"
    }
};

/* --- STATE MANAGEMENT --- */
const startTime = Date.now();

/* --- INIT --- */
window.addEventListener('load', () => {
    initLanguage(); // Initialize I18n before showing content
    handlePreloader();
    initModal();
    initClipboard();
});

/**
 * Handles internationalization (I18n).
 * Detects user language, updates content, and handles the switch button.
 */
function initLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // 1. Detect Language
    // Check LocalStorage first, then Browser preference, default to 'en'
    let currentLang = localStorage.getItem('site-lang') || 
                      (navigator.language.startsWith('pt') ? 'pt' : 'en');

    // 2. Apply Language
    updateInterface(currentLang);

    // 3. Event Listeners for Switchers
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                updateInterface(currentLang);
                localStorage.setItem('site-lang', currentLang);
            }
        });
    });
}

/**
 * Updates the DOM elements based on the selected language.
 * @param {string} lang - 'en' or 'pt'
 */
function updateInterface(lang) {
    const data = translations[lang];

    // Update Text Content ([data-i18n])
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            // Use innerHTML to allow for <span> tags (like in the manifesto)
            el.innerHTML = data[key];
        }
    });

    // Update HTML Blocks ([data-i18n-html]) - for larger blocks like the Art Body
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (data[key]) {
            el.innerHTML = data[key];
        }
    });

    // Update Specific Attributes (Tooltips, Aria-Labels)
    
    // Manifesto Tooltip
    const manifesto = document.querySelector('.manifesto');
    if (manifesto && data.manifestoSubtext) {
        manifesto.setAttribute('data-subtext', data.manifestoSubtext);
    }

    // Quote Tooltip
    const quote = document.querySelector('.quote');
    if (quote && data.quoteMeaning) {
        quote.setAttribute('data-meaning', data.quoteMeaning);
    }

    // Copy Email Label
    const copyEmail = document.querySelector('.copy-email');
    if (copyEmail && data.copyLabel) {
        copyEmail.setAttribute('aria-label', data.copyLabel);
        copyEmail.setAttribute('title', data.copyLabel);
    }

    // Update Switcher UI State
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update HTML lang attribute for SEO/Accessibility
    document.documentElement.setAttribute('lang', lang);
}

/**
 * Handles the initial loading screen animation.
 */
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MINIMUM_DURATION - elapsedTime);

        setTimeout(() => {
            document.body.classList.add('reveal-content'); 
            setTimeout(() => {
                preloader.remove();
            }, 800);
        }, remainingTime);
    }
}

/**
 * Initializes the modal logic.
 */
function initModal() {
    const artButton = document.querySelector('.art-button');
    const modal = document.getElementById('art-modal');
    const closeBtn = document.querySelector('.modal-close');

    if (artButton && modal) {
        artButton.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}

/**
 * Initializes the clipboard functionality.
 */
function initClipboard() {
    const emailLink = document.querySelector('.copy-email');
    const toast = document.getElementById('toast');
    let toastTimeout;

    if (emailLink && toast) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const email = emailLink.getAttribute('data-email');
            
            navigator.clipboard.writeText(email).then(() => {
                showToast();
            }).catch(err => {
                console.error('Failed to copy email:', err);
                window.location.href = `mailto:${email}`;
            });
        });
    }

    function showToast() {
        if (!toast) return;
        
        // We need to re-fetch the message from the DOM in case lang changed
        // Actually, the I18n logic updates the innerText of the toast, so it is already correct.

        toast.classList.remove('show');
        clearTimeout(toastTimeout);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}
