document.addEventListener("DOMContentLoaded",function(){
const c=document.querySelector(".sleep-quiz-container");if(!c)return;
const intro=c.querySelector(".sleep-quiz-intro"),engine=c.querySelector(".sleep-quiz-engine"),start=c.querySelector(".sleep-quiz-start-btn"),bar=c.querySelector(".sleep-quiz-progress"),counter=c.querySelector(".sleep-quiz-counter"),question=c.querySelector(".sleep-quiz-question"),opts=c.querySelector(".sleep-quiz-options");
const questions=[
["When you wake during the night, what happens first?",["My mind becomes suddenly alert or starts racing.","I feel physically restless, tense, hot, or uncomfortable.","I feel calm but fully awake, as if it were morning.","Something around me wakes me: light, noise, temperature, or another disturbance.","I am not sure."]],
["How consistent is your sleep and wake schedule?",["Very consistent, including weekends.","Mostly consistent, with occasional changes.","It changes substantially from day to day.","I work shifts or have an irregular schedule.","My schedule is consistent, but I still wake repeatedly."]],
["Which is most common in your afternoon or evening?",["Caffeine later in the day.","Alcohol close to bedtime.","A large or late meal.","Usually none of these.","It varies a lot from night to night."]],
["What happens when you try to fall back asleep?",["My thoughts keep me awake.","I feel physically alert or tense.","I am sleepy but my schedule feels out of sync.","I usually fall back asleep quickly.","It depends on the night."]],
["Which factor is most likely to interrupt your sleep?",["Stress, worry, or mental activity.","Light, noise, temperature, pets, or another environmental factor.","Caffeine, alcohol, food, or an irregular routine.","An inconsistent bedtime or wake time.","I cannot identify one."]],
["How often does the same pattern happen?",["Almost every night.","Several nights a week.","Mostly during stressful periods.","Mostly when my schedule changes.","Only occasionally."]],
["What would you most like to understand?",["Why I wake up feeling mentally switched on.","Whether my sleep timing may be part of the pattern.","Whether daily habits could affect sleep continuity.","Whether my bedroom or surroundings may contribute.","Why the pattern changes from night to night."]]
];
const tracks=["arousal","timing","habits","environment","mixed"];
const names={arousal:"Nighttime Arousal Pattern",timing:"Sleep Timing Pattern",habits:"Sleep Pressure & Habit Pattern",environment:"Environmental Disruption Pattern",mixed:"Mixed / Variable Sleep Pattern"};
const descriptions={
arousal:"Your answers most closely match a pattern in which mental or physical alertness may make it harder to return to sleep after an awakening.",
timing:"Your answers most closely match a pattern in which sleep timing, schedule consistency, or circadian alignment may be worth investigating.",
habits:"Your answers point toward daily habits that can influence sleep continuity, including caffeine, alcohol, meals, naps, or changing routines.",
environment:"Your answers suggest that the sleep environment or an external disturbance may be worth checking before assuming a biological explanation.",
mixed:"Your answers do not point strongly to one pattern. Nighttime waking can have several contributors and the pattern can change from night to night."
};
const actions={
arousal:["Keep a consistent wake time for several days.","Create a low-stimulation wind-down period before bed.","If you wake, avoid turning the moment into a stressful test of whether you can sleep."],
timing:["Keep bedtime and wake time as consistent as practical.","Get regular daytime light exposure, especially in the morning.","Track whether late nights or schedule changes precede awakenings."],
habits:["Track caffeine timing for one week.","Notice whether alcohol or late, heavy meals precede fragmented nights.","Review naps and irregular sleep timing in the same log."],
environment:["Check bedroom temperature, noise, light, and device notifications.","Notice whether pets, partners, or external sounds coincide with awakenings.","Change one environmental variable at a time."],
mixed:["Keep a simple seven-day sleep log.","Record bedtime, wake time, awakenings, caffeine, alcohol, and major stressors.","Look for repeated patterns rather than assuming one cause from one night."]
};
let i=0,scores={arousal:0,timing:0,habits:0,environment:0,mixed:0};
function track(n,p){if(typeof gtag==="function")gtag("event",n,Object.assign({event_category:"sleep_funnel"},p||{}))}
function render(){
 if(i>=questions.length){finish();return}
 const q=questions[i];counter.textContent="QUESTION "+(i+1)+" OF "+questions.length;question.textContent=q[0];bar.style.width=((i+1)/questions.length*100)+"%";opts.innerHTML="";
 q[1].forEach((label,index)=>{const b=document.createElement("button");b.type="button";b.className="w-full text-left rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-medium text-slate-300 transition";b.textContent=label;b.dataset.index=index;opts.appendChild(b)})
}
function finish(){
 let primary="mixed";tracks.forEach(k=>{if(scores[k]>scores[primary])primary=k});
 track("quiz_completed",{result_pattern:primary});
 engine.classList.add("hidden");
 const list=actions[primary].map(x=>"<li>"+x+"</li>").join("");
 const result=document.querySelector(".sleep-quiz-result");
 if(result){
  result.innerHTML='<div class="text-center"><span class="inline-block text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Assessment Complete</span><h3 class="mt-2 text-2xl font-extrabold text-white">'+names[primary]+'</h3><p class="mt-3 text-sm leading-relaxed text-slate-300">'+descriptions[primary]+'</p></div><div class="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-5"><h4 class="text-sm font-bold text-white">What to explore next</h4><ul class="mt-2 space-y-2 text-xs leading-relaxed text-slate-300">'+list+'</ul></div><div class="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5"><h4 class="text-base font-bold text-white">Want to review a sleep-support product?</h4><p class="mt-2 text-xs leading-relaxed text-slate-400">Yu Sleep is a third-party product. We do not present it as a diagnosis or guaranteed treatment. Review its ingredients, directions, price, guarantee, and available evidence before deciding.</p><a id="affiliate-link" href="https://getyusleep.com/glp/?affiliate=butetnadia&tid=assessment_'+primary+'" target="_blank" rel="nofollow sponsored noopener noreferrer" class="mt-4 block w-full rounded-xl bg-emerald-600 px-5 py-4 text-center text-xs font-bold text-white">Read the Yu Sleep Review →</a><p class="mt-3 text-[10px] leading-relaxed text-slate-500">Affiliate disclosure: Sleep Science Hub may receive a commission if you purchase through this link, at no additional cost to you.</p></div>';
  result.classList.remove("hidden");
  result.scrollIntoView({behavior:"smooth",block:"start"});
  const a=document.getElementById("affiliate-link");a.addEventListener("click",()=>track("affiliate_click",{result_pattern:primary,affiliate_partner:"Yu Sleep"}));
 }

 const a=document.getElementById("affiliate-link");a.addEventListener("click",()=>track("affiliate_click",{result_pattern:primary,affiliate_partner:"Yu Sleep"}));
 counter.textContent="ASSESSMENT COMPLETE";question.textContent="Your sleep pattern is a starting point, not a diagnosis.";track("result_view",{result_pattern:primary});
}
start&&start.addEventListener("click",function(){intro.classList.add("hidden");engine.classList.remove("hidden");track("quiz_start",{question_count:7});render()});
opts&&opts.addEventListener("click",function(e){const b=e.target.closest("button");if(!b)return;const n=Number(b.dataset.index);const map=[["arousal","arousal"],["arousal","arousal"],["timing","timing"],["environment","environment"],["mixed","mixed"]];const q=i;if(q===2&&n===0||q===2&&n===1||q===2&&n===2)scores.habits++;else if(q===0)scores[map[n][0]]++;else if(q===1)scores.timing++;else if(q===3)scores[["arousal","arousal","timing","environment","mixed"][n]]++;else if(q===4)scores[["arousal","environment","habits","timing","mixed"][n]]++;else if(q===5)scores[["mixed","mixed","arousal","timing","environment"][n]]++;else if(q===6)scores[["arousal","timing","habits","environment","mixed"][n]]++;i++;track("quiz_answer",{question_number:q+1,answer_index:n+1});render()});
});