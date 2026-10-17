// lab.js - Virtual Science Lab Controller
document.addEventListener("DOMContentLoaded", () => {
  // Tab filtering
  const tabs = document.querySelectorAll(".tab-btn");
  const cards = document.querySelectorAll(".experiment-card");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const subj = tab.getAttribute("data-subject");

      cards.forEach(card => {
        if (subj === "all" || card.getAttribute("data-cat") === subj) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  initCircuitExperiment();
  initPHExperiment();
  initCellExperiment();
});

// ==============================================================
// 1. EXPERIMENT 1: Simple Electric Circuit (Ohm's Law)
// ==============================================================
function initCircuitExperiment() {
  const canvas = document.getElementById("circuitCanvas");
  const ctx = canvas.getContext("2d");
  const vSlider = document.getElementById("circuitVoltage");
  const rSlider = document.getElementById("circuitResistance");
  const vVal = document.getElementById("voltageVal");
  const rVal = document.getElementById("resistanceVal");
  const iVal = document.getElementById("currentVal");
  const pVal = document.getElementById("powerVal");
  const recordBtn = document.getElementById("circuitRecordBtn");
  const resetBtn = document.getElementById("circuitResetBtn");
  const tbody = document.querySelector("#circuitTable tbody");

  const records = [];

  function calculateAndDraw() {
    const V = parseFloat(vSlider.value);
    const R = parseFloat(rSlider.value);
    const I = V / R; // Amperes
    const P = V * I; // Watts

    vVal.textContent = V.toFixed(1);
    rVal.textContent = R.toFixed(1);
    iVal.textContent = I.toFixed(2) + " A";
    pVal.textContent = P.toFixed(2) + " W";

    // Draw Circuit Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Circuit Loop
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 30, 360, 120);

    // Battery (Left side)
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(52, 70, 16, 40);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(54, 72, 12, 16); // + pole
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("+", 57, 84);
    ctx.fillText(`${V}V`, 25, 95);

    // Resistor (Top wire)
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(200, 22, 60, 16);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(`${R}Ω`, 218, 34);

    // Ammeter (Bottom wire)
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.arc(230, 150, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("A", 225, 154);

    // Light Bulb (Right side)
    const brightness = Math.min(1.0, P / 20); // Glow intensity
    const glowRadius = 14 + brightness * 20;

    // Outer Glow
    const gradient = ctx.createRadialGradient(420, 90, 5, 420, 90, glowRadius);
    gradient.addColorStop(0, `rgba(250, 204, 21, ${0.4 + brightness * 0.6})`);
    gradient.addColorStop(1, "rgba(250, 204, 21, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(420, 90, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Bulb glass
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(420, 90, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  vSlider.addEventListener("input", calculateAndDraw);
  rSlider.addEventListener("input", calculateAndDraw);

  recordBtn.addEventListener("click", () => {
    const trial = records.length + 1;
    const V = parseFloat(vSlider.value).toFixed(1);
    const R = parseFloat(rSlider.value).toFixed(1);
    const I = (V / R).toFixed(2);

    records.push({ trial, V: parseFloat(V), I: parseFloat(I) });

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${trial}</td><td>${V}</td><td>${R}</td><td>${I}</td>`;
    tbody.appendChild(tr);

    plotLabGraph("circuitGraphCanvas", records.map(r => ({ x: r.V, y: r.I })), "Voltage V (V)", "Current I (A)");
  });

  resetBtn.addEventListener("click", () => {
    vSlider.value = 6;
    rSlider.value = 10;
    calculateAndDraw();
  });

  // Quiz
  document.getElementById("circuitQuizCheck").addEventListener("click", () => {
    const sel = document.querySelector('input[name="circuitQ"]:checked');
    const fb = document.getElementById("circuitQuizFeedback");
    if (!sel) return;
    if (sel.value === "double") {
      fb.className = "quiz-feedback success";
      fb.textContent = "✓ ಸರಿ (Correct)! Ohm's Law states I = V / R. Doubling V while R remains constant doubles the current (12V / 10Ω = 1.20 A).";
    } else {
      fb.className = "quiz-feedback error";
      fb.textContent = "✗ ತಪ್ಪಾಗಿದೆ (Incorrect). Since I = V / R, doubling voltage directly doubles the current.";
    }
    fb.classList.remove("hidden");
  });

  calculateAndDraw();
}

// ==============================================================
// 2. EXPERIMENT 2: pH Scale and Indicators
// ==============================================================
function initPHExperiment() {
  const select = document.getElementById("substanceSelect");
  const canvas = document.getElementById("phCanvas");
  const ctx = canvas.getContext("2d");
  const phDisp = document.getElementById("phDisplayVal");
  const natureDisp = document.getElementById("phNatureVal");
  const recordBtn = document.getElementById("phRecordBtn");
  const tbody = document.querySelector("#phTable tbody");

  const records = [];

  function getPHColor(ph) {
    if (ph <= 2) return "#dc2626"; // Deep Red (Strong Acid)
    if (ph <= 4) return "#f97316"; // Orange (Acid)
    if (ph <= 6) return "#facc15"; // Yellow (Weak Acid)
    if (ph === 7) return "#22c55e"; // Green (Neutral)
    if (ph <= 9) return "#06b6d4"; // Cyan (Weak Base)
    if (ph <= 11) return "#3b82f6"; // Blue (Base)
    return "#7c3aed"; // Violet (Strong Base)
  }

  function renderPH() {
    const ph = parseFloat(select.value);
    const opt = select.options[select.selectedIndex];
    const nameKn = opt.getAttribute("data-name-kn");
    const nameEn = opt.getAttribute("data-name-en");

    phDisp.textContent = ph.toFixed(1);

    let nature = "";
    if (ph < 7) {
      nature = `ಆಮ್ಲೀಯ / Acidic (${ph < 3 ? 'ಪ್ರಬಲ / Strong' : 'ದುರ್ಬಲ / Weak'})`;
      natureDisp.style.color = "#ea580c";
    } else if (ph === 7) {
      nature = "ತಟಸ್ಥ / Neutral";
      natureDisp.style.color = "#16a34a";
    } else {
      nature = `ಪ್ರತ್ಯಾಮ್ಲೀಯ / Basic (${ph > 11 ? 'ಪ್ರಬಲ / Strong' : 'ದುರ್ಬಲ / Weak'})`;
      natureDisp.style.color = "#0284c7";
    }
    natureDisp.textContent = nature;

    // Draw Beaker & Liquid
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getPHColor(ph);

    // Beaker Outline
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 3;
    ctx.strokeRect(170, 40, 140, 110);

    // Liquid Fill
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.65;
    ctx.fillRect(173, 75, 134, 72);
    ctx.globalAlpha = 1.0;

    // Litmus Paper Strip dipped
    ctx.fillStyle = color;
    ctx.fillRect(230, 20, 20, 90);
    ctx.strokeStyle = "#cbd5e1";
    ctx.strokeRect(230, 20, 20, 90);

    // Label on Beaker
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(`pH: ${ph.toFixed(1)}`, 218, 120);
  }

  select.addEventListener("change", renderPH);

  recordBtn.addEventListener("click", () => {
    const trial = records.length + 1;
    const ph = parseFloat(select.value);
    const opt = select.options[select.selectedIndex];
    const subName = `${opt.getAttribute("data-name-kn")} (${opt.getAttribute("data-name-en")})`;
    const nature = ph < 7 ? "Acidic" : (ph === 7 ? "Neutral" : "Basic");

    records.push({ trial, name: opt.getAttribute("data-name-en"), ph });

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${trial}</td><td>${subName}</td><td>${ph.toFixed(1)}</td><td>${nature}</td>`;
    tbody.appendChild(tr);

    plotLabBarChart("phGraphCanvas", records);
  });

  renderPH();
}

// ==============================================================
// 3. EXPERIMENT 3: Microscope & Cell Explorer
// ==============================================================
function initCellExperiment() {
  const typeSelect = document.getElementById("specimenType");
  const objSelect = document.getElementById("objectivePower");
  const objVal = document.getElementById("objVal");
  const totalMagVal = document.getElementById("totalMagVal");
  const canvas = document.getElementById("cellCanvas");
  const ctx = canvas.getContext("2d");
  const recordBtn = document.getElementById("cellRecordBtn");
  const tbody = document.querySelector("#cellTable tbody");

  let trial = 0;

  function renderCells() {
    const type = typeSelect.value;
    const obj = parseInt(objSelect.value, 10);
    const total = 10 * obj; // 10x eyepiece

    objVal.textContent = `${obj}x`;
    totalMagVal.textContent = `${total}x`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;
    const radius = 75;

    // Dark outer stage
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Circular Microscope Viewport
    ctx.save();
    ctx.beginPath();
    ctx.arc(midX, midY, radius, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = type === "plant" ? "#ecfdf5" : "#fdf2f8";
    ctx.fillRect(midX - radius, midY - radius, radius * 2, radius * 2);

    if (type === "plant") {
      // Plant Brick-like Cell Walls
      ctx.strokeStyle = "#059669";
      ctx.lineWidth = obj === 4 ? 1 : (obj === 10 ? 2 : 3);
      const stepX = obj === 4 ? 20 : (obj === 10 ? 40 : 80);
      const stepY = obj === 4 ? 15 : (obj === 10 ? 25 : 50);

      for (let x = midX - radius; x < midX + radius; x += stepX) {
        for (let y = midY - radius; y < midY + radius; y += stepY) {
          ctx.strokeRect(x, y, stepX, stepY);
          // Nucleus
          ctx.fillStyle = "#047857";
          ctx.beginPath();
          ctx.arc(x + stepX * 0.7, y + stepY * 0.5, obj === 40 ? 6 : 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else {
      // Animal Irregular Cheek Cells
      ctx.strokeStyle = "#db2777";
      ctx.fillStyle = "rgba(244, 114, 182, 0.25)";
      ctx.lineWidth = 2;

      const count = obj === 4 ? 8 : (obj === 10 ? 4 : 1);
      for (let i = 0; i < count; i++) {
        const cx = midX + (i % 2 === 0 ? -25 : 25) * (i * 0.5);
        const cy = midY + (i > 1 ? 20 : -20);
        const r = obj === 40 ? 45 : 22;

        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.75, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Dark Nucleus
        ctx.fillStyle = "#be185d";
        ctx.beginPath();
        ctx.arc(cx, cy, obj === 40 ? 7 : 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // Viewport rim
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(midX, midY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  typeSelect.addEventListener("change", renderCells);
  objSelect.addEventListener("change", renderCells);

  recordBtn.addEventListener("click", () => {
    trial++;
    const spec = typeSelect.value === "plant" ? "Onion Peel (ಸಸ್ಯ ಕೋಶ)" : "Cheek Cells (ಪ್ರಾಣಿ ಕೋಶ)";
    const obj = `${objSelect.value}x`;
    const tot = `${parseInt(objSelect.value, 10) * 10}x`;
    const struct = typeSelect.value === "plant" ? "Cell wall, Large central vacuole, Nucleus" : "Cell membrane, Cytoplasm, Distinct nucleus";

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${trial}</td><td>${spec}</td><td>${obj}</td><td>${tot}</td><td>${struct}</td>`;
    tbody.appendChild(tr);
  });

  renderCells();
}

// ==============================================================
// Generic Plotters (strictly for recorded empirical data points)
// ==============================================================
function plotLabGraph(canvasId, points, xLabel, yLabel) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || points.length === 0) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pad = 35;
  const w = canvas.width - pad * 2;
  const h = canvas.height - pad * 2;

  // Axes
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, canvas.height - pad);
  ctx.lineTo(canvas.width - pad, canvas.height - pad);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.font = "9px sans-serif";
  ctx.fillText(xLabel, canvas.width - pad - 45, canvas.height - 8);
  ctx.fillText(yLabel, 5, pad - 12);

  const maxX = Math.max(...points.map(p => p.x), 1);
  const maxY = Math.max(...points.map(p => p.y), 1);

  ctx.strokeStyle = "#0284c7";
  ctx.fillStyle = "#0284c7";
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

function plotLabBarChart(canvasId, items) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || items.length === 0) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pad = 30;
  const barWidth = Math.max(12, (canvas.width - pad * 2) / (items.length * 1.5));
  const maxPH = 14;

  ctx.strokeStyle = "#94a3b8";
  ctx.beginPath();
  ctx.moveTo(pad, canvas.height - pad);
  ctx.lineTo(canvas.width - pad, canvas.height - pad);
  ctx.stroke();

  items.forEach((item, idx) => {
    const barH = (item.ph / maxPH) * (canvas.height - pad * 2);
    const x = pad + idx * (barWidth + 12) + 5;
    const y = canvas.height - pad - barH;

    ctx.fillStyle = item.ph < 7 ? "#f97316" : (item.ph === 7 ? "#22c55e" : "#0284c7");
    ctx.fillRect(x, y, barWidth, barH);

    ctx.fillStyle = "#0f172a";
    ctx.font = "9px sans-serif";
    ctx.fillText(`${item.ph}`, x, y - 4);
  });
}
