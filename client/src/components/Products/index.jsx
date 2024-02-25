import Product from "../Product"
import ProductImage from "../../assets/productimage.png"
import { Link } from "react-router-dom"

export default function Products({ products }) {
    let products1 = [
        { key: 1, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 2, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
    ]
    return (
        <div className="flex flex-wrap gap-1 lg:gap-8 justify-center">
            {products1?.length > 0 ? (
                products1.map((p) => (
                    <Link to={`/products/${p.key}`} key={p.key}>
                        <Product product={p}></Product>
                    </Link>
                ))
            ) : (
                <p>Sem produtos</p>
            )}
        </div>
    )
}