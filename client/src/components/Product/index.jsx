import { Link } from "react-router-dom"

export default function Product({ product }) {
    return (
        <Link to={`/produtos/${product.id}`}>
            <div className="w-[144px] h-auto max-h-[230px] shadow-md rounded">
                <img src={product.image} alt={product.name} className="w-[160px] h-[120px] object-cover" />
                <div className="p-2">
                    <h3 className="font-[700] text-[18px] text-blue-900">{product.name}</h3>
                    <p className="text-gray-300 text-[12px] font-[500]">{product.category}</p>
                    <h4 className="font-[600] text-[16px] text-orange-500">R$ {product.price.toFixed(2).toLocaleString()}</h4>
                </div>
            </div>
        </Link>
    )
}
