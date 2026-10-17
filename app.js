// app.js - InstaLab Core
const I18N = {
  brand: { en: "InstaLab", kn: "ಇನ್‌ಸ್ಟಾಲ್ಯಾಬ್" },
  tagline: { en: "Explore Science by Doing", kn: "ಪ್ರಯೋಗಗಳ ಮೂಲಕ ವಿಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ" },
  nav_lab: { en: "Virtual Lab", kn: "ವರ್ಚುವಲ್ ಲ್ಯಾಬ್" },
  nav_equipment: { en: "Equipment", kn: "ವಿಜ್ಞಾನ ಉಪಕರಣಗಳು" },
  nav_scientists: { en: "Scientists", kn: "ವಿಜ್ಞಾನಿಗಳು" },
  nav_library: { en: "Knowledge Library", kn: "ಜ್ಞಾನ ಭಂಡಾರ" },
  nav_documents: { en: "Worksheets", kn: "ಕಾರ್ಯಹಾಳೆಗಳು" },
  nav_quiz: { en: "Quiz", kn: "ರಸಪ್ರಶ್ನೆ" },
  hero_title: { en: "Explore, Experiment, and Understand Science!", kn: "ವಿಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ, ಪ್ರಯೋಗಿಸಿ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ!" },
  hero_desc: { en: "Interactive science simulations, physical principles, and open hands-on learning resources in Kannada and English.", kn: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸಂವಾದಾತ್ಮಕ ವಿಜ್ಞಾನ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು, ಭೌತಿಕ ತತ್ವಗಳು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳು." },
  btn_explore: { en: "Explore InstaLab", kn: "ಇನ್‌ಸ್ಟಾಲ್ಯಾಬ್ ಅನ್ವೇಷಿಸಿ" },
  btn_open_lab: { en: "Open Virtual Lab", kn: "ವರ್ಚುವಲ್ ಲ್ಯಾಬ್ ತೆರೆಯಿರಿ" },
  btn_start_learning: { en: "Start Learning", kn: "ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ" },
  search_placeholder: { en: "Search topics, simulations, scientists, quizzes...", kn: "ವಿಷಯಗಳು, ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು, ವಿಜ್ಞಾನಿಗಳು, ರಸಪ್ರಶ್ನೆಗಳನ್ನು ಹುಡುಕಿ..." },
  no_results: { en: "No matching scientific resources found.", kn: "ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ." },
  cat_physics: { en: "Physics", kn: "ಭೌತಶಾಸ್ತ್ರ" },
  cat_physics_desc: { en: "Mechanics, optics, electricity, magnetism, and wave phenomena.", kn: "ಚಲನಶಾಸ್ತ್ರ, ದೃಗ್ವಿಜ್ಞಾನ, ವಿದ್ಯುತ್, ಕಾಂತೀಯತೆ ಮತ್ತು ತರಂಗಗಳು." },
  cat_chemistry: { en: "Chemistry", kn: "ರಸಾಯನಶಾಸ್ತ್ರ" },
  cat_chemistry_desc: { en: "Acids, bases, chemical reactions, and molecular structures.", kn: "ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು, ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ದ್ರಾವಣಗಳು." },
  cat_biology: { en: "Biology", kn: "ಜೀವಶಾಸ್ತ್ರ" },
  cat_biology_desc: { en: "Cell biology, microscopy, human systems, and genetics.", kn: "ಕೋಶ ಜೀವಶಾಸ್ತ್ರ, ಸೂಕ್ಷ್ಮದರ್ಶಕ, ಮಾನವ ಅಂಗವ್ಯೂಹ ಮತ್ತು ತಳಿಶಾಸ್ತ್ರ." },
  cat_earth: { en: "Earth Science & Space", kn: "ಭೂ ಮತ್ತು ಬಾಹ್ಯಾಕಾಶ ವಿಜ್ಞಾನ" },
  cat_earth_desc: { en: "Solar system dynamics, eclipses, earth layers, and the water cycle.", kn: "ಸೌರವ್ಯೂಹ, ಗ್ರಹಣಗಳು, ಭೂಮಿಯ ಪದರಗಳು ಮತ್ತು ಜಲಚಕ್ರ." },
  try_today_heading: { en: "Try It Today", kn: "ಇಂದೇ ಪ್ರಯೋಗಿಸಿ" },
  try_today_sub: { en: "Functional interactive simulations with live controls, observation recording, and data plotting.", kn: "ಲೈವ್ ನಿಯಂತ್ರಣಗಳು, ವೀಕ್ಷಣಾ ಕೋಷ್ಟಕ ಮತ್ತು ಗ್ರಾಫ್ ಒಳಗೊಂಡ ಕ್ರಿಯಾತ್ಮಕ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು." },
  resources_title: { en: "Learning Resources Preview", kn: "ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳ ಮುನ್ನೋಟ" },
  quiz_preview_title: { en: "Daily Science Challenge", kn: "ದೈನಂದಿನ ವಿಜ್ಞಾನ ರಸಪ್ರಶ್ನೆ" },
  about_title: { en: "About InstaLab", kn: "ಇನ್‌ಸ್ಟಾಲ್ಯಾಬ್ ಬಗ್ಗೆ" },
  about_text: { en: "InstaLab is an open scientific learning platform designed to make practical science accessible in Kannada and English. All simulations run locally in your browser using simplified mathematical models.", kn: "ಇನ್‌ಸ್ಟಾಲ್ಯಾಬ್ ಪ್ರಾಯೋಗಿಕ ವಿಜ್ಞಾನವನ್ನು ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸುಲಭವಾಗಿ ಕಲಿಯಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಮುಕ್ತ ವೇದಿಕೆಯಾಗಿದೆ. ಎಲ್ಲಾ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು ಸರಳೀಕೃತ ಗಣಿತೀಯ ಮಾದರಿಗಳನ್ನು ಬಳಸಿ ಬ್ರೌಸರ್‌ನಲ್ಲಿಯೇ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ." },
  footer_disclaimer: { en: "Simulations use simplified theoretical models and do not replace physical laboratory experiments. Always perform physical science experiments under certified adult supervision.", kn: "ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು ಸರಳೀಕೃತ ಸೈದ್ಧಾಂತಿಕ ಮಾದರಿಗಳನ್ನು ಬಳಸುತ್ತವೆ ಮತ್ತು ನೈಜ ಪ್ರಯೋಗಾಲಯಕ್ಕೆ ಪರ್ಯಾಯವಲ್ಲ. ನೈಜ ಪ್ರಯೋಗಗಳನ್ನು ಯಾವಾಗಲೂ ಶಿಕ್ಷಕರ ಮೇಲ್ವಿಚಾರಣೆಯಲ್ಲಿಯೇ ನಡೆಸಿ." }
};

// Structured Datasets
const DATA_STORE = {
  simulations: [
    { id: "sim-motion", title_en: "Motion & Speed", title_kn: "ಚಲನೆ ಮತ್ತು ವೇಗ", subject: "Physics" },
    { id: "sim-reflection", title_en: "Reflection of Light", title_kn: "ಬೆಳಕಿನ ಪ್ರತಿಫಲನ", subject: "Physics" },
    { id: "sim-buoyancy", title_en: "Density and Buoyancy", title_kn: "ಸಾಂದ್ರತೆ ಮತ್ತು ತೇಲುವಿಕೆ", subject: "Physics" },
    { id: "sim-circuits", title_en: "Simple Electric Circuit", title_kn: "ಸರಳ ವಿದ್ಯುತ್ ಮಂಡಲ", subject: "Physics" },
    { id: "sim-ph", title_en: "Acids, Bases and pH Scale", title_kn: "ಆಮ್ಲಗಳು ಮತ್ತು ಪ್ರತ್ಯಾಮ್ಲಗಳು", subject: "Chemistry" },
    { id: "sim-cell", title_en: "Plant and Animal Cell Explorer", title_kn: "ಜೀವಕೋಶ ಪರಿಶೋಧಕ", subject: "Biology" }
  ],
  scientists: [
    { id: "sci-newton", name_en: "Isaac Newton", name_kn: "ಐಸಾಕ್ ನ್ಯೂಟನ್", field: "Physics", link: "https://www.britannica.com/biography/Isaac-Newton" },
    { id: "sci-einstein", name_en: "Albert Einstein", name_kn: "ಆಲ್ಬರ್ಟ್ ಐನ್‌ಸ್ಟೈನ್", field: "Physics", link: "https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/" },
    { id: "sci-curie", name_en: "Marie Curie", name_kn: "ಮೇರಿ ಕ್ಯೂರಿ", field: "Chemistry & Physics", link: "https://www.nobelprize.org/prizes/physics/1903/marie-curie/biographical/" },
    { id: "sci-raman", name_en: "C. V. Raman", name_kn: "ಸಿ. ವಿ. ರಾಮನ್", field: "Physics (Optics)", link: "https://www.nobelprize.org/prizes/physics/1930/raman/biographical/" },
    { id: "sci-kalam", name_en: "A. P. J. Abdul Kalam", name_kn: "ಎ. ಪಿ. ಜೆ. ಅಬ್ದುಲ್ ಕಲಾಂ", field: "Aerospace Engineering", link: "https://www.presidentofindia.gov.in" }
  ],
  resources: [
    { id: "res-si", title_en: "SI Units and Fundamental Constants Sheet", title_kn: "SI ಏಕಮಾನಗಳು ಮತ್ತು ಭೌತಿಕ ಸ್ಥಿರಾಂಕಗಳ ಪಟ್ಟಿ", subject: "Physics", format: "Reference Sheet", publisher: "BIPM Standard", link: "https://www.bipm.org" },
    { id: "res-safety", title_en: "10 Core Safety Rules for Science Laboratories", title_kn: "ಪ್ರಾಯೋಗಿಕ ವಿಜ್ಞಾನದ 10 ಪ್ರಮುಖ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು", subject: "Safety", format: "Safety Guide", publisher: "InstaLab Protocol", link: "#" },
    { id: "res-table", title_en: "Scientific Observation Table & Graph Template", title_kn: "ವೈಜ್ಞಾನಿಕ ವೀಕ್ಷಣಾ ಕೋಷ್ಟಕ ಮತ್ತು ಗ್ರಾಫ್ ಮಾದರಿ", subject: "Methodology", format: "Interactive Template", publisher: "InstaLab Education", link: "#" },
    { id: "res-water", title_en: "Hydrological Water Cycle Diagram", title_kn: "ಜಲಚಕ್ರ ನಕ್ಷೆ ಮತ್ತು ಪ್ರಕ್ರಿಯಾ ವಿವರಣೆ", subject: "Earth Science", format: "Diagram", publisher: "USGS Aligned", link: "https://www.usgs.gov" }
  ],
  quiz: [
    {
      id: "q-1",
      question_en: "When a light ray strikes a plane mirror at an angle of incidence of 40°, what is the angle of reflection?",
      question_kn: "ಬೆಳಕಿನ ಕಿರಣವು ಸಮತಲ ಕನ್ನಡಿಯ ಲಂಬಕ್ಕೆ 40° ಪತನ ಕೋನದಲ್ಲಿ ಬಿದ್ದರೆ, ಪ್ರತಿಫಲನ ಕೋನ ಎಷ್ಟು?",
      options: [
        { text_en: "40°", text_kn: "40°", correct: true },
        { text_en: "50°", text_kn: "50°", correct: false },
        { text_en: "80°", text_kn: "80°", correct: false },
        { text_en: "90°", text_kn: "90°", correct: false }
      ],
      explanation_en: "The Law of Reflection states that the angle of incidence equals the angle of reflection (∠i = ∠r = 40°).",
      explanation_kn: "ಪ್ರತಿಫಲನ ನಿಯಮದ ಪ್ರಕಾರ, ಪತನ ಕೋನವು ಪ್ರತಿಫಲನ ಕೋನಕ್ಕೆ ಸಮನಾಗಿರುತ್ತದೆ (∠i = ∠r = 40°)."
    }
  ]
};

// Simulation State (window.simState persists across language toggles)
window.simState = {
  motion: { speed: 10, time: 0, distance: 0, running: false, timer: null, records: [] },
  reflection: { angle: 45, records: [] },
  buoyancy: { mass: 60, volume: 100, records: [] }
};

let currentLang = localStorage.getItem("instalab_lang") || "both";

document.addEventListener("DOMContentLoaded", () => {
  const langSelector = document.getElementById("langSelector");
  langSelector.value = currentLang;

  langSelector.addEventListener("change", (e) => {
    currentLang = e.target.value;
    localStorage.setItem("instalab_lang", currentLang);
    applyLanguage(currentLang);
    renderResources();
    renderQuizPreview();
  });

  // Dynamic Honest Counts
  document.getElementById("statSimCount").textContent = DATA_STORE.simulations.length;
  document.getElementById("statSciCount").textContent = DATA_STORE.scientists.length;
  document.getElementById("statQuizCount").textContent = DATA_STORE.quiz.length;

  applyLanguage(currentLang);
  renderResources();
  renderQuizPreview();
  initSearch();
  initNavigation();

  // Simulations
  initMotionSimulation();
  initReflectionSimulation();
  initBuoyancySimulation();
});

function t(key, mode = currentLang) {
  const item = I18N[key];
  if (!item) return key;
  if (mode === "kn") return item.kn;
  if (mode === "en") return item.en;
  return `${item.kn} / ${item.en}`;
}

function applyLanguage(mode) {
  document.getElementById("brandTitle").textContent = mode === "kn" ? I18N.brand.kn : (mode === "en" ? I18N.brand.en : `${I18N.brand.kn} / ${I18N.brand.en}`);
  document.getElementById("brandTagline").textContent = t("tagline", mode);
  document.getElementById("navLab").textContent = t("nav_lab", mode);
  document.getElementById("navDocs").textContent = t("nav_documents", mode);
  document.getElementById("navQuiz").textContent = t("nav_quiz", mode);
  document.getElementById("heroTitle").textContent = t("hero_title", mode);
  document.getElementById("heroDesc").textContent = t("hero_desc", mode);
  document.getElementById("btnExplore").textContent = t("btn_explore", mode);
  document.getElementById("btnOpenLab").textContent = t("btn_open_lab", mode);
  document.getElementById("btnStartLearning").textContent = t("btn_start_learning", mode);
  document.getElementById("globalSearch").placeholder = t("search_placeholder", mode);

  document.getElementById("catPhysicsTitle").textContent = t("cat_physics", mode);
  document.getElementById("catPhysicsDesc").textContent = t("cat_physics_desc", mode);
  document.getElementById("catChemTitle").textContent = t("cat_chemistry", mode);
  document.getElementById("catChemDesc").textContent = t("cat_chemistry_desc", mode);
  document.getElementById("catBioTitle").textContent = t("cat_biology", mode);
  document.getElementById("catBioDesc").textContent = t("cat_biology_desc", mode);
  document.getElementById("catEarthTitle").textContent = t("cat_earth", mode);
  document.getElementById("catEarthDesc").textContent = t("cat_earth_desc", mode);

  document.getElementById("tryTodayTitle").textContent = t("try_today_heading", mode);
  document.getElementById("tryTodaySub").textContent = t("try_today_sub", mode);
  document.getElementById("resTitle").textContent = t("resources_title", mode);
  document.getElementById("quizTitle").textContent = t("quiz_preview_title", mode);
  document.getElementById("aboutTitle").textContent = t("about_title", mode);
  document.getElementById("aboutText").textContent = t("about_text", mode);
  document.getElementById("footerDisclaimer").textContent = t("footer_disclaimer", mode);
}

function renderResources() {
  const container = document.getElementById("resourcesPreviewGrid");
  container.innerHTML = DATA_STORE.resources.map(r => `
    <article class="resource-card">
      <span class="resource-badge">${r.subject}</span>
      <h4 class="resource-title">${currentLang === 'kn' ? r.title_kn : (currentLang === 'en' ? r.title_en : `${r.title_kn} / ${r.title_en}`)}</h4>
      <p class="resource-meta">Format: ${r.format} | ${r.publisher}</p>
      <a href="${r.link}" class="resource-link" target="_blank" rel="noopener">Open Source →</a>
    </article>
  `).join("");
}

function initSearch() {
  const input = document.getElementById("globalSearch");
  const clearBtn = document.getElementById("clearSearchBtn");
  const resultsBox = document.getElementById("searchResults");

  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      resultsBox.classList.add("hidden");
      resultsBox.innerHTML = "";
      return;
    }
    const hits = [];
    DATA_STORE.simulations.forEach(s => {
      if (s.title_en.toLowerCase().includes(q) || s.title_kn.includes(q)) {
        hits.push({ title: `${s.title_kn} / ${s.title_en}`, badge: "Simulation", link: "#try-it-today" });
      }
    });
    DATA_STORE.scientists.forEach(sc => {
      if (sc.name_en.toLowerCase().includes(q) || sc.name_kn.includes(q)) {
        hits.push({ title: `${sc.name_kn} / ${sc.name_en}`, badge: "Scientist", link: sc.link });
      }
    });

    resultsBox.classList.remove("hidden");
    if (hits.length === 0) {
      resultsBox.innerHTML = `<p style="font-size:0.9rem; color:#64748b;">${t("no_results")}</p>`;
    } else {
      resultsBox.innerHTML = hits.map(h => `
        <div class="search-result-item">
          <span class="result-badge">${h.badge}</span>
          <a href="${h.link}">${h.title}</a>
        </div>
      `).join("");
    }
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    resultsBox.classList.add("hidden");
    resultsBox.innerHTML = "";
  });
}

