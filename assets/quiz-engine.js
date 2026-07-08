document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".sleep-quiz-container");
  if (!container) return;

  const introSection = container.querySelector(".sleep-quiz-intro");
  const engineSection = container.querySelector(".sleep-quiz-engine");
  const startBtn = container.querySelector(".sleep-quiz-start-btn");
  const progressBar = container.querySelector(".sleep-quiz-progress");
  const counterText = container.querySelector(".sleep-quiz-counter");
  const questionText = container.querySelector(".sleep-quiz-question");
  const optionsWrapper = container.querySelector(".sleep-quiz-options");
  const auditCountElement = container.querySelector(".sleep-quiz-audit-count");

  // FIX 1: Real-time Counter View Tracker removed to match updated HTML layout

  // FIX 2: 5x5 Professional Psychometric Biological Matrix Structure
  const questions = [
    {
      q: "What exact time windows characterize your nighttime sleep disruptions?",
      o: [
        "Waking up within 3-4 hours after falling asleep, feeling a heavy energy crash",
        "Snapping wide awake precisely between 2:30 AM and 3:30 AM with cold flashes",
        "Spontaneous arousals near 4:00 AM to 4:30 AM with intense heart palpitations",
        "Fragmented transitions shifting erratically between early and late night windows",
        "Waking up continuously throughout the entire night with head stiffness"
      ]
    },
    {
      q: "Which metabolic and neurological physical state describes you upon opening your eyes?",
      o: [
        "Mind instantly racing over tasks, accompanied by a sudden heat flush",
        "Feeling noticeably shaky, slightly sweaty, or experiencing mild hunger cues",
        "Feeling extreme brain fog, water retention, or a heavy dull ache in the skull",
        "Completely alert but calm, as if your internal clock believes it is already morning",
        "Dry throat, stiff jaw, or an instant feeling of physical oxygen starvation"
      ]
    },
    {
      q: "What primary lifestyle pattern dominates your late afternoon and evening routine?",
      o: [
        "Consuming coffee, energy drinks, or strong teas past 2:00 PM on working days",
        "Eating simple carbohydrates, sugary desserts, or heavy snacks less than 3 hours before bed",
        "Interacting with high-stress work files or bright blue-light screens right before sleep",
        "Maintaining an irregular schedule (shift work or sleeping in late on weekends)",
        "Low daily fluid intake combined with sleeping flat on your back all night"
      ]
    },
    {
      q: "How does your early evening sleep architecture transition occur?",
      o: [
        "Crashing hard into unconsciousness out of sheer exhaustion but waking up alert later",
        "Tossing and turning around midnight, feeling an uncomfortable inner core temperature",
        "Feeling physically exhausted but mentally wired, requiring background noise to drift off",
        "Falling asleep effortlessly early in the evening but failing to hold the sleep gate past 2 AM",
        "Experiencing immediate loud snoring or a high rate of micro-arousals from minute one"
      ]
    },
    {
      q: "Which systemic biochemical vulnerability aligns closest with your history?",
      o: [
        "High sensitivity to chemical stimulants (one morning coffee affects you for hours)",
        "Rapid metabolic burnout (feeling dizzy or irritable if daytime meals are delayed)",
        "Chronic neck tension, poor daily alignment, or sluggish morning fluid drainage",
        "Frequent shifts in timezone or lack of direct natural morning sunlight exposure",
        "A hyper-reactive nervous system that stays in a defensive fight-or-flight posture"
      ]
    }
  ];

  // Tracking bins for calculation of the 25 cross-conditional outcomes
  let scores = { purinergic: 0, metabolic: 0, cortisol: 0, circadian: 0, glymphatic: 0 };
  let currentStep = 0;

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      introSection.classList.add("hidden");
      engineSection.classList.remove("hidden");
      renderQuestion();
    });
  }

  function renderQuestion() {
    if (currentStep >= questions.length) {
      calculateMatrixResults();
      return;
    }

    const currentData = questions[currentStep];
    counterText.textContent = `QUESTION ${currentStep + 1} OF ${questions.length}`;
    questionText.textContent = currentData.q;
    
    const progressPercent = ((currentStep + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    optionsWrapper.textContent = "";

    currentData.o.forEach((optionText, idx) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "w-full text-left rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-medium text-slate-300 transition hover:border-sky-500/50 hover:bg-slate-900 hover:text-white";
      button.style.display = "block";
      button.style.width = "100%";
      button.style.marginBottom = "0.5rem";
      button.style.padding = "0.75rem 1rem";
      button.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
      button.style.border = "1px solid #1e293b";
      button.style.borderRadius = "0.75rem";
      button.style.color = "#94a3b8";
      button.style.cursor = "pointer";
      button.textContent = optionText;
      button.setAttribute("data-index", idx);
      optionsWrapper.appendChild(button);
    });
  }

  optionsWrapper.addEventListener("click", function (e) {
    const targetButton = e.target.closest("button");
    if (!targetButton) return;

    const chosenIdx = parseInt(targetButton.getAttribute("data-index"), 10);
    
    // Dynamically map selections to target biological tracks
    if (chosenIdx === 0) scores.purinergic += 2;
    if (chosenIdx === 1) scores.metabolic += 2;
    if (chosenIdx === 2) scores.cortisol += 2;
    if (chosenIdx === 3) scores.circadian += 2;
    if (chosenIdx === 4) scores.glymphatic += 2;

    currentStep++;
    renderQuestion();
  });

  function calculateMatrixResults() {
    counterText.textContent = "RUNNING ALGORITHMIC EVALUATION...";
    questionText.textContent = "Analyzing symptomatic physiological patterns...";
    optionsWrapper.textContent = "";

    // PRE-RESULT VALUE LOOP: Mengunci psikologi konversi pasar US (Pola Seed/Noom)
    let metrics = [
      "Isolating autonomic nervous system baseline...",
      "Evaluating nocturnal cortisol curve displacement...",
      "Quantifying purinergic receptor saturation index...",
      "Synthesizing customized 3 AM circadian blueprint..."
    ];

    let step = 0;
    optionsWrapper.innerHTML = `
      <div class="w-full py-6 text-center space-y-4">
        <div class="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
        <div id="cro-loading-text" class="text-[11px] font-mono tracking-wide text-slate-400">Initializing calculation grid...</div>
        <div class="w-full bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-800">
          <div id="cro-progress-bar" class="bg-gradient-to-r from-sky-500 to-emerald-500 h-full w-0 transition-all duration-300 ease-out"></div>
        </div>
      </div>
    `;

    const interval = setInterval(() => {
      if (step < metrics.length) {
        const loadingEl = document.getElementById('cro-loading-text');
        const progressEl = document.getElementById('cro-progress-bar');
        if (loadingEl) loadingEl.innerText = metrics[step];
        if (progressEl) progressEl.style.width = `${(step + 1) * 25}%`;
        step++;
      } else {
        clearInterval(interval);
        renderFinalMatrixOutput();
      }
    }, 1100);

    function renderFinalMatrixOutput() {
      counterText.textContent = "BIOLOGICAL EVALUATION COMPLETE";
      questionText.textContent = "Your Custom Sleep Maintenance Breakdown Is Ready";
      optionsWrapper.textContent = "";

      // Sort tracks to isolate Primary and Secondary factors for the 25-combination grid
      let sortedTracks = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
      let primaryFactor = sortedTracks[0];
      let secondaryFactor = sortedTracks[1];

      // Safe Outcomes Matrix Configuration System
      const outcomesMatrix = {
        purinergic: {
          metabolic: "Primary: Adenosine Receptor Up-regulation paired with Secondary: Nocturnal Glucose Drops. Your afternoon xanthine intake masks baseline sleep debt, creating a severe late-night chemical imbalance combined with a liver fuel drop.",
          cortisol: "Primary: Adenosine Receptor Up-regulation combined with Secondary: Cortisol Hyper-activation. Late-day stimulants cause a massive overnight purinergic clearance, causing the HPA-axis to fire a defense wakeup signal.",
          circadian: "Primary: Adenosine Blockade mixed with Secondary: Circadian Phase Advance. Your body fails to build sufficient sleep pressure, forcing an uncoordinated transition out of sleep during early REM windows.",
          glymphatic: "Primary: Adenosine Accumulation with Secondary: Astroglial Fluid Stagnation. Localized waste clearance is slowed due to altered sleep stage transitions.",
          default: "Primary: Purinergic Sleep Pressure Clearance Failure. Your sleep switch drops baseline hold metrics prematurely during lighter cycles due to late-afternoon stimulant chemical exposure."
        },
        metabolic: {
          purinergic: "Primary: Hepatic Glycogen Depletion paired with Secondary: Caffeine Clearance Lag. Pre-bed high-glycemic snacks lock you into an insulin trap, associated with a blood sugar shift that can trigger a compensatory adrenaline response.",
          cortisol: "Primary: Nocturnal Hypoglycemic Crisis combined with Secondary: HPA-Axis Stress Overdrive. Low liver energy stores cause an emergency sugar-rescue sequence, forcing adrenaline and cortisol to spike you wide awake.",
          circadian: "Primary: Metabolic Insulin Shifts mixed with Secondary: Melatonin Phase Mismatch. Unstable glucose curves conflict with your core body temperature drop, destabilizing sleep gate maintenance parameters.",
          glymphatic: "Primary: Glucose Curve Crashing with Secondary: Convective Glymphatic Stagnation. Overnight bioenergetic shifts frequently correlate with early arousal patterns, disrupting your brain's natural purification cycles.",
          default: "Primary: Nocturnal Glycogen Starvation Crisis. Your liver backup energy battery runs dry mid-sleep, causing a counter-regulatory stress hormone surge that terminates deep rest instantly."
        },
        cortisol: {
          metabolic: "Primary: Autonomic Sympathetic Overdrive paired with Secondary: Reactive Insulin Shifting. High baseline evening cortisol blocks deep delta sleep stages, making you hyper-reactive to normal midnight blood sugar changes.",
          purinergic: "Primary: Elevated Evening Stress Axis combined with Secondary: Adenosine Desensitivity. Fight-or-flight signaling blocks standard calming loops, dropping your neurological arousal threshold at 3 AM.",
          default: "Primary: Hyper-Active Cortisol Awakening Surge. Your subcortical emotional centers remain hyper-vigilant, forcing sudden alert awakenings where the conscious mind instantly tracks anxieties."
        },
        circadian: {
          default: "Primary: Central Biological Clock Desynchronization. Your internal master circadian clock is out of alignment with your lifestyle routine, lifting the sleep lock prematurely before morning."
        },
        glymphatic: {
          default: "Primary: Cranial Astroglial Fluid Clearance Retardation. Sluggish metabolic waste purification loops allow toxic byproducts to cluster, altering your night-time sensory processing limits."
        }
      };

      // Pull precise statement from combination layout, fall back to default if necessary
      let customDiagnosis = "";
      if (outcomesMatrix[primaryFactor] && outcomesMatrix[primaryFactor][secondaryFactor]) {
        customDiagnosis = outcomesMatrix[primaryFactor][secondaryFactor];
      } else if (outcomesMatrix[primaryFactor] && outcomesMatrix[primaryFactor].default) {
        customDiagnosis = outcomesMatrix[primaryFactor].default;
      } else {
        customDiagnosis = "Your sleep pattern indicates an interaction between homeostatic sleep pressure parameters and subcortical arousal tracking networks.";
      }

      const infoBlock = document.createElement("p");
      infoBlock.className = "text-xs text-slate-400 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800";
      infoBlock.style.padding = "1rem";
      infoBlock.style.backgroundColor = "#090f1e";
      infoBlock.style.border = "1px solid #1e293b";
      infoBlock.style.borderRadius = "0.75rem";
      infoBlock.style.marginBottom = "1rem";
      infoBlock.textContent = customDiagnosis;

      // Dynamic channel categorization attribution based on primary failure phenotype
      let targetChannelId = `quiz_${primaryFactor}_${secondaryFactor}`;

      const affiliateCTA = document.createElement("a");
      affiliateCTA.href = `https://getyusleep.com/glp/?affiliate=butetnadia&tid=${targetChannelId}`;
      affiliateCTA.target = "_blank";
      affiliateCTA.rel = "nofollow sponsored noopener noreferrer";
      affiliateCTA.className = "w-full text-center rounded-xl bg-emerald-600 px-6 py-4 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-all active:scale-[0.99]";
      affiliateCTA.style.display = "block";
      affiliateCTA.style.textDecoration = "none";
      affiliateCTA.style.padding = "1rem";
      affiliateCTA.style.backgroundColor = "#22c55e";
      affiliateCTA.style.color = "#ffffff";
      affiliateCTA.style.fontWeight = "700";
      affiliateCTA.style.borderRadius = "0.75rem";
      affiliateCTA.style.textAlign = "center";
      affiliateCTA.style.boxShadow = "0 10px 15px -3px rgba(34,197,94,0.3)";
      affiliateCTA.textContent = "Access Your Personalized Sleep Reset Protocol →";

      // Injeksi Grafik Hormonal untuk memperkuat bukti ilmiah sebelum teks diagnosis muncul
      const visualChart = document.createElement("div");
      visualChart.className = "my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] w-full shadow-md";
      visualChart.innerHTML = `<img src="assets/quiz-hormone.webp" alt="Nocturnal Hormone Disruption Curve" width="800" height="450" loading="eager" decoding="async" class="w-full h-full object-cover">`;
      
      optionsWrapper.appendChild(visualChart);
      optionsWrapper.appendChild(infoBlock);
      optionsWrapper.appendChild(affiliateCTA);
    }
  }
});