import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdSearch } from "react-icons/io"
import { MdOutlineShoppingCart } from "react-icons/md"
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { MenuDialogContext } from "../../context/MenuDialogContext"
import { CartDialogContext } from "../../context/CartDialogContext"
import { useContext, useState } from "react"

export function SearchBar() {
    const [searchText, setSearchText] = useState('');

    function handleSearch(e) {
        if (e.key === 'Enter') {
            window.location.href = `/produtos?search=${encodeURIComponent(searchText)}`;
        }
    }

    return (
        <>
            <div className="flex lg:hidden align-middle w-[100%] max-w-[600px] relative mx-auto">
                <IoMdSearch className="fill-[#666666] absolute w-4 left-2 bottom-2" />
                <input placeholder="Buscar" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleSearch} className="h-[32px] w-[100%] pl-[28px] text-[#666666] text-[12px] font-[400] rounded" />
            </div>
            <div className="hidden lg:flex align-bottom w-[100%] max-w-[580px] relative mx-auto">
                <IoMdSearch className="fill-[#666666] absolute w-6 left-1 bottom-[14px]" />
                <input placeholder="Buscar" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleSearch} className="h-[44px] w-[100%] pl-[28px] text-[#666666] text-[16px] font-[400] rounded" />
            </div>
        </>
    );
}

export default function Header() {
    const { showCart, setShowCart } = useContext(CartDialogContext)
    const { showMenu, setShowMenu } = useContext(MenuDialogContext)

    const { pathname } = useLocation()

    function handleMenu(e) {
        e.preventDefault()
        if (showMenu === false) setShowCart(false)
        setShowMenu(!showMenu)
    }

    function handleShoppingCart(e) {
        e.preventDefault()
        if (showCart === false) setShowMenu(false)
        setShowCart(!showCart)
    }

    if (pathname.match("/cadastrar")
        || pathname.match("/login")) {
        return null
    }

    return (
        <header>
            <div className="header-mobile h-[140px] bg-blue-900 >">
                <div className="w-[100%] h-[100%] m-auto flex p-8 flex-col justify-between align-middle ">
                    <div className="flex justify-between">
                        <button onClick={handleMenu} className="w-6 h-6 pl-1">
                            <GiHamburgerMenu className="fill-white scale-150" ></GiHamburgerMenu>
                        </button>
                        <img src={Logo} alt="Logo E-Commece IREDE" className="w-[72px] h-[28px]" />
                        <button onClick={handleShoppingCart} className="w-6 h-6 pl-1">
                            <MdOutlineShoppingCart className="fill-white scale-150" ></MdOutlineShoppingCart>
                        </button>
                    </div>
                    <SearchBar />
                </div>
            </div>
            <div className="header-browser h-[190px] bg-blue-900 >">
                <div className="w-[100%] h-[100%] m-auto flex p-8 flex-col justify-between align-middle">
                    <div className="flex justify-between">
                        <img src={Logo} alt="Logo E-Commece IREDE" className="w-[72px] h-[28px]" />
                        <SearchBar />

                        <Link to="/cadastrar"> <button className=" text-[16px] font-[600] w-[120px] h-[40px] text-slate-100 mr-4" >Cadastre-se</button> </Link>
                        <Link to="/login" > <button className="mr-4 text-[16px] font-[600] rounded w-[120px] h-[40px] text-slate-100 bg-orange-500">Entrar</button> </Link>
                        <button onClick={handleShoppingCart} className="w-6 h-6 pl-1 relative">
                            <MdOutlineShoppingCart className="fill-white scale-150 absolute left-2" ></MdOutlineShoppingCart>
                        </button>
                    </div>
                    <div className=" mt-8 flex justify-center gap-8 text-[16px] font-[600] text-zinc-50">
                        <Link className={(pathname == "/" ? " text-orange-500" : "")}
                            to="/" >Home</Link>
                        <Link className={(pathname.match("/produtos") ? " text-orange-500" : "")}
                            to="/produtos">Produtos</Link>
                        <Link className={(pathname.match("/categorias") ? " text-orange-500" : "")}
                            to="/categorias">Categorias</Link>
                        <Link className={(pathname.match("/meus-pedidos") ? " text-orange-500" : "")}
                            to="/meus-pedidos">Meus Pedidos</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}