export function identifyGlossaryMatches(text, glossary) {
  const matches = {};
  for (const term in glossary) {
    const regex = new RegExp(`\\b(${term})\\b`, "gi");
    if (regex.test(text)) matches[term] = glossary[term];
  }
  return matches;
}

export function highlightGlossaryTermsString(text, glossary) {
  let html = text;
  for (const [term, definition] of Object.entries(glossary)) {
    const regex = new RegExp(`\\b(${term})\\b`, "gi");
    html = html.replace(regex, `<span class="glossary-term" data-definition="${definition}">$1</span>`);
  }
  return html;
}

export function renderGlossary(glossary, container) {
  container.innerHTML = "<h2>Glossary</h2>";
  for (const [term, definition] of Object.entries(glossary)) {
    const item = document.createElement("div");
    item.className = "glossary-item";
    item.id = `glossary-${term}`;
    item.innerHTML = `<strong>${term}</strong>: ${definition}`;
    container.appendChild(item);
  }
}

export function attachGlossaryTooltips(container) {
  container.addEventListener("mouseover", e => {
    const term = e.target.closest(".glossary-term");
    if (!term) return;

    const tooltip = document.createElement("div");
    tooltip.textContent = term.getAttribute("data-definition");
    tooltip.className = "glossary-tooltip";
    document.body.appendChild(tooltip);

    const rect = term.getBoundingClientRect();
    const ttRect = tooltip.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - ttRect.width / 2;
    let top = rect.bottom + 8;

    left = Math.max(8, Math.min(left, window.innerWidth - ttRect.width - 8));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.position = "fixed";

    term.addEventListener("mouseleave", () => tooltip.remove(), { once: true });
  });
}
