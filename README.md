# Jerry Augusto | Portfolio & LinkHub (v2.0.0)

![Project Version](https://img.shields.io/badge/version-2.0.0-cfae6e?style=flat-square&labelColor=12100e)
![Tech Stack](https://img.shields.io/badge/stack-HTML5_%7C_CSS3_%7C_SVG-white?style=flat-square&labelColor=12100e)
![License](https://img.shields.io/badge/license-MIT-968e85?style=flat-square&labelColor=12100e)

> "The vocation to architect the invisible and scale the essential."

## 🎨 Overview

This project represents the **v2.0.0** release of my personal portfolio and link hub. It is a conceptual fusion of **Classical Art** and **Software Engineering**, designed to reflect my identity as a DevOps Specialist and Software Engineer.

Unlike standard minimalist portfolios, this project adopts a **"Dark Academia"** aesthetic, heavily influenced by the Baroque period and the *chiaroscuro* technique of Caravaggio, juxtaposed with the precision of modern terminal typography.

## 🏛 Design Philosophy: "The Terminal & The Canvas"

The UI/UX strategy is built upon the contrast between the chaotic beauty of human history and the structured order of code.

### 1. The Canvas (Visual Identity)
* **Theme:** *Caravaggio's "The Calling of Saint Matthew" (1599-1600)* serves as the atmospheric foundation.
* **Color Palette:** Extracted directly from the painting's pigments—Deep Espresso (`#12100e`) for the void, Parchment (`#dcd7ba`) for text, and Baroque Gold (`#cfae6e`) as the primary accent.
* **Typography:** *Cormorant Garamond* (Serif) represents the artistic/human element, used for headers and quotes.

### 2. The Terminal (Technical Identity)
* **Structure:** Clean, semantic HTML5 markup.
* **Typography:** *JetBrains Mono* (Monospace) represents the engineering/DevOps element, used for subtitles, metadata, and labels.
* **Interactivity:** High-performance CSS3 animations (no JavaScript frameworks) ensuring a lightweight and robust experience.

## ✨ Key Features (v2.0.0)

* **Atmospheric Particle System:** Pure CSS animation simulating dust motes floating in a beam of light, adding depth to the hero section.
* **The "Golden Aura" Avatar:** A custom animation for the profile picture ring that pulses slowly (8s cycle), mimicking a glowing ember or halo rather than a standard notification alert.
* **Interactive Art Indicator:** A "Glassmorphism" button featuring a feather icon. It utilizes advanced CSS sibling selectors to reveal artwork details only when the specific button area is hovered, preventing accidental triggers.
* **Cinematic Entrance:** A staggered fade-in animation sequence (`revealSlow`) that loads the header, content, and footer in a specific order.
* **Custom SVG Assets:** Hand-coded SVG icons for the social media links and a custom Favicon (Gold Feather on Dark Gradient) designed to match the browser tab aesthetic perfectly.

## 🛠 Tech Stack

* **Core:** HTML5, CSS3 (Custom Properties/Variables).
* **Styling:** Flexbox, CSS Grid, CSS Transitions/Animations, Backdrop Filter.
* **Assets:** Inline SVGs (optimized for performance), Google Fonts.
* **Version Control:** Git (Semantic Versioning).

## 🚀 Installation & Usage

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/jerryaugustodev/portfolio-v2.git](https://github.com/jerryaugustodev/portfolio-v2.git)
    ```

2.  **Navigate to the directory:**
    ```bash
    cd portfolio-v2
    ```

3.  **Open in Browser:**
    Simply open the `index.html` file in your preferred web browser. No build step or node_modules required.

## 📂 Project Structure

```text
.
├── index.html        # Main semantic structure
├── style.css         # All styles, variables, and animations
├── favicon.svg       # Custom vector icon (Feather)
└── hero-alt.png      # Background artwork (Caravaggio)
