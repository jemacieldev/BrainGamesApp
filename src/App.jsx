import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Jogos from './pages/Jogos'
import Jogo from './pages/Jogo'
import Resultado from './pages/Resultado'
import Relatorio from './pages/Relatorio'

export default function App(){
  const [results, setResults] = useState(() => {
    try {
      const s = localStorage.getItem('bg_results')
      return s ? JSON.parse(s) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bg_results', JSON.stringify(results))
  }, [results])

  function registerResult(entry){
    setResults(prev => [...prev, entry])
  }

  function clearResults(){
    setResults([])
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/jogos' element={<Jogos />} />
            <Route path='/jogo/:id' element={<Jogo registerResult={registerResult} />} />
            <Route path='/resultado' element={<Resultado results={results} clearResults={clearResults} />} />
            <Route path='/relatorio' element={<Relatorio results={results} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
