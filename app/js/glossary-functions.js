export function identifyGlossaryMatches(text, glossary) {
  const matches = {};
  for (const term in glossary) {
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    if (regex.test(text)) matches[term] = glossary[term];
  }
  return matches;
}

// Function to highlight glossary terms 
export function highlightGlossaryTerms(container, glossary) {
  let html = container.innerHTML;
  for (const [term, definition] of Object.entries(glossary)) {
    const regex = new RegExp(`\\b(${term})\\b`, "gi");
    html = html.replace(
      regex,
      `<span class="glossary-term" data-definition="${definition}">$1</span>`
    );
  }
  container.innerHTML = html;
}

// Function to render glossary items at bottom of the page, border and some css elements missing from this I'm tired
export function renderGlossary(glossary, container) {
  if (!container) return;
  container.innerHTML = "<h2>Glossary</h2>";
  for (const [term, definition] of Object.entries(glossary)) {
    const item = document.createElement("div");
    item.className = "glossary-item";
    item.id = `glossary-${term}`;
    item.innerHTML = `<strong>${term}</strong>: ${definition}`;
    container.appendChild(item);
  }
}

// Function to handle tooltip overflow. Thanks ChatGPT.
export function attachGlossaryTooltips(container) {
  container.addEventListener("mouseover", (e) => {
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
