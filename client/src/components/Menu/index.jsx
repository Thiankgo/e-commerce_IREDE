import { useContext, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { MenuDialogContext } from "../../context/MenuDialogContext"

export default function Menu() {
    const { showMenu, setShowMenu } = useContext(MenuDialogContext)
    const { pathname } = useLocation()

    const ref = useRef()

    function handleMenu(e) {
        e.preventDefault()
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        if (showMenu) {
            ref.current.show()
        } else {
            ref.current.close()
        }
    }, [showMenu])

    return (
        <dialog ref={ref} className=" absolute top-1/4 m-auto flex backdrop:opacity-25 rounded-lg">
            <div className=" min-w-[280px] px-6 py-4 flex flex-col" style={{ display: showMenu ? "block" : "none" }}>
                <div className="font-[600] text-[16px] text-stone-900 mb-4">Páginas</div>
                <div className=" border-y-[1px] border-stone-900  font-[600] text-[12px] text-stone-500">
                    <Link to="/">
                        <button className={"h-[42px] w-[100%] text-left px-4 rounded-md" + (pathname == "/" ? " bg-slate-100 text-orange-500" : "")}
                        >Home</button>
                    </Link>
                    <Link to="/produtos">
                        <button className={"h-[42px] w-[100%] text-left px-4 rounded-md" + (pathname.match("/produtos") ? " bg-slate-100 text-orange-500" : "")}
                        >Produtos</button>
                    </Link>
                    <Link to="/categorias">
                        <button className={"h-[42px] w-[100%] text-left px-4 rounded-md" + (pathname.match("/categorias") ? " bg-slate-100 text-orange-500" : "")}
                        >Categorias</button>
                    </Link>
                    <Link to="/meus-pedidos">
                        <button className={"h-[42px] w-[100%] text-left px-4 rounded-md" + (pathname.match("/meus-pedidos") ? " bg-slate-100 text-orange-500" : "")}
                        >Categorias</button>
                    </Link>
                </div>
                <div className=" mt-5 font-[600] text-[12px]">
                    <Link to="/cadastrar">
                        <button className="h-[30px] w-[50%] text-stone-500">Cadastre-se</button>
                    </Link>
                    <Link to="/login">
                        <button className="h-[30px] w-[50%] text-white bg-blue-900 rounded font-[400]">Login</button>
                    </Link>
                </div>
            </div>

        </dialog>
    )
}