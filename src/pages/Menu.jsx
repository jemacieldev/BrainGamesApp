import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu(){
  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to='/jogos' className="card flex flex-col items-start gap-3">
          <div className="text-lg font-medium">Jogos</div>
          <div className="text-sm text-gray-500">Escolha um jogo e comece a praticar</div>
        </Link>
        <Link to='/relatorio' className="card flex flex-col items-start gap-3">
          <div className="text-lg font-medium">Relatório</div>
          <div className="text-sm text-gray-500">Veja seu desempenho</div>
        </Link>
      </div>
    </div>
  )
}
