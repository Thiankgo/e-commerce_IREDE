import { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import ProductImage from "../../assets/productimage.png"
import CartCard from "../CartCard";
import { CartContext } from "../../context/CartContext";

export default function Cart({ showModal, setShowModal }) {
    const { cart, setCart } = useContext(CartContext)

    let totalValue = cart.reduce((acc, val) => {
        return acc + (val.price * val.quantity)
    }, 0);

    const ref = useRef()

    function handleCart() {
        setShowModal(!showModal)
    }

    useEffect(() => {
        if (showModal) {
            ref.current?.showModal()
        } else {
            ref.current.close()
        }
    }, [showModal])

    function handleEmpty() {
        setCart([]); // Apaga todos os itens do carrinho
    }

    function handleFinish() {

    }

    return (
        <dialog ref={ref} className=" m-auto flex flex-row backdrop:opacity-25 rounded-lg">
            <div className=" align-top w-[280px] px-6 py-4 flex flex-col overflow-hidden" style={{ display: showModal ? "block" : "none" }}>
                <div className="font-[600] text-[16px] text-stone-900 mb-4">Meu Carrinho</div>
                <div className=" overflow-y-scroll overflow-x-hidden min-h-[80px] max-h-[320px] border-y-[1px] border-stone-900">
                    {
                        cart?.length > 0 ?
                            cart.map((p) => (
                                <CartCard cartCard={p} key={p.key}></CartCard>
                            ))
                            : <p className=" flex justify-center my-10">Sem produtos</p>
                    }
                </div>
                <div className="font-[600] text-[16px] flex flex-row my-2">
                    Valor total:
                    <div className=" ml-2 text-blue-900">R$ {totalValue.toFixed(2)}</div>
                </div>
                <div className=" mt-1 font-[600] text-[12px]">
                    <button onClick={handleEmpty} className="h-[30px] w-[50%] text-stone-500">Esvaziar</button>
                    <button onClick={handleFinish} className="h-[30px] w-[50%] text-white bg-blue-900 rounded font-[400]">Finalizar Comprar</button>
                </div>
            </div>

        </dialog>
    )
}
