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
        fetch('http://localhost:3000/category') 
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.log('Erro categorias:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/products') 
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.log('Erro produtos:', error));
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
        const categoryExists = categories.some(cat => cat.name === queryCategory)
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

    return (
        <>
            <section className="max-w-[1100px] py-10 flex flex-col md:flex-row justify-center mx-auto">
                <div className="flex flex-col md:hidden  mx-auto w-full">
                    <div className="relative w-full h-[48px] max-w-[270px] mx-auto">
                        <select name="category" id="category" onChange={(e) => handleCategoryChange(e.target.value)} className=" appearance-none text-center bg-orange-500 font-[600] text-slate-100 rounded-lg w-full h-full">
                            <option value="" className=" h-[40px] inline-flex items-center font-[600] text-[16px] text-black white bg-white "> Todos os Produtos </option>
                            {
                                categories?.map((c) => (
                                    <option value={c.name} className=" h-[40px] inline-flex items-center font-[600] text-[16px]  text-black bg-white mx-auto"> {c.name} </option>
                                ))
                            }
                        </select>
                        <IoMdArrowDropdown className="absolute w-8 h-8 right-[5%] top-[20%] m-auto text-white pointer-events-none" />
                    </div>
                </div>

                <div className=" p-2">
                    <button onClick={()=>{setCategory("");setSearch("");}} className={`text-orange-500 text-[16px] font-[600] px-4 py-2 ${search=="" && category==""? "hidden": "block"}`}>× Limpar Filtro</button>
                    <div className={`hidden md:flex flex-col gap-2 w-[250px] shadow-md shadow-stone-300 rounded text-orange-500 p-[16px] `}>
                        {
                            categories?.length > 0
                                ?
                                categories.map((c) => (
                                    <label key={c.id} className=" h-[40px] inline-flex items-center font-[600] text-[16px] text-stone-500 rounded hover:bg-slate-100">
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
