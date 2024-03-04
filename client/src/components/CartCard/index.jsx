export default function CartCard({ cartCard }) {
    return (
        <>
            <div className="p-2 w-full flex">
                <img src={cartCard?.image} alt={cartCard?.name} className="w-[80px] h-[70px] rounded-lg object-cover" />
                <div className="px-2">
                    <h3 className="font-[600] text-[14px] black">{cartCard?.name}</h3>
                    <p className="text-stone-500 text-[10px] font-[600]">{cartCard?.category}</p>
                    <h4 className="font-[600] text-[12px] text-black">R$ {cartCard?.price.toFixed(2).toLocaleString()}</h4>
                    <h4 className="font-[600] text-[12px] text-stone-500">Qtd: {cartCard?.quantity}</h4>
                </div>
            </div>
        </>
    )
}