import Pedidos from "../../components/Pedidos"
import ProductImage from "../../assets/productimage.png"
import { IoMdArrowDropdown } from "react-icons/io"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function PedidosPage() {
    const { auth } = useContext(AuthContext)
    const [pedidos, setPedidos] = useState([])
    const [window, setWindow] = useState("Meus Pedidos")

    useEffect(() => {
        fetch(`http://localhost:3000/items?email=${auth.email}`) 
            .then(response => response.json())
            .then(data => {
                setPedidos(data)
            })
            .catch(error => console.log('Erro ao buscar pedidos:', error))
    }, [])

    return (
        <>
            <main className="max-w-[1100px] flex flex-col md:flex-row  m-auto p-6 gap-4">
                <div className="flex flex-col md:hidden  mx-auto mb-[16px] w-full">
                    <div className="relative w-full h-[48px] max-w-[270px] mx-auto">
                        <select name="category" id="category" value={window} onChange={(e) => setWindow(e.target.value)} className=" appearance-none text-center bg-orange-500 font-[600] text-slate-100 rounded-lg w-full h-full">
                            <option value="Meus Pedidos" className=" h-[40px] inline-flex items-center font-[600] text-[16px] text-black white bg-white "> Meus Pedidos </option>
                            <option value="Minhas Informações" className=" h-[40px] inline-flex items-center font-[600] text-[16px] text-black white bg-white "> Minhas Informações </option>
                        </select>
                        <IoMdArrowDropdown className="absolute w-8 h-8 right-[5%] top-[20%] m-auto text-white pointer-events-none" />
                    </div>
                </div>
                <div className="hidden md:flex flex-col bg-slate-100 w-[250px] h-[85px] rounded text-orange-500 p-2">
                    <button value="Meus Pedidos" onClick={(e) => setWindow(e.target.value)} className={(window === "Meus Pedidos" ? "text-orange-500" : "text-gray-600") + " font-semibold text-[16px] mb-2 text-left"}>Meus Pedidos</button>
                    <div className="h-px bg-gray-400 mb-2"></div>
                    <button value="Minhas Informações" onClick={(e) => setWindow(e.target.value)} className={(window !== "Meus Pedidos" ? "text-orange-500" : "text-gray-600") + " font-semibold text-[16px] text-left"}> Minhas Informações</button>
                </div>
                <div className="bg-slate-100 px-6 pt-3 flex flex-wrap gap-1 w-full justify-items-start rounded-lg">
                    {
                        window !== "Meus Pedidos" ?
                            <>
                                <div className="flex flex-row w-full justify-between my-2 font-[600] text-[16px] text-stone-500">
                                    <h1>Minhas Informações</h1>
                                </div>
                                <img src={auth?.avatar} className="h-[144px] mx-auto md:mx-0 rounded-full" />
                                <div className="flex flex-row w-full justify-between my-2 font-[600] text-[14px] text-stone-500">
                                    <h2>Nome</h2>
                                    <h2>{auth?.name}</h2>
                                </div>
                                <div className="flex flex-row w-full justify-between my-2 font-[600] text-[14px] text-stone-500">
                                    <h2>Email</h2>
                                    <h2>{auth?.email}</h2>
                                </div>
                            </>
                            :
                            <>
                                <div className="flex flex-row w-full justify-between my-2 font-[600] text-[16px] text-stone-500">
                                    <h1>Meus Pedidos</h1>
                                    <h2 className=" hidden md:block font-[500]">Status Meus Pedidos</h2>
                                </div>
                                <Pedidos pedidos={pedidos}></Pedidos>
                            </>
                    }

                </div>
            </main >
        </>
    )
}