function initNavigation() {
  const hamburger = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("primaryNav");
  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
    nav.classList.toggle("nav-open");
  });
}

function renderQuizPreview() {
  const q = DATA_STORE.quiz[0];
  const qEl = document.getElementById("quizQuestion");
  const optBox = document.getElementById("quizOptions");
  qEl.textContent = currentLang === 'kn' ? q.question_kn : (currentLang === 'en' ? q.question_en : `${q.question_kn} / ${q.question_en}`);
  optBox.innerHTML = q.options.map((opt, i) => `
    <label class="quiz-option-label">
      <input type="radio" name="quizOption" value="${i}">
      <span>${currentLang === 'kn' ? opt.text_kn : (currentLang === 'en' ? opt.text_en : `${opt.text_kn} (${opt.text_en})`)}</span>
    </label>
  `).join("");

  document.getElementById("quizSubmitBtn").onclick = () => {
    const selected = document.querySelector('input[name="quizOption"]:checked');
    const fb = document.getElementById("quizFeedback");
    if (!selected) {
      fb.className = "quiz-feedback error";
      fb.textContent = currentLang === 'kn' ? "ದಯವಿಟ್ಟು ಆಯ್ಕೆಮಾಡಿ." : "Please select an answer.";
      fb.classList.remove("hidden");
      return;
    }
    const isCorrect = q.options[parseInt(selected.value, 10)].correct;
    fb.className = isCorrect ? "quiz-feedback success" : "quiz-feedback error";
    fb.textContent = (isCorrect ? "✓ " : "✗ ") + (currentLang === 'kn' ? q.explanation_kn : q.explanation_en);
    fb.classList.remove("hidden");
  };
}

