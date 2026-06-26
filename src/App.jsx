import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Palette from './components/Palette.jsx';
import TopBar from './components/TopBar.jsx';
import Canvas from './components/Canvas.jsx';
import { createEmptyAnalysis, normalizeAnalysis, tokenize } from './lib/analysisModel.js';
import { isSupabaseConfigured, supabase } from './lib/supabaseClient.js';

const LOCAL_KEY = 'syntagma-visual-current-analysis';

export default function App() {
  const [analysis, setAnalysis] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? normalizeAnalysis(JSON.parse(saved)) : createEmptyAnalysis();
  });

  const [history, setHistory] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);
  const [arrowMode, setArrowMode] = useState(false);
  const [selectedLabelIds, setSelectedLabelIds] = useState([]);
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const canvasRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(analysis));
  }, [analysis]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const pushHistory = () => {
    setHistory((prev) => [...prev.slice(-14), analysis]);
  };

  const retokenize = () => {
    pushHistory();
    setAnalysis((prev) => ({
      ...prev,
      tokens: tokenize(prev.sentence),
      brackets: [],
      arrows: [],
      labels: [],
      notes: [],
      updatedAt: new Date().toISOString(),
    }));
    setSelectedTokens([]);
  };

  const addNote = () => {
    pushHistory();
    setAnalysis((prev) => ({
      ...prev,
      notes: [
        ...prev.notes,
        {
          id: crypto.randomUUID(),
          text: 'Escribe aquí una aclaración didáctica.',
          x: 80,
          y: 360 + prev.notes.length * 24,
        },
      ],
    }));
  };

  const clearAnalysis = () => {
    if (!window.confirm('¿Limpiar todo el análisis visual de esta oración?')) return;
    pushHistory();
    setAnalysis((prev) => ({
      ...prev,
      labels: [],
      brackets: [],
      arrows: [],
      notes: [],
      updatedAt: new Date().toISOString(),
    }));
    setSelectedTokens([]);
  };

  const undo = () => {
    setHistory((prev) => {
      if (!prev.length) return prev;
      const last = prev[prev.length - 1];
      setAnalysis(last);
      return prev.slice(0, -1);
    });
  };

  const exportPng = async () => {
    if (!canvasRef.current) return;
    setStatusMessage('Preparando PNG...');
    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
      width: canvasRef.current.scrollWidth,
      height: canvasRef.current.scrollHeight,
      windowWidth: canvasRef.current.scrollWidth,
      windowHeight: canvasRef.current.scrollHeight,
    });
    const link = document.createElement('a');
    link.download = `${safeFileName(analysis.title || 'analisis')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setStatusMessage('PNG descargado.');
  };

  const exportPdf = async () => {
    if (!canvasRef.current) return;
    setStatusMessage('Preparando PDF multifolio...');
    const source = canvasRef.current;
    const canvas = await html2canvas(source, {
      backgroundColor: '#ffffff',
      scale: 2,
      width: source.scrollWidth,
      height: source.scrollHeight,
      windowWidth: source.scrollWidth,
      windowHeight: source.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const usableHeight = pageHeight - margin * 2;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= usableHeight;

    while (heightLeft > 0) {
      position -= usableHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= usableHeight;
    }

    pdf.save(`${safeFileName(analysis.title || 'analisis')}.pdf`);
    setStatusMessage('PDF descargado.');
  };

  const saveAnalysis = async () => {
    const title = window.prompt('Título del análisis', analysis.title || 'Análisis sin título');
    if (!title) return;

    const payload = { ...analysis, title, updatedAt: new Date().toISOString() };
    setAnalysis(payload);

    if (!isSupabaseConfigured || !session?.user) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(payload));
      setStatusMessage('Guardado localmente. Configura Supabase e inicia sesión para guardar en la nube.');
      return;
    }

    const { error } = await supabase.from('analyses').upsert({
      id: payload.id,
      user_id: session.user.id,
      title,
      sentence: payload.sentence,
      level: payload.level,
      mode: payload.mode,
      payload,
    });

    setStatusMessage(error ? `Error al guardar: ${error.message}` : 'Guardado en Supabase.');
  };

  const loadLocal = () => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (!saved) {
      setStatusMessage('No hay análisis local guardado.');
      return;
    }
    pushHistory();
    setAnalysis(normalizeAnalysis(JSON.parse(saved)));
    setStatusMessage('Análisis local cargado.');
  };

  const login = async () => {
    if (!isSupabaseConfigured) {
      setStatusMessage('Supabase todavía no está configurado.');
      return;
    }
    if (!email.trim()) {
      setStatusMessage('Escribe un email para iniciar sesión.');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.href,
      },
    });

    setStatusMessage(
      error ? `Error de acceso: ${error.message}` : 'Revisa tu correo para entrar mediante enlace mágico.'
    );
  };

  const logout = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
    setSession(null);
    setStatusMessage('Sesión cerrada.');
  };

  return (
    <div className="app-shell">
      <TopBar
        analysis={analysis}
        setAnalysis={setAnalysis}
        onRetokenize={retokenize}
        onAddNote={addNote}
        onExportPng={exportPng}
        onExportPdf={exportPdf}
        onClear={clearAnalysis}
        onUndo={undo}
        onSave={saveAnalysis}
        onLoadLocal={loadLocal}
        supabaseStatus={
          isSupabaseConfigured ? 'Supabase configurado' : 'Supabase sin configurar: se usará guardado local'
        }
        session={session}
        email={email}
        setEmail={setEmail}
        onLogin={login}
        onLogout={logout}
      />

      <div className="workspace">
        <Palette
          side="left"
          level={analysis.level}
          activeLabel={activeLabel}
          onChooseLabel={setActiveLabel}
        />

        <Canvas
          analysis={analysis}
          setAnalysis={setAnalysis}
          canvasRef={canvasRef}
          selectedTokens={selectedTokens}
          setSelectedTokens={setSelectedTokens}
          activeLabel={activeLabel}
          arrowMode={arrowMode}
          setArrowMode={setArrowMode}
          selectedLabelIds={selectedLabelIds}
          setSelectedLabelIds={setSelectedLabelIds}
          pushHistory={pushHistory}
        />

        <Palette
          side="right"
          level={analysis.level}
          activeLabel={activeLabel}
          onChooseLabel={setActiveLabel}
        />
      </div>

      <div className="status-line">
        <span>{statusMessage || 'Lista para trabajar.'}</span>
        <span>{isSupabaseConfigured ? 'Supabase preparado' : 'Modo local'}</span>
      </div>
    </div>
  );
}

function safeFileName(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 70);
}
