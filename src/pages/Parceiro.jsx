import React from "react";
import Voltar from "../components/Voltar"; 


export default function Parceiro() {
  return (
    <div className="p-6 max-w-3xl mx-auto">

    <Voltar />

      <div className="flex flex-col items-center mb-8">
        <img
          src="/kids.png"
          alt="Casa do Zezinho"
          className="w-36 h-36 object-cover rounded-full shadow-md border"
        />

        <h1 className="text-3xl font-bold mt-4">
          Parceiro — Casa do Zezinho
        </h1>
      </div>

      <p className="text-gray-700 leading-relaxed">
        A Casa do Zezinho é a instituição parceira responsável por validar o impacto
        social da plataforma BrainGames. A parceria visa apoiar crianças e jovens
        em situação de vulnerabilidade, oferecendo acesso gratuito a jogos
        educativos que estimulam raciocínio lógico, atenção e resolução de
        problemas.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Contribuição do Projeto
      </h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Apoio pedagógico no desenvolvimento dos jogos.</li>
        <li>Validação da experiência dos alunos durante o uso.</li>
        <li>Acompanhamento dos indicadores de aprendizagem.</li>
        <li>Aplicação do piloto com turmas reais.</li>
      </ul>

      <p className="mt-6 text-gray-600">
        Todo o feedback coletado será utilizado para melhorar o aplicativo antes
        da implantação final nas demais instituições parceiras.
      </p>
    </div>
  );
}

