import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Products from "../../components/Products";
import ProductImage from "../../assets/productimage.png";
import { IoMdArrowDropdown } from "react-icons/io";

function CategoriesDialog({ categories, category, setCategory, showDropdown, setShowDropdown }) {
    const ref = useRef();

    useEffect(() => {
        if (showDropdown) {
            ref.current.show();
        } else {
            ref.current.close();
        }
    }, [showDropdown]);

    const handleCategoryChange = (c) => {
        if (c !== category) setCategory(c);
        else setCategory("");
    };

    return (
        <dialog ref={ref} className="md:hidden absolute top-1/4 mt-[6px] m-auto flex">
            <div className={`rounded-md flex flex-col gap-4 w-[250px] shadow-md shadow-stone-300 text-orange-500 p-[16px] ${showDropdown ? 'block' : 'hidden'}`}>
                {categories.map((c) => (
                    <label key={c.key} className="inline-flex items-center font-[600] text-[16px] text-stone-500">
                        <input type="radio" name="category" value={c.name} checked={category === c.name} onChange={() => { }} onClick={() => handleCategoryChange(c.name)} className="form-radio h-[12px] w-[12px] appearance-none" />
                        <span className={`${category === c.name ? 'bg-orange-500' : ''} inline-block h-3 w-3 rounded-full border border-gray-400 mr-4`}  ></span>
                        <span className={category === c.name ? "text-orange-500" : ""}>{c.name}</span>
                    </label>
                ))}
            </div>
        </dialog>
    );
}

export default function ProductsPage() {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

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
            ];
            setCategories(mockCategories);
        }, 400); 
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const mockProducts = [
                { key: 1, name: "Produto 1", image: ProductImage, price: 24.99, category: "Tênis" },
                { key: 2, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 3, name: "Produto 3", image: ProductImage, price: 19.99, category: "Sandálias" },
                { key: 4, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
            ];

            setProducts(mockProducts);
        }, 400);
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryCategory = searchParams.get('category');
        const categoryExists = categories.some(cat => cat.name === queryCategory);
        if (queryCategory && categoryExists) {
            setCategory(queryCategory);
        }
    }, [location.search]);

    const handleCategoryChange = (c) => {
        if (c !== category) setCategory(c);
        else setCategory("");
    };

    const filteredProducts = category ? products.filter(product => product.category === category) : products;

    return (
        <>
            <section className="max-w-[1100px] flex flex-col md:flex-row justify-center mx-auto py-[32px]">
                <button onClick={() => setShowDropdown(!showDropdown)} className="block md:hidden relative bg-orange-500 font-[600] text-slate-100 rounded-lg w-[100%] h-[48px] max-w-[270px] mx-auto mb-[16px]">
                    {category !== "" ? category : "Todos os produtos"}
                    <IoMdArrowDropdown className="absolute w-8 h-8 right-[5%] top-[20%] m-auto" />
                </button>
                <div className=" p-4">
                    <div className={`hidden md:flex flex-col gap-4 w-[250px] shadow-md shadow-stone-300 rounded text-orange-500 p-[16px] ${showDropdown ? 'block' : 'hidden'}`}>
                        {categories.map((c) => (
                            <label key={c.key} className="inline-flex items-center font-[600] text-[16px] text-stone-500">
                                <input type="radio" name="category" value={c.name} checked={category === c.name} onChange={() => { }} onClick={() => handleCategoryChange(c.name)} className="form-radio h-[12px] w-[12px] appearance-none" />
                                <span className={`${category === c.name ? 'bg-orange-500' : ''} inline-block h-3 w-3 rounded-full border border-gray-400 mr-4`}  ></span>
                                <span className={category === c.name ? "text-orange-500" : ""}>{c.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="p-3 w-full md:w-3/4">
                    <Products products={filteredProducts} />
                </div>
            </section>
            <CategoriesDialog categories={categories} category={category} setCategory={setCategory} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
        </>
    );
}
