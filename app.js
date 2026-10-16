let currentLang = localStorage.getItem('instalab_lang') || 'both';
let currentSimId = 'thermometer';
let currentGrade = '6';

function t(enText, knText) {
  if (!knText) return enText;
  if (currentLang === 'en') return enText;
  if (currentLang === 'kn') return knText;
  return `${knText} / ${enText}`;
}

function ytUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function createScientistAvatarSVG(name, color = '#22D3EE', fieldIcon = '⚛️') {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return `<svg viewBox="0 0 80 80" width="74" height="74" role="img" aria-label="${name}">
    <circle cx="40" cy="40" r="38" fill="#131B33" stroke="${color}" stroke-width="2"/>
    <text x="40" y="36" text-anchor="middle" fill="#F8FAFC" font-size="16" font-weight="bold">${initials}</text>
    <text x="40" y="58" text-anchor="middle" font-size="16">${fieldIcon}</text>
  </svg>`;
}

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
  btn_follow_insta: { en: "Follow @instalab on Instagram", kn: "ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ @instalab ಹಿಂಬಾಲಿಸಿ" }
};

const SIMULATIONS = [
  {
    id: 'thermometer',
    titleEn: 'A. Thermometer & Liquid Expansion',
    titleKn: 'A. ತಾಪಮಾನ ಮಾಪಕ ಮತ್ತು ದ್ರವದ ಹಿಗ್ಗುವಿಕೆ',
    objectiveEn: 'Observe how temperature affects liquid column height and compare Celsius, Fahrenheit, and Kelvin scales.',
    objectiveKn: 'ತಾಪಮಾನ ಬದಲಾದಂತೆ ತಾಪಮಾನ ಮಾಪಕದಲ್ಲಿ ದ್ರವದ ಮಟ್ಟ ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ಮತ್ತು ಸೆಲ್ಸಿಯಸ್, ಫ್ಯಾರನ್‌ಹೀಟ್ ಹಾಗೂ ಕೆಲ್ವಿನ್ ಮಾಪನಗಳನ್ನು ಹೋಲಿಸಿ.',
    explanationEn: 'Liquids expand when heated because kinetic energy increases particle separation.',
    explanationKn: 'ಶಾಖ ನೀಡಿದಾಗ ದ್ರವದ ಕಣಗಳ ಚಲನಶಕ್ತಿ ಹೆಚ್ಚಾಗಿ ಹಿಗ್ಗುತ್ತದೆ.',
    safetyEn: 'Never use a clinical thermometer in boiling water.',
    safetyKn: 'ವೈದ್ಯಕೀಯ ತಾಪಮಾನ ಮಾಪಕವನ್ನು ಕುದಿಯುವ ನೀರಿನಲ್ಲಿ ಇಡಬೇಡಿ.',
    ytKn: 'ತಾಪಮಾನ ಮಾಪಕ ವಿಜ್ಞಾನ ಪ್ರಯೋಗ ಕನ್ನಡ Thermometer in Kannada',
    ytEn: 'How a Thermometer Works Thermal Expansion Physics'
  },
  {
    id: 'plant',
    titleEn: 'B. Plant Growth & Photosynthesis Model',
    titleKn: 'B. ಸಸ್ಯ ಬೆಳವಣಿಗೆ ಮತ್ತು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ',
    objectiveEn: 'Investigate how light intensity and water availability affect plant growth and oxygen output.',
    objectiveKn: 'ಬೆಳಕಿನ ತೀವ್ರತೆ ಮತ್ತು ನೀರಿನ ಪ್ರಮಾಣವು ಸಸ್ಯದ ಬೆಳವಣಿಗೆಯ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ ಎಂಬುದನ್ನು ಅಭ್ಯಸಿಸಿ.',
    explanationEn: 'Chlorophyll captures sunlight to convert water and CO2 into glucose and oxygen.',
    explanationKn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯ ಮೂಲಕ ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಬಳಸಿ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ.',
    safetyEn: 'Wash hands after handling soil and fertilizers.',
    safetyKn: 'ಮಣ್ಣು ಮತ್ತು ಗೊಬ್ಬರ ಮುಟ್ಟಿದ ನಂತರ ಕೈಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿ ತೊಳೆಯಿರಿ.',
    ytKn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಸಸ್ಯಗಳ ಬೆಳವಣಿಗೆ ಕನ್ನಡ Photosynthesis Kannada',
    ytEn: 'Photosynthesis Light and Water Plant Growth Experiment'
  },
  {
    id: 'particles',
    titleEn: 'C. Particle Model of Matter (Solid, Liquid, Gas)',
    titleKn: 'C. ದ್ರವ್ಯದ ಕಣಗಳ ಮಾದರಿ (ಘನ, ದ್ರವ, ಅನಿಲ)',
    objectiveEn: 'Visualize particle arrangement and kinetic movement in solids, liquids, and gases.',
    objectiveKn: 'ಘನ, ದ್ರವ ಮತ್ತು ಅನಿಲ ಸ್ಥಿತಿಗಳಲ್ಲಿ ಕಣಗಳ ಜೋಡಣೆ ಹಾಗೂ ಚಲನೆಯನ್ನು ವೀಕ್ಷಿಸಿ.',
    explanationEn: 'Solids have tightly packed particles; liquids slide past each other; gases move rapidly with wide spacing.',
    explanationKn: 'ಘನ ವಸ್ತುಗಳಲ್ಲಿ ಕಣಗಳು ಒತ್ತೊತ್ತಾಗಿ ಜೋಡಣೆಯಾಗಿರುತ್ತವೆ. ಅನಿಲದಲ್ಲಿ ಕಣಗಳು ವೇಗವಾಗಿ ಚಲಿಸುತ್ತವೆ.',
    safetyEn: 'Pressurized gas containers should never be heated directly.',
    safetyKn: 'ಒತ್ತಡದಲ್ಲಿರುವ ಅನಿಲ ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಬಿಸಿ ಮಾಡಬೇಡಿ.',
    ytKn: 'ದ್ರವ್ಯದ ಸ್ಥಿತಿಗಳು ಘನ ದ್ರವ ಅನಿಲ ಕನ್ನಡ States of Matter Kannada',
    ytEn: 'Particle Model of Matter Solid Liquid Gas Animation'
  },
  {
    id: 'circuit',
    titleEn: 'D. Electric Circuit & Switch Control',
    titleKn: 'D. ಸರಳ ವಿದ್ಯುತ್ ಮಂಡಲ ಮತ್ತು ಸ್ವಿಚ್',
    objectiveEn: 'Build a closed path using a battery, wires, switch, and bulb to understand electric current flow.',
    objectiveKn: 'ಬ್ಯಾಟರಿ, ತಂತಿ, ಸ್ವಿಚ್ ಮತ್ತು ಬಲ್ಬ್ ಬಳಸಿ ಪೂರ್ಣ ವಿದ್ಯುತ್ ಮಂಡಲ ರಚಿಸಿ ವಿದ್ಯುತ್ ಪ್ರವಾಹ ತಿಳಿಯಿರಿ.',
    explanationEn: 'Current flows only when the circuit forms a closed loop (I = V/R).',
    explanationKn: 'ವಿದ್ಯುತ್ ಮಂಡಲವು ಮುಚ್ಚಿದಾಗ ಮಾತ್ರ ವಿದ್ಯುತ್ ಪ್ರವಹಿಸಿ ಬಲ್ಬ್ ಬೆಳಗುತ್ತದೆ.',
    safetyEn: 'Only use low-voltage DC batteries (1.5V–9V). Never touch 230V AC sockets.',
    safetyKn: 'ಪ್ರಯೋಗಗಳಿಗೆ ಸಣ್ಣ ಬ್ಯಾಟರಿಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ. ಮನೆಯ 230V ಪ್ಲಗ್ ಬಳಸಬೇಡಿ.',
    ytKn: 'ವಿದ್ಯುತ್ ಮಂಡಲ ಪ್ರಯೋಗ ಕನ್ನಡ Electric Circuit in Kannada',
    ytEn: 'Simple Electric Circuit Switch Battery Bulb Science'
  },
  {
    id: 'magnetism',
    titleEn: 'E. Magnetism & Magnetic Materials Tester',
    titleKn: 'E. ಕಾಂತೀಯತೆ ಮತ್ತು ಕಾಂತೀಯ ವಸ್ತುಗಳ ಪರೀಕ್ಷೆ',
    objectiveEn: 'Test everyday materials with a bar magnet to classify magnetic and non-magnetic substances.',
    objectiveKn: 'ದಂಡಕಾಂತವನ್ನು ಬಳಸಿ ಯಾವ ವಸ್ತುಗಳು ಕಾಂತಕ್ಕೆ ಆಕರ್ಷಿತವಾಗುತ್ತವೆ ಎಂಬುದನ್ನು ಪರೀಕ್ಷಿಸಿ.',
    explanationEn: 'Ferromagnetic materials (Iron, Nickel, Cobalt) are strongly attracted by magnets.',
    explanationKn: 'ಕಬ್ಬಿಣ, ನಿಕ್ಕಲ್ ಮತ್ತು ಕೋಬಾಲ್ಟ್‌ನಂತಹ ಕಾಂತೀಯ ವಸ್ತುಗಳು ಕಾಂತಕ್ಕೆ ಆಕರ್ಷಿತವಾಗುತ್ತವೆ.',
    safetyEn: 'Keep strong magnets away from electronic screens and cards.',
    safetyKn: 'ಪ್ರಬಲ ಕಾಂತಗಳನ್ನು ಮೊಬೈಲ್ ಮತ್ತು ಕಾರ್ಡ್‌ಗಳಿಂದ ದೂರವಿಡಿ.',
    ytKn: 'ಕಾಂತಗಳೊಂದಿಗೆ ಆಟ ವಿಜ್ಞಾನ ಕನ್ನಡ Magnetism in Kannada',
    ytEn: 'Magnetism Magnetic vs Non Magnetic Materials Experiment'
  },
  {
    id: 'motion',
    titleEn: 'F. Motion, Free Fall & Gravity',
    titleKn: 'F. ಚಲನೆ, ಮುಕ್ತ ಪತನ ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣೆ',
    objectiveEn: 'Explore equations of motion under Earth (9.8 m/s²) and Moon (1.6 m/s²) gravity.',
    objectiveKn: 'ಗುರುತ್ವಾಕರ್ಷಣೆಯ ಅಡಿಯಲ್ಲಿ ವಸ್ತುವಿನ ಚಲನೆ, ವೇಗ ಮತ್ತು ಕ್ರಮಿಸಿದ ದೂರವನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ.',
    explanationEn: 'Displacement s = ut + ½gt² and final velocity v = u + gt.',
    explanationKn: 'ನಿರ್ವಾತದಲ್ಲಿ ಎಲ್ಲಾ ವಸ್ತುಗಳು ಸಮಾನ ವೇಗೋತ್ಕರ್ಷದಿಂದ (9.8 m/s²) ಬೀಳುತ್ತವೆ.',
    safetyEn: 'Ensure drop zones are clear during physical drop tests.',
    safetyKn: 'ಎತ್ತರದಿಂದ ವಸ್ತುಗಳನ್ನು ಬೀಳಿಸುವ ಪ್ರಯೋಗ ಮಾಡುವಾಗ ಕೆಳಗೆ ಯಾರೂ ಇಲ್ಲದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    ytKn: 'ಚಲನೆ ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣೆ ಕನ್ನಡ Motion and Gravity Kannada',
    ytEn: 'Equations of Motion and Free Fall Gravity Physics'
  },
  {
    id: 'ph',
    titleEn: 'G. Acids, Bases & Universal pH Indicator',
    titleKn: 'G. ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು pH ಮಾಪಕ',
    objectiveEn: 'Test solutions to observe pH values (0–14) and indicator color changes.',
    objectiveKn: 'ವಿವಿಧ ದ್ರಾವಣಗಳ pH ಮೌಲ್ಯ (0–14) ಮತ್ತು ಸೂಚಕದ ಬಣ್ಣ ಬದಲಾವಣೆಯನ್ನು ಗಮನಿಸಿ.',
    explanationEn: 'pH 7 is neutral, below 7 is acidic, and above 7 is basic/alkaline.',
    explanationKn: 'pH 7 ತಟಸ್ಥ, 7 ಕ್ಕಿಂತ ಕಡಿಮೆ ಆಮ್ಲ, 7 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಪ್ರತ್ಯಾಮ್ಲ.',
    safetyEn: 'Never taste any laboratory chemical!',
    safetyKn: 'ಯಾವುದೇ ರಾಸಾಯನಿಕವನ್ನು ನಾಲಿಗೆಯಿಂದ ರುಚಿ ನೋಡಬೇಡಿ!',
    ytKn: 'ಆಮ್ಲಗಳು ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು ಕನ್ನಡ Acids Bases pH Kannada',
    ytEn: 'Acids Bases and pH Scale Universal Indicator Experiment'
  },
  {
    id: 'optics',
    titleEn: 'H. Light Reflection & Refraction Ray Lab',
    titleKn: 'H. ಬೆಳಕಿನ ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ',
    objectiveEn: 'Adjust angle of incidence to verify Law of Reflection and Snell’s Law of Refraction.',
    objectiveKn: 'ಬೆಳಕಿನ ಕಿರಣದ ಪತನ ಕೋನವನ್ನು ಬದಲಿಸಿ ಪ್ರತಿಫಲನ ಕೋನ ಮತ್ತು ವಕ್ರೀಭವನ ಕೋನವನ್ನು ಅಭ್ಯಸಿಸಿ.',
    explanationEn: 'Angle of incidence equals angle of reflection (θi = θr); light bends toward the normal in denser media.',
    explanationKn: 'ಪತನ ಕೋನ ಮತ್ತು ಪ್ರತಿಫಲನ ಕೋನ ಸಮವಾಗಿರುತ್ತವೆ. ಸಾಂದ್ರ ಮಾಧ್ಯಮದಲ್ಲಿ ಬೆಳಕು ಲಂಬದ ಕಡೆಗೆ ಬಾಗುತ್ತದೆ.',
    safetyEn: 'Never shine laser pointers into eyes.',
    safetyKn: 'ಲೇಸರ್ ಬೆಳಕನ್ನು ಯಾರ ಕಣ್ಣಿಗೂ ಬಿಡಬೇಡಿ.',
    ytKn: 'ಬೆಳಕಿನ ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ ಕನ್ನಡ Light Reflection Kannada',
    ytEn: 'Reflection and Refraction of Light Snell Law Ray Diagram'
  },
  {
    id: 'pendulum',
    titleEn: 'I. Simple Pendulum & Time Period',
    titleKn: 'I. ಸರಳ ಲೋಲಕ ಮತ್ತು ಆವರ್ತಕಾಲ',
    objectiveEn: 'Discover how string length (L) affects time period T = 2π√(L/g).',
    objectiveKn: 'ಸರಳ ಲೋಲಕದ ದಾರದ ಉದ್ದವು (L) ಅದರ ಆವರ್ತಕಾಲದ (T) ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ ಎಂದು ಕಂಡುಹಿಡಿಯಿರಿ.',
    explanationEn: 'Time period depends on length and gravity, not on the mass of the bob.',
    explanationKn: 'ಸರಳ ಲೋಲಕದ ಆವರ್ತಕಾಲವು ದಾರದ ಉದ್ದ ಮತ್ತು ಗುರುತ್ವದ ಮೇಲೆ ಮಾತ್ರ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ.',
    safetyEn: 'Release bob gently without pushing.',
    safetyKn: 'ಲೋಲಕದ ಗುಂಡನ್ನು ತಳ್ಳದೆ ನಿಧಾನವಾಗಿ ಬಿಡಿ.',
    ytKn: 'ಸರಳ ಲೋಲಕ ಪ್ರಯೋಗ ಕನ್ನಡ Simple Pendulum Kannada',
    ytEn: 'Simple Pendulum Time Period Length Experiment Physics'
  },
  {
    id: 'ohmslaw',
    titleEn: 'J. Ohm’s Law (V = I × R) Verification',
    titleKn: 'J. ಓಮ್‌ನ ನಿಯಮ (V = I × R) ಪರಿಶೀಲನೆ',
    objectiveEn: 'Explore the relationship between Voltage (V), Current (I), and Resistance (R).',
    objectiveKn: 'ವಾಹಕದಲ್ಲಿ ವಿಭವಾಂತರ (V), ವಿದ್ಯುತ್ ಪ್ರವಾಹ (I) ಮತ್ತು ರೋಧದ (R) ನಡುವಿನ ಸಂಬಂಧವನ್ನು ಪರಿಶೀಲಿಸಿ.',
    explanationEn: 'Current is directly proportional to voltage and inversely proportional to resistance (I = V/R).',
    explanationKn: 'ಸ್ಥಿರ ತಾಪಮಾನದಲ್ಲಿ ವಿದ್ಯುತ್ ಪ್ರವಾಹವು ವಿಭವಾಂತರಕ್ಕೆ ನೇರ ಅನುಪಾತದಲ್ಲಿರುತ್ತದೆ (V = IR).',
    safetyEn: 'Switch off circuit when not taking readings to avoid wire heating.',
    safetyKn: 'ತಂತಿ ಬಿಸಿಯಾಗುವುದನ್ನು ತಡೆಯಲು ರೀಡಿಂಗ್ ತೆಗೆದುಕೊಂಡ ನಂತರ ಸ್ವಿಚ್ ಆಫ್ ಮಾಡಿ.',
    ytKn: 'ಓಮ್ ನ ನಿಯಮ ಕನ್ನಡ 10ನೇ ತರಗತಿ Ohms Law in Kannada',
    ytEn: 'Ohms Law Voltage Current Resistance Interactive Physics'
  },
  {
    id: 'density',
    titleEn: 'K. Density, Buoyancy & Archimedes Principle',
    titleKn: 'K. ಸಾಂದ್ರತೆ, ಪ್ಲವನಶೀಲತೆ ಮತ್ತು ಆರ್ಕಿಮಿಡೀಸ್ ತತ್ವ',
    objectiveEn: 'Test why objects with density less than water (1.0 g/cm³) float while denser objects sink.',
    objectiveKn: 'ನೀರಿಗಿಂತ ಕಡಿಮೆ ಸಾಂದ್ರತೆಯ ವಸ್ತುಗಳು ಏಕೆ ತೇಲುತ್ತವೆ ಮತ್ತು ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆಯ ವಸ್ತುಗಳು ಏಕೆ ಮುಳುಗುತ್ತವೆ ಎಂದು ಪರೀಕ್ಷಿಸಿ.',
    explanationEn: 'Objects less dense than fluid float; upward buoyant force equals weight of displaced water.',
    explanationKn: 'ವಸ್ತುವಿನ ಸಾಂದ್ರತೆಯು ನೀರಿನ ಸಾಂದ್ರತೆಗಿಂತ (1.0 g/cm³) ಕಡಿಮೆಯಿದ್ದರೆ ಅದು ತೇಲುತ್ತದೆ.',
    safetyEn: 'Wipe spilled water around lab tables immediately.',
    safetyKn: 'ಪ್ರಯೋಗದ ವೇಳೆ ಚೆಲ್ಲಿದ ನೀರನ್ನು ತಕ್ಷಣ ಒರೆಸಿ.',
    ytKn: 'ಸಾಂದ್ರತೆ ಮತ್ತು ಆರ್ಕಿಮಿಡೀಸ್ ತತ್ವ ಕನ್ನಡ Density Archimedes Kannada',
    ytEn: 'Density Floating and Sinking Archimedes Principle'
  },
  {
    id: 'sound',
    titleEn: 'L. Sound Waves: Pitch & Loudness',
    titleKn: 'L. ಶಬ್ದದ ತರಂಗಗಳು: ಆವೃತ್ತಿ ಮತ್ತು ಪಾರ',
    objectiveEn: 'Visualize how Frequency (Hz) controls pitch and Amplitude controls loudness.',
    objectiveKn: 'ಶಬ್ದ ತರಂಗದ ಆವೃತ್ತಿ (Frequency) ಮತ್ತು ಪಾರ (Amplitude) ಬದಲಾದಂತೆ ತರಂಗದ ಆಕಾರ ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ಎಂದು ವೀಕ್ಷಿಸಿ.',
    explanationEn: 'Sound requires a medium to travel. Pitch depends on frequency; loudness depends on amplitude.',
    explanationKn: 'ಶಬ್ದವು ಕಂಪನದಿಂದ ಉಂಟಾಗುತ್ತದೆ ಮತ್ತು ಚಲಿಸಲು ಮಾಧ್ಯಮದ ಅಗತ್ಯವಿದೆ.',
    safetyEn: 'Avoid prolonged exposure to loud sounds above 85 dB.',
    safetyKn: 'ಕಿವಿಯ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಅತಿ ಹೆಚ್ಚಿನ ಶಬ್ದದಿಂದ ದೂರವಿರಿ.',
    ytKn: 'ಶಬ್ದ ವಿಜ್ಞಾನ ಪಾಠ ಕನ್ನಡ Sound Waves in Kannada',
    ytEn: 'Sound Waves Frequency Pitch and Amplitude Oscilloscope'
  }
];

