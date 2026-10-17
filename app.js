/* InstaLab interactive science learning — improved upload version */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const state = { language: "both", score: 0, questionIndex: 0, answered: false, circuitOn: false };

  const questions = [
    { q: "Which gas do plants absorb during photosynthesis? / ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯಲ್ಲಿ ಸಸ್ಯಗಳು ಯಾವ ಅನಿಲವನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತವೆ?", answers: ["Oxygen / ಆಮ್ಲಜನಕ", "Carbon dioxide / ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್", "Nitrogen / ಸಾರಜನಕ"], correct: 1, explanation: "Plants use carbon dioxide, water and light to make sugars. / ಸಸ್ಯಗಳು ಸಕ್ಕರೆ ತಯಾರಿಸಲು ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್, ನೀರು ಮತ್ತು ಬೆಳಕನ್ನು ಬಳಸುತ್ತವೆ." },
    { q: "What is the SI unit of force? / ಬಲದ SI ಘಟಕ ಯಾವುದು?", answers: ["Joule / ಜೌಲ್", "Watt / ವ್ಯಾಟ್", "Newton / ನ್ಯೂಟನ್"], correct: 2, explanation: "Force is measured in newtons (N). / ಬಲವನ್ನು ನ್ಯೂಟನ್ (N) ನಲ್ಲಿ ಅಳೆಯಲಾಗುತ್ತದೆ." },
    { q: "Which state generally keeps its own shape? / ಯಾವ ಸ್ಥಿತಿಯು ಸಾಮಾನ್ಯವಾಗಿ ತನ್ನ ಆಕಾರವನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ?", answers: ["Solid / ಘನ", "Liquid / ದ್ರವ", "Gas / ಅನಿಲ"], correct: 0, explanation: "A solid generally keeps its own shape. / ಘನ ಪದಾರ್ಥವು ಸಾಮಾನ್ಯವಾಗಿ ತನ್ನ ಆಕಾರವನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ." },
    { q: "Which plant part absorbs water from soil? / ಮಣ್ಣಿನಿಂದ ನೀರನ್ನು ಯಾವ ಸಸ್ಯಭಾಗ ಹೀರಿಕೊಳ್ಳುತ್ತದೆ?", answers: ["Flower / ಹೂವು", "Roots / ಬೇರುಗಳು", "Fruit / ಹಣ್ಣು"], correct: 1, explanation: "Roots absorb water and minerals from soil. / ಬೇರುಗಳು ಮಣ್ಣಿನಿಂದ ನೀರು ಮತ್ತು ಖನಿಜಗಳನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತವೆ." },
    { q: "What is the closest star to Earth? / ಭೂಮಿಗೆ ಅತ್ಯಂತ ಹತ್ತಿರದ ನಕ್ಷತ್ರ ಯಾವುದು?", answers: ["Sun / ಸೂರ್ಯ", "Sirius / ಸಿರಿಯಸ್", "Polaris / ಧ್ರುವ ನಕ್ಷತ್ರ"], correct: 0, explanation: "The Sun is the closest star to Earth. / ಸೂರ್ಯನು ಭೂಮಿಗೆ ಅತ್ಯಂತ ಹತ್ತಿರದ ನಕ್ಷತ್ರ." }
  ];

  const safeOn = (id, event, handler) => {
    const element = $(id);
    if (element) element.addEventListener(event, handler);
  };

  function applyLanguage() {
    document.querySelectorAll("[data-en][data-kn]").forEach(element => {
      const en = element.dataset.en;
      const kn = element.dataset.kn;
      element.textContent = state.language === "en" ? en : state.language === "kn" ? kn : `${kn} / ${en}`;
    });
    document.documentElement.lang = state.language === "kn" ? "kn" : "en";
  }

  safeOn("language", "change", event => {
    state.language = event.target.value;
    applyLanguage();
  });

  safeOn("themeBtn", "click", () => document.body.classList.toggle("light"));

  safeOn("tempRange", "input", event => {
    const value = Number(event.target.value);
    if ($("tempRead")) $("tempRead").textContent = `${value}°C`;
    if ($("mercury")) $("mercury").style.height = `${Math.max(5, ((value + 10) / 110) * 100)}%`;
    if ($("tempExplain")) {
      $("tempExplain").textContent = value < 0 ? "Below water's freezing point. / ನೀರಿನ ಘನೀಕರಣ ಬಿಂದುವಿಗಿಂತ ಕಡಿಮೆ."
        : value < 35 ? "Cool to warm conditions. / ತಂಪಿನಿಂದ ಬೆಚ್ಚಗಿನ ಸ್ಥಿತಿ."
        : value < 70 ? "Hot: handle heating equipment carefully. / ಬಿಸಿ: ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ."
        : "Very hot: do not touch heated objects. / ಬಹಳ ಬಿಸಿ: ಬಿಸಿಯಾದ ವಸ್ತುಗಳನ್ನು ಮುಟ್ಟಬೇಡಿ.";
    }
  });

  safeOn("switchBtn", "click", () => {
    state.circuitOn = !state.circuitOn;
    if ($("bulb")) $("bulb").classList.toggle("on", state.circuitOn);
    if ($("switchBtn")) $("switchBtn").setAttribute("aria-pressed", String(state.circuitOn));
    if ($("circuitState")) $("circuitState").textContent = state.circuitOn
      ? "Circuit closed: current can flow. / ವಲಯ ಮುಚ್ಚಿದೆ: ವಿದ್ಯುತ್ ಹರಿಯಬಹುದು."
      : "Circuit open: current cannot flow. / ವಲಯ ತೆರೆದಿದೆ: ವಿದ್ಯುತ್ ಹರಿಯುವುದಿಲ್ಲ.";
  });

  const particlePositions = [[18,20],[48,20],[78,20],[18,48],[48,48],[78,48],[18,76],[48,76],[78,76]];
  function drawParticles() {
    if (!$("particles") || !$("heatRange")) return;
    const heat = Number($("heatRange").value);
    $("particles").replaceChildren();
    particlePositions.forEach(([x,y], index) => {
      const particle = document.createElement("span");
      particle.className = "particle";
      const spread = heat === 1 ? 0 : heat === 2 ? 7 : 15;
      particle.style.left = `${Math.min(94, Math.max(6, x + (index % 2 ? spread : -spread)))}%`;
      particle.style.top = `${Math.min(90, Math.max(8, y + (index % 3 === 0 ? spread : -spread)))}%`;
      $("particles").appendChild(particle);
    });
    if ($("matterState")) $("matterState").textContent = heat === 1
      ? "Solid: particles are close together. / ಘನ: ಕಣಗಳು ಹತ್ತಿರದಲ್ಲಿವೆ."
      : heat === 2 ? "Liquid: particles can move past one another. / ದ್ರವ: ಕಣಗಳು ಒಂದರ ಪಕ್ಕದಿಂದ ಮತ್ತೊಂದು ಚಲಿಸಬಹುದು."
      : "Gas: particles spread out. / ಅನಿಲ: ಕಣಗಳು ದೂರ ಹರಡುತ್ತವೆ.";
  }
  safeOn("heatRange", "input", drawParticles);
  drawParticles();

  function updatePlant() {
    if (!$("lightRange") || !$("waterRange") || !$("plant")) return;
    const health = Math.min(Number($("lightRange").value), Number($("waterRange").value));
    $("plant").style.transform = `scale(${0.7 + health / 100 * 0.7})`;
    if ($("plantState")) $("plantState").textContent = health < 25
      ? "Low light or water may limit growth. / ಕಡಿಮೆ ಬೆಳಕು ಅಥವಾ ನೀರು ಬೆಳವಣಿಗೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಬಹುದು."
      : health < 60 ? "Moderate conditions: growth may be slower. / ಮಧ್ಯಮ ಸ್ಥಿತಿಯಲ್ಲಿ ಬೆಳವಣಿಗೆ ನಿಧಾನವಾಗಬಹುದು."
      : "Balanced conditions support healthy growth. / ಸಮತೋಲಿತ ಪರಿಸ್ಥಿತಿಗಳು ಆರೋಗ್ಯಕರ ಬೆಳವಣಿಗೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತವೆ.";
  }
  safeOn("lightRange", "input", updatePlant);
  safeOn("waterRange", "input", updatePlant);
  updatePlant();

  safeOn("topicSearch", "input", event => {
    const term = event.target.value.trim().toLowerCase();
    document.querySelectorAll(".topic").forEach(card => {
      card.hidden = !(`${card.dataset.search || ""} ${card.textContent}`.toLowerCase().includes(term));
    });
  });

  function renderQuestion() {
    if (!$("question") || !$("answers")) return;
    state.answered = false;
    const question = questions[state.questionIndex % questions.length];
    $("question").textContent = question.q;
    if ($("quizFeedback")) $("quizFeedback").textContent = "";
    $("answers").replaceChildren();

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer";
      button.type = "button";
      button.textContent = answer;
      button.addEventListener("click", () => {
        if (state.answered) return;
        state.answered = true;
        const correct = index === question.correct;
        if (correct) state.score++;
        if ($("quizFeedback")) $("quizFeedback").textContent = `${correct ? "Correct! / ಸರಿಯಾದ ಉತ್ತರ!" : "Try again next time. / ಮುಂದಿನ ಬಾರಿ ಪ್ರಯತ್ನಿಸಿ."} ${question.explanation}`;
        if ($("score")) $("score").textContent = `Score / ಅಂಕ: ${state.score}`;
        [...$("answers").children].forEach(answerButton => { answerButton.disabled = true; });
      });
      $("answers").appendChild(button);
    });
  }
  safeOn("nextQuestion", "click", () => { state.questionIndex++; renderQuestion(); });
  renderQuestion();

  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();
  applyLanguage();
})();
