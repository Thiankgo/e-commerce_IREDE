import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pedidos from './pages/Pedidos'
import Category from './pages/Category'
import Register from './pages/Register'
import Footer from './components/Footer'
import Header from './components/Header'
function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meus-pedidos" element={<Pedidos />} />
          <Route path="/categorias" element={<Category />} />
          <Route path="/meu-carrinho" element={<Category />} />
          <Route path="/cadastrar" element={<Register />} />
          <Route path="/login" element={<Register />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
