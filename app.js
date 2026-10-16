/* ============================================================================
   InstaLab (ಇನ್‌ಸ್ಟಾಲ್ಯಾಬ್) — Complete Bilingual Interactive Science Engine
   Supports: Kannada Only ('kn'), English Only ('en'), Both ('both')
   Includes: 12 Interactive Simulations, 12 Apparatus Guides, 20 Scientists,
             30 Verified Science Facts, Grade 6-10 KTBS Modules, Quiz Engine
   ============================================================================ */

let currentLang = localStorage.getItem('instalab_lang') || 'both';
let currentSimId = 'thermometer';
let currentGrade = '6';

// Helper to format bilingual strings cleanly based on selected mode
function t(enText, knText) {
  if (!knText) return enText;
  if (currentLang === 'en') return enText;
  if (currentLang === 'kn') return knText;
  return `${knText} / ${enText}`;
}

// Helper to generate YouTube search URLs for Kannada and English topics
function ytUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

// Helper to generate stylized SVG Scientist Portrait with initials & motif
function createScientistAvatarSVG(name, color = '#22D3EE', fieldIcon = '⚛️') {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return `
    <svg viewBox="0 0 80 80" width="74" height="74" role="img" aria-label="${name} illustration">
      <defs>
        <linearGradient id="grad-${initials}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#131B33"/>
          <stop offset="100%" stop-color="#0B1020"/>
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="url(#grad-${initials})" stroke="${color}" stroke-width="2"/>
      <circle cx="40" cy="28" r="12" fill="${color}" opacity="0.25"/>
      <path d="M18 66 C18 48, 62 48, 62 66" fill="${color}" opacity="0.25"/>
      <text x="40" y="36" text-anchor="middle" fill="#F8FAFC" font-size="16" font-weight="bold" font-family="sans-serif">${initials}</text>
      <text x="40" y="58" text-anchor="middle" font-size="15">${fieldIcon}</text>
    </svg>
  `;
}

/* ============================================================================
   1. UI DICTIONARY
   ============================================================================ */
const UI_TEXT = {
  nav_home: { en: "Home", kn: "ಮುಖಪುಟ" },
  nav_sims: { en: "Virtual Lab (12)", kn: "ಪ್ರಯೋಗಾಲಯ (12)" },
  nav_materials: { en: "Equipment", kn: "ಉಪಕರಣಗಳು" },
  nav_scientists: { en: "Scientists (20)", kn: "ವಿಜ್ಞಾನಿಗಳು (20)" },
  nav_facts: { en: "30 Facts", kn: "30 ವಿಜ್ಞಾನ ಸತ್ಯಗಳು" },
  nav_karnataka: { en: "Class 6–10", kn: "6–10ನೇ ತರಗತಿ" },
  nav_videos: { en: "Videos", kn: "ವೀಡಿಯೊಗಳು" },
  nav_quizzes: { en: "Quizzes", kn: "ರಸಪ್ರಶ್ನೆ" },
  hero_badge: { en: "🔬 Interactive Science Lab", kn: "🔬 ಶಾಲಾ ವಿಜ್ಞಾನ ಸಂವಾದಾತ್ಮಕ ಪ್ರಯೋಗಾಲಯ" },
  hero_title: { en: "Explore Science by Doing — Anytime, Anywhere", kn: "ಪ್ರಯೋಗಗಳ ಮೂಲಕ ವಿಜ್ಞಾನ ಕಲಿಯಿರಿ — ಎಲ್ಲೆಡೆಯೂ, ಯಾವಾಗಲೂ" },
  hero_desc: {
    en: "Hands-on virtual experiments, interactive apparatus guides, scientist biographies, quizzes, and Karnataka State Board (Grades 6–10) learning resources.",
    kn: "ವರ್ಚುವಲ್ ಪ್ರಯೋಗಗಳು, ವಿಜ್ಞಾನ ಉಪಕರಣಗಳ ಮಾಹಿತಿ, ವಿಜ್ಞಾನಿಗಳ ಪರಿಚಯ, ರಸಪ್ರಶ್ನೆ ಹಾಗೂ ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪಠ್ಯಕ್ರಮದ (6–10ನೇ ತರಗತಿ) ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳು."
  },
  btn_launch_lab: { en: "⚡ Launch Virtual Lab (12 Sims)", kn: "⚡ ಪ್ರಯೋಗಾಲಯ ಪ್ರಾರಂಭಿಸಿ (12)" },
  btn_explore_state: { en: "📚 Class 6–10 State Board", kn: "📚 6–10ನೇ ತರಗತಿ ಪಠ್ಯಕ್ರಮ" },
  btn_follow_insta: { en: "Follow @instalab on Instagram", kn: "ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ @instalab ಹಿಂಬಾಲಿಸಿ" },
  insta_banner_title: { en: "InstaLab on Instagram & YouTube Shorts", kn: "ಇನ್‌ಸ್ಟಾಲ್ಯಾಬ್ (InstaLab) ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ಮತ್ತು ಯೂಟ್ಯೂಬ್" },
  insta_banner_desc: {
    en: "Watch short 3D science animations, laboratory apparatus guides, and hands-on STEM experiments.",
    kn: "ಕಿರು 3D ವಿಜ್ಞಾನ ಆನಿಮೇಷನ್‌ಗಳು, ಪ್ರಯೋಗಾಲಯ ಉಪಕರಣಗಳ ಪರಿಚಯ ಮತ್ತು ಸರಳ ಪ್ರಯೋಗಗಳನ್ನು ವೀಕ್ಷಿಸಿ."
  },
  stat_sims: { en: "Interactive Simulations", kn: "ಸಂವಾದಾತ್ಮಕ ಪ್ರಯೋಗಗಳು" },
  stat_equip: { en: "Lab Apparatus Guides", kn: "ಪ್ರಯೋಗಾಲಯ ಉಪಕರಣಗಳು" },
  stat_sci: { en: "Scientist Profiles", kn: "ವಿಜ್ಞಾನಿಗಳ ಪರಿಚಯ" },
  stat_facts: { en: "Verified Science Facts", kn: "ವಿಜ್ಞಾನದ ಅಚ್ಚರಿಗಳು" },
  home_featured_sims: { en: "🔥 Featured Interactive Simulations", kn: "🔥 ಪ್ರಮುಖ ವರ್ಚುವಲ್ ಪ್ರಯೋಗಗಳು" },
  home_recent_act: { en: "🧪 Hands-On Learning Activities (With Simulations)", kn: "🧪 ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ನೇರ ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು" },
  home_pop_sci: { en: "👩‍🔬 Featured Scientists", kn: "👩‍🔬 ಪ್ರಮುಖ ವಿಜ್ಞಾನಿಗಳು" },
  home_daily_facts: { en: "💡 Amazing Science Facts", kn: "💡 ವಿಜ್ಞಾನದ ಅಚ್ಚರಿಗಳು" },
  sims_page_title: { en: "🔬 Interactive Virtual Laboratory (12 Simulations)", kn: "🔬 ಸಂವಾದಾತ್ಮಕ ವರ್ಚುವಲ್ ಪ್ರಯೋಗಾಲಯ (12 ಪ್ರಯೋಗಗಳು)" },
  sims_page_desc: {
    en: "Adjust sliders and switches to observe real-time changes. Note: Values are illustrative educational models.",
    kn: "ಸ್ಲೈಡರ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ ನೇರ ಫಲಿತಾಂಶ ಗಮನಿಸಿ. ಸೂಚನೆ: ಇವು ಶೈಕ್ಷಣಿಕ ಮಾದರಿಗಳಾಗಿವೆ."
  }
};

/* ============================================================================
   2. 12 INTERACTIVE SIMULATIONS DATA (8 Core + 4 Bonus)
   ============================================================================ */
