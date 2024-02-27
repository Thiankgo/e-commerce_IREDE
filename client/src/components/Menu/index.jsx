import { useContext, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { MenuDialogContext } from "../../context/MenuDialogContext"
import { AuthContext } from "../../context/AuthContext";

export default function Menu() {
    const [validToken, setValidToken] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const { showMenu } = useContext(MenuDialogContext)
    const { pathname } = useLocation()
    const ref = useRef()

    useEffect(() => {
        setValidToken(auth.token !== "")
    }, [auth.token]);

    useEffect(() => {
        if (showMenu) {
            ref.current?.show()
        } else {
            ref.current?.close()
        }
    }, [showMenu])

    if (pathname.match("/cadastrar") || pathname.match("/login")) {
        return null
    }

    return (
        <dialog ref={ref} className=" lg:hidden fixed top-1/4 m-auto flex flex-row backdrop:opacity-25 rounded-lg">
            <div className=" align-top w-[280px] px-6 py-4 flex flex-col overflow-hidden" style={{ display: showMenu ? "block" : "none" }}>
                <div className="font-[600] text-[16px] text-stone-900 mb-4">Páginas</div>
                <div className=" flex flex-col gap-2 py-2 border-y-[1px] border-stone-900 font-[600] text-[12px] text-stone-500">
                    <Link to="/">
                        <button className={"h-[38px] w-full text-left px-4 rounded-md" + (pathname === "/" ? " bg-slate-100 text-orange-500" : "")}>Home</button>
                    </Link>
                    <Link to="/produtos">
                        <button className={"h-[38px] w-full text-left px-4 rounded-md" + (pathname.match("/produtos") ? " bg-slate-100 text-orange-500" : "")}>Produtos</button>
                    </Link>
                    <Link to="/categorias">
                        <button className={"h-[38px] w-full text-left px-4 rounded-md" + (pathname.match("/categorias") ? " bg-slate-100 text-orange-500" : "")}>Categorias</button>
                    </Link>
                    <Link to="/meus-pedidos">
                        <button className={"h-[38px] w-full text-left px-4 rounded-md" + (pathname.match("/meus-pedidos") ? " bg-slate-100 text-orange-500" : "")}>Meus Pedidos</button>
                    </Link>
                </div>
                <div className="mt-5 font-[600] text-[12px] flex">
                    {
                        validToken
                            ?
                            <>
                                <img src={auth?.avatar} alt="" className=" h-[30px] rounded-full" />
                                <p className="h-[30px] text-stone-500 my-auto text-center justify-center p-[6px] mr-1">Olá, {auth?.name.split(' ')[0]}</p>
                                <button onClick={() => (logout())} className="h-[30px] w-[50%] text-white bg-blue-900 rounded font-[400]">Logout</button>
                            </>
                            :
                            <>
                                <Link to="/cadastrar" className="h-[30px] w-[50%] text-stone-500 text-center p-2">Cadastre-se</Link>
                                <Link to="/login" className="h-[30px] w-[50%] text-white bg-blue-900 rounded font-[400] text-center p-2">Login</Link>
                            </>
                    }
                </div>
            </div>
        </dialog>
    )
}
