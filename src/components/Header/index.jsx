import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

import Logo from "../../assets/logo.png"

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
        <header className="h-[140px] bg-blue-900 p-8 flex flex-col justify-between align-middle>">
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
        </header>
    )
}