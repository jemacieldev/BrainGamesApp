// src/pages/RelatorioTurma.jsx
import React, { useMemo } from "react";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("bg_current_user"));
  } catch { return null; }
}

export default function RelatorioTurma({ results }) {
  const user = getCurrentUser();

  // se não for educador, mostrar mensagem
  if (!user || user.role !== "educador") {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Relatórios da Turma</h1>
        <p className="text-gray-700">Acesso permitido somente para educadores. Faça login com uma conta de educador.</p>
      </div>
    );
  }

  // load results fallback
  const allResults = results && results.length ? results :
    JSON.parse(localStorage.getItem("bg_results") || "[]");

  // supondo que cada resultado tem: { userId, turma, jogoId, score, time, date }
  // filtrar por turma escolhida (podemos mostrar todas as turmas encontradas)
  const turmas = Array.from(new Set(allResults.map(r => r.turma).filter(Boolean)));

  const aggregated = useMemo(() => {
    // agrupamento por turma -> por aluno -> métricas básicas (media score, qtd)
    const out = {};
    allResults.forEach(r => {
      if (!r.turma) return;
      if (!out[r.turma]) out[r.turma] = {};
      const a = out[r.turma];
      const id = r.userId || "sem-id";
      if (!a[id]) a[id] = { count: 0, totalScore: 0, lastDate: null };
      a[id].count += 1;
      a[id].totalScore += Number(r.score || 0);
      a[id].lastDate = (!a[id].lastDate || new Date(r.date) > new Date(a[id].lastDate)) ? r.date : a[id].lastDate;
    });
    return out;
  }, [allResults]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Relatórios da Turma</h1>
      <p className="mb-4 text-gray-700">Você está logado como <strong>{user.nome || user.email}</strong>. Aqui estão as turmas para as quais existem registros:</p>

      {turmas.length === 0 ? (
        <div className="p-4 bg-yellow-50 border rounded">Ainda não há resultados vinculados a turmas.</div>
      ) : (
        turmas.map(turma => (
          <div key={turma} className="mb-6 border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Turma: {turma}</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Aluno (ID)</th>
                  <th className="pb-2">Qtd. Sessões</th>
                  <th className="pb-2">Média de Score</th>
                  <th className="pb-2">Última atividade</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(aggregated[turma] || {}).map(([studentId, data]) => (
                  <tr key={studentId} className="border-t">
                    <td className="py-2">{studentId}</td>
                    <td className="py-2">{data.count}</td>
                    <td className="py-2">{(data.totalScore / Math.max(1, data.count)).toFixed(2)}</td>
                    <td className="py-2">{data.lastDate ? new Date(data.lastDate).toLocaleString() : "-"}</td>
                  </tr>
                ))}

                {Object.keys(aggregated[turma] || {}).length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-2 text-gray-600">Nenhum registro para esta turma.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
