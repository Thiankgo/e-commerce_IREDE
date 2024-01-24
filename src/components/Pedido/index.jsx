export default function Pedido({ pedido }) {

    return (
        <>
            <div className="p-2 w-[210px] flex">
                <img src={pedido?.image} alt={pedido?.name} className="w-[80px] h-[70px] rounded-lg" />
                <div className="p-2">
                    <h3 className="font-[600] text-[14px] black">{pedido?.name}</h3>
                    <p className="text-stone-500 text-[10px] font-[600]">{pedido?.category}</p>
                    <h4 className="font-[600] text-[12px] text-black mt-1">R$ {pedido?.price.toLocaleString()}</h4>
                </div>
            </div>
            <div className="flex w-[100%] justify-between pb-3 border-stone-500 border-b">
                <p>Status:</p>
                <p>{pedido?.status}</p>
            </div>
        </>
    )
}