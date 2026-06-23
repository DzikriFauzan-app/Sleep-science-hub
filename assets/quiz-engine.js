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
    
    // Update text metadata cleanly without innerHTML hazards
    counterText.textContent = `QUESTION ${currentStep + 1} OF ${questions.length}`;
    questionText.textContent = currentData.q;
    
    // Manage progress metrics
    const progressPercent = ((currentStep + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Flush options safely
    optionsWrapper.textContent = "";

    // Build items with native DOM elements to deny DOM injection vectors
    currentData.o.forEach((optionText, idx) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "w-full text-left rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text.xs font-medium text-slate-300 transition hover:border-sky-500/50 hover:bg-slate-900 hover:text-white";
      button.textContent = optionText;
      button.setAttribute("data-index", idx);
      optionsWrapper.appendChild(button);
    });
  }

  // Optimized event delegation to block memory leaks
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
    infoBlock.textContent = "Based on your selections, your early arousals suggest an interaction between everyday environmental cues and internal chemical timing mechanisms. Please scroll down to access the corresponding targeted adjustment protocols.";
    
    optionsWrapper.appendChild(infoBlock);
  }
});
