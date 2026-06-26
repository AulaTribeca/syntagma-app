export function tokenize(sentence) {
  const clean = sentence.trim().replace(/\s+/g, ' ');
  if (!clean) return [];
  return clean
    .split(' ')
    .map((text, index) => ({
      id: `tok-${index + 1}`,
      text,
      index,
    }));
}

export function createEmptyAnalysis(sentence = 'La carta que me envió lo explicaba todo') {
  return {
    id: crypto.randomUUID(),
    title: 'Análisis inicial',
    sentence,
    level: 'eso',
    mode: 'arbol',
    tokens: tokenize(sentence),
    labels: [],
    brackets: [],
    arrows: [],
    notes: [],
    updatedAt: new Date().toISOString(),
  };
}

export function normalizeAnalysis(input) {
  const base = createEmptyAnalysis(input?.sentence || '');
  return {
    ...base,
    ...input,
    tokens: input?.tokens?.length ? input.tokens : tokenize(input?.sentence || ''),
    labels: input?.labels || [],
    brackets: input?.brackets || [],
    arrows: input?.arrows || [],
    notes: input?.notes || [],
  };
}