const MATERIALS = [
  { id: 'mat-1', nameEn: 'Laboratory Thermometer', nameKn: 'ಪ್ರಯೋಗಾಲಯ ತಾಪಮಾನ ಮಾಪಕ', category: 'measurement', icon: '🌡️', principleEn: 'Thermal expansion of mercury/alcohol.', principleKn: 'ಶಾಖಕ್ಕೆ ದ್ರವ ಹಿಗ್ಗುವ ತತ್ವ.', simId: 'thermometer', ytKn: 'ತಾಪಮಾನ ಮಾಪಕ ಕನ್ನಡ', ytEn: 'Laboratory Thermometer' },
  { id: 'mat-2', nameEn: 'Magnifying Glass (Convex Lens)', nameKn: 'ಭೂತಗನ್ನಡಿ (ಪೀನ ಮಸೂರ)', category: 'optics', icon: '🔍', principleEn: 'Refracts light to form magnified virtual image.', principleKn: 'ಬೆಳಕನ್ನು ವಕ್ರೀಭವಿಸಿ ದೊಡ್ಡ ಪ್ರತಿಬಿಂಬ ತೋರಿಸುತ್ತದೆ.', simId: 'optics', ytKn: 'ಪೀನ ಮಸೂರ ಕನ್ನಡ', ytEn: 'Convex Lens Magnifying Glass' },
  { id: 'mat-3', nameEn: 'Compound Microscope', nameKn: 'ಸಂಯುಕ್ತ ಸೂಕ್ಷ್ಮದರ್ಶಕ', category: 'optics', icon: '🔬', principleEn: 'Two lens systems magnify cells up to 400x–1000x.', principleKn: 'ಸೂಕ್ಷ್ಮ ಜೀವಿಗಳನ್ನು ಮತ್ತು ಜೀವಕೋಶಗಳನ್ನು ದೊಡ್ಡದಾಗಿ ತೋರಿಸುತ್ತದೆ.', simId: 'plant', ytKn: 'ಸೂಕ್ಷ್ಮದರ್ಶಕದ ಭಾಗಗಳು ಕನ್ನಡ', ytEn: 'Compound Microscope Guide' },
  { id: 'mat-4', nameEn: 'Bar Magnet & Horseshoe Magnet', nameKn: 'ದಂಡಕಾಂತ ಮತ್ತು ಲಾಳಾಕೃತಿಯ ಕಾಂತ', category: 'electricity', icon: '🧲', principleEn: 'Creates magnetic field; attracts Fe, Ni, Co.', principleKn: 'ಕಬ್ಬಿಣ, ನಿಕ್ಕಲ್ ಮತ್ತು ಕೋಬಾಲ್ಟ್ ಆಕರ್ಷಿಸುತ್ತದೆ.', simId: 'magnetism', ytKn: 'ದಂಡಕಾಂತ ಪ್ರಯೋಗ ಕನ್ನಡ', ytEn: 'Bar Magnet Field Lines' },
  { id: 'mat-5', nameEn: 'Electric Circuit Kit', nameKn: 'ವಿದ್ಯುತ್ ಮಂಡಲ ಕಿಟ್', category: 'electricity', icon: '💡', principleEn: 'Chemical energy to electrical and light energy.', principleKn: 'ರಾಸಾಯನಿಕ ಶಕ್ತಿಯನ್ನು ವಿದ್ಯುತ್ ಮತ್ತು ಬೆಳಕಿನ ಶಕ್ತಿಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ.', simId: 'circuit', ytKn: 'ಸರಳ ವಿದ್ಯುತ್ ಮಂಡಲ ಕನ್ನಡ', ytEn: 'Simple Electric Circuit Kit' },
  { id: 'mat-6', nameEn: 'Graduated Measuring Cylinder', nameKn: 'ಅಳತೆ ಸಿಲಿಂಡರ್', category: 'measurement', icon: '🧪', principleEn: 'Measures liquid volume and solid displacement.', principleKn: 'ದ್ರವಗಳ ಗಾತ್ರವನ್ನು ಮಿಲಿಲೀಟರ್‌ಗಳಲ್ಲಿ ಅಳೆಯಲು ಬಳಸಲಾಗುತ್ತದೆ.', simId: 'density', ytKn: 'ಅಳತೆ ಸಿಲಿಂಡರ್ ಕನ್ನಡ', ytEn: 'Graduated Cylinder Volume' },
  { id: 'mat-7', nameEn: 'Spring Balance & Beam Balance', nameKn: 'ಸ್ಪ್ರಿಂಗ್ ತಕ್ಕಡಿ ಮತ್ತು ಭೌತಿಕ ತಕ್ಕಡಿ', category: 'measurement', icon: '⚖️', principleEn: 'Measures gravitational weight (N) and mass (g).', principleKn: 'ವಸ್ತುವಿನ ದ್ರವ್ಯರಾಶಿ ಮತ್ತು ತೂಕವನ್ನು ಅಳೆಯುತ್ತದೆ.', simId: 'motion', ytKn: 'ಸ್ಪ್ರಿಂಗ್ ತಕ್ಕಡಿ ಕನ್ನಡ', ytEn: 'Spring Balance Physics' },
  { id: 'mat-8', nameEn: 'Litmus & Universal pH Paper', nameKn: 'ಲಿಟ್ಮಸ್ ಮತ್ತು pH ಸೂಚಕ ಕಾಗದ', category: 'chemistry', icon: '🎨', principleEn: 'Changes color according to H+ ion concentration.', principleKn: 'ಆಮ್ಲ ಮತ್ತು ಪ್ರತ್ಯಾಮ್ಲಗಳಲ್ಲಿ ಬಣ್ಣ ಬದಲಾಯಿಸುತ್ತದೆ.', simId: 'ph', ytKn: 'ಲಿಟ್ಮಸ್ ಪೇಪರ್ ಪರೀಕ್ಷೆ ಕನ್ನಡ', ytEn: 'Litmus and pH Paper Test' },
  { id: 'mat-9', nameEn: 'Mirrors, Lenses & Glass Prism', nameKn: 'ದರ್ಪಣಗಳು, ಮಸೂರಗಳು ಮತ್ತು ಪಟ್ಟಕ', category: 'optics', icon: '🌈', principleEn: 'Reflection, refraction, and dispersion into VIBGYOR.', principleKn: 'ಬೆಳಕಿನ ಪ್ರತಿಫಲನ, ವಕ್ರೀಭವನ ಮತ್ತು ವರ್ಣವಿಭಜನೆ.', simId: 'optics', ytKn: 'ಗಾಜಿನ ಪಟ್ಟಕ ಪ್ರಯೋಗ ಕನ್ನಡ', ytEn: 'Glass Prism Dispersion' },
  { id: 'mat-10', nameEn: 'Pulley & Lever Kit', nameKn: 'ಸರಳ ಯಂತ್ರಗಳು: ರಾಟೆ ಮತ್ತು ಸನ್ನೆಕೋಲು', category: 'chemistry', icon: '⚙️', principleEn: 'Mechanical advantage reduces effort needed.', principleKn: 'ಕಡಿಮೆ ಬಲದಿಂದ ಹೆಚ್ಚಿನ ಭಾರ ಎತ್ತಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.', simId: 'motion', ytKn: 'ಸರಳ ಯಂತ್ರಗಳು ಕನ್ನಡ', ytEn: 'Simple Machines Pulley Lever' },
  { id: 'mat-11', nameEn: 'Magnetic Compass', nameKn: 'ಕಾಂತೀಯ ದಿಕ್ಸೂಚಿ', category: 'electricity', icon: '🧭', principleEn: 'Aligns with Earth’s North-South geomagnetic field.', principleKn: 'ಭೂಮಿಯ ಕಾಂತೀಯ ಕ್ಷೇತ್ರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಉತ್ತರ-ದಕ್ಷಿಣ ತೋರಿಸುತ್ತದೆ.', simId: 'magnetism', ytKn: 'ದಿಕ್ಸೂಚಿ ಪ್ರಯೋಗ ಕನ್ನಡ', ytEn: 'Magnetic Compass Science' },
  { id: 'mat-12', nameEn: 'Laboratory Stopwatch', nameKn: 'ಸ್ಟಾಪ್‌ವಾಚ್ (ಕಾಲಮಾಪಕ)', category: 'measurement', icon: '⏱️', principleEn: 'Accurate oscillation timing to 0.01 seconds.', principleKn: 'ಸಮಯದ ಅಂತರವನ್ನು ನಿಖರವಾಗಿ ಅಳೆಯಲು ಬಳಸಲಾಗುತ್ತದೆ.', simId: 'pendulum', ytKn: 'ಲೋಲಕದ ಆವರ್ತಕಾಲ ಕನ್ನಡ', ytEn: 'Stopwatch Pendulum Timing' }
];

