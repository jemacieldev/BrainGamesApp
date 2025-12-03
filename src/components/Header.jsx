// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">BrainGames</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/sobre"
            className="text-gray-700 hover:text-black"
            title="Sobre — sobre o BrainGames, objetivos e contexto acadêmico"
          >
            Sobre
          </Link>

          <Link
            to="/parceiro"
            className="text-gray-700 hover:text-black"
            title='Parceiro — informações sobre a "Casa do Zezinho" e impacto social'
          >
            Parceiro
          </Link>

          <Link
            to="/contato"
            className="text-gray-700 hover:text-black"
            title="Contato — formulário com ID, e-mail, telefone e mensagem"
          >
            Contato
          </Link>

          <Link to="/login" className="text-yellow-600 font-semibold">Login</Link>
        </nav>

        {/* Mobile: badge + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <span className="inline-block bg-yellow-300 text-black text-sm font-semibold px-3 py-1 rounded-full">
            Acesso Gratuito
          </span>

          <button
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label="Abrir menu"
            className="p-2 rounded-md border border-gray-200"
          >
            {/* simples ícone hamburguer */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (dropdown) */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 space-y-2">
            <Link to="/sobre" onClick={() => setOpen(false)} className="block text-gray-700">Sobre</Link>
            <Link to="/parceiro" onClick={() => setOpen(false)} className="block text-gray-700">Parceiro</Link>
            <Link to="/contato" onClick={() => setOpen(false)} className="block text-gray-700">Contato</Link>
            <Link to="/login" onClick={() => setOpen(false)} className="block text-yellow-600 font-semibold">Login</Link>
          </div>
        </div>
      )}
    </header>
  );
}

