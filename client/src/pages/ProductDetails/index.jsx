import { useState } from 'react';
import ProductImage from "../../assets/productimage.png"

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1);

    const product = {
        name: "a",
        category: "Tênis",
        price: 24.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget nunc eget ligula ullamcorper rutrum. Nam vitae ex et nisl luctus venenatis. Integer ut sem vestibulum, congue mauris ac, suscipit odio. Aenean accumsan urna at dolor venenatis suscipit. Nullam non elit id felis suscipit pharetra.",
        image: ProductImage,
        quantity: 10 // Defina a quantidade disponível do produto aqui
    };

    const handleBuy = () => {
        console.log(`Comprando ${quantity} ${product.name}`);
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
    };

    return (
        <div className="max-w-[1000px] mx-auto p-5 my-4">
            <div className="flex flex-col md:flex-row shadow rounded shadow-gray-400 p-5">
                <div className="w-full md:w-1/2 md:max-w-[340px] text-[24px] ">
                    <img src={product.image} alt={product.name} className="w-[100%] h-auto mb-4" />
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
    );
}
