/**
 * Sleep Science Hub — Direct-Response Affiliate Inference Engine
 * Built-in Monetization Layer designed for maximum CTR and conversion optimization.
 */
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MONETIZATION CONFIG LAYER (TEMPAT PASTE LINK AFILIASI ANDA)
  // ==========================================
  const AFFILIATE_LINKS = {
    cortisol: "https://YOUR-AFFILIATE-LINK.com/cortisol-blocker-ashwagandha", // Contoh: Produk Cortisol Blocker / Ashwagandha Premium
    adenosine: "https://YOUR-AFFILIATE-LINK.com/magnesium-l-threonate",      // Contoh: Magnesium L-Threonate untuk saturasi reseptor deep sleep
    orexin: "https://YOUR-AFFILIATE-LINK.com/l-theanine-gaba-stabilizer",    // Contoh: Penstabil neuropeptida GABA / L-Theanine
    glymphatic: "https://YOUR-AFFILIATE-LINK.com/ergonomic-lateral-pillow",  // Contoh: Bantal Lateral Ergonomis / Kacamata Blue-Blocker
    hypoglycemia: "https://YOUR-AFFILIATE-LINK.com/blood-sugar-sleep-complex" // Contoh: Suplemen penstabil glukosa malam hari
  };

  // ==========================================
  // 2. DUAL-SELECTOR LAYER & DEFENSIVE INITIALIZATION
  // ==========================================
  const startBtn = document.querySelector('.sleep-quiz-start-btn') || document.getElementById('start-quiz-btn');
  const quizIntro = document.querySelector('.sleep-quiz-intro') || document.getElementById('quiz-intro');
  const quizEngine = document.querySelector('.sleep-quiz-engine') || document.getElementById('quiz-engine');
  const quizQuestion = document.querySelector('.sleep-quiz-question') || document.getElementById('quiz-question');
  const quizOptions = document.querySelector('.sleep-quiz-options') || document.getElementById('quiz-options');
  const quizContainer = document.querySelector('.sleep-quiz-container') || document.getElementById('quiz-container');

  if (!startBtn || !quizIntro || !quizEngine || !quizQuestion || !quizOptions) {
    console.warn('Quiz Engine: Critical DOM elements missing. Execution halted safely.');
    return;
  }

  const quizProgress = document.querySelector('.sleep-quiz-progress') || document.getElementById('quiz-progress');
  const quizCounter = document.querySelector('.sleep-quiz-counter') || document.getElementById('quiz-counter');

  // ==========================================
  // 3. CLINICAL TAXONOMY METRIC DATABASE
  // ==========================================
  const quizQuestions = [
    {
      question: "What best describes your physiological state upon snapping awake at 3 AM?",
      answers: [
        { text: "Wired, heart pounding, mind racing with immediate high alertness.", type: "cortisol" },
        { text: "Heavy brain fog and exhaustion, yet completely unable to drift back to sleep.", type: "adenosine" },
        { text: "Erratic switching between vivid light dreams and sudden micro-awakenings.", type: "orexin" },
        { text: "Mild sweating, intense physical coldness, or sudden night hunger pangs.", type: "hypoglycemia" }
      ]
    },
    {
      question: "How does evening or late-afternoon caffeine consumption impact your sleep maintenance?",
      answers: [
        { text: "I crash easily but snap awake wide awake exactly 4-5 hours later.", type: "adenosine" },
        { text: "It prevents initial sleep onset, compounding into a late-night alarm waking.", type: "cortisol" },
        { text: "It makes my entire sleep architecture feel shallow, full of tossing and turning.", type: "orexin" },
        { text: "I do not consume caffeine, yet my midnight awakenings remain highly persistent.", type: "glymphatic" }
      ]
    },
    {
      question: "What does your current evening routine and dietary timeline look like?",
      answers: [
        { text: "Consuming high-carbohydrate meals or heavy snacks less than 3 hours before sleep.", type: "hypoglycemia" },
        { text: "Working late under blue-light screens past 10 PM with high psychological stress.", type: "cortisol" },
        { text: "Erratic sleep schedule with variable bedtimes across the week.", type: "orexin" },
        { text: "Sleeping primarily on my back (supine) while feeling heavy morning head pressure.", type: "glymphatic" }
      ]
    },
    {
      question: "Describe your deep slow-wave sleep consistency during the first 3 hours of the night.",
      answers: [
        { text: "Extremely fragile; the slightest environmental sound or temperature shift wakes me.", type: "orexin" },
        { text: "Perfect initial depth, but cuts off abruptly like a timer around the 3-hour mark.", type: "cortisol" },
        { text: "I wake up feeling physically unrecuperated, stiff, or with mild systemic tension.", type: "glymphatic" },
        { text: "Variable; some nights heavy, other nights marked by shallow tossing.", type: "adenosine" }
      ]
    },
    {
      question: "Which of these experimental recovery protocols provides the most immediate relief?",
      answers: [
        { text: "Cooling down the room, standing up, or performing slow diagonals.", type: "cortisol" },
        { text: "Shifting to a strict side-sleeping (lateral) posture and expanding evening fasts.", type: "glymphatic" },
        { text: "Enforcing a firm 10-hour caffeine cutoff window before my targeted bedtime.", type: "adenosine" },
        { text: "Consuming a small sip of water or stabilizing my evening glucose baseline.", type: "hypoglycemia" }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let scores = { cortisol: 0, adenosine: 0, orexin: 0, hypoglycemia: 0, glymphatic: 0 };

  // Trigger Event Kuis
  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quizIntro.classList.add('hidden');
    quizIntro.style.display = 'none';
    quizEngine.classList.remove('hidden');
    quizEngine.style.display = 'block';
    renderQuestion();
  });

  // Memory-Safe Rendering Loop
  function renderQuestion() {
    if (typeof quizOptions.replaceChildren === 'function') {
      quizOptions.replaceChildren();
    } else {
      while (quizOptions.firstChild) {
        quizOptions.removeChild(quizOptions.firstChild);
      }
    }
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;
    
    if (quizCounter) {
      quizCounter.textContent = `QUESTION ${currentQuestionIndex + 1} OF ${quizQuestions.length}`;
    }
    
    if (quizProgress) {
      const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
      quizProgress.style.width = `${progressPercentage}%`;
    }

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.className = "w-full text-left rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs font-medium text-slate-200 transition-all hover:border-sky-500 hover:bg-slate-800/80 hover:text-white active:scale-[0.99]";
      button.style.width = "100%";
      button.style.textAlign = "left";
      button.style.borderRadius = "0.75rem";
      button.style.border = "1px solid #1e293b";
      button.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
      button.style.padding = "1rem";
      button.style.fontSize = "0.75rem";
      button.style.color = "#cbd5e1";
      button.style.cursor = "pointer";
      button.style.marginBottom = "0.75rem";
      button.style.display = "block";

      button.addEventListener('click', () => {
        scores[answer.type]++;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
          renderQuestion();
        } else {
          evaluateQuizResults();
        }
      });
      
      quizOptions.appendChild(button);
    });
  }

  // ==========================================
  // 4. MONETIZATION INFERENCE EVALUATION ENGINE
  // ==========================================
  function evaluateQuizResults() {
    const tieBreakerPriority = ['cortisol', 'glymphatic', 'adenosine', 'orexin', 'hypoglycemia'];
    
    let dominantBlocker = tieBreakerPriority.reduce((currentMax, type) => {
      if (!currentMax) return type;
      if (scores[type] > scores[currentMax]) return type;
      return currentMax;
    }, null);
    
    let headline = "";
    let pitchDetails = "";
    let ctaText = "";
    // Menarik link langsung dari Monetization Config Layer di atas secara real-time
    let directAffiliateUrl = AFFILIKS_REDIRECT_GATEWAY(dominantBlocker);

    function AFFILIKS_REDIRECT_GATEWAY(blocker) {
      return AFFILIATE_LINKS[blocker] || AFFILIATE_LINKS['hypoglycemia'];
    }

    // Copywriting Agresif Direct-Response untuk Memaksimalkan Klik Pembelian Produk
    switch(dominantBlocker) {
      case "cortisol":
        headline = "Adrenal Stress Overload Identified";
        pitchDetails = "Your 3 AM waking is driven by a critical neuroendocrine inversion. Your body is prematurely flooding your subcortical system with high-stress cortisol spikes. To block these midnight adrenaline alerts, clinical research recommends immediate supplementation with double-standardized Ashwagandha KSM-66 and Phosphatidylserine to force your adrenal axis to down-regulate before sleep.";
        ctaText = "Get the Verified Cortisol-Blocker Solution &rarr;";
        break;
      case "adenosine":
        headline = "Purinergic Receptor Saturation Discovered";
        pitchDetails = "Your homeostatic sleep drive has collapsed due to a severe purinergic receptor up-regulation, highly common in individuals consuming caffeine past noon. Natural adenosine is locked out of its gates, breaking your sleep architecture. To bypass this blockade and maintain heavy slow-wave cycles all night, clinical science requires high-absorption Magnesium L-Threonate to safely cross the blood-brain barrier.";
        ctaText = "Secure High-Absorption Magnesium L-Threonate &rarr;";
        break;
      case "orexin":
        headline = "Hypothalamic Wake-Switch Instability";
        pitchDetails = "Your results confirm a micro-circuit calibration failure inside your lateral hypothalamus. Your brain's orexin system is misfiring, releasing unwanted wake-active peptides that completely override your sleep cycles. To manually lock this switch into a stable sleep state, clinical taxonomy points to the immediate usage of cross-linked GABA and pure L-Theanine compounds.";
        ctaText = "Claim the Hypothalamic Stabilizer Protocol &rarr;";
        break;
      case "glymphatic":
        headline = "Metabolic Cerebrospinal Waste Stagnation";
        pitchDetails = "Your diagnostic vectors point directly to fluid pooling inside your extracellular brain tissue. Because your slow-wave cycles are shallow, your astrocytic aquaporin-4 channels cannot clear toxic protein debris, triggering a defensive survival awakening. Along with immediate side-sleeping, clinical parameters require specialized deep sleep botanical formulations to maximize convective fluid currents.";
        ctaText = "Get the Clinical Glymphatic Reset Complex &rarr;";
        break;
      default:
        headline = "Nocturnal Glycogen Crisis Detected";
        pitchDetails = "Your liver is running out of active glycogen stores during the third sleep cycle, triggering a severe metabolic drop. To protect your neurons from a perceived starvation emergency, your autonomic system triggers a rapid adrenaline surge that snaps you wide awake. To insulate your midnight glucose framework, you must implement a calibrated slow-release evening glucose stabilizer.";
        ctaText = "Secure the Slow-Release Glucose Complex &rarr;";
    }

    // Clear and allocate memory tree cleanly
    const resultWrapper = document.createElement('div');
    resultWrapper.style.textAlign = "center";
    
    // Injecting Conversion Optimized UI Element Nodes
    resultWrapper.innerHTML = `
      <div style="display: inline-block; background-color: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #f87171; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 1rem;">
        🚨 CRITICAL SLEEP BLOCKER ISOLATED
      </div>
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #ffffff; margin-bottom: 0.75rem; letter-spacing: -0.025em;">${headline}</h3>
      <p style="font-size: 0.78rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.5rem; text-align: left;">${pitchDetails}</p>
      <a href="${directAffiliateUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; width: 100%; border-radius: 0.75rem; background-color: #22c55e; padding: 1.1rem; font-size: 0.8rem; font-weight: 800; color: #ffffff; text-decoration: none; box-shadow: 0 10px 15px -3px rgba(34,197,94,0.3); transition: all 0.2s;" onmouseover="this.style.backgroundColor='#16a34a'" onmouseout="this.style.backgroundColor='#22c55e'">
        ${ctaText}
      </a>
    `;

    if (typeof quizEngine.replaceChildren === 'function') {
      quizEngine.replaceChildren(resultWrapper);
    } else {
      quizEngine.innerHTML = '';
      quizEngine.appendChild(resultWrapper);
    }
  }
});
