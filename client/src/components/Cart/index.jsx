import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../CartCard";
import { CartContext } from "../../context/CartContext";
import { CartDialogContext } from "../../context/CartDialogContext";
import { AuthContext } from "../../context/AuthContext";

export default function Cart() {
    const [validToken, setValidToken] = useState(false)
    const { auth } = useContext(AuthContext)
    const { cart, setCart } = useContext(CartContext);
    const { showCart, setShowCart } = useContext(CartDialogContext);
    const ref = useRef();
    const { pathname } = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        setValidToken(auth.token !== "")
    }, [auth.token])

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

        if (validToken) {
            if (cart.length > 0) {
                const email = auth.email;
                const sales = cart.map(item => ({
                    product: item.id,
                    quantity: item.quantity
                }));

                fetch('http://localhost:3000/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, sales })
                })
                    .then(response => {
                        if (response.ok) {
                            setCart([]);
                            navigate("/meus-pedidos");
                        } else {
                            throw new Error('Erro ao finalizar a compra');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao finalizar a compra:', error);
                    });
            } else {
                navigate("/produtos")
            }
        } else {
            navigate("/cadastrar")
        }
        // TODO Handle finish purchase
    }

    if (pathname.match("/cadastrar") || pathname.match("/login")) {
        return null;
    }

    let totalValue = cart.reduce((acc, val) => {
        return acc + val.price * val.quantity;
    }, 0);

    return (
        <dialog ref={ref} className="fixed top-1/4 m-auto flex flex-row backdrop:opacity-25 rounded-lg">
            <div className="align-top w-[280px] px-6 py-4 flex flex-col overflow-hidden" style={{ display: showCart ? "block" : "none" }}>
                <div className="font-[600] text-[16px] text-stone-900 mb-4">Meu Carrinho</div>
                <div className="overflow-y-scroll overflow-x-hidden min-h-[50px] max-h-[320px] border-y-[1px] border-stone-900">
                    {cart?.length > 0 ? (
                        cart.map((p) => <CartCard cartCard={p} key={p.id} />)
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
                    <button onClick={handleFinish} className={`h-[30px] w-[50%] ${cart.length > 0 ? "text-white bg-blue-900" : "bg-stone-200 text-blue-900"} rounded font-[400]`}>
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </dialog>
    );
}
