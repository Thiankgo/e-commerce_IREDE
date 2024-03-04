export default function Pedido({ pedido }) {

    return (
        <>
            <div className="flex flex-col md:flex-row w-full">
                <div className="p-2 w-[210px] flex">
                    <img src={pedido?.image} alt={pedido?.name} className="w-[80px] h-[70px] rounded-lg object-cover" />
                    <div className="p-2 w-full">
                        <h3 className="font-[600] text-[14px] black">{`${pedido?.name} Qnt: ${pedido?.quantity}`}</h3>
                        <p className="text-stone-500 text-[10px] font-[600]">{pedido?.category}</p>
                        <h4 className="font-[600] text-[12px] text-orange-500 mt-1">R$ {pedido?.price.toFixed(2).toLocaleString()}</h4>
                    </div>
                </div>
                <div className="flex md:flex-col text-[14px] justify-between md:justify-center">
                    <p className="md:hidden">Status:</p>
                    <p className="font-[600] text-orange-500 md:absolute md:right-[45px] text-wrap">Aguardando pagamento</p>
                </div>
            </div>
        </>
    )
}