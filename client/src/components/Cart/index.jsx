import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CartCard from "../CartCard";
import { CartContext } from "../../context/CartContext";
import { CartDialogContext } from "../../context/CartDialogContext";

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const { showCart, setShowCart } = useContext(CartDialogContext);
    const ref = useRef();
    const { pathname } = useLocation();

    useEffect(() => {
        if (showCart) {
            ref.current?.show();
        } else {
            ref.current?.close();
        }
    }, [showCart]);

    function handleEmpty(e) {
        e.preventDefault();
        setCart([]);
    }

    function handleFinish(e) {
        e.preventDefault();
        // TODO Handle finish purchase
    }

    if (pathname.match("/cadastrar") || pathname.match("/login")) {
        return null;
    }

    let totalValue = cart.reduce((acc, val) => {
        return acc + val.price * val.quantity;
    }, 0);

    return (
        <dialog ref={ref} className="absolute top-1/4 m-auto flex flex-row backdrop:opacity-25 rounded-lg">
            <div className="align-top w-[280px] px-6 py-4 flex flex-col overflow-hidden" style={{ display: showCart ? "block" : "none" }}>
                <div className="font-[600] text-[16px] text-stone-900 mb-4">Meu Carrinho</div>
                <div className="overflow-y-scroll overflow-x-hidden min-h-[50px] max-h-[320px] border-y-[1px] border-stone-900">
                    {cart?.length > 0 ? (
                        cart.map((p) => <CartCard cartCard={p} key={p.key} />)
                    ) : (
                        <p className="flex justify-center my-4">Sem produtos</p>
                    )}
                </div>
                <div className="font-[600] text-[16px] flex flex-row my-2">
                    Valor total:
                    <div className="ml-2 text-blue-900">R$ {totalValue.toFixed(2)}</div>
                </div>
                <div className="mt-1 font-[600] text-[12px]">
                    <button onClick={handleEmpty} className="h-[30px] w-[50%] text-stone-500">
                        Esvaziar
                    </button>
                    <button onClick={handleFinish} className="h-[30px] w-[50%] text-white bg-blue-900 rounded font-[400]">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </dialog>
    );
}
