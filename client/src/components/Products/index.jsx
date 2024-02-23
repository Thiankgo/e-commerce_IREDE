import Product from "../Product"
import ProductImage from "../../assets/productimage.png"
import { Link } from "react-router-dom"

export default function Products({ products }) {
    let products1 = [
        { key: 1, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 2, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
    ]
    return (
        <section className="max-w-[1100px] flex justify-center m-auto">
            <div className="p-3 flex flex-wrap gap-1 w-[100%] justify-items-start">
                <h1 className="w-[100%] font-[600] text-[20px] text-blue-900">Destaques</h1>
                <div className="flex flex-wrap gap-1 lg:gap-8 justify-items-start">
                    {
                        products1?.length > 0 ?
                            products1.map((p) => (
                                <Link to={`/products/${p.key}`}>
                                    <Product product={p} key={p.key}></Product>
                                </Link>
                            ))
                            : <p>Sem produtos</p>
                    }
                </div>
            </div>
        </section>
    )
}