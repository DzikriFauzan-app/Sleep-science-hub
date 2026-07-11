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
      q: "What exact frightening physical state describes your sudden 3 AM awakening?",
      o: [
        "I wake up feeling an absolute hollow emptiness, like my internal biological battery is completely dead",
        "I snap wide awake between 2 AM and 3:30 AM with a sudden hot wave, cold sweats, or intense hunger",
        "My heart pounds violently against my ribs, my mind races over anxieties, and I feel a surge of pure panic",
        "I wake up completely alert and calm, as if my broken internal clock believes it is already morning",
        "I wake up with intense jaw clenching, a painfully dry throat, or a toxic, heavy dull ache inside my skull"
      ]
    },
    {
      q: "Select the dominant toxic environmental or dietary trigger of your late afternoon:",
      o: [
        "Consuming coffee, energy drinks, sodas, or pre-workout stimulants past 2:00 PM",
        "Eating simple carbohydrates, sugary desserts, high-sodium snacks, or alcohol within 3 hours of bed",
        "Reviewing stressful work emails, checking dashboards, or scrolling high-intensity screens in the dark",
        "Maintaining an irregular schedule (erratic weekend wake times or rotating work shifts)",
        "Low daily hydration combined with sleeping flat on your back or under restrictive air circulation"
      ]
    },
    {
      q: "How does your early evening sleep onset and early-stage transition look?",
      o: [
        "I crash into unconsciousness out of pure physical exhaustion, but my sleep hold breaks after 3-4 hours",
        "I toss and turn for hours, feeling an uncomfortable, radiating inner core body temperature",
        "I am physically exhausted but my brain stays completely wired, requiring background noise to drown out thoughts",
        "I drift off effortlessly early in the evening, but I absolutely cannot hold the sleep gate past 2 AM",
        "I experience immediate loud snoring, heavy mouth breathing, or frequent choking micro-arousals"
      ]
    },
    {
      q: "Which debilitating recovery deficit describes your physical state the next morning?",
      o: [
        "Severe, paralyzing morning grogginess that requires immediate stimulants to lift the brain fog",
        "Waking up feeling shaky, profoundly irritable, or dizzy until I force a high-carb breakfast",
        "Waking up already anticipating exhaustion, carrying physical muscle knots straight out of bed",
        "Feeling strangely alert at dawn, only to suffer a catastrophic energy crash at 1:00 PM",
        "Waking up with puffy eyes, facial fluid retention, and a heavy, uncleared toxic feeling in the brain"
      ]
    },
    {
      q: "Which systemic biochemical vulnerability closest matches your long-term history?",
      o: [
        "Extreme sensitivity to stimulants (a single morning coffee noticeably ruins my deep sleep architecture)",
        "Rapid metabolic burnout (feeling weak, lightheaded, or intensely 'hangry' if regular meals are delayed)",
        "Chronic nervous system hyper-vigilance (my body constantly lives in a defensive sympathetic flight posture)",
        "Frequent timezone changes, poor lifestyle routines, or minimal exposure to direct natural morning sunlight",
        "Sluggish lymphatic circulation, chronic neck/spine tension, or anatomical airway resistance"
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
          purinergic: "CRITICAL ALERT: Your brain's sleep switch has suffered an acute Purinergic Collapse. Late-day caffeine has aggressively saturated your adenosine receptors. When this artificial block clears at 3 AM, your synapses experience a violent electrical rebound—flooding your brain with sudden wakefulness. Heavy chemical sleeping pills will only anesthetize your cortex while leaving these receptors unstable. Your only logical solution is a direct sublingual nano-delivery that bypasses the gut to stabilize neural pathways in 15 seconds.",
          metabolic: "METABOLIC REBOUND GAP: Lingering afternoon stimulants are masking your true homeostatic sleep debt, while a midnight glucose crash triggers an emergency sugar-rescue response. This double-assault drops your sensory arousal threshold, forcing an alert state. Digesting solid capsules or tablets is too slow during a 3 AM crisis; you require immediate sublingual absorption to neutralize the emergency hormone surge instantly.",
          cortisol: "HPA-AXIS RECEPTOR OVERLOAD: Residual stimulant compounds block your brain's parasympathetic pathways, transforming the normal early-morning cortisol rise into an intense panic surge. You snap awake with a racing heart and racing thoughts. Melatonin supplements will only worsen morning grogginess—you need immediate sublingual nano-nutrients to deactivate this subcortical alarm system on contact.",
          circadian: "CIRCADIAN MISMATCH DISRUPTION: The artificial delay in your homeostatic sleep pressure meets an advanced core body temperature curve, shattering your sleep lock right as you enter early REM phases. Heavy chemical sedation won't realign these master clock frequencies; you need zero-lag sublingual nano-delivery to synchronize circadian receptor networks on impact.",
          glymphatic: "GLYMPHATIC DEBRIS RETARDATION: Stimulant-induced reduction of slow-wave N3 cycles completely stalls your brain's metabolic waste flush, pooling toxic cellular byproducts. This accumulation acts as an internal physical irritant, triggering a micro-arousal loop at 3 AM. Pill-based supplements cannot repair this clearing mechanism; only zero-digestion sublingual nano-emulsions can restore vascular vasomotion.",
          default: "HOMEOSATIS SWITCH COLLAPSE: Incomplete clearance of late-day performance chemical blocks causes your baseline sleep-promoting switch to drop hold metrics prematurely during lighter cycles. Do not rely on toxic sleeping pills that destroy natural architecture—switch to direct sublingual delivery to stabilize baseline purinergic holding parameters."
        },
        metabolic: {
          purinergic: "BIOENERGETIC RECEPTOR CRASH: Pre-bed glucose volatility forces a sudden midnight liver energy drop, crashing straight into a purinergic framework weakened by lingering daytime chemical compounds. Your body is starved for cellular energy. Solid pills fail because your digestion slows down at night; you must deploy direct sublingual nano-nutrients to feed your nervous system without triggering insulin traps.",
          metabolic: "CRITICAL GLYCOGEN STARVATION: Your liver's biological battery has run completely dry mid-sleep. Otak Anda mendeteksi neuroglikopenia dan memicu sinyal bahaya, memaksa lonjakan adrenalin dan kortisol secara masif untuk membongkar cadangan gula darurat. Ini adalah serangan panik biologis internal yang membuat Anda tidak bisa tidur lagi. Camilan malam hanya memperparah siklus insulin—penyerapan sublingual adalah satu-satunya cara menenangkan alarm ini dalam hitungan detik.",
          cortisol: "NOCTURNAL HYPOGLYCEMIA PANIC: A steep drop in overnight glucose forces a secondary stress axis cascade, triggering sudden tachycardia and survival anxiety at 3 AM. Your body believes it is dying of starvation. Standard sleeping pills are highly dangerous here as they mask the warning signs. You need an immediate sublingual solution to balance the endocrine system directly through the oral mucosa.",
          circadian: "METABOLIC CLOCK DESYNCHRONIZATION: Unstable overnight glucose curves conflict with your sircadian core body temperature drop, breaking sleep gate stability before morning REM. Your liver clock and brain clock are actively fighting each other. Resolving this requires rapid sublingual bio-nutrients that require zero digestive processing to instantly realign cellular metabolism.",
          glymphatic: "METABOLIC WASTE STAGNATION: The systemic stress response triggered by low midnight glucose completely halts the quiet, parasympathetic glymphatic purification cycle. Your brain tissues are swimming in uncleared metabolic debris. To unlock deep sleep recovery, you must deploy direct sublingual anti-inflammatory nano-compounds to flush cortical toxins without delay.",
          default: "SYSTEMIC BIOENERGETIC BURNOUT: Suboptimal glycogen storage capacity forces an emergency neuroglycopenia rescue sequence mid-sleep, executing a massive cortisol and adrenaline release that terminates rest. Break this exhausting cycle using direct sublingual delivery to supply instant stabilization to your neural circuits."
        },
        cortisol: {
          purinergic: "SYMPATHETIC OVERDRIVE AXIS: High baseline evening cortisol blocks standard purinergic calming loops, dropping your sensory arousal threshold at 3 AM. Your brain is hyper-vigilant. Traditional sedative pills will only leave you hungover tomorrow because they do not reduce cortisol. Your only solution is sublingual nano-delivery to actively block stress receptors on impact.",
          metabolic: "CORTISOL GLUCOSE DISPLACEMENT: Chronic overnight stress signaling forces immediate liver glucose releases, destabilizing your metabolic homeostasis mid-sleep and causing a reactive crash. You are trapped in an endocrine feedback loop. Break the circuit instantly by avoiding slow-acting pills and adopting direct sublingual delivery to inhibit HPA-axis hyper-activity.",
          cortisol: "CRITICAL HPA-AXIS LEAKAGE: Your subcortical survival networks run an altered circadian clock, shifting the morning cortisol peak backward into the 3 AM window and waking the conscious mind into an immediate fight-or-flight posture. Melatonin cannot stop this adrenal leak. You require targeted sublingual adaptogens that target the hypothalamic pathways within 15 seconds.",
          circadian: "NEUROENDOCRINE DISCOVERY BURNOUT: Elevated midnight cortisol actively desynchronizes your master sircadian clock, flattening natural melatonin secretion curves and creating a permanent state of biological jet-lag. Do not waste time with standard pills that cannot penetrate the blood-brain barrier effectively—deploy highly bioavailable sublingual nano-emulsions.",
          glymphatic: "VASCULAR CORTISOL BLOCKADE: Constant sympathetic stress signaling maintains high vascular resistance, preventing the deep delta-wave vasomotion needed for neural waste flush. Your brain is suffocating in its own waste overnight, causing intense jaw/neck stiffness. You must bypass the digestive tract entirely with sublingual nutrients to lower sympathetic tone instantly.",
          default: "SUBCORTICAL HYPER-VIGILANCE ACTIVATION: Your autonomic nervous system stays locked in a protective posture, triggering a sudden, alert awakening where the prefrontal cortex immediately processes daily worries. Stop drowning your liver in processing heavy sleep medications; use sublingual nano-drops to signal safety to your amygdala in seconds."
        },
        circadian: {
          purinergic: "MASTER PACEMAKER MISALIGNMENT: A fundamental misalignment between light cycles and modern lifestyle is compounded by poor natural adenosine buildup, causing the sleep gate to burst open at 3 AM. Standard over-the-counter sleep aids only treat the symptoms. Real clock synchronization requires instant-acting sublingual compounds that adjust receptor sensitivity on impact.",
          metabolic: "CIRCADIAN METABOLIC SPLIT: Peripheral liver and metabolic jam-clocks operate completely out of sync with your sleep window, causing a midnight energy crash alert. Your body doesn't know what time it is. Avoid heavy capsules that delay absorption—use direct sublingual delivery to provide zero-lag stabilization to your peripheral metabolic pathways.",
          cortisol: "PHASE-ADVANCED HORMONAL CASCADE: The suprachiasmatic nucleus signals the adrenal glands to fire the morning awakening hormone cascade hours before actual sunrise, waking you with artificial alertness. Heavy chemical bius only mask the damage. True realignment requires sublingual nano-delivery to calm the master pacemaker instantly.",
          circadian: "COMPLETE SCN DESYNCHRONIZATION: Internal biological markers are completely desynchronized from the environmental schedule, forcing an involuntary transition into wakefulness during early morning REM windows. You are living in a permanent internal time lag. Fix it at the cellular level with ultra-fast sublingual nano-drops designed to stabilize sircadian gates.",
          glymphatic: "TIMED TEMPERATURE GATE COLLAPSE: A mistimed core body temperature drop shortens the N3 slow-wave sleep windows required for deep metabolic waste drainage, waking you with a heavy, toxic head. Pill supplements take too long to absorb to save a broken sleep gate. You need direct sublingual delivery to instantly lower core vascular temperature parameters.",
          default: "CENTRAL BIOLOGICAL PACEMAKER SHIFT: Your internal master biological clock acts completely out of rhythm with your lifestyle schedule, lifting the overnight neural sleep lock way before dawn. Stop using heavy sleeping pills that compound circadian drift; transition to immediate sublingual absorption models now."
        },
        glymphatic: {
          purinergic: "INTERSTITIAL WASTE POOLING: Sluggish cerebral fluid drainage allows toxic metabolic byproducts to pool, lowering your sensory arousal threshold and waking you up over the minor chemical changes. Pill-based supplements cannot flush this debris; only zero-digestion sublingual nano-emulsions can penetrate the neural matrix to restore nocturnal cleaning.",
          metabolic: "GLYMPHATIC FACIAL STAGNATION: Accumulated cortical debris triggers localized micro-inflammations that compound overnight blood sugar stability failures, leading to puffy eyes and morning exhaustion. Break this toxic loop by using direct sublingual delivery to supply immediate anti-inflammatory bio-nutrients directly to your blood circulation.",
          cortisol: "TOXIC WASTE PHYSICAL STRESSOR: Accumulation of metabolic waste products in cortical tissues acts as an internal physical stressor, forcing a midnight panic adrenaline release to escape the discomfort. Sleeping pills will only lock the toxins in deeper. You must use direct sublingual nano-delivery to restore convective fluid vasomotion instantly.",
          circadian: "DELAYED CEREBRAL PURIFICATION LOOP: Uncleared neurochemical waste causes frequent, unexplained micro-arousals that break deep sleep continuity right as your body attempts to enter REM. Traditional tablets fail to survive stomach acid efficiently enough to fix this. Adopt direct sublingual nano-emulsions to clear the cellular path.",
          glymphatic: "CRANIAL ASTROGLIAL RETARDATION: Reduced convective flow through the aquaporin-4 (AQP4) network allows overnight metabolite accumulation, shifting the brain out of deep rest early and leaving you with a morning skull ache. Stop overloading your system with solid pills—use direct sublingual delivery to clear neuro-lymphatic pathways on contact.",
          default: "SLUGGISH CRANIAL ASTROGLIAL FLUID CLEARANCE: Reduced convective flow in the glymphatic network causes overnight waste pooling, causing your brain to shift prematurely out of deep rest states. Banish the morning brain fog forever by deploying zero-digestion sublingual delivery models immediately."
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