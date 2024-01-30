import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

import Logo from "../../assets/logo.png"

export function SearchBar() {
    return (
        <div className="flex align-middle w-[100%] max-w-[600px] relative mx-auto">
            <IoMdSearch className="fill-[#666666] absolute w-4 left-2 bottom-2"  ></IoMdSearch>
            <input onKeyDown={handleSearch} placeholder="Buscar" type="text" className="h-[32px] w-[100%] pl-[28px] text-[#666666] text-[12px] font-[400] rounded" />
        </div>
    )
}

export default function Header() {
    function handleSearch(e) {
        if (e.key === "Enter") {
            //console.log(e)
        }
    }

    function handleMenu(e) {
        //console.log(e)
    }

    function handleShoppingCart(e) {
        //console.log(e)
    }

    return (
        <>
            <header className="header-mobile h-[140px] bg-blue-900 >">
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
                    <div className="flex align-middle w-[100%] max-w-[600px] relative mx-auto">
                        <IoMdSearch className="fill-[#666666] absolute w-4 left-2 bottom-2"  ></IoMdSearch>
                        <input onKeyDown={handleSearch} placeholder="Buscar" type="text" className="h-[32px] w-[100%] pl-[28px] text-[#666666] text-[12px] font-[400] rounded" />
                    </div>
                </div>
            </header>
            <header className="header-browser h-[190px] bg-blue-900 >">
                <div className="w-[100%] h-[100%] m-auto flex p-8 flex-col justify-between align-middle">
                    <div className="flex justify-between">
                        <img src={Logo} alt="Logo E-Commece IREDE" className="w-[72px] h-[28px]" />
                        <div className="flex align-middle w-[100%] max-w-[520px] relative mx-auto">
                            <IoMdSearch className="fill-[#666666] absolute w-6 left-1 bottom-[14px]"  ></IoMdSearch>
                            <input onKeyDown={handleSearch} placeholder="Buscar" type="text" className="h-[44px] w-[100%] pl-[28px] text-[#666666] text-[16px] font-[400] rounded" />
                        </div>
                        <button onClick={handleShoppingCart} className=" text-[16px] font-[600] w-[120px] h-[40px] text-slate-100 mr-4" >Cadastre-se</button>
                        <button onClick={handleShoppingCart} className="mr-4 text-[16px] font-[600] rounded w-[120px] h-[40px] text-slate-100 bg-orange-500">Entrar</button>
                        <button onClick={handleShoppingCart} className="w-6 h-6 pl-1 relative">
                            <MdOutlineShoppingCart className="fill-white scale-150 absolute left-2" ></MdOutlineShoppingCart>
                        </button>
                    </div>
                    <div className=" mt-8 flex justify-center gap-8 text-[16px] font-[600] text-zinc-50">
                        <a href="/" >Home</a>
                        <a href="/produtos">Produtos</a>
                        <a href="/categorias">Categorias</a>
                        <a href="/meus-pedidos">Meus Pedidos</a>
                    </div>
                </div>
            </header>
        </>
    )
}