import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { CartDialogContext } from "../../context/CartDialogContext"

export default function Product({ product }) {
    const { cart, setCart } = useContext(CartContext)
    const { setShowCart } = useContext(CartDialogContext)

    function handleBuyProduct(e) {
        e.preventDefault()
        const existingCartItemIndex = cart.findIndex(item => item.key === product.key)

        if (existingCartItemIndex !== -1) {
            const updatedCart = cart.map((item, index) => {
                if (index === existingCartItemIndex) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item
            })
            setCart(updatedCart)
        } else {
            const newCartItem = {
                key: product.key,
                name: product.name,
                image: product.image,
                price: product.price,
                category: product.category,
                quantity: 1 
            }
            setCart([...cart, newCartItem])
        }

        setShowCart(true)
    }

    return (
        <Link to={`/produtos/${product.key}`}>
            <div className="w-[144px] h-[208px] shadow-md rounded">
                <img src={product.image} alt={product.name} className="w-40 h-[96px]" />
                <div className="p-2">
                    <h3 className="font-[700] text-[18px] text-blue-900">{product.name}</h3>
                    <p className="text-gray-300 text-[12px] font-[500]">{product.category}</p>
                    <h4 className="font-[600] text-[16px] text-orange-500">R$ {product.price.toLocaleString()}</h4>
                    <button onClick={handleBuyProduct} className="px-2 bg-blue-900 text-slate-100 text-[12px] rounded">Comprar</button>
                </div>
            </div>
        </Link>
    )
}
