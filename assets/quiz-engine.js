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

  // FIX: Dynamic math equation based on target date instructions (150 base + 50 per day)
  if (auditCountElement) {
    const baseAudits = 150;
    const startDate = new Date("2026-06-20");
    const today = new Date();
    const timeDiff = Math.abs(today - startDate);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const dynamicAudits = baseAudits + (daysDiff * 50);
    auditCountElement.textContent = dynamicAudits.toLocaleString("en-US");
  }

  const questions = [
    {
      q: "What time do you usually snap wide awake?",
      o: ["Around 1 AM - 2 AM", "Exactly around 3 AM sharp", "Lighter sleep around 4 AM - 5 AM", "It changes every single night"]
    },
    {
      q: "How does your body feel the instant you open your eyes?",
      o: ["Heart is pounding and mind is instantly racing", "Sweaty, shaky, or feeling slightly hungry", "Tired but my brain just won't turn off", "Stiff muscles, gasping, or snoring patterns"]
    },
    {
      q: "What is your typical relationship with afternoon caffeine?",
      o: ["I drink coffee or energy drinks after 2 PM", "Only morning caffeine, but I drink 3+ cups", "Pre-workout or soda drinks late in the day", "I rarely touch caffeine at all"]
    },
    {
      q: "What do your eating habits look like before bed?",
      o: ["I love sweet desserts or heavy carbs late at night", "A high-protein dinner right before turning in", "I usually sleep on a completely empty stomach", "No specific routine, just random snacking"]
    }
  ];

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
      showQuizResults();
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
      optionsWrapper.appendChild(button);
    });
  }

  optionsWrapper.addEventListener("click", function (e) {
    const targetButton = e.target.closest("button");
    if (!targetButton) return;
    currentStep++;
    renderQuestion();
  });

  function showQuizResults() {
    counterText.textContent = "DIAGNOSTIC ANALYSIS COMPLETE";
    questionText.textContent = "Your Custom Sleep Maintenance Breakdown Is Ready";
    optionsWrapper.textContent = "";

    const infoBlock = document.createElement("p");
    infoBlock.className = "text-xs text-slate-400 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800";
    infoBlock.style.padding = "1rem";
    infoBlock.style.backgroundColor = "#090f1e";
    infoBlock.style.border = "1px solid #1e293b";
    infoBlock.style.borderRadius = "0.75rem";
    infoBlock.textContent = "Based on your selections, your early arousals suggest an interaction between everyday environmental cues and internal chemical timing mechanisms. Please scroll down to access the corresponding targeted adjustment protocols.";
    
    optionsWrapper.appendChild(infoBlock);
  }
});
