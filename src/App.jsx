import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pedidos from './pages/Pedidos'
import Footer from './components/Footer'
import Header from './components/Header'
function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meus-pedidos" element={<Pedidos />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
