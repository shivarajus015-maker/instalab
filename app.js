/* InstaLab — app.js
 * Static vanilla JS. No frameworks. Relative paths only.
 * Honesty: only real data is shown; counts are derived from DATA, never typed.
 * Language switching re-renders text nodes only; simulation state lives in window.simState.
 */
'use strict';

/* ============================================================
 * 1. LANGUAGE DICTIONARY  (single source of truth)
 * ============================================================ */
const LANG = {
  en: {
    skipLink: "Skip to content",
    tagline: "Explore Science by Doing",
    navHome: "Home", navLab: "Virtual Lab", navEquipment: "Equipment",
    navScientists: "Scientists", navLibrary: "Knowledge Library",
    navQuiz: "Quiz", navProjects: "Projects",
    heroTitle: "Explore, Experiment, and Understand Science!",
    heroTitleKn: "ವಿಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ, ಪ್ರಯೋಗಿಸಿ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ!",
    heroDesc: "Interactive simulations, verified knowledge, and hands-on projects for curious learners.",
    btnExplore: "Explore InstaLab", btnLab: "Open Virtual Lab", btnLearn: "Start Learning",
    searchLabel: "Search", searchPlaceholder: "Search topics, simulations, scientists…",
    categoriesTitle: "Explore by Category",
    tryTitle: "Try It Today",
    factTitle: "Did You Know?",
    quizPreviewTitle: "Quiz Preview",
    countsTitle: "InstaLab at a Glance",
    countsNote: "Counts are read directly from the data files below — never typed by hand.",
    aboutTitle: "About InstaLab",
    aboutText: "InstaLab is a free science learning platform for Kannada and English learners. It offers interactive simulations, verified facts, quizzes and safe hands-on projects. All simulations use simplified models and are not real laboratory data.",
    labTitle: "Virtual Science Lab",
    simNotice: "All simulations use simplified models for learning. They are not real laboratory data.",
    equipmentTitle: "Science Equipment",
    equipmentIntro: "Explore lab equipment. Detailed guides and virtual instruments are being added.",
    scientistsTitle: "Scientists Directory",
    libraryTitle: "Science Knowledge Library",
    libraryIntro: "Topic guides with definitions, examples, formulae and knowledge checks. Detailed content is being added.",
    quizTitle: "Science Quiz",
    projectsTitle: "Science Projects & Hands-on Activities",
    projectsIntro: "Safe, guided projects. Adult supervision where noted. Detailed project pages are being added.",
    footerNote: "Simulations use simplified models for learning and are not real lab data.",
    localNote: "Progress is saved on this browser and device only.",
    clearData: "Clear all local data",
    comingSoon: "Coming soon",
    planned: "Planned",
    ready: "Ready",
    noResults: "No results found.",
    counts_sim: "Working simulations",
    counts_sci: "Scientists",
    counts_quiz: "Quiz questions",
    counts_eq: "Equipment items",
    physics: "Physics", chemistry: "Chemistry", biology: "Biology", earth: "Earth & Space",
    physicsDesc: "Motion, forces, light, electricity and more.",
    chemistryDesc: "Atoms, reactions, pH and separation methods.",
    biologyDesc: "Cells, body systems, genetics and ecosystems.",
    earthDesc: "Planets, seasons, eclipses and Earth's layers.",
    start: "Start", pause: "Pause", resume: "Resume", reset: "Reset", help: "Help",
    record: "Record reading", clearTable: "Clear table", back: "Back to lab",
    objective: "Learning objective", principle: "Scientific principle",
    equipmentUsed: "Equipment", simulation: "Interactive simulation",
    controls: "Controls & live readings", formula: "Formula",
    observation: "Observation table", graph: "Graph (from recorded data)",
    conclusion: "Conclusion", safety: "Safety note", quizShort: "Short quiz",
    assumptions: "Model assumptions",
    noRecords: "No readings recorded yet. Adjust the sliders and press Record.",
    recordAdded: "Reading recorded.",
    clearConfirm: "Clear ALL local data (progress, drafts, quiz history)? This cannot be undone.",
    cleared: "Local data cleared.",
    resetConfirm: "Reset simulation to start values?",
    noSims: "No simulations available yet.",
    quizIntro: "Answer the questions below. Your best score is stored on this browser only.",
    submit: "Submit answers", nextQ: "Next", question: "Question",
    correct: "Correct", incorrect: "Incorrect", explanation: "Explanation",
    score: "Score", clearHistory: "Clear quiz history",
    eqComing: "Equipment library is being built. Check back soon.",
    sciComing: "Detailed scientist profiles are being added. Marie Curie is available now.",
    libComing: "Knowledge library topics are being written.",
    projComing: "Project guides are being written."
  },
  kn: {
    skipLink: "ವಿಷಯಕ್ಕೆ ಹೋಗಿ",
    tagline: "ಮಾಡುವ ಮೂಲಕ ವಿಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ",
    navHome: "ಮುಖಪುಟ", navLab: "ವರ್ಚುವಲ್ ಪ್ರಯೋಗಾಲಯ", navEquipment: "ಉಪಕರಣಗಳು",
    navScientists: "ವಿಜ್ಞಾನಿಗಳು", navLibrary: "ಜ್ಞಾನ ಗ್ರಂಥಾಲಯ",
    navQuiz: "ರಸಪ್ರಶ್ನೆ", navProjects: "ಯೋಜನೆಗಳು",
    heroTitle: "ಅನ್ವೇಷಿಸಿ, ಪ್ರಯೋಗಿಸಿ ಮತ್ತು ವಿಜ್ಞಾನವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ!",
    heroTitleKn: "ಅನ್ವೇಷಿಸಿ, ಪ್ರಯೋಗಿಸಿ ಮತ್ತು ವಿಜ್ಞಾನವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ!",
    heroDesc: "ಕುತೂಹಲಿ ಕಲಿಯುವವರಿಗೆ ಸಂವಾದಾತ್ಮಕ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು, ಪರಿಶೀಲಿಸಿದ ಜ್ಞಾನ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಯೋಜನೆಗಳು.",
    btnExplore: "InstaLab ಅನ್ವೇಷಿಸಿ", btnLab: "ಪ್ರಯೋಗಾಲಯ ತೆರೆಯಿರಿ", btnLearn: "ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ",
    searchLabel: "ಹುಡುಕಿ", searchPlaceholder: "ವಿಷಯಗಳು, ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು, ವಿಜ್ಞಾನಿಗಳನ್ನು ಹುಡುಕಿ…",
    categoriesTitle: "ವರ್ಗದ ಮೂಲಕ ಅನ್ವೇಷಿಸಿ",
    tryTitle: "ಇಂದು ಪ್ರಯತ್ನಿಸಿ",
    factTitle: "ನಿಮಗೆ ಗೊತ್ತೇ?",
    quizPreviewTitle: "ರಸಪ್ರಶ್ನೆ ಮುನ್ನೋಟ",
    countsTitle: "ಒಂದು ನೋಟದಲ್ಲಿ InstaLab",
    countsNote: "ಎಣಿಕೆಗಳನ್ನು ಡೇಟಾ ಫೈಲ್‌ಗಳಿಂದ ನೇರವಾಗಿ ಓದಲಾಗುತ್ತದೆ — ಕೈಯಿಂದ ಟೈಪ್ ಮಾಡಿಲ್ಲ.",
    aboutTitle: "InstaLab ಬಗ್ಗೆ",
    aboutText: "InstaLab ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಕಲಿಯುವವರಿಗೆ ಉಚಿತ ವಿಜ್ಞಾನ ಕಲಿಕಾ ವೇದಿಕೆ. ಇದು ಸಂವಾದಾತ್ಮಕ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು, ಪರಿಶೀಲಿಸಿದ ಸಂಗತಿಗಳು, ರಸಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಸುರಕ್ಷಿತ ಪ್ರಾಯೋಗಿಕ ಯೋಜನೆಗಳನ್ನು ನೀಡುತ್ತದೆ. ಎಲ್ಲಾ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು ಸರಳೀಕೃತ ಮಾದರಿಗಳನ್ನು ಬಳಸುತ್ತವೆ ಮತ್ತು ನಿಜವಾದ ಪ್ರಯೋಗಾಲಯ ಡೇಟಾ ಅಲ್ಲ.",
    labTitle: "ವರ್ಚುವಲ್ ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯ",
    simNotice: "ಎಲ್ಲಾ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು ಕಲಿಕೆಗಾಗಿ ಸರಳೀಕೃತ ಮಾದರಿಗಳನ್ನು ಬಳಸುತ್ತವೆ. ಅವು ನಿಜವಾದ ಪ್ರಯೋಗಾಲಯ ಡೇಟಾ ಅಲ್ಲ.",
    equipmentTitle: "ವಿಜ್ಞಾನ ಉಪಕರಣಗಳು",
    equipmentIntro: "ಪ್ರಯೋಗಾಲಯ ಉಪಕರಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ವಿವರವಾದ ಮಾರ್ಗದರ್ಶಿಗಳು ಸೇರಿಸಲಾಗುತ್ತಿದೆ.",
    scientistsTitle: "ವಿಜ್ಞಾನಿಗಳ ಕೋಶ",
    libraryTitle: "ವಿಜ್ಞಾನ ಜ್ಞಾನ ಗ್ರಂಥಾಲಯ",
    libraryIntro: "ವ್ಯಾಖ್ಯಾನಗಳು, ಉದಾಹರಣೆಗಳು, ಸೂತ್ರಗಳು ಮತ್ತು ಜ್ಞಾನ ಪರೀಕ್ಷೆಗಳೊಂದಿಗೆ ವಿಷಯ ಮಾರ್ಗದರ್ಶಿಗಳು. ವಿವರವಾದ ವಿಷಯ ಸೇರಿಸಲಾಗುತ್ತಿದೆ.",
    quizTitle: "ವಿಜ್ಞಾನ ರಸಪ್ರಶ್ನೆ",
    projectsTitle: "ವಿಜ್ಞಾನ ಯೋಜನೆಗಳು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಚಟುವಟಿಕೆಗಳು",
    projectsIntro: "ಸುರಕ್ಷಿತ ಮಾರ್ಗದರ್ಶಿ ಯೋಜನೆಗಳು. ಅಗತ್ಯವಿದ್ದಲ್ಲಿ ವಯಸ್ಕರ ಮೇಲ್ವಿಚಾರಣೆ. ವಿವರವಾದ ಯೋಜನೆ ಪುಟಗಳು ಸೇರಿಸಲಾಗುತ್ತಿದೆ.",
    footerNote: "ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು ಕಲಿಕೆಗಾಗಿ ಸರಳೀಕೃತ ಮಾದರಿಗಳನ್ನು ಬಳಸುತ್ತವೆ ಮತ್ತು ನಿಜವಾದ ಪ್ರಯೋಗಾಲಯ ಡೇಟಾ ಅಲ್ಲ.",
    localNote: "ಪ್ರಗತಿಯನ್ನು ಈ ಬ್ರೌಸರ್ ಮತ್ತು ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾಗುತ್ತದೆ.",
    clearData: "ಎಲ್ಲಾ ಸ್ಥಳೀಯ ಡೇಟಾ ಅಳಿಸಿ",
    comingSoon: "ಶೀಘ್ರದಲ್ಲೇ",
    planned: "ಯೋಜಿತ",
    ready: "ಸಿದ್ಧ",
    noResults: "ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    counts_sim: "ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು",
    counts_sci: "ವಿಜ್ಞಾನಿಗಳು",
    counts_quiz: "ರಸಪ್ರಶ್ನೆ ಪ್ರಶ್ನೆಗಳು",
    counts_eq: "ಉಪಕರಣ ವಸ್ತುಗಳು",
    physics: "ಭೌತಶಾಸ್ತ್ರ", chemistry: "ರಸಾಯನಶಾಸ್ತ್ರ", biology: "ಜೀವಶಾಸ್ತ್ರ",
    earth: "ಭೂಮಿ ಮತ್ತು ಬಾಹ್ಯಾಕಾಶ",
    physicsDesc: "ಚಲನೆ, ಬಲಗಳು, ಬೆಳಕು, ವಿದ್ಯುತ್ ಮತ್ತು ಇನ್ನಷ್ಟು.",
    chemistryDesc: "ಪರಮಾಣುಗಳು, ಪ್ರತಿಕ್ರಿಯೆಗಳು, pH ಮತ್ತು ಬೇರ್ಪಡಿಸುವ ವಿಧಾನಗಳು.",
    biologyDesc: "ಜೀವಕೋಶಗಳು, ದೇಹ ವ್ಯವಸ್ಥೆಗಳು, ಆನುವಂಶಿಕತೆ ಮತ್ತು ಪರಿಸರ ವ್ಯವಸ್ಥೆಗಳು.",
    earthDesc: "ಗ್ರಹಗಳು, ಋತುಗಳು, ಗ್ರಹಣಗಳು ಮತ್ತು ಭೂಮಿಯ ಪದರಗಳು.",
    start: "ಪ್ರಾರಂಭ", pause: "ವಿರಾಮ", resume: "ಮುಂದುವರಿಸಿ", reset: "ಮರುಹೊಂದಿಸಿ", help: "ಸಹಾಯ",
    record: "ಓದುವಿಕೆ ದಾಖಲಿಸಿ", clearTable: "ಕೋಷ್ಟಕ ಅಳಿಸಿ", back: "ಪ್ರಯೋಗಾಲಯಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    objective: "ಕಲಿಕಾ ಉದ್ದೇಶ", principle: "ವೈಜ್ಞಾನಿಕ ತತ್ವ",
    equipmentUsed: "ಉಪಕರಣಗಳು", simulation: "ಸಂವಾದಾತ್ಮಕ ಸಿಮ್ಯುಲೇಶನ್",
    controls: "ನಿಯಂತ್ರಣಗಳು ಮತ್ತು ನೇರ ಓದುವಿಕೆಗಳು", formula: "ಸೂತ್ರ",
    observation: "ವೀಕ್ಷಣಾ ಕೋಷ್ಟಕ", graph: "ಗ್ರಾಫ್ (ದಾಖಲಾದ ಡೇಟಾದಿಂದ)",
    conclusion: "ತೀರ್ಮಾನ", safety: "ಸುರಕ್ಷತಾ ಸೂಚನೆ", quizShort: "ಸಣ್ಣ ರಸಪ್ರಶ್ನೆ",
    assumptions: "ಮಾದರಿ ಊಹೆಗಳು",
    noRecords: "ಇನ್ನೂ ಯಾವುದೇ ಓದುವಿಕೆ ದಾಖಲಾಗಿಲ್ಲ. ಸ್ಲೈಡರ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಿ ಮತ್ತು ದಾಖಲಿಸಿ ಒತ್ತಿರಿ.",
    recordAdded: "ಓದುವಿಕೆ ದಾಖಲಾಗಿದೆ.",
    clearConfirm: "ಎಲ್ಲಾ ಸ್ಥಳೀಯ ಡೇಟಾ ಅಳಿಸುವುದೇ (ಪ್ರಗತಿ, ಕರಡುಗಳು, ರಸಪ್ರಶ್ನೆ ಇತಿಹಾಸ)? ಇದನ್ನು ರದ್ದುಗೊಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    cleared: "ಸ್ಥಳೀಯ ಡೇಟಾ ಅಳಿಸಲಾಗಿದೆ.",
    resetConfirm: "ಸಿಮ್ಯುಲೇಶನ್ ಅನ್ನು ಪ್ರಾರಂಭ ಮೌಲ್ಯಗಳಿಗೆ ಮರುಹೊಂದಿಸುವುದೇ?",
    noSims: "ಇನ್ನೂ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳಿಲ್ಲ.",
    quizIntro: "ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ. ನಿಮ್ಮ ಅತ್ಯುತ್ತಮ ಅಂಕವನ್ನು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ.",
    submit: "ಉತ್ತರಗಳನ್ನು ಸಲ್ಲಿಸಿ", nextQ: "ಮುಂದೆ", question: "ಪ್ರಶ್ನೆ",
    correct: "ಸರಿ", incorrect: "ತಪ್ಪು", explanation: "ವಿವರಣೆ",
    score: "ಅಂಕ", clearHistory: "ರಸಪ್ರಶ್ನೆ ಇತಿಹಾಸ ಅಳಿಸಿ",
    eqComing: "ಉಪಕರಣ ಗ್ರಂಥಾಲಯವನ್ನು ನಿರ್ಮಿಸಲಾಗುತ್ತಿದೆ. ಶೀಘ್ರದಲ್ಲೇ ಪರಿಶೀಲಿಸಿ.",
    sciComing: "ವಿವರವಾದ ವಿಜ್ಞಾನಿ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ಸೇರಿಸಲಾಗುತ್ತಿದೆ. ಮೇರಿ ಕ್ಯೂರಿ ಈಗ ಲಭ್ಯವಿದೆ.",
    libComing: "ಜ್ಞಾನ ಗ್ರಂಥಾಲಯದ ವಿಷಯಗಳನ್ನು ಬರೆಯಲಾಗುತ್ತಿದೆ.",
    projComing: "ಯೋಜನೆ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಬರೆಯಲಾಗುತ್ತಿದೆ."
  }
};