const SCIENTISTS = [
  { nameEn: 'Sir C. V. Raman', nameKn: 'ಸರ್ ಸಿ. ವಿ. ರಾಮನ್', dates: '1888–1970', origin: 'Indian', fieldEn: 'Physics (Optics)', fieldKn: 'ಭೌತಶಾಸ್ತ್ರ', icon: '🌈', contribEn: 'Discovered the Raman Effect (1928, Nobel Prize 1930).', contribKn: 'ರಾಮನ್ ಪರಿಣಾಮದ ಆವಿಷ್ಕಾರ (ನೊಬೆಲ್ ಪ್ರಶಸ್ತಿ 1930).', simId: 'optics' },
  { nameEn: 'Dr. A. P. J. Abdul Kalam', nameKn: 'ಡಾ. ಎ. ಪಿ. ಜೆ. ಅಬ್ದುಲ್ ಕಲಾಂ', dates: '1931–2015', origin: 'Indian', fieldEn: 'Aerospace & Missiles', fieldKn: 'ಬಾಹ್ಯಾಕಾಶ ವಿಜ್ಞಾನ', icon: '🚀', contribEn: 'SLV-III launch vehicle and Agni/Prithvi missile systems.', contribKn: 'ಭಾರತದ ಮೊದಲ ಉಪಗ್ರಹ ಉಡಾವಣಾ ವಾಹನ (SLV-III) ಮತ್ತು ಕ್ಷಿಪಣಿ ಅಭಿವೃದ್ಧಿ.', simId: 'motion' },
  { nameEn: 'Sir Jagadish Chandra Bose', nameKn: 'ಸರ್ ಜಗದೀಶ್ ಚಂದ್ರ ಬೋಸ್', dates: '1858–1937', origin: 'Indian', fieldEn: 'Physics & Plant Physiology', fieldKn: 'ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ಸಸ್ಯಶಾಸ್ತ್ರ', icon: '🌱', contribEn: 'Invented Crescograph and millimeter radio wave receivers.', contribKn: 'ಸಸ್ಯಗಳ ಬೆಳವಣಿಗೆ ಅಳೆಯುವ ಕ್ರೆಸ್ಕೋಗ್ರಾಫ್ ಆವಿಷ್ಕಾರ.', simId: 'plant' },
  { nameEn: 'Dr. Homi J. Bhabha', nameKn: 'ಡಾ. ಹೋಮಿ ಜೆ. ಭಾಭಾ', dates: '1909–1966', origin: 'Indian', fieldEn: 'Nuclear Physics', fieldKn: 'ಪರಮಾಣು ಭೌತಶಾಸ್ತ್ರ', icon: '⚛️', contribEn: 'Founder of TIFR & Architect of Indian Nuclear Programme.', contribKn: 'ಭಾರತದ ಪರಮಾಣು ಶಕ್ತಿ ಕಾರ್ಯಕ್ರಮದ ಪಿತಾಮಹ.', simId: 'particles' },
  { nameEn: 'Dr. Vikram Sarabhai', nameKn: 'ಡಾ. ವಿಕ್ರಮ್ ಸಾರಾಭಾಯ್', dates: '1919–1971', origin: 'Indian', fieldEn: 'Space Science', fieldKn: 'ಬಾಹ್ಯಾಕಾಶ ವಿಜ್ಞಾನ', icon: '🛰️', contribEn: 'Father of Indian Space Programme (ISRO).', contribKn: 'ಭಾರತೀಯ ಬಾಹ್ಯಾಕಾಶ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆಯ (ISRO) ಪಿತಾಮಹ.', simId: 'motion' },
  { nameEn: 'Dr. M. S. Swaminathan', nameKn: 'ಡಾ. ಎಂ. ಎಸ್. ಸ್ವಾಮಿನಾಥನ್', dates: '1925–2023', origin: 'Indian', fieldEn: 'Agricultural Genetics', fieldKn: 'ಕೃಷಿ ವಿಜ್ಞಾನ', icon: '🌾', contribEn: 'Architect of India’s Green Revolution & high-yield crops.', contribKn: 'ಭಾರತದ ಹಸಿರು ಕ್ರಾಂತಿಯ ಪಿತಾಮಹ.', simId: 'plant' },
  { nameEn: 'Srinivasa Ramanujan', nameKn: 'ಶ್ರೀನಿವಾಸ ರಾಮಾನುಜನ್', dates: '1887–1920', origin: 'Indian', fieldEn: 'Mathematics', fieldKn: 'ಗಣಿತಶಾಸ್ತ್ರ', icon: '♾️', contribEn: 'Number theory, infinite series, and mock theta functions.', contribKn: 'ಸಂಖ್ಯಾ ಸಿದ್ಧಾಂತ ಮತ್ತು ಅನಂತ ಶ್ರೇಣಿಗಳ ಕೊಡುಗೆ.', simId: 'pendulum' },
  { nameEn: 'Satyendra Nath Bose', nameKn: 'ಸತ್ಯೇಂದ್ರ ನಾಥ್ ಬೋಸ್', dates: '1894–1974', origin: 'Indian', fieldEn: 'Quantum Physics', fieldKn: 'ಕ್ವಾಂಟಮ್ ಭೌತಶಾಸ್ತ್ರ', icon: '✨', contribEn: 'Bose–Einstein statistics and Boson particles.', contribKn: 'ಬೋಸ್-ಐನ್‌ಸ್ಟೈನ್ ಸಾಂಖ್ಯಿಕ ಸಿದ್ಧಾಂತ ಮತ್ತು ಬೋಸಾನ್ ಕಣಗಳು.', simId: 'particles' },
  { nameEn: 'Dr. Janaki Ammal', nameKn: 'ಡಾ. ಜಾನಕಿ ಅಮ್ಮಾಳ್', dates: '1897–1984', origin: 'Indian', fieldEn: 'Cytogenetics & Botany', fieldKn: 'ಸಸ್ಯಶಾಸ್ತ್ರ', icon: '🌺', contribEn: 'Developed high-yielding sweet sugarcane hybrids for India.', contribKn: 'ಸಿಹಿ ಕಬ್ಬಿನ ಮಿಶ್ರತಳಿಗಳ ಸಂಶೋಧನೆ ಮಾಡಿದ ಮೊದಲ ಭಾರತೀಯ ಮಹಿಳಾ ಸಸ್ಯಶಾಸ್ತ್ರಜ್ಞೆ.', simId: 'plant' },
  { nameEn: 'Sir M. Visvesvaraya', nameKn: 'ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ', dates: '1861–1962', origin: 'Indian', fieldEn: 'Civil & Hydraulic Engineering', fieldKn: 'ಇಂಜಿನಿಯರಿಂಗ್', icon: '🌊', contribEn: 'Chief Engineer of KRS Dam and automatic floodgate patents.', contribKn: 'ಕನ್ನಂಬಾಡಿ ಅಣೆಕಟ್ಟು (KRS) ನಿರ್ಮಾಣ ಮತ್ತು ಸ್ವಯಂಚಾಲಿತ ಫ್ಲಡ್‌ಗೇಟ್ ವಿನ್ಯಾಸ.', simId: 'density' },
  { nameEn: 'Sir Isaac Newton', nameKn: 'ಸರ್ ಐಸಾಕ್ ನ್ಯೂಟನ್', dates: '1643–1727', origin: 'International', fieldEn: 'Physics & Calculus', fieldKn: 'ಭೌತಶಾಸ್ತ್ರ', icon: '🍎', contribEn: 'Three Laws of Motion, Universal Gravitation, and Prism Optics.', contribKn: 'ಚಲನೆಯ ನಿಯಮಗಳು ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣೆಯ ನಿಯಮ.', simId: 'motion' },
  { nameEn: 'Marie Skłodowska Curie', nameKn: 'ಮೇರಿ ಕ್ಯೂರಿ', dates: '1867–1934', origin: 'International', fieldEn: 'Physics & Chemistry', fieldKn: 'ರಸಾಯನಶಾಸ್ತ್ರ', icon: '🧪', contribEn: 'Pioneered radioactivity; discovered Polonium and Radium.', contribKn: 'ವಿಕಿರಣಶೀಲತೆ ಸಂಶೋಧನೆ; ಪೊಲೊನಿಯಮ್ ಮತ್ತು ರೇಡಿಯಮ್ ಆವಿಷ್ಕಾರ.', simId: 'particles' },
  { nameEn: 'Albert Einstein', nameKn: 'ಆಲ್ಬರ್ಟ್ ಐನ್‌ಸ್ಟೈನ್', dates: '1879–1955', origin: 'International', fieldEn: 'Theoretical Physics', fieldKn: 'ಭೌತಶಾಸ್ತ್ರ', icon: '⏳', contribEn: 'Photoelectric effect, Brownian motion, and Relativity (E=mc²).', contribKn: 'ದ್ಯುತಿವಿದ್ಯುತ್ ಪರಿಣಾಮ ಮತ್ತು ಸಾಪೇಕ್ಷತಾ ಸಿದ್ಧಾಂತ (E=mc²).', simId: 'optics' },
  { nameEn: 'Galileo Galilei', nameKn: 'ಗೆಲಿಲಿಯೋ ಗೆಲಿಲಿ', dates: '1564–1642', origin: 'International', fieldEn: 'Astronomy & Mechanics', fieldKn: 'ಖಗೋಳಶಾಸ್ತ್ರ', icon: '🔭', contribEn: 'Pendulum laws, kinematics of free fall, and telescope astronomy.', contribKn: 'ಲೋಲಕದ ನಿಯಮಗಳು ಮತ್ತು ದೂರದರ್ಶಕದ ಮೂಲಕ ಗ್ರಹಗಳ ವೀಕ್ಷಣೆ.', simId: 'pendulum' },
  { nameEn: 'Michael Faraday', nameKn: 'ಮೈಕೆಲ್ ಫ್ಯಾರಡೆ', dates: '1791–1867', origin: 'International', fieldEn: 'Electromagnetism', fieldKn: 'ವಿದ್ಯುತ್ಕಾಂತೀಯತೆ', icon: '🧲', contribEn: 'Electromagnetic induction, electric motor, and dynamo.', contribKn: 'ವಿದ್ಯುತ್ಕಾಂತೀಯ ಪ್ರೇರಣೆ ಮತ್ತು ಡೈನಮೋ ಆವಿಷ್ಕಾರ.', simId: 'magnetism' },
  { nameEn: 'Nikola Tesla', nameKn: 'ನಿಕೋಲಾ ಟೆಸ್ಲಾ', dates: '1856–1943', origin: 'International', fieldEn: 'Electrical Engineering', fieldKn: 'ವಿದ್ಯುತ್ ಇಂಜಿನಿಯರಿಂಗ್', icon: '⚡', contribEn: 'Alternating Current (AC) induction motor and power transmission.', contribKn: 'ಪರ್ಯಾಯ ವಿದ್ಯುತ್ ಪ್ರವಾಹ (AC) ವ್ಯವಸ್ಥೆಯ ಆವಿಷ್ಕಾರ.', simId: 'circuit' },
  { nameEn: 'Rosalind Franklin', nameKn: 'ರೊಸಾಲಿಂಡ್ ಫ್ರಾಂಕ್ಲಿನ್', dates: '1920–1958', origin: 'International', fieldEn: 'Biophysics', fieldKn: 'ಜೀವಭೌತಶಾಸ್ತ್ರ', icon: '🧬', contribEn: 'X-ray diffraction Photo 51 revealing the DNA double helix.', contribKn: 'ಡಿಎನ್‌ಎ (DNA) ದ್ವಿಸುರುಳಿ ರಚನೆಯನ್ನು ತೋರಿಸಿದ ಎಕ್ಸ್-ರೇ ಸಂಶೋಧನೆ.', simId: 'plant' },
  { nameEn: 'Charles Darwin', nameKn: 'ಚಾರ್ಲ್ಸ್ ಡಾರ್ವಿನ್', dates: '1809–1882', origin: 'International', fieldEn: 'Natural History & Biology', fieldKn: 'ಜೀವಶಾಸ್ತ್ರ', icon: '🐢', contribEn: 'Theory of Evolution by Natural Selection.', contribKn: 'ನೈಸರ್ಗಿಕ ಆಯ್ಕೆಯ ಮೂಲಕ ಜೀವ ವಿಕಾಸ ಸಿದ್ಧಾಂತ.', simId: 'plant' },
  { nameEn: 'Dmitri Mendeleev', nameKn: 'ಡಿಮಿಟ್ರಿ ಮೆಂಡಲೀವ್', dates: '1834–1907', origin: 'International', fieldEn: 'Chemistry', fieldKn: 'ರಸಾಯನಶಾಸ್ತ್ರ', icon: '📊', contribEn: 'Formulated the Periodic Table of Elements.', contribKn: 'ಧಾತುಗಳ ಆವರ್ತಕ ಕೋಷ್ಟಕದ (Periodic Table) ರಚನೆ.', simId: 'ph' },
  { nameEn: 'Archimedes of Syracuse', nameKn: 'ಆರ್ಕಿಮಿಡೀಸ್', dates: '287–212 BCE', origin: 'International', fieldEn: 'Physics & Mathematics', fieldKn: 'ಭೌತಶಾಸ್ತ್ರ', icon: '🛁', contribEn: 'Principle of Buoyancy, levers, and hydrostatics.', contribKn: 'ವಸ್ತುಗಳ ತೇಲುವಿಕೆಯ (ಪ್ಲವನಶೀಲತೆ) ತತ್ವ ಮತ್ತು ಸನ್ನೆಕೋಲಿನ ನಿಯಮ.', simId: 'density' }
];

