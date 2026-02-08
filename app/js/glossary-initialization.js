// Initialize glossary functionality upon page load
document.addEventListener('DOMContentLoaded', function() {
  const contentDiv = document.getElementById(// Initialize glossary functionality upon page load
document.addEventListener('DOMContentLoaded', function() {
  // Use the Canopy secondary container (metadata/text area)
  const contentDiv = document.querySelector(".canopy-work--secondary");

  if (contentDiv && typeof glossaryData !== 'undefined') {
    const matches = identifyGlossaryMatches(contentDiv.textContent, glossaryData);
    highlightGlossaryTerms(contentDiv, matches);
    renderGlossary(matches);
  }
});

// Tooltip overflow handling (as you already have)
document.addEventListener('mouseover', (e) => {
  const term = e.target.closest('.glossary-term');
  if (!term) return;

  const tooltip = document.createElement('div');
  tooltip.textContent = term.getAttribute('data-definition');
  tooltip.className = 'glossary-tooltip';
  document.body.appendChild(tooltip);

  const rect = term.getBoundingClientRect();
  const ttRect = tooltip.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - ttRect.width / 2;
  let top = rect.bottom + 8;

  // Clamp tooltip inside viewport
  left = Math.max(8, Math.min(left, window.innerWidth - ttRect.width - 8));

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.position = 'fixed';

  term.addEventListener('mouseleave', () => tooltip.remove(), { once: true });
});
);
  if (contentDiv && typeof glossaryData !== 'undefined') {
    const matches = identifyGlossaryMatches(contentDiv.textContent, glossaryData);
    highlightGlossaryTerms(contentDiv, matches);
    renderGlossary(matches);
  }
});

// Function to handle tooltip overflow. Thanks ChatGPT.
document.addEventListener('mouseover', (e) => {
  const term = e.target.closest('.glossary-term');
  if (!term) return;

  const tooltip = document.createElement('div');
  tooltip.textContent = term.getAttribute('data-definition');
  tooltip.className = 'glossary-tooltip';
  document.body.appendChild(tooltip);

  const rect = term.getBoundingClientRect();
  const ttRect = tooltip.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - ttRect.width / 2;
  let top = rect.bottom + 8;

  // Clamp within viewport
  left = Math.max(8, Math.min(left, window.innerWidth - ttRect.width - 8));

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.position = 'fixed';

  term.addEventListener('mouseleave', () => tooltip.remove(), { once: true });
});
