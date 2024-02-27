import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PedidosPage from './pages/PedidosPage'
import Category from './pages/Category'
import Register from './pages/Register'
import Login from './pages/Login'
import Footer from './components/Footer'
import Header from './components/Header'
import Menu from './components/Menu'
import Cart from './components/Cart'
import ProductsPage from './pages/ProductsPage'
import ProductDetails from './pages/ProductDetails'

function App() {

  return (
    <>
      <div className='min-h-screen '>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/produtos/:id" element={<ProductDetails />} />
            <Route path="/meus-pedidos" element={<PedidosPage />} />
            <Route path="/categorias" element={<Category />} />
            <Route path="/cadastrar" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Cart />
          <Menu />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