// Simulation 1: Motion
function initMotionSimulation() {
  const canvas = document.getElementById("motionCanvas");
  const ctx = canvas.getContext("2d");
  const speedSlider = document.getElementById("motionSpeedSlider");
  const speedVal = document.getElementById("motionSpeedVal");
  const timeVal = document.getElementById("motionTimeVal");
  const distVal = document.getElementById("motionDistVal");
  const startBtn = document.getElementById("motionStartBtn");
  const pauseBtn = document.getElementById("motionPauseBtn");
  const resetBtn = document.getElementById("motionResetBtn");
  const recordBtn = document.getElementById("motionRecordBtn");

  const state = window.simState.motion;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 85);
    ctx.lineTo(canvas.width - 10, 85);
    ctx.stroke();

    const trackWidth = canvas.width - 60;
    const cartX = 10 + Math.min(trackWidth, (state.distance / 100) * trackWidth);

    ctx.fillStyle = "#0284c7";
    ctx.fillRect(cartX, 55, 36, 20);

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cartX + 8, 77, 5, 0, Math.PI * 2);
    ctx.arc(cartX + 28, 77, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  speedSlider.addEventListener("input", (e) => {
    state.speed = parseFloat(e.target.value);
    speedVal.textContent = state.speed.toFixed(1);
  });

  startBtn.addEventListener("click", () => {
    if (state.running) return;
    state.running = true;
    state.timer = setInterval(() => {
      state.time += 0.05;
      state.distance = state.speed * state.time;
      timeVal.textContent = state.time.toFixed(2);
      distVal.textContent = state.distance.toFixed(2);
      draw();
      if (state.distance >= 100) {
        clearInterval(state.timer);
        state.running = false;
      }
    }, 50);
  });

  pauseBtn.addEventListener("click", () => {
    state.running = false;
    clearInterval(state.timer);
  });

  resetBtn.addEventListener("click", () => {
    state.running = false;
    clearInterval(state.timer);
    state.time = 0;
    state.distance = 0;
    timeVal.textContent = "0.00";
    distVal.textContent = "0.00";
    draw();
  });

  recordBtn.addEventListener("click", () => {
    const trial = state.records.length + 1;
    const row = { trial, speed: state.speed.toFixed(1), time: state.time.toFixed(2), dist: state.distance.toFixed(2) };
    state.records.push(row);
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${trial}</td><td>${row.speed}</td><td>${row.time}</td><td>${row.dist}</td>`;
    document.querySelector("#motionTable tbody").appendChild(tr);
    plotGraph("motionGraphCanvas", state.records.map(r => ({ x: parseFloat(r.time), y: parseFloat(r.dist) })), "Time (s)", "Dist (m)");
  });

  draw();
}

// Simulation 2: Reflection
function initReflectionSimulation() {
  const canvas = document.getElementById("reflectionCanvas");
  const ctx = canvas.getContext("2d");
  const slider = document.getElementById("angleSlider");
  const angleDisp = document.getElementById("angleDisp");
  const reflectDisp = document.getElementById("angleReflectDisp");
  const recordBtn = document.getElementById("reflectionRecordBtn");

  const state = window.simState.reflection;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const midX = canvas.width / 2;
    const mirrorY = 95;

    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(20, mirrorY);
    ctx.lineTo(canvas.width - 20, mirrorY);
    ctx.stroke();

    ctx.strokeStyle = "#cbd5e1";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(midX, 15);
    ctx.lineTo(midX, mirrorY);
    ctx.stroke();
    ctx.setLineDash([]);

    const rad = (state.angle * Math.PI) / 180;
    const len = 70;
    const incX = midX - len * Math.sin(rad);
    const incY = mirrorY - len * Math.cos(rad);
    const refX = midX + len * Math.sin(rad);
    const refY = mirrorY - len * Math.cos(rad);

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(incX, incY);
    ctx.lineTo(midX, mirrorY);
    ctx.stroke();

    ctx.strokeStyle = "#06b6d4";
    ctx.beginPath();
    ctx.moveTo(midX, mirrorY);
    ctx.lineTo(refX, refY);
    ctx.stroke();
  }

  slider.addEventListener("input", (e) => {
    state.angle = parseInt(e.target.value, 10);
    angleDisp.textContent = state.angle;
    reflectDisp.textContent = state.angle;
    draw();
  });

  recordBtn.addEventListener("click", () => {
    const trial = state.records.length + 1;
    state.records.push({ trial, i: state.angle, r: state.angle });
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${trial}</td><td>${state.angle}°</td><td>${state.angle}°</td>`;
    document.querySelector("#reflectionTable tbody").appendChild(tr);
    plotGraph("reflectionGraphCanvas", state.records.map(p => ({ x: p.i, y: p.r })), "∠i (°)", "∠r (°)");
  });

  draw();
}

