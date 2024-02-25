import Pedidos from "../../components/Pedidos"
import ProductImage from "../../assets/productimage.png"
import { IoMdArrowDropdown } from "react-icons/io"

export default function PedidosPage() {
    let pedidos1 = [
        { key: 1, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis", status: "Finalizado" },
        { key: 2, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis", status: "Aguardando pagamento" },
        { key: 3, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis", status: "Finalizado" },
    ]
    return (
        <>
            <main className="max-w-[1100px] flex flex-col md:flex-row justify-center m-auto p-6 gap-4">
                <button className="block md:hidden relative bg-orange-500 font-[600] text-slate-100 rounded-lg w-[100%] h-[48px] max-w-[270px] mx-auto">Meus pedidos
                    <IoMdArrowDropdown className="absolute w-8 h-8 right-[5%] top-[20%] m-auto" />
                </button>
                <div className="hidden md:block w-[250px] rounded text-orange-500 p-2">
                    <h2 className="text-orange-500 font-semibold text-[16px] mb-2">Meus Pedidos</h2>
                    <div className="h-px bg-gray-400 mb-2"></div>
                    <h2 className="text-gray-600 font-semibold text-[16px]">Minhas Informações</h2>
                </div>
                <div className="bg-slate-100 p-3 flex flex-wrap gap-1 w-[100%] justify-items-start rounded-lg">
                    <h1 className="w-[100%] font-[600] text-[16px] text-black">Meus Pedidos</h1>
                    <Pedidos pedidos={pedidos1}></Pedidos>
                </div>
            </main>
        </>
    )
}