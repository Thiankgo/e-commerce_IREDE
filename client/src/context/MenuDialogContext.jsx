import { createContext, useState } from "react";

export const MenuDialogContext = createContext(false)

export default function MenuDialogProvider({ children }) {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <MenuDialogContext.Provider value={{ showMenu: showMenu, setShowMenu: setShowMenu }}>
            {children}
        </MenuDialogContext.Provider>
    )
}