// Simulation 3: Density
function initBuoyancySimulation() {
  const canvas = document.getElementById("buoyancyCanvas");
  const ctx = canvas.getContext("2d");
  const slider = document.getElementById("buoyancyMassSlider");
  const massDisp = document.getElementById("buoyancyMassDisp");
  const calcDensity = document.getElementById("calcDensityDisp");
  const statusDisp = document.getElementById("buoyancyStatusDisp");
  const recordBtn = document.getElementById("buoyancyRecordBtn");

  const state = window.simState.buoyancy;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const density = state.mass / state.volume;
    calcDensity.textContent = density.toFixed(2);

    const midX = canvas.width / 2;
    const waterY = 35;

    ctx.fillStyle = "rgba(14, 165, 233, 0.3)";
    ctx.fillRect(midX - 60, waterY, 120, 75);
    ctx.strokeStyle = "#0284c7";
    ctx.strokeRect(midX - 60, waterY, 120, 75);

    let blockY;
    if (density < 1.0) {
      blockY = waterY - 10 + (density * 20);
      statusDisp.textContent = "Floats / ತೇಲುತ್ತದೆ";
      statusDisp.style.color = "#16a34a";
    } else {
      blockY = waterY + 50;
      statusDisp.textContent = "Sinks / ಮುಳುಗುತ್ತದೆ";
      statusDisp.style.color = "#dc2626";
    }

    ctx.fillStyle = "#eab308";
    ctx.fillRect(midX - 20, blockY, 40, 22);
    ctx.strokeStyle = "#a16207";
    ctx.strokeRect(midX - 20, blockY, 40, 22);
  }

  slider.addEventListener("input", (e) => {
    state.mass = parseFloat(e.target.value);
    massDisp.textContent = state.mass;
    draw();
  });

  recordBtn.addEventListener("click", () => {
    const trial = state.records.length + 1;
    const dens = (state.mass / state.volume).toFixed(2);
    state.records.push({ trial, mass: state.mass, dens: parseFloat(dens) });
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${trial}</td><td>${state.mass}</td><td>100</td><td>${dens}</td>`;
    document.querySelector("#buoyancyTable tbody").appendChild(tr);
    plotGraph("buoyancyGraphCanvas", state.records.map(p => ({ x: p.mass, y: p.dens })), "Mass (g)", "ρ (g/cm³)");
  });

  draw();
}

// Data-Driven Graph Plotter
function plotGraph(canvasId, points, xLabel, yLabel) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || points.length === 0) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pad = 30;
  const w = canvas.width - pad * 2;
  const h = canvas.height - pad * 2;

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, canvas.height - pad);
  ctx.lineTo(canvas.width - pad, canvas.height - pad);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.font = "10px sans-serif";
  ctx.fillText(xLabel, canvas.width - pad - 35, canvas.height - 10);
  ctx.fillText(yLabel, 5, pad - 10);

  const maxX = Math.max(...points.map(p => p.x), 1);
  const maxY = Math.max(...points.map(p => p.y), 1);

  ctx.strokeStyle = "#2563eb";
  ctx.fillStyle = "#2563eb";
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((pt, i) => {
    const px = pad + (pt.x / maxX) * w;
    const py = (canvas.height - pad) - (pt.y / maxY) * h;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();

  points.forEach(pt => {
    const px = pad + (pt.x / maxX) * w;
    const py = (canvas.height - pad) - (pt.y / maxY) * h;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}
