// src/pages/Jogos.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Voltar from '../components/Voltar'

const GAMES = [
  { 
    id: 'matematica', 
    title: 'Matemática', 
    desc: 'Operações e raciocínio rápido',
    img: '/matematica.webp'
  },
  { 
    id: 'alfabetizacao', 
    title: 'Alfabetização', 
    desc: 'Letras, sílabas e leitura',
    img: '/alfabetizacao.webp'
  },
  { 
    id: 'logico', 
    title: 'Raciocínio Lógico', 
    desc: 'Padrões, sequências e lógica',
    img: '/logico.webp'
  },
]

export default function Jogos() {
  const navigate = useNavigate()

  return (
    <div className="py-6 max-w-4xl mx-auto">
      {/* BOTÃO VOLTAR */}
      <Voltar to="/menu" />

      <h2 className="text-xl font-bold mb-4 text-center uppercase">Jogos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES.map(g => (
          <div 
            key={g.id} 
            className="card flex flex-col items-center p-5 h-56 text-center"
          >
            {/* IMAGEM */}
            <img 
              src={g.img}
              alt={g.title}
              className="w-14 h-14 object-contain mb-3"
            />

            {/* TÍTULO */}
            <div className="text-gray-700 font-semibold text-lg">
              {g.title}
            </div>

            {/* DESCRIÇÃO */}
            <div className="text-sm text-gray-500 mb-4">
              {g.desc}
            </div>

            {/* BOTÃO CENTRALIZADO */}
            <button 
              onClick={() => navigate(`/jogo/${g.id}-info`)}
              className="btn-primary mt-auto"
            >
              Acessar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
