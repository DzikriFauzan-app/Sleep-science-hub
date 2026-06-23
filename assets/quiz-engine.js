/**
 * Sleep Science Hub — Premium Native Quiz Engine
 * Robust Defensive DOM Architecture to prevent cross-page runtime crashes.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Pemuatan Elemen Secara Defensif (Mencegah Error Null di Halaman Berbeda)
  const startBtn = document.getElementById('start-quiz-btn');
  const quizIntro = document.getElementById('quiz-intro');
  const quizEngine = document.getElementById('quiz-engine');
  const quizProgress = document.getElementById('quiz-progress');
  const quizCounter = document.getElementById('quiz-counter');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizContainer = document.getElementById('quiz-container');

  // Hentikan eksekusi script jika elemen kuis tidak ditemukan di halaman ini
  if (!startBtn || !quizIntro || !quizEngine || !quizProgress || !quizCounter || !quizQuestion || !quizOptions || !quizContainer) {
    console.warn('Quiz component elements not fully found on this page layout. Initialization safely bypassed.');
    return;
  }

  // 2. Bank Data Soal Klinis Berbasis Parameter Medis
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
        { text: "Cooling down the room, standing up, or performing slow diaphragmatic breathing.", type: "cortisol" },
        { text: "Shifting to a strict side-sleeping (lateral) posture and expanding evening fasts.", type: "glymphatic" },
        { text: "Enforcing a firm 10-hour caffeine cutoff window before my targeted bedtime.", type: "adenosine" },
        { text: "Consuming a small sip of water or stabilizing my evening glucose baseline.", type: "hypoglycemia" }
      ]
    }
  ];

  // 3. State Management Kuis
  let currentQuestionIndex = 0;
  let scores = { cortisol: 0, adenosine: 0, orexin: 0, hypoglycemia: 0, glymphatic: 0 };

  // 4. Trigger Event Inisiasi Kuis
  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quizIntro.classList.add('hidden');
    // Menghapus inline-style bawaan Tailwind jika ada yang menginterupsi kelas hidden
    quizIntro.style.display = 'none';
    quizEngine.classList.remove('hidden');
    quizEngine.style.display = 'block';
    renderQuestion();
  });

  // 5. Fungsi Render Pertanyaan Dinamis
  function renderQuestion() {
    // Bersihkan opsi jawaban dari pertanyaan sebelumnya
    quizOptions.innerHTML = '';
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Update Indikator Teks Konteks Kuis
    quizCounter.textContent = `QUESTION ${currentQuestionIndex + 1} OF ${quizQuestions.length}`;
    quizQuestion.textContent = currentQuestion.question;
    
    // Update Visual Progress Bar Indikator Kedalaman Audit
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    quizProgress.style.width = `${progressPercentage}%`;

    // Bangun Tombol Pilihan Jawaban Secara Dinamis Dengan Desain Premium Terisolasi
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      
      // Suntikkan kelas Tailwind dan Fallback Inline Style demi kebal dari proteksi CSP browser
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

      // Event Handler Seleksi Jawaban
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

  // 6. Alur Evaluasi dan Rendering Hasil Diagnostik Medis Lokal
  function evaluateQuizResults() {
    // Cari parameter stress blocker dengan skor tertinggi
    let dominantBlocker = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    let title = "";
    let description = "";
    let targetLink = "";
    let linkText = "";

    switch(dominantBlocker) {
      case "cortisol":
        title = "Subcortical HPA-Axis Cortisol Surge";
        description = "Your midnight awakenings are heavily correlated with an inverted circadian cortisol curve. Evening psychogenic stress or artificial light exposure triggers premature adrenal activity, forcing the locus coeruleus into active noradrenergic output during late-night sleep cycles.";
        targetLink = "blog/why-3am-wake.html";
        linkText = "Read Cortisol Inversion Matrix Protocol &rarr;";
        break;
      case "adenosine":
        title = "Purinergic Adenosine Receptor Saturation";
        description = "Your primary sleep barrier involves homeostatic sleep pressure fragmentation. Prolonged chemical blockades from late-afternoon xanthine or caffeine use cause a compensatory up-regulation of sensitive receptors, destabilizing your sleep-wake flip-flop switch.";
        targetLink = "blog/adenosine-sleep-pressure.html";
        linkText = "Read Purinergic Sleep Pressure Guide &rarr;";
        break;
      case "orexin":
        title = "Hypothalamic Orexin System Instability";
        description = "Your results indicate a micro-circuit calibration failure inside the lateral hypothalamus. Uncoordinated nocturnal bursts of orexin peptides directly excite monoaminergic arousal centers, overriding the sleep-promoting centers of the VLPO.";
        targetLink = "blog/orexin-wake-stabilizer.html";
        linkText = "Read Hypothalamic Flip-Flop Regulation Node &rarr;";
        break;
      case "glymphatic":
        title = "Astroglial Interstitial Fluid Stagnation";
        description = "Your baseline pattern tracks closely with metabolic solute waste accumulation. Missing crucial deep slow-wave NREM windows prevents astrocytic aquaporin-4 channels from flushing brain matrix debris, creating localized structural irritation.";
        targetLink = "blog/glymphatic-system.html";
        linkText = "Read Glymphatic Fluid Clearance Path Paper &rarr;";
        break;
      default:
        title = "Nocturnal Glycogen-Glucose Hypoglycemia";
        description = "Your metabolic hourglass points toward premature liver glycogen depletion. When circulating blood glucose drops at night, the brain triggers a defensive surge of adrenaline to pull emergency sugar reserves, snapping you wide awake.";
        targetLink = "blog/why-3am-wake.html";
        linkText = "Read Liver Glycogen Maintenance Protocol &rarr;";
    }

    // Deteksi kedalaman folder relatif untuk menjamin kecocokan path internal navigasi link
    const isSubfolder = window.location.pathname.includes('/blog/');
    const safePath = isSubfolder ? `../${targetLink}` : targetLink;

    // Render Hasil Diagnostik Akhir Secara Anggun Ke Dalam Kontainer Kuis Gelap
    quizEngine.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="display: inline-block; background-color: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.2); color: #38bdf8; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 1rem;">
          🔍 DIAGNOSTIC ISOLATION COMPLETE
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 0.75rem; tracking: -0.025em;">${title}</h3>
        <p style="font-size: 0.75rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.5rem; text-align: left;">${description}</p>
        <a href="${safePath}" style="display: block; text-align: center; width: 100%; border-radius: 0.75rem; background-color: #0284c7; padding: 1rem; font-size: 0.75rem; font-weight: 700; color: #ffffff; text-decoration: none; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#0077b6'" onmouseout="this.style.backgroundColor='#0284c7'">
          ${linkText}
        </a>
      </div>
    `;
  }
});
