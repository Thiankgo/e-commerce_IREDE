import Product from "../Product"
import ProductImage from "../../assets/productimage.png"

export default function Products({ products }) {
    let products1 = [
        { key: 1, name: "a", image: ProductImage, price: 24.99, category:"Tênis" },
        { key: 2, name: "a", image: ProductImage, price: 24.99, category:"Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category:"Tênis" },
    ]
    return (
        <section className="p-2 flex flex-wrap gap-1 justify-center justify-items-start">
            {
                products1?.length > 0 ?
                    products1.map((p) => (
                        <Product product={p} key={p.key}></Product>
                    ))
                :<p>Sem produtos</p>
            }
        </section>
    )
}