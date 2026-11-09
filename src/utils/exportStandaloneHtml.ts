import {
  ARIONZ_CONCEPTS,
  RELATED_RESEARCH_DIRECTIONS,
} from '../data/arionzConcepts';

export function generateStandaloneSourcePreview(): string {
  const conceptsJson = JSON.stringify(ARIONZ_CONCEPTS, null, 2);
  // Insert the exact Prompt 2 comment before the closing bracket of ARIONZ_CONCEPTS
  const conceptsWithMarker = conceptsJson.replace(
    /\n\]$/,
    '\n  // === PASTE PROMPT 2 (CONCEPTS 5 TO 8) BELOW THIS LINE ===\n]'
  );
  const relatedJson = JSON.stringify(RELATED_RESEARCH_DIRECTIONS, null, 2);

  return `const ARIONZ_CONCEPTS = ${conceptsWithMarker};

const RELATED_RESEARCH_DIRECTIONS = ${relatedJson};`;
}
