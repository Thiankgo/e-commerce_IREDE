import { useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import ProductImage from "../../assets/productimage.png"
import CartCard from "../CartCard";

export default function Cart({ showModal, setShowModal }) {
    const pathname = window.location.pathname;
    console.log(pathname)

    let carrinho = [
        { key: 1, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 2, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 4, name: "Nique Air Surf", image: ProductImage, price: 24.99, category: "Tênis" },
    ]

    let totalValue = carrinho.reduce((acc, val) => {
        return acc + val.price
      },0);

    const ref = useRef()

    function handleModal() {
        setShowModal(!showModal)
    }

    useEffect(() => {
        if (showModal) {
            ref.current?.showModal()
        } else {
            ref.current.close()
        }
    }, [showModal])

    function handleEmpty(){

    }

    return (
        <dialog ref={ref} className=" m-auto flex flex-row backdrop:opacity-25 rounded-lg">
            <div className=" align-top w-[280px] px-6 py-4 flex flex-col overflow-hidden" style={{ display: showModal ? "block" : "none" }}>
                <div className="font-[600] text-[16px] text-stone-900 mb-4">Meu Carrinho</div>
                <div className=" overflow-y-scroll overflow-x-hidden max-h-[320px] border-y-[1px] border-stone-900">
                    {
                        carrinho?.length > 0 ?
                            carrinho.map((p) => (
                                <CartCard cartCard={p} key={p.key}></CartCard>
                            ))
                            : <p>Sem produtos</p>
                    }
                </div>
                <div className="font-[600] text-[16px] flex flex-row my-2">
                    Valor total: 
                    <div className=" ml-2 text-blue-900">R$ {totalValue.toFixed(2)}</div>
                </div>
                <div className=" mt-1 font-[600] text-[12px]">
                    <button onClick={handleEmpty} className="h-[30px] w-[50%] text-stone-500">Esvaziar</button>
                    <button className="h-[30px] w-[50%] text-white bg-blue-900 rounded font-[400]">Finalizar Comprar</button>
                </div>
            </div>

        </dialog>
    )
}