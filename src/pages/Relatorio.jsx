import React from 'react'

export default function Relatorio({ results }) {
  const sorted = (results || []).slice().reverse()

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4 text-center">Relatório</h2>
      <div className="space-y-3 max-w-md mx-auto">
        {sorted.length === 0 ? (
          <div className="text-gray-500 text-center">Nenhum resultado registrado.</div>
        ) : (
          sorted.map((r, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-gray-700">{r.gameId}</div>
                <div className="text-sm text-gray-500">Pergunta: {r.questionId}</div>
              </div>
              <div
                className={`font-semibold ${
                  r.correct ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {r.correct ? 'Correto' : 'Incorreto'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
