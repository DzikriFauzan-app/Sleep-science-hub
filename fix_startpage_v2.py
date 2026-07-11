import os

GA4_ID = "G-T1MFCM2SKH"

start_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <title>Why Do You Wake Up at 3 AM? | Sleep Science Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script async src="https://www.googletagmanager.com/gtag/js?id={ga4}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', '{ga4}');
    function trackEvent(action, label) {{
      gtag('event', action, {{ event_category: 'funnel', event_label: label }});
    }}
  </script>
  <style>
    html, body {{
      margin: 0; padding: 0;
      min-height: 100vh;
      background-color: #0f172a;
      color: #cbd5e1;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
    }}
    * {{ box-sizing: border-box; }}
    .card {{
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 24px;
      padding: 36px 28px;
      max-width: 420px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px rgba(0,0,0,0.6);
    }}
    .tag {{
      display: inline-block;
      background: rgba(56,189,248,0.1);
      border: 1px solid rgba(56,189,248,0.2);
      color: #38bdf8;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 20px;
    }}
    h1 {{
      font-size: 26px;
      font-weight: 800;
      color: #f1f5f9;
      line-height: 1.25;
      margin-bottom: 14px;
    }}
    h1 span {{ color: #38bdf8; }}
    p {{
      font-size: 14px;
      line-height: 1.65;
      color: #94a3b8;
      margin-bottom: 20px;
    }}
    .checklist {{
      text-align: left;
      background: rgba(15,23,42,0.6);
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 24px;
      list-style: none;
    }}
    .checklist li {{
      font-size: 13px;
      color: #cbd5e1;
      padding: 5px 0;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }}
    .checklist li::before {{ content: "\\2192"; color: #38bdf8; flex-shrink: 0; }}
    .cta {{
      display: block;
      background: #0284c7;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      padding: 16px;
      border-radius: 14px;
      text-decoration: none;
      transition: background 0.2s;
      margin-bottom: 12px;
    }}
    .cta:hover {{ background: #0369a1; }}
    .meta {{ font-size: 11px; color: #475569; margin-bottom: 0; }}
    .disclosure {{
      font-size: 10px;
      color: #475569;
      margin-top: 20px;
      line-height: 1.5;
    }}
  </style>
</head>
<body onload="trackEvent('start_page_view', 'start.html')">
  <div class="card">
    <div class="tag">⏰ 60-Second Sleep Audit</div>
    <h1>You woke up at<br>3 AM. <span>Again.</span></h1>
    <p>It's not random. There are three specific biological reasons this keeps happening — and most people only have one of them.</p>
    <ul class="checklist">
      <li>Mind suddenly racing at 3 AM</li>
      <li>Fall back asleep eventually, but wake up exhausted</li>
      <li>Happens more after stressful days or late meals</li>
    </ul>
    <a href="https://circadianblueprint.com/quiz.html"
       class="cta"
       onclick="trackEvent('quiz_click', 'start_to_quiz')">
      Find My 3 AM Trigger &rarr;
    </a>
    <p class="meta">&#9889; Takes 60 seconds &nbsp;&middot;&nbsp; No email required</p>
    <p class="disclosure">Educational content only. This site may earn a commission from purchases made through links on this page. Results are individual and not guaranteed.</p>
  </div>
</body>
</html>""".format(ga4=GA4_ID)

with open("start.html", "w", encoding="utf-8") as f:
    f.write(start_html)
print("OK start.html v2 created")

# Inject GA4 ke quiz.html
with open("quiz.html", "r", encoding="utf-8") as f:
    quiz = f.read()

if GA4_ID not in quiz:
    ga4_block = """  <script async src="https://www.googletagmanager.com/gtag/js?id={ga4}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', '{ga4}');
  </script>
""".format(ga4=GA4_ID)
    quiz = quiz.replace("</head>", ga4_block + "</head>")
    with open("quiz.html", "w", encoding="utf-8") as f:
        f.write(quiz)
    print("OK quiz.html GA4 injected")
else:
    print("-- quiz.html GA4 already present")
