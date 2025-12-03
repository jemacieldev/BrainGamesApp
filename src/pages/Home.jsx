// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">

      {/* LADO ESQUERDO — IMAGEM */}
      <div className="flex items-center justify-center p-6">
        <img
          src="/brain.png"
          alt="BrainGames - ilustração cérebro"
          className="w-full sm:w-3/4 md:w-11/12 max-w-md object-contain drop-shadow-lg"
        />
      </div>

      {/* LADO DIREITO — CONTEÚDO */}
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Bem-vindo ao BrainGames
          </h1>
          {/* BADGE: Acesso Gratuito */}
          <span
            className="ml-2 inline-block bg-yellow-300 text-black text-sm sm:text-base font-semibold px-3 py-1 rounded-full"
            aria-label="Acesso Gratuito"
            title="Acesso Gratuito"
          >
            Acesso Gratuito
          </span>
        </div>

        <p className="text-gray-600 mb-6 max-w-md">
          Pratique jogos educativos, acompanhe resultados e melhore suas habilidades.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/login")}
            className="btn-primary px-6 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
            aria-label="Acessar BrainGames"
          >
            Acessar
          </button>
        </div>

      </div>
    </div>
  );
}