let currentLang = 'en';
window.simState = window.simState || {};

function t(key) { return (LANG[currentLang] && LANG[currentLang][key]) || LANG.en[key] || key; }

/* ============================================================
 * 2. SAFE STORAGE
 * ============================================================ */
const Storage = {
  available: (() => { try { localStorage.setItem('__t','1'); localStorage.removeItem('__t'); return true; } catch (e) { return false; } })(),
  get(k, fb) { if (!this.available) return fb; try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
  set(k, v) { if (!this.available) return false; try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  remove(k) { if (this.available) localStorage.removeItem(k); }
};

/* ============================================================
 * 3. DATA  (honest: only verified facts; counts derived from here)
 * ============================================================ */
const DATA = {
  categories: [
    { id: 'physics', i18n: 'physics', descI18n: 'physicsDesc', icon: '⚛' },
    { id: 'chemistry', i18n: 'chemistry', descI18n: 'chemistryDesc', icon: '🧪' },
    { id: 'biology', i18n: 'biology', descI18n: 'biologyDesc', icon: '🌱' },
    { id: 'earth', i18n: 'earth', descI18n: 'earthDesc', icon: '🌍' }
  ],

  simulations: [
    {
      id: 'motion-speed', titleEn: 'Motion and Speed', titleKn: 'ಚಲನೆ ಮತ್ತು ವೇಗ',
      subject: 'physics', status: 'ready',
      objective: 'Understand how distance, speed and time relate under constant acceleration.',
      principle: 'An object moving with constant acceleration covers distance s = u·t + ½·a·t². Its speed at time t is v = u + a·t.',
      equipment: ['Stopwatch', 'Measuring tape'],
      formula: 'v = u + a·t   |   s = u·t + ½·a·t²',
      assumptions: 'Constant acceleration, no air resistance, straight-line motion.',
      safety: 'Simplified model. No physical experiment performed.',
      conclusion: 'Speed grows linearly with time; distance grows with the square of time.',
      inputs: [
        { id: 'u', label: 'Initial speed u (m/s)', min: 0, max: 20, step: 0.1, value: 0 },
        { id: 'a', label: 'Acceleration a (m/s²)', min: -5, max: 10, step: 0.1, value: 2 },
        { id: 't', label: 'Time t (s)', min: 0, max: 20, step: 0.1, value: 5 }
      ],
      compute: (v) => {
        const speed = v.u + v.a * v.t;
        const dist = v.u * v.t + 0.5 * v.a * v.t * v.t;
        return { speed: speed.toFixed(2) + ' m/s', distance: dist.toFixed(2) + ' m' };
      },
      graphX: (v) => v.t, graphY: (v) => v.u * v.t + 0.5 * v.a * v.t * v.t
    },
    {
      id: 'force-friction', titleEn: 'Force and Friction', titleKn: 'ಬಲ ಮತ್ತು ಘರ್ಷಣೆ',
      subject: 'physics', status: 'ready',
      objective: 'Explore how applied force, mass and friction interact on a flat surface.',
      principle: "Newton's second law: F = m·a. Friction force Ff = μ·N. On a flat surface N ≈ m·g.",
      equipment: ['Spring balance', 'Weights'],
      formula: 'F = m·a   |   Ff = μ·N   |   N = m·g',
      assumptions: 'Flat surface, g = 9.8 m/s², kinetic friction constant.',
      safety: 'Simplified model. No physical experiment performed.',
      conclusion: 'The object accelerates only when applied force exceeds friction.',
      inputs: [
        { id: 'm', label: 'Mass m (kg)', min: 0.5, max: 20, step: 0.5, value: 5 },
        { id: 'mu', label: 'Friction coefficient μ', min: 0, max: 1, step: 0.05, value: 0.3 },
        { id: 'F', label: 'Applied force F (N)', min: 0, max: 200, step: 1, value: 30 }
      ],
      compute: (v) => {
        const g = 9.8;
        const N = v.m * g;
        const Ff = v.mu * N;
        const net = v.F - Ff;
        const acc = v.m > 0 ? net / v.m : 0;
        return { normal: N.toFixed(1) + ' N', friction: Ff.toFixed(1) + ' N', net: net.toFixed(1) + ' N', acceleration: acc.toFixed(2) + ' m/s²' };
      },
      graphX: (v) => v.F, graphY: (v) => (v.F - v.mu * v.m * 9.8) / (v.m || 1)
    },
    {
      id: 'electric-circuit', titleEn: 'Simple Electric Circuit', titleKn: 'ಸರಳ ವಿದ್ಯುತ್ ಮಂಡಲ',
      subject: 'physics', status: 'ready',
      objective: "Apply Ohm's law to find current in a simple series circuit.",
      principle: "Ohm's law: V = I·R. Current is voltage divided by resistance.",
      equipment: ['Battery', 'Resistor', 'Ammeter'],
      formula: 'V = I·R   →   I = V / R',
      assumptions: 'Ideal battery (no internal resistance), constant resistance, steady state.',
      safety: 'Simplified model. Real electrical work requires supervision.',
      conclusion: 'Current increases linearly with voltage and decreases with resistance.',
      inputs: [
        { id: 'V', label: 'Voltage V (V)', min: 0.5, max: 24, step: 0.5, value: 9 },
        { id: 'R', label: 'Resistance R (Ω)', min: 1, max: 1000, step: 1, value: 100 }
      ],
      compute: (v) => {
        const I = v.R > 0 ? v.V / v.R : 0;
        const P = v.V * I;
        return { current: I.toFixed(3) + ' A', power: P.toFixed(2) + ' W' };
      },
      graphX: (v) => v.R, graphY: (v) => v.V / (v.R || 1)
    },
    {
      id: 'density-buoyancy', titleEn: 'Density and Buoyancy', titleKn: 'ಸಾಂದ್ರತೆ ಮತ್ತು ತೇಲುವಿಕೆ',
      subject: 'physics', status: 'ready',
      objective: "Calculate density and compare with water's to predict floating.",
      principle: "Density ρ = m / V. An object floats if its density is less than water's (≈ 1000 kg/m³ ≈ 1 g/cm³).",
      equipment: ['Measuring cylinder', 'Balance'],
      formula: 'ρ = m / V',
      assumptions: 'Uniform object, water density = 1 g/cm³, no surface-tension effects.',
      safety: 'Simplified model.',
      conclusion: 'Objects denser than water
