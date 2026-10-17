# InstaLab

**Explore Science by Doing** · **ಪ್ರಯೋಗಗಳ ಮೂಲಕ ವಿಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ**

A static, mobile-first science-learning starter built with HTML, CSS, vanilla JavaScript, and JSON. It supports Kannada, English, and Both modes; no frameworks, build step, API keys, or server-side accounts are required.

## What is available

- A dashboard with a bilingual search, four subject cards, three interactive virtual models, one verified science fact, four linked learning resources, one quiz preview, and data-driven counts.
- Three working models: Ohm’s law circuit, an illustrative pH scale, and microscope/cell explorer. Each has editable controls, live readings, an explicit model assumption, a recordable observation table, a graph drawn only from recorded rows, safety notes, and a short quiz.
- Subject filtering and a visible, non-clickable planned list. Unfinished site-map sections are labelled “Coming soon”.
- Kannada, English, and Both display modes driven by `lang.json`. The language selector updates labels without rebuilding or resetting simulations, quiz answers, or observation rows.
- Observation rows, settings, and quiz answers stored locally in the current browser. The site explains this and provides a confirmation-protected clear-data action.
- External resources open at their original source. The fact about the eight planets is linked to NASA.

## Current data counts

Counts are derived from `data.json`, not hard-coded dashboard numbers:

| Item | Current count |
|---|---:|
| Interactive simulations | 3 |
| Core experiments planned | 33 |
| Additional planned topics | 2 |
| Quiz questions | 3 |
| Curated external learning links | 4 |
| Published scientist profiles | 0 |

The 36-item core experiment plan comprises 10 Physics, 8 Chemistry, 8 Biology, and 10 Earth & Space entries (3 interactive and 33 planned). The additional planned topics are Gas Laws and Periodic Table Explorer. No scientist profiles have been published; the directory count remains zero until verified records are added.

## Files

- `index.html` — semantic dashboard and page sections.
- `styles.css` — responsive layout, focus states, and reduced-motion support.
- `app.js` — UI rendering, language switching, simulations, search, quizzes, and local persistence.
- `data.json` — stable IDs and structured science content.
- `lang.json` — the shared English/Kannada translation dictionary.
- `instalab-logo.png` — existing brand image.

All local asset and data references are relative for project-site hosting.

## Run locally

Serve this folder over HTTP so the browser can fetch the JSON files:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. The website does not require an internet connection for its local interface after files are available; linked source materials need internet access.

## Publish with GitHub Pages

1. Push the repository branch to GitHub when ready.
2. In the repository, open **Settings → Pages**.
3. Select the publishing branch and the repository root folder, then save.
4. Open the Pages URL shown by GitHub. This project uses relative paths and has not been deployed by this workspace task.

## Verified source links used

- NASA Solar System Exploration — source for the “eight planets” fact: <https://science.nasa.gov/solar-system/>
- NASA Space Place — Solar System: <https://spaceplace.nasa.gov/menu/solar-system>
- NASA GPM — Exploring the Water Cycle: <https://gpm.nasa.gov/education/lesson-plans/exploring-water-cycle>
- PhET — Circuit Construction Kit: DC: <https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html>
- PhET — Ohm’s Law: <https://phet.colorado.edu/en/simulations/ohms-law>
- PhET — pH Scale: <https://phet.colorado.edu/en/simulations/ph-scale>
- Idaho State University — microscopes: <https://www.isu.edu/biology/biolab/instructor-training/technology/microscopes/>

## Limitations

The remaining equipment library, scientist directory, knowledge library, full quiz bank, project tools, news, tutor, community features, and career guidance are not implemented. Their future work is not presented as live functionality. Current pH and cell imagery are illustrative models, not laboratory measurements or micrographs. External websites may change independently.

No commit, push, or deployment is claimed by this change.
