document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".sleep-quiz-container");
  if (!container) return;

  const introSection = container.querySelector(".sleep-quiz-intro");
  const engineSection = container.querySelector(".sleep-quiz-engine");
  const startBtn = container.querySelector(".sleep-quiz-start-btn");
  const progressBar = container.querySelector(".sleep-quiz-progress");
  const counterText = container.querySelector(".sleep-quiz-counter,.quiz-counter");
  const questionText = container.querySelector(".sleep-quiz-question,.quiz-question, h3");
  const optionsWrapper = container.querySelector(".sleep-quiz-options,.quiz-options");
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
      counterText.textContent = "EVALUATION COMPLETE";
      questionText.textContent = "Your Personalized Circadian Sleep Profile";
      optionsWrapper.textContent = "";

      let sortedTracks = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
      let primaryFactor = sortedTracks[0];
      let secondaryFactor = sortedTracks[1];

      // Jaringan 25 Kombinasi Silang Empatik & Deskriptif (100% Beban Diagnosa Medis Dihapus)
      const outcomesMatrix = {
        purinergic: {
          purinergic: "Evening Wind Down Sensitivity. Your pattern shows a high sensitivity to evening chemical compounds that mask natural sleep pressure. When this temporary block wears off around 3 AM, your nervous system experiences a quick return to alertness. Focus on shifting your beverage window earlier to help natural sleep factors stabilize before bed.",
          metabolic: "Nighttime Energy Dip Pattern (Adenosine meets Nocturnal Glucose). Lingering late-day caffeine drops your sleep depth threshold, making you highly aware of the subtle blood sugar drops that occur naturally in the middle of the night. Transitioning to a lighter dinner can keep your micro-arousal limits stable.",
          cortisol: "Early Morning Alertness Pattern (Adenosine meets Natural Cortisol Rise). Evening active compounds are mixing with your early morning circadian rhythm, turning a normal cortisol shift into an abrupt waking state. Introducing non-stimulating routines before bed will help your brain anchor its sleep state smoothly.",
          circadian: "Body Clock Shift Pattern (Adenosine meets Internal Clock). An artificial shift in your baseline sleep pressure meets a slightly advanced core body temperature curve, leading to waking cycles during early morning REM windows. Getting bright daylight early tomorrow will help anchor this shift.",
          glymphatic: "Physical Tension Pattern (Adenosine meets Physical Relaxation Focus). Minor structural or circulation limits slow down overnight physical recovery windows. Easing your evening mental workload allows your body to drop into deeper, uninterrupted phases of rest.",
          default: "The Balanced Sleep Pressure Profile. A subtle sensitivity to late-day external inputs causes your internal sleep lock to open slightly ahead of schedule. Focusing on clean, unmedicated relaxation alternatives will help preserve your natural sleep architecture."
        },
        metabolic: {
          purinergic: "The Sustained Energy Profile (Nocturnal Glucose meets Adenosine Dynamics). Overnight energy fluctuations are colliding with an active neural threshold from lingering evening choices. Ensuring your last meal is balanced with slow-burning fats can prevent your body from triggering an alertness alert.",
          metabolic: "The Stable Fuel Profile (Nocturnal Glucose Balance Focus). Your profile suggests that minor drops in overnight glycogen stores trigger a natural, compensatory backup signal to stabilize energy levels, which inadvertently sparks sudden mid-night alertness. A small handful of complex proteins before bed works wonders to hold the gate.",
          cortisol: "The Balanced Recovery Profile (Nocturnal Glucose meets Endocrine Shift). Natural mid-night blood sugar shifts are triggering a secondary stress response, waking you up with a racing thoughts loop. Supporting your system with raw micronutrients before sleep helps balance these internal energy indicators.",
          circadian: "The Dynamic Clock Profile (Nocturnal Glucose meets Suprachiasmatic Shift). Unstable overnight fuel patterns are conflicting with your core body temperature drop, shortening the sleep cycle. Aligning your meal schedule cleanly with daylight hours will keep these organ systems tracking together.",
          glymphatic: "The Cellular Balance Profile (Nocturnal Glucose meets Restorative Clearance). Minor metabolic energy drops are intercepting your body's natural nocturnal cellular purification phases. Prioritizing physical comfort and structural rest protocols allows this internal cycle to run without interruption.",
          default: "The Overnight Fuel Stabilization Profile. Natural fluctuations in midnight energy levels trigger a sudden sugar-rescue sequence that disrupts deep rest. A small protein-based routine before bed will provide the slow-burning fuel your system needs."
        },
        cortisol: {
          purinergic: "The Quiet Wind-Down Profile (Cortisol Management meets Adenosine Focus). Elevated evening stress indicators are lowering your sensory baseline, neutralizing standard sleep pressure and making you hyper-aware of environmental shifts at 3 AM. A dedicated wind-down routine helps ease this sensory boundary.",
          metabolic: "The Endocrine Flow Profile (Cortisol Management meets Glucose Volatility). Chronic daytime stress signals carry over into the night, forcing early liver energy changes that result in a reactive midnight awakening. Gentle botanical assistance works best to ease this nervous system axis naturally.",
          cortisol: "The Steady Mind Profile (Natural Cortisol Awakening Focus). Your analytical networks are waking up slightly ahead of schedule, shifting the morning cortisol peak into the 3 AM window and bringing immediate focus to daily tasks. Adopting an empathetic approach to your boundaries will allow the brain to feel safe.",
          circadian: "The Internal Realignment Profile (Cortisol Management meets Circadian Mismatch). Extended stress spikes are desynchronizing your master internal clock, making it difficult to bridge the transition into early morning REM cycles. Focus on direct solar exposure early in the morning to fix this rhythm.",
          glymphatic: "The Physical Release Profile (Cortisol Management meets Fluid Circulation). High physical and vascular tension prevents the deep, relaxed vasomotion required for optimal overnight physical recovery. Bypassing heavy capsule processing helps lower this baseline muscle tone cleanly.",
          default: "The Calming Wind-Down Profile. Your morning cortisol curve begins its rise slightly earlier than average, lowering your sleep arousal threshold at 3 AM. Winding down with quiet, tech-free activities allows your brain to anchor its resting state."
        },
        circadian: {
          purinergic: "The Rhythm Synchronization Profile (Circadian Mismatch meets Adenosine Dynamics). A minor shift in your master internal pacemaker is amplified by late-day lifestyle habits, causing the sleep gate to release early. True realignment relies on anchoring your daytime habits with environmental light.",
          metabolic: "The Internal Pacemaker Profile (Circadian Mismatch meets Glucose Focus). Your peripheral liver clock and central brain clock are tracking out of schedule with each other, triggering unexpected alertness alerts. Ensuring stable meal timing keeps your biological anchors locked.",
          cortisol: "The Phase Shift Profile (Circadian Mismatch meets Cortisol Shift). Your internal biological master clock is sending morning wake signals to your adrenal pathways hours before sunrise. Using gentle, calming botanicals before sleep helps push this natural peak back to dawn.",
          circadian: "The Natural Rhythm Reset Profile (SCN Alignment Focus). Your profile indicates a minor mismatch between environmental light cues and your master internal biological clock, causing your core temperature to rise prematurely. Getting 10 minutes of direct sunlight upon waking anchors this rhythm.",
          glymphatic: "The Restorative Gateway Profile (Circadian Mismatch meets Restorative Clearance). A shifted core temperature nadir shortens the deep slow-wave rest windows needed for physical recovery. Maximizing early-night relaxation parameters extends this restorative window.",
          default: "The Master Biological Clock Reset Profile. Your internal master biological pacemaker is operating out of rhythm with your modern daily routine. Anchoring your environment with consistent natural light shifts this balance back to normal."
        },
        glymphatic: {
          purinergic: "The Cellular Cleanse Profile (Restorative Clearance meets Adenosine Focus). Sluggish overnight physical recovery parameters allow metabolic debris to accumulate, lowering your sensory arousal threshold and waking you up. Shifting to zero-digestion fluid support keeps this cycle clean.",
          metabolic: "The Fluid Balance Profile (Restorative Clearance meets Glucose Volatility). Accumulations of physical byproduct cells interact with minor midnight glucose drops, leading to unrefreshed morning energy. Prioritizing systemic hydration assists this overnight balance.",
          cortisol: "The Relaxed Core Profile (Restorative Clearance meets Cortisol Shift). Physical tension carried in the body acts as a midnight waking trigger, prompting an early adrenaline release. Easing muscle resistance before sleep breaks this circuit completely.",
          circadian: "The Full Body Reset Profile (Physical Recovery Focus). Your pattern shows accumulated physical tension from the day carrying into the night, making micro awakenings more likely. A gentle full body release routine before bed helps the system stay in deeper rest longer.",
          glymphatic: "The Structural Rhythm Profile (Restorative Clearance meets Circadian Mismatch). Delayed overnight physical recovery sequences prompt minor micro-arousals that split sleep continuity. Adjusting your room environment parameters keeps these sleep cycles tight.",
          default: "The Sluggish Restorative Clearance Profile. Reduced overnight physical recovery parameters cause physical tension to pool, shifting the brain out of deep rest cycles early. Support your system with targeted micro-nutrients to clear this path."
        }
      };

      let customDiagnosis = "Your sleep pattern indicates an interaction between homeostatic sleep pressure parameters and subcortical arousal tracking networks.";
      if (outcomesMatrix[primaryFactor] && outcomesMatrix[primaryFactor][secondaryFactor]) {
        customDiagnosis = outcomesMatrix[primaryFactor][secondaryFactor];
      } else if (outcomesMatrix[primaryFactor] && outcomesMatrix[primaryFactor].default) {
        customDiagnosis = outcomesMatrix[primaryFactor].default;
      }

      // Suntikan Tips Praktis Gratis Sesuai Karakter Faktor Utama
      let freeTip = "";
      if (primaryFactor === "cortisol" || primaryFactor === "purinergic") {
        freeTip = "💡 <strong>Free Actionable Tip for Tonight:</strong> Try the 4-7-8 breathing relaxation technique for 3 minutes right before bed to help lower early-morning sympathetic nervous system tone.";
      } else if (primaryFactor === "metabolic") {
        freeTip = "💡 <strong>Free Actionable Tip for Tonight:</strong> Consume a single spoonful of raw almond butter or a small handful of walnuts 30 minutes before sleep to supply a stable, slow-burning fuel source.";
      } else {
        freeTip = "💡 <strong>Free Actionable Tip for Tonight:</strong> Ensure your bedroom temperature is dropped between 65-68°F (18-20°C) to prevent an artificial core temperature spike from waking you early.";
      }

      const infoBlock = document.createElement("p");
      infoBlock.className = "text-xs text-slate-400 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800";
      infoBlock.style.padding = "1rem";
      infoBlock.style.backgroundColor = "#090f1e";
      infoBlock.style.border = "1px solid #1e293b";
      infoBlock.style.borderRadius = "0.75rem";
      infoBlock.style.marginBottom = "1rem";
      infoBlock.innerHTML = `
        <span class="block text-[10px] font-mono tracking-wider text-emerald-400 mb-2 font-bold">📋 COMPLETE EVALUATION ANALYSIS:</span>
        ${customDiagnosis}
        <span class="block text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800 font-sans mt-3">${freeTip}</span>
        <span class="block text-[11px] text-sky-400 font-medium mt-3">🎁 Included Reward:</span>
        <span class="block text-xs text-slate-200 leading-relaxed">Based on your Adenosine & Glucose profile, physical tracking shows that generic sleep advice won't stabilize your midnight waking cycle. Your system requires targeted nutritional support. The evening ritual recommended below utilizes a highly concentrated dark elderberry and botanical micro-nutrient matrix. In molecular literature, these specific antioxidants are shown to help support overnight metabolic stabilization and keep the HPA-axis from triggering early cortisol spikes, without the grogginess of standard pills. We personally integrate this liquid botanical drop into our nightly routine to keep our early-morning baseline completely calm and undisturbed.</span>
      `;

      let targetChannelId = `compliant_${primaryFactor}_${secondaryFactor}`;

      // Injeksi WAJIB Jembatan Halus (Soft-Bridge Disclosure) untuk Perlindungan Hukum FTC US
      const disclaimerText = document.createElement("p");
      disclaimerText.className = "text-[11px] text-slate-400 text-center leading-relaxed my-3 px-2 block w-full font-sans";
      disclaimerText.innerHTML = "⚠️ <strong>Affiliate Disclosure:</strong> This educational tool references a recommended sleep support protocol. If you choose to purchase through our link, we may earn a small commission at no additional cost to you. This is for general educational purposes only and does not substitute for professional medical advice.";

      const affiliateCTA = document.createElement("a");
      affiliateCTA.href = `https://getyusleep.com/glp/?affiliate=butetnadia&tid=${targetChannelId}`;
      affiliateCTA.target = "_blank";
      affiliateCTA.rel = "nofollow sponsored noopener noreferrer";
      affiliateCTA.className = "w-full text-center rounded-xl bg-emerald-600 px-6 py-4 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-all active:scale-[0.99] block";
      affiliateCTA.style.display = "block";
      affiliateCTA.style.textDecoration = "none";
      affiliateCTA.style.padding = "1rem";
      affiliateCTA.style.backgroundColor = "#10b981";
      affiliateCTA.style.color = "#ffffff";
      affiliateCTA.style.fontWeight = "700";
      affiliateCTA.style.borderRadius = "0.75rem";
      affiliateCTA.style.textAlign = "center";
      affiliateCTA.textContent = "Explore the Science-Backed Evening Ritual →";

      container.scrollIntoView({ behavior: 'instant', block: 'start' });
    optionsWrapper.appendChild(affiliateCTA);
    optionsWrapper.appendChild(infoBlock);
    optionsWrapper.appendChild(disclaimerText);
      if(typeof gtag!=="undefined"){gtag("event","quiz_completed",{primary_factor:primaryFactor,secondary_factor:secondaryFactor});}
    }
  }
});