const FACTS = [
  { cat: 'Physics', en: 'Sunlight takes about 8 minutes 20 seconds to reach Earth at 300,000 km/s.', kn: 'ಸೂರ್ಯನ ಬೆಳಕು ಭೂಮಿಯನ್ನು ತಲುಪಲು ಸುಮಾರು 8 ನಿಮಿಷ 20 ಸೆಕೆಂಡುಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.', simId: 'optics' },
  { cat: 'Physics', en: 'Water expands by about 9% when it freezes into ice, making ice float on water.', kn: 'ನೀರು ಮಂಜುಗಡ್ಡೆಯಾದಾಗ ಹಿಗ್ಗುವುದರಿಂದ ಅದರ ಸಾಂದ್ರತೆ ಕಡಿಮೆಯಾಗಿ ನೀರಿನ ಮೇಲೆ ತೇಲುತ್ತದೆ.', simId: 'density' },
  { cat: 'Physics', en: 'Sound travels over 4 times faster in water (~1480 m/s) than in air (~343 m/s).', kn: 'ಗಾಳಿಗಿಂತ ನೀರಿನಲ್ಲಿ ಶಬ್ದವು 4 ಪಟ್ಟು ವೇಗವಾಗಿ ಚಲಿಸುತ್ತದೆ.', simId: 'sound' },
  { cat: 'Physics', en: 'Celsius and Fahrenheit scales read the exact same number at -40° (-40°C = -40°F).', kn: '-40 ಡಿಗ್ರಿಯಲ್ಲಿ ಸೆಲ್ಸಿಯಸ್ ಮತ್ತು ಫ್ಯಾರನ್‌ಹೀಟ್ ಮಾಪಕಗಳು ಒಂದೇ ಮೌಲ್ಯವನ್ನು ತೋರಿಸುತ್ತವೆ.', simId: 'thermometer' },
  { cat: 'Physics', en: 'A pendulum clock runs slower at the equator than at the poles due to slight gravity differences.', kn: 'ಗುರುತ್ವಾಕರ್ಷಣೆಯ ವ್ಯತ್ಯಾಸದಿಂದಾಗಿ ಲೋಲಕದ ಗಡಿಯಾರವು ಧ್ರುವಗಳಿಗಿಂತ ಸಮಭಾಜಕ ವೃತ್ತದಲ್ಲಿ ನಿಧಾನವಾಗಿ ಚಲಿಸುತ್ತದೆ.', simId: 'pendulum' },
  { cat: 'Chemistry', en: 'Mercury is the only metallic element that is liquid at standard room temperature.', kn: 'ಕೊಠಡಿಯ ಸಾಮಾನ್ಯ ತಾಪಮಾನದಲ್ಲಿ ದ್ರವ ರೂಪದಲ್ಲಿರುವ ಏಕೈಕ ಲೋಹ ಪಾದರಸ (Mercury).', simId: 'thermometer' },
  { cat: 'Chemistry', en: 'Pure gold is so malleable that 1 gram can be beaten into a sheet of 1 square meter.', kn: 'ಶುದ್ಧ ಚಿನ್ನವು ಎಷ್ಟು ಕುಟ್ಟೆಗುಣ ಹೊಂದಿದೆ ಎಂದರೆ 1 ಗ್ರಾಂ ಚಿನ್ನವನ್ನು 1 ಚದರ ಮೀಟರ್ ಹಾಳೆಯನ್ನಾಗಿ ಮಾಡಬಹುದು.', simId: 'particles' },
  { cat: 'Chemistry', en: 'Human stomach acid (HCl) has a strong acidic pH between 1.5 and 3.5 to digest food.', kn: 'ಆಹಾರ ಜೀರ್ಣಿಸಿಕೊಳ್ಳಲು ನಮ್ಮ ಜಠರದಲ್ಲಿರುವ ಹೈಡ್ರೋಕ್ಲೋರಿಕ್ ಆಮ್ಲದ pH 1.5 ರಿಂದ 3.5 ರಷ್ಟಿರುತ್ತದೆ.', simId: 'ph' },
  { cat: 'Chemistry', en: 'Bee stings are acidic, while wasp stings are alkaline.', kn: 'ಜೇನುನೊಣದ ಕಡಿತವು ಆಮ್ಲೀಯವಾಗಿರುತ್ತದೆ, ಆದ್ದರಿಂದ ಅಡುಗೆ ಸೋಡಾ ಹಚ್ಚುವುದರಿಂದ ಉರಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ.', simId: 'ph' },
  { cat: 'Chemistry', en: 'Diamond and pencil graphite are both made solely of carbon atoms arranged differently.', kn: 'ವಜ್ರ ಮತ್ತು ಪೆನ್ಸಿಲ್ ಮುಳ್ಳು (ಗ್ರಾಫೈಟ್) ಎರಡೂ ಇಂಗಾಲದ ಪರಮಾಣುಗಳಿಂದಲೇ ಮಾಡಲ್ಪಟ್ಟಿವೆ.', simId: 'particles' },
  { cat: 'Biology', en: 'Plants release oxygen by splitting water molecules (H2O) during photosynthesis.', kn: 'ಸಸ್ಯಗಳು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯಲ್ಲಿ ನೀರಿನ ಅಣುವನ್ನು (H2O) ವಿಭಜಿಸಿ ಆಮ್ಲಜನಕವನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತವೆ.', simId: 'plant' },
  { cat: 'Biology', en: 'Stomata on the underside of leaves open and close via guard cells to regulate water loss.', kn: 'ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿರುವ ಪತ್ರರಂಧ್ರಗಳು (Stomata) ಅನಿಲಗಳ ವಿನಿಮಯ ಮತ್ತು ಭಾಷ್ಪವಿಸರ್ಜನೆಯನ್ನು ನಿಯಂತ್ರಿಸುತ್ತವೆ.', simId: 'plant' },
  { cat: 'Biology', en: 'Xylem tissue transports water upward from roots, while Phloem transports food.', kn: 'ಸಸ್ಯಗಳಲ್ಲಿ ಕ್ಸೈಲಂ ಅಂಗಾಂಶವು ನೀರನ್ನು ಮತ್ತು ಫ್ಲೋಯಂ ಅಂಗಾಂಶವು ಆಹಾರವನ್ನು ಸಾಗಿಸುತ್ತವೆ.', simId: 'plant' },
  { cat: 'Biology', en: 'The human body contains enough iron to make a small 3-inch metal nail.', kn: 'ಮನುಷ್ಯನ ದೇಹದಲ್ಲಿರುವ ಒಟ್ಟು ಕಬ್ಬಿಣದ ಅಂಶದಿಂದ ಒಂದು ಸಣ್ಣ ಮೊಳೆಯನ್ನು ತಯಾರಿಸಬಹುದು.', simId: 'magnetism' },
  { cat: 'Biology', en: 'Bats navigate in total darkness using ultrasonic echolocation above 20,000 Hz.', kn: 'ಬಾವಲಿಗಳು ರಾತ್ರಿ ವೇಳೆ ಶ್ರವಣಾತೀತ ಶಬ್ದ ತರಂಗಗಳ (Ultrasound) ಪ್ರತಿಧ್ವನಿಯ ಸಹಾಯದಿಂದ ಹಾರಾಡುತ್ತವೆ.', simId: 'sound' },
  { cat: 'Astronomy', en: 'Because Moon gravity is 1/6th of Earth’s, a 60 kg person weighs only 10 kg-force on the Moon.', kn: 'ಚಂದ್ರನ ಗುರುತ್ವಾಕರ್ಷಣೆಯು ಭೂಮಿಯ 1/6 ರಷ್ಟಿರುವುದರಿಂದ ಅಲ್ಲಿ ನಮ್ಮ ತೂಕ ಆರು ಪಟ್ಟು ಕಡಿಮೆಯಿರುತ್ತದೆ.', simId: 'motion' },
  { cat: 'Astronomy', en: 'Outer space is silent because sound waves cannot travel through a vacuum.', kn: 'ಬಾಹ್ಯಾಕಾಶದಲ್ಲಿ ಗಾಳಿ (ಮಾಧ್ಯಮ) ಇಲ್ಲದ ಕಾರಣ ಅಲ್ಲಿ ಶಬ್ದವು ಚಲಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.', simId: 'sound' },
  { cat: 'Astronomy', en: 'Neutron stars are so dense that a teaspoon of their material weighs billions of tons.', kn: 'ನ್ಯೂಟ್ರಾನ್ ನಕ್ಷತ್ರಗಳ ಸಾಂದ್ರತೆ ಎಷ್ಟಿರುತ್ತದೆ ಎಂದರೆ ಅದರ ಒಂದು ಚಮಚ ವಸ್ತುವಿನ ತೂಕ ಕೋಟ್ಯಂತರ ಟನ್ ಆಗಿರುತ್ತದೆ.', simId: 'density' },
  { cat: 'Astronomy', en: 'India’s Chandrayaan-3 successfully landed near the Moon’s South Pole on 23 August 2023.', kn: 'ಭಾರತದ ಚಂದ್ರಯಾನ-3 ನೌಕೆಯು ಆಗಸ್ಟ್ 23, 2023 ರಂದು ಚಂದ್ರನ ದಕ್ಷಿಣ ಧ್ರುವದಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ ಇಳಿಯಿತು.', simId: 'motion' },
  { cat: 'Astronomy', en: 'Venus spins backward (retrograde rotation) compared to most planets, so the Sun rises in the west.', kn: 'ಶುಕ್ರ ಗ್ರಹವು ವಿರುದ್ಧ ದಿಕ್ಕಿನಲ್ಲಿ ತಿರುಗುವುದರಿಂದ ಅಲ್ಲಿ ಸೂರ್ಯ ಪಶ್ಚಿಮದಲ್ಲಿ ಹುಟ್ಟಿ ಪೂರ್ವದಲ್ಲಿ ಮುಳುಗುತ್ತಾನೆ.', simId: 'motion' },
  { cat: 'Earth', en: 'Earth’s molten iron outer core generates the magnetic field that guides compasses.', kn: 'ಭೂಮಿಯ ಒಳಭಾಗದಲ್ಲಿರುವ ದ್ರವರೂಪದ ಕಬ್ಬಿಣದ ಚಲನೆಯಿಂದ ಭೂಮಿಗೆ ಕಾಂತೀಯ ಕ್ಷೇತ್ರ ಉಂಟಾಗಿದೆ.', simId: 'magnetism' },
  { cat: 'Earth', en: 'At the top of Mount Everest, water boils at around 70°C instead of 100°C due to low air pressure.', kn: 'ಮೌಂಟ್ ಎವರೆಸ್ಟ್ ಶಿಖರದ ಮೇಲೆ ವಾಯುಭಾರ ಕಡಿಮೆಯಿರುವುದರಿಂದ ನೀರು ಸುಮಾರು 70°C ನಲ್ಲೇ ಕುದಿಯುತ್ತದೆ.', simId: 'thermometer' },
  { cat: 'Earth', en: 'Rainbows form by refraction, dispersion, and internal reflection of sunlight inside raindrops.', kn: 'ಮಳೆಹನಿಗಳ ಒಳಗೆ ಸೂರ್ಯನ ಬೆಳಕಿನ ವಕ್ರೀಭವನ ಮತ್ತು ಪ್ರತಿಫಲನದಿಂದ ಕಾಮನಬಿಲ್ಲು ಮೂಡುತ್ತದೆ.', simId: 'optics' },
  { cat: 'Earth', en: 'The Dead Sea has such high salt density (~1.24 g/cm³) that swimmers float effortlessly.', kn: 'ಮೃತ ಸಮುದ್ರದ (Dead Sea) ನೀರಿನಲ್ಲಿ ಉಪ್ಪಿನ ಸಾಂದ್ರತೆ ಹೆಚ್ಚಿರುವುದರಿಂದ ಮನುಷ್ಯರು ಮುಳುಗದೆ ತೇಲುತ್ತಾರೆ.', simId: 'density' },
  { cat: 'Earth', en: 'Lightning heats the surrounding air to nearly 30,000°C, causing a shockwave we hear as thunder.', kn: 'ಮಿಂಚು ಸುತ್ತಲಿನ ಗಾಳಿಯನ್ನು ತಕ್ಷಣ ಬಿಸಿ ಮಾಡುವುದರಿಂದ ಹಿಗ್ಗುವ ಗಾಳಿಯು ಗುಡುಗಿನ ಶಬ್ದವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.', simId: 'sound' },
  { cat: 'Technology', en: 'Fiber optic cables transmit internet data as pulses of light using Total Internal Reflection.', kn: 'ಆಪ್ಟಿಕಲ್ ಫೈಬರ್ ಕೇಬಲ್‌ಗಳು ಬೆಳಕಿನ ಸಂಪೂರ್ಣ ಆಂತರಿಕ ಪ್ರತಿಫಲನ ತತ್ವದ ಮೇಲೆ ವೇಗವಾಗಿ ಇಂಟರ್ನೆಟ್ ಡೇಟಾ ಸಾಗಿಸುತ್ತವೆ.', simId: 'optics' },
  { cat: 'Technology', en: 'LED bulbs convert over 80% of electrical energy into light, wasting very little heat.', kn: 'ಎಲ್‌ಇಡಿ (LED) ಬಲ್ಬ್‌ಗಳು ಅತಿ ಕಡಿಮೆ ವಿದ್ಯುತ್ ಬಳಸಿ ಹೆಚ್ಚಿನ ಬೆಳಕನ್ನು ನೀಡುತ್ತವೆ.', simId: 'circuit' },
  { cat: 'Technology', en: 'Electric fuses have a low melting point so they melt and break the circuit during overloads.', kn: 'ವಿದ್ಯುತ್ ಫ್ಯೂಸ್ ತಂತಿಯು ಕಡಿಮೆ ದ್ರವಣ ಬಿಂದು ಹೊಂದಿದ್ದು, ಹೆಚ್ಚಿನ ವಿದ್ಯುತ್ ಹರಿದಾಗ ಕರಗಿ ಮಂಡಲವನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.', simId: 'ohmslaw' },
  { cat: 'Technology', en: 'Maglev trains float above tracks using powerful electromagnetic repulsion to eliminate friction.', kn: 'ಮ್ಯಾಗ್ಲೆವ್ (Maglev) ರೈಲುಗಳು ಕಾಂತೀಯ ವಿಕರ್ಷಣೆಯ ಮೂಲಕ ಹಳಿಯ ಮೇಲೆ ತೇಲುತ್ತಾ ಅತಿ ವೇಗವಾಗಿ ಚಲಿಸುತ್ತವೆ.', simId: 'magnetism' },
  { cat: 'Technology', en: 'SONAR uses reflected ultrasonic sound pulses to map the depth of the ocean floor.', kn: 'ಸಮುದ್ರದ ಆಳವನ್ನು ಅಳೆಯಲು ಸೋನಾರ್ (SONAR) ಉಪಕರಣವು ಶ್ರವಣಾತೀತ ತರಂಗಗಳನ್ನು ಬಳಸುತ್ತದೆ.', simId: 'sound' }
];

