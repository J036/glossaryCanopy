function identifyGlossaryMatches(text, glossary) {
  const matches = {};

  //Create a regex for each term to match whole words, case insensitive
  for (const term in glossary) {
    const regex = new RegExp(`\\b${term}\\b`, "i");

    //Check if the term exists in the text
    if (regex.test(text)) {
      matches[term] = glossary[term];
    }
  }

  return matches;
}

// Function to highlight glossary terms 
function highlightGlossaryTerms(container, glossary) {
  
  // Get the current HTML content
  let html = container.innerHTML;

  for (const [term, definition] of Object.entries(glossary)) {
    const regex = new RegExp(`\\b(${term})\\b`, "gi");

    // Replace term with highlighted span
    html = html.replace(
      regex,
      `<span class="glossary-term" data-definition="${definition}">$1</span>`
    );
  }

  container.innerHTML = html;
}

// Function to render glossary items at bottom of the page, border and some css elements missing from this I'm tired
function renderGlossary(glossary) {
  const container = document.getElementById("glossary");
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
