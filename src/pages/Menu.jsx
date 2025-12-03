// src/components/Menu.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Menu dinâmico:
  - Lê bg_current_user do localStorage (role: "aluno" | "educador" | "guest")
  - Mostra opções diferentes dependendo do role
  - Botão "Sair" remove bg_current_user e redireciona pra home
  - Mostra avatar/ID simples no topo
*/

export default function Menu() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("bg_current_user");
      setUser(s ? JSON.parse(s) : null);
    } catch (e) {
      setUser(null);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("bg_current_user");
    // opcional: também limpar algo relacionado
    navigate("/");
  }

  // info exibida no topo (fallbacks)
  const topLabel = user
    ? user.role === "aluno"
      ? `Aluno • ID: ${user.id || "—"} • Turma: ${user.turma || "—"}`
      : user.role === "educador"
        ? `Educador • ${user.nome || user.email || "—"}`
        : "Acesso: Convidado"
    : "Acesse sua conta";

  const avatarSrc = user && user.role === "aluno"
    ? "/aluno.png"
    : user && user.role === "educador"
      ? "/educador.png"
      : "/aluno.png";

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto">
      {/* topo: avatar + info + logout */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={avatarSrc}
            alt="avatar"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/brain.png"; }}
            className="w-12 h-12 rounded-xl object-cover shadow-sm"
          />
          <div>
            <h2 className="text-lg font-semibold">Menu</h2>
            <div className="text-sm text-gray-600">{topLabel}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-yellow-300 text-black text-xs font-semibold px-2 py-1 rounded-full">
            Acesso Gratuito
          </span>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 rounded border bg-white hover:bg-gray-50"
            >
              Sair
            </button>
          ) : (
            <Link to="/login" className="text-sm px-3 py-1 rounded border bg-white hover:bg-gray-50">
              Entrar
            </Link>
          )}
        </div>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Jogos — disponível para todos */}
        <Link
          to="/jogos"
          className="card hover:shadow-md transition-shadow rounded-lg p-4 flex flex-col items-start gap-2"
          aria-label="Ir para Jogos"
        >
          <div className="text-lg font-medium">Jogos</div>
          <div className="text-sm text-gray-500">Escolha um jogo e comece a praticar</div>
        </Link>

        {/* Meus relatórios — só para aluno */}
        {user && user.role === "aluno" && (
          <Link
            to="/relatorio"
            className="card hover:shadow-md transition-shadow rounded-lg p-4 flex flex-col items-start gap-2"
          >
            <div className="text-lg font-medium">Meus relatórios</div>
            <div className="text-sm text-gray-500">Acompanhe seu desempenho individual</div>
          </Link>
        )}

        {/* Opções para educador */}
        {user && user.role === "educador" && (
          <>
            <Link
              to="/relatorio-turma" /* criar rota depois */
              className="card hover:shadow-md transition-shadow rounded-lg p-4 flex flex-col items-start gap-2"
            >
              <div className="text-lg font-medium">Relatórios da Turma</div>
              <div className="text-sm text-gray-500">Veja o desempenho agregado por turma</div>
            </Link>

            <Link
              to="/gerenciar-turmas" /* criar rota depois */
              className="card hover:shadow-md transition-shadow rounded-lg p-4 flex flex-col items-start gap-2"
            >
              <div className="text-lg font-medium">Gerenciar turmas</div>
              <div className="text-sm text-gray-500">Cadastrar/atribuir alunos e gerar convites</div>
            </Link>
          </>
        )}

        {/* Se convidado — encorajar login e mostrar que relatórios não serão salvos */}
        {(!user || user.role === "guest") && (
          <>
            <div className="card rounded-lg p-4 flex flex-col items-start gap-2 bg-yellow-50 border border-yellow-100">
              <div className="text-lg font-medium">Modo Convidado</div>
              <div className="text-sm text-gray-700">
                Você pode jogar sem entrar, porém seus resultados não serão vinculados a uma turma.
              </div>
            </div>

            <Link
              to="/login"
              className="card hover:shadow-md transition-shadow rounded-lg p-4 flex flex-col items-start gap-2"
            >
              <div className="text-lg font-medium">Entrar / Registrar</div>
              <div className="text-sm text-gray-500">Acesse recursos de educador ou vincule-se a uma turma</div>
            </Link>
          </>
        )}
      </div>

      {/* rodapé breve de ajuda */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          Dica: Educadores podem gerar logins/turmas e fornecer IDs aos alunos — assim os resultados aparecerão
          nos relatórios da turma. Em caso de dúvida, use a aba <strong>Contato</strong> no menu principal.
        </p>
      </div>
    </div>
  );
}

