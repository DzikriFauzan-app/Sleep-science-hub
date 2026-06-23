/**
 * Sleep Science Hub — Production-Grade Affiliate Funnel Engine
 * Built-in Hydration Protection, Tailwind Specificity Override, and High-Converting YMYL Copy.
 */
(() => {
  function initializeAffiliateQuizEngine() {
    // ==========================================
    // 1. MONETIZATION CONFIG LAYER (VSL DIRECT-RESPONSE)
    // ==========================================
    const BASE_AFFILIATE_URL = "https://getyusleep.com/vsl/?affiliate=butetnadia";
    
    const AFFILIATE_LINKS = {
      cortisol: `${BASE_AFFILIATE_URL}&tid=cortisol`,
      glymphatic: `${BASE_AFFILIATE_URL}&tid=glymphatic`,
      adenosine: `${BASE_AFFILIATE_URL}&tid=adenosine`,
      orexin: `${BASE_AFFILIATE_URL}&tid=orexin`,
      hypoglycemia: `${BASE_AFFILIATE_URL}&tid=hypoglycemia`
    };

    // ==========================================
    // 2. DOM DEFENSIVE INITIALIZATION LAYER
    // ==========================================
    const startBtn = document.querySelector('.sleep-quiz-start-btn, #start-quiz-btn');
    const quizIntro = document.querySelector('.sleep-quiz-intro, #quiz-intro');
    const quizEngine = document.querySelector('.sleep-quiz-engine, #quiz-engine');
    const quizQuestion = document.querySelector('.sleep-quiz-question, #quiz-question');
    const quizOptions = document.querySelector('.sleep-quiz-options, #quiz-options');

    // Fail Safely: Jika halaman tidak memiliki modul kuis, matikan eksekusi secara damai tanpa merusak JS global
    if (!startBtn || !quizIntro || !quizEngine || !quizQuestion || !quizOptions) {
      console.warn('Quiz Engine: Required DOM nodes not found on this page structure. Initialization bypassed.');
      return;
    }

    const quizProgress = document.querySelector('.sleep-quiz-progress, #quiz-progress');
    const quizCounter = document.querySelector('.sleep-quiz-counter, #quiz-counter');

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

    // ==========================================
    // 4. LIFECYCLE CONTROLLER (ANTI-TAILWIND CONFLICT)
    // ==========================================
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Menggunakan setProperty 'important' untuk menghancurkan kelas utilitas .hidden milik Tailwind
      quizIntro.classList.add('hidden');
      quizIntro.style.setProperty('display', 'none', 'important');
      
      quizEngine.classList.remove('hidden');
      quizEngine.style.setProperty('display', 'block', 'important');
      
      renderQuestion();
    });

    // ==========================================
    // 5. MEMORY-SAFE DOM RE-RENDER LOOPS
    // ==========================================
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
        
        // Menggabungkan kelas premium Tailwind dengan jaminan visual inline CSS fallback
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
    // 6. HIGH-CONVERTING INFERENCE RESOLUTION
    // ==========================================
    function evaluateQuizResults() {
      const maxScore = Math.max(...Object.values(scores));
      const candidates = Object.keys(scores).filter(key => scores[key] === maxScore);
      const priorityOrder = ['cortisol', 'glymphatic', 'adenosine', 'orexin', 'hypoglycemia'];
      
      let dominantBlocker = priorityOrder.find(type => candidates.includes(type));
      
      if (maxScore === 0) {
        dominantBlocker = 'cortisol'; 
      }

      const directAffiliateUrl = AFFILIATE_LINKS[dominantBlocker] || `${BASE_AFFILIATE_URL}&tid=fallback`;
      
      let headlineText = "";
      let pitchText = "";
      let buttonText = "";

      // Copywriting Direct-Response Premium yang Mengarahkan Pembaca Ke Keputusan Pembelian VSL
      switch(dominantBlocker) {
        case "cortisol":
          headlineText = "Circadian Cortisol Shift Pattern Identified";
          pitchText = "Your answers suggest a midnight sleep profile that correlates closely with an early spike in nocturnal cortisol secretion. Instead of a smooth transition between sleep cycles, your system experience suggests a premature stress-axis response. Calibrated lifestyle and metabolic optimization can support continuous circadian depth.";
          buttonText = "Discover the Calibrated Circadian Reset Solution &rarr;";
          break;
        case "adenosine":
          headlineText = "Purinergic Sleep Drive Fragmentation Detected";
          pitchText = "Your responses match a pattern consistent with homeostatic sleep pressure baseline disruptions, a sequence common with late-day xanthine or caffeine receptor competitive antagonism. When receptors clear, the sudden saturation shift destabilizes sleep architecture. Targeted baseline support can stabilize your overnight tracking boundaries.";
          buttonText = "Secure High-Absorption Sleep Pressure Support &rarr;";
          break;
        case "orexin":
          headlineText = "Hypothalamic Wake-Switch Instability Vector";
          pitchText = "Your results suggest a profile associated with temporary switch-state instability inside your central nervous system hubs. Mismatched late-night firing patterns can allow wake-active signaling centers to activate prematurely, overriding sleep centers. Nutritional optimization can help maintain proper chemical balance.";
          buttonText = "Claim the Hypothalamic Boundary Protocol &rarr;";
          break;
        case "glymphatic":
          headlineText = "Metabolic Solute Waste Stagnation Profile";
          pitchText = "Your diagnostic responses correlate with metabolic byproduct accumulation within extracellular tracking matrices. Insufficient early slow-wave duration can prevent proper convective fluid resets, causing minor localized tissue irritation that prompts a survival awakening. Calibrated optimization can help reset clearance currents.";
          buttonText = "Get the Clinical Fluid Clearance Reset Complex &rarr;";
          break;
        default:
          headlineText = "Nocturnal Glucose Flux Inversion Pattern";
          pitchText = "Your metabolic hourglass points toward a premature reduction in liver glycogen reserves during late-night sleep phases. To protect neural performance from a perceived drop in circulation, your system triggers a counter-regulatory response that prompts full alertness. Glucose-axis protection strategies support stable sleep maintenance.";
          buttonText = "Secure the Slow-Release Glucose Complex &rarr;";
      }

      // 100% Hardened DOM Tree Assembly (Zero innerHTML untuk Mencegah XSS)
      const resultWrapper = document.createElement('div');
      resultWrapper.style.textAlign = "center";

      const alertBadge = document.createElement('div');
      alertBadge.textContent = "🚨 SLEEP PROFILE INFERENCE COMPLETE";
      alertBadge.style.display = "inline-block";
      alertBadge.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
      alertBadge.style.border = "1px solid rgba(239, 68, 68, 0.2)";
      alertBadge.style.color = "#f87171";
      alertBadge.style.fontSize = "10px";
      alertBadge.style.fontWeight = "700";
      alertBadge.style.letterSpacing = "0.05em";
      alertBadge.style.textTransform = "uppercase";
      alertBadge.style.padding = "0.25rem 0.75rem";
      alertBadge.style.borderRadius = "9999px";
      alertBadge.style.marginBottom = "1rem";

      const heading = document.createElement('h3');
      heading.textContent = headlineText;
      heading.style.fontSize = "1.35rem";
      heading.style.fontWeight = "800";
      heading.style.color = "#ffffff";
      heading.style.marginBottom = "0.75rem";
      heading.style.letterSpacing = "-0.025em";

      const bodyParagraph = document.createElement('p');
      bodyParagraph.textContent = pitchText;
      bodyParagraph.style.fontSize = "0.78rem";
      bodyParagraph.style.color = "#94a3b8";
      bodyParagraph.style.lineHeight = "1.6";
      bodyParagraph.style.marginBottom = "1.5rem";
      bodyParagraph.style.textAlign = "left";

      const affiliateAnchor = document.createElement('a');
      affiliateAnchor.href = directAffiliateUrl;
      affiliateAnchor.target = "_blank";
      affiliateAnchor.rel = "noopener noreferrer";
      affiliateAnchor.textContent = buttonText;
      affiliateAnchor.style.display = "block";
      affiliateAnchor.style.textAlign = "center";
      affiliateAnchor.style.width = "100%";
      affiliateAnchor.style.borderRadius = "0.75rem";
      affiliateAnchor.style.backgroundColor = "#22c55e";
      affiliateAnchor.style.padding = "1.1rem";
      affiliateAnchor.style.fontSize = "0.8rem";
      affiliateAnchor.style.fontWeight = "800";
      affiliateAnchor.style.color = "#ffffff";
      affiliateAnchor.style.textDecoration = "none";
      affiliateAnchor.style.boxShadow = "0 10px 15px -3px rgba(34, 197, 94, 0.3)";
      affiliateAnchor.style.transition = "all 0.2s";
      
      affiliateAnchor.onmouseover = () => { affiliateAnchor.style.backgroundColor = '#16a34a'; };
      affiliateAnchor.onmouseout = () => { affiliateAnchor.style.backgroundColor = '#22c55e'; };

      resultWrapper.appendChild(alertBadge);
      resultWrapper.appendChild(heading);
      resultWrapper.appendChild(bodyParagraph);
      resultWrapper.appendChild(affiliateAnchor);

      if (typeof quizEngine.replaceChildren === 'function') {
        quizEngine.replaceChildren(resultWrapper);
      } else {
        quizEngine.innerHTML = '';
        quizEngine.appendChild(resultWrapper);
      }
    }
  }

  // ==========================================
  // 7. HYDRATION SAFE EXECUTION CONTROL
  // ==========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAffiliateQuizEngine);
  } else {
    initializeAffiliateQuizEngine();
  }
})();
