import { useMemo } from 'react';

export default function Canvas({
  analysis,
  setAnalysis,
  canvasRef,
  selectedTokens,
  setSelectedTokens,
  activeLabel,
  arrowMode,
  setArrowMode,
  selectedLabelIds,
  setSelectedLabelIds,
  pushHistory,
}) {
  const tokenCount = analysis.tokens.length || 1;

  const handleCanvasDrop = (event) => {
    event.preventDefault();
    const raw = event.dataTransfer.getData('application/syntagma-label');
    if (!raw) return;

    const payload = JSON.parse(raw);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(16, event.clientX - rect.left);
    const y = Math.max(120, event.clientY - rect.top);

    pushHistory();

    if (payload.source === 'palette') {
      const item = payload.item;
      const newLabel = {
        id: crypto.randomUUID(),
        sourceId: item.id,
        text: item.short,
        fullText: item.label,
        color: item.color,
        x,
        y,
      };
      setAnalysis((prev) => ({ ...prev, labels: [...prev.labels, newLabel] }));
      return;
    }

    if (payload.source === 'canvas-label') {
      setAnalysis((prev) => ({
        ...prev,
        labels: prev.labels.map((label) =>
          label.id === payload.id ? { ...label, x, y } : label
        ),
      }));
      return;
    }

    if (payload.source === 'note') {
      setAnalysis((prev) => ({
        ...prev,
        notes: prev.notes.map((note) =>
          note.id === payload.id ? { ...note, x, y } : note
        ),
      }));
    }
  };

  const toggleToken = (tokenId) => {
    setSelectedTokens((prev) =>
      prev.includes(tokenId) ? prev.filter((id) => id !== tokenId) : [...prev, tokenId]
    );
  };

  const createBracket = () => {
    if (!activeLabel || selectedTokens.length === 0) return;

    const selectedIndexes = analysis.tokens
      .filter((token) => selectedTokens.includes(token.id))
      .map((token) => token.index);

    const start = Math.min(...selectedIndexes);
    const end = Math.max(...selectedIndexes);

    pushHistory();

    setAnalysis((prev) => ({
      ...prev,
      brackets: [
        ...prev.brackets,
        {
          id: crypto.randomUUID(),
          label: activeLabel.short,
          fullText: activeLabel.label,
          color: activeLabel.color,
          start,
          end,
        },
      ],
    }));

    setSelectedTokens([]);
  };

  const deleteBracket = (id) => {
    pushHistory();
    setAnalysis((prev) => ({
      ...prev,
      brackets: prev.brackets.filter((bracket) => bracket.id !== id),
    }));
  };

  const labelCenters = useMemo(() => {
    const map = new Map();
    analysis.labels.forEach((label) => {
      map.set(label.id, { x: label.x + 42, y: label.y + 18 });
    });
    return map;
  }, [analysis.labels]);

  const handleLabelDragStart = (event, label) => {
    event.dataTransfer.setData(
      'application/syntagma-label',
      JSON.stringify({ source: 'canvas-label', id: label.id })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleNoteDragStart = (event, note) => {
    event.dataTransfer.setData(
      'application/syntagma-label',
      JSON.stringify({ source: 'note', id: note.id })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleLabelClick = (label) => {
    if (!arrowMode) return;

    setSelectedLabelIds((prev) => {
      const next = prev.includes(label.id)
        ? prev.filter((id) => id !== label.id)
        : [...prev, label.id].slice(-2);

      if (next.length === 2) {
        const text = window.prompt('Texto de la flecha', 'relación') || '';
        pushHistory();
        setAnalysis((current) => ({
          ...current,
          arrows: [
            ...current.arrows,
            {
              id: crypto.randomUUID(),
              fromId: next[0],
              toId: next[1],
              text,
              color: '#334155',
            },
          ],
        }));
        setArrowMode(false);
        return [];
      }

      return next;
    });
  };

  const updateNote = (id, text) => {
    setAnalysis((prev) => ({
      ...prev,
      notes: prev.notes.map((note) => (note.id === id ? { ...note, text } : note)),
    }));
  };

  const deleteLabel = (id) => {
    pushHistory();
    setAnalysis((prev) => ({
      ...prev,
      labels: prev.labels.filter((label) => label.id !== id),
      arrows: prev.arrows.filter((arrow) => arrow.fromId !== id && arrow.toId !== id),
    }));
  };

  const deleteNote = (id) => {
    pushHistory();
    setAnalysis((prev) => ({
      ...prev,
      notes: prev.notes.filter((note) => note.id !== id),
    }));
  };

  const deleteArrow = (id) => {
    pushHistory();
    setAnalysis((prev) => ({
      ...prev,
      arrows: prev.arrows.filter((arrow) => arrow.id !== id),
    }));
  };

  return (
    <main
      className={`analysis-canvas mode-${analysis.mode}`}
      ref={canvasRef}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleCanvasDrop}
    >
      <section className="canvas-help">
        <strong>Guía rápida</strong>
        <span>1. Escribe la oración.</span>
        <span>2. Selecciona palabras.</span>
        <span>3. Elige una etiqueta y crea corchetes.</span>
        <span>4. Arrastra etiquetas, añade flechas y descarga.</span>
      </section>

      <section
        className="sentence-row"
        style={{ gridTemplateColumns: `repeat(${tokenCount}, minmax(64px, 1fr))` }}
      >
        {analysis.tokens.map((token) => (
          <button
            type="button"
            key={token.id}
            className={`token ${selectedTokens.includes(token.id) ? 'is-selected' : ''}`}
            onClick={() => toggleToken(token.id)}
          >
            <span>{token.text}</span>
          </button>
        ))}
      </section>

      <section className="bracket-area">
        {analysis.brackets.map((bracket, index) => (
          <div
            key={bracket.id}
            className="bracket-grid"
            style={{
              gridTemplateColumns: `repeat(${tokenCount}, minmax(64px, 1fr))`,
            }}
          >
            <button
              type="button"
              className="bracket"
              style={{
                gridColumn: `${bracket.start + 1} / ${bracket.end + 2}`,
                '--bracket-color': bracket.color,
                marginTop: `${index * 4}px`,
              }}
              onDoubleClick={() => deleteBracket(bracket.id)}
              title={`${bracket.fullText}. Doble clic para borrar.`}
            >
              <span>{bracket.label}</span>
            </button>
          </div>
        ))}
      </section>

      <svg className="relations-layer">
        <defs>
          <marker
            id="arrow-head"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
          </marker>
        </defs>

        {analysis.arrows.map((arrow) => {
          const from = labelCenters.get(arrow.fromId);
          const to = labelCenters.get(arrow.toId);
          if (!from || !to) return null;

          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          return (
            <g key={arrow.id} onDoubleClick={() => deleteArrow(arrow.id)}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={arrow.color}
                strokeWidth="2.2"
                markerEnd="url(#arrow-head)"
              />
              {arrow.text ? (
                <text x={midX} y={midY - 8} textAnchor="middle" className="arrow-text">
                  {arrow.text}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {analysis.labels.map((label) => (
        <button
          type="button"
          key={label.id}
          className={`canvas-label ${selectedLabelIds.includes(label.id) ? 'is-selected' : ''}`}
          draggable
          onDragStart={(event) => handleLabelDragStart(event, label)}
          onClick={() => handleLabelClick(label)}
          onDoubleClick={() => deleteLabel(label.id)}
          style={{
            left: label.x,
            top: label.y,
            '--tag-color': label.color,
          }}
          title={`${label.fullText}. Arrastra para mover. Doble clic para borrar.`}
        >
          {label.text}
        </button>
      ))}

      {analysis.notes.map((note) => (
        <article
          className="canvas-note"
          key={note.id}
          draggable
          onDragStart={(event) => handleNoteDragStart(event, note)}
          style={{ left: note.x, top: note.y }}
        >
          <button
            className="note-delete"
            type="button"
            onClick={() => deleteNote(note.id)}
            aria-label="Borrar nota"
          >
            ×
          </button>
          <textarea
            value={note.text}
            onChange={(event) => updateNote(note.id, event.target.value)}
            aria-label="Nota"
          />
        </article>
      ))}

      <footer className="canvas-toolbar">
        <button type="button" onClick={createBracket} disabled={!activeLabel || selectedTokens.length === 0}>
          Crear corchete con etiqueta activa
        </button>
        <button
          type="button"
          className={arrowMode ? 'is-active' : ''}
          onClick={() => setArrowMode((value) => !value)}
        >
          {arrowMode ? 'Selecciona dos etiquetas' : 'Crear flecha'}
        </button>
        <span>
          Etiqueta activa: <strong>{activeLabel ? `${activeLabel.short} · ${activeLabel.label}` : 'ninguna'}</strong>
        </span>
      </footer>
    </main>
  );
}