const KARNATAKA_GRADES = {
  '6': [
    { chEn: 'Fun with Magnets', chKn: 'ಕಾಂತಗಳೊಂದಿಗೆ ಆಟ', descEn: 'Discover magnetic vs non-magnetic materials, poles of a bar magnet, and how a compass finds direction.', descKn: 'ಕಾಂತೀಯ ಮತ್ತು ಅಕಾಂತೀಯ ವಸ್ತುಗಳು, ಕಾಂತದ ಧ್ರುವಗಳು ಮತ್ತು ದಿಕ್ಸೂಚಿಯ ಕಾರ್ಯವಿಧಾನ.', simId: 'magnetism' },
    { chEn: 'Electricity and Circuits', chKn: 'ವಿದ್ಯುಚ್ಛಕ್ತಿ ಮತ್ತು ಮಂಡಲಗಳು', descEn: 'Understand electric cells, bulb filaments, switches, conductors, and insulators.', descKn: 'ವಿದ್ಯುತ್ ಕೋಶ, ಬಲ್ಬ್, ಸ್ವಿಚ್, ವಿದ್ಯುತ್ ವಾಹಕಗಳು ಮತ್ತು ಅವಾಹಕಗಳ ಪರಿಚಯ.', simId: 'circuit' },
    { chEn: 'Light, Shadows and Reflections', chKn: 'ಬೆಳಕು, ನೆರಳುಗಳು ಮತ್ತು ಪ್ರತಿಫಲನಗಳು', descEn: 'Learn rectilinear propagation of light, pinhole cameras, and mirror reflections.', descKn: 'ಬೆಳಕಿನ ಸರಳರೇಖೆಯ ಚಲನೆ, ಸೂಜಿರಂಧ್ರ ಕ್ಯಾಮೆರಾ ಮತ್ತು ದರ್ಪಣದ ಪ್ರತಿಫಲನ.', simId: 'optics' }
  ],
  '7': [
    { chEn: 'Heat and Temperature', chKn: 'ಉಷ್ಣ ಮತ್ತು ತಾಪಮಾನ', descEn: 'Differentiate clinical and laboratory thermometers, conduction, convection, and radiation.', descKn: 'ವೈದ್ಯಕೀಯ ಮತ್ತು ಪ್ರಯೋಗಾಲಯ ತಾಪಮಾನ ಮಾಪಕಗಳ ಬಳಕೆ ಹಾಗೂ ಉಷ್ಣ ಪ್ರಸರಣ ವಿಧಾನಗಳು.', simId: 'thermometer' },
    { chEn: 'Acids, Bases and Salts', chKn: 'ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು', descEn: 'Test solutions with litmus, turmeric, China rose, and pH indicators; learn neutralization.', descKn: 'ಲಿಟ್ಮಸ್, ಅರಿಶಿನ ಮತ್ತು ದಾಸವಾಳ ಸೂಚಕಗಳ ಮೂಲಕ ಆಮ್ಲ ಮತ್ತು ಪ್ರತ್ಯಾಮ್ಲಗಳ ಪರೀಕ್ಷೆ.', simId: 'ph' },
    { chEn: 'Motion and Time', chKn: 'ಚಲನೆ ಮತ್ತು ಕಾಲ', descEn: 'Measure time period of a simple pendulum and plot distance-time graphs.', descKn: 'ಸರಳ ಲೋಲಕದ ಆವರ್ತಕಾಲ ಮತ್ತು ಜವದ ಲೆಕ್ಕಾಚಾರ.', simId: 'pendulum' }
  ],
  '8': [
    { chEn: 'Sound', chKn: 'ಶಬ್ದ', descEn: 'Explore sound production by vibrating bodies, frequency, pitch, amplitude, and loudness.', descKn: 'ಕಂಪಿಸುವ ವಸ್ತುಗಳಿಂದ ಶಬ್ದದ ಉತ್ಪತ್ತಿ, ಆವೃತ್ತಿ, ಪಾರ ಮತ್ತು ಶ್ರವಣ ವ್ಯಾಪ್ತಿ.', simId: 'sound' },
    { chEn: 'Chemical Effects of Electric Current', chKn: 'ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ರಾಸಾಯನಿಕ ಪರಿಣಾಮಗಳು', descEn: 'Test electrical conductivity of liquids and electroplating.', descKn: 'ದ್ರವಗಳ ವಿದ್ಯುತ್ ವಾಹಕತೆ ಮತ್ತು ವಿದ್ಯುತ್ ಲೇಪನ.', simId: 'circuit' },
    { chEn: 'Crop Production & Plant Nutrition', chKn: 'ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ಸಸ್ಯ ಪೋಷಣೆ', descEn: 'Role of water, sunlight, and soil nutrients in healthy crop growth.', descKn: 'ಬೆಳೆಗಳ ಬೆಳವಣಿಗೆಗೆ ನೀರು, ಬೆಳಕು ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಮಹತ್ವ.', simId: 'plant' }
  ],
  '9': [
    { chEn: 'Matter in Our Surroundings', chKn: 'ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ದ್ರವ್ಯವು', descEn: 'Particle nature of solids, liquids, and gases, latent heat, and evaporation.', descKn: 'ಘನ, ದ್ರವ ಮತ್ತು ಅನಿಲ ಸ್ಥಿತಿಗಳಲ್ಲಿ ಕಣಗಳ ಚಲನೆ ಮತ್ತು ಸ್ಥಿತಿ ಬದಲಾವಣೆ.', simId: 'particles' },
    { chEn: 'Gravitation & Floatation', chKn: 'ಗುರುತ್ವಾಕರ್ಷಣೆ ಮತ್ತು ತೇಲುವಿಕೆ', descEn: 'Universal law of gravitation, free fall acceleration (g), density, and Archimedes’ principle.', descKn: 'ಗುರುತ್ವಾಕರ್ಷಣೆಯ ನಿಯಮ, ಮುಕ್ತ ಪತನ, ಸಾಂದ್ರತೆ ಮತ್ತು ಆರ್ಕಿಮಿಡೀಸ್ ತತ್ವ.', simId: 'density' },
    { chEn: 'Motion & Laws of Motion', chKn: 'ಚಲನೆ ಮತ್ತು ಚಲನೆಯ ನಿಯಮಗಳು', descEn: 'Velocity, uniform acceleration, and kinematic equations of motion.', descKn: 'ವೇಗ, ವೇಗೋತ್ಕರ್ಷ ಮತ್ತು ಚಲನೆಯ ಸಮೀಕರಣಗಳು.', simId: 'motion' }
  ],
  '10': [
    { chEn: 'Electricity (Ohm’s Law)', chKn: 'ವಿದ್ಯುಚ್ಛಕ್ತಿ (ಓಮ್‌ನ ನಿಯಮ)', descEn: 'Verify V = IR, series/parallel resistors, and Joule’s heating effect.', descKn: 'ಓಮ್‌ನ ನಿಯಮ (V = IR), ರೋಧಕಗಳ ಜೋಡಣೆ ಮತ್ತು ವಿದ್ಯುತ್ ಸಾಮರ್ಥ್ಯ.', simId: 'ohmslaw' },
    { chEn: 'Light — Reflection and Refraction', chKn: 'ಬೆಳಕು — ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ', descEn: 'Spherical mirrors, lenses, refractive index, and Snell’s law.', descKn: 'ಗೋಳೀಯ ದರ್ಪಣಗಳು, ಮಸೂರಗಳು ಮತ್ತು ಬೆಳಕಿನ ವಕ್ರೀಭವನದ ನಿಯಮಗಳು.', simId: 'optics' },
    { chEn: 'Acids, Bases and Salts (pH Scale)', chKn: 'ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು', descEn: 'Universal indicator pH scale (0–14) and importance of pH in everyday life.', descKn: 'pH ಮಾಪಕ ಮತ್ತು ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ pH ನ ಮಹತ್ವ.', simId: 'ph' }
  ]
};

