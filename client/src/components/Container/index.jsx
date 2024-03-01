import { useLocation, useNavigate } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Container({ children }) {
    const [validToken, setValidToken] = useState(false)
    const { auth } = useContext(AuthContext)
    const { pathname } = useLocation()
    const  navigate  = useNavigate()

    var showHeaderFooter = !(pathname.match("/cadastrar") || pathname.match("/login"))

    useEffect(() => {
        setValidToken(auth.token !== "")
    }, [auth.token])

    if (!validToken) {
        if (pathname.match("/meus-pedidos")) {
            navigate("/cadastrar")
        }
    }

    return (
        <>
            {
                showHeaderFooter
                    ?
                    <Header />
                    :
                    ""
            }
            <div className={`${(showHeaderFooter ? "min-h-[90vh]" : "min-h-[100vh]")}`}>
                {children}
            </div>
            {
                showHeaderFooter
                    ?
                    <Footer />
                    :
                    ""
            }
        </>
    )
}