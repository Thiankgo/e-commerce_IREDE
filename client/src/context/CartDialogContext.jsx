import { createContext, useState } from "react";

export const CartDialogContext = createContext(false)

export default function CartDialogProvider({ children }) {
    const [showCart, setShowCart] = useState(false)

    return (
        <CartDialogContext.Provider value={{ showCart: showCart, setShowCart: setShowCart }}>
            {children}
        </CartDialogContext.Provider>
    )
}