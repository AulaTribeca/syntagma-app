export const LEVELS = {
  primaria: { order: 1, label: 'Primaria' },
  eso: { order: 2, label: 'ESO' },
  bachillerato: { order: 3, label: 'Bachillerato' },
};

export const PALETTE_SECTIONS = [
  {
    id: 'morfologia',
    title: 'Morfología',
    side: 'left',
    items: [
      { id: 'det', label: 'Determinante', short: 'Det', level: 'primaria', color: '#f59e0b' },
      { id: 'art', label: 'Artículo', short: 'Art', level: 'eso', color: '#f59e0b' },
      { id: 'n', label: 'Nombre', short: 'N', level: 'primaria', color: '#0ea5e9' },
      { id: 'pron', label: 'Pronombre', short: 'Pron', level: 'primaria', color: '#14b8a6' },
      { id: 'adj', label: 'Adjetivo', short: 'Adj', level: 'primaria', color: '#84cc16' },
      { id: 'v', label: 'Verbo', short: 'V', level: 'primaria', color: '#ef4444' },
      { id: 'adv', label: 'Adverbio', short: 'Adv', level: 'primaria', color: '#8b5cf6' },
      { id: 'prep', label: 'Preposición', short: 'Prep', level: 'eso', color: '#a855f7' },
      { id: 'conj', label: 'Conjunción', short: 'Conj', level: 'eso', color: '#ec4899' },
      { id: 'interj', label: 'Interjección', short: 'Interj', level: 'eso', color: '#64748b' },
      { id: 'num', label: 'Numeral', short: 'Num', level: 'eso', color: '#06b6d4' },
      { id: 'cuant', label: 'Cuantificador', short: 'Cuant', level: 'bachillerato', color: '#0284c7' },
      { id: 'loc', label: 'Locución', short: 'Loc.', level: 'bachillerato', color: '#475569' },
      { id: 'perifrasis', label: 'Perífrasis verbal', short: 'Perífr.', level: 'eso', color: '#dc2626' }
    ],
  },
  {
    id: 'grupos',
    title: 'Sintagmas / grupos',
    side: 'left',
    items: [
      { id: 'sn', label: 'Sintagma nominal', short: 'SN', level: 'primaria', color: '#38bdf8' },
      { id: 'sv', label: 'Sintagma verbal', short: 'SV', level: 'primaria', color: '#fb7185' },
      { id: 'sprep', label: 'Sintagma preposicional', short: 'SPrep', level: 'eso', color: '#c084fc' },
      { id: 'sadj', label: 'Sintagma adjetival', short: 'SAdj', level: 'eso', color: '#a3e635' },
      { id: 'sadv', label: 'Sintagma adverbial', short: 'SAdv', level: 'eso', color: '#a78bfa' },
      { id: 'gn', label: 'Grupo nominal', short: 'GN', level: 'bachillerato', color: '#0ea5e9' },
      { id: 'gv', label: 'Grupo verbal', short: 'GV', level: 'bachillerato', color: '#ef4444' },
      { id: 'gprep', label: 'Grupo preposicional', short: 'GPrep', level: 'bachillerato', color: '#9333ea' }
    ],
  },
  {
    id: 'funciones',
    title: 'Funciones sintácticas',
    side: 'right',
    items: [
      { id: 'sujeto', label: 'Sujeto', short: 'Suj.', level: 'primaria', color: '#f97316' },
      { id: 'predicado', label: 'Predicado', short: 'Pred.', level: 'primaria', color: '#2563eb' },
      { id: 'nucleo', label: 'Núcleo', short: 'Núcleo', level: 'primaria', color: '#111827' },
      { id: 'pv', label: 'Predicado verbal', short: 'PV', level: 'eso', color: '#2563eb' },
      { id: 'pn', label: 'Predicado nominal', short: 'PN', level: 'eso', color: '#6366f1' },
      { id: 'cd', label: 'Complemento directo', short: 'CD', level: 'eso', color: '#06b6d4' },
      { id: 'ci', label: 'Complemento indirecto', short: 'CI', level: 'eso', color: '#22c55e' },
      { id: 'cr', label: 'Complemento de régimen', short: 'CRég.', level: 'eso', color: '#0f766e' },
      { id: 'atributo', label: 'Atributo', short: 'Atr.', level: 'eso', color: '#7c3aed' },
      { id: 'cpvo', label: 'Complemento predicativo', short: 'CPvo', level: 'eso', color: '#0891b2' },
      { id: 'cag', label: 'Complemento agente', short: 'CAg', level: 'eso', color: '#78716c' },
      { id: 'cc', label: 'Complemento circunstancial', short: 'CC', level: 'eso', color: '#eab308' },
      { id: 'ccl', label: 'C. circunstancial de lugar', short: 'CCL', level: 'eso', color: '#eab308' },
      { id: 'cct', label: 'C. circunstancial de tiempo', short: 'CCT', level: 'eso', color: '#eab308' },
      { id: 'ccm', label: 'C. circunstancial de modo', short: 'CCM', level: 'eso', color: '#eab308' },
      { id: 'cccant', label: 'C. circunstancial de cantidad', short: 'CCCant', level: 'eso', color: '#eab308' },
      { id: 'cccausa', label: 'C. circunstancial de causa', short: 'CCCausa', level: 'bachillerato', color: '#eab308' },
      { id: 'ccfin', label: 'C. circunstancial de finalidad', short: 'CCFin', level: 'bachillerato', color: '#eab308' },
      { id: 'vocativo', label: 'Vocativo', short: 'Voc.', level: 'eso', color: '#f43f5e' },
      { id: 'aposicion', label: 'Aposición', short: 'Apos.', level: 'eso', color: '#8b5cf6' },
      { id: 'cn', label: 'Complemento del nombre', short: 'CN', level: 'eso', color: '#0891b2' },
      { id: 'cadj', label: 'Complemento del adjetivo', short: 'CAdj', level: 'bachillerato', color: '#65a30d' },
      { id: 'cadv', label: 'Complemento del adverbio', short: 'CAdv', level: 'bachillerato', color: '#7e22ce' }
    ],
  },
  {
    id: 'oraciones',
    title: 'Oraciones y relaciones',
    side: 'right',
    items: [
      { id: 'nexo', label: 'Nexo', short: 'Nx', level: 'eso', color: '#fb923c' },
      { id: 'coord_cop', label: 'Coordinada copulativa', short: 'Coord. cop.', level: 'eso', color: '#10b981' },
      { id: 'coord_adv', label: 'Coordinada adversativa', short: 'Coord. adv.', level: 'eso', color: '#10b981' },
      { id: 'coord_dis', label: 'Coordinada disyuntiva', short: 'Coord. dis.', level: 'eso', color: '#10b981' },
      { id: 'yuxt', label: 'Yuxtapuesta', short: 'Yuxt.', level: 'eso', color: '#14b8a6' },
      { id: 'oss', label: 'Subordinada sustantiva', short: 'OSS', level: 'eso', color: '#8b5cf6' },
      { id: 'rel', label: 'Subordinada de relativo', short: 'Rel.', level: 'eso', color: '#a855f7' },
      { id: 'advpropia', label: 'Subordinada adverbial propia', short: 'SubAdv propia', level: 'bachillerato', color: '#d946ef' },
      { id: 'advimpropia', label: 'Construcción adverbial impropia', short: 'SubAdv impr.', level: 'bachillerato', color: '#c026d3' },
      { id: 'causal', label: 'Causal', short: 'Causal', level: 'bachillerato', color: '#ec4899' },
      { id: 'final', label: 'Final', short: 'Final', level: 'bachillerato', color: '#ec4899' },
      { id: 'concesiva', label: 'Concesiva', short: 'Conces.', level: 'bachillerato', color: '#ec4899' },
      { id: 'condicional', label: 'Condicional', short: 'Cond.', level: 'bachillerato', color: '#ec4899' },
      { id: 'consecutiva', label: 'Consecutiva', short: 'Consec.', level: 'bachillerato', color: '#ec4899' },
      { id: 'comparativa', label: 'Comparativa', short: 'Comp.', level: 'bachillerato', color: '#ec4899' }
    ],
  },
  {
    id: 'marcas',
    title: 'Marcas especiales',
    side: 'right',
    items: [
      { id: 'sujeto_tacito', label: 'Sujeto tácito', short: 'Suj. tácito', level: 'eso', color: '#334155' },
      { id: 'elipsis', label: 'Elipsis', short: 'Ø', level: 'eso', color: '#334155' },
      { id: 'se_reflexivo', label: 'se reflexivo', short: 'se refl.', level: 'eso', color: '#64748b' },
      { id: 'se_reciproco', label: 'se recíproco', short: 'se recípr.', level: 'eso', color: '#64748b' },
      { id: 'se_dativo', label: 'dativo', short: 'Dat.', level: 'bachillerato', color: '#64748b' },
      { id: 'pasiva_refleja', label: 'Pasiva refleja', short: 'Pas. refl.', level: 'bachillerato', color: '#475569' },
      { id: 'impersonal', label: 'Impersonal', short: 'Impers.', level: 'bachillerato', color: '#475569' }
    ],
  }
];

export function getPaletteForSide(side, level) {
  const max = LEVELS[level]?.order ?? 2;
  return PALETTE_SECTIONS
    .filter((section) => section.side === side)
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => (LEVELS[item.level]?.order ?? 3) <= max),
    }))
    .filter((section) => section.items.length > 0);
}

export function findLabelById(id) {
  for (const section of PALETTE_SECTIONS) {
    const found = section.items.find((item) => item.id === id);
    if (found) return found;
  }
  return null;
}
