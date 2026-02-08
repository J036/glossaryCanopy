// Initialize glossary functionality upon page load
import {
  identifyGlossaryMatches,
  highlightGlossaryTerms,
  renderGlossary,
  attachGlossaryTooltips
} from "./glossary-functions.js";
import { glossaryTerms } from "./glossary-terms.js";

export default function initGlossary(container, glossaryPanel) {
  if (!container || !glossaryTerms) return;

  const matches = identifyGlossaryMatches(container.textContent, glossaryTerms);
  highlightGlossaryTerms(container, matches);
  renderGlossary(matches, glossaryPanel);
  attachGlossaryTooltips(container);
}
