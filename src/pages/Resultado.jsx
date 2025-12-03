// src/pages/Resultado.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


function getFromLocalFallback() {
  try {
    const s = localStorage.getItem("bg_results");
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

export default function Resultado({ clearResults }) {
  const navigate = useNavigate();
  const location = useLocation();

  // pega gameId enviado pela navegação do Jogo
  const currentGameId = location.state?.gameId || null;

  const all = getFromLocalFallback();

  // filtra só os registros do jogo atual (se tiver gameId)
  const sessionResults = currentGameId
    ? all.filter(r => r.gameId === currentGameId)
    : all;

  const total = sessionResults.length;
  const correct = sessionResults.filter(r => r.correct).length;
  const pct = total ? Math.round((correct / total) * 10000) / 100 : 0;

  function handleMenu() {
    navigate("/menu");
  }

  function handleViewReport() {
    navigate("/relatorio");
  }

  return (
    <div className="py-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Parabéns</h2>

      <div className="max-w-xs mx-auto bg-white p-6 rounded-xl shadow">
        <div className="text-center mb-4">
          Você acertou <strong>{correct}</strong> de <strong>{total}</strong>
        </div>

        <div className="mb-4">
          <div className="inline-block rounded-full shadow">
            <img src="/medalha.png" alt="Medalha" className="w-30 h-40 object-contain" />
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-500">Taxa de acerto</div>
          <div className="text-xl font-semibold">{pct}%</div>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={handleMenu} className="px-4 py-2 rounded-full bg-white border">Menu</button>
          <button onClick={handleViewReport} className="px-4 py-2 rounded-full bg-primary text-white">Ver relatório</button>
        </div>
      </div>
    </div>
  )
}
