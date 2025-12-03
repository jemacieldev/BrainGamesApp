// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("aluno"); // "aluno" ou "educador"
  const [error, setError] = useState("");

  const [aluno, setAluno] = useState({
    id: "",
    turma: "",
    email: "",
    senha: ""
  });

  const [educador, setEducador] = useState({
    id: "",
    nome: "",
    email: "",
    senha: ""
  });

  function handleChange(e, who) {
    const { name, value } = e.target;
    if (who === "aluno") setAluno(prev => ({ ...prev, [name]: value }));
    else setEducador(prev => ({ ...prev, [name]: value }));
  }

  function persistUser(userObj) {
    localStorage.setItem("bg_current_user", JSON.stringify(userObj));
  }

  function validateAluno(a) {
    if (!a.id.trim()) return "Informe o ID do aluno.";
    if (!a.turma.trim()) return "Informe a turma (ex: 3A).";
    if (!a.senha.trim()) return "Informe a senha.";
    return null;
  }

  function validateEducador(e) {
    if (!e.nome.trim()) return "Informe o nome do educador.";
    if (!e.email.includes("@")) return "Informe um e-mail válido.";
    if (!e.senha.trim()) return "Informe a senha.";
    return null;
  }

  function handleAlunoSubmit(ev) {
    ev.preventDefault();
    setError("");
    const v = validateAluno(aluno);
    if (v) { setError(v); return; }

    const user = {
      role: "aluno",
      id: aluno.id.trim(),
      turma: aluno.turma.trim(),
      email: aluno.email?.trim() || "",
      loggedAt: new Date().toISOString()
    };

    persistUser(user);
    navigate("/menu");
  }

  function handleEducadorSubmit(ev) {
    ev.preventDefault();
    setError("");
    const v = validateEducador(educador);
    if (v) { setError(v); return; }

    const user = {
      role: "educador",
      id: educador.id?.trim() || null,
      nome: educador.nome.trim(),
      email: educador.email.trim(),
      loggedAt: new Date().toISOString()
    };

    persistUser(user);
    navigate("/menu");
  }

  function enterAsGuest() {
    const user = {
      role: "guest",
      loggedAt: new Date().toISOString()
    };
    persistUser(user);
    navigate("/menu");
  }

  // imagem que aparece no topo (muda por aba). Arquivos esperados em public/images/
  const topImageSrc = tab === "aluno"
    ? "/public/aluno.webp"
    : "/public/educador.webp";

  // fallback caso não exista
  const fallback = "/brain.png";

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* imagem circular no topo */}
      <div className="flex justify-center mb-6">
        <img
          src={topImageSrc}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
          alt={tab === "aluno" ? "Aluno" : "Educador"}
          className="w-28 h-28 rounded-2xl sm:rounded-full object-cover shadow-md"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Entrar</h1>

        <div className="flex gap-2">
          <button
            onClick={() => { setTab("aluno"); setError(""); }}
            className={`px-3 py-1 rounded ${tab === "aluno" ? "bg-yellow-300 text-black font-semibold" : "bg-gray-100"}`}
            aria-pressed={tab === "aluno"}
          >
            Aluno
          </button>

          <button
            onClick={() => { setTab("educador"); setError(""); }}
            className={`px-3 py-1 rounded ${tab === "educador" ? "bg-yellow-300 text-black font-semibold" : "bg-gray-100"}`}
            aria-pressed={tab === "educador"}
          >
            Educador
          </button>
        </div>
      </div>

      {error && <div role="alert" className="mb-4 text-red-600 font-medium">{error}</div>}

      {tab === "aluno" ? (
        <form onSubmit={handleAlunoSubmit} className="space-y-4" aria-label="Formulário de login aluno">
          <label className="block">
            <span className="text-sm font-medium">ID do aluno</span>
            <input
              name="id"
              value={aluno.id}
              onChange={(e) => handleChange(e, "aluno")}
              placeholder="Ex: 20251234"
              className="w-full border p-2 rounded mt-1"
              aria-required="true"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Turma</span>
            <input
              name="turma"
              value={aluno.turma}
              onChange={(e) => handleChange(e, "aluno")}
              placeholder="Ex: 3A"
              className="w-full border p-2 rounded mt-1"
              aria-required="true"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">E-mail (opcional)</span>
            <input
              name="email"
              value={aluno.email}
              onChange={(e) => handleChange(e, "aluno")}
              placeholder="seu@exemplo.com"
              type="email"
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Senha</span>
            <input
              name="senha"
              value={aluno.senha}
              onChange={(e) => handleChange(e, "aluno")}
              placeholder="••••••"
              type="password"
              className="w-full border p-2 rounded mt-1"
              aria-required="true"
            />
          </label>

          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary px-4 py-2 rounded">Entrar como Aluno</button>
            <button type="button" onClick={enterAsGuest} className="px-4 py-2 rounded border">Entrar sem login (Convidado)</button>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Observação: para que seus resultados sejam vinculados à turma e apareçam nos relatórios, o educador deve disponibilizar o login/turma. Em modo convidado os jogos funcionam normalmente, mas sem registro nos relatórios.
          </p>
        </form>
      ) : (
        <form onSubmit={handleEducadorSubmit} className="space-y-4" aria-label="Formulário de login educador">
          <label className="block">
            <span className="text-sm font-medium">ID do educador (opcional)</span>
            <input
              name="id"
              value={educador.id}
              onChange={(e) => handleChange(e, "educador")}
              placeholder="ID (se houver)"
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Nome</span>
            <input
              name="nome"
              value={educador.nome}
              onChange={(e) => handleChange(e, "educador")}
              placeholder="Nome completo"
              className="w-full border p-2 rounded mt-1"
              aria-required="true"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">E-mail profissional</span>
            <input
              name="email"
              value={educador.email}
              onChange={(e) => handleChange(e, "educador")}
              placeholder="seu@escola.org"
              type="email"
              className="w-full border p-2 rounded mt-1"
              aria-required="true"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Senha</span>
            <input
              name="senha"
              value={educador.senha}
              onChange={(e) => handleChange(e, "educador")}
              placeholder="••••••"
              type="password"
              className="w-full border p-2 rounded mt-1"
              aria-required="true"
            />
          </label>

          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary px-4 py-2 rounded">Entrar como Educador</button>
            <button type="button" onClick={enterAsGuest} className="px-4 py-2 rounded border">Entrar sem login (Convidado)</button>
          </div>
        </form>
      )}
    </div>
  );
}

