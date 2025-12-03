// src/pages/Jogo.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Voltar from '../components/Voltar'

const SAMPLE_QUESTIONS = {
  matematica: [
    { id: 'm1', text: 'Quanto é 2 + 2?', options: ['3','4','5'], answer: 1 },
    { id: 'm2', text: 'Quanto é 5 x 3?', options: ['15','10','8'], answer: 0 },
  ],
  alfabetizacao: [
    { id: 'a1', text: 'Qual palavra começa com B?', options: ['Bola','Casa','Gato'], answer: 0 },
    { id: 'a2', text: 'Qual sílaba inicia a palavra "maçã"?', options: ['ma','ça','ã'], answer: 0 },
  ],
  logico: [
    { id: 'l1', text: 'Sequência: 2,4,6,... Qual o próximo?', options: ['7','8','9'], answer: 1 },
  ]
}

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem("bg_current_user")); } catch { return null; }
}

/**
 * Página do jogo (rodada/quiz).
 * - Voltar volta para a página de info do jogo: /jogo/<id>-info
 * - Registra cada resposta em bg_results (via prop registerResult se fornecida)
 * - Ao finalizar, navega para /resultado com state contendo resumo da sessão
 */
export default function Jogo({ registerResult }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const questions = SAMPLE_QUESTIONS[id] || []
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [sessionCorrect, setSessionCorrect] = useState(0) // acertos nesta sessão

  if(!questions.length) return <div className="py-6">Jogo não encontrado</div>

  const q = questions[current]

  function handleSelect(idx) {
    if(locked) return
    setSelected(idx)
  }

  function pushEntry(entry) {
    if (typeof registerResult === "function") {
      registerResult(entry)
    } else {
      try {
        const arr = JSON.parse(localStorage.getItem("bg_results") || "[]")
        arr.push(entry)
        localStorage.setItem("bg_results", JSON.stringify(arr))
      } catch (e) { /* ignore */ }
    }
  }

  function handleNext() {
    if(selected === null) return
    const correct = selected === q.answer

    // criar entry para guardar (padrão igual ao usado em app)
    const user = getCurrentUser()
    const entry = {
      userId: user && user.role === "aluno" ? (user.id || null) : null,
      turma: user && user.role === "aluno" ? (user.turma || null) : null,
      role: user ? user.role : "guest",
      gameId: id,
      questionId: q.id,
      correct,
      date: new Date().toISOString()
    }

    pushEntry(entry)

    if (correct) setSessionCorrect(prev => prev + 1)

    setLocked(true)
    setTimeout(() => {
      setLocked(false)
      setSelected(null)
      if(current < questions.length - 1){
        setCurrent(current + 1)
      } else {
        // Ao finalizar: navegar para /resultado passando resumo da sessão
        navigate('/resultado', {
          state: {
            gameId: id,
            sessionSummary: {
              totalQuestions: questions.length,
              correct: correct ? sessionCorrect + 1 : sessionCorrect
            }
          }
        })
      }
    }, 400)
  }

  function handleSimulate() {
    const random = Math.floor(Math.random() * q.options.length)
    setSelected(random)
    setTimeout(handleNext, 300)
  }

  // Voltar para a página de info — padrão assumido: /jogo/<id>-info
  const infoPath = `/jogo/${id}-info`

  return (
    <div className="py-6">
      <div className="max-w-xl mx-auto">
        <div className="mb-4 text-left">
          <Voltar to={infoPath} />
        </div>

        <h2 className="text-xl font-bold mb-4 text-center uppercase">
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </h2>

        <div className="bg-primaryLight p-6 rounded-lg shadow mb-4">
          <div className="mb-4 text-gray-700 font-medium text-center">{q.text}</div>
          <div className="grid gap-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`flex items-center justify-center px-3 py-2 rounded-full border text-center ${selected === idx ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'} ${locked ? 'opacity-70' : ''}`}
              >
                <span className="font-medium">{['A)','B)','C)'][idx]} {opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">Pergunta {current + 1} de {questions.length}</div>

          <div className="flex gap-2">
            <button
              onClick={handleSimulate}
              className="px-4 py-2 rounded-full bg-gray-100 border"
              aria-label="Simular resposta"
            >
              Simular
            </button>

            <button
              disabled={selected === null || locked}
              onClick={handleNext}
              className={`px-6 py-2 rounded-full ${selected === null ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white'}`}
            >
              Selecionar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


