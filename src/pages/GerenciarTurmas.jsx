// src/pages/GerenciarTurmas.jsx
import React, { useEffect, useState } from "react";

function load() {
  try { return JSON.parse(localStorage.getItem("bg_turmas") || "[]"); }
  catch { return []; }
}

export default function GerenciarTurmas() {
  const [turmas, setTurmas] = useState(load);
  const [nome, setNome] = useState("");

  useEffect(() => {
    localStorage.setItem("bg_turmas", JSON.stringify(turmas));
  }, [turmas]);

  function criarTurma() {
    if (!nome.trim()) return;
    const novo = { id: Date.now().toString(36), nome: nome.trim(), createdAt: new Date().toISOString() };
    setTurmas(prev => [novo, ...prev]);
    setNome("");
  }

  function gerarIds(turmaId, qtd=5) {
    // cria IDs de exemplo para distribuir
    const ids = [];
    for (let i=0;i<qtd;i++){
      ids.push(`${turmaId}-${Math.random().toString(36).slice(2,8)}`);
    }
    // salva em localStorage como convites
    const codes = JSON.parse(localStorage.getItem("bg_invites") || "[]");
    localStorage.setItem("bg_invites", JSON.stringify([...codes, { turmaId, ids, date: new Date().toISOString() }]));
    alert(`Gerados ${qtd} IDs. Copie do localStorage 'bg_invites' ou peça ao desenvolvedor mostrar lista.`);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciar turmas</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Nome da nova turma</label>
        <div className="flex gap-2">
          <input value={nome} onChange={(e) => setNome(e.target.value)} className="flex-1 border p-2 rounded" placeholder="Ex: 3A - Manhã" />
          <button onClick={criarTurma} className="btn-primary px-4 py-2 rounded">Criar</button>
        </div>
      </div>

      <div>
        {turmas.length === 0 ? (
          <div className="p-4 bg-yellow-50 border rounded">Nenhuma turma cadastrada.</div>
        ) : (
          <ul className="space-y-3">
            {turmas.map(t => (
              <li key={t.id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t.nome}</div>
                  <div className="text-sm text-gray-600">ID interno: {t.id}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => gerarIds(t.id, 10)} className="px-3 py-1 rounded border">Gerar 10 IDs</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
