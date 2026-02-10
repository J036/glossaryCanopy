import React, {useEffect} from "react";
import {glossaryTerms} from "../js/glossary-terms.js";
import {
  attachGlossaryTooltips,
  highlightGlossaryTermsString,
  identifyGlossaryMatches,
  renderGlossary,
} from "../js/glossary-functions.js";

interface GlossaryClientProps {
  contentSelector?: string;
  glossarySelector?: string;
}

export default function GlossaryClient({
  contentSelector = ".canopy-work--secondary",
  glossarySelector = "#glossary-section",
}: GlossaryClientProps) {
  useEffect(() => {
    const content = document.querySelector(contentSelector);
    const glossaryContainer = document.querySelector(glossarySelector);

    if (!content || !glossaryContainer) return;

    const textToScan = content.textContent || "";
    if (!textToScan.trim()) return;

    const matches = identifyGlossaryMatches(textToScan, glossaryTerms);
    content.innerHTML = highlightGlossaryTermsString(textToScan, matches);
    renderGlossary(matches, glossaryContainer as HTMLElement);
    attachGlossaryTooltips(content);
  }, [contentSelector, glossarySelector]);

  return null;
}
