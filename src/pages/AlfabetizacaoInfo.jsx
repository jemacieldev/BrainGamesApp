import React from "react";
import { useNavigate } from "react-router-dom";
import Voltar from "../components/Voltar"; 

export default function AlfabetizacaoInfo() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">

      <Voltar />

      <img
        src="/alfabetizacao.webp"
        alt="Alfabetização"
        className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
      />

      <h1 className="text-2xl font-bold mb-3">Jogo de Alfabetização</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        O jogo trabalha reconhecimento de letras, sílabas e palavras,
        ajudando no desenvolvimento da leitura inicial e consciência fonológica
        das crianças.
      </p>

      <button
        onClick={() => navigate("/jogo/alfabetizacao")}
        className="btn-primary px-6 py-2 rounded-full"
      >
        Iniciar Jogo
      </button>
    </div>
  );
}
