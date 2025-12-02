import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LADO ESQUERDO — IMAGEM */}
      <div className="flex items-center justify-center p-6">
        <img
          src="/brain.png"
          alt="Brain"
          className="w-3/4 max-w-md drop-shadow-lg"
        />
      </div>

      {/* LADO DIREITO — CONTEÚDO */}
      <div className="flex flex-col items-center justify-center p-10 text-center">

        <h1 className="text-3xl font-bold mb-3">
          Bem-vindo ao BrainGames
        </h1>

        <p className="text-gray-600 mb-6 max-w-md">
          Pratique jogos educativos, acompanhe resultados e melhore suas habilidades.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/login")}
            className="btn-primary"
          >
            Acessar
          </button>

          <button
            onClick={() => navigate("/jogos")}
            className="px-5 py-2 rounded-full border border-gray-300"
          >
            Ver jogos
          </button>
        </div>

      </div>
    </div>
  );
}

