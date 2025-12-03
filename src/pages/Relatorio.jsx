// src/pages/Relatorio.jsx
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem("bg_current_user")); } catch { return null; }
}

function toCSV(rows) {
  const cols = Object.keys(rows[0] || {});
  const head = cols.join(",");
  const lines = rows.map(r => cols.map(c => {
    const v = r[c] === null || r[c] === undefined ? "" : String(r[c]);
    return `"${v.replace(/"/g, '""')}"`;
  }).join(","));
  return [head, ...lines].join("\n");
}

export default function Relatorio({ results = [], clearResults }) {
  const user = getCurrentUser();
  const [filter, setFilter] = useState("all"); // all | me | turma
  const [showConfirm, setShowConfirm] = useState(false);

  const filtered = useMemo(() => {
    if (!results || results.length === 0) return [];
    if (filter === "all") return results.slice().reverse();
    if (filter === "me") {
      if (!user) return [];
      return results.filter(r => r.userId && String(r.userId) === String(user.id)).slice().reverse();
    }
    if (filter === "turma") {
      if (!user || !user.turma) return [];
      return results.filter(r => r.turma && String(r.turma) === String(user.turma)).slice().reverse();
    }
    return results.slice().reverse();
  }, [results, filter, user]);

  // aggregation per game
  const aggByGame = useMemo(() => {
    const map = {};
    (filtered || []).forEach(r => {
      const g = r.gameId || "unknown";
      map[g] = map[g] || { attempts: 0, correct: 0, last: null };
      map[g].attempts += 1;
      if (r.correct) map[g].correct += 1;
      const dt = r.date ? new Date(r.date) : null;
      if (dt && (!map[g].last || dt > map[g].last)) map[g].last = dt;
    });
    return Object.entries(map).map(([gameId, v]) => ({
      gameId,
      attempts: v.attempts,
      correct: v.correct,
      accuracy: v.attempts ? Math.round((v.correct / v.attempts) * 10000) / 100 : 0,
      last: v.last
    }));
  }, [filtered]);

  function handleExport() {
    if (!filtered || filtered.length === 0) {
      alert("Sem dados para exportar.");
      return;
    }
    const csv = toCSV(filtered.map(r => ({
      gameId: r.gameId,
      questionId: r.questionId,
      correct: r.correct,
      userId: r.userId,
      turma: r.turma,
      role: r.role,
      date: r.date
    })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const now = new Date().toISOString().slice(0,19).replace(/:/g,"-");
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_${filter}_${now}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    setShowConfirm(true);
  }

  function doClear() {
    setShowConfirm(false);
    if (typeof clearResults === "function") {
      clearResults();
    } else {
      localStorage.removeItem("bg_results");
      window.location.reload();
    }
  }

  return (
    <div className="py-6 max-w-4xl mx-auto">

      {/* Imagem no topo + botão voltar */}
      <div className="flex flex-col items-center mb-6 text-center">
        <img
          src="/relatorio.png"
          alt="Relatório BrainGames"
          className="w-32 h-32 object-cover rounded-full shadow-md border"
        />
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
        >
          Voltar para Home
        </Link>
      </div>

      <h2 className="text-xl font-bold mb-4 text-center">Relatório</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg ${filter==='all' ? 'bg-primary text-white' : 'bg-white border'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("me")}
            className={`px-3 py-1 rounded-lg ${filter==='me' ? 'bg-primary text-white' : 'bg-white border'}`}
          >
            Meus (usuário)
          </button>
          <button
            onClick={() => setFilter("turma")}
            className={`px-3 py-1 rounded-lg ${filter==='turma' ? 'bg-primary text-white' : 'bg-white border'}`}
          >
            Turma
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={handleExport} className="px-3 py-1 rounded-lg bg-white border">
            Exportar CSV
          </button>
          <button onClick={handleClear} className="px-3 py-1 rounded-lg bg-red-500 text-white">
            Limpar tudo
          </button>
        </div>
      </div>

      {/* Aggregation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {aggByGame.length === 0 ? (
          <div className="text-gray-500 p-4 bg-white rounded shadow">Nenhum dado para exibir.</div>
        ) : aggByGame.map(g => (
          <div key={g.gameId} className="bg-white p-4 rounded shadow">
            <div className="font-semibold text-lg">{g.gameId}</div>
            <div className="text-sm text-gray-500">Tentativas: {g.attempts} • Acertos: {g.correct}</div>
            <div className="mt-2">
              <div className="text-sm">Taxa: <strong>{g.accuracy}%</strong></div>
              <div className="text-sm text-gray-500">Última: {g.last ? format(g.last, "yyyy-MM-dd HH:mm") : "-"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center">Nenhum resultado registrado.</div>
        ) : (
          filtered.map((r, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div className="flex items-center gap-3">
                {r.avatar && (
                  <img src={r.avatar} alt="Usuário" className="w-12 h-12 object-cover rounded-full shadow-md border" />
                )}
                <div>
                  <div className="font-medium text-gray-700">{r.gameId} <span className="text-sm text-gray-400">({r.questionId})</span></div>
                  <div className="text-sm text-gray-500">
                    {r.userId ? `Usuário: ${r.userId}` : r.role} • {r.turma ? `Turma: ${r.turma}` : "—"} • {r.date ? format(new Date(r.date), "yyyy-MM-dd HH:mm") : "-"}
                  </div>
                </div>
              </div>
              <div className={`font-semibold ${r.correct ? "text-green-600" : "text-red-500"}`}>
                {r.correct ? "Correto" : "Incorreto"}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de confirmação */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-10 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Confirmar limpeza</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tem certeza que deseja apagar <strong>todos</strong> os resultados? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-lg bg-white border">
                Cancelar
              </button>
              <button onClick={doClear} className="px-4 py-2 rounded-lg bg-red-500 text-white">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


