import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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

export default function Jogo({ registerResult }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const questions = SAMPLE_QUESTIONS[id] || []
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)

  if(!questions.length) return <div className="py-6">Jogo não encontrado</div>

  const q = questions[current]

  function handleSelect(idx) {
    if(locked) return
    setSelected(idx)
  }

  function handleNext() {
    if(selected === null) return
    const correct = selected === q.answer
    if(registerResult) registerResult({ gameId: id, questionId: q.id, correct, timestamp: Date.now() })
    setLocked(true)
    setTimeout(() => {
      setLocked(false)
      setSelected(null)
      if(current < questions.length - 1){
        setCurrent(current + 1)
      } else {
        navigate('/resultado')
      }
    }, 600)
  }

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4 text-center uppercase">{id.charAt(0).toUpperCase() + id.slice(1)}</h2>      
      <div className="bg-primaryLight p-6 rounded-lg shadow mb-4 max-w-md mx-auto">
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
      <div className="flex justify-between items-center max-w-md mx-auto">
        <div className="text-sm text-gray-500">Pergunta {current + 1} de {questions.length}</div>
        <button
          disabled={selected === null || locked}
          onClick={handleNext}
          className={`px-6 py-2 rounded-full ${selected === null ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white'}`}
        >
          Selecionar
        </button>
      </div>
    </div>
  )
}
