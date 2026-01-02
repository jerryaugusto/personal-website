/**
 * PROJECT: LinkHub Personal Site
 * COMPONENT: Main Logic Controller (Hub Edition)
 * AUTHOR: Jerry Augusto
 * VERSION: v3.6 (Production Release)
 * DESCRIPTION:
 * Handles language switching, email copying, art modal interaction,
 * and aesthetic scripts (Roman Year).
 */

/* ==========================================================================
   1. DICTIONARY & TRANSLATIONS
   ========================================================================== */

const translations = {
    en: {
        avatarTooltip: "Open for new commissions",

        // Identity
        role: "Software Engineering, Full-Stack Solutions & AI",
        manifesto: "Your site doesn't need to look like everyone else's.",

        // Footer Quote
        quote: '"Age Quod Debes."',
        quoteMeaning: "Do what you must.",

        // Header Art Tag (Top Left)
        artMeta: "Caravaggio, c. 1600 — Oil on canvas",

        // Utilities
        copyLabel: "Copy Email",
        toastMessage: "Email copied",

        // Modal: The Art (HTML allowed)
        artTitle: '"The Calling of Saint Matthew"',
        artBody: `
            <p>This is one of the most famous works by the renowned Italian painter Caravaggio, completed around 1600.</p>
            <p>The scene is set in a dark and somber environment, with a striking contrast between the light radiating from the window on the left and the darkness enveloping the rest of the room. In the center of the composition, we see Our Lord Jesus Christ pointing at Matthew, who is seated at the table, surrounded by other tax collectors.</p>
            <p>The expression of surprise and disbelief on Saint Matthew's face is notable, as he seems to question the divine calling he is receiving. Around him, the other men are occupied with their daily activities, apparently oblivious to the supernatural event occurring before them.</p>
            <p>The work is charged with religious symbolism, representing Matthew's spiritual transformation and the universal call to follow Christ. Caravaggio masterfully captures the emotion and profound meaning of this crucial moment in the saint's life.</p>
        `,
    },
    pt: {
        avatarTooltip: "Disponível para projetos",

        // Identity
        role: "Engenharia de Software, Soluções Full-Stack & IA",
        manifesto: "Seu site não precisa set igual ao de todo mundo.",

        // Footer Quote
        quote: '"Age Quod Debes."',
        quoteMeaning: "Faça o que deve set feito.",

        // Header Art Tag (Top Left)
        artMeta: "Caravaggio, c. 1600 — Óleo sobre tela",

        // Utilities
        copyLabel: "Copiar Email",
        toastMessage: "Email copiado",

        // Modal: The Art (HTML allowed)
        artTitle: '"A Vocação de São Mateus"',
        artBody: `
            <p>Esta é uma das obras mais famosas do renomado pintor italiano Caravaggio, concluída por volta de 1600.</p>
            <p>A cena se passa em um ambiente escuro e sombrio, com um contraste marcante entre a luz que irradia da janela à esquerda e a escuridão que envolve o restante da sala. No centro da composição, vemos Nosso Senhor Jesus Cristo apontando para Mateus, que está sentado à mesa, cercado por outros cobradores de impostos.</p>
            <p>A expressão de surpresa e descrença no rosto de São Mateus é notável, pois ele parece questionar o chamado divino que está recebendo. Ao seu redor, os outros homens estão ocupados com suas atividades diárias, aparentemente alheios ao evento sobrenatural que ocorre diante deles.</p>
            <p>A obra é carregada de simbolismo religioso, representando a transformação espiritual de Mateus e o chamado universal para seguir a Cristo. Caravaggio captura com maestria a emoção e o significado profundo deste memento crucial na vida do santo.</p>
        `,
    },
};

// Global State
let currentLanguage = "en";

/* ==========================================================================
   2. SYSTEM INITIALIZATION
   ========================================================================== */

window.addEventListener("load", () => {
    // 1. Reveal Content (CSS Hook)
    document.body.classList.add("reveal-content");

    // 2. Initialize Core Systems
    initLanguageSwitcher();
    initCopyEmail();
    initArtModal();

    // 3. Initialize Aesthetics
    updateRomanYear();
});

/* ==========================================================================
   3. LANGUAGE SWITCHER LOGIC
   ========================================================================== */

function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll(".lang-btn");

    langBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            if (lang === currentLanguage) return;

            // Update State
            currentLanguage = lang;

            // Update UI Buttons
            langBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // Execute Translation
            applyTranslations(lang);
        });
    });
}

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    // 1. Text Content ([data-i18n])
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) el.innerHTML = t[key];
    });

    // 2. HTML Content ([data-i18n-html])
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const key = el.getAttribute("data-i18n-html");
        if (t[key]) el.innerHTML = t[key];
    });

    // 3. Attributes (Tooltips, Data-Attrs)
    const quoteEl = document.querySelector(".footer-quote");
    if (quoteEl && t.quoteMeaning) {
        quoteEl.setAttribute("data-meaning", t.quoteMeaning);
    }

    const copyBtn = document.querySelector(".copy-email");
    if (copyBtn && t.copyLabel) {
        copyBtn.setAttribute("aria-label", t.copyLabel);
        copyBtn.setAttribute("title", t.copyLabel);
    }
}

/* ==========================================================================
   4. UTILITY: COPY EMAIL
   ========================================================================== */

function initCopyEmail() {
    const copyBtn = document.querySelector(".copy-email");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = copyBtn.getAttribute("data-email");

        navigator.clipboard
            .writeText(email)
            .then(() => {
                const msg =
                    translations[currentLanguage].toastMessage ||
                    "Email copied";
                showToast(msg);
            })
            .catch(() => {
                alert(email); // Fallback
            });
    });
}

function showToast(message) {
    const toast = document.querySelector(".toast-notification");

    if (toast) {
        const toastMsg = toast.querySelector(".toast-message");
        if (toastMsg) toastMsg.innerText = message;

        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    } else {
        alert(message);
    }
}

/* ==========================================================================
   5. ART MODAL SYSTEM (Caravaggio)
   ========================================================================== */

function initArtModal() {
    const artBtn = document.querySelector(".art-button");
    const backdrop = document.querySelector(".modal-backdrop");
    const closeBtn = document.querySelector(".modal-close");

    function openModal() {
        if (backdrop) backdrop.classList.add("is-open");
    }

    function closeModal() {
        if (backdrop) backdrop.classList.remove("is-open");
    }

    if (artBtn) {
        artBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (backdrop) {
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) closeModal();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
                closeModal();
            }
        });
    }
}

/* ==========================================================================
   6. THE SCRIBE: ROMAN NUMERAL GENERATOR
   ========================================================================== */

function toRoman(num) {
    const lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let roman = "";
    for (let i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}

function updateRomanYear() {
    const year = new Date().getFullYear();
    const romanYear = toRoman(year);
    const yearEl = document.getElementById("roman-year");

    if (yearEl) {
        yearEl.innerText = romanYear;
        yearEl.setAttribute("title", `Anno Domini ${year}`);
    }
}
