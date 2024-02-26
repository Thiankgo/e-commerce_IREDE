import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import CartProvider from './context/CartContext.jsx'
import CartDialogProvider from './context/CartDialogContext.jsx'
import MenuDialogProvider from './context/MenuDialogContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <MenuDialogProvider>
            <CartDialogProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </CartDialogProvider>
        </MenuDialogProvider>
    </AuthProvider>
)
