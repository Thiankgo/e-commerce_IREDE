import Pedido from "../../components/Pedido"
import ProductImage from "../../assets/productimage.png"

export default function Pedidos() {
    let pedidos1 = [
        { key: 1, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis" , status:"Finalizado"},
        { key: 2, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis" , status:"Finalizado"},
        { key: 3, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis" , status:"Finalizado"},
    ]
    return (
        <main className="max-w-[1100px] flex flex-col justify-center m-auto p-6 gap-4">
            <button className="bg-orange-500 font-[600] text-slate-100 rounded-lg w-[100%] h-[48px] max-w-[270px] mx-auto">Meus pedidos</button>
            <div className="bg-slate-100 p-3 flex flex-wrap gap-1 w-[100%] justify-items-start rounded-lg">
                <h1 className="w-[100%] font-[600] text-[16px] text-black">Meus Pedidos</h1>
                <div className="flex flex-wrap gap-1 lg:gap-8 justify-items-start">
                    {
                        pedidos1?.length > 0 ?
                            pedidos1.map((p) => (
                                <Pedido pedido={p} key={p.key}></Pedido>
                            ))
                            : <p>Sem produtos</p>
                    }
                </div>
            </div>
        </main>
    )
}