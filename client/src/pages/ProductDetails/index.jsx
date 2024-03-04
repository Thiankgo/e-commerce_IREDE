import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductImage from "../../assets/productimage.png"
import { CartContext } from '../../context/CartContext'
import { CartDialogContext } from '../../context/CartDialogContext'

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const { cart, setCart } = useContext(CartContext)
    const { setShowCart } = useContext(CartDialogContext)

    useEffect(() => {
        setTimeout(() => {
            const fetchedProduct = {
                id: parseInt(id),
                name: "a",
                category: "Tênis",
                price: 24.99,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget nunc eget ligula ullamcorper rutrum. Nam vitae ex et nisl luctus venenatis. Integer ut sem vestibulum, congue mauris ac, suscipit odio. Aenean accumsan urna at dolor venenatis suscipit. Nullam non elit id felis suscipit pharetra.",
                image: ProductImage,
                quantity: 10
            }
            setProduct(fetchedProduct)
        }, 500)
    }, [id])

    function handleBuy() {
        const existingCartItemIndex = cart.findIndex(item => item.id === product.id)
        if (existingCartItemIndex !== -1) {
            const updatedCart = cart.map((item, index) => {
                if (index === existingCartItemIndex) {
                    if (!isNaN(quantity)) {
                        if( item.quantity + quantity > product.quantity){
                            alert(`Só existem mais ${product.quantity - item.quantity} produtos disponíveis!`)
                        } else return { ...item, quantity: Math.min(product.quantity, item.quantity + quantity) }
                    } else {
                        alert("Selecione uma quantidade")
                    }
                }
                return item
            })
            setCart(updatedCart)
        } else {
            if (!isNaN(quantity)) {
                const newCartItem = {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    category: product.category,
                    quantity: quantity
                }
                setCart([...cart, newCartItem])
            } else {
                alert("Selecione uma quantidade")
            }
        }

        setShowCart(!isNaN(quantity))
    }

    const handleQuantityChange = (event) => {
        var newQuantity = parseInt(event.target.value)
        setQuantity(Math.min(product.quantity, newQuantity))
    }

    if (!product) {
        return <div className=" flex justify-center mt-10 h-[100vh] w-full" >Carregando...</div>
    }

    return (
        <div className="max-w-[1000px] mx-auto p-5 my-4">
            <div className="flex flex-col md:flex-row bg-slate-100 shadow rounded shadow-gray-400 p-5">
                <div className="w-full md:w-1/2 md:max-w-[340px] text-[24px] ">
                    <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
                    <p className="hidden md:block text-blue-900 font-[600] mb-2">Quantidade disponível:</p>
                    <p className="hidden md:block text-stone-500 font-[500]">{product.quantity} itens disponíveis</p>
                </div>
                <div className="md:w-2/3 md:ml-6 text-stone-500 text-[16px] md:text-[24px] font-[500]">
                    <h2 className="text-[24px] md:text-[40px] font-[600] text-blue-900 mb-2">{product.name}</h2>
                    <div className="flex gap-4">
                        <p className="mb-4">{product.category}</p>
                        <p className="mb-4">R$ {product.price.toLocaleString()}</p>
                    </div>
                    <p className="text-[14px] md:text-[24px]">{product.description}</p>
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex flex-row sm:flex-col justify-center mt-4 mr-4 px-auto">
                            <label className="mr-2 my-auto text-black font-[600]">Quantidade:</label>
                            <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="border-black border rounded-md px-2 py-1 w-[85px] h-[45px] sm:h-[40px] text-black text-center" />
                        </div>
                        <button onClick={handleBuy} className="bg-blue-900 w-full h-[60px] sm:h-[80px] text-white px-4 py-2 rounded-md mt-4">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
