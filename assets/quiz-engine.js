const questions = [
      {
        q: "What is your primary sleep disruption pattern?",
        options: [
          { t: "I lay awake for hours with a racing, overthinking mind.", cat: "cortisol" },
          { t: "I fall asleep easily but wake up wide awake around 3 AM.", cat: "glymphatic" },
          { t: "I cannot feel tired until long after midnight or 2 AM.", cat: "circadian" }
        ]
      },
      {
        q: "How do you manage your daily caffeine consumption?",
        options: [
          { t: "I drink coffee within 30 minutes of waking and crash hard by 2 PM.", cat: "adenosine" },
          { t: "I drink caffeine late in the afternoon/evening to survive the day.", cat: "circadian" },
          { t: "I rarely consume caffeine but still suffer from waking up exhausted.", cat: "glymphatic" }
        ]
      },
      {
        q: "What does your environment look like 60 minutes before bed?",
        options: [
          { t: "I am actively scrolling on my phone, tablet, or watching television.", cat: "circadian" },
          { t: "I am finishing work, replying to emails under bright overhead lights.", cat: "cortisol" },
          { t: "I dim the ambient lights but internal thoughts keep me alert.", cat: "cortisol" }
        ]
      },
      {
        q: "When does your physiological fatigue hit you the hardest?",
        options: [
          { t: "Right after lunch (1 PM - 3 PM) like a heavy physical wall.", cat: "adenosine" },
          { t: "I am sluggish all day but get a sudden burst of energy past 10 PM.", cat: "circadian" },
          { t: "I feel systematically heavy and brain-fogged immediately upon waking.", cat: "glymphatic" }
        ]
      },
      {
        q: "How does your body physically feel when you awaken prematurely at night?",
        options: [
          { t: "My heart is pounding slightly, and I feel completely wired or anxious.", cat: "cortisol" },
          { t: "I feel physically warm, groggy, or experience a mild tension headache.", cat: "glymphatic" },
          { t: "I feel exhausted but my eyes refuse to close back down in the dark.", cat: "rem" }
        ]
      }
    ];

    let currentIdx = 0;
    let scores = { cortisol: 0, glymphatic: 0, circadian: 0, adenosine: 0, rem: 0 };

    function startQuiz() {
      document.getElementById('quiz-intro').classList.add('hidden');
      document.getElementById('quiz-engine').classList.remove('hidden');
      renderQuestion();
    }

    function renderQuestion() {
      if (currentIdx >= questions.length) {
        evaluateAndRedirect();
        return;
      }
      
      const qObj = questions[currentIdx];
      document.getElementById('quiz-counter').innerText = `QUESTION ${currentIdx + 1} OF ${questions.length}`;
      document.getElementById('quiz-question').innerText = qObj.q;

      const pct = ((currentIdx + 1) / questions.length) * 100;
      document.getElementById('quiz-progress').style.width = `${pct}%`;

      const container = document.getElementById('quiz-options');
      container.innerHTML = '';

      qObj.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left rounded-xl bg-slate-800 border border-slate-700/60 p-4 text-sm font-medium text-slate-200 transition hover:bg-slate-700/60 hover:border-brand active:scale-[0.99] block focus:outline-none";
        btn.innerText = opt.t;
        btn.onclick = () => {
          scores[opt.cat] = (scores[opt.cat] || 0) + 1;
          currentIdx++;
          renderQuestion();
        };
        container.appendChild(btn);
      });
    }

    function evaluateAndRedirect() {
      const container = document.getElementById('quiz-container');
      container.innerHTML = `
        <div class="text-center py-6">
          <svg class="animate-spin h-8 w-8 text-brand mx-auto mb-4" fill="none" viewBox="0 0 24 24" style="color: #0284c7;"><circle class="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <h3 class="text-lg font-bold text-white">Analyzing Neurochemical Profiles...</h3>
        </div>
      `;

      let highestCat = 'cortisol';
      let maxScore = -1;
      for (const cat in scores) {
        if (scores[cat] > maxScore) {
          maxScore = scores[cat];
          highestCat = cat;
        }
      }

      const res = resultsMap[highestCat];

      setTimeout(() => {
        container.innerHTML = `
          <div class="text-left text-slate-200 space-y-5 p-1 animate-fadeIn">
            <div class="inline-flex items-center gap-2 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-brand" style="color: #38bdf8; background-color: rgba(56,189,248,0.1);">
               ⚡️ MEDICAL AUDIT RESULTS
            </div>
            <h3 class="text-base font-bold text-white tracking-tight leading-snug">${res.title}</h3>
            <p class="text-[12px] text-slate-300 leading-relaxed font-normal">${res.text}</p>
            <div class="pt-4">
              <a href="${res.link}" target="_blank" rel="noopener noreferrer" class="block w-full text-center rounded-xl text-white font-bold text-[13px] px-4 py-3.5 shadow-xl transition-all hover:bg-sky-500" style="background-color: #0284c7; text-decoration: none; display: block; box-sizing: border-box;">
                End My 3 AM Awakenings Now →
              </a>
            </div>
          </div>
        `;
      }, 1200);
    }