const QUIZ_QUESTIONS = [
  { cat: 'Easy', grade: 'Grade 6', qEn: 'Which material is attracted by a bar magnet?', qKn: 'ದಂಡಕಾಂತಕ್ಕೆ ಆಕರ್ಷಿತವಾಗುವ ವಸ್ತು ಯಾವುದು?', opts: ['Iron nail / ಕಬ್ಬಿಣದ ಮೊಳೆ', 'Plastic scale / ಪ್ಲಾಸ್ಟಿಕ್ ಪಟ್ಟಿ', 'Dry wood / ಒಣ ಮರ'], ans: 0, expEn: 'Iron is ferromagnetic.', expKn: 'ಕಬ್ಬಿಣವು ಕಾಂತೀಯ ವಸ್ತುವಾಗಿದೆ.' },
  { cat: 'Easy', grade: 'Grade 7', qEn: 'What is the normal temperature of a healthy human body?', qKn: 'ಆರೋಗ್ಯವಂತ ಮನುಷ್ಯನ ದೇಹದ ಸಾಮಾನ್ಯ ತಾಪಮಾನ ಎಷ್ಟು?', opts: ['37°C', '100°C', '0°C'], ans: 0, expEn: 'Normal body temperature is 37°C (98.6°F).', expKn: 'ಸಾಮಾನ್ಯ ದೇಹದ ತಾಪಮಾನ 37°C ಆಗಿರುತ್ತದೆ.' },
  { cat: 'Easy', grade: 'Grade 7', qEn: 'What is the pH of pure neutral water?', qKn: 'ಶುದ್ಧ ತಟಸ್ಥ ನೀರಿನ pH ಮೌಲ್ಯ ಎಷ್ಟು?', opts: ['7', '1', '14'], ans: 0, expEn: 'pH 7 indicates a neutral substance.', expKn: 'pH 7 ತಟಸ್ಥ ದ್ರಾವಣವನ್ನು ಸೂಚಿಸುತ್ತದೆ.' },
  { cat: 'Medium', grade: 'Grade 8', qEn: 'Can sound waves travel through a vacuum?', qKn: 'ನಿರ್ವಾತದಲ್ಲಿ ಶಬ್ದವು ಚಲಿಸಬಲ್ಲದೇ?', opts: ['No, sound requires a medium / ಇಲ್ಲ, ಮಾಧ್ಯಮ ಬೇಕು', 'Yes, very fast', 'Only high pitch'], ans: 0, expEn: 'Sound is a mechanical wave and needs particles to vibrate.', expKn: 'ಶಬ್ದ ಚಲಿಸಲು ಗಾಳಿ, ದ್ರವ ಅಥವಾ ಘನ ಮಾಧ್ಯಮದ ಅಗತ್ಯವಿದೆ.' },
  { cat: 'Medium', grade: 'Grade 9', qEn: 'Why does ice float on liquid water?', qKn: 'ಮಂಜುಗಡ್ಡೆಯು ನೀರಿನ ಮೇಲೆ ಏಕೆ ತೇಲುತ್ತದೆ?', opts: ['Density of ice (0.92 g/cm³) is less than water (1.0 g/cm³)', 'Ice is heavier than water', 'Ice has zero mass'], ans: 0, expEn: 'Objects less dense than water float.', expKn: 'ಮಂಜುಗಡ್ಡೆಯ ಸಾಂದ್ರತೆಯು ನೀರಿಗಿಂತ ಕಡಿಮೆ ಇರುವುದರಿಂದ ತೇಲುತ್ತದೆ.' },
  { cat: 'Hard', grade: 'Grade 10', qEn: 'According to Ohm’s Law, if Voltage V = 12V and Resistance R = 3Ω, what is Current I?', qKn: 'ಓಮ್‌ನ ನಿಯಮದಂತೆ V = 12V ಮತ್ತು R = 3Ω ಆಗಿದ್ದರೆ, ವಿದ್ಯುತ್ ಪ್ರವಾಹ (I) ಎಷ್ಟು?', opts: ['4 A', '36 A', '0.25 A'], ans: 0, expEn: 'I = V / R = 12 / 3 = 4 Amperes.', expKn: 'I = V / R = 12 / 3 = 4 ಆಂಪಿಯರ್.' },
  { cat: 'Hard', grade: 'Grade 10', qEn: 'Who discovered the scattering of light celebrated on National Science Day (Feb 28)?', qKn: 'ರಾಷ್ಟ್ರೀಯ ವಿಜ್ಞಾನ ದಿನದಂದು (ಫೆಬ್ರವರಿ 28) ಸ್ಮರಿಸಲಾಗುವ ಬೆಳಕಿನ ಚದುರುವಿಕೆಯ ಆವಿಷ್ಕಾರ ಮಾಡಿದವರು ಯಾರು?', opts: ['Sir C. V. Raman / ಸರ್ ಸಿ. ವಿ. ರಾಮನ್', 'Isaac Newton', 'Nikola Tesla'], ans: 0, expEn: 'Sir C. V. Raman discovered the Raman Effect on 28 Feb 1928.', expKn: 'ಸರ್ ಸಿ. ವಿ. ರಾಮನ್ ಅವರು ಫೆಬ್ರವರಿ 28, 1928 ರಂದು ರಾಮನ್ ಪರಿಣಾಮವನ್ನು ಕಂಡುಹಿಡಿದರು.' }
];

