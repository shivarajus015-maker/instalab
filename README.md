# InstaLab — Interactive Science Learning Platform

> Documentation-driven implementation package based on the InstaLab professional documentation set. This repository is a static GitHub Pages application; features that require a server, API key, account system, or database are identified as future integrations rather than falsely presented as active.

## What is included
- `index.html` — accessible, responsive application shell and section navigation.
- `styles.css` — responsive visual system and components.
- `app.js` — bilingual content, search/filtering, science explorer, working speed lab, quiz, project cards, scientist directory, observation notes, graph and CSV export.
- `instalab-logo.png` — original generated InstaLab mark.
- `README.md` — setup and deployment guide.

## Run locally
Open `index.html` in a modern browser. No build step or package installation is required. For best testing, use a local static server or GitHub Pages.

## GitHub Pages deployment
1. Upload these five files to the repository root (`README.md`, `app.js`, `index.html`, `instalab-logo.png`, `styles.css`).
2. Keep filenames exactly as shown; `index.html` loads `styles.css` and `app.js` from the same folder.
3. In GitHub, open **Settings → Pages**, select the `main` branch and `/ (root)`, and save if Pages is not already configured.
4. Wait for deployment, then open `https://shivarajus015-maker.github.io/instalab/` and hard-refresh the page.
5. Test on a phone and desktop, and check the browser console for errors.

## Current working features
- Kannada / English language toggle (the included interface strings and sample records switch; not every future curriculum record is translated yet).
- Search and subject filters for learning resources.
- Interactive speed experiment with live calculations and explanatory feedback.
- Quiz with scoring and feedback.
- Sample scientist profiles and science project ideas.
- Add observation rows, draw a simple graph, and export observations as CSV.
- Links to external learning resources (availability and content are controlled by their publishers).

## Documentation alignment
The companion 217-page planning package is organized around vision/BRD, PRD, architecture, UI/UX, content structure, virtual labs, quizzes, knowledge library, scientists, projects, curriculum mapping, bilingual terminology, QA, privacy/security, GitHub Pages deployment, AI coding prompts, and launch readiness. This starter implementation reflects those priorities in a static client-side form. It is not a claim that every specification has already been implemented.

## Not implemented / needs a later phase
- User accounts, secure login, cloud sync, teacher dashboards and persistent cross-device progress.
- AI chat/API calls, real-time news feeds, managed video/PDF catalogue, server-side analytics.
- Full curriculum coverage and verified mapping for every class/board/topic.
- Full multi-language translation of all lesson content.
- Advanced physics/chemistry/biology simulations beyond the sample experiment.

These need separately designed, tested integrations and, where relevant, secure backend services. Never put private API keys in `app.js` or any file deployed to GitHub Pages.

## Quality checklist
- [ ] Confirm all five filenames are in repository root.
- [ ] Confirm the page loads without 404s for `styles.css`, `app.js`, and logo.
- [ ] Test language toggle, search, filters, lab controls, quiz, observation graph and CSV download.
- [ ] Check keyboard navigation, visible focus, contrast and small-screen layout.
- [ ] Review scientific accuracy and curriculum mapping with a qualified teacher before classroom use.
- [ ] Add privacy notice and guardian/teacher review before collecting student data.

## Ownership and safety
This is an educational prototype. Experiments are simulations, not laboratory safety instructions. Follow teacher supervision and local safety rules for physical experiments.
