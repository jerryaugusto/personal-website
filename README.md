# Jerry Augusto | Personal Digital Portfolio

![Project Status](https://img.shields.io/badge/status-stable-success?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Tech Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-E3B505?style=flat-square)

> "Reject the generic that hides your project's true identity. Embrace the absolute distinction of hand-forged code."

A bespoke personal website and link aggregator engineered with precision. This project rejects the bloat of modern frameworks in favor of a high-performance, handcrafted architecture that blends the **"Gothic Cathedral"** aesthetic with state-of-the-art web standards.

---

## 🏛️ Project Philosophy

This repository represents the **Scriptorium Design System v3.1**, a philosophy that values:
* **Intrinsic Fluidity:** Layouts that breathe with the device using mathematical scaling rather than abrupt breakpoints.
* **Code as Craft:** Zero external dependencies or frameworks. Every interaction is calculated in Vanilla JavaScript.
* **Aesthetic Hylomorphism:** A visual language combining "Dark Academia" textures (marble dust, chiaroscuro) with modern UI utility.

## ✨ Key Features

### 1. Fluid Architecture
* **Dynamic Viewports:** Utilizes `100dvh` for mobile headers, eliminating layout shifts caused by browser interface bars.
* **Mathematical Typography:** Implements `clamp()` functions to scale text size organically from mobile (320px) to ultra-wide monitors.
* **Touch-First UX:** Optimized touch targets (minimum 44px) and tactile feedback (`:active` states) for a native-app feel on the web.

### 2. Native Internationalization (i18n)
* A custom, lightweight JavaScript engine detects the user's browser language (`navigator.language`) and serves content in **English (EN)** or **Portuguese (PT)** automatically.
* Includes manual overrides via a persistent local storage preference.
* Translates not just text, but accessibility attributes (`aria-label`, tooltips) dynamically.

### 3. Atmospheric Design
* **The "Gothic Cathedral" Palette:** A sophisticated gradient system (Antique Gold -> Deep Crimson -> Midnight Blue) used for avatars and accents.
* **Performance-First Animations:** GPU-accelerated transitions (Composite Layers only) for particles and hover effects.
* **Interactive Art:** Features a deep-dive modal into Caravaggio's *"The Calling of Saint Matthew"*, bridging classical art with digital interaction.

## 🛠️ Technical Stack

* **Markup:** Semantic HTML5 with rigorous Accessibility (a11y) standards.
* **Styling:** Modern CSS3 (Variables, Fluid Typography, Flexbox/Grid Hybrids, Backdrop Filters).
* **Scripting:** Vanilla JavaScript (ES6+) focusing on modular logic (i18n, Clipboard API, Intersection Observers).

## 🚀 Getting Started

Since this project relies on no build steps or bundlers, it is incredibly easy to deploy or test.

### Prerequisites
* A modern web browser (Chrome, Firefox, Safari, Edge).
* A simple local server (e.g., Live Server for VS Code) is recommended to properly test JSON/Module loading if extended in the future.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jerryaugusto/personal-website

# 2. Navigate to the directory
cd personal-website

# 3. Open index.html in your browser
# (Or right-click index.html -> "Open with Live Server" in VS Code)
```

## 🎨 Design Tokens (Snapshot)

| Category | Variable | Value/Logic |
| :--- | :--- | :--- |
| **Primary Accent** | `--accent-main` | `#E3B505` (Bright Gold) |
| **Background** | `--bg-body` | `#1C1917` (Dark Stone) |
| **Typography** | `--font-serif` | *EB Garamond* |
| **Typography** | `--font-mono` | *JetBrains Mono* |
| **Fluid Scale** | `clamp()` | Linear interpolation based on `vw` |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
    <strong>Forged by Jerry Augusto</strong><br>
    <i>"Age Quod Debes."</i>
</div>
