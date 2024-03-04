import { Link, useLocation, useNavigate } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Container({ children }) {
    const [validToken, setValidToken] = useState(false)
    const { auth } = useContext(AuthContext)
    const { pathname } = useLocation()

    var showHeaderFooter = !(pathname.match("/cadastrar") || pathname.match("/login"))

    useEffect(() => {
        setValidToken(auth.token !== "")
    }, [auth.token])

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
                {

                    (!validToken && pathname.match("/meus-pedidos"))
                        ?
                        <>
                            <div className="flex justify-center p-10 text-[24px] font-[500]">
                                <h1>Faça <Link className=" text-orange-500 font-[600]" to="/login">Login</Link> ou <Link className=" text-orange-500 font-[600]" to="/cadastrar">Cadastre-se</Link> para ver seus pedidos</h1>
                            </div>
                        </>
                        : children
                }
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