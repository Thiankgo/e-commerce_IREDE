import Banner from "../../components/Banner"
import Products from "../../components/Products"
import ProductImage from "../../assets/productimage.png"

export default function Home() {
    let products1 = [
        { key: 1, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 2, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" }
    ]
    return (
        <>
            <Banner />
            <section className="max-w-[1100px] flex justify-center m-auto">
                <div className="p-3 flex flex-wrap gap-1 w-[100%] justify-items-start">
                    <h1 className="w-[100%] font-[600] text-[20px] text-blue-900">Destaques</h1>
                    <Products products={products1}/>
                </div>
            </section>
        </>
    )
}