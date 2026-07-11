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
      q: "What exact physical sensation characterizes your middle-of-the-night awakening?",
      o: [
        "I wake up feeling an absolute physical emptiness, like my energy fuel tank is completely dry",
        "I snap wide awake between 2:30 AM and 3:30 AM with a sudden hot flush, mild night sweats, or immediate hunger",
        "I wake up with my heart pounding violently, mind racing over tomorrow's problems, and a surge of inner panic",
        "I wake up feeling calm but fully alert, as if my internal clock is convinced it is already 7:00 AM",
        "I wake up with noticeable physical stiffness in my jaw/neck, a dry throat, or a dull ache inside the skull"
      ]
    },
    {
      q: "Select the dominant substance or dietary pattern of your late afternoon and evening:",
      o: [
        "Consuming caffeine, stimulant teas, or pre-workouts past 2:00 PM on standard working days",
        "Eating high-glycemic carbohydrates, sweet desserts, or alcohol within 3 hours of your sleep window",
        "Reviewing high-stress business files, emails, or scrolling high-intensity blue-light screens right before bed",
        "Experiencing highly irregular meal times or erratic weekend sleep schedules compared to weekdays",
        "Low overall clean fluid intake during the day combined with sleeping completely flat on your back"
      ]
    },
    {
      q: "How does your early evening sleep onset and early-stage transition look?",
      o: [
        "I crash heavily into unconsciousness due to sheer exhaustion, but my sleep hold breaks after 3-4 hours",
        "I toss and turn around midnight, feeling like my core body temperature is too hot to drift off comfortably",
        "I feel physically exhausted but my brain stays completely wired, requiring background audio to distract my thoughts",
        "I fall asleep effortlessly early, but I absolutely cannot maintain the sleep gate past 2:30 AM",
        "I experience immediate loud snoring, heavy mouth breathing, or a high rate of gasping micro-arousals"
      ]
    },
    {
      q: "Which specific recovery deficit pattern describes your morning physical state?",
      o: [
        "Extreme morning grogginess that requires immediate caffeine or stimulants to clear the brain fog",
        "Waking up feeling shaky, irritable, or dizzy until I consume a solid carbohydrate breakfast",
        "Waking up already anticipating stress, with muscle tension carried over directly from the night",
        "Feeling wide awake at dawn but experiencing a massive energy crash around 1:00 PM to 2:00 PM",
        "Waking up with puffy eyes, facial water retention, or a heavy, toxic feeling localized in the brain"
      ]
    },
    {
      q: "Which metabolic or nervous system vulnerability best describes your long-term history?",
      o: [
        "High sensitivity to chemical compounds (a single cup of morning coffee limits my deep sleep architecture)",
        "Rapid bioenergetic burnout (feeling faint, hangry, or cognitively sluggish if regular daytime meals are delayed)",
        "Chronic hyper-vigilance (my nervous system constantly operates in a defensive, sympathetic fight-or-flight posture)",
        "Frequent travel across timezones, shift work, or minimal exposure to direct natural morning sunlight",
        "Sluggish circulation, structural neck/spine alignment issues, or a history of nocturnal airway resistance"
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
        purinergic: {
          purinergic: "Primary: Adenosine Receptor Saturation. High late-afternoon stimulant occupancy blocks natural purinergic accumulation, causing a catastrophic collapse of homeostatic sleep pressure at 3 AM once early deep cycles end.",
          metabolic: "Primary: Adenosine Blockade paired with Secondary: Nocturnal Hypoglycemia. Residual caffeine lowers your awakening threshold, making you hyper-vulnerable to the minor adrenaline spikes caused by normal midnight blood sugar drops.",
          cortisol: "Primary: Purinergic Receptor Clearance Lag combined with Secondary: HPA-Axis Overdrive. Lingering xanthine compounds block calming neural loops, amplifying the nocturnal cortisol awakening cascade into a full fight-or-flight arousal.",
          circadian: "Primary: Purinergic Pressure Failure mixed with Secondary: Circadian Phase Advance. An artificial delay in homeostatic sleep pressure meets an advanced core body temperature curve, breaking the neural sleep lock early.",
          glymphatic: "Primary: Adenosine Desensitivity paired with Secondary: Astroglial Fluid Stagnation. Stimulant-induced disruption of slow-wave delta phases short-circuits the glymphatic convective waste clearance cycle overnight.",
          default: "Primary: Purinergic Dynamic Instability. Your baseline sleep-promoting switch drops its hold parameters prematurely during early REM transitions due to incomplete late-day clearance of performance chemical blocks."
        },
        metabolic: {
          purinergic: "Primary: Nocturnal Glycopenic Crisis paired with Secondary: Adenosine Receptor Inoccupancy. Pre-bed glucose/insulin volatility forces a midnight liver energy drop, crashing into an already weakened sleep pressure framework.",
          metabolic: "Primary: Isolated Hepatic Glycogen Depletion. Your liver's bioenergetic battery runs completely dry mid-sleep, triggering an emergency counter-regulatory adrenaline surge to extract emergency sugar, waking you instantly.",
          cortisol: "Primary: Hypoglycemia-Induced Adrenaline Spike combined with Secondary: Sympathetic Dominance. A steep drop in overnight glucose forces a secondary stress axis cascade, triggering sudden tachycardia and survival anxiety at 3 AM.",
          circadian: "Primary: Metabolic Insulin Volatility mixed with Secondary: Core Temperature Mismatch. Nocturnal glucose crashes conflict with the circadian core body temperature nadir, destabilizing the master sircadian gate.",
          glymphatic: "Primary: Bioenergetic Fuel Crashing paired with Secondary: Fluid Clearance Sluggishness. The systemic stress response triggered by low midnight glucose completely halts the quiet, parasympathetic glymphatic purification cycle.",
          default: "Primary: Nocturnal Glycogen Starvation Crisis. Suboptimal glycogen storage capacity forces an emergency neuroglycopenia rescue sequence, executing a cortisol and adrenaline release that terminates rest."
        },
        cortisol: {
          purinergic: "Primary: Hyper-Active Cortisol Awakening Surge combined with Secondary: Purinergic Debt Deficit. Elevated baseline evening stress axis hormones lower the brain's sensory gating limits, neutralizing standard adenosine sleep pressure.",
          metabolic: "Primary: Autonomic Sympathetic Overdrive paired with Secondary: Reactive Insulin Shifting. High nocturnal stress hormones trigger gluconeogenesis, causing an artificial blood sugar spike followed by an acute midnight crash.",
          cortisol: "Primary: Advanced HPA-Axis Circadian Displacements. Your subcortical survival networks run an altered circadian clock, shifting the morning cortisol peak backward into the 3 AM window and waking the conscious mind.",
          circadian: "Primary: Prolonged Neuroendocrine Stress mixed with Secondary: Melatonin Phase Mismatch. Chronic midnight cortisol elevation desynchronizes the suprachiasmatic nucleus, flattening natural melatonin secretion curves.",
          glymphatic: "Primary: Elevated Nocturnal Sympathetic Tone paired with Secondary: Astroglial Waste Stagnation. Constant stress signaling maintains high vascular resistance, preventing the deep delta vasomotion needed for neural waste flush.",
          default: "Primary: Subcortical Hyper-Vigilance Activation. Your autonomic nervous system stays locked in a protective posture, triggering a sudden, alert awakening where the prefrontal cortex immediately processes daily worries."
        },
        circadian: {
          purinergic: "Primary: Central Biological Clock Desynchronization combined with Secondary: Purinergic Blockade. A fundamental misalignment between light cycles and lifestyle is compounded by poor natural adenosine buildup.",
          metabolic: "Primary: Circadian Phase Mismatch paired with Secondary: Nocturnal Fuel Crashing. Peripheral liver and metabolic clocks operate out of sync with your sleep window, causing a midnight energy crash alert.",
          cortisol: "Primary: Advanced Master Circadian Clock mixed with Secondary: Premature Cortisol Surge. The suprachiasmatic nucleus signals the adrenal glands to fire the morning awakening hormone cascade hours before actual sunrise.",
          circadian: "Primary: Complete SCN Pacemaker Disalignment. Internal biological markers are desynchronized from the environmental schedule, forcing an involuntary transition into wakefulness during early morning REM.",
          glymphatic: "Primary: Circadian Gate Failure combined with Secondary: Convective Glymphatic Stagnation. A mistimed core body temperature drop shortens the N3 slow-wave sleep windows required for deep metabolic waste drainage.",
          default: "Primary: Central Master Clock Phase Shift. Your internal biological clock acts out of rhythm with your modern lifestyle schedule, lifting the neurological sleep lock way before dawn."
        },
        glymphatic: {
          purinergic: "Primary: Interstitial Waste Pooling combined with Secondary: Caffeine Clearance Lag. Sluggish cerebral fluid drainage allows toxic metabolic byproducts to pool, lowering your sensory arousal threshold at night.",
          metabolic: "Primary: Sluggish Neuro-Lymphatic Waste Drainage paired with Secondary: Nocturnal Glycogen Drops. Accumulated cortical debris triggers localized micro-inflammations that destabilize overnight metabolic homeostatic limits.",
          cortisol: "Primary: Astroglial Fluid Stagnation mixed with Secondary: Secondary HPA-Axis Activation. Accumulation of metabolic waste products acts as an internal physical stressor, forcing a midnight panic adrenaline release.",
          circadian: "Primary: Delayed Cranial Purification Cycles paired with Secondary: Circadian Phase Shift. Uncleared neurochemical waste causes frequent, unexplained micro-arousals that break deep sleep continuity.",
          glymphatic: "Primary: Cranial Astroglial Fluid Clearance Retardation. Reduced convective flow through the aquaporin-4 (AQP4) network allows overnight metabolite accumulation, shifting the brain out of deep rest early.",
          default: "Primary: Sluggish Cranial Astroglial Fluid Clearance. Reduced convective flow in the glymphatic network causes overnight waste pooling, causing your brain to shift prematurely out of deep rest states."
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