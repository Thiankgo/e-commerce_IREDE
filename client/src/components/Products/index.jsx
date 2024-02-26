import Product from "../Product"

export default function Products({ products }) {
    return (
        <div className="flex flex-wrap gap-1 lg:gap-8 justify-items-start">
            {products?.length > 0 ? (
                products.map((p) => (
                    <Product key={p.key} product={p}></Product>
                ))
            ) : (
                <p className=" m-auto">Sem produtos</p>
            )}
        </div>
    )
}