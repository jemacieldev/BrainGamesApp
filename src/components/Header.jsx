import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="bg-white shadow-sm py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to='/' className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">BG</div>
          <div className="text-gray-800 font-semibold">BrainGames</div>
        </Link>
        <nav className="hidden sm:flex gap-4 text-sm text-gray-600">
          <Link to='/menu' className="hover:text-gray-800">Menu</Link>
          <Link to='/jogos' className="hover:text-gray-800">Jogos</Link>
          <Link to='/relatorio' className="hover:text-gray-800">Relatório</Link>
        </nav>
      </div>
    </header>
  )
}
