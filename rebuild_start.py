import os

GA4_ID = "G-T1MFCM2SKH"
AFFILIATE = "https://hop.clickbank.net/?affiliate=butetnadia&vendor=yusleep&op=glp&tid=start_direct"

html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta name="robots" content="noindex,nofollow"/>
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"/>
  <title>Why Do You Wake Up at 3 AM?</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id={ga4}"></script>
  <script>
    window.dataLayer=window.dataLayer||[];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js',new Date());
    gtag('config','{ga4}');
    function track(a,l){{gtag('event',a,{{event_category:'funnel',event_label:l}});}}
  </script>
  <style>
    *{{box-sizing:border-box;margin:0;padding:0;}}
    html{{background:#0f172a;}}
    body{{
      min-height:100vh;
      background:#0f172a;
      font-family:'Plus Jakarta Sans',sans-serif;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px 16px;
    }}
    .card{{
      background:#1e293b;
      border:1px solid #334155;
      border-radius:20px;
      padding:32px 24px;
      max-width:400px;
      width:100%;
      text-align:center;
    }}
    .tag{{
      display:inline-block;
      background:rgba(56,189,248,.1);
      border:1px solid rgba(56,189,248,.25);
      color:#38bdf8;
      font-size:10px;
      font-weight:700;
      letter-spacing:.1em;
      text-transform:uppercase;
      padding:4px 12px;
      border-radius:999px;
      margin-bottom:18px;
    }}
    h1{{font-size:24px;font-weight:800;color:#f1f5f9;line-height:1.25;margin-bottom:12px;}}
    h1 span{{color:#38bdf8;}}
    p{{font-size:13px;line-height:1.65;color:#94a3b8;margin-bottom:18px;}}
    ul{{text-align:left;background:rgba(15,23,42,.6);border:1px solid #1e293b;border-radius:10px;padding:12px 14px;margin-bottom:20px;list-style:none;}}
    li{{font-size:13px;color:#cbd5e1;padding:4px 0;display:flex;gap:8px;}}
    li::before{{content:"\\2192";color:#38bdf8;flex-shrink:0;}}
    .btn{{display:block;padding:15px;border-radius:12px;font-size:14px;font-weight:700;color:#fff;text-decoration:none;transition:opacity .2s;margin-bottom:10px;}}
    .btn-quiz{{background:#0284c7;}}
    .btn-quiz:hover{{opacity:.9;}}
    .btn-direct{{background:#16a34a;font-size:12px;padding:12px;}}
    .btn-direct:hover{{opacity:.9;}}
    .meta{{font-size:10px;color:#475569;margin-bottom:0;}}
    .disc{{font-size:9px;color:#334155;margin-top:16px;line-height:1.5;}}
  </style>
</head>
<body onload="track('start_view','start.html')">
  <div class="card">
    <div class="tag">&#9200; 60-Second Sleep Audit</div>
    <h1>You woke up at 3 AM.<br><span>Again.</span></h1>
    <p>It's not random. Three specific biological reasons cause this — most people only have one.</p>
    <ul>
      <li>Mind suddenly racing at 3 AM</li>
      <li>Fall back asleep but wake up exhausted</li>
      <li>Worse after stressful days or late meals</li>
    </ul>
    <a href="https://circadianblueprint.com/quiz.html"
       class="btn btn-quiz"
       onclick="track('quiz_click','start_to_quiz')">
      Find My 3 AM Trigger &#8594;
    </a>
    <a href="{aff}"
       class="btn btn-direct"
       onclick="track('direct_affiliate_click','start_direct')"
       rel="nofollow sponsored noopener noreferrer"
       target="_blank">
      Skip Quiz &#8212; Go Straight to Solution &#8594;
    </a>
    <p class="meta">&#9889; 60 seconds &nbsp;&middot;&nbsp; No email required</p>
    <p class="disc">Educational only. May earn commission from purchases. Results vary.</p>
  </div>
</body>
</html>""".format(ga4=GA4_ID, aff=AFFILIATE)

with open("start.html","w",encoding="utf-8") as f:
    f.write(html)
print("OK start.html rebuilt")
