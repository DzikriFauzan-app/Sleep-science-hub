import os
import re

BLOG_DIR = "blog"
INDEX_FILE = "blog/index.html"

COLOR_CYCLE = ["sky", "emerald", "purple", "amber", "rose", "orange", "indigo", "cyan", "lime", "pink"]

def extract_meta(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    title = h1_match.group(1).strip() if h1_match else os.path.basename(filepath)
    title = re.sub(r'\s+', ' ', title)

    desc_match = re.search(r'<meta name="description" content="([^"]*)"', content)
    desc = desc_match.group(1).strip() if desc_match else "Read the full investigation for details."
    # Trim description to a reasonable card length
    if len(desc) > 140:
        desc = desc[:137].rsplit(" ", 1)[0] + "..."

    return title, desc


def main():
    if not os.path.exists(INDEX_FILE):
        print(f"⚠️  {INDEX_FILE} not found.")
        return

    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        index_content = f.read()

    # Find all article files in blog/ (excluding index.html itself)
    all_files = sorted([
        f for f in os.listdir(BLOG_DIR)
        if f.endswith(".html") and f != "index.html"
    ])

    # Find which files are already linked as cards in index.html
    linked_hrefs = set(re.findall(r'href="([a-z0-9\-]+\.html)"', index_content))

    missing = [f for f in all_files if f not in linked_hrefs]

    if not missing:
        print("✅ All articles already have a card in blog/index.html. Nothing to inject.")
        return

    print(f"🔍 Found {len(missing)} article(s) missing a card: {missing}")

    # Count existing cards to continue the color cycle consistently
    existing_card_count = index_content.count('<article class="bg-slate-900/50')
    new_cards_html = ""

    for i, filename in enumerate(missing):
        filepath = os.path.join(BLOG_DIR, filename)
        title, desc = extract_meta(filepath)
        color = COLOR_CYCLE[(existing_card_count + i) % len(COLOR_CYCLE)]

        card = f'''
      <article class="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between transition hover:border-sky-500/40">
        <div>
          <span class="text-[10px] font-bold text-{color}-400 uppercase tracking-widest block mb-2">🆕 NEW RESEARCH</span>
          <h2 class="text-lg font-bold text-white mb-2 tracking-tight">{title}</h2>
          <p class="text-slate-400 text-xs leading-relaxed mb-4">{desc}</p>
        </div>
        <a href="{filename}" class="inline-block text-xs font-semibold text-sky-400 hover:text-sky-300">Read Investigation &rarr;</a>
      </article>
'''
        new_cards_html += card
        print(f"   + Injecting card for: {filename} (color: {color})")

    # Insert new cards right before the closing of the grid div + </main>
    insertion_marker = "    </div>\n  </main>"
    if insertion_marker not in index_content:
        print("⚠️  Could not find expected insertion point. No changes made — please check structure manually.")
        return

    updated_content = index_content.replace(
        insertion_marker,
        new_cards_html + insertion_marker
    )

    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        f.write(updated_content)

    print(f"\n✅ Injected {len(missing)} new card(s) into {INDEX_FILE}.")
    print("⚠️  Cards use a generic '🆕 NEW RESEARCH' tag and auto-extracted title/description —")
    print("    review wording before pushing, especially if the <h1> was long or technical.")


if __name__ == "__main__":
    main()
