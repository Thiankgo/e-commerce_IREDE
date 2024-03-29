export default function Pedido({ pedido }) {

    return (
        <>
            <div className="flex flex-col md:flex-row w-full justify-between">
                <div className="p-2 w-[230px] flex">
                    <img src={pedido?.image} alt={pedido?.name} className="w-[80px] h-[80px] rounded-lg object-fill" />
                    <div className="p-2 w-full">
                        <h3 className="font-[600] text-[14px] black">#{pedido?.id} {pedido?.name}</h3>
                        <p className="text-stone-500 text-[10px] font-[600]">{pedido?.category} Qnt: {pedido?.quantity}</p>
                        <h4 className="font-[600] text-[12px] text-orange-500 mt-1">R$ {pedido?.price.toFixed(2).toLocaleString()}</h4>
                    </div>
                </div>
                <div className="flex md:flex-col text-[14px] justify-between md:justify-center">
                    <p className="md:hidden">Status:</p>
                    <p className="font-[600] text-orange-500 text-wrap">Aguardando pagamento</p>
                </div>
            </div>
        </>
    )
}