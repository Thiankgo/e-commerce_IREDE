import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import Logo from "../../assets/logo.png";
import { MenuDialogContext } from "../../context/MenuDialogContext";
import { CartDialogContext } from "../../context/CartDialogContext";
import { AuthContext } from "../../context/AuthContext";
import SearchBar from "../SearchBar";

export default function Header() {
    const [validToken, setValidToken] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const { showCart, setShowCart } = useContext(CartDialogContext);
    const { showMenu, setShowMenu } = useContext(MenuDialogContext);
    const { pathname } = useLocation();

    useEffect(() => {
        setValidToken(auth.token !== "")
    }, [auth.token]);

    function handleMenu(e) {
        e.preventDefault();
        if (!showMenu) setShowCart(false);
        setShowMenu(!showMenu);
    }

    function handleShoppingCart(e) {
        e.preventDefault();
        if (!showCart) setShowMenu(false);
        setShowCart(!showCart);
    }

    return (
        <header>
            <div className="header-mobile h-[140px] bg-blue-900">
                <div className="w-full h-[100%] m-auto flex p-8 flex-col justify-between align-middle">
                    <div className="flex justify-between">
                        <button onClick={handleMenu} className="w-6 h-6 pl-1">
                            <GiHamburgerMenu className="fill-white scale-150" />
                        </button>
                        <img src={Logo} alt="Logo E-Commerce IREDE" className="w-[72px] h-[28px]" />
                        <button onClick={handleShoppingCart} className="w-6 h-6 pl-1">
                            <MdOutlineShoppingCart className="fill-white scale-150" />
                        </button>
                    </div>
                    <SearchBar />
                </div>
            </div>
            <div className="header-browser h-[190px] bg-blue-900">
                <div className="w-full h-[100%] m-auto flex p-8 flex-col justify-between align-middle">
                    <div className="flex justify-between">
                        <img src={Logo} alt="Logo E-Commerce IREDE" className="w-[72px] h-[28px]" />
                        <SearchBar />
                        {
                            validToken
                                ?
                                <>
                                    <img src={auth?.avatar} alt="" className="w-[45px] h-[45px] rounded-full"/>
                                    <p className="text-[16px] font-[600] w-[120px] h-[40px] text-slate-100 mr-4 text-center p-2">Olá, {auth?.name.split(' ')[0]}</p>
                                    <button onClick={() => (logout())} className="mr-4 text-[16px] font-[600] rounded w-[120px] h-[40px] text-slate-100 bg-orange-500 text-center p-2">Logout</button>
                                </>
                                :
                                <>
                                    <Link to="/cadastrar" className="text-[16px] font-[600] w-[120px] h-[40px] text-slate-100 mr-4 text-center p-2">Cadastre-se</Link>
                                    <Link to="/login" className="mr-4 text-[16px] font-[600] rounded w-[120px] h-[40px] text-slate-100 bg-orange-500 text-center p-2">Entrar</Link>
                                </>
                        }
                        <button onClick={handleShoppingCart} className="w-6 h-6 pl-1 relative">
                            <MdOutlineShoppingCart className="fill-white scale-150 absolute left-2" />
                        </button>
                    </div>
                    <div className="mt-8 flex justify-center gap-8 text-[16px] font-[600] text-zinc-50">
                        <Link className={pathname === "/" ? "text-orange-500" : ""} to="/">Home</Link>
                        <Link className={pathname.match("/produtos") ? "text-orange-500" : ""} to="/produtos">Produtos</Link>
                        <Link className={pathname.match("/categorias") ? "text-orange-500" : ""} to="/categorias">Categorias</Link>
                        <Link className={pathname.match("/meus-pedidos") ? "text-orange-500" : ""} to="/meus-pedidos">Meus Pedidos</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
