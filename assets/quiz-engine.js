/**
 * Sleep Science Hub — Enterprise-Grade Interactive Diagnostic Engine
 * Implements Multi-Selector Fallbacks, Graceful Degradation, and Deterministic Scoring.
 */
document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DUAL-SELECTOR LAYER & DEFENSIVE INITIALIZATION
  // ==========================================
  
  // Critical Elements: Jika salah satu elemen ini hilang, kuis wajib interupsi secara aman
  const startBtn = document.querySelector('.sleep-quiz-start-btn') || document.getElementById('start-quiz-btn');
  const quizIntro = document.querySelector('.sleep-quiz-intro') || document.getElementById('quiz-intro');
  const quizEngine = document.querySelector('.sleep-quiz-engine') || document.getElementById('quiz-engine');
  const quizQuestion = document.querySelector('.sleep-quiz-question') || document.getElementById('quiz-question');
  const quizOptions = document.querySelector('.sleep-quiz-options') || document.getElementById('quiz-options');
  const quizContainer = document.querySelector('.sleep-quiz-container') || document.getElementById('quiz-container');

  if (!startBtn || !quizIntro || !quizEngine || !quizQuestion || !quizOptions) {
    console.warn('Quiz Engine: Critical DOM elements missing. Execution halted gracefully to prevent runtime crash.');
    return;
  }

  // Non-Critical Elements (Poin 2.1): Kehilangannya tidak akan menghentikan fungsionalitas kuis
  const quizProgress = document.querySelector('.sleep-quiz-progress') || document.getElementById('quiz-progress');
  const quizCounter = document.querySelector('.sleep-quiz-counter') || document.getElementById('quiz-counter');

  // ==========================================
  // 2. CLINICAL TAXONOMY METRIC DATABASE
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

  // State Monitoring
  let currentQuestionIndex = 0;
  let scores = { cortisol: 0, adenosine: 0, orexin: 0, hypoglycemia: 0, glymphatic: 0 };

  // ==========================================
  // 3. INTERACTIVE STATE CONTROLLER
  // ==========================================
  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quizIntro.classList.add('hidden');
    quizIntro.style.display = 'none'; // Hardcoded protection bypasses invalid layout constraints
    quizEngine.classList.remove('hidden');
    quizEngine.style.display = 'block';
    renderQuestion();
  });

  // ==========================================
  // 4. MEMORY-SAFE RENDERING SYSTEM (Poin 2.2)
  // ==========================================
  function renderQuestion() {
    // Kebal Memory Leak: Menghapus children secara bersih tanpa innerHTML overwrite garbage collection
    if (typeof quizOptions.replaceChildren === 'function') {
      quizOptions.replaceChildren();
    } else {
      while (quizOptions.firstChild) {
        quizOptions.removeChild(quizOptions.firstChild);
      }
    }
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Update Teks Kuis (Safe Node Update)
    quizQuestion.textContent = currentQuestion.question;
    
    // Pembaruan Elemen Non-Critical Secara Defensif (Poin 2.1)
    if (quizCounter) {
      quizCounter.textContent = `QUESTION ${currentQuestionIndex + 1} OF ${quizQuestions.length}`;
    }
    
    if (quizProgress) {
      const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
      quizProgress.style.width = `${progressPercentage}%`;
    }

    // Pembuatan Komponen Opsi Jawaban Menggunakan DOM Node Allocation Murni
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      
      // Inject Premium Styling Rules
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

      // Event Listener Lifecycle
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
  // 5. DETERMINISTIC SCORING ENGINE (Poin 2.4)
  // ==========================================
  function evaluateQuizResults() {
    // Matriks Urutan Prioritas Deterministik Mengantisipasi Kasus Skor Seri/Kembar
    const tieBreakerPriority = ['cortisol', 'glymphatic', 'adenosine', 'orexin', 'hypoglycemia'];
    
    let dominantBlocker = tieBreakerPriority.reduce((currentMax, type) => {
      if (!currentMax) return type;
      if (scores[type] > scores[currentMax]) return type;
      // Jika nilai sama, kunci ke urutan hierarki array terdepan (Kortisol / Glimfatik)
      return currentMax;
    }, null);
    
    let title = "";
    let description = "";
    let targetLink = "";
    let linkText = "";

    switch(dominantBlocker) {
      case "cortisol":
        title = "Subcortical HPA-Axis Cortisol Surge";
        description = "Your midnight awakenings correlate closely with an inverted circadian cortisol curve. Sustained evening stress or light exposure triggers premature adrenal output, prompting central noradrenergic arrays to fire defensive wake signals during early sleep cycles.";
        targetLink = "blog/why-3am-wake.html";
        linkText = "Read Cortisol Inversion Matrix Protocol &rarr;";
        break;
      case "adenosine":
        title = "Purinergic Adenosine Receptor Saturation";
        description = "Your primary sleep boundary breakdown involves homeostatic sleep pressure fragmentation. Prolonged competitive blocks from late-afternoon caffeine trigger a structural up-regulation of sensitive receptors, altering the threshold of the sleep-wake flip-flop switch.";
        targetLink = "blog/adenosine-sleep-pressure.html";
        linkText = "Read Purinergic Sleep Pressure Guide &rarr;";
        break;
      case "orexin":
        title = "Hypothalamic Orexin System Instability";
        description = "Your configuration points toward a micro-circuit calibration failure inside the lateral hypothalamus. Uncoordinated late-night bursts of orexin neuropeptides directly excite monoaminergic alerting centers, overriding the sleep-promoting centers of the VLPO.";
        targetLink = "blog/orexin-wake-stabilizer.html";
        linkText = "Read Hypothalamic Flip-Flop Regulation Node &rarr;";
        break;
      case "glymphatic":
        title = "Astroglial Interstitial Fluid Stagnation";
        description = "Your baseline data maps closely to metabolic waste accumulation within extracellular matrix paths. Fragmented slow-wave sleep prevents astrocytic aquaporin-4 channels from performing convective clearance wave resets, creating local tissue irritation.";
        targetLink = "blog/glymphatic-system.html";
        linkText = "Read Glymphatic Fluid Clearance Path Paper &rarr;";
        break;
      default:
        title = "Nocturnal Glycogen-Glucose Hypoglycemia";
        description = "Your energetic curve points toward premature liver glycogen depletion. When circulating blood glucose levels drop at night, the central nervous system triggers a defensive surge of adrenaline to pull emergency sugar, causing sharp awakenings.";
        targetLink = "blog/why-3am-wake.html";
        linkText = "Read Liver Glycogen Maintenance Protocol &rarr;";
    }

    // Resolving Relative Paths Across Deep Directories
    const isSubfolder = window.location.pathname.includes('/blog/');
    const safePath = isSubfolder ? `../${targetLink}` : targetLink;

    // Rendering Final Content Node Without Ruining Event Target States
    quizEngine.style.padding = "1rem 0";
    
    // Create elements cleanly to prevent memory leak
    const resultWrapper = document.createElement('div');
    resultWrapper.style.textAlign = "center";
    
    resultWrapper.innerHTML = `
      <div style="display: inline-block; background-color: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.2); color: #38bdf8; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 1rem;">
        🔍 DIAGNOSTIC ISOLATION COMPLETE
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 0.75rem; letter-spacing: -0.025em;">${title}</h3>
      <p style="font-size: 0.75rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.5rem; text-align: left;">${description}</p>
      <a href="${safePath}" style="display: block; text-align: center; width: 100%; border-radius: 0.75rem; background-color: #0284c7; padding: 1rem; font-size: 0.75rem; font-weight: 700; color: #ffffff; text-decoration: none; transition: background-color 0.2s;">
        ${linkText}
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
