# InstaLab (ಇನ್‌ಸ್ಟಾಲ್ಯಾಬ್)
> **"Explore Science by Doing" (ಪ್ರಯೋಗಗಳ ಮೂಲಕ ವಿಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ)**

[![GitHub Pages](https://img.shields.io/badge/deployment-GitHub%20Pages-brightgreen)](https://shivarajus015-maker.github.io/instalab/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/Language-Kannada%20%7C%20English%20%7C%20Both-orange)](#language-system)
[![Textbooks](https://img.shields.io/badge/Textbooks-Excluded-red)](#non-negotiable-rules)

**InstaLab** is an open-access, static, client-side scientific learning platform built to provide hands-on, inquiry-driven science education in **Kannada**, **English**, and **Bilingual (Both)** modes.

* **Live Site:** [https://shivarajus015-maker.github.io/instalab/](https://shivarajus015-maker.github.io/instalab/)
* **Repository:** [https://github.com/shivarajus015-maker/instalab](https://github.com/shivarajus015-maker/instalab)

---

## 🧭 Core Principles & Non-Negotiable Rules

1. **Strictly Zero Textbooks:**
   * No textbook PDFs, download links, NCERT/KTBS copies, or "Official textbook" tags.
   * Only supplementary worksheets, empirical observation sheets, and verified reference data are hosted.
2. **Trilingual System (`kn`, `en`, `both`):**
   * Driven by a single unified language engine.
   * Switching languages **never** resets an active simulation, slider, timer, or draft (state is preserved in `window.simState`).
   * Formulas, chemical symbols, and SI units remain strictly standardized in all modes.
3. **Scientific Honesty & Real Metrics:**
   * No fake counts, inflated ratings, or artificial user numbers. All dashboard counters read directly from the dataset arrays.
   * Every simulation explicitly states its **mathematical model assumptions** (e.g., ideal frictionless planes, standard atmospheric conditions). Simulations are never presented as real physical lab data.
4. **Safety First:**
   * No dangerous experiments or instructions to mix unknown household chemicals.
   * Explicit warnings never to view the Sun directly and to ensure adult supervision for heating and electrical circuits.
5. **Client-Side Privacy:**
   * No backend and no database required. All user drafts, quiz scores, and observation logs reside exclusively in browser `localStorage`.
6. **Zero Frameworks / Fast GitHub Pages Deployment:**
   * Pure HTML5, semantic CSS3, and vanilla JavaScript.
   * Zero external dependencies, no heavy build pipelines, relative paths only, and zero API keys in source code.

---

## 🗺️ Site Map (13 Sections)

| # | Section | Status | Description |
|---|---|---|---|
| 1 | **Home / Dashboard** | ✅ Live | 11-block entry dashboard with live search, dynamic counts, and 3 working simulations. |
| 2 | **Virtual Science Lab** | 🚀 In Progress (Phase C) | 36 planned interactive simulations with 12-part standard layouts, live recording, and empirical plotting. |
| 3 | **Science Equipment** | ⏳ Planned (Phase D) | 62 items (Physics 20, Chem 20, Bio 12, Earth 10) + 6 virtual instruments. |
| 4 | **Scientists Directory** | ⏳ Planned (Phase E) | 10 starter profiles with 16 fields, verified sources (Nobel, NASA, Britannica), and quizzes. |
| 5 | **Science Knowledge Library** | ⏳ Planned (Phase E) | 115 planned topics (15 starter topics) with 3 reading levels and 7 comparison tools. |
| 6 | **Science Videos** | ⏳ Planned (Phase F) | 15 verified educational video embeds (ISRO, NASA, Khan Academy) with study prompts. |
| 7 | **Documents & Worksheets** | ✅ Live Preview | 15 supplementary reference sheets, safety rules, and observation templates. |
| 8 | **Science Quiz Engine** | ✅ Live Preview | 100 question bank, 4 testing modes (Practice, Timed, Exam, Daily), and instant feedback. |
| 9 | **Projects & Activities** | ⏳ Planned (Phase F) | 12 safe home/school hands-on projects with progress tracking and report generators. |
| 10 | **Science News** | ⏳ Planned (Phase G) | Curated, verified science summaries with source citations. |
| 11 | **AI Science Tutor** | ⏳ Planned (Phase G) | Offline Socratic problem solver (no fake AI claims, pure rule-based assistance). |
| 12 | **Science Community** | ⏳ Planned (Phase G) | Client-side local draft board and collaborative group planner. |
| 13 | **Career Guidance** | ⏳ Planned (Phase H) | 54 science careers, 10 education roadmaps, and verified entrance exam guides. |

---

## 🔬 Virtual Lab: Standard 12-Part Experiment Architecture

Each experiment in the Virtual Science Lab strictly adheres to the standard 12-part educational structure:

1. **Title:** Bilingual title and subject categorization.
2. **Learning Objective:** Clear conceptual goals.
3. **Scientific Principle:** Theoretical explanation and scientific laws.
4. **Equipment:** Complete list of laboratory apparatus.
5. **Interactive Simulation:** HTML5 Canvas / SVG interactive model.
6. **Controls & Live Readings:** Sliders, buttons, and real-time numeric readouts.
7. **Formula with SI Units:** Standard mathematical representations and model assumptions.
8. **Observation Table:** Dynamic table recording user-generated trials.
9. **Empirical Graph:** Canvas graph plotted **strictly** from recorded rows.
10. **Conclusion:** Scientific takeaways based on recorded data.
11. **Safety Note:** Practical safety directives and supervision warnings.
12. **Concept Quiz:** Mini 3-question knowledge check.

---

## 📂 Repository File Structure

```text
instalab/
├── index.html              # Main Home Dashboard (11 blocks)
├── lab.html                # Virtual Science Lab (12-part experiments)
├── styles.css              # Master stylesheet (responsive, accessible, Kannada typography)
├── app.js                  # Home controller, i18n engine, live search, 3 working simulations
├── lab.js                  # Virtual lab simulation controller and data graph plotters
├── instalab-logo.png       # Official InstaLab brand asset
└── README.md               # Project documentation and specifications
