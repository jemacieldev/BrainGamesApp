// src/pages/Sobre.jsx
import React from "react";
import { Link } from "react-router-dom";
import Voltar from "../components/Voltar"; 

export default function Sobre() {
  return (
    <div className="p-6 max-w-5xl mx-auto">

      <Voltar />
      
      <div className="flex flex-col items-center mb-8 text-center">
        <img
          src="/sobre.png"
          alt="Sobre o projeto BrainGames"
          className="w-32 h-32 object-cover rounded-full shadow-md border"
        />

        <h1 className="text-3xl font-bold mt-4">
          Sobre o BrainGames
        </h1>

        <p className="text-gray-600 mt-2 max-w-md">
          Projeto acadêmico do curso de ADS – Belas Artes
        </p>
      </div>

      {/* VISÃO GERAL */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Visão geral do projeto</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">
          O BrainGames é uma plataforma de jogos educativos desenvolvida como
          projeto acadêmico no curso de Análise e Desenvolvimento de Sistemas
          (ADS) da Faculdade Belas Artes. O objetivo é oferecer atividades
          lúdicas e avaliativas que estimulem habilidades cognitivas como
          atenção, memória de trabalho, raciocínio lógico e velocidade de
          processamento, além de gerar relatórios automáticos de desempenho
          para educadores e pesquisadores.
        </p>
      </section>

      {/* BENEFÍCIOS DOS JOGOS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Como os jogos ajudam</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
          <li><strong>Treino de Atenção:</strong> foco sustentado e seleção visual.</li>
          <li><strong>Memória de Trabalho:</strong> retenção de curto prazo.</li>
          <li><strong>Raciocínio Lógico:</strong> resolução de problemas.</li>
          <li><strong>Velocidade de Processamento:</strong> respostas mais rápidas.</li>
        </ul>
        <p className="text-gray-600 mt-3">
          Cada jogo coleta métricas que alimentam relatórios para acompanhamento
          individual e coletivo.
        </p>
      </section>

      {/* CONTEXTO ACADÊMICO */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Contexto acadêmico</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">
          Esta plataforma está sendo desenvolvida pela aluna{" "}
          <strong>Jéssica Maciel</strong> no curso de ADS da Faculdade
          Belas Artes, integrando tecnologia educacional, impacto social e
          práticas reais de desenvolvimento orientado por requisitos.
        </p>
      </section>

      {/* EXPECTATIVA DE RESULTADOS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Resultados esperados</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">
          Espera-se evolução mensurável nos indicadores cognitivos dos alunos,
          além de fornecer dados para relatórios pedagógicos e apoiar decisões
          dos educadores durante o processo de aprendizagem.
        </p>
      </section>

      {/* LINKS FINAIS */}
      <div className="mt-8 flex gap-3">
        <Link to="/contato" className="btn-primary px-4 py-2 rounded">
          Entrar em contato
        </Link>
        <Link to="/parceiro" className="px-4 py-2 rounded border">
          Sobre o parceiro
        </Link>
      </div>
    </div>
  );
}
