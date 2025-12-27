/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Script (Production Build)
 * AUTHOR: Jerry Augusto
 * DATE: 2025-12-26
 */

/* --- CONFIGURATION --- */
// Tempo mínimo de preloader em ms. 
// 4000ms (4s) é o equilíbrio ideal entre "apreciar a animação" e UX.
const MINIMUM_DURATION = 1000; 

/* --- I18N DICTIONARY --- */
const translations = {
    "en": {
        role: "Software Engineering & Full-Stack Solutions",
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
    logSignature();
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
    const manifesto = document.querySelector('.manifesto');
    if (manifesto && data.manifestoSubtext) {
        manifesto.setAttribute('data-subtext', data.manifestoSubtext);
    }

    const quote = document.querySelector('.quote');
    if (quote && data.quoteMeaning) {
        quote.setAttribute('data-meaning', data.quoteMeaning);
    }

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
            }, 800); // Matches CSS transition duration
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

/**
 * Easter Egg: Developer Signature
 */
/* --- EASTER EGG 1: LUXURY CONSOLE SIGNATURE --- */
function logSignature() {
    // Estilos CSS para o Console
    const titleStyle = [
        'font-family: "EB Garamond", serif',
        'font-size: 30px',
        'font-weight: bold',
        'color: #E3B505', // Dourado
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

    const labelStyle = [
        'font-weight: bold',
        'color: #E3B505'
    ].join(';');

    // Arte ASCII (Escapada para JS)
    const asciiArt = `
    .       .
    |\\     /|
    | \\   / |  THE ARCHITECT IS WATCHING.
     \\ \\ / / 
      \\ | /    Est. 2025
       \\|/
    `;

    console.clear(); // Limpa o lixo do navegador antes
    console.log(`%c Jerry Augusto %c`, titleStyle, 'background: transparent');
    console.log(`%c${asciiArt}`, 'color: #C5A059; font-family: monospace; font-weight: bold;');
    
    // O Bloco de Status
    console.log(`%c
:: SYSTEM STATUS ::  [ONLINE]
:: RENDER ENGINE ::  [V8 / BLINK]
:: PHILOSOPHY    ::  [TOMISTA / STOIC]

"Nihil est in intellectu quod non prius fuerit in sensu."

> Curious about the code? 
> Check the repo: https://github.com/jerryaugusto
    `, bodyStyle);
}

// Chame a função assim que o site carregar
window.addEventListener('load', logSignature);

/* --- EASTER EGG 2: KONAMI CODE (X-RAY MODE) --- */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    // Verifica se a tecla pressionada corresponde à sequência
    if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase() || e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateXRayMode();
            konamiIndex = 0; // Reseta após ativar
        }
    } else {
        konamiIndex = 0; // Errou a sequência? Reseta.
    }
});

function activateXRayMode() {
    // Adiciona uma classe ao body que desenha bordas em tudo
    const isActive = document.body.classList.toggle('debug-mode');
    
    const message = isActive 
        ? "SYSTEM OVERRIDE: DEBUG MODE ACTIVE" 
        : "SYSTEM NORMALIZED";
        
    // Log no console com estilo
    console.log(`%c ${message} `, 'background: #782626; color: #fff; font-weight: bold; padding: 5px; border: 1px solid #E3B505;');
    
    // Feedback visual usando o Toast (se ele existir na DOM)
    const toast = document.querySelector('.toast-notification');
    if(toast) {
        // Se tiver ícone e texto, atualizamos o texto
        const toastMsg = toast.querySelector('.toast-message');
        if(toastMsg) toastMsg.innerText = message;
        
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    } else {
        // Fallback simples se não tiver toast
        alert(message);
    }
}


/* --- EASTER EGG 3: CLICK RAGE (TECH SPECS) --- */
function initTechSpecs() {
    const versionTag = document.querySelector('.version-tag');
    let clicks = 0;
    let timer;

    if (versionTag) {
        // Muda o cursor para indicar sutilmente que é interagível (opcional)
        versionTag.style.cursor = 'help';
        versionTag.title = 'System Diagnostics'; // Tooltip nativo

        versionTag.addEventListener('click', (e) => {
            // Previne seleção de texto ao clicar rápido
            e.preventDefault(); 
            
            clicks++;
            
            // Reseta a contagem se o usuário parar de clicar por 500ms
            clearTimeout(timer);
            timer = setTimeout(() => { clicks = 0; }, 500);

            if (clicks === 5) {
                // Coleta os dados "crus" do ambiente
                const specs = {
                    "System Status": "OPERATIONAL",
                    "Resolution": `${window.innerWidth}x${window.innerHeight}`,
                    "Pixel Ratio": window.devicePixelRatio,
                    "Touch Support": ('ontouchstart' in window) || (navigator.maxTouchPoints > 0),
                    "Renderer": navigator.vendor || "Unknown",
                    "User Agent": navigator.userAgent,
                    "Time": new Date().toISOString()
                };

                // Formata como um JSON bonito
                const message = JSON.stringify(specs, null, 4);
                
                // Feedback: Copia para o clipboard e avisa (High-End UX)
                navigator.clipboard.writeText(message).then(() => {
                     showToast("DIAGNOSTICS COPIED TO CLIPBOARD");
                }).catch(() => {
                    // Fallback se a cópia falhar: Alerta Clássico
                    alert(":: SYSTEM DIAGNOSTICS ::\n\n" + message);
                });

                clicks = 0;
            }
        });
    }
}

// Garante que iniciamos essa função junto com as outras
window.addEventListener('load', initTechSpecs);
