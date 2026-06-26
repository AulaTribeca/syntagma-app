import { getPaletteForSide } from '../data/labels.js';

export default function Palette({ side, level, activeLabel, onChooseLabel }) {
  const sections = getPaletteForSide(side, level);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData(
      'application/syntagma-label',
      JSON.stringify({ source: 'palette', item })
    );
    event.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className={`palette palette-${side}`} aria-label={`Paleta ${side}`}>
      {sections.map((section) => (
        <section className="palette-section" key={section.id}>
          <h2>{section.title}</h2>
          <div className="palette-list">
            {section.items.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`palette-card ${activeLabel?.id === item.id ? 'is-active' : ''}`}
                draggable
                onDragStart={(event) => handleDragStart(event, item)}
                onClick={() => onChooseLabel(item)}
                style={{ '--tag-color': item.color }}
                title={`${item.label} (${item.short})`}
              >
                <span className="card-short">{item.short}</span>
                <span className="card-label">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}
