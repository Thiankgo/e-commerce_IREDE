import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Products from "../../components/Products"
import ProductImage from "../../assets/productimage.png"
import { IoMdArrowDropdown } from "react-icons/io"


export default function ProductsPage() {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const location = useLocation()

    useEffect(() => {
        setTimeout(() => {
            const mockCategories = [
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
            setCategories(mockCategories)
        }, 400)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const mockProducts = [
                { key: 1, name: "Tênis 1", image: ProductImage, price: 24.99, category: "Tênis" },
                { key: 2, name: "Sapatos 1", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 3, name: "Sandálias 1", image: ProductImage, price: 19.99, category: "Sandálias" },
                { key: 4, name: "Sapatos 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 5, name: "Sapatos 3", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 6, name: "Sapatos 4", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 7, name: "Sapatos 5", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 8, name: "Produto 6", image: ProductImage, price: 29.99, category: "Botas" },
                { key: 9, name: "Produto 7", image: ProductImage, price: 29.99, category: "Botas" },
                { key: 10, name: "Produto 8", image: ProductImage, price: 29.99, category: "Botas" },
                { key: 11, name: "Produto 9", image: ProductImage, price: 29.99, category: "Botas" },
            ]

            setProducts(mockProducts)
        }, 400)
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const querySearch = searchParams.get('search')
        if (querySearch) {
            setSearch(querySearch)
        }
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const queryCategory = searchParams.get('category')
        console.log(queryCategory)
        const categoryExists = categories.some(cat => cat.name === queryCategory)
        console.log(categoryExists)

        if (queryCategory && categoryExists) {
            setCategory(queryCategory)
        }
    }, [categories])

    const handleCategoryChange = (c) => {
        if (c !== category) setCategory(c)
        else setCategory("")
    }

    var filteredProducts = category ? products.filter(product => product.category === category) : products
    filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    console.log(filteredProducts)
    return (
        <>
            <section className="max-w-[1100px] py-10 flex flex-col md:flex-row justify-center mx-auto">
                <div className="flex flex-col md:hidden  mx-auto mb-[16px] w-full">
                    <div className="relative w-full h-[48px] max-w-[270px] mx-auto">
                        <select name="category" id="category" onChange={(e) => handleCategoryChange(e.target.value)} className=" appearance-none text-center bg-orange-500 font-[600] text-slate-100 rounded-lg w-full h-full">
                            <option value="" className=" h-[40px] inline-flex items-center font-[600] text-[16px] text-black white bg-white "> Todos os Produtos </option>
                            {
                                categories?.map((c) => (
                                    <option value={c.name} className=" h-[40px] inline-flex items-center font-[600] text-[16px]  text-black bg-white mx-auto"> {c.name} </option>
                                ))
                            }
                        </select>
                        <IoMdArrowDropdown className="absolute w-8 h-8 right-[5%] top-[20%] m-auto text-white" />
                    </div>
                </div>

                <div className=" p-4">
                    <div className={`hidden md:flex flex-col gap-2 w-[250px] shadow-md shadow-stone-300 rounded text-orange-500 p-[16px] `}>
                        {
                            categories?.length > 0
                                ?
                                categories.map((c) => (
                                    <label key={c.key} className=" h-[40px] inline-flex items-center font-[600] text-[16px] text-stone-500 rounded hover:bg-slate-100">
                                        <input type="radio" name="category" value={c.name} checked={category === c.name} onChange={() => { }} onClick={() => handleCategoryChange(c.name)} className="form-radio h-[12px] w-[12px] appearance-none" />
                                        <span className={`${category === c.name ? 'bg-orange-500' : ''} inline-block h-3 w-3 rounded-full border border-gray-400 mr-4`}  ></span>
                                        <span className={category === c.name ? "text-orange-500" : ""}>{c.name}</span>
                                    </label>
                                ))
                                :
                                <p className=" m-auto">Carregando...</p>
                        }
                    </div>
                </div>
                <div className="p-3  md:w-3/4">
                    <Products products={filteredProducts} />
                </div>
            </section>
        </>
    )
}
