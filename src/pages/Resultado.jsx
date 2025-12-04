// src/pages/Resultado.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Voltar from "../components/Voltar";

function getFromLocalFallback() {
  try {
    const s = localStorage.getItem("bg_results");
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

// Função que pega SOMENTE a última partida jogada (fallback)
function getLatestSession(results) {
  if (!results || results.length === 0) return [];

  const reversed = [...results].reverse();
  const latestGameId = reversed[0].gameId;

  // retorna todas as tentativas da partida mais recente
  return reversed.filter(r => r.gameId === latestGameId).reverse();
}

export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();

  const all = getFromLocalFallback();

  // PRIMEIRA PRIORIDADE: sessões ativas armazenadas explicitamente (recomendado)
  const storedSession = (() => {
    try {
      return JSON.parse(localStorage.getItem("bg_current_session")) || null;
    } catch {
      return null;
    }
  })();

  // Se existe sessão corrente, usa ela; caso contrário, tenta inferir a última sessão do histórico
  const sessionResults = Array.isArray(storedSession) && storedSession.length > 0
    ? storedSession
    : getLatestSession(all);

  const total = sessionResults.length;
  const correct = sessionResults.filter(r => r.correct).length;
  const pct = total ? Math.round((correct / total) * 10000) / 100 : 0;

  function handleRetry() {
    navigate("/menu");
  }

  function handleViewReport() {
    navigate("/relatorio");
  }

  const allCorrect = total > 0 && correct === total;
  const noneAttempted = total === 0;
  const hasErrors = total > 0 && correct < total;

  return (
    <div className="py-6 text-center relative">

      {/* BOTÃO VOLTAR OFICIAL */}
      <div className="absolute top-4 left-4">
        <Voltar />
      </div>

      <h2 className="text-2xl font-bold mb-8">
        {noneAttempted ? "Resultado" : allCorrect ? "Parabéns!" : "Boa tentativa!"}
      </h2>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">

        {/* TEXTO PRINCIPAL */}
        <div className="text-center mb-4">
          {noneAttempted ? (
            <div className="text-gray-600">Ainda não houve tentativas neste jogo.</div>
          ) : (
            <div>Você acertou <strong>{correct}</strong> de <strong>{total}</strong></div>
          )}
        </div>

        {/* IMAGEM — MEDALHA QUANDO ACERTA / IMAGEM EDUCATIVA QUANDO ERRA */}
        <div className="mb-4">
          <div className="inline-block rounded-xl shadow">
            {allCorrect ? (
              <img src="/medalha.png" alt="Medalha" className="w-30 h-40 object-contain" />
            ) : (
              <img src="/pensando.png" alt="Tente novamente" className="w-30 h-40 object-contain" />
            )}
          </div>
        </div>

        {/* PORCENTAGEM */}
        <div className="mb-3">
          <div className="text-sm text-gray-500">Taxa de acerto</div>
          <div className="text-xl font-semibold">{pct}%</div>
        </div>

        {/* MENSAGENS (sem emojis / sem travessão) */}
        <div className="mb-4">
          {noneAttempted && (
            <div className="text-sm text-gray-600">Vamos começar? Responda uma pergunta para ver seu desempenho.</div>
          )}

          {allCorrect && (
            <div className="text-sm text-green-600">Excelente. Você acertou tudo. Continue assim.</div>
          )}

          {hasErrors && (
            <div className="text-sm text-yellow-700">
              Muito bom esforço. Continue tentando para melhorar cada vez mais. Você consegue.
            </div>
          )}
        </div>

        {/* DICA EDUCATIVA */}
        {hasErrors && (
          <div className="bg-yellow-50 border rounded-lg p-3 text-sm text-gray-700 mb-4">
            <strong>Dica educativa</strong><br />
            Aqui vai uma dica educativa para ajudar você a aprender um pouco mais.
          </div>
        )}

        {/* BOTÕES */}
        <div className="flex gap-3 justify-center">
          {/* TENTAR NOVAMENTE apenas quando houver erro */}
          {hasErrors && (
            <button onClick={handleRetry} className="px-4 py-2 rounded-full bg-primary text-white">Tentar novamente</button>
          )}

          <button onClick={handleViewReport} className="px-4 py-2 rounded-full bg-primary text-white">Ver relatório</button>
        </div>
      </div>
    </div>
  );
}

