import Pedido from "../../components/Pedido"

export default function Pedidos({pedidos}) {
    return (
        <>
            <div className="flex flex-wrap gap-1 lg:gap-8 justify-items-start">
                {
                    pedidos?.length > 0 ?
                        pedidos.map((p) => (
                            <Pedido pedido={p} key={p.key}></Pedido>
                        ))
                        : 
                        <p className=" m-auto">Sem pedidos</p>
                    }
            </div>
        </>
    )
}