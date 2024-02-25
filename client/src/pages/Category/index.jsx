import CategoryCard from "../../components/CategoryCard"
import ProductImage from "../../assets/productimage.png"
import { Link } from "react-router-dom"

export default function Category() {
    let categories = [
        { key: 1, name: "Tênis", image: ProductImage },
        { key: 2, name: "Chinelos", image: ProductImage },
        { key: 3, name: "Botas", image: ProductImage },
        { key: 4, name: "Sapatos", image: ProductImage },
        { key: 5, name: "Sandálias", image: ProductImage },
        { key: 6, name: "Sapatênis", image: ProductImage },
        { key: 7, name: "Pantufas", image: ProductImage },
        { key: 8, name: "Sapatos Sociais", image: ProductImage },
        { key: 9, name: "Tênis de Corrida", image: ProductImage },
        { key: 10, name: "Sapatos Casuais", image: ProductImage },
        { key: 11, name: "Sapatos de Festa", image: ProductImage },
        { key: 12, name: "Sapatos de Trabalho", image: ProductImage }
    ]

    return (
        <>
            <main className="max-w-[1100px] flex flex-col md:flex-row justify-center m-auto p-6 gap-4">
                <div className="flex flex-wrap gap-4 lg:gap-8 justify-items-start justify-evenly">
                    {
                        categories?.length > 0 ?
                            categories.map((category) => (
                                <Link to={`/produtos?category=${category.name}`} key={category.key}>
                                    <CategoryCard category={category}></CategoryCard>
                                </Link>
                            ))
                            : <p>Sem categorias</p>
                    }
                </div>
            </main>
        </>
    )
}
