/* InstaLab: dependency-free client application. Content and language strings live in JSON. */
(() => {
  "use strict";

  const STORAGE_KEY = "instalab.local.v1";
  const DEFAULT_LANGUAGE = "both";
  const SUBJECT_KEYS = { physics: "ui.physics", chemistry: "ui.chemistry", biology: "ui.biology", earth: "ui.earth" };
  const ART = {
    physics: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 25c7-17 23-17 30 0M8 29c6-12 18-12 24 0" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="20" cy="20" r="4" fill="currentColor"/><circle cx="31" cy="13" r="2.5" fill="currentColor"/></svg>',
    chemistry: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M15 5h10M18 5v12L8 33h24L22 17V5M12 27h16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    biology: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M32 7C18 6 7 13 8 25c1 8 10 10 17 4 6-6 7-15 7-22Z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M10 31c7-8 12-12 20-20" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>',
    earth: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M7 16h26M8 24h24M20 5c7 8 7 22 0 30M20 5c-7 8-7 22 0 30" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>'
  };

  let data;
  let dictionary;
  let state;
  let activeFilter = "all";

  const byId = (id) => document.getElementById(id);
  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const lookup = (key) => key.split(".").reduce((value, part) => value && value[part], dictionary);
  const t = (key) => {
    const raw = lookup(key);
    if (typeof raw !== "string") return key;
    const split = raw.indexOf("|");
    if (split < 0) return raw;
    const english = raw.slice(0, split);
    const kannada = raw.slice(split + 1);
    if (state.language === "en") return english;
    if (state.language === "kn") return kannada;
    return `${kannada} / ${english}`;
  };
  const searchTranslation = (key) => {
    const raw = lookup(key);
    return typeof raw === "string" ? raw.replace("|", " ") : "";
  };
  const safeStorageRead = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  };
  const freshState = () => ({
    version: 1,
    language: DEFAULT_LANGUAGE,
    circuit: { voltage: 6, resistance: 10, records: [] },
    ph: { sampleId: "neutral", records: [] },
    cell: { specimen: "plant", objective: 10, records: [] },
    quizAnswers: {},
    quizResults: {}
  });
  const loadState = () => {
    const defaults = freshState();
    const saved = safeStorageRead();
    if (!saved || typeof saved !== "object") return defaults;
    const result = { ...defaults, ...saved };
    result.language = ["en", "kn", "both"].includes(saved.language) ? saved.language : DEFAULT_LANGUAGE;
    for (const key of ["circuit", "ph", "cell"]) {
      result[key] = { ...defaults[key], ...(saved[key] || {}) };
      result[key].records = Array.isArray(result[key].records) ? result[key].records : [];
    }
    result.quizAnswers = saved.quizAnswers && typeof saved.quizAnswers === "object" ? saved.quizAnswers : {};
    result.quizResults = saved.quizResults && typeof saved.quizResults === "object" ? saved.quizResults : {};
    return result;
  };
  const saveState = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { /* Storage may be unavailable; the active session still works in memory. */ }
  };

  function applyTranslations() {
    document.documentElement.lang = state.language === "both" ? "mul" : state.language;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      node.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-content]").forEach((node) => {
      node.setAttribute("content", t(node.getAttribute("data-i18n-content")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((node) => {
      node.setAttribute("title", t(node.getAttribute("data-i18n-title")));
    });
    updateHomeQuizFeedback();
    updateExperimentQuizFeedbacks();
    refreshReadouts();
    updateFilterLabels();
    if (byId("labTabs")) applySubjectFilter(activeFilter);
    const factSource = byId("factSource");
    if (factSource) factSource.setAttribute("aria-label", `${t("home.source")}: ${factSource.dataset.sourceLabel || ""}`);
  }

  function setText(node, key) {
    node.textContent = t(key);
  }
  function localizedNode(tag, key, className) {
    const node = create(tag, className, t(key));
    node.dataset.i18n = key;
    return node;
  }

  function renderCategories() {
    const grid = byId("categoryGrid");
    data.categories.forEach((category) => {
      const card = create("article", "category-card");
      const art = create("div", "category-art");
      art.setAttribute("aria-hidden", "true");
      art.innerHTML = ART[category.art] || "";
      const title = localizedNode("h3", category.titleKey);
      const description = localizedNode("p", category.descriptionKey);
      const link = localizedNode("a", "ui.explore", "text-link");
      link.href = "#lab";
      link.dataset.filterSubject = category.id;
      card.append(art, title, description, link);
      grid.append(card);
    });
  }

  function renderSimulationPreview() {
    const grid = byId("simulationPreview");
    data.simulations.filter((item) => item.status === "live").forEach((sim) => {
      const card = create("article", "content-card");
      const top = create("div", "card-topline");
      top.append(localizedNode("span", SUBJECT_KEYS[sim.subject], "subject-tag"), localizedNode("span", "ui.live", "status-badge"));
      card.append(top, localizedNode("h3", sim.titleKey), localizedNode("p", sim.objectiveKey));
      const link = localizedNode("a", "ui.openLab", "text-link");
      link.href = `#${sim.id}`;
      link.dataset.simTarget = sim.id;
      card.append(link);
      grid.append(card);
    });
  }

  function renderFact() {
    const fact = data.fact;
    setText(byId("factText"), fact.textKey);
    byId("factText").dataset.i18n = fact.textKey;
    const source = byId("factSource");
    source.href = fact.sourceUrl;
    source.dataset.sourceLabel = fact.sourceLabel;
    source.setAttribute("aria-label", `${t("home.source")}: ${fact.sourceLabel}`);
    source.dataset.i18nTitle = "ui.readSource";
  }

  function renderResources() {
    const grid = byId("resourceGrid");
    data.resources.forEach((resource) => {
      const card = create("article", "resource-card");
      card.append(create("p", "resource-source", resource.publisher), localizedNode("h3", resource.titleKey), localizedNode("p", resource.descriptionKey));
      const link = localizedNode("a", "ui.readSource", "text-link");
      link.href = resource.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.append(link);
      grid.append(card);
    });
  }

  function renderHomeQuiz() {
    const question = data.quiz[0];
    byId("quizQuestion").textContent = t(question.questionKey);
    byId("quizQuestion").dataset.i18n = question.questionKey;
    const source = byId("quizSource");
    source.href = question.sourceUrl;
    const container = byId("homeQuizOptions");
    question.options.forEach((option) => {
      const label = create("label", "quiz-option");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "homeQuiz";
      input.value = option.id;
      input.checked = state.quizAnswers[question.id] === option.id;
      const span = localizedNode("span", option.key);
      label.append(input, span);
      container.append(label);
      input.dataset.quizId = question.id;
      input.addEventListener("change", () => setQuizAnswer(question.id, input.value));
    });
    byId("quizSubmit").addEventListener("click", () => submitQuiz(question.id));
    updateHomeQuizFeedback();
  }

  function setQuizAnswer(questionId, answer) {
    state.quizAnswers[questionId] = answer;
    delete state.quizResults[questionId];
    document.querySelectorAll(`[data-quiz-id="${questionId}"]`).forEach((input) => { input.checked = input.value === answer; });
    saveState();
    updateHomeQuizFeedback();
    updateExperimentQuizFeedbacks();
  }

  function submitQuiz(questionId) {
    const answer = state.quizAnswers[questionId];
    if (!answer) {
      byId("quizFeedback").className = "quiz-feedback error";
      byId("quizFeedback").textContent = t("ui.selectAnswer");
      return;
    }
    const question = data.quiz.find((item) => item.id === questionId);
    state.quizResults[questionId] = answer === question.answer;
    saveState();
    updateHomeQuizFeedback();
  }

  function updateHomeQuizFeedback() {
    const target = byId("quizFeedback");
    if (!target || !data) return;
    const question = data.quiz[0];
    if (!Object.prototype.hasOwnProperty.call(state.quizResults, question.id)) {
      target.textContent = "";
      target.className = "quiz-feedback";
      return;
    }
    const isCorrect = state.quizResults[question.id];
    target.className = `quiz-feedback ${isCorrect ? "success" : "error"}`;
    target.textContent = `${t(isCorrect ? "ui.correct" : "ui.incorrect")} ${t("ui.quizExplain")}: ${t(question.explanationKey)}`;
  }

  function renderComingSoon() {
    const grid = byId("comingGrid");
    data.comingSoon.forEach((section) => {
      const card = create("div", "coming-card");
      card.append(localizedNode("span", section.titleKey), localizedNode("span", "ui.comingSoon", "status-badge planned"));
      grid.append(card);
    });
  }

  function renderCounts() {
    const active = data.simulations.filter((item) => item.status === "live").length;
    const plannedTotal = data.plannedSimulations.length + (data.additionalPlannedSimulations || []).length;
    const scientists = data.scientists.length;
    const questions = data.quiz.length;
    const items = [
      ["ui.activeSimulations", active],
      ["ui.plannedSimulations", plannedTotal],
      ["ui.scientistProfiles", scientists],
      ["ui.quizQuestions", questions]
    ];
    const counts = byId("footerCounts");
    items.forEach(([key, value]) => {
      const row = create("div", "footer-count-line");
      row.append(localizedNode("span", key), create("strong", "", String(value)));
      counts.append(row);
    });
  }

  function part(number, titleKey, full = false) {
    const section = create("section", `exp-part${full ? " exp-full" : ""}`);
    section.setAttribute("aria-label", t(titleKey));
    section.dataset.i18nAria = titleKey;
    const heading = create("h4");
    heading.append(create("span", "part-number", `${number}. `), localizedNode("span", titleKey));
    section.append(heading);
    return section;
  }
  function addSourceLink(parent, source) {
    if (!source) return;
    const link = create("a", "source-link", source.label);
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${t("home.source")}: ${source.label}`);
    parent.append(link);
  }
  function addHelp(controlSection, key, id) {
    const button = localizedNode("button", "ui.help", "button button-outline");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", id);
    const panel = localizedNode("p", key, "help-panel");
    panel.id = id;
    panel.hidden = true;
    button.addEventListener("click", () => {
      const opening = panel.hidden;
      panel.hidden = !opening;
      button.setAttribute("aria-expanded", String(opening));
      button.dataset.i18n = opening ? "ui.closeHelp" : "ui.help";
      setText(button, button.dataset.i18n);
    });
    controlSection.append(button, panel);
  }
  function addRecordButtons(section, onRecord, onReset, onClear) {
    const actions = create("div", "control-actions");
    const record = localizedNode("button", "ui.record", "button button-primary");
    record.type = "button";
    record.addEventListener("click", onRecord);
    const reset = localizedNode("button", "ui.reset", "button button-outline");
    reset.type = "button";
    reset.addEventListener("click", onReset);
    const clear = localizedNode("button", "ui.clearRecords", "button button-outline");
    clear.type = "button";
    clear.addEventListener("click", onClear);
    actions.append(record, reset, clear);
    section.append(actions);
  }
  function addLiveStatus(section) {
    const output = create("p", "status-message");
    output.setAttribute("role", "status");
    output.dataset.status = "record";
    section.append(output);
  }
  function tablePart(card, id, headers, keys) {
    const section = part(8, "ui.observationTable", true);
    const wrap = create("div", "table-wrap");
    const table = create("table", "data-table");
    table.id = id;
    const caption = localizedNode("caption", "ui.observationTable", "sr-only");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    headers.forEach((key) => tr.append(localizedNode("th", key)));
    thead.append(tr);
    const tbody = document.createElement("tbody");
    table.append(caption, thead, tbody);
    wrap.append(table);
    section.append(wrap);
    card.append(section);
    return { section, tbody, headers, keys };
  }
  function graphPart(card, id, ariaKey, captionKey) {
    const section = part(9, "ui.graph", true);
    const wrap = create("div", "graph-wrap");
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = 480;
    canvas.height = 200;
    canvas.setAttribute("role", "img");
    canvas.dataset.i18nAria = ariaKey;
    const caption = localizedNode("p", captionKey, "graph-caption");
    const empty = localizedNode("p", "ui.graphEmpty", "graph-caption graph-empty");
    empty.dataset.graphEmpty = "true";
    wrap.append(canvas, caption, empty);
    section.append(wrap);
    card.append(section);
    return { section, canvas, empty };
  }

  function buildCircuit(sim) {
    const card = create("article", "experiment-card");
    card.id = sim.id;
    card.dataset.subject = sim.subject;
    const header = create("header", "experiment-header");
    const top = create("div", "card-topline");
    top.append(localizedNode("span", SUBJECT_KEYS[sim.subject], "subject-tag"), localizedNode("span", "ui.live", "status-badge"));
    header.append(top, localizedNode("h3", sim.titleKey));
    const body = create("div", "experiment-body");
    const objectivePart = part(2, "ui.learningObjective"); objectivePart.append(localizedNode("p", sim.objectiveKey));
    const principle = part(3, "ui.principle"); principle.append(localizedNode("p", sim.principleKey)); addSourceLink(principle, sim.source);
    const equipment = part(4, "ui.equipment");
    const tags = create("div", "equipment-list");
    sim.equipmentKeys.forEach((key) => tags.append(localizedNode("span", key, "equipment-chip")));
    equipment.append(tags);
    const visual = part(5, "ui.interactiveModel", true);
    const canvasWrap = create("div", "sim-canvas-wrap");
    const canvas = document.createElement("canvas"); canvas.id = "circuitCanvas"; canvas.width = 480; canvas.height = 180; canvas.setAttribute("role", "img"); canvas.dataset.i18nAria = "sim.circuit.canvasAlt";
    canvasWrap.append(canvas); visual.append(canvasWrap);
    const controls = part(6, "ui.controls");
    const grid = create("div", "control-grid");
    const voltageRow = create("div", "control-row");
    const vLabel = localizedNode("label", "ui.voltage"); vLabel.htmlFor = "circuitVoltage";
    const vInput = document.createElement("input"); vInput.id = "circuitVoltage"; vInput.type = "range"; vInput.min = "1"; vInput.max = "9"; vInput.step = "0.5";
    const vOutput = create("output", "control-value"); vOutput.id = "voltageVal"; vOutput.htmlFor = "circuitVoltage";
    voltageRow.append(vLabel, vInput, vOutput);
    const resistanceRow = create("div", "control-row");
    const rLabel = localizedNode("label", "ui.resistance"); rLabel.htmlFor = "circuitResistance";
    const rInput = document.createElement("input"); rInput.id = "circuitResistance"; rInput.type = "range"; rInput.min = "2"; rInput.max = "50"; rInput.step = "1";
    const rOutput = create("output", "control-value"); rOutput.id = "resistanceVal"; rOutput.htmlFor = "circuitResistance";
    resistanceRow.append(rLabel, rInput, rOutput);
    grid.append(voltageRow, resistanceRow);
    const readouts = create("div", "readout-list");
    [["ui.current", "currentVal"], ["ui.power", "powerVal"]].forEach(([key, id]) => {
      const item = create("span", "readout"); item.append(localizedNode("span", key), create("strong", "", "")); item.lastChild.id = id; readouts.append(item);
    });
    controls.append(grid, readouts);
    const helpId = "circuitHelp"; addHelp(controls, "sim.circuit.assumption", helpId);
    const records = tablePart(card, "circuitTable", ["ui.trial", "ui.voltage", "ui.resistance", "ui.current", "ui.power"], ["trial", "V", "R", "I", "P"]);
    const graph = graphPart(card, "circuitGraphCanvas", "sim.circuit.canvasAlt", "ui.graphRecorded");
    const formula = part(7, "ui.formulaUnits"); formula.append(create("p", "formula-box", sim.formula), create("p", "formula-units", sim.units), localizedNode("p", sim.assumptionKey, "assumption"));
    const conclusion = part(10, "ui.conclusion"); conclusion.append(localizedNode("p", sim.conclusionKey));
    const safety = part(11, "ui.safety"); safety.append(localizedNode("p", sim.safetyKey, "safety-note"));
    const quiz = buildExperimentQuiz(sim.quizId);
    body.append(objectivePart, principle, equipment, visual, controls, formula, records.section, graph.section, conclusion, safety, quiz);
    card.append(header, body);
    const simState = state.circuit;
    vInput.value = simState.voltage; rInput.value = simState.resistance;
    const update = () => { simState.voltage = Number(vInput.value); simState.resistance = Number(rInput.value); saveState(); drawCircuit(canvas, simState); refreshReadouts(); };
    vInput.addEventListener("input", update); rInput.addEventListener("input", update);
    addRecordButtons(controls, () => {
      const V = Number(vInput.value), R = Number(rInput.value), I = V / R;
      simState.records.push({ trial: simState.records.length + 1, V, R, I, P: V * I });
      saveState(); renderTable(records, simState.records, "circuit"); drawGraph("circuit", graph.canvas, simState.records); announceRecord(controls);
    }, () => { simState.voltage = 6; simState.resistance = 10; vInput.value = 6; rInput.value = 10; update(); }, () => clearSimulationRecords("circuit", records, graph));
    renderTable(records, simState.records, "circuit"); drawCircuit(canvas, simState); drawGraph("circuit", graph.canvas, simState.records);
    return card;
  }

  function buildPH(sim) {
    const card = create("article", "experiment-card"); card.id = sim.id; card.dataset.subject = sim.subject;
    const header = create("header", "experiment-header"); const top = create("div", "card-topline");
    top.append(localizedNode("span", SUBJECT_KEYS[sim.subject], "subject-tag"), localizedNode("span", "ui.live", "status-badge"));
    header.append(top, localizedNode("h3", sim.titleKey));
    const body = create("div", "experiment-body");
    const objectivePart = part(2, "ui.learningObjective"); objectivePart.append(localizedNode("p", sim.objectiveKey));
    const principle = part(3, "ui.principle"); principle.append(localizedNode("p", sim.principleKey)); addSourceLink(principle, sim.source);
    const equipment = part(4, "ui.equipment"); const tags = create("div", "equipment-list"); sim.equipmentKeys.forEach((key) => tags.append(localizedNode("span", key, "equipment-chip"))); equipment.append(tags);
    const visual = part(5, "ui.interactiveModel", true); const canvasWrap = create("div", "sim-canvas-wrap");
    const canvas = document.createElement("canvas"); canvas.id = "phCanvas"; canvas.width = 480; canvas.height = 180; canvas.setAttribute("role", "img"); canvas.dataset.i18nAria = "sim.ph.canvasAlt"; canvasWrap.append(canvas); visual.append(canvasWrap);
    const controls = part(6, "ui.controls"); const grid = create("div", "control-grid"); const row = create("div", "control-row");
    const label = localizedNode("label", "ui.sampleModel"); label.htmlFor = "substanceSelect";
    const select = document.createElement("select"); select.id = "substanceSelect"; select.className = "control-select";
    data.phSamples.forEach((sample) => { const option = document.createElement("option"); option.value = sample.id; option.dataset.i18n = sample.nameKey; option.textContent = t(sample.nameKey); select.append(option); });
    const value = create("output", "control-value"); value.id = "phDisplayVal"; row.append(label, select, value); grid.append(row);
    const readouts = create("div", "readout-list"); const nature = create("span", "readout"); nature.append(localizedNode("span", "ui.classification"), create("strong", "", "")); nature.lastChild.id = "phNatureVal"; readouts.append(nature);
    controls.append(grid, readouts); addHelp(controls, "sim.ph.assumption", "phHelp");
    const records = tablePart(card, "phTable", ["ui.trial", "ui.substance", "ui.ph", "ui.classification"], ["trial", "sample", "ph", "class"]);
    const graph = graphPart(card, "phGraphCanvas", "sim.ph.canvasAlt", "ui.graphRecorded");
    const formula = part(7, "ui.formulaUnits"); formula.append(create("p", "formula-box", sim.formula), create("p", "formula-units", sim.units), localizedNode("p", sim.assumptionKey, "assumption"));
    const conclusion = part(10, "ui.conclusion"); conclusion.append(localizedNode("p", sim.conclusionKey));
    const safety = part(11, "ui.safety"); safety.append(localizedNode("p", sim.safetyKey, "safety-note"));
    const quiz = buildExperimentQuiz(sim.quizId);
    body.append(objectivePart, principle, equipment, visual, controls, formula, records.section, graph.section, conclusion, safety, quiz); card.append(header, body);
    const simState = state.ph;
    select.value = simState.sampleId;
    const update = () => { simState.sampleId = select.value; saveState(); drawPH(canvas, simState); refreshReadouts(); };
    select.addEventListener("change", update);
    addRecordButtons(controls, () => {
      const sample = data.phSamples.find((entry) => entry.id === select.value);
      simState.records.push({ trial: simState.records.length + 1, sampleId: sample.id, ph: sample.value });
      saveState(); renderTable(records, simState.records, "ph"); drawGraph("ph", graph.canvas, simState.records); announceRecord(controls);
    }, () => { simState.sampleId = "neutral"; select.value = "neutral"; update(); }, () => clearSimulationRecords("ph", records, graph));
    renderTable(records, simState.records, "ph"); drawPH(canvas, simState); drawGraph("ph", graph.canvas, simState.records);
    return card;
  }

  function buildCell(sim) {
    const card = create("article", "experiment-card"); card.id = sim.id; card.dataset.subject = sim.subject;
    const header = create("header", "experiment-header"); const top = create("div", "card-topline");
    top.append(localizedNode("span", SUBJECT_KEYS[sim.subject], "subject-tag"), localizedNode("span", "ui.live", "status-badge"));
    header.append(top, localizedNode("h3", sim.titleKey));
    const body = create("div", "experiment-body");
    const objectivePart = part(2, "ui.learningObjective"); objectivePart.append(localizedNode("p", sim.objectiveKey));
    const principle = part(3, "ui.principle"); principle.append(localizedNode("p", sim.principleKey)); addSourceLink(principle, sim.source);
    const equipment = part(4, "ui.equipment"); const tags = create("div", "equipment-list"); sim.equipmentKeys.forEach((key) => tags.append(localizedNode("span", key, "equipment-chip"))); equipment.append(tags);
    const visual = part(5, "ui.interactiveModel", true); const canvasWrap = create("div", "sim-canvas-wrap");
    const canvas = document.createElement("canvas"); canvas.id = "cellCanvas"; canvas.width = 480; canvas.height = 180; canvas.setAttribute("role", "img"); canvas.dataset.i18nAria = "sim.cell.canvasAlt"; canvasWrap.append(canvas); visual.append(canvasWrap);
    const controls = part(6, "ui.controls"); const grid = create("div", "control-grid");
    const specimenRow = create("div", "control-row"); const specimenLabel = localizedNode("label", "ui.specimen"); specimenLabel.htmlFor = "specimenType";
    const specimen = document.createElement("select"); specimen.id = "specimenType"; specimen.className = "control-select";
    [["plant", "ui.plant"], ["animal", "ui.animal"]].forEach(([value, key]) => { const option = document.createElement("option"); option.value = value; option.dataset.i18n = key; option.textContent = t(key); specimen.append(option); });
    specimenRow.append(specimenLabel, specimen);
    const objectiveRow = create("div", "control-row"); const objectiveLabel = localizedNode("label", "ui.objective"); objectiveLabel.htmlFor = "objectivePower";
    const objective = document.createElement("select"); objective.id = "objectivePower"; objective.className = "control-select";
    [4, 10, 40].forEach((power) => { const option = create("option", "", `${power}×`); option.value = String(power); objective.append(option); });
    objectiveRow.append(objectiveLabel, objective);
    grid.append(specimenRow, objectiveRow);
    const readouts = create("div", "readout-list");
    const objectiveRead = create("span", "readout"); objectiveRead.append(localizedNode("span", "ui.objective"), create("strong", "", "")); objectiveRead.lastChild.id = "objVal";
    const totalRead = create("span", "readout"); totalRead.append(localizedNode("span", "ui.totalMag"), create("strong", "", "")); totalRead.lastChild.id = "totalMagVal";
    readouts.append(objectiveRead, totalRead); controls.append(grid, readouts); addHelp(controls, "sim.cell.assumption", "cellHelp");
    const records = tablePart(card, "cellTable", ["ui.trial", "ui.specimen", "ui.objective", "ui.totalMag", "ui.structure"], ["trial", "specimen", "objective", "total", "structure"]);
    const graph = graphPart(card, "cellGraphCanvas", "sim.cell.canvasAlt", "ui.graphRecorded");
    const formula = part(7, "ui.formulaUnits"); formula.append(create("p", "formula-box", sim.formula), create("p", "formula-units", sim.units), localizedNode("p", sim.assumptionKey, "assumption"));
    const conclusion = part(10, "ui.conclusion"); conclusion.append(localizedNode("p", sim.conclusionKey));
    const safety = part(11, "ui.safety"); safety.append(localizedNode("p", sim.safetyKey, "safety-note"));
    const quiz = buildExperimentQuiz(sim.quizId);
    body.append(objectivePart, principle, equipment, visual, controls, formula, records.section, graph.section, conclusion, safety, quiz); card.append(header, body);
    const simState = state.cell; specimen.value = simState.specimen; objective.value = String(simState.objective);
    const update = () => { simState.specimen = specimen.value; simState.objective = Number(objective.value); saveState(); drawCells(canvas, simState); refreshReadouts(); };
    specimen.addEventListener("change", update); objective.addEventListener("change", update);
    addRecordButtons(controls, () => {
      const total = Number(objective.value) * 10;
      simState.records.push({ trial: simState.records.length + 1, specimen: specimen.value, objective: Number(objective.value), total });
      saveState(); renderTable(records, simState.records, "cell"); drawGraph("cell", graph.canvas, simState.records); announceRecord(controls);
    }, () => { simState.specimen = "plant"; simState.objective = 10; specimen.value = "plant"; objective.value = "10"; update(); }, () => clearSimulationRecords("cell", records, graph));
    renderTable(records, simState.records, "cell"); drawCells(canvas, simState); drawGraph("cell", graph.canvas, simState.records);
    return card;
  }

  function buildExperimentQuiz(quizId) {
    const question = data.quiz.find((item) => item.id === quizId);
    const section = part(12, "ui.shortQuiz", true);
    section.append(localizedNode("p", question.questionKey, "quiz-question"));
    const options = create("div", "exp-quiz");
    question.options.forEach((option) => {
      const label = create("label");
      const input = document.createElement("input"); input.type = "radio"; input.name = `quiz-${question.id}`; input.value = option.id; input.dataset.quizId = question.id;
      input.checked = state.quizAnswers[question.id] === option.id;
      const span = localizedNode("span", option.key);
      label.append(input, span); options.append(label);
      input.addEventListener("change", () => setQuizAnswer(question.id, input.value));
    });
    const button = localizedNode("button", "ui.checkAnswer", "button button-primary"); button.type = "button"; button.addEventListener("click", () => submitExperimentQuiz(question.id));
    const feedback = create("p", "exp-quiz-feedback"); feedback.id = `feedback-${question.id}`; feedback.setAttribute("aria-live", "polite");
    section.append(options, button, feedback);
    addSourceLink(section, { label: data.resources.find((item) => item.url === question.sourceUrl)?.publisher || "Source", url: question.sourceUrl });
    return section;
  }
  function submitExperimentQuiz(questionId) {
    const answer = state.quizAnswers[questionId];
    const feedback = byId(`feedback-${questionId}`);
    if (!answer) { feedback.textContent = t("ui.selectAnswer"); feedback.className = "exp-quiz-feedback quiz-feedback error"; return; }
    const question = data.quiz.find((item) => item.id === questionId);
    state.quizResults[questionId] = answer === question.answer;
    saveState(); updateExperimentQuizFeedbacks();
  }
  function updateExperimentQuizFeedbacks() {
    if (!data || !state) return;
    data.quiz.forEach((question) => {
      const feedback = byId(`feedback-${question.id}`);
      if (!feedback) return;
      if (!Object.prototype.hasOwnProperty.call(state.quizResults, question.id)) { feedback.textContent = ""; feedback.className = "exp-quiz-feedback"; return; }
      const correct = state.quizResults[question.id];
      feedback.textContent = `${t(correct ? "ui.correct" : "ui.incorrect")} ${t("ui.quizExplain")}: ${t(question.explanationKey)}`;
      feedback.className = `exp-quiz-feedback quiz-feedback ${correct ? "success" : "error"}`;
    });
  }

  function renderExperiments() {
    const target = byId("experimentList");
    const liveCards = new Map();
    data.simulations.forEach((sim) => {
      const card = sim.id === "sim-ohms-law" ? buildCircuit(sim) : sim.id === "sim-ph-scale" ? buildPH(sim) : buildCell(sim);
      liveCards.set(sim.id, card); target.append(card);
    });
    const plannedSection = create("section", "planned-list");
    plannedSection.id = "plannedList";
    [...data.plannedSimulations, ...(data.additionalPlannedSimulations || [])].forEach((sim) => {
      const card = create("article", "planned-card"); card.dataset.subject = sim.subject;
      card.append(localizedNode("span", "ui.planned", "status-badge planned"), localizedNode("h3", sim.titleKey));
      if (sim.planGroup === "additional") card.append(localizedNode("p", "ui.additionalPlanned", "status-message"));
      plannedSection.append(card);
    });
    target.append(plannedSection);
    renderLabTabs();
    applySubjectFilter("all");
  }

  function renderLabTabs() {
    const tabs = byId("labTabs");
    const subjects = [["all", "ui.subjectAll"], ["physics", "ui.physics"], ["chemistry", "ui.chemistry"], ["biology", "ui.biology"], ["earth", "ui.earth"]];
    subjects.forEach(([id, key]) => {
      const button = localizedNode("button", key, "filter-button");
      button.type = "button"; button.dataset.filterButton = id; button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => applySubjectFilter(id));
      tabs.append(button);
    });
  }
  function updateFilterLabels() {
    document.querySelectorAll("[data-filter-button]").forEach((button) => {
      const key = button.dataset.filterButton === "all" ? "ui.subjectAll" : SUBJECT_KEYS[button.dataset.filterButton];
      if (key) setText(button, key);
    });
  }
  function applySubjectFilter(subject) {
    activeFilter = subject;
    document.querySelectorAll("[data-filter-button]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filterButton === subject)));
    document.querySelectorAll(".experiment-card, .planned-card").forEach((card) => { card.hidden = subject !== "all" && card.dataset.subject !== subject; });
    const liveCount = [...document.querySelectorAll(".experiment-card")].filter((card) => !card.hidden).length;
    const plannedCount = [...document.querySelectorAll(".planned-card")].filter((card) => !card.hidden).length;
    byId("labAnnouncement").textContent = `${liveCount} ${t("ui.activeSimulations")}; ${plannedCount} ${t("ui.plannedSimulations")}`;
  }
  function renderTable(tableInfo, rows, type) {
    const tbody = tableInfo.tbody;
    tbody.replaceChildren();
    if (!rows.length) {
      const tr = document.createElement("tr"); const td = create("td", "status-message", t("ui.noRecords")); td.colSpan = tableInfo.headers.length; td.dataset.i18n = "ui.noRecords"; tr.append(td); tbody.append(tr); return;
    }
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      const values = type === "circuit" ? [row.trial, Number(row.V).toFixed(1), Number(row.R).toFixed(1), `${Number(row.I).toFixed(2)} A`, `${Number(row.P).toFixed(2)} W`] :
        type === "ph" ? [row.trial, t(data.phSamples.find((sample) => sample.id === row.sampleId)?.nameKey || "ui.sampleModel"), Number(row.ph).toFixed(1), classificationKey(row.ph)] :
          [row.trial, row.specimen === "plant" ? t("ui.plant") : t("ui.animal"), `${row.objective}×`, `${row.total}×`, t(row.specimen === "plant" ? "ui.plantStructures" : "ui.animalStructures")];
      values.forEach((value, index) => {
        const td = document.createElement("td");
        if (type === "ph" && index === 1) td.dataset.i18n = data.phSamples.find((sample) => sample.id === row.sampleId)?.nameKey || "ui.sampleModel";
        if (type === "ph" && index === 3) td.dataset.i18n = classificationKey(row.ph);
        if (type === "cell" && index === 1) td.dataset.i18n = row.specimen === "plant" ? "ui.plant" : "ui.animal";
        if (type === "cell" && index === 4) td.dataset.i18n = row.specimen === "plant" ? "ui.plantStructures" : "ui.animalStructures";
        td.textContent = String(value); tr.append(td);
      });
      tbody.append(tr);
    });
  }
  function classificationKey(value) { return value < 7 ? "ui.acidic" : value === 7 ? "ui.neutral" : "ui.basic"; }
  function clearSimulationRecords(key, tableInfo, graph) {
    if (!window.confirm(t("ui.clearRecordsConfirm"))) return;
    state[key].records = []; saveState(); renderTable(tableInfo, [], key); clearGraph(graph.canvas); graph.empty.hidden = false;
  }
  function announceRecord(section) {
    const status = section.querySelector('[data-status="record"]');
    if (status) { status.dataset.i18n = "ui.rowRecorded"; status.textContent = t("ui.rowRecorded"); }
  }
  function refreshReadouts() {
    if (!state || !data) return;
    const circuit = state.circuit;
    const current = circuit.voltage / circuit.resistance;
    const power = circuit.voltage * current;
    setIfPresent("voltageVal", `${Number(circuit.voltage).toFixed(1)} V`);
    setIfPresent("resistanceVal", `${Number(circuit.resistance).toFixed(1)} Ω`);
    setIfPresent("currentVal", `${current.toFixed(2)} A`);
    setIfPresent("powerVal", `${power.toFixed(2)} W`);
    const sample = data.phSamples.find((item) => item.id === state.ph.sampleId) || data.phSamples[2];
    setIfPresent("phDisplayVal", sample.value.toFixed(1));
    setIfPresent("phNatureVal", t(classificationKey(sample.value)));
    setIfPresent("objVal", `${state.cell.objective}×`);
    setIfPresent("totalMagVal", `${state.cell.objective * 10}×`);
  }
  function setIfPresent(id, text) { const node = byId(id); if (node) node.textContent = text; }

  function drawCircuit(canvas, sim) {
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const w = canvas.width, h = canvas.height; ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#7dd3fc"; ctx.lineWidth = 4; ctx.strokeRect(60, 30, 360, 120);
    ctx.fillStyle = "#f8fafc"; ctx.font = "bold 13px system-ui";
    ctx.fillText(`${Number(sim.voltage).toFixed(1)} V`, 14, 91);
    ctx.fillStyle = "#ef4444"; ctx.fillRect(55, 70, 12, 40); ctx.fillStyle = "#fff"; ctx.fillText("+", 56, 85);
    ctx.fillStyle = "#f59e0b"; ctx.fillRect(197, 23, 65, 15); ctx.fillStyle = "#fff"; ctx.fillText(`${Number(sim.resistance).toFixed(0)} Ω`, 204, 19);
    ctx.fillStyle = "#0284c7"; ctx.beginPath(); ctx.arc(230, 150, 16, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.fillText("A", 225, 155);
    const brightness = Math.min(1, (sim.voltage * sim.voltage / sim.resistance) / 20);
    const glow = ctx.createRadialGradient(420, 90, 4, 420, 90, 14 + brightness * 24);
    glow.addColorStop(0, `rgba(250,204,21,${.35 + brightness * .65})`); glow.addColorStop(1, "rgba(250,204,21,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(420, 90, 38, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fef08a"; ctx.beginPath(); ctx.arc(420, 90, 12, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "#ca8a04"; ctx.lineWidth = 2; ctx.stroke();
  }
  function drawPH(canvas, sim) {
    const sample = data.phSamples.find((item) => item.id === sim.sampleId) || data.phSamples[2];
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colors = ["#dc2626", "#f97316", "#facc15", "#22c55e", "#06b6d4", "#3b82f6", "#7c3aed"];
    const x = 182, y = 35, width = 118, height = 112;
    ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 3; ctx.strokeRect(x, y, width, height);
    const index = Math.min(colors.length - 1, Math.floor(sample.value / 14 * colors.length));
    ctx.fillStyle = colors[index]; ctx.globalAlpha = .76; ctx.fillRect(x + 4, y + height * .34, width - 8, height * .62); ctx.globalAlpha = 1;
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 19px system-ui"; ctx.fillText(`pH ${sample.value.toFixed(1)}`, x + 13, y + 78);
    ctx.font = "12px system-ui"; ctx.fillText("0", x, y + height + 19); ctx.fillText("7", x + width / 2 - 3, y + height + 19); ctx.fillText("14", x + width - 16, y + height + 19);
  }
  function drawCells(canvas, sim) {
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "#081526"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2, cy = canvas.height / 2, radius = 72;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = sim.specimen === "plant" ? "#ecfdf5" : "#fdf2f8"; ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    if (sim.specimen === "plant") {
      const stepX = sim.objective === 4 ? 24 : sim.objective === 10 ? 40 : 72;
      const stepY = sim.objective === 4 ? 20 : sim.objective === 10 ? 27 : 48;
      ctx.strokeStyle = "#059669"; ctx.lineWidth = sim.objective === 40 ? 2 : 1;
      for (let x = cx - radius; x < cx + radius; x += stepX) for (let y = cy - radius; y < cy + radius; y += stepY) {
        ctx.strokeRect(x, y, stepX, stepY); ctx.fillStyle = "#047857"; ctx.beginPath(); ctx.arc(x + stepX * .68, y + stepY * .5, 3, 0, Math.PI * 2); ctx.fill();
      }
    } else {
      ctx.strokeStyle = "#be185d"; ctx.fillStyle = "rgba(244,114,182,.3)"; ctx.lineWidth = 2;
      const size = sim.objective === 40 ? 38 : sim.objective === 10 ? 22 : 12;
      [[cx - 24, cy - 18], [cx + 22, cy + 17], [cx + 9, cy - 33]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.ellipse(x, y, size, size * .72, .5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#9d174d"; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "rgba(244,114,182,.3)";
      });
    }
    ctx.restore(); ctx.strokeStyle = "#93a4b8"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
  }

  function clearGraph(graph) { const ctx = graph.getContext("2d"); if (ctx) ctx.clearRect(0, 0, graph.width, graph.height); }
  function drawGraph(kind, canvas, records) {
    clearGraph(canvas);
    const empty = canvas.closest(".graph-wrap")?.querySelector("[data-graph-empty]");
    if (empty) empty.hidden = records.length > 0;
    if (!records.length) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const padL = 46, padR = 16, padT = 20, padB = 36, w = canvas.width - padL - padR, h = canvas.height - padT - padB;
    ctx.strokeStyle = "#8ba0b2"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + h); ctx.lineTo(padL + w, padT + h); ctx.stroke();
    let points;
    if (kind === "circuit") points = records.map((r) => ({ x: Number(r.V), y: Number(r.I) }));
    else if (kind === "ph") points = records.map((r, i) => ({ x: i + 1, y: Number(r.ph) }));
    else points = records.map((r, i) => ({ x: i + 1, y: Number(r.total) }));
    const maxX = Math.max(1, ...points.map((p) => p.x));
    const maxY = kind === "ph" ? 14 : Math.max(1, ...points.map((p) => p.y)) * 1.1;
    ctx.fillStyle = "#425a70"; ctx.font = "12px system-ui";
    ctx.fillText(kind === "circuit" ? "V (V)" : "n", canvas.width - 45, canvas.height - 8);
    ctx.save(); ctx.translate(14, 30); ctx.rotate(-Math.PI / 2); ctx.fillText(kind === "circuit" ? "I (A)" : kind === "ph" ? "pH" : "M (×)", 0, 0); ctx.restore();
    ctx.strokeStyle = "#0284c7"; ctx.fillStyle = "#075985"; ctx.lineWidth = 2.5; ctx.beginPath();
    points.forEach((point, index) => {
      const x = padL + point.x / maxX * w;
      const y = padT + h - point.y / maxY * h;
      if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    points.forEach((point) => {
      const x = padL + point.x / maxX * w; const y = padT + h - point.y / maxY * h;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    });
  }

  function bindLanguage() {
    const select = byId("langSelector"); select.value = state.language;
    select.addEventListener("change", () => {
      state.language = ["en", "kn", "both"].includes(select.value) ? select.value : DEFAULT_LANGUAGE;
      saveState();
      // Translation changes do not rebuild cards, input controls, recorded data, or canvases.
      applyTranslations();
    });
  }
  function bindSearch() {
    const input = byId("siteSearch"); const results = byId("searchResults");
    const clear = () => { input.value = ""; results.replaceChildren(); input.focus(); };
    byId("clearSearch").addEventListener("click", clear);
    const doSearch = () => {
      const query = normalize(input.value.trim()); results.replaceChildren();
      if (!query) return;
      const index = [];
      data.simulations.forEach((sim) => index.push({ titleKey: sim.titleKey, href: `#${sim.id}`, subject: sim.subject, title: t(sim.titleKey), search: `${searchTranslation(sim.titleKey)} ${searchTranslation(sim.objectiveKey)} ${searchTranslation(sim.principleKey)}` }));
      data.resources.forEach((resource) => index.push({ titleKey: resource.titleKey, href: resource.url, subject: resource.subject, external: true, title: t(resource.titleKey), search: `${searchTranslation(resource.titleKey)} ${resource.publisher} ${searchTranslation(resource.descriptionKey)}` }));
      data.quiz.forEach((question) => index.push({ titleKey: question.questionKey, href: "#quizTitle", subject: question.subject, title: t(question.questionKey), search: `${searchTranslation(question.questionKey)} ${searchTranslation(question.explanationKey)}` }));
      const matched = index.filter((item) => normalize(`${item.search} ${searchTranslation(SUBJECT_KEYS[item.subject] || "ui.virtualLab")}`).includes(query)).slice(0, 8);
      results.append(localizedNode("p", "ui.searchResults", "search-results-heading"));
      if (!matched.length) { results.append(localizedNode("p", "ui.noResults", "status-message")); return; }
      matched.forEach((item) => {
        const link = create("a", "search-result"); link.href = item.href;
        if (item.external) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
        const title = localizedNode("strong", item.titleKey);
        const subject = localizedNode("span", SUBJECT_KEYS[item.subject] || "ui.virtualLab", "subject-tag");
        link.append(title, subject); results.append(link);
      });
    };
    byId("searchButton").addEventListener("click", doSearch);
    input.addEventListener("keydown", (event) => { if (event.key === "Enter") doSearch(); if (event.key === "Escape") clear(); });
    input.addEventListener("input", () => { if (!input.value.trim()) results.replaceChildren(); });
  }
  function normalize(text) { return text.normalize("NFKC").toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, " ").trim(); }
  function bindCategoryLinks() {
    document.querySelectorAll("[data-filter-subject]").forEach((link) => {
      link.addEventListener("click", () => {
        applySubjectFilter(link.dataset.filterSubject);
      });
    });
    document.querySelectorAll("[data-sim-target]").forEach((link) => {
      link.addEventListener("click", () => applySubjectFilter("all"));
    });
  }
  function bindMobileMenu() {
    const toggle = byId("menuToggle"), nav = byId("primaryNav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));
  }
  function bindClearData() {
    ["clearLocalData", "footerClearData"].forEach((id) => byId(id).addEventListener("click", () => {
      if (!window.confirm(t("ui.clearConfirm"))) return;
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* no persistent storage */ }
      state = freshState(); window.simState = state;
      byId("langSelector").value = state.language;
      state.circuit.voltage = 6; state.circuit.resistance = 10; state.ph.sampleId = "neutral"; state.cell.specimen = "plant"; state.cell.objective = 10;
      byId("circuitVoltage").value = 6; byId("circuitResistance").value = 10; byId("substanceSelect").value = "neutral"; byId("specimenType").value = "plant"; byId("objectivePower").value = "10";
      document.querySelectorAll('input[name="homeQuiz"], .exp-quiz input').forEach((input) => { input.checked = false; });
      data.simulations.forEach((sim) => {
        const key = sim.id === "sim-ohms-law" ? "circuit" : sim.id === "sim-ph-scale" ? "ph" : "cell";
        const table = byId(key === "circuit" ? "circuitTable" : key === "ph" ? "phTable" : "cellTable");
        const tbody = table.querySelector("tbody"); tbody.replaceChildren(); const tr = document.createElement("tr"); const td = create("td", "status-message", t("ui.noRecords")); td.colSpan = table.querySelectorAll("thead th").length; td.dataset.i18n = "ui.noRecords"; tr.append(td); tbody.append(tr);
        const graph = byId(key === "circuit" ? "circuitGraphCanvas" : key === "ph" ? "phGraphCanvas" : "cellGraphCanvas"); clearGraph(graph); const empty = graph.closest(".graph-wrap").querySelector("[data-graph-empty]"); empty.hidden = false;
      });
      document.querySelectorAll(".exp-quiz-feedback").forEach((node) => { node.textContent = ""; node.className = "exp-quiz-feedback"; });
      byId("quizFeedback").textContent = ""; byId("quizFeedback").className = "quiz-feedback";
      applyTranslations();
      drawCircuit(byId("circuitCanvas"), state.circuit); drawPH(byId("phCanvas"), state.ph); drawCells(byId("cellCanvas"), state.cell); refreshReadouts();
      const notice = create("p", "status-message", t("ui.dataCleared")); notice.setAttribute("role", "status"); byId("footerClearData").after(notice); window.setTimeout(() => notice.remove(), 4000);
    }));
  }

  async function boot() {
    try {
      const [dataResponse, languageResponse] = await Promise.all([fetch("data.json"), fetch("lang.json")]);
      if (!dataResponse.ok || !languageResponse.ok) throw new Error("Could not load site data.");
      [data, dictionary] = await Promise.all([dataResponse.json(), languageResponse.json()]);
      state = loadState(); window.simState = state;
      renderCategories(); renderSimulationPreview(); renderFact(); renderResources(); renderHomeQuiz(); renderComingSoon(); renderCounts(); renderExperiments();
      bindLanguage(); bindSearch(); bindCategoryLinks(); bindMobileMenu(); bindClearData();
      applyTranslations();
    } catch (error) {
      console.error("InstaLab startup error:", error);
      const message = create("p", "status-message", "Site content could not be loaded. Serve this folder over HTTP and check that data.json and lang.json are present.");
      byId("main").prepend(message);
    }
  }

  document.addEventListener("DOMContentLoaded", boot, { once: true });
})();
