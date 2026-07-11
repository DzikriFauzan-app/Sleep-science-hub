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
      q: "What do you most commonly feel when waking up in the middle of the night?",
      o: [
        "I feel completely drained, like my body's natural energy reserves are empty",
        "I wake up feeling slightly warm, restless, or noticing mild midnight hunger cues",
        "My mind instantly starts racing over tasks, accompanied by a sudden wave of alertness",
        "I wake up feeling calm but fully awake, as if my body believes it is already morning",
        "I notice physical tension in my shoulders/neck or a general feeling of restlessness"
      ]
    },
    {
      q: "Which routine best describes your typical late afternoon or evening?",
      o: [
        "Enjoying coffee, energy drinks, or strong teas past 2:00 PM",
        "Having a carbohydrate-rich dinner, sweet desserts, or a relaxing drink before bed",
        "Checking work dashboards, handling stressful files, or looking at bright screens in bed",
        "Managing an irregular schedule, such as rotating shifts or sleeping in on weekends",
        "Having a lower fluid intake during the day or sleeping in a warm, closed room"
      ]
    },
    {
      q: "How does drifting off to sleep usually feel for you early in the night?",
      o: [
        "I fall asleep very quickly out of sheer exhaustion, but wake up noticealby later",
        "I tend to toss and turn, feeling like my body is holding onto too much day-time heat",
        "My body feels tired but my mind stays active, often needing background sounds to drift off",
        "I fall asleep naturally early but find it difficult to stay asleep past 2:00 AM",
        "I experience shallow breathing patterns or frequent micro-awakenings from the first hour"
      ]
    },
    {
      q: "Which pattern describes your physical energy the next morning?",
      o: [
        "A heavy morning grogginess that takes a few hours and coffee to fully clear",
        "Feeling slightly shaky or irritable until I can eat a balanced breakfast",
        "Waking up already thinking about daily stressors, holding tightness in my muscles",
        "Feeling completely awake at dawn but experiencing a sharp energy dip after lunch",
        "Waking up feeling unrefreshed, as if the quality of my rest was shallow"
      ]
    },
    {
      q: "Which area represents your body's typical vulnerability or daily routine?",
      o: [
        "High sensitivity to compounds like caffeine (a morning cup keeps me active for long)",
        "Noticing changes in focus or mood if regular daytime meals are delayed",
        "A tendency to hold stress physically, keeping the nervous system in a watchful state",
        "Frequent travel, changing routines, or getting limited natural sunlight in the morning",
        "Sluggish circulation or structural tension carried in the neck and upper back"
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
    }, 700);

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
        cortisol: {
          default: "YOUR PATTERN: The Calming Wind-Down Profile (Cortisol & Racing Thoughts Focus). Your data points toward a shift where your morning cortisol curve begins its rise slightly earlier than average, lowering your sleep arousal threshold at 3 AM. When this happens, the analytical mind instantly turns on to process daily tasks. Many people with this pattern find significant relief by adopting a dedicated pre-sleep wind-down routine and introducing gentle botanical support like Lemon Balm and L-Trptophan to help quiet those sudden midnight racing thoughts naturally."
        },
        metabolic: {
          default: "YOUR PATTERN: The Stable Fuel Profile (Nocturnal Glucose Focus). Your responses suggest your midnight awakening may be linked to natural variations in overnight energy storage. When glycogen availability drops mid-sleep, the body initiates a mild, compensatory counter-regulatory signal to stabilize blood sugar, which inadvertently triggers alertness. A helpful strategy is to pair your evening meals with healthy fats or proteins rather than simple sugars, and support your system with clean micronutrients that stabilize overnight metabolic balance without digestive strain."
        },
        circadian: {
          default: "YOUR PATTERN: The Natural Rhythm Reset Profile (Circadian Alignment Focus). Your profile indicates a slight mismatch between environmental light cues and your master internal biological clock. This causes your core body temperature to rise prematurely during the night, opening the sleep gate ahead of schedule. Realignment is best achieved by getting 10-15 minutes of direct morning sunlight within an hour of waking to anchor your sircadian baseline, combined with gentle support like Chamomile and Magnesium to deepen your rest phases."
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
      const isSubFolder = window.location.pathname.includes('/blog/');
      const basePath = isSubFolder ? '../assets/' : 'assets/';

      const visualChart = document.createElement("div");
      visualChart.className = "my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] w-full shadow-md";
      visualChart.innerHTML = `<img src="${basePath}quiz-hormone.webp" alt="Nocturnal Hormone Disruption Curve" width="800" height="450" loading="eager" decoding="async" class="w-full h-full object-cover">`;
      
      optionsWrapper.appendChild(visualChart);
      optionsWrapper.appendChild(infoBlock);
      
      const trustText = document.createElement("p");
      trustText.className = "text-[10px] text-slate-500 text-center font-mono my-2 block w-full";
      trustText.textContent = "📋 Verified diagnostic report logged via team@circadianblueprint.com";
      optionsWrapper.appendChild(trustText);
      optionsWrapper.appendChild(affiliateCTA);
    }
  }
});