import CategoryCard from "../../components/CategoryCard"
import ProductImage from "../../assets/productimage.png"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

export default function Category() {
    let categorys = [
        { key: 1, name: "Tênis", image: ProductImage },
        { key: 2, name: "Tênis", image: ProductImage },
        { key: 3, name: "Tênis", image: ProductImage },
        { key: 4, name: "Tênis", image: ProductImage },
        { key: 5, name: "Tênis", image: ProductImage },
        { key: 6, name: "Tênis", image: ProductImage },
        { key: 7, name: "Tênis", image: ProductImage },
        { key: 8, name: "Tênis", image: ProductImage },
        { key: 9, name: "Tênis", image: ProductImage },
        { key: 10, name: "Tênis", image: ProductImage },
        { key: 11, name: "Tênis", image: ProductImage },
        { key: 12, name: "Tênis", image: ProductImage }
    ]
    return (
        <>
            <Header />
            <main className="max-w-[1100px] flex flex-col md:flex-row justify-center m-auto p-6 gap-4">
                <div className="flex flex-wrap gap-4 lg:gap-8 justify-items-start justify-evenly">
                    {
                        categorys?.length > 0 ?
                            categorys.map((c) => (
                                <CategoryCard category={c} key={c.key}></CategoryCard>
                            ))
                            : <p>Sem categorias</p>
                    }
                </div>
            </main>
            <Footer />
        </>
    )
}