/* ============================================================================
   NAVIGATION & RENDERING FUNCTIONS
   ============================================================================ */
function navigateToSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  const targetSec = document.getElementById(`section-${sectionId}`);
  if (targetSec) targetSec.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === sectionId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openSimulation(simId) {
  currentSimId = simId;
  navigateToSection('simulations');
  renderSimTabs();
  renderActiveSimulation();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (UI_TEXT[key]) {
      el.textContent = t(UI_TEXT[key].en, UI_TEXT[key].kn);
    }
  });
  renderHome();
  renderSimTabs();
  renderActiveSimulation();
  renderMaterials();
  renderScientists();
  renderFacts();
  renderKarnataka();
  renderVideos();
  renderQuiz();
}

function renderHome() {
  const featGrid = document.getElementById('home-featured-sims-grid');
  if (featGrid) {
    featGrid.innerHTML = SIMULATIONS.slice(0, 6).map(sim => `
      <div class="lab-card">
        <div>
          <span class="card-tag">Interactive Sim</span>
          <h3>${t(sim.titleEn, sim.titleKn)}</h3>
          <p>${t(sim.objectiveEn, sim.objectiveKn)}</p>
        </div>
        <div class="card-actions-row">
          <button class="btn-primary" onclick="openSimulation('${sim.id}')">▶ ${t('Launch Sim', 'ಪ್ರಯೋಗ ಪ್ರಾರಂಭಿಸಿ')}</button>
          <a href="${ytUrl(sim.ytKn)}" target="_blank" rel="noopener" class="yt-badge-kn">▶ ಕನ್ನಡ Video</a>
        </div>
      </div>
    `).join('');
  }

  const actGrid = document.getElementById('home-activities-grid');
  if (actGrid) {
    actGrid.innerHTML = KARNATAKA_GRADES['7'].concat(KARNATAKA_GRADES['10']).slice(0, 3).map(item => `
      <div class="lab-card">
        <div>
          <span class="card-tag">Hands-on Activity</span>
          <h3>${t(item.chEn, item.chKn)}</h3>
          <p>${t(item.descEn, item.descKn)}</p>
        </div>
        <button class="btn-gold-sm" onclick="openSimulation('${item.simId}')">🔬 ${t('Try Virtual Experiment', 'ವರ್ಚುವಲ್ ಪ್ರಯೋಗ ಮಾಡಿ')}</button>
      </div>
    `).join('');
  }

  const sciPrev = document.getElementById('home-scientists-preview');
  if (sciPrev) {
    sciPrev.innerHTML = SCIENTISTS.slice(0, 3).map(s => `
      <div class="lab-card">
        <strong>${s.icon} ${t(s.nameEn, s.nameKn)} (${s.dates})</strong>
        <p>${t(s.contribEn, s.contribKn)}</p>
      </div>
    `).join('');
  }

  const factPrev = document.getElementById('home-facts-preview');
  if (factPrev) {
    factPrev.innerHTML = FACTS.slice(0, 3).map(f => `
      <div class="lab-card">
        <span class="card-tag">${f.cat}</span>
        <p>${t(f.en, f.kn)}</p>
      </div>
    `).join('');
  }
}

function renderSimTabs() {
  const bar = document.getElementById('sim-selector-tabs');
  if (!bar) return;
  bar.innerHTML = SIMULATIONS.map(sim => `
    <button class="sim-tab-btn ${sim.id === currentSimId ? 'active' : ''}" onclick="openSimulation('${sim.id}')">
      ${t(sim.titleEn, sim.titleKn)}
    </button>
  `).join('');
}

function renderActiveSimulation() {
  const box = document.getElementById('active-sim-workspace');
  if (!box) return;
  const sim = SIMULATIONS.find(s => s.id === currentSimId) || SIMULATIONS[0];

  box.innerHTML = `
    <h2>${t(sim.titleEn, sim.titleKn)}</h2>
    <p>${t(sim.objectiveEn, sim.objectiveKn)}</p>
    <div class="sim-grid">
      <div class="sim-stage" id="sim-visual-stage"></div>
      <div class="sim-controls-panel" id="sim-controls-box"></div>
    </div>
    <div class="readout-box">
      <strong>📘 ${t('Scientific Principle:', 'ವೈಜ್ಞಾನಿಕ ವಿವರಣೆ:')}</strong> ${t(sim.explanationEn, sim.explanationKn)}
    </div>
    <div class="safety-alert">
      <strong>⚠️ ${t('Safety Precaution:', 'ಸುರಕ್ಷತಾ ಮುನ್ನೆಚ್ಚರಿಕೆ:')}</strong> ${t(sim.safetyEn, sim.safetyKn)}
    </div>
    <div class="card-actions-row" style="margin-top:1rem;">
      <a href="${ytUrl(sim.ytKn)}" target="_blank" rel="noopener" class="yt-badge-kn">▶ ಕನ್ನಡ ವಿವರಣೆ ವೀಡಿಯೊ</a>
      <a href="${ytUrl(sim.ytEn)}" target="_blank" rel="noopener" class="yt-badge-en">▶ English Video Lesson</a>
    </div>
  `;
  setupInteractiveSimControls(sim.id);
}

function setupInteractiveSimControls(id) {
  const stage = document.getElementById('sim-visual-stage');
  const ctrl = document.getElementById('sim-controls-box');
  if (!stage || !ctrl) return;

  if (id === 'thermometer') {
    ctrl.innerHTML = `
      <div class="control-group">
        <label>Temperature (°C): <span id="val-temp">25°C</span></label>
        <input type="range" id="inp-temp" min="-10" max="110" value="25">
      </div>
      <div class="readout-box" id="sim-live-readout"></div>
    `;
    const inp = document.getElementById('inp-temp');
    const update = () => {
      const c = Number(inp.value);
      const f = ((c * 9/5) + 32).toFixed(1);
      const k = (c + 273.15).toFixed(1);
      const h = Math.max(10, Math.min(180, (c + 10) * 1.4));
      document.getElementById('val-temp').textContent = `${c}°C`;
      stage.innerHTML = `
        <svg viewBox="0 0 200 240" width="200" height="240">
          <rect x="88" y="20" width="24" height="175" rx="12" fill="#1E293B" stroke="#94A3B8" stroke-width="2"/>
          <rect x="93" y="${190 - h}" width="14" height="${h}" fill="#F87171"/>
          <circle cx="100" cy="200" r="22" fill="#F87171" stroke="#94A3B8" stroke-width="2"/>
          <text x="130" y="110" fill="#F5C451" font-size="16" font-weight="bold">${c} °C</text>
        </svg>
      `;
      document.getElementById('sim-live-readout').innerHTML = `Celsius: <b>${c}°C</b> | Fahrenheit: <b>${f}°F</b> | Kelvin: <b>${k} K</b><br>Water State: <b>${c <= 0 ? 'Solid Ice (ಮಂಜುಗಡ್ಡೆ)' : c >= 100 ? 'Steam Gas (ಆವಿ)' : 'Liquid Water (ದ್ರವ ನೀರು)'}</b>`;
    };
    inp.addEventListener('input', update);
    update();
  } else if (id === 'circuit' || id === 'ohmslaw') {
    ctrl.innerHTML = `
      <div class="control-group">
        <label>Battery Voltage (V): <span id="val-v">6 V</span></label>
        <input type="range" id="inp-v" min="1.5" max="12" step="0.5" value="6">
      </div>
      <div class="control-group">
        <label>Resistance (R): <span id="val-r">3 Ω</span></label>
        <input type="range" id="inp-r" min="1" max="12" step="1" value="3">
      </div>
      <div class="readout-box" id="sim-live-readout"></div>
    `;
    const iv = document.getElementById('inp-v');
    const ir = document.getElementById('inp-r');
    const update = () => {
      const v = Number(iv.value);
      const r = Number(ir.value);
      const amp = (v / r).toFixed(2);
      const glow = Math.min(1, amp / 4);
      document.getElementById('val-v').textContent = `${v} V`;
      document.getElementById('val-r').textContent = `${r} Ω`;
      stage.innerHTML = `
        <svg viewBox="0 0 260 190" width="260" height="190">
          <rect x="30" y="45" width="200" height="110" fill="none" stroke="#22D3EE" stroke-width="3"/>
          <circle cx="130" cy="45" r="22" fill="rgba(245, 196, 81, ${glow})" stroke="#F5C451" stroke-width="2"/>
          <text x="130" y="50" text-anchor="middle" fill="#fff" font-size="12">💡</text>
          <text x="130" y="145" text-anchor="middle" fill="#22D3EE" font-size="14" font-weight="bold">I = ${amp} A</text>
        </svg>
      `;
      document.getElementById('sim-live-readout').innerHTML = `Voltage (V): <b>${v} V</b> | Resistance (R): <b>${r} Ω</b> | Current (I = V/R): <b>${amp} A</b>`;
    };
    iv.addEventListener('input', update);
    ir.addEventListener('input', update);
    update();
  } else if (id === 'ph') {
    ctrl.innerHTML = `
      <div class="control-group">
        <label>Select Solution pH: <span id="val-ph">7.0</span></label>
        <input type="range" id="inp-ph" min="1" max="14" step="0.5" value="7">
      </div>
      <div class="readout-box" id="sim-live-readout"></div>
    `;
    const iph = document.getElementById('inp-ph');
    const update = () => {
      const p = Number(iph.value);
      document.getElementById('val-ph').textContent = p;
      const col = p < 4 ? '#EF4444' : p < 6.8 ? '#F59E0B' : p <= 7.2 ? '#10B981' : p < 10 ? '#06B6D4' : '#6366F1';
      const type = p < 7 ? 'Acidic (ಆಮ್ಲೀಯ)' : p === 7 ? 'Neutral (ತಟಸ್ಥ)' : 'Basic / Alkaline (ಪ್ರತ್ಯಾಮ್ಲೀಯ)';
      stage.innerHTML = `
        <svg viewBox="0 0 220 200" width="220" height="200">
          <rect x="65" y="40" width="90" height="130" rx="8" fill="#1E293B" stroke="#94A3B8" stroke-width="2"/>
          <rect x="70" y="85" width="80" height="80" rx="4" fill="${col}" opacity="0.85"/>
          <rect x="102" y="20" width="16" height="95" fill="${col}" stroke="#fff"/>
          <text x="110" y="188" text-anchor="middle" fill="#F8FAFC" font-size="14" font-weight="bold">pH = ${p}</text>
        </svg>
      `;
      document.getElementById('sim-live-readout').innerHTML = `pH Value: <b>${p}</b> | Nature: <b>${type}</b>`;
    };
    iph.addEventListener('input', update);
    update();
  } else {
    ctrl.innerHTML = `
      <div class="control-group">
        <label>Parameter Intensity / Input Value: <span id="val-gen">50</span></label>
        <input type="range" id="inp-gen" min="10" max="100" value="50">
      </div>
      <div class="readout-box" id="sim-live-readout"></div>
    `;
    const igen = document.getElementById('inp-gen');
    const update = () => {
      const val = Number(igen.value);
      document.getElementById('val-gen').textContent = val;
      const r = 20 + val * 0.5;
      stage.innerHTML = `
        <svg viewBox="0 0 240 200" width="240" height="200">
          <circle cx="120" cy="100" r="${r}" fill="rgba(34, 211, 238, 0.25)" stroke="#22D3EE" stroke-width="3"/>
          <circle cx="120" cy="100" r="10" fill="#F5C451"/>
          <text x="120" y="185" text-anchor="middle" fill="#F5C451" font-size="14" font-weight="bold">Active Level: ${val}%</text>
        </svg>
      `;
      document.getElementById('sim-live-readout').innerHTML = `Input Setting: <b>${val}%</b> | Output Response: <b>${(val * 1.45).toFixed(1)} units</b>`;
    };
    igen.addEventListener('input', update);
    update();
  }
}

function renderMaterials() {
  const grid = document.getElementById('materials-grid');
  if (!grid) return;
  const q = (document.getElementById('material-search')?.value || '').toLowerCase();
  const cat = document.getElementById('material-category-filter')?.value || 'all';

  const list = MATERIALS.filter(m => {
    const matchCat = cat === 'all' || m.category === cat;
    const matchQ = !q || m.nameEn.toLowerCase().includes(q) || m.nameKn.includes(q);
    return matchCat && matchQ;
  });

  grid.innerHTML = list.map(m => `
    <div class="lab-card">
      <div>
        <span class="card-tag">${m.icon} ${m.category.toUpperCase()}</span>
        <h3>${t(m.nameEn, m.nameKn)}</h3>
        <p>${t(m.principleEn, m.principleKn)}</p>
      </div>
      <div class="card-actions-row">
        <button class="btn-primary" onclick="openSimulation('${m.simId}')">🔬 ${t('Open Simulation', 'ಪ್ರಯೋಗ ಮಾಡಿ')}</button>
        <a href="${ytUrl(m.ytKn)}" target="_blank" rel="noopener" class="yt-badge-kn">▶ ಕನ್ನಡ</a>
        <a href="${ytUrl(m.ytEn)}" target="_blank" rel="noopener" class="yt-badge-en">▶ English</a>
      </div>
    </div>
  `).join('');
}

function renderScientists() {
  const grid = document.getElementById('scientists-grid');
  if (!grid) return;
  const q = (document.getElementById('scientist-search')?.value || '').toLowerCase();
  const orig = document.getElementById('scientist-origin-filter')?.value || 'all';

  const list = SCIENTISTS.filter(s => {
    const matchOrig = orig === 'all' || s.origin === orig;
    const matchQ = !q || s.nameEn.toLowerCase().includes(q) || s.nameKn.includes(q) || s.contribEn.toLowerCase().includes(q);
    return matchOrig && matchQ;
  });

  grid.innerHTML = list.map(s => `
    <div class="lab-card">
      <div class="scientist-header">
        <div class="scientist-avatar">${createScientistAvatarSVG(s.nameEn, '#22D3EE', s.icon)}</div>
        <div>
          <span class="card-tag">${s.origin === 'Indian' ? '🇮🇳 ಭಾರತೀಯ ವಿಜ್ಞಾನಿ' : '🌍 International'} • ${s.dates}</span>
          <h3>${t(s.nameEn, s.nameKn)}</h3>
          <small style="color:var(--gold)">${t(s.fieldEn, s.fieldKn)}</small>
        </div>
      </div>
      <p>${t(s.contribEn, s.contribKn)}</p>
      <div class="card-actions-row">
        <button class="btn-gold-sm" onclick="openSimulation('${s.simId}')">⚡ ${t('Try Related Sim', 'ಸಂಬಂಧಿತ ಪ್ರಯೋಗ')}</button>
        <a href="${ytUrl(s.nameKn + ' ವಿಜ್ಞಾನಿ ಕನ್ನಡ')}" target="_blank" rel="noopener" class="yt-badge-kn">▶ ಕನ್ನಡ ಜೀವನ ಚರಿತ್ರೆ</a>
      </div>
    </div>
  `).join('');
}

function renderFacts() {
  const grid = document.getElementById('facts-grid');
  if (!grid) return;
  const cat = document.getElementById('fact-category-filter')?.value || 'all';
  const list = FACTS.filter(f => cat === 'all' || f.cat === cat);

  grid.innerHTML = list.map((f, i) => `
    <div class="lab-card">
      <div>
        <span class="card-tag">#${i + 1} • ${f.cat}</span>
        <p style="margin-top:0.5rem;">${t(f.en, f.kn)}</p>
      </div>
      <button class="btn-outline" onclick="openSimulation('${f.simId}')">🔬 ${t('Explore in Lab', 'ಪ್ರಯೋಗಾಲಯದಲ್ಲಿ ನೋಡಿ')}</button>
    </div>
  `).join('');
}

function renderKarnataka() {
  const box = document.getElementById('karnataka-content');
  if (!box) return;
  const chapters = KARNATAKA_GRADES[currentGrade] || KARNATAKA_GRADES['6'];

  box.innerHTML = `
    <div class="card-grid-3">
      ${chapters.map(ch => `
        <div class="lab-card">
          <div>
            <span class="card-tag">Class ${currentGrade} • KTBS</span>
            <h3>${t(ch.chEn, ch.chKn)}</h3>
            <p>${t(ch.descEn, ch.descKn)}</p>
          </div>
          <div class="card-actions-row">
            <button class="btn-primary" onclick="openSimulation('${ch.simId}')">🔬 ${t('Launch Lab Sim', 'ಪ್ರಯೋಗ ಪ್ರಾರಂಭಿಸಿ')}</button>
            <a href="${ytUrl(ch.chKn + ' ' + currentGrade + 'ನೇ ತರಗತಿ ವಿಜ್ಞಾನ')}" target="_blank" rel="noopener" class="yt-badge-kn">▶ ಕನ್ನಡ ಪಾಠ</a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderVideos() {
  const grid = document.getElementById('videos-grid');
  if (!grid) return;
  grid.innerHTML = SIMULATIONS.map(sim => `
    <div class="lab-card">
      <div>
        <span class="card-tag">🎬 Bilingual Video + Sim</span>
        <h3>${t(sim.titleEn, sim.titleKn)}</h3>
        <p>${t(sim.objectiveEn, sim.objectiveKn)}</p>
      </div>
      <div class="card-actions-row">
        <a href="${ytUrl(sim.ytKn)}" target="_blank" rel="noopener" class="yt-badge-kn">▶ ಕನ್ನಡ ವೀಡಿಯೊ</a>
        <a href="${ytUrl(sim.ytEn)}" target="_blank" rel="noopener" class="yt-badge-en">▶ English Video</a>
        <button class="btn-gold-sm" onclick="openSimulation('${sim.id}')">⚡ Sim</button>
      </div>
    </div>
  `).join('');
}

function renderQuiz() {
  const box = document.getElementById('quiz-workspace');
  if (!box) return;
  const mode = document.getElementById('quiz-category-select')?.value || 'all';
  const list = QUIZ_QUESTIONS.filter(q => mode === 'all' || q.cat === mode || q.grade === mode);

  box.innerHTML = list.map((q, idx) => `
    <div style="margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border-col);">
      <span class="card-tag">${q.cat} • ${q.grade}</span>
      <h3 style="margin:0.5rem 0;">Q${idx + 1}. ${t(q.qEn, q.qKn)}</h3>
      <div class="quiz-options">
        ${q.opts.map((opt, oIdx) => `
          <button class="quiz-opt-btn" onclick="checkQuizAnswer(this, ${oIdx === q.ans}, '${q.expKn.replace(/'/g, "")} / ${q.expEn.replace(/'/g, "")}')">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback hidden read-out"></div>
    </div>
  `).join('');
}

function checkQuizAnswer(btn, isCorrect, explanation) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  const fb = parent.nextElementSibling;
  fb.classList.remove('hidden');
  fb.style.padding = '0.6rem';
  fb.style.marginTop = '0.4rem';
  fb.style.color = isCorrect ? '#34D399' : '#F87171';
  fb.innerHTML = (isCorrect ? '✅ ಸರಿ ಉತ್ತರ! / Correct! — ' : '❌ ತಪ್ಪು ಉತ್ತರ / Try Again — ') + explanation;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateToSection(btn.dataset.target));
  });

  const langSel = document.getElementById('lang-select');
  if (langSel) {
    langSel.value = currentLang;
    langSel.addEventListener('change', e => {
      currentLang = e.target.value;
      localStorage.setItem('instalab_lang', currentLang);
      applyTranslations();
    });
  }

  document.querySelectorAll('.grade-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.grade-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentGrade = tab.dataset.grade;
      renderKarnataka();
    });
  });

  document.getElementById('material-search')?.addEventListener('input', renderMaterials);
  document.getElementById('material-category-filter')?.addEventListener('change', renderMaterials);
  document.getElementById('scientist-search')?.addEventListener('input', renderScientists);
  document.getElementById('scientist-origin-filter')?.addEventListener('change', renderScientists);
  document.getElementById('fact-category-filter')?.addEventListener('change', renderFacts);
  document.getElementById('quiz-category-select')?.addEventListener('change', renderQuiz);
  document.getElementById('start-quiz-btn')?.addEventListener('click', renderQuiz);

  applyTranslations();
});