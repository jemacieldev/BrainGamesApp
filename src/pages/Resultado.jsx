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

  const currentGameId = location.state?.gameId || null;
  const all = getFromLocalFallback();

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

  function handleRetry() {
    navigate("/menu");
  }

  const allCorrect = total > 0 && correct === total;
  const noneAttempted = total === 0;
  const hasErrors = total > 0 && correct < total;

  return (
    <div className="py-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        {noneAttempted ? "Resultado" : allCorrect ? "Parabéns!" : "Boa tentativa!"}
      </h2>

      <div className="max-w-xs mx-auto bg-white p-6 rounded-xl shadow">
        <div className="text-center mb-4">
          {noneAttempted ? (
            <div className="text-gray-600">Ainda não houve tentativas neste jogo.</div>
          ) : (
            <div>
              Você acertou <strong>{correct}</strong> de <strong>{total}</strong>
            </div>
          )}
        </div>

        {/* Medalha ou outra imagem padrão */}
        <div className="mb-4">
          <div className="inline-block rounded-full shadow">
            <img src="/medalha.png" alt="Medalha" className="w-30 h-40 object-contain" />
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-500">Taxa de acerto</div>
          <div className="text-xl font-semibold">{pct}%</div>
        </div>

        {/* MENSAGEM MOTIVACIONAL */}
        <div className="mb-4">
          {noneAttempted && (
            <div className="text-sm text-gray-600">
              Vamos começar? Clique em Menu para escolher um jogo.
            </div>
          )}

          {allCorrect && (
            <div className="text-sm text-green-600">
              Excelente! Você acertou tudo — continue assim! 🎉
            </div>
          )}

          {hasErrors && (
            <div className="text-sm text-yellow-700">
              Muito bom esforço! Se algumas questões ficaram difíceis, tudo bem —
              tente de novo para melhorar sua pontuação. Você consegue! 💪
            </div>
          )}
        </div>

        {/* ----------------------------- */}
        {/*  NOVO BLOCO: IMAGEM EDUCATIVA */}
        {/* ----------------------------- */}
        {hasErrors && (
          <div className="mb-5">
            <img
              src="/public/pensando.png"
              alt="Dica educativa"
              className="w-full rounded-xl shadow-md object-cover"
            />
            <div className="text-xs text-gray-500 mt-2">
              Aqui vai uma dica educativa para ajudar você a aprender um pouco mais! 😊
            </div>
          </div>
        )}
        <div className="flex gap-3 justify-center">
          {hasErrors && (
            <button onClick={handleRetry} className="px-4 py-2 rounded-full bg-primary text-white">
              Tentar novamente
            </button>
          )}

          <button onClick={handleMenu} className="px-4 py-2 rounded-full bg-white border">
            Menu
          </button>

          <button onClick={handleViewReport} className="px-4 py-2 rounded-full bg-primary text-white">
            Ver relatório
          </button>
        </div>
      </div>
    </div>
  );
}
