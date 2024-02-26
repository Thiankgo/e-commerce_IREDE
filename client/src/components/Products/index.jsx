import Product from "../Product"

export default function Products({ products }) {
    return (
        <div className="flex flex-wrap gap-1 lg:gap-8 justify-center">
            {products?.length > 0 ? (
                products.map((p) => (
                    <Product key={p.key} product={p}></Product>
                ))
            ) : (
                <p>Sem produtos</p>
            )}
        </div>
    )
}