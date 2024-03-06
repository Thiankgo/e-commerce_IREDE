import Pedido from "../../components/Pedido"

export default function Pedidos({pedidos}) {
    return (
        <>
            <div className="flex flex-wrap gap-1 lg:gap-8 w-full justify-center mx-auto md:mx-0">
                {
                    pedidos?.length > 0 ?
                        pedidos.map((p) => (
                            <Pedido pedido={p} key={p.id}></Pedido>
                        ))
                        : 
                        <p className=" m-auto">Sem pedidos</p>
                    }
            </div>
        </>
    )
}