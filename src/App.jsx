import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pedidos from './pages/Pedidos'
import Category from './pages/Category'
import Register from './pages/Register'
import Login from './pages/Login'
import Footer from './components/Footer'
import Header from './components/Header'
import Dialog from './components/Menu'
import { useState } from 'react'
function App() {
  const [showModal, setShowModal] = useState(true)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meus-pedidos" element={<Pedidos />} />
          <Route path="/categorias" element={<Category />} />
          <Route path="/meu-carrinho" element={<Category />} />
          <Route path="/cadastrar" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Dialog showModal={showModal} setShowModal={setShowModal}/>

      </BrowserRouter>
    </>
  )
}

export default App