const SIMULATIONS = [
  {
    id: 'thermometer',
    titleEn: 'A. Thermometer & Liquid Expansion',
    titleKn: 'A. ತಾಪಮಾನ ಮಾಪಕ ಮತ್ತು ದ್ರವದ ಹಿಗ್ಗುವಿಕೆ',
    objectiveEn: 'Observe how temperature affects liquid column height and compare freezing/boiling points across substances at 1 atm.',
    objectiveKn: 'ತಾಪಮಾನ ಬದಲಾದಂತೆ ತಾಪಮಾನ ಮಾಪಕದಲ್ಲಿ ದ್ರವದ ಮಟ್ಟ ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ಮತ್ತು ವಿವಿಧ ದ್ರವಗಳ ಕುದಿಯುವ/ಘನೀಕರಿಸುವ ಬಿಂದುಗಳನ್ನು ಹೋಲಿಸಿ.',
    materialsEn: 'Glass thermometer tube, Mercury/Alcohol/Water selector, heat slider (-20°C to 120°C).',
    materialsKn: 'ಗಾಜಿನ ತಾಪಮಾನ ಮಾಪಕ, ಪಾದರಸ/ಆಲ್ಕೋಹಾಲ್/ನೀರು ಆಯ್ಕೆ, ತಾಪಮಾನ ಸ್ಲೈಡರ್ (-20°C ನಿಂದ 120°C).',
    stepsEn: ['Select a test condition or substance.', 'Move the Temperature Slider between -20°C and 120°C.', 'Compare the Celsius (°C), Fahrenheit (°F), and Kelvin (K) readouts and phase state.'],
    stepsKn: ['ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ.', '-20°C ನಿಂದ 120°C ವರೆಗೆ ಸ್ಲೈಡರ್ ಜರುಗಿಸಿ.', 'ಸೆಲ್ಸಿಯಸ್, ಫ್ಯಾರನ್‌ಹೀಟ್ ಮತ್ತು ಕೆಲ್ವಿನ್ ರೀಡಿಂಗ್ ಗಮನಿಸಿ.'],
    explanationEn: 'Liquids expand when heated because kinetic energy increases particle separation. Real boiling and freezing points depend on the substance and atmospheric pressure (e.g., water boils below 100°C at high altitudes). Values here are illustrative educational models.',
    explanationKn: 'ಶಾಖ ನೀಡಿದಾಗ ದ್ರವದ ಕಣಗಳ ಚಲನಶಕ್ತಿ ಹೆಚ್ಚಾಗಿ ಹಿಗ್ಗುತ್ತದೆ. ನೈಜ ಕುದಿಯುವ ಮತ್ತು ಘನೀಕರಿಸುವ ಬಿಂದುಗಳು ವಸ್ತುವಿನ ಗುಣ ಹಾಗೂ ವಾಯುಭಾರದ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತವೆ.',
    applicationEn: 'Clinical fever measurement, weather stations, food preservation.',
    applicationKn: 'ವೈದ್ಯಕೀಯ ಜ್ವರ ಪರೀಕ್ಷೆ, ಹವಾಮಾನ ಕೇಂದ್ರಗಳು ಮತ್ತು ಆಹಾರ ಸಂರಕ್ಷಣೆ.',
    safetyEn: 'Never use a clinical thermometer in boiling water (it will shatter). Handle glass thermometers carefully.',
    safetyKn: 'ವೈದ್ಯಕೀಯ ತಾಪಮಾನ ಮಾಪಕವನ್ನು ಕುದಿಯುವ ನೀರಿನಲ್ಲಿ ಇಡಬೇಡಿ (ಅದು ಒಡೆಯುತ್ತದೆ).',
    ytKn: 'ತಾಪಮಾನ ಮಾಪಕ ವಿಜ್ಞಾನ ಪ್ರಯೋಗ ಕನ್ನಡ Thermometer in Kannada',
    ytEn: 'How a Thermometer Works Thermal Expansion Physics',
    questions: [
      { qEn: 'What is normal human body temperature on the Celsius scale?', qKn: 'ಮನುಷ್ಯನ ದೇಹದ ಸಾಮಾನ್ಯ ತಾಪಮಾನ ಸೆಲ್ಸಿಯಸ್‌ನಲ್ಲಿ ಎಷ್ಟು?', opts: ['37°C', '100°C', '0°C'], ans: 0 },
      { qEn: 'How does reduced atmospheric pressure at high mountains affect water’s boiling point?', qKn: 'ಎತ್ತರದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಕಡಿಮೆ ವಾಯುಭಾರದಿಂದ ನೀರಿನ ಕುದಿಯುವ ಬಿಂದುವಿಗೆ ಏನಾಗುತ್ತದೆ?', opts: ['Decreases below 100°C / 100°C ಗಿಂತ ಕಡಿಮೆಯಾಗುತ್ತದೆ', 'Increases to 150°C', 'No change'], ans: 0 },
      { qEn: 'Convert 25°C to Kelvin (approximate).', qKn: '25°C ಅನ್ನು ಕೆಲ್ವಿನ್‌ಗೆ ಪರಿವರ್ತಿಸಿ.', opts: ['298 K', '273 K', '248 K'], ans: 0 }
    ]
  },
  {
    id: 'plant',
    titleEn: 'B. Plant Growth & Photosynthesis Model',
    titleKn: 'B. ಸಸ್ಯ ಬೆಳವಣಿಗೆ ಮತ್ತು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ',
    objectiveEn: 'Investigate how light intensity, water availability, and duration affect plant stem height and leaf health.',
    objectiveKn: 'ಬೆಳಕಿನ ತೀವ್ರತೆ, ನೀರಿನ ಪ್ರಮಾಣ ಮತ್ತು ಸಮಯವು ಸಸ್ಯದ ಬೆಳವಣಿಗೆಯ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ ಎಂಬುದನ್ನು ಅಭ್ಯಸಿಸಿ.',
    materialsEn: 'Potted dicot seedling, LED light bank slider, irrigation control, 30-day timer.',
    materialsKn: 'ಕುಂಡದಲ್ಲಿರುವ ಸಸಿ, ಬೆಳಕಿನ ಸ್ಲೈಡರ್, ನೀರಿನ ನಿಯಂತ್ರಣ ಮತ್ತು ದಿನಗಳ ಸ್ಲೈಡರ್.',
    stepsEn: ['Adjust Sunlight Intensity (0% to 100%).', 'Adjust Daily Water Level (0% to 100%).', 'Advance the Days Grown slider to see simulated height and oxygen output.'],
    stepsKn: ['ಸೂರ್ಯನ ಬೆಳಕಿನ ಪ್ರಮಾಣ ಹೊಂದಿಸಿ.', 'ನೀರಿನ ಮಟ್ಟ ಹೊಂದಿಸಿ.', 'ದಿನಗಳ ಸ್ಲೈಡರ್ ಜರುಗಿಸಿ ಸಸ್ಯದ ಎತ್ತರ ಗಮನಿಸಿ.'],
    explanationEn: 'Through photosynthesis, chlorophyll captures light energy to convert water (H2O) and carbon dioxide (CO2) into glucose and oxygen (O2). Note: This simulation is an educational mathematical model, not an exact biological prediction.',
    explanationKn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯ ಮೂಲಕ ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಬಳಸಿ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ. ಸೂಚನೆ: ಇದು ಶೈಕ್ಷಣಿಕ ಮಾದರಿ ಮಾತ್ರ.',
    applicationEn: 'Greenhouse farming, drip irrigation planning, crop yield optimization.',
    applicationKn: 'ಹಸಿರುಮನೆ ಕೃಷಿ ಮತ್ತು ಹನಿ ನೀರಾವರಿ ನಿರ್ವಹಣೆ.',
    safetyEn: 'Wash hands after handling soil and fertilizers in real garden experiments.',
    safetyKn: 'ಮಣ್ಣು ಮತ್ತು ಗೊಬ್ಬರ ಮುಟ್ಟಿದ ನಂತರ ಕೈಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿ ತೊಳೆಯಿರಿ.',
    ytKn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಸಸ್ಯಗಳ ಬೆಳವಣಿಗೆ ಕನ್ನಡ Photosynthesis in Kannada',
    ytEn: 'Photosynthesis Light and Water Plant Growth Experiment',
    questions: [
      { qEn: 'Which gas is released by plants during photosynthesis?', qKn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯ ಸಮಯದಲ್ಲಿ ಸಸ್ಯಗಳು ಬಿಡುಗಡೆ ಮಾಡುವ ಅನಿಲ ಯಾವುದು?', opts: ['Oxygen (ಆಮ್ಲಜನಕ)', 'Carbon Dioxide', 'Nitrogen'], ans: 0 },
      { qEn: 'What happens if a plant receives 0% light for many days?', qKn: 'ಸಸ್ಯಕ್ಕೆ ಹಲವು ದಿನಗಳವರೆಗೆ ಬೆಳಕೇ ಸಿಗದಿದ್ದರೆ ಏನಾಗುತ್ತದೆ?', opts: ['Photosynthesis stops & leaves yellow / ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ನಿಲ್ಲುತ್ತದೆ', 'Grows faster', 'Produces more oxygen'], ans: 0 },
      { qEn: 'Which pigment absorbs sunlight in green leaves?', qKn: 'ಹಸಿರು ಎಲೆಗಳಲ್ಲಿ ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಹೀರಿಕೊಳ್ಳುವ ವರ್ಣದ್ರವ್ಯ ಯಾವುದು?', opts: ['Chlorophyll (ಪತ್ರಹರಿತ್ತು)', 'Hemoglobin', 'Melanin'], ans: 0 }
    ]
  },
  {
    id: 'particles',
    titleEn: 'C. Particle Model of Matter (Solid, Liquid, Gas)',
    titleKn: 'C. ದ್ರವ್ಯದ ಕಣಗಳ ಮಾದರಿ (ಘನ, ದ್ರವ, ಅನಿಲ)',
    objectiveEn: 'Visualize particle arrangement, inter-particle spacing, and kinetic movement in solids, liquids, and gases.',
    objectiveKn: 'ಘನ, ದ್ರವ ಮತ್ತು ಅನಿಲ ಸ್ಥಿತಿಗಳಲ್ಲಿ ಕಣಗಳ ಜೋಡಣೆ ಹಾಗೂ ಚಲನೆಯನ್ನು ವೀಕ್ಷಿಸಿ.',
    materialsEn: 'Closed particle chamber, state selector buttons, thermal energy slider.',
    materialsKn: 'ಕಣಗಳ ಪೆಟ್ಟಿಗೆ, ಸ್ಥಿತಿ ಆಯ್ಕೆ ಬಟನ್‌ಗಳು ಮತ್ತು ಶಾಖದ ಸ್ಲೈಡರ್.',
    stepsEn: ['Click Solid, Liquid, or Gas buttons.', 'Adjust the Temperature slider to see changes in vibration speed.', 'Compare intermolecular force and compressibility readouts.'],
    stepsKn: ['ಘನ, ದ್ರವ ಅಥವಾ ಅನಿಲ ಬಟನ್ ಒತ್ತಿರಿ.', 'ತಾಪಮಾನ ಸ್ಲೈಡರ್ ಬದಲಿಸಿ ಕಣಗಳ ವೇಗ ಗಮನಿಸಿ.', 'ಕಣಗಳ ನಡುವಿನ ಅಂತರ ಹೋಲಿಸಿ.'],
    explanationEn: 'In solids, particles are tightly packed in fixed lattices and vibrate in place. In liquids, particles slide past one another with fixed volume. In gases, particles move rapidly with large empty spaces between them.',
    explanationKn: 'ಘನ ವಸ್ತುಗಳಲ್ಲಿ ಕಣಗಳು ಒತ್ತೊತ್ತಾಗಿ ಜೋಡಣೆಯಾಗಿರುತ್ತವೆ. ದ್ರವದಲ್ಲಿ ಕಣಗಳು ಚಲಿಸಬಲ್ಲವು. ಅನಿಲದಲ್ಲಿ ಕಣಗಳು ಅತಿ ವೇಗವಾಗಿ ಎಲ್ಲಾ ದಿಕ್ಕುಗಳಲ್ಲಿ ಚಲಿಸುತ್ತವೆ.',
    applicationEn: 'LPG gas cylinders (compression), metal casting, steam turbines.',
    applicationKn: 'ಎಲ್.ಪಿ.ಜಿ ಅನಿಲ ಸಿಲಿಂಡರ್ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಲೋಹದ ಎರಕ ಹೊಯ್ಯುವಿಕೆ.',
    safetyEn: 'Pressurized gas containers should never be heated directly.',
    safetyKn: 'ಒತ್ತಡದಲ್ಲಿರುವ ಅನಿಲ ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಬಿಸಿ ಮಾಡಬೇಡಿ.',
    ytKn: 'ದ್ರವ್ಯದ ಸ್ಥಿತಿಗಳು ಘನ ದ್ರವ ಅನಿಲ ಕನ್ನಡ States of Matter Kannada',
    ytEn: 'Particle Model of Matter Solid Liquid Gas Animation',
    questions: [
      { qEn: 'Which state of matter has the highest compressibility?', qKn: 'ಯಾವ ಸ್ಥಿತಿಯ ವಸ್ತುವನ್ನು ಸುಲಭವಾಗಿ ಸಂಕುಚಿತಗೊಳಿಸಬಹುದು?', opts: ['Gas (ಅನಿಲ)', 'Solid (ಘನ)', 'Liquid (ದ್ರವ)'], ans: 0 },
      { qEn: 'In which state do particles only vibrate about fixed positions?', qKn: 'ಯಾವ ಸ್ಥಿತಿಯಲ್ಲಿ ಕಣಗಳು ನಿಗದಿತ ಸ್ಥಳದಲ್ಲೇ ಕಂಪಿಸುತ್ತವೆ?', opts: ['Solid (ಘನ)', 'Gas (ಅನಿಲ)', 'Plasma'], ans: 0 },
      { qEn: 'Increasing temperature increases which energy of particles?', qKn: 'ತಾಪಮಾನ ಹೆಚ್ಚಿಸಿದಾಗ ಕಣಗಳ ಯಾವ ಶಕ್ತಿ ಹೆಚ್ಚಾಗುತ್ತದೆ?', opts: ['Kinetic Energy (ಚಲನಶಕ್ತಿ)', 'Nuclear Energy', 'Gravitational Mass'], ans: 0 }
    ]
  },
  {
    id: 'circuit',
    titleEn: 'D. Electric Circuit & Switch Control',
    titleKn: 'D. ಸರಳ ವಿದ್ಯುತ್ ಮಂಡಲ ಮತ್ತು ಸ್ವಿಚ್',
    objectiveEn: 'Build a closed path using a battery, wires, switch, and bulb to understand electric current flow.',
    objectiveKn: 'ಬ್ಯಾಟರಿ, ತಂತಿ, ಸ್ವಿಚ್ ಮತ್ತು ಬಲ್ಬ್ ಬಳಸಿ ಪೂರ್ಣ ವಿದ್ಯುತ್ ಮಂಡಲ ರಚಿಸಿ ವಿದ್ಯುತ್ ಪ್ರವಾಹ ತಿಳಿಯಿರಿ.',
    materialsEn: 'DC Battery (1.5V–9V), copper wires, toggle switch, filament bulb.',
    materialsKn: 'ಬ್ಯಾಟರಿ (1.5V–9V), ತಾಮ್ರದ ತಂತಿಗಳು, ಸ್ವಿಚ್ ಮತ್ತು ಬಲ್ಬ್.',
    stepsEn: ['Click the Switch button to toggle between OPEN and CLOSED.', 'Adjust Battery Voltage (1.5V to 9V) to observe bulb brightness and current (I = V/R).', 'Notice the direction of conventional current flow.'],
    stepsKn: ['ಸ್ವಿಚ್ ಬಟನ್ ಒತ್ತಿ ಮಂಡಲವನ್ನು ತೆರೆಯಿರಿ ಅಥವಾ ಮುಚ್ಚಿರಿ.', 'ಬ್ಯಾಟರಿ ವೋಲ್ಟೇಜ್ ಬದಲಿಸಿ ಬಲ್ಬ್ ಪ್ರಕಾಶ ಗಮನಿಸಿ.', 'ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ದಿಕ್ಕನ್ನು ಗಮನಿಸಿ.'],
    explanationEn: 'Electric current flows only when the circuit forms an unbroken closed loop. When the switch closes, electrons move through the filament, heating it to incandescence.',
    explanationKn: 'ವಿದ್ಯುತ್ ಮಂಡಲವು ಮುಚ್ಚಿದಾಗ (ಪೂರ್ಣಗೊಂಡಾಗ) ಮಾತ್ರ ವಿದ್ಯುತ್ ಪ್ರವಹಿಸಿ ಬಲ್ಬ್ ಬೆಳಗುತ್ತದೆ. ತೆರೆದ ಮಂಡಲದಲ್ಲಿ ವಿದ್ಯುತ್ ಪ್ರವಹಿಸುವುದಿಲ್ಲ.',
    applicationEn: 'Home lighting wiring, flashlights, vehicle ignition systems.',
    applicationKn: 'ಮನೆಯ ವಿದ್ಯುತ್ ದೀಪಗಳು ಮತ್ತು ಟಾರ್ಚ್‌ಗಳು.',
    safetyEn: 'Only perform school experiments with low-voltage DC batteries (1.5V–9V). NEVER touch or experiment with 230V AC household sockets.',
    safetyKn: 'ಪ್ರಯೋಗಗಳಿಗೆ ಸಣ್ಣ ಬ್ಯಾಟರಿಗಳನ್ನು (1.5V–9V) ಮಾತ್ರ ಬಳಸಿ. ಮನೆಯ 230V ವಿದ್ಯುತ್ ಪ್ಲಗ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಬಳಸಬೇಡಿ.',
    ytKn: 'ವಿದ್ಯುತ್ ಮಂಡಲ ಪ್ರಯೋಗ ಕನ್ನಡ Electric Circuit in Kannada',
    ytEn: 'Simple Electric Circuit Switch Battery Bulb Science',
    questions: [
      { qEn: 'Does the bulb glow when the switch is in the OPEN position?', qKn: 'ಸ್ವಿಚ್ ತೆರೆದ (OPEN) ಸ್ಥಿತಿಯಲ್ಲಿದ್ದಾಗ ಬಲ್ಬ್ ಬೆಳಗುತ್ತದೆಯೇ?', opts: ['No, circuit is incomplete / ಇಲ್ಲ, ಮಂಡಲ ಅಪೂರ್ಣವಾಗಿದೆ', 'Yes, brightly', 'Only at night'], ans: 0 },
      { qEn: 'Which material is a good conductor of electricity?', qKn: 'ಇವುಗಳಲ್ಲಿ ಯಾವುದು ಉತ್ತಮ ವಿದ್ಯುತ್ ವಾಹಕ?', opts: ['Copper (ತಾಮ್ರ)', 'Rubber (ರಬ್ಬರ್)', 'Dry wood (ಒಣ ಮರ)'], ans: 0 },
      { qEn: 'Which instrument measures electric current in amperes?', qKn: 'ವಿದ್ಯುತ್ ಪ್ರವಾಹವನ್ನು ಅಳೆಯುವ ಉಪಕರಣ ಯಾವುದು?', opts: ['Ammeter (ಅಮ್ಮೀಟರ್)', 'Barometer', 'Thermometer'], ans: 0 }
    ]
  },
  {
    id: 'magnetism',
    titleEn: 'E. Magnetism & Magnetic Materials Tester',
    titleKn: 'E. ಕಾಂತೀಯತೆ ಮತ್ತು ಕಾಂತೀಯ ವಸ್ತುಗಳ ಪರೀಕ್ಷೆ',
    objectiveEn: 'Test everyday materials with a bar magnet to classify magnetic (ferromagnetic) and non-magnetic substances.',
    objectiveKn: 'ದಂಡಕಾಂತವನ್ನು ಬಳಸಿ ಯಾವ ವಸ್ತುಗಳು ಕಾಂತಕ್ಕೆ ಆಕರ್ಷಿತವಾಗುತ್ತವೆ ಎಂಬುದನ್ನು ಪರೀಕ್ಷಿಸಿ.',
    materialsEn: 'Alnico Bar Magnet (N-S poles), Iron nail, Nickel coin, Plastic ruler, Wooden block, Aluminum foil, Cobalt piece.',
    materialsKn: 'ದಂಡಕಾಂತ (N-S ಧ್ರುವಗಳು), ಕಬ್ಬಿಣದ ಮೊಳೆ, ನಿಕ್ಕಲ್ ನಾಣ್ಯ, ಪ್ಲಾಸ್ಟಿಕ್ ಅಳತೆಪಟ್ಟಿ, ಮರದ ತುಂಡು.',
    stepsEn: ['Select a test object from the dropdown.', 'Adjust the Magnet Distance slider to bring the bar magnet closer.', 'Observe whether the object is attracted to the pole.'],
    stepsKn: ['ಪರೀಕ್ಷಿಸಬೇಕಾದ ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ.', 'ಕಾಂತದ ದೂರದ ಸ್ಲೈಡರ್ ಜರುಗಿಸಿ.', 'ವಸ್ತು ಆಕರ್ಷಿತವಾಗುತ್ತದೆಯೇ ಎಂದು ಗಮನಿಸಿ.'],
    explanationEn: 'Ferromagnetic materials like Iron (Fe), Nickel (Ni), and Cobalt (Co) have magnetic domains that align in an external magnetic field, causing strong attraction. Like poles repel (N-N, S-S) and unlike poles attract (N-S).',
    explanationKn: 'ಕಬ್ಬಿಣ, ನಿಕ್ಕಲ್ ಮತ್ತು ಕೋಬಾಲ್ಟ್‌ನಂತಹ ಕಾಂತೀಯ ವಸ್ತುಗಳು ಕಾಂತಕ್ಕೆ ಆಕರ್ಷಿತವಾಗುತ್ತವೆ. ಪ್ಲಾಸ್ಟಿಕ್, ಮರ ಮತ್ತು ರಬ್ಬರ್ ಅಕಾಂತೀಯ ವಸ್ತುಗಳಾಗಿವೆ.',
    applicationEn: 'Scrapyard electromagnetic cranes, magnetic compasses, electric motors.',
    applicationKn: 'ದಿಕ್ಸೂಚಿ, ವಿದ್ಯುತ್ ಮೋಟಾರ್ ಮತ್ತು ಕಬ್ಬಿಣ ಬೇರ್ಪಡಿಸುವ ಕ್ರೇನ್‌ಗಳು.',
    safetyEn: 'Keep strong magnets away from electronic screens, credit cards, and pacemakers.',
    safetyKn: 'ಪ್ರಬಲ ಕಾಂತಗಳನ್ನು ಮೊಬೈಲ್, ಎಟಿಎಂ ಕಾರ್ಡ್ ಮತ್ತು ವೈದ್ಯಕೀಯ ಉಪಕರಣಗಳಿಂದ ದೂರವಿಡಿ.',
    ytKn: 'ಕಾಂತಗಳೊಂದಿಗೆ ಆಟ ವಿಜ್ಞಾನ ಕನ್ನಡ Magnetism in Kannada',
    ytEn: 'Magnetism Magnetic vs Non Magnetic Materials Experiment',
    questions: [
      { qEn: 'Which group contains ONLY magnetic materials?', qKn: 'ಯಾವ ಗುಂಪಿನಲ್ಲಿ ಕಾಂತೀಯ ವಸ್ತುಗಳು ಮಾತ್ರ ಇವೆ?', opts: ['Iron, Nickel, Cobalt / ಕಬ್ಬಿಣ, ನಿಕ್ಕಲ್, ಕೋಬಾಲ್ಟ್', 'Plastic, Wood, Glass', 'Gold, Rubber, Paper'], ans: 0 },
      { qEn: 'What happens when two North poles of magnets are brought close?', qKn: 'ಎರಡು ಕಾಂತಗಳ ಉತ್ತರ ಧ್ರುವಗಳನ್ನು (N-N) ಹತ್ತಿರ ತಂದಾಗ ಏನಾಗುತ್ತದೆ?', opts: ['They repel each other / ವಿಕರ್ಷಿಸುತ್ತವೆ', 'They attract strongly', 'They melt'], ans: 0 },
      { qEn: 'In which direction does a freely suspended bar magnet come to rest?', qKn: 'ಸ್ವತಂತ್ರವಾಗಿ ತೂಗುಹಾಕಿದ ದಂಡಕಾಂತವು ಯಾವ ದಿಕ್ಕಿನಲ್ಲಿ ನಿಲ್ಲುತ್ತದೆ?', opts: ['North–South / ಉತ್ತರ–ದಕ್ಷಿಣ', 'East–West', 'Any random direction'], ans: 0 }
    ]
  },
  {
    id: 'motion',
    titleEn: 'F. Motion, Free Fall & Gravity',
    titleKn: 'F. ಚಲನೆ, ಮುಕ್ತ ಪತನ ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣೆ',
    objectiveEn: 'Explore kinematic equations of motion under uniform gravity (ignoring air resistance).',
    objectiveKn: 'ಗುರುತ್ವಾಕರ್ಷಣೆಯ ಅಡಿಯಲ್ಲಿ ವಸ್ತುವಿನ ಚಲನೆ, ವೇಗ ಮತ್ತು ಕ್ರಮಿಸಿದ ದೂರವನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ.',
    materialsEn: 'Initial velocity slider (u), drop height / time slider (t), gravity selector (Earth 9.8 m/s² vs Moon 1.6 m/s²).',
    materialsKn: 'ಆರಂಭಿಕ ವೇಗ ಸ್ಲೈಡರ್ (u), ಸಮಯ ಸ್ಲೈಡರ್ (t), ಗುರುತ್ವ ಆಯ್ಕೆ (ಭೂಮಿ 9.8 m/s² / ಚಂದ್ರ 1.6 m/s²).',
    stepsEn: ['Choose initial velocity (u) and time elapsed (t).', 'Switch between Earth and Moon gravity.', 'Read calculated displacement s = ut + ½gt² and final velocity v = u + gt.'],
    stepsKn: ['ಆರಂಭಿಕ ವೇಗ ಮತ್ತು ಸಮಯ ಹೊಂದಿಸಿ.', 'ಭೂಮಿ ಅಥವಾ ಚಂದ್ರನ ಗುರುತ್ವ ಆಯ್ಕೆಮಾಡಿ.', 'ವೇಗ (v) ಮತ್ತು ಸ್ಥಾನಪಲ್ಲಟ (s) ಗಮನಿಸಿ.'],
    explanationEn: 'Under ideal vacuum conditions (zero air drag), all objects accelerate downward at g = 9.8 m/s² on Earth regardless of mass. Real-world falling objects experience aerodynamic drag.',
    explanationKn: 'ನಿರ್ವಾತದಲ್ಲಿ ಎಲ್ಲಾ ವಸ್ತುಗಳು ಅವುಗಳ ದ್ರವ್ಯರಾಶಿಯನ್ನು ಲೆಕ್ಕಿಸದೆ ಭೂಮಿಯ ಕಡೆಗೆ ಸಮಾನ ವೇಗೋತ್ಕರ್ಷದಿಂದ (9.8 m/s²) ಬೀಳುತ್ತವೆ.',
    applicationEn: 'Satellite launches, parachute design, sports ball trajectories.',
    applicationKn: 'ಉಪಗ್ರಹ ಉಡಾವಣೆ ಮತ್ತು ಕ್ರೀಡಾ ಚೆಂಡಿನ ಪಥದ ಲೆಕ್ಕಾಚಾರ.',
    safetyEn: 'When performing drop tests from balconies or stairs, ensure the drop zone below is completely clear.',
    safetyKn: 'ಎತ್ತರದಿಂದ ವಸ್ತುಗಳನ್ನು ಬೀಳಿಸುವ ಪ್ರಯೋಗ ಮಾಡುವಾಗ ಕೆಳಗೆ ಯಾರೂ ಇಲ್ಲದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    ytKn: 'ಚಲನೆ ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣೆ ಕನ್ನಡ Motion and Gravity Kannada',
    ytEn: 'Equations of Motion and Free Fall Gravity Physics',
    questions: [
      { qEn: 'What is the approximate acceleration due to gravity on Earth?', qKn: 'ಭೂಮಿಯ ಮೇಲೆ ಗುರುತ್ವ ವೇಗೋತ್ಕರ್ಷದ (g) ಬೆಲೆ ಎಷ್ಟು?', opts: ['9.8 m/s²', '1.6 m/s²', '100 m/s²'], ans: 0 },
      { qEn: 'If an object starts from rest (u = 0), what is its speed after 2 seconds of free fall on Earth?', qKn: 'ನಿಶ್ಚಲ ಸ್ಥಿತಿಯಿಂದ ಬಿದ್ದ ವಸ್ತುವಿನ ವೇಗ 2 ಸೆಕೆಂಡ್ ನಂತರ ಎಷ್ಟಿರುತ್ತದೆ?', opts: ['19.6 m/s', '9.8 m/s', '0 m/s'], ans: 0 },
      { qEn: 'Which assumption is made in basic textbook free-fall equations?', qKn: 'ಮೂಲ ಮುಕ್ತ ಪತನ ಸೂತ್ರಗಳಲ್ಲಿ ಯಾವ ಊಹೆ ಮಾಡಲಾಗಿರುತ್ತದೆ?', opts: ['Air resistance is negligible / ಗಾಳಿಯ ಪ್ರತಿರೋಧ ನಗಣ್ಯ', 'Gravity changes every second', 'Mass doubles during fall'], ans: 0 }
    ]
  },
  {
    id: 'ph',
    titleEn: 'G. Acids, Bases & Universal pH Indicator',
    titleKn: 'G. ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು pH ಮಾಪಕ',
    objectiveEn: 'Test common illustrative solutions to observe pH values (0–14) and universal indicator color changes.',
    objectiveKn: 'ವಿವಿಧ ದ್ರಾವಣಗಳ pH ಮೌಲ್ಯ (0–14) ಮತ್ತು ಸೂಚಕದ ಬಣ್ಣ ಬದಲಾವಣೆಯನ್ನು ಗಮನಿಸಿ.',
    materialsEn: 'pH test strip, dropper, sample solutions (Lemon juice, Vinegar, Pure Water, Baking Soda, Soap water, Dilute NaOH).',
    materialsKn: 'pH ಪೇಪರ್, ಡ್ರಾಪರ್ ಮತ್ತು ಮಾದರಿ ದ್ರಾವಣಗಳು (ನಿಂಬೆ ರಸ, ವಿನೆಗರ್, ಶುದ್ಧ ನೀರು, ಅಡುಗೆ ಸೋಡಾ, ಸಾಬೂನು ನೀರು).',
    stepsEn: ['Select a sample liquid from the dropdown.', 'Observe the pH meter readout and indicator strip color change.', 'Note whether the substance is Acidic (pH less than 7), Neutral (pH 7), or Basic (pH greater than 7).'],
    stepsKn: ['ಪಟ್ಟಿಯಿಂದ ಒಂದು ದ್ರಾವಣ ಆಯ್ಕೆಮಾಡಿ.', 'pH ಮೌಲ್ಯ ಮತ್ತು ಬಣ್ಣದ ಬದಲಾವಣೆ ಗಮನಿಸಿ.', 'ಅದು ಆಮ್ಲವೇ, ಪ್ರತ್ಯಾಮ್ಲವೇ ಅಥವಾ ತಟಸ್ಥವೇ ಎಂದು ಗುರುತಿಸಿ.'],
    explanationEn: 'The pH scale measures hydrogen ion concentration from 0 to 14. Values shown are typical illustrative examples; real pH varies significantly with concentration and formulation.',
    explanationKn: 'pH ಮಾಪಕವು 0 ಯಿಂದ 14 ರವರೆಗೆ ದ್ರಾವಣದ ಆಮ್ಲೀಯತೆ ಅಥವಾ ಪ್ರತ್ಯಾಮ್ಲೀಯತೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ. 7 ತಟಸ್ಥ, 7 ಕ್ಕಿಂತ ಕಡಿಮೆ ಆಮ್ಲ, 7 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಪ್ರತ್ಯಾಮ್ಲ.',
    applicationEn: 'Agricultural soil pH testing, antacid tablets for stomach acidity, water quality monitoring.',
    applicationKn: 'ಕೃಷಿ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ, ಜೀರ್ಣಕ್ರಿಯೆ ಮತ್ತು ಕುಡಿಯುವ ನೀರಿನ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ.',
    safetyEn: 'WARNING: Never taste any laboratory chemical to test if it is sour! Never mix household bleach with acids or ammonia (releases toxic gas). Always wear eye protection.',
    safetyKn: 'ಎಚ್ಚರಿಕೆ: ಯಾವುದೇ ರಾಸಾಯನಿಕವನ್ನು ನಾಲಿಗೆಯಿಂದರುಚಿ ನೋಡಬೇಡಿ! ಬ್ಲೀಚಿಂಗ್ ದ್ರಾವಣವನ್ನು ಆಮ್ಲಗಳೊಂದಿಗೆ ಬೆರೆಸಬೇಡಿ.',
    ytKn: 'ಆಮ್ಲಗಳು ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು ಕನ್ನಡ Acids Bases pH Kannada',
    ytEn: 'Acids Bases and pH Scale Universal Indicator Experiment',
    questions: [
      { qEn: 'What is the pH of pure neutral water at 25°C?', qKn: '25°C ನಲ್ಲಿ ಶುದ್ಧ ತಟಸ್ಥ ನೀರಿನ pH ಮೌಲ್ಯ ಎಷ್ಟು?', opts: ['7.0', '1.0', '14.0'], ans: 0 },
      { qEn: 'Lemon juice turns blue litmus paper into which color?', qKn: 'ನಿಂಬೆ ರಸವು ನೀಲಿ ಲಿಟ್ಮಸ್ ಕಾಗದವನ್ನು ಯಾವ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿಸುತ್ತದೆ?', opts: ['Red (ಕೆಂಪು)', 'Green', 'Yellow'], ans: 0 },
      { qEn: 'Why should you NEVER taste unknown solutions in a lab?', qKn: 'ಪ್ರಯೋಗಾಲಯದಲ್ಲಿ ದ್ರಾವಣಗಳನ್ನು ಏಕೆ ರುಚಿ ನೋಡಬಾರದು?', opts: ['They can be corrosive or toxic / ಅವು ವಿಷಕಾರಿ ಅಥವಾ ಸುಡುವ ಗುಣ ಹೊಂದಿರಬಹುದು', 'It changes their pH', 'It wastes chemicals'], ans: 0 }
    ]
  },
  {
    id: 'optics',
    titleEn: 'H. Light Reflection & Refraction Ray Lab',
    titleKn: 'H. ಬೆಳಕಿನ ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ',
    objectiveEn: 'Adjust the angle of incidence of a laser beam hitting a glass/water boundary to verify the Law of Reflection and Snell’s Law of Refraction.',
    objectiveKn: 'ಬೆಳಕಿನ ಕಿರಣದ ಪತನ ಕೋನವನ್ನು ಬದಲಿಸಿ ಪ್ರತಿಫಲನ ಕೋನ ಮತ್ತು ವಕ್ರೀಭವನ ಕೋನವನ್ನು ಅಭ್ಯಸಿಸಿ.',
    materialsEn: 'Ray box laser pointer, protractor normal line, Air-to-Water / Air-to-Glass medium selector.',
    materialsKn: 'ಲೇಸರ್ ಬೆಳಕಿನ ಮೂಲ, ಕೋನಮಾಪಕ, ಗಾಳಿ-ನೀರು ಅಥವಾ ಗಾಳಿ-ಗಾಜಿನ ಮಾಧ್ಯಮ ಆಯ್ಕೆ.',
    stepsEn: ['Slide the Angle of Incidence (θi) from 0° to 75°.', 'Switch the lower medium between Water (n = 1.33) and Crown Glass (n = 1.52).', 'Compare the reflected ray angle (θr = θi) and bent refracted ray angle.'],
    stepsKn: ['ಪತನ ಕೋನವನ್ನು (0°–75°) ಬದಲಿಸಿ.', 'ನೀರು (n=1.33) ಅಥವಾ ಗಾಜು (n=1.52) ಮಾಧ್ಯಮ ಆಯ್ಕೆಮಾಡಿ.', 'ಪ್ರತಿಫಲಿತ ಮತ್ತು ವಕ್ರೀಭವನ ಕಿರಣಗಳ ಕೋನ ಗಮನಿಸಿ.'],
    explanationEn: 'By the Law of Reflection, Angle of Incidence equals Angle of Reflection (θi = θr). When light enters a denser medium (higher refractive index n), it slows down and bends toward the normal (n1·sinθ1 = n2·sinθ2).',
    explanationKn: 'ಪ್ರತಿಫಲನ ನಿಯಮದಂತೆ ಪತನ ಕೋನ ಮತ್ತು ಪ್ರತಿಫಲನ ಕೋನ ಸಮವಾಗಿರುತ್ತವೆ. ಬೆಳಕು ವಿರಳ ಮಾಧ್ಯಮದಿಂದ ಸಾಂದ್ರ ಮಾಧ್ಯಮಕ್ಕೆ ಚಲಿಸುವಾಗ ಲಂಬದ ಕಡೆಗೆ ಬಾಗುತ್ತದೆ (ವಕ್ರೀಭವನ).',
    applicationEn: 'Eyeglasses, camera lenses, fiber optic internet cables, periscopes.',
    applicationKn: 'ಕನ್ನಡಕದ ಮಸೂರಗಳು, ಕ್ಯಾಮೆರಾ ಮತ್ತು ಆಪ್ಟಿಕಲ್ ಫೈಬರ್ ಕೇಬಲ್‌ಗಳು.',
    safetyEn: 'Never shine laser pointers into anyone’s eyes or look directly at the sun through lenses or mirrors.',
    safetyKn: 'ಲೇಸರ್ ಬೆಳಕನ್ನು ಯಾರ ಕಣ್ಣಿಗೂ ಬಿಡಬೇಡಿ ಮತ್ತು ಮಸೂರದ ಮೂಲಕ ಸೂರ್ಯನನ್ನು ನೇರವಾಗಿ ನೋಡಬೇಡಿ.',
    ytKn: 'ಬೆಳಕಿನ ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ ಕನ್ನಡ Light Reflection Refraction Kannada',
    ytEn: 'Reflection and Refraction of Light Snell Law Ray Diagram',
    questions: [
      { qEn: 'If the angle of incidence on a plane mirror is 40°, what is the angle of reflection?', qKn: 'ಪತನ ಕೋನವು 40° ಆಗಿದ್ದರೆ, ಪ್ರತಿಫಲನ ಕೋನ ಎಷ್ಟಿರುತ್ತದೆ?', opts: ['40°', '80°', '20°'], ans: 0 },
      { qEn: 'When light travels from air into glass, how does it bend?', qKn: 'ಬೆಳಕು ಗಾಳಿಯಿಂದ ಗಾಜಿನೊಳಗೆ ಪ್ರವೇಶಿಸುವಾಗ ಹೇಗೆ ಬಾಗುತ್ತದೆ?', opts: ['Toward the normal / ಲಂಬದ ಕಡೆಗೆ', 'Away from the normal', 'Does not bend at 45°'], ans: 0 },
      { qEn: 'Which phenomenon causes a pencil partially immersed in water to look bent?', qKn: 'ನೀರಿನಲ್ಲಿ ಮುಳುಗಿಸಿದ ಪೆನ್ಸಿಲ್ ಮುರಿದಂತೆ ಕಾಣಲು ಕಾರಣವೇನು?', opts: ['Refraction of light / ಬೆಳಕಿನ ವಕ್ರೀಭವನ', 'Dispersion', 'Magnetism'], ans: 0 }
    ]
  },
  {
    id: 'pendulum',
    titleEn: 'I. Simple Pendulum & Time Period (Bonus Sim)',
    titleKn: 'I. ಸರಳ ಲೋಲಕ ಮತ್ತು ಆವರ್ತಕಾಲ (ಹೆಚ್ಚುವರಿ ಪ್ರಯೋಗ)',
    objectiveEn: 'Discover how string length (L) affects the time period (T) of a simple pendulum while bob mass does not.',
    objectiveKn: 'ಸರಳ ಲೋಲಕದ ದಾರದ ಉದ್ದವು (L) ಅದರ ಆವರ್ತಕಾಲದ (T) ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ ಎಂಬುದನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ.',
    materialsEn: 'Rigid stand, inextensible thread (0.2m to 2.0m), brass bob, digital stopwatch.',
    materialsKn: 'ಆಧಾರ ಸ್ತಂಭ, ದಾರ (0.2m–2.0m), ಲೋಹದ ಗುಂಡು ಮತ್ತು ಸ್ಟಾಪ್‌ವಾಚ್.',
    stepsEn: ['Adjust the String Length (L) slider.', 'Adjust Bob Mass (m) and observe that Time Period T = 2π√(L/g) remains independent of mass.', 'Note the time for 10 oscillations.'],
    stepsKn: ['ಲೋಲಕದ ದಾರದ ಉದ್ದ ಬದಲಿಸಿ.', 'ಗುಂಡಿನ ತೂಕ ಬದಲಿಸಿ ಆವರ್ತಕಾಲ ಬದಲಾಗುವುದಿಲ್ಲ ಎಂಬುದನ್ನು ಗಮನಿಸಿ.', '10 ಆಂದೋಲನಗಳ ಸಮಯ ಗಮನಿಸಿ.'],
    explanationEn: 'For small angles, the time period of a simple pendulum depends only on length L and gravity g: T = 2π√(L/g). Quadrupling the length doubles the time period.',
    explanationKn: 'ಸರಳ ಲೋಲಕದ ಆವರ್ತಕಾಲವು ದಾರದ ಉದ್ದ (L) ಮತ್ತು ಗುರುತ್ವದ (g) ಮೇಲೆ ಮಾತ್ರ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ, ಗುಂಡಿನ ತೂಕದ ಮೇಲಲ್ಲ.',
    applicationEn: 'Pendulum clocks, seismometers, metrology.',
    applicationKn: 'ಗಡಿಯಾರಗಳು ಮತ್ತು ಭೂಕಂಪ ಮಾಪಕಗಳು.',
    safetyEn: 'Release the bob gently without pushing so it swings in a single vertical plane.',
    safetyKn: 'ಲೋಲಕದ ಗುಂಡನ್ನು ತಳ್ಳದೆ ನಿಧಾನವಾಗಿ ಬಿಡಿ.',
    ytKn: 'ಸರಳ ಲೋಲಕ ಪ್ರಯೋಗ ಕನ್ನಡ Simple Pendulum Kannada',
    ytEn: 'Simple Pendulum Time Period Length Experiment Physics',
    questions: [
      { qEn: 'If you double the mass of the pendulum bob, what happens to its time period?', qKn: 'ಲೋಲಕದ ಗುಂಡಿನ ದ್ರವ್ಯರಾಶಿಯನ್ನು ದ್ವಿಗುಣಗೊಳಿಸಿದರೆ ಆವರ್ತಕಾಲ ಏನಾಗುತ್ತದೆ?', opts: ['Remains unchanged / ಬದಲಾಗುವುದಿಲ್ಲ', 'Doubles', 'Halves'], ans: 0 },
      { qEn: 'What happens to the time period if string length L increases?', qKn: 'ದಾರದ ಉದ್ದ ಹೆಚ್ಚಾದಂತೆ ಆವರ್ತಕಾಲ ಏನಾಗುತ್ತದೆ?', opts: ['Increases / ಹೆಚ್ಚಾಗುತ್ತದೆ', 'Decreases', 'Becomes zero'], ans: 0 },
      { qEn: 'Who discovered the isochronism of the pendulum?', qKn: 'ಲೋಲಕದ ನಿಯಮವನ್ನು ಮೊದಲು ಗುರುತಿಸಿದ ವಿಜ್ಞಾನಿ ಯಾರು?', opts: ['Galileo Galilei (ಗೆಲಿಲಿಯೋ)', 'Isaac Newton', 'Marie Curie'], ans: 0 }
    ]
  },
  {
    id: 'ohmslaw',
    titleEn: 'J. Ohm’s Law (V = I × R) Verification (Bonus Sim)',
    titleKn: 'J. ಓಮ್‌ನ ನಿಯಮ (V = I × R) ಪರಿಶೀಲನೆ',
    objectiveEn: 'Explore the linear relationship between Voltage (V), Current (I), and Resistance (R) in a conductor.',
    objectiveKn: 'ವಾಹಕದಲ್ಲಿ ವಿಭವಾಂತರ (V), ವಿದ್ಯುತ್ ಪ್ರವಾಹ (I) ಮತ್ತು ರೋಧದ (R) ನಡುವಿನ ಸಂಬಂಧವನ್ನು ಪರಿಶೀಲಿಸಿ.',
    materialsEn: 'Variable DC supply (0–12V), nichrome resistor (1Ω–20Ω), Ammeter, Voltmeter.',
    materialsKn: 'ವೋಲ್ಟೇಜ್ ನಿಯಂತ್ರಕ, ರೋಧಕ (1Ω–20Ω), ಅಮ್ಮೀಟರ್ ಮತ್ತು ವೋಲ್ಟ್‌ಮೀಟರ್.',
    stepsEn: ['Adjust Voltage (V) slider.', 'Adjust Resistance (R) slider.', 'Verify Current readout I = V / R in Amperes.'],
    stepsKn: ['ವೋಲ್ಟೇಜ್ (V) ಸ್ಲೈಡರ್ ಬದಲಿಸಿ.', 'ರೋಧ (R) ಸ್ಲೈಡರ್ ಬದಲಿಸಿ.', 'ವಿದ್ಯುತ್ ಪ್ರವಾಹ I = V / R ಲೆಕ್ಕಾಚಾರ ಗಮನಿಸಿ.'],
    explanationEn: 'At constant temperature, current flowing through an ohmic conductor is directly proportional to potential difference across its ends (V = I·R).',
    explanationKn: 'ಸ್ಥಿರ ತಾಪಮಾನದಲ್ಲಿ ವಾಹಕದ ಮೂಲಕ ಹರಿಯುವ ವಿದ್ಯುತ್ ಪ್ರವಾಹವು ಅದರ ತುದಿಗಳ ನಡುವಿನ ವಿಭವಾಂತರಕ್ಕೆ ನೇರ ಅನುಪಾತದಲ್ಲಿರುತ್ತದೆ (V = IR).',
    applicationEn: 'Designing mobile chargers, fan regulators, electric heaters.',
    applicationKn: 'ಮೊಬೈಲ್ ಚಾರ್ಜರ್, ಫ್ಯಾನ್ ರೆಗ್ಯುಲೇಟರ್ ಮತ್ತು ವಿದ್ಯುತ್ ಉಪಕರಣಗಳ ವಿನ್ಯಾಸ.',
    safetyEn: 'Do not allow high current to flow through low resistance for long periods as the resistor heats up.',
    safetyKn: 'ತಂತಿ ಅತಿಯಾಗಿ ಬಿಸಿಯಾಗುವುದನ್ನು ತಡೆಯಲು ಕಡಿಮೆ ರೋಧದಲ್ಲಿ ಹೆಚ್ಚು ಕಾಲ ವಿದ್ಯುತ್ ಹರಿಸಬೇಡಿ.',
    ytKn: 'ಓಮ್ ನ ನಿಯಮ ಕನ್ನಡ 10ನೇ ತರಗತಿ Ohms Law in Kannada',
    ytEn: 'Ohms Law Voltage Current Resistance Interactive Physics',
    questions: [
      { qEn: 'If V = 12 V and R = 4 Ω, what is the current I?', qKn: 'V = 12 V ಮತ್ತು R = 4 Ω ಆಗಿದ್ದರೆ, ವಿದ್ಯುತ್ ಪ್ರವಾಹ (I) ಎಷ್ಟು?', opts: ['3 A', '48 A', '0.33 A'], ans: 0 },
      { qEn: 'What is the SI unit of electrical resistance?', qKn: 'ವಿದ್ಯುತ್ ರೋಧದ SI ಏಕಮಾನ ಯಾವುದು?', opts: ['Ohm (Ω / ಓಮ್)', 'Watt', 'Joule'], ans: 0 },
      { qEn: 'How is a voltmeter connected across a resistor in a circuit?', qKn: 'ಮಂಡಲದಲ್ಲಿ ವೋಲ್ಟ್‌ಮೀಟರ್ ಅನ್ನು ಹೇಗೆ ಜೋಡಿಸಲಾಗುತ್ತದೆ?', opts: ['In parallel / ಸಮಾನಾಂತರವಾಗಿ', 'In series', 'Outside the circuit'], ans: 0 }
    ]
  },
  {
    id: 'density',
    titleEn: 'K. Density, Buoyancy & Archimedes Principle (Bonus Sim)',
    titleKn: 'K. ಸಾಂದ್ರತೆ, ಪ್ಲವನಶೀಲತೆ ಮತ್ತು ಆರ್ಕಿಮಿಡೀಸ್ ತತ್ವ',
    objectiveEn: 'Test why objects with density less than water (1.0 g/cm³) float while denser objects sink.',
    objectiveKn: 'ನೀರಿಗಿಂತ ಕಡಿಮೆ ಸಾಂದ್ರತೆಯ ವಸ್ತುಗಳು ಏಕೆ ತೇಲುತ್ತವೆ ಮತ್ತು ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆಯ ವಸ್ತುಗಳು ಏಕೆ ಮುಳುಗುತ್ತವೆ ಎಂದು ಪರೀಕ್ಷಿಸಿ.',
    materialsEn: 'Measuring cylinder with water (1.0 g/cm³), test blocks (Cork 0.24, Wood 0.6, Ice 0.92, Aluminum 2.7, Iron 7.8 g/cm³).',
    materialsKn: 'ನೀರಿರುವ ಅಳತೆ ಸಿಲಿಂಡರ್, ಬೆಂಡು, ಮರ, ಮಂಜುಗಡ್ಡೆ, ಕಬ್ಬಿಣದ ತುಂಡುಗಳು.',
    stepsEn: ['Adjust the Object Density slider from 0.2 g/cm³ to 8.0 g/cm³.', 'Observe the submerged depth of the block in the water column.', 'Check displaced water volume and buoyant force.'],
    stepsKn: ['ವಸ್ತುವಿನ ಸಾಂದ್ರತೆಯ ಸ್ಲೈಡರ್ ಬದಲಿಸಿ.', 'ನೀರಿನಲ್ಲಿ ವಸ್ತು ತೇಲುತ್ತದೆಯೇ ಅಥವಾ ಮುಳುಗುತ್ತದೆಯೇ ಗಮನಿಸಿ.', 'ಹೊರಚೆಲ್ಲಿದ ನೀರಿನ ಪ್ರಮಾಣ ನೋಡಿ.'],
    explanationEn: 'An object floats if its average density is less than the fluid density (1.0 g/cm³ for fresh water). Buoyant upward force equals the weight of displaced fluid (Archimedes’ Principle).',
    explanationKn: 'ವಸ್ತುವಿನ ಸಾಂದ್ರತೆಯು ನೀರಿನ ಸಾಂದ್ರತೆಗಿಂತ (1.0 g/cm³) ಕಡಿಮೆಯಿದ್ದರೆ ಅದು ತೇಲುತ್ತದೆ, ಹೆಚ್ಚಿದ್ದರೆ ಮುಳುಗುತ್ತದೆ.',
    applicationEn: 'Steel ships floating via hollow hulls, submarines, lactometers testing milk purity.',
    applicationKn: 'ಹಡಗುಗಳ ನಿರ್ಮಾಣ, ಜಲಾಂತರ್ಗಾಮಿ ನೌಕೆ ಮತ್ತು ಹಾಲಿನ ಶುದ್ಧತೆ ಅಳೆಯುವ ಲ್ಯಾಕ್ಟೋಮೀಟರ್.',
    safetyEn: 'Wipe spilled water around lab tables immediately to prevent slipping.',
    safetyKn: 'ಪ್ರಯೋಗದ ವೇಳೆ ಚೆಲ್ಲಿದ ನೀರನ್ನು ತಕ್ಷಣ ಒರೆಸಿ.',
    ytKn: 'ಸಾಂದ್ರತೆ ಮತ್ತು ಆರ್ಕಿಮಿಡೀಸ್ ತತ್ವ ಕನ್ನಡ Density Archimedes Kannada',
    ytEn: 'Density Floating and Sinking Archimedes Principle',
    questions: [
      { qEn: 'Why does an ice cube (density 0.92 g/cm³) float on liquid water (1.0 g/cm³)?', qKn: 'ಮಂಜುಗಡ್ಡೆಯು ನೀರಿನ ಮೇಲೆ ಏಕೆ ತೇಲುತ್ತದೆ?', opts: ['Ice is less dense than liquid water / ಮಂಜುಗಡ್ಡೆಯ ಸಾಂದ್ರತೆ ನೀರಿಗಿಂತ ಕಡಿಮೆ', 'Ice is heavier', 'Ice has no mass'], ans: 0 },
      { qEn: 'Will an iron block of density 7.8 g/cm³ float or sink in water?', qKn: '7.8 g/cm³ ಸಾಂದ್ರತೆಯ ಕಬ್ಬಿಣದ ತುಂಡು ನೀರಿನಲ್ಲಿ ಏನಾಗುತ್ತದೆ?', opts: ['Sink / ಮುಳುಗುತ್ತದೆ', 'Float on top', 'Evaporate'], ans: 0 },
      { qEn: 'What is the density of pure water at 4°C?', qKn: '4°C ನಲ್ಲಿ ಶುದ್ಧ ನೀರಿನ ಸಾಂದ್ರತೆ ಎಷ್ಟು?', opts: ['1.0 g/cm³ (1000 kg/m³)', '10 g/cm³', '0.1 g/cm³'], ans: 0 }
    ]
  },
  {
    id: 'sound',
    titleEn: 'L. Sound Waves: Pitch (Frequency) & Loudness (Amplitude) (Bonus Sim)',
    titleKn: 'L. ಶಬ್ದದ ತರಂಗಗಳು: ಆವೃತ್ತಿ ಮತ್ತು ಪಾರ (ಹೆಚ್ಚುವರಿ ಪ್ರಯೋಗ)',
    objectiveEn: 'Visualize how wave Frequency (Hz) controls pitch and Amplitude controls loudness on an oscilloscope.',
    objectiveKn: 'ಶಬ್ದ ತರಂಗದ ಆವೃತ್ತಿ (Frequency) ಮತ್ತು ಪಾರ (Amplitude) ಬದಲಾದಂತೆ ತರಂಗದ ಆಕಾರ ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ಎಂದು ವೀಕ್ಷಿಸಿ.',
    materialsEn: 'Tuning fork / signal generator, frequency slider (100 Hz – 1000 Hz), amplitude slider.',
    materialsKn: 'ಶ್ರುತಿ ಕವಲು (Tuning Fork), ಆವೃತ್ತಿ ಸ್ಲೈಡರ್ ಮತ್ತು ಪಾರ ಸ್ಲೈಡರ್.',
    stepsEn: ['Increase Frequency (Hz) to see more wave cycles packed together (higher pitch).', 'Increase Amplitude to see taller wave peaks (louder sound).', 'Read wavelength λ = v / f in air (v ≈ 343 m/s).'],
    stepsKn: ['ಆವೃತ್ತಿ (Hz) ಹೆಚ್ಚಿಸಿ ತರಂಗಗಳ ಸಂಖ್ಯೆ ಗಮನಿಸಿ.', 'ಪಾರ (Amplitude) ಹೆಚ್ಚಿಸಿ ತರಂಗದ ಎತ್ತರ ಗಮನಿಸಿ.', 'ತರಂಗಾಂತರ (λ) ಲೆಕ್ಕಾಚಾರ ಓದಿ.'],
    explanationEn: 'Sound is a mechanical longitudinal wave requiring a medium (cannot travel in vacuum). Pitch depends on frequency (vibrations per second, Hz), while loudness depends on amplitude.',
    explanationKn: 'ಶಬ್ದವು ಕಂಪನದಿಂದ ಉಂಟಾಗುತ್ತದೆ ಮತ್ತು ಚಲಿಸಲು ಮಾಧ್ಯಮದ ಅಗತ್ಯವಿದೆ (ನಿರ್ವಾತದಲ್ಲಿ ಚಲಿಸುವುದಿಲ್ಲ). ಆವೃತ್ತಿಯು ಕೀರಲು ಧ್ವನಿಯನ್ನು ಮತ್ತು ಪಾರವು ಶಬ್ದದ ಪ್ರಬಲತೆಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.',
    applicationEn: 'Musical instruments, ultrasound medical imaging, SONAR ocean mapping.',
    applicationKn: 'ಸಂಗೀತ ವಾದ್ಯಗಳು, ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನಿಂಗ್ ಮತ್ತು ಸೋನಾರ್ (SONAR).',
    safetyEn: 'Avoid prolonged exposure to sounds above 85 dB (especially through earphones) to protect eardrums.',
    safetyKn: 'ಕಿವಿಯ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಅತಿ ಹೆಚ್ಚಿನ ಶಬ್ದದಿಂದ (85 dB ಗಿಂತ ಹೆಚ್ಚು) ದೂರವಿರಿ.',
    ytKn: 'ಶಬ್ದ ವಿಜ್ಞಾನ ಪಾಠ ಕನ್ನಡ Sound Waves in Kannada',
    ytEn: 'Sound Waves Frequency Pitch and Amplitude Oscilloscope',
    questions: [
      { qEn: 'What is the audible frequency range for healthy human ears?', qKn: 'ಮನುಷ್ಯನ ಕಿವಿಗೆ ಕೇಳಿಸುವ ಶಬ್ದದ ಆವೃತ್ತಿಯ ವ್ಯಾಪ್ತಿ ಎಷ್ಟು?', opts: ['20 Hz to 20,000 Hz', '0 Hz to 5 Hz', 'Above 100,000 Hz'], ans: 0 },
      { qEn: 'Can sound waves travel through the vacuum of outer space?', qKn: 'ಬಾಹ್ಯಾಕಾಶದ ನಿರ್ವಾತದಲ್ಲಿ ಶಬ್ದ ಚಲಿಸಬಲ್ಲದೇ?', opts: ['No, sound needs a material medium / ಇಲ್ಲ, ಮಾಧ್ಯಮ ಬೇಕು', 'Yes, faster than light', 'Only loud sounds'], ans: 0 },
      { qEn: 'Which wave property determines the loudness of sound?', qKn: 'ಶಬ್ದದ ಪ್ರಬಲತೆಯನ್ನು (Loudness) ನಿರ್ಧರಿಸುವ ಗುಣ ಯಾವುದು?', opts: ['Amplitude (ಪಾರ)', 'Color', 'Refraction'], ans: 0 }
    ]
  }
];

/* ============================================================================
   3. 12 SCIENCE MATERIALS & APPARATUS GALLERY (Every item linked to a Sim)
   ============================================================================ */
const MATERIALS = [
  {
    id: 'mat-thermometer',
    nameEn: 'Laboratory & Clinical Thermometer',
    nameKn: 'ಪ್ರಯೋಗಾಲಯ ಮತ್ತು ವೈದ್ಯಕೀಯ ತಾಪಮಾನ ಮಾಪಕ',
    category: 'measurement',
    icon: '🌡️',
    principleEn: 'Works on uniform thermal expansion of mercury or colored alcohol inside a calibrated capillary glass tube.',
    principleKn: 'ಗಾಜಿನ ನಳಿಕೆಯಲ್ಲಿರುವ ಪಾದರಸ ಅಥವಾ ಆಲ್ಕೋಹಾಲ್ ಶಾಖಕ್ಕೆ ಹಿಗ್ಗುವ ತತ್ವದ ಮೇಲೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.',
    usageEn: 'Keep the bulb fully immersed in the substance being measured without touching the beaker bottom; read at eye level.',
    usageKn: 'ಬಲ್ಬ್ ದ್ರವದಲ್ಲಿ ಮುಳುಗಿರುವಂತೆ ಹಿಡಿದು (ತಳಕ್ಕೆ ತಾಗದಂತೆ) ಕಣ್ಣಿನ ನೇರಕ್ಕೆ ರೀಡಿಂಗ್ ಓದಿ.',
    appsEn: 'Measuring boiling/freezing points, chemical reaction temperatures, body fever.',
    safetyEn: 'Do not wash a hot thermometer in cold water; handle mercury spills with extreme care.',
    simId: 'thermometer',
    ytKn: 'ತಾಪಮಾನ ಮಾಪಕ ಬಳಸುವ ವಿಧಾನ ಕನ್ನಡ Laboratory Thermometer Kannada',
    ytEn: 'How to use a Laboratory Thermometer safely'
  },
  {
    id: 'mat-magnifying',
    nameEn: 'Magnifying Glass (Convex Hand Lens)',
    nameKn: 'ಭೂತಗನ್ನಡಿ (ಪೀನ ಮಸೂರ)',
    category: 'optics',
    icon: '🔍',
    principleEn: 'A biconvex lens refracts light rays to produce a virtual, erect, and magnified image when the object is placed within its focal length.',
    principleKn: 'ಪೀನ ಮಸೂರವು ಬೆಳಕಿನ ಕಿರಣಗಳನ್ನು ವಕ್ರೀಭವಿಸಿ ವಸ್ತುವಿನ ನೇರ ಮತ್ತು ದೊಡ್ಡದಾದ ಪ್ರತಿಬಿಂಬವನ್ನು ತೋರಿಸುತ್ತದೆ.',
    usageEn: 'Hold the lens close to the specimen (leaf veins, flower parts, crystal grains) and adjust distance for sharp focus.',
    usageKn: 'ಎಲೆಯ ನರಗಳು ಅಥವಾ ಹೂವಿನ ಭಾಗಗಳ ಹತ್ತಿರ ಹಿಡಿದು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವಂತೆ ದೂರ ಹೊಂದಿಸಿ.',
    appsEn: 'Botany field observation, insect study, reading fine print.',
    safetyEn: 'Never look at the Sun through a magnifying glass or focus sunlight onto skin/dry paper.',
    simId: 'optics',
    ytKn: 'ಪೀನ ಮಸೂರ ಭೂತಗನ್ನಡಿ ಪ್ರಯೋಗ ಕನ್ನಡ Convex Lens Kannada',
    ytEn: 'Convex Lens Magnifying Glass Ray Diagram Science'
  },
  {
    id: 'mat-microscope',
    nameEn: 'Compound Light Microscope',
    nameKn: 'ಸಂಯುಕ್ತ ಸೂಕ್ಷ್ಮದರ್ಶಕ',
    category: 'optics',
    icon: '🔬',
    principleEn: 'Uses two convex lens systems (Objective lens + Eyepiece lens) to multiply magnification (e.g., 10x × 40x = 400x) to view cells and microorganisms.',
    principleKn: 'ವಸ್ತು ಮಸೂರ ಮತ್ತು ನೇತ್ರ ಮಸೂರಗಳ ಸಂಯೋಜನೆಯಿಂದ ಸೂಕ್ಷ್ಮ ಜೀವಿಗಳನ್ನು ಮತ್ತು ಜೀವಕೋಶಗಳನ್ನು ನೂರಾರು ಪಟ್ಟು ದೊಡ್ಡದಾಗಿ ತೋರಿಸುತ್ತದೆ.',
    usageEn: 'Place stained glass slide on the stage, start with low-power objective, adjust mirror illumination, then focus with coarse and fine knobs.',
    usageKn: 'ಸ್ಲೈಡ್ ಅನ್ನು ವೇದಿಕೆಯ ಮೇಲಿಟ್ಟು, ಕನ್ನಡಿ ಬೆಳಕು ಹೊಂದಿಸಿ, ಒರಟು ಮತ್ತು ಸೂಕ್ಷ್ಮ ತಿರುಪುಗಳಿಂದ ಫೋಕಸ್ ಮಾಡಿ.',
    appsEn: 'Observing onion peel cells, stomata, pond water protozoa, blood smears.',
    safetyEn: 'Carry with both hands (one on arm, one under base); never force the objective lens down onto the glass slide.',
    simId: 'plant',
    ytKn: 'ಸೂಕ್ಷ್ಮದರ್ಶಕದ ಭಾಗಗಳು ಮತ್ತು ಬಳಕೆ ಕನ್ನಡ Compound Microscope Kannada',
    ytEn: 'How to use a Compound Microscope Step by Step'
  },
  {
    id: 'mat-magnet',
    nameEn: 'Bar Magnet & Horseshoe Magnet',
    nameKn: 'ದಂಡಕಾಂತ ಮತ್ತು ಕುದುರೆ ಲಾಳಾಕೃತಿಯ ಕಾಂತ',
    category: 'electricity',
    icon: '🧲',
    principleEn: 'Produces an external magnetic field from North to South pole; attracts ferromagnetic substances (Iron, Nickel, Cobalt).',
    principleKn: 'ಕಾಂತೀಯ ಕ್ಷೇತ್ರವನ್ನು ಹೊಂದಿದ್ದು ಕಬ್ಬಿಣ, ನಿಕ್ಕಲ್ ಮತ್ತು ಕೋಬಾಲ್ಟ್ ವಸ್ತುಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.',
    usageEn: 'Bring poles near iron filings or test objects; suspend freely with thread to find North–South direction.',
    usageKn: 'ಕಬ್ಬಿಣದ ರಜಗಳ ಹತ್ತಿರ ತಂದು ಕಾಂತೀಯ ಬಲರೇಖೆಗಳನ್ನು ಗಮನಿಸಿ.',
    appsEn: 'Demonstrating magnetic field lines, compass needles, dynamos.',
    safetyEn: 'Do not drop, hammer, or heat magnets as they lose magnetism; store with soft iron keepers.',
    simId: 'magnetism',
    ytKn: 'ಕಾಂತೀಯ ಬಲರೇಖೆಗಳು ಪ್ರಯೋಗ ಕನ್ನಡ Bar Magnet Experiment Kannada',
    ytEn: 'Bar Magnet Field Lines Iron Filings Experiment'
  },
  {
    id: 'mat-circuit',
    nameEn: 'Battery, Wire, Switch & Bulb Kit',
    nameKn: 'ಬ್ಯಾಟರಿ, ತಂತಿ, ಸ್ವಿಚ್ ಮತ್ತು ಬಲ್ಬ್ ಕಿಟ್',
    category: 'electricity',
    icon: '💡',
    principleEn: 'Converts chemical energy in the cell into electrical energy and then into light and heat energy in the bulb filament.',
    principleKn: 'ಶುಷ್ಕಕೋಶದ ರಾಸಾಯನಿಕ ಶಕ್ತಿಯನ್ನು ವಿದ್ಯುತ್ ಶಕ್ತಿಯನ್ನಾಗಿ ಮತ್ತು ಬಲ್ಬ್‌ನಲ್ಲಿ ಬೆಳಕಿನ ಶಕ್ತಿಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ.',
    usageEn: 'Connect positive (+) and negative (-) terminals through insulated copper wires and a key switch to the bulb holder.',
    usageKn: 'ಬ್ಯಾಟರಿಯ ಧನ (+) ಮತ್ತು ಋಣ (-) ತುದಿಗಳನ್ನು ತಂತಿ ಮತ್ತು ಸ್ವಿಚ್ ಮೂಲಕ ಬಲ್ಬ್‌ಗೆ ಜೋಡಿಸಿ.',
    appsEn: 'Testing conductors vs insulators, series and parallel circuits, Ohm’s law.',
    safetyEn: 'Never short-circuit battery terminals directly with a wire without a load/bulb (wire gets very hot).',
    simId: 'circuit',
    ytKn: 'ಸರಳ ವಿದ್ಯುತ್ ಮಂಡಲ ನಿರ್ಮಾಣ ಕನ್ನಡ Simple Circuit Kit Kannada',
    ytEn: 'Building Simple Series and Parallel Circuits for Students'
  },
  {
    id: 'mat-cylinder',
    nameEn: 'Graduated Measuring Cylinder',
    nameKn: 'ಅಳತೆ ಸಿಲಿಂಡರ್ (Graduated Cylinder)',
    category: 'measurement',
    icon: '🧪',
    principleEn: 'Measures liquid volume in milliliters (mL) and finds the volume of irregular solids via water displacement.',
    principleKn: 'ದ್ರವಗಳ ಗಾತ್ರವನ್ನು ಮಿಲಿಲೀಟರ್‌ಗಳಲ್ಲಿ (mL) ಅಳೆಯಲು ಮತ್ತು ಅನಿಯಮಿತ ಘನವಸ್ತುಗಳ ಗಾತ್ರವನ್ನು ನೀರಿನ ಸ್ಥಾನಪಲ್ಲಟದಿಂದ ಕಂಡುಹಿಡಿಯಲು ಬಳಸಲಾಗುತ್ತದೆ.',
    usageEn: 'Place on a flat table and read the bottom of the curved liquid meniscus at eye level.',
    usageKn: 'ಸಮತಟ್ಟಾದ ಮೇಜಿನ ಮೇಲಿಟ್ಟು ದ್ರವದ ಕೆಳಮುಖ ವಕ್ರತೆಯ (Meniscus) ಮಟ್ಟವನ್ನು ಕಣ್ಣಿನ ನೇರಕ್ಕೆ ಓದಿ.',
    appsEn: 'Preparing chemical solutions, finding rock density (d = m/V).',
    safetyEn: 'Do not use a measuring cylinder as a reaction vessel or heat it over a flame.',
    simId: 'density',
    ytKn: 'ಅಳತೆ ಸಿಲಿಂಡರ್ ಬಳಕೆ ಮತ್ತು ಸಾಂದ್ರತೆ ಕನ್ನಡ Measuring Cylinder Kannada',
    ytEn: 'How to Read a Meniscus Graduated Cylinder Volume Displacement'
  },
  {
    id: 'mat-balance',
    nameEn: 'Spring Balance & Beam Balance',
    nameKn: 'ಸ್ಪ್ರಿಂಗ್ ತಕ್ಕಡಿ ಮತ್ತು ಭೌತಿಕ ತಕ್ಕಡಿ',
    category: 'measurement',
    icon: '⚖️',
    principleEn: 'Beam balance compares unknown mass with standard masses; Spring balance measures weight (gravitational force) via Hooke’s law.',
    principleKn: 'ಭೌತಿಕ ತಕ್ಕಡಿಯು ವಸ್ತುವಿನ ದ್ರವ್ಯರಾಶಿಯನ್ನು (Mass) ಮತ್ತು ಸ್ಪ್ರಿಂಗ್ ತಕ್ಕಡಿಯು ಗುರುತ್ವ ಬಲವನ್ನು (Weight) ಅಳೆಯುತ್ತದೆ.',
    usageEn: 'Check zero error before hanging or placing the object on the pan.',
    usageKn: 'ವಸ್ತುವನ್ನು ತೂಗುವ ಮೊದಲು ಸೂಚಕವು ಶೂನ್ಯ (0) ಮಟ್ಟದಲ್ಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.',
    appsEn: 'Weighing chemicals, verifying Archimedes upward thrust loss of weight.',
    safetyEn: 'Do not overload beyond the maximum gram/Newton capacity of the spring.',
    simId: 'motion',
    ytKn: 'ಸ್ಪ್ರಿಂಗ್ ತಕ್ಕಡಿ ಪ್ರಯೋಗ ಕನ್ನಡ Spring Balance Experiment Kannada',
    ytEn: 'Mass vs Weight Beam Balance and Spring Balance Lab'
  },
  {
    id: 'mat-ph',
    nameEn: 'Litmus & Universal pH Indicator Paper',
    nameKn: 'ಲಿಟ್ಮಸ್ ಮತ್ತು pH ಸೂಚಕ ಕಾಗದ',
    category: 'chemistry',
    icon: '🎨',
    principleEn: 'Impregnated with weak organic dyes that change color across specific hydrogen ion (H+) concentrations (pH 1 to 14).',
    principleKn: 'ದ್ರಾವಣದ ಆಮ್ಲೀಯ ಅಥವಾ ಪ್ರತ್ಯಾಮ್ಲೀಯ ಗುಣಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಬಣ್ಣ ಬದಲಾಯಿಸುವ ನೈಸರ್ಗಿಕ ಮತ್ತು ರಾಸಾಯನಿಕ ವರ್ಣದ್ರವ್ಯಗಳನ್ನು ಹೊಂದಿದೆ.',
    usageEn: 'Transfer ONE drop of test solution onto a dry pH strip using a clean glass rod and match against the color chart.',
    usageKn: 'ಗಾಜಿನ ಕಡ್ಡಿಯ ಸಹಾಯದಿಂದ ಒಂದು ಹನಿ ದ್ರಾವಣವನ್ನು ಕಾಗದದ ಮೇಲೆ ಹಾಕಿ ಬಣ್ಣದ ಪಟ್ಟಿಯೊಂದಿಗೆ ಹೋಲಿಸಿ.',
    appsEn: 'Classifying acids, bases, neutral salts, soil and water testing.',
    safetyEn: 'Use forceps to hold strips; never dip the entire indicator booklet into chemical bottles.',
    simId: 'ph',
    ytKn: 'ಲಿಟ್ಮಸ್ ಮತ್ತು ಪಿಎಚ್ ಪೇಪರ್ ಪರೀಕ್ಷೆ ಕನ್ನಡ pH Paper Test Kannada',
    ytEn: 'How to use Litmus Paper and Universal pH Indicator Strips'
  },
  {
    id: 'mat-lens-mirror',
    nameEn: 'Concave/Convex Mirrors, Lenses & Glass Prism',
    nameKn: 'ಮಸೂರಗಳು, ದರ್ಪಣಗಳು ಮತ್ತು ಗಾಜಿನ ಪಟ್ಟಕ (Prism)',
    category: 'optics',
    icon: '🌈',
    principleEn: 'Mirrors reflect light to form real/virtual images; lenses refract light; a triangular prism disperses white light into VIBGYOR.',
    principleKn: 'ದರ್ಪಣಗಳು ಬೆಳಕನ್ನು ಪ್ರತಿಫಲಿಸುತ್ತವೆ, ಮಸೂರಗಳು ವಕ್ರೀಭವಿಸುತ್ತವೆ ಮತ್ತು ಪಟ್ಟಕವು ಬಿಳಿ ಬೆಳಕನ್ನು ಏಳು ಬಣ್ಣಗಳಾಗಿ (VIBGYOR) ವಿಭಜಿಸುತ್ತದೆ.',
    usageEn: 'Mount on optical bench stands and align with a screen and candle/LED source.',
    usageKn: 'ಮಸೂರದ ಸ್ಟ್ಯಾಂಡ್ ಮೇಲೆ ಅಳವಡಿಸಿ ಪರದೆಯ ಮೇಲೆ ಪ್ರತಿಬಿಂಬವನ್ನು ಪಡೆಯಿರಿ.',
    appsEn: 'Telescopes, vehicle rear-view convex mirrors, dentist concave mirrors, spectroscopy.',
    safetyEn: 'Handle glass edges carefully to avoid cuts.',
    simId: 'optics',
    ytKn: 'ಗಾಜಿನ ಪಟ್ಟಕ ಮತ್ತು ಮಸೂರಗಳ ಪ್ರಯೋಗ ಕನ್ನಡ Prism Lens Experiment Kannada',
    ytEn: 'Concave Convex Mirrors Lenses and Glass Prism Dispersion'
  },
  {
    id: 'mat-pulley',
    nameEn: 'Simple Machines: Pulley & Lever Kit',
    nameKn: 'ಸರಳ ಯಂತ್ರಗಳು: ರಾಟೆ ಮತ್ತು ಸನ್ನೆಕೋಲು',
    category: 'chemistry',
    icon: '⚙️',
    principleEn: 'Provides Mechanical Advantage (MA = Load / Effort) or changes the direction of applied force to make work easier.',
    principleKn: 'ಬಲದ ದಿಕ್ಕನ್ನು ಬದಲಾಯಿಸುವ ಮೂಲಕ ಅಥವಾ ಕಡಿಮೆ ಬಲದಿಂದ ಹೆಚ್ಚಿನ ಭಾರ ಎತ್ತಲು (ಯಾಂತ್ರಿಕ ಲಾಭ) ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    usageEn: 'Pass cord over the grooved pulley wheel or balance a meter scale on a fulcrum wedge.',
    usageKn: 'ರಾಟೆಯ ಚಕ್ರದ ಮೇಲೆ ಹಗ್ಗವನ್ನು ಹಾಯಿಸಿ ಭಾರವನ್ನು ಎತ್ತಿರಿ ಅಥವಾ ಆಧಾರ ಬಿಂದುವಿನ ಮೇಲೆ ಸನ್ನೆಕೋಲನ್ನು ಸಮತೋಲನಗೊಳಿಸಿ.',
    appsEn: 'Drawing water from wells, cranes, seesaws, scissors, wheelbarrows.',
    safetyEn: 'Keep fingers away from the pinch point between the cord and pulley groove.',
    simId: 'motion',
    ytKn: 'ಸರಳ ಯಂತ್ರಗಳು ರಾಟೆ ಮತ್ತು ಸನ್ನೆ ಕನ್ನಡ Pulley and Lever Kannada',
    ytEn: 'Simple Machines Levers and Pulleys Mechanical Advantage'
  },
  {
    id: 'mat-compass',
    nameEn: 'Magnetic Mariner’s Compass',
    nameKn: 'ಕಾಂತೀಯ ದಿಕ್ಸೂಚಿ (Magnetic Compass)',
    category: 'electricity',
    icon: '🧭',
    principleEn: 'A magnetized needle pivoted at its center of gravity aligns with Earth’s geomagnetic field or local current fields (Oersted experiment).',
    principleKn: 'ತಿರುಗುವ ಕಾಂತೀಯ ಸೂಜಿಯು ಭೂಮಿಯ ಕಾಂತೀಯ ಕ್ಷೇತ್ರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಉತ್ತರ-ದಕ್ಷಿಣ ದಿಕ್ಕನ್ನು ತೋರಿಸುತ್ತದೆ.',
    usageEn: 'Lay flat on a non-metallic surface away from iron tables or magnets and let the needle settle.',
    usageKn: 'ಕಬ್ಬಿಣದ ವಸ್ತುಗಳಿಂದ ದೂರವಿರುವ ಸಮತಟ್ಟಾದ ಜಾಗದಲ್ಲಿ ಇಟ್ಟು ಸೂಜಿ ನಿಲ್ಲುವ ದಿಕ್ಕನ್ನು ಗಮನಿಸಿ.',
    appsEn: 'Navigation, plotting magnetic field lines around bar magnets and current-carrying wires.',
    safetyEn: 'Do not place very close to strong neodymium magnets as it can reverse needle polarity.',
    simId: 'magnetism',
    ytKn: 'ದಿಕ್ಸೂಚಿ ಮತ್ತು ಕಾಂತೀಯ ಕ್ಷೇತ್ರ ಕನ್ನಡ Magnetic Compass Kannada',
    ytEn: 'How a Magnetic Compass Works and Oersted Experiment'
  },
  {
    id: 'mat-stopwatch',
    nameEn: 'Digital & Mechanical Lab Stopwatch',
    nameKn: 'ಸ್ಟಾಪ್‌ವಾಚ್ (ಕಾಲಮಾಪಕ)',
    category: 'measurement',
    icon: '⏱️',
    principleEn: 'Measures time intervals accurately down to 0.01 seconds using a quartz crystal oscillator or mechanical escapement.',
    principleKn: 'ಪ್ರಯೋಗಗಳಲ್ಲಿ ಸಮಯದ ಅಂತರವನ್ನು ಸೆಕೆಂಡಿನ ನೂರನೇ ಒಂದು ಭಾಗದಷ್ಟು ನಿಖರವಾಗಿ ಅಳೆಯಲು ಬಳಸಲಾಗುತ್ತದೆ.',
    usageEn: 'Press Start/Stop at the reference point of oscillation and Reset to zero before the next trial.',
    usageKn: 'ಲೋಲಕದ ಚಲನೆ ಪ್ರಾರಂಭವಾದಾಗ Start ಒತ್ತಿ, ನಿಗದಿತ ಆಂದೋಲನಗಳ ನಂತರ Stop ಒತ್ತಿ ಸಮಯ ಕುರಿತುಕೊಳ್ಳಿ.',
    appsEn: 'Simple pendulum time period, reaction rate timing, speed measurement.',
    safetyEn: 'Keep dry and avoid dropping on hard floors.',
    simId: 'pendulum',
    ytKn: 'ಲೋಲಕದ ಆವರ್ತಕಾಲ ಮತ್ತು ಸ್ಟಾಪ್ ವಾಚ್ ಕನ್ನಡ Stopwatch Pendulum Kannada',
    ytEn: 'Using a Stopwatch to Measure Pendulum Time Period'
  }
];

/* ============================================================================
   4. 20 SCIENTISTS GALLERY (10 Indian + 10 International, Verified Details)
   ============================================================================ */
const SCIENTISTS = [
  // --- 10 INDIAN SCIENTISTS ---
  {
    nameEn: 'Sir C. V. Raman',
    nameKn: 'ಸರ್ ಸಿ. ವಿ. ರಾಮನ್',
    dates: '7 Nov 1888 – 21 Nov 1970',
    origin: 'Indian',
    fieldEn: 'Physics (Optics & Acoustics)',
    fieldKn: 'ಭೌತಶಾಸ್ತ್ರ (ಬೆಳಕು ಮತ್ತು ಶಬ್ದ)',
    icon: '🌈',
    bioEn: 'Born in Tiruchirappalli and worked extensively in Kolkata and at IISc Bengaluru. He discovered that when light traverses a transparent material, some deflected light changes wavelength.',
    bioKn: 'ತಿರುಚಿರಾಪಳ್ಳಿಯಲ್ಲಿ ಜನಿಸಿ ಕೊಲ್ಕತ್ತಾ ಹಾಗೂ ಬೆಂಗಳೂರಿನ ಭಾರತೀಯ ವಿಜ್ಞಾನ ಸಂಸ್ಥೆಯಲ್ಲಿ (IISc) ಸಂಶೋಧನೆ ನಡೆಸಿದರು. ಬೆಳಕಿನ ಚದುರುವಿಕೆಯ ಐತಿಹಾಸಿಕ ಆವಿಷ್ಕಾರ ಮಾಡಿದರು.',
    contribEn: 'Discovery of the Raman Effect (28 February 1928, celebrated as National Science Day in India) and acoustics of Indian musical drums (tablas/mridangam).',
    contribKn: 'ರಾಮನ್ ಪರಿಣಾಮದ (Raman Effect) ಆವಿಷ್ಕಾರ (ಫೆಬ್ರವರಿ 28 ರಾಷ್ಟ್ರೀಯ ವಿಜ್ಞಾನ ದಿನ) ಮತ್ತು ಭಾರತೀಯ ಸಂಗೀತ ವಾದ್ಯಗಳ ಧ್ವನಿ ಸಂಶೋಧನೆ.',
    awardsEn: 'Nobel Prize in Physics (1930), Bharat Ratna (1954), Lenin Peace Prize (1957).',
    factEn: 'He was inspired to study light scattering after questioning why the Mediterranean Sea looks deep blue—proving it was molecular scattering, not just sky reflection.',
    activityEn: 'Shine a flashlight through clear water vs water with two drops of milk to observe light scattering (Tyndall/Rayleigh scattering).',
    simId: 'optics',
    sourceUrl: 'https://www.nobelprize.org/prizes/physics/1930/raman/biographical/',
    ytKn: 'ಸರ್ ಸಿ ವಿ ರಾಮನ್ ಜೀವನ ಚರಿತ್ರೆ ಕನ್ನಡ CV Raman in Kannada',
    ytEn: 'CV Raman and the Raman Effect Explained for Students'
  },
  {
    nameEn: 'Dr. A. P. J. Abdul Kalam',
    nameKn: 'ಡಾ. ಎ. ಪಿ. ಜೆ. ಅಬ್ದುಲ್ ಕಲಾಂ',
    dates: '15 Oct 1931 – 27 Jul 2015',
    origin: 'Indian',
    fieldEn: 'Aerospace Engineering & Missile Technology',
    fieldKn: 'ಬಾಹ್ಯಾಕಾಶ ಮತ್ತು ಕ್ಷಿಪಣಿ ತಂತ್ರಜ್ಞಾನ',
    icon: '🚀',
    bioEn: 'Born in Rameswaram, Tamil Nadu, he served as Project Director at ISRO and Chief Executive of DRDO’s Integrated Guided Missile Development Programme before serving as the 11th President of India (2002–2007).',
    bioKn: 'ರಾಮೇಶ್ವರಂನಲ್ಲಿ ಜನಿಸಿದ ಇವರು ಇಸ್ರೋ (ISRO) ಮತ್ತು ಡಿಆರ್‌ಡಿಒ (DRDO) ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಭಾರತದ ಬಾಹ್ಯಾಕಾಶ ಮತ್ತು ಕ್ಷಿಪಣಿ ಯೋಜನೆಗಳನ್ನು ಮುನ್ನಡೆಸಿ ಭಾರತದ 11ನೇ ರಾಷ್ಟ್ರಪತಿಗಳಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಿದರು.',
    contribEn: 'Directed India’s first indigenous Satellite Launch Vehicle (SLV-III) which deployed the Rohini satellite in 1980; led Agni and Prithvi missile systems; co-developed the low-cost Kalam-Raju coronary stent.',
    contribKn: 'ಭಾರತದ ಮೊದಲ ಸ್ವದೇಶಿ ಉಪಗ್ರಹ ಉಡಾವಣಾ ವಾಹನ (SLV-III), ಅಗ್ನಿ ಮತ್ತು ಪೃಥ್ವಿ ಕ್ಷಿಪಣಿಗಳ ಅಭಿವೃದ್ಧಿ ಹಾಗೂ ಕಡಿಮೆ ವೆಚ್ಚದ ಕಲಾಂ-ರಾಜು ಹೃದಯ ಸ್ಟೆಂಟ್ ಆವಿಷ್ಕಾರ.',
    awardsEn: 'Bharat Ratna (1997), Padma Vibhushan (1990), Padma Bhushan (1981).',
    factEn: 'Known fondly as the "Missile Man of India" and the "People’s President," he loved interacting with school students across India.',
    activityEn: 'Build a balloon rocket along a taut string using a drinking straw to demonstrate Newton’s Third Law of Motion (action-reaction thrust).',
    simId: 'motion',
    sourceUrl: 'https://www.isro.gov.in/',
    ytKn: 'ಅಬ್ದುಲ್ ಕಲಾಂ ಜೀವನ ಚರಿತ್ರೆ ಮತ್ತು ವಿಜ್ಞಾನ ಕನ್ನಡ APJ Abdul Kalam Kannada',
    ytEn: 'Dr APJ Abdul Kalam SLV III and Missile Science Documentary'
  },
  {
    nameEn: 'Sir Jagadish Chandra Bose',
    nameKn: 'ಸರ್ ಜಗದೀಶ್ ಚಂದ್ರ ಬೋಸ್',
    dates: '30 Nov 1858 – 23 Nov 1937',
    origin: 'Indian',
    fieldEn: 'Physics (Millimeter Radio Waves) & Plant Physiology',
    fieldKn: 'ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ಸಸ್ಯ ಶರೀರಕ್ರಿಯೆ',
    icon: '🌱',
    bioEn: 'A polymath physicist and biologist who pioneered the investigation of radio and microwave optics and demonstrated electrical signaling in plant tissues.',
    bioKn: 'ರೇಡಿಯೋ ತರಂಗಗಳ ಸಂಶೋಧನೆ ಹಾಗೂ ಸಸ್ಯಗಳಿಗೂ ಸಂವೇದನೆ ಮತ್ತು ಜೀವವಿದೆ ಎಂದು ವೈಜ್ಞಾನಿಕವಾಗಿ ಸಾಬೀತುಪಡಿಸಿದ ಭಾರತದ ಮಹಾನ್ ವಿಜ್ಞಾನಿ.',
    contribEn: 'Invented the Crescograph to measure plant growth up to 1/100,000th of an inch and demonstrated wireless millimeter-wave signaling in 1895 in Kolkata.',
    contribKn: 'ಸಸ್ಯಗಳ ಸೂಕ್ಷ್ಮ ಬೆಳವಣಿಗೆಯನ್ನು ಅಳೆಯುವ ಕ್ರೆಸ್ಕೋಗ್ರಾಫ್ (Crescograph) ಆವಿಷ್ಕಾರ ಮತ್ತು 1895 ರಲ್ಲಿ ನಿಸ್ತಂತು ರೇಡಿಯೋ ತರಂಗಗಳ ಪ್ರದರ್ಶನ.',
    awardsEn: 'Fellow of the Royal Society (1920), Companion of the Order of the Indian Empire (1903), IEEE Milestone in Electrical Engineering (2012).',
    factEn: 'He refused to patent his wireless semiconductorgalena receiver detector, believing scientific knowledge should be open to all humanity.',
    activityEn: 'Observe phototropism by placing a sprouting bean plant near a window and measuring how its stem bends toward light over 5 days.',
    simId: 'plant',
    sourceUrl: 'https://www.boseinstitute.res.in/',
    ytKn: 'ಜಗದೀಶ್ ಚಂದ್ರ ಬೋಸ್ ಕ್ರೆಸ್ಕೋಗ್ರಾಫ್ ಕನ್ನಡ JC Bose Kannada',
    ytEn: 'Jagadish Chandra Bose Crescograph and Radio Waves'
  },
  {
    nameEn: 'Dr. Homi Jehangir Bhabha',
    nameKn: 'ಡಾ. ಹೋಮಿ ಜಹಾಂಗೀರ್ ಭಾಭಾ',
    dates: '30 Oct 1909 – 24 Jan 1966',
    origin: 'Indian',
    fieldEn: 'Nuclear Physics & Cosmic Rays',
    fieldKn: 'ಪರಮಾಣು ಭೌತಶಾಸ್ತ್ರ',
    icon: '⚛️',
    bioEn: 'Theoretical physicist who founded the Tata Institute of Fundamental Research (TIFR) in 1945 and the Atomic Energy Establishment, Trombay (now BARC).',
    bioKn: 'ಭಾರತದ ಪರಮಾಣು ಶಕ್ತಿ ಕಾರ್ಯಕ್ರಮದ ಪಿತಾಮಹ ಹಾಗೂ ಟಾಟಾ ಮೂಲಭೂತ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆಯ (TIFR) ಸಂಸ್ಥಾಪಕರು.',
    contribEn: 'Derived the correct expression for positron-electron scattering (Bhabha scattering) and formulated India’s three-stage nuclear power programme utilizing thorium reserves.',
    contribKn: 'ಭಾಭಾ ಸ್ಕ್ಯಾಟರಿಂಗ್ ಸಿದ್ಧಾಂತ ಮತ್ತು ಭಾರತದ ಮೂರು ಹಂತದ ಪರಮಾಣು ವಿದ್ಯುತ್ ಯೋಜನೆಯ ರೂವಾರಿ.',
    awardsEn: 'Fellow of the Royal Society (1941), Adams Prize (1942), Padma Bhushan (1954).',
    factEn: 'Under his leadership, Asia’s first nuclear research reactor, APSARA, achieved criticality at Trombay in August 1956.',
    activityEn: 'Explore atomic structure and particle motion using the Particle Model simulation.',
    simId: 'particles',
    sourceUrl: 'https://www.tifr.res.in/',
    ytKn: 'ಹೋಮಿ ಜಹಾಂಗೀರ್ ಭಾಭಾ ಜೀವನ ಚರಿತ್ರೆ ಕನ್ನಡ Homi Bhabha Kannada',
    ytEn: 'Homi J Bhabha Father of Indian Nuclear Programme'
  },
  {
    nameEn: 'Dr. Vikram Ambalal Sarabhai',
    nameKn: 'ಡಾ. ವಿಕ್ರಮ್ ಅಂಬಾಲಾಲ್ ಸಾರಾಭಾಯ್',
    dates: '12 Aug 1919 – 30 Dec 1971',
    origin: 'Indian',
    fieldEn: 'Space Science & Cosmic Ray Physics',
    fieldKn: 'ಬಾಹ್ಯಾಕಾಶ ವಿಜ್ಞಾನ',
    icon: '🛰️',
    bioEn: 'Born in Ahmedabad, he founded the Physical Research Laboratory (PRL) at age 28 and spearheaded the establishment of the Indian Space Research Organisation (ISRO).',
    bioKn: 'ಭಾರತೀಯ ಬಾಹ್ಯಾಕಾಶ ಕಾರ್ಯಕ್ರಮದ (ISRO) ಪಿತಾಮಹ. ಅಹಮದಾಬಾದ್‌ನಲ್ಲಿ ಭೌತಿಕ ಸಂಶೋಧನಾ ಪ್ರಯೋಗಾಲಯವನ್ನು (PRL) ಸ್ಥಾಪಿಸಿದರು.',
    contribEn: 'Established the Thumba Equatorial Rocket Launching Station (TERLS) in Kerala in 1963 and initiated the Satellite Instructional Television Experiment (SITE) for rural education.',
    contribKn: 'ಕೇರಳದ ತும்பಾದಲ್ಲಿ ಮೊದಲ ರಾಕೆಟ್ ಉಡಾವಣಾ ಕೇಂದ್ರ ಸ್ಥಾಪನೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಉಪಗ್ರಹ ದೂರದರ್ಶನ (SITE) ಯೋಜನೆ.',
    awardsEn: 'Shanti Swarup Bhatnagar Award (1962), Padma Bhushan (1966), Padma Vibhushan (1972, posthumous).',
    factEn: 'The lander of India’s Chandrayaan-2 and Chandrayaan-3 lunar missions was named "Vikram" in his honor.',
    activityEn: 'Compare how gravity differs between Earth (9.8 m/s²) and the Moon (1.6 m/s²) in the Motion & Gravity simulation.',
    simId: 'motion',
    sourceUrl: 'https://www.isro.gov.in/',
    ytKn: 'ವಿಕ್ರಮ್ ಸಾರಾಭಾಯ್ ಇಸ್ರೋ ಇತಿಹಾಸ ಕನ್ನಡ Vikram Sarabhai Kannada',
    ytEn: 'Vikram Sarabhai Father of Indian Space Program ISRO'
  },
  {
    nameEn: 'Dr. M. S. Swaminathan',
    nameKn: 'ಡಾ. ಎಂ. ಎಸ್. ಸ್ವಾಮಿನಾಥನ್',
    dates: '7 Aug 1925 – 28 Sep 2023',
    origin: 'Indian',
    fieldEn: 'Agricultural Science & Plant Genetics',
    fieldKn: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಮತ್ತು ಸಸ್ಯ ತಳಿಶಾಸ್ತ್ರ',
    icon: '🌾',
    bioEn: 'Indian agronomist and geneticist who led India’s Green Revolution, transforming the nation from famine vulnerability to food grain self-sufficiency in the 1960s.',
    bioKn: 'ಭಾರತದ ಹಸಿರು ಕ್ರಾಂತಿಯ ಪಿತಾಮಹ. ಕೃಷಿ ಸಂಶೋಧನೆ ಮತ್ತು ಆಹಾರ ಭದ್ರತೆಗೆ ಮಹತ್ವದ ಕೊಡುಗೆ ನೀಡಿದರು.',
    contribEn: 'Led crop-improvement research that helped transform Indian agriculture during the Green Revolution.',
    contribKn: 'ಹಸಿರು ಕ್ರಾಂತಿಯ ಸಂದರ್ಭದಲ್ಲಿ ಭಾರತದ ಕೃಷಿ ಅಭಿವೃದ್ಧಿಗೆ ಪ್ರಮುಖ ಕೊಡುಗೆ ನೀಡಿದರು.',
    awardsEn: 'World Food Prize (1987), Padma Shri (1967), Padma Bhushan (1972), Padma Vibhushan (1989).',
    factEn: 'He is widely known for his leadership in India’s Green Revolution.',
    activityEn: 'Compare plant growth under different light and watering conditions, recording observations over several days.',
    simId: 'plant',
    sourceUrl: 'https://www.mssrf.org/',
    ytKn: 'ಎಂ ಎಸ್ ಸ್ವಾಮಿನಾಥನ್ ಹಸಿರು ಕ್ರಾಂತಿ ಕನ್ನಡ',
    ytEn: 'M S Swaminathan Green Revolution'
  }
];

// InstaLab application layer — restored after the uploaded JavaScript was cut off mid-string.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, ch => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[ch]));
const langText = (en, kn) => currentLang === 'kn' ? (kn || en) : currentLang === 'both' && kn ? `${kn} / ${en}` : en;
const titleFor = item => langText(item.titleEn || item.nameEn || item.name || item.id, item.titleKn || item.nameKn);
const descriptionFor = (item, enKey, knKey) => langText(item[enKey] || '', item[knKey] || '');
function safeYouTube(query) {
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query || 'science experiments Kannada English');
}
function renderEmpty(target, message) {
  if (target) target.innerHTML = `<div class="lab-card"><p>${escapeHTML(message)}</p></div>`;
}
function renderSimulationCards() {
  const html = SIMULATIONS.map((sim, i) => `<article class="lab-card">
    <span class="card-tag">Simulation ${i+1}</span><h3>${escapeHTML(titleFor(sim))}</h3>
    <p>${escapeHTML(descriptionFor(sim,'objectiveEn','objectiveKn'))}</p>
    <div class="card-actions-row"><button class="btn-primary" data-open-sim="${escapeHTML(sim.id)}">Open simulation</button>
    <a class="btn-outline" target="_blank" rel="noopener noreferrer" href="${safeYouTube(currentLang==='kn'?sim.ytKn:sim.ytEn)}">▶ Video search</a></div></article>`).join('');
  ['#home-featured-sims-grid'].forEach(sel => { const el=$(sel); if(el) el.innerHTML=html; });
  const tabs=$('#sim-selector-tabs');
  if(tabs) tabs.innerHTML=SIMULATIONS.map((sim,i)=>`<button class="sim-tab-btn ${i===0?'active':''}" role="tab" data-open-sim="${escapeHTML(sim.id)}">${escapeHTML(titleFor(sim))}</button>`).join('');
}
function renderSimulation(simId) {
  const sim=SIMULATIONS.find(x=>x.id===simId)||SIMULATIONS[0];
  if(!sim) return;
  currentSimId=sim.id;
  $$('.sim-tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.openSim===sim.id));
  const target=$('#active-sim-workspace'); if(!target) return;
  const steps=(currentLang==='kn'?sim.stepsKn:sim.stepsEn)||sim.stepsEn||[];
  const questions=sim.questions||[];
  target.innerHTML=`<h2>${escapeHTML(titleFor(sim))}</h2>
    <p>${escapeHTML(descriptionFor(sim,'objectiveEn','objectiveKn'))}</p>
    <div class="sim-grid"><div class="sim-stage" id="sim-stage">
      <div class="sim-visual" style="text-align:center;padding:1rem">
        <div id="sim-icon" style="font-size:4rem">${sim.id==='thermometer'?'🌡️':sim.id==='plant'?'🌱':sim.id==='circuit'?'💡':sim.id==='magnetism'?'🧲':'⚗️'}</div>
        <div id="sim-reading" style="font-size:1.5rem;font-weight:700;color:var(--gold)">25 °C</div>
        <p id="sim-status">Adjust the control to explore.</p>
      </div>
    </div><div class="sim-controls">
      <label for="sim-control">${sim.id==='thermometer'?'Temperature (°C)':sim.id==='plant'?'Sunlight (%)':sim.id==='circuit'?'Battery voltage (V)':'Experiment control'}</label>
      <input id="sim-control" type="range" min="${sim.id==='thermometer'?-20:0}" max="${sim.id==='thermometer'?120:100}" value="${sim.id==='thermometer'?25:50}" step="1" />
      <p>Value: <strong id="sim-value">25</strong></p>
      <div class="sim-readouts" id="sim-readouts"></div>
    </div></div>
    <section class="sim-explanation"><h3>${currentLang==='kn'?'ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ / ವಿವರಣೆ':'Explanation / ವಿವರಣೆ'}</h3><p>${escapeHTML(descriptionFor(sim,'explanationEn','explanationKn'))}</p></section>
    <section><h3>${currentLang==='kn'?'ಹಂತಗಳು':'Steps'}</h3><ol>${steps.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ol></section>
    <p><strong>Safety / ಸುರಕ್ಷತೆ:</strong> ${escapeHTML(descriptionFor(sim,'safetyEn','safetyKn')||'Follow teacher instructions and use safe, low-risk materials.')}</p>
    <div class="card-actions-row"><a class="btn-outline" target="_blank" rel="noopener noreferrer" href="${safeYouTube(currentLang==='kn'?sim.ytKn:sim.ytEn)}">▶ ${currentLang==='kn'?'ವೀಡಿಯೊ ಹುಡುಕಿ':'Find video'}</a></div>
    ${questions.length?`<section class="sim-quiz"><h3>Quick quiz / ಸಣ್ಣ ರಸಪ್ರಶ್ನೆ</h3>${questions.map((q,i)=>`<div class="quiz-question"><p>${escapeHTML(langText(q.qEn,q.qKn))}</p>${q.opts.map((opt,j)=>`<label style="display:block;margin:.35rem 0"><input type="radio" name="simq${i}" value="${j}"> ${escapeHTML(opt)}</label>`).join('')}<button class="btn-gold-sm" data-check-answer="${i}">Check answer</button><p id="answer-${i}" aria-live="polite"></p></div>`).join('')}</section>`:''}`;
  const update=()=>{
    const control=$('#sim-control'); if(!control)return;
    const v=Number(control.value); $('#sim-value').textContent=v;
    let reading='',status='',details='';
    if(sim.id==='thermometer'){
      reading=`${v} °C`; status=v<=0?'Freezing range (water model)':v>=100?'Boiling range (water model)':'Liquid water range (approx.)';
      details=`${(v*9/5+32).toFixed(1)} °F · ${(v+273.15).toFixed(2)} K`;
    } else if(sim.id==='plant'){
      reading=`Light: ${v}%`; status=v<20?'Low light':v>75?'High light':'Moderate light'; details='Illustrative model — plant growth also depends on water, nutrients and species.';
    } else if(sim.id==='circuit'){
      reading=`${(1.5+v*0.075).toFixed(2)} V`; status='Use a low-voltage battery model only'; details='Brightness is illustrative; real current depends on circuit resistance.';
    } else {
      reading=`Control: ${v}%`; status=v<30?'Low setting':v>70?'High setting':'Medium setting'; details='Illustrative educational control; compare observations as you adjust it.';
    }
    $('#sim-reading').textContent=reading; $('#sim-status').textContent=status; $('#sim-readouts').textContent=details;
  };
  $('#sim-control').addEventListener('input',update); update();
}
function renderMaterials() {
  const target=$('#materials-grid'); if(!target)return;
  target.innerHTML=MATERIALS.map(m=>`<article class="lab-card"><span style="font-size:2rem">${escapeHTML(m.icon||'🧪')}</span><h3>${escapeHTML(titleFor(m))}</h3><p>${escapeHTML(descriptionFor(m,'principleEn','principleKn')||descriptionFor(m,'usageEn','usageKn'))}</p><p><strong>Use:</strong> ${escapeHTML(m.usageEn||m.appsEn||'Explore the instrument and its purpose.')}</p><p><strong>Safety:</strong> ${escapeHTML(m.safetyEn||'Use under teacher supervision.')}</p><div class="card-actions-row"><button class="btn-primary" data-open-sim="${escapeHTML(m.simId||'thermometer')}">Open related simulation</button><a class="btn-outline" target="_blank" rel="noopener noreferrer" href="${safeYouTube(currentLang==='kn'?m.ytKn:m.ytEn)}">▶ Video search</a></div></article>`).join('');
}
function renderScientists() {
  const target=$('#scientists-grid'); if(!target)return;
  target.innerHTML=SCIENTISTS.map(s=>`<article class="lab-card"><div style="display:flex;gap:1rem;align-items:center"><span style="font-size:2.4rem">${escapeHTML(s.icon||'🔬')}</span><div><h3>${escapeHTML(titleFor(s))}</h3><p>${escapeHTML(s.dates||'')} · ${escapeHTML(s.fieldEn||'')}</p></div></div><p>${escapeHTML(descriptionFor(s,'bioEn','bioKn'))}</p><p><strong>Contribution:</strong> ${escapeHTML(s.contribEn||'')}</p><p><strong>Did you know?</strong> ${escapeHTML(s.factEn||'')}</p><p><strong>Student activity:</strong> ${escapeHTML(s.activityEn||'')}</p>${s.sourceUrl?`<a class="btn-outline" href="${escapeHTML(s.sourceUrl)}" target="_blank" rel="noopener noreferrer">Learn more ↗</a>`:''}</article>`).join('');
}
function showSection(name) {
  const valid=['home','simulations','materials','scientists','facts','karnataka','videos','quizzes'];
  if(!valid.includes(name)) name='home';
  $$('.page-section').forEach(s=>s.classList.toggle('active',s.id===`section-${name}`));
  $$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.target===name));
  if(name==='simulations') renderSimulation(currentSimId);
  if(name==='facts') renderEmpty($('#facts-grid'),'The uploaded source did not include the science-facts dataset. Add the missing data to populate this section. / ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಕೋಡ್‌ನಲ್ಲಿ ವಿಜ್ಞಾನ ಸಂಗತಿಗಳ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ಇಲ್ಲ.');
  if(name==='karnataka') renderEmpty($('#karnataka-content'),'The grade-wise curriculum dataset was not present in the uploaded JavaScript. / ತರಗತಿವಾರು ಪಠ್ಯಕ್ರಮದ ಮಾಹಿತಿ ಮೂಲ ಕಡತದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ.');
  if(name==='videos') renderEmpty($('#videos-grid')||$('#section-videos'),'Use the search box or simulation video-search links to find Kannada and English science videos.');
  if(name==='quizzes') renderEmpty($('#quiz-container')||$('#section-quizzes'),'Open a simulation and try its quick quiz. / ಸಿಮ್ಯುಲೇಶನ್ ತೆರೆಯಿರಿ ಮತ್ತು ರಸಪ್ರಶ್ನೆ ಪ್ರಯತ್ನಿಸಿ.');
  window.scrollTo({top:0,behavior:'smooth'});
}
window.navigateToSection = showSection;
function updateLanguage() {
  const select=$('#lang-select'); if(select) select.value=currentLang;
  $$('[data-i18n]').forEach(el=>{
    const item=UI_TEXT[el.dataset.i18n]; if(item) el.textContent=langText(item.en,item.kn);
  });
  document.documentElement.lang=currentLang==='kn'?'kn':'en';
  renderSimulationCards(); renderMaterials(); renderScientists();
  if($('#active-sim-workspace')) renderSimulation(currentSimId);
}
document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-target]');
  if(nav){showSection(nav.dataset.target);return;}
  const sim=event.target.closest('[data-open-sim]');
  if(sim){currentSimId=sim.dataset.openSim;showSection('simulations');return;}
  const answer=event.target.closest('[data-check-answer]');
  if(answer){
    const i=Number(answer.dataset.checkAnswer),q=(SIMULATIONS.find(s=>s.id===currentSimId)||{}).questions?.[i];
    const picked=$(`input[name="simq${i}"]:checked`);
    const out=$(`#answer-${i}`);
    if(out) out.textContent=!picked?'Choose an answer first.':Number(picked.value)===q.ans?'Correct! / ಸರಿಯಾದ ಉತ್ತರ':'Not quite — try again. / ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.';
  }
});
document.addEventListener('change',event=>{
  if(event.target.id==='lang-select'){
    currentLang=event.target.value;
    try{localStorage.setItem('instalab_lang',currentLang);}catch(e){}
    updateLanguage();
  }
  if(event.target.id==='material-search') filterMaterials();
  if(event.target.id==='material-category-filter') filterMaterials();
});
function filterMaterials(){
  const q=($('#material-search')?.value||'').toLowerCase();
  const category=$('#material-category-filter')?.value||'all';
  $$('#materials-grid .lab-card').forEach((card,i)=>{
    const m=MATERIALS[i]; card.style.display=(!q||JSON.stringify(m).toLowerCase().includes(q))&&(category==='all'||m.category===category)?'':'none';
  });
}
document.addEventListener('input',event=>{
  if(event.target.id==='global-search'){
    const q=event.target.value.trim().toLowerCase(),drop=$('#search-results-dropdown');
    const clear=$('#clear-search-btn'); if(clear) clear.classList.toggle('hidden',!q);
    if(!drop)return;
    if(!q){drop.classList.add('hidden');drop.innerHTML='';return;}
    const entries=[
      ...SIMULATIONS.map(x=>({label:titleFor(x),type:'Simulation',id:x.id,text:JSON.stringify(x)})),
      ...MATERIALS.map(x=>({label:titleFor(x),type:'Equipment',id:x.simId,text:JSON.stringify(x)})),
      ...SCIENTISTS.map(x=>({label:titleFor(x),type:'Scientist',id:'scientists',text:JSON.stringify(x)}))
    ].filter(x=>(x.label+' '+x.text).toLowerCase().includes(q)).slice(0,12);
    drop.innerHTML=entries.length?entries.map(x=>`<button class="search-item" data-target="${x.type==='Scientist'?'scientists':'simulations'}" ${x.type!=='Scientist'?`data-open-sim="${escapeHTML(x.id)}"`:''}><span>${escapeHTML(x.label)}</span><small>${escapeHTML(x.type)}</small></button>`).join(''):'<p>No matching results / ಫಲಿತಾಂಶಗಳಿಲ್ಲ</p>';
    drop.classList.remove('hidden');
  }
  if(event.target.id==='material-search')filterMaterials();
  if(event.target.id==='scientist-search'){
    const q=event.target.value.toLowerCase();
    $$('#scientists-grid .lab-card').forEach((card,i)=>card.style.display=JSON.stringify(SCIENTISTS[i]).toLowerCase().includes(q)?'':'none');
  }
});
document.addEventListener('click',event=>{
  if(event.target.closest('#clear-search-btn')){const inp=$('#global-search');if(inp)inp.value='';const d=$('#search-results-dropdown');if(d)d.classList.add('hidden');event.target.closest('#clear-search-btn').classList.add('hidden');}
});
document.addEventListener('DOMContentLoaded',()=>{
  try{currentLang=localStorage.getItem('instalab_lang')||currentLang;}catch(e){}
  renderSimulationCards();renderMaterials();renderScientists();updateLanguage();
  const simCount=SIMULATIONS.length,matCount=MATERIALS.length,sciCount=SCIENTISTS.length;
  const stats=$$('.stats-grid .stat-card .stat-num');
  [simCount,matCount,sciCount,0].forEach((n,i)=>{if(stats[i])stats[i].textContent=n;});
  const navSims=$('[data-target="simulations"]'); if(navSims)navSims.textContent=langText(`Virtual Lab (${simCount})`,`ವರ್ಚುವಲ್ ಪ್ರಯೋಗಾಲಯ (${simCount})`);
  const navSci=$('[data-target="scientists"]'); if(navSci)navSci.textContent=langText(`Scientists (${sciCount} available)`,`ವಿಜ್ಞಾನಿಗಳು (${sciCount} ಲಭ್ಯ)`);
  showSection('home');
});
