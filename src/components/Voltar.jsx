import React from "react";
import { useNavigate } from "react-router-dom";

export default function Voltar(){
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
    >
      <span className="text-xl">←</span>
      <span className="text-sm">Voltar</span>
    </button>
  );
}

