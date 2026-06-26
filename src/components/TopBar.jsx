export default function TopBar({
  analysis,
  setAnalysis,
  onRetokenize,
  onAddNote,
  onExportPng,
  onExportPdf,
  onClear,
  onUndo,
  onSave,
  onLoadLocal,
  supabaseStatus,
  session,
  email,
  setEmail,
  onLogin,
  onLogout,
}) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">Σ</span>
        <div>
          <strong>Syntagma Visual</strong>
          <small>Análisis morfosintáctico</small>
        </div>
      </div>

      <label className="sentence-input">
        <span>Oración</span>
        <input
          value={analysis.sentence}
          onChange={(event) => setAnalysis((prev) => ({ ...prev, sentence: event.target.value }))}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onRetokenize();
          }}
          placeholder="Escribe una oración..."
        />
      </label>

      <div className="topbar-actions">
        <button onClick={onRetokenize}>Analizar</button>

        <select
          value={analysis.level}
          onChange={(event) => setAnalysis((prev) => ({ ...prev, level: event.target.value }))}
          title="Nivel educativo"
        >
          <option value="primaria">Primaria</option>
          <option value="eso">ESO</option>
          <option value="bachillerato">Bachillerato</option>
        </select>

        <select
          value={analysis.mode}
          onChange={(event) => setAnalysis((prev) => ({ ...prev, mode: event.target.value }))}
          title="Modo visual"
        >
          <option value="arbol">Árbol</option>
          <option value="cajitas">Cajitas</option>
        </select>

        <button onClick={onAddNote}>Nota</button>
        <button onClick={onUndo}>Deshacer</button>
        <button onClick={onClear}>Limpiar</button>
        <button onClick={onExportPng}>PNG</button>
        <button onClick={onExportPdf}>PDF</button>
        <button className="primary" onClick={onSave}>Guardar</button>
        <button onClick={onLoadLocal}>Abrir local</button>
      </div>

      <div className="auth-box" title={supabaseStatus}>
        {session ? (
          <>
            <span className="session-pill">Con sesión</span>
            <button onClick={onLogout}>Salir</button>
          </>
        ) : (
          <>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email para guardar"
              aria-label="Email"
            />
            <button onClick={onLogin}>Entrar</button>
          </>
        )}
      </div>
    </header>
  );
}
