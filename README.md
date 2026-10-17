# InstaLab — Explore Science by Doing

A free, static, GitHub Pages–ready science learning website for Kannada and English learners.

**Live features:** Home dashboard with real counts, 5 working physics simulations, quiz engine with preview, Marie Curie scientist profile, three language modes (English / ಕನ್ನಡ / Both), localStorage progress with clear option.

**Honest scope:** Sections not yet built show a visible "Coming soon" badge and are not clickable as if working. All simulations state their model assumptions. Counts are read from data files — never typed by hand.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Single-page app shell; all sections |
| `styles.css` | Mobile-first accessible styling |
| `app.js` | Vanilla JS: routing, i18n, simulations, quiz, storage |
| `instalab-logo.png` | Logo (see note below) |
| `README.md` | This file |

---

## Running locally

Because the app uses ES-module-free plain `<script>` tags, you can open `index.html` directly. For a closer match to GitHub Pages, serve it:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
