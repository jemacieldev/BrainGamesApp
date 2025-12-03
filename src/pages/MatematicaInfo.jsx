import React from "react";
import { useNavigate } from "react-router-dom";
import Voltar from "../components/Voltar"; 

export default function MatematicaInfo() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">

      <Voltar />

      <img
        src="/matematica.webp"
        alt="Matemática"
        className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
      />

      <h1 className="text-2xl font-bold mb-3">Jogo de Matemática</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Este jogo estimula o raciocínio rápido, operações matemáticas básicas
        e a precisão na resposta. Ideal para melhorar cálculo mental,
        concentração e velocidade de processamento.
      </p>

      <button
        onClick={() => navigate("/jogo/matematica")}
        className="btn-primary px-6 py-2 rounded-full"
      >
        Iniciar Jogo
      </button>
    </div>
  );
}
