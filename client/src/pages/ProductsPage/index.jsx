import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Products from "../../components/Products";
import ProductImage from "../../assets/productimage.png"
import { IoMdArrowDropdown } from "react-icons/io";

export default function ProductsPage() {
    const categories = [
        { key: 1, name: "Tênis"},
        { key: 2, name: "Chinelos"},
        { key: 3, name: "Botas"},
        { key: 4, name: "Sapatos"},
        { key: 5, name: "Sandálias"},
        { key: 6, name: "Sapatênis"},
        { key: 7, name: "Pantufas"},
        { key: 8, name: "Sapatos Sociais"},
        { key: 9, name: "Tênis de Corrida"},
        { key: 10, name: "Sapatos Casuais"},
        { key: 11, name: "Sapatos de Festa"},
        { key: 12, name: "Sapatos de Trabalho"}
    ];

    let products1 = [
        { key: 1, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 2, name: "a", image: ProductImage, price: 24.99, category: "Tênis" },
        { key: 3, name: "a", image: ProductImage, price: 24.99, category: "Tênis" }
    ]

    const location = useLocation();
    const [category, setCategory] = useState(categories[0]?.name);

    const handleCategoryChange = (c) => {
        setCategory(c);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryCategory = searchParams.get('category');
        const categoryExists = categories.some(cat => cat.name === queryCategory);
        if (queryCategory && categoryExists) {
            setCategory(queryCategory);
        }
    }, [location.search]);

    return (
        <>
            <section className="max-w-[1100px] flex flex-col md:flex-row justify-center mx-auto py-[32px]">
                <button className="block md:hidden relative bg-orange-500 font-[600] text-slate-100 rounded-lg w-[100%] h-[48px] max-w-[270px] mx-auto mb-[16px]">{category}
                    <IoMdArrowDropdown className="absolute w-8 h-8 right-[5%] top-[20%] m-auto" />
                </button>
                <div className=" p-4">
                    <div className="hidden md:flex flex-col gap-4 w-[250px] shadow-md shadow-stone-300 rounded text-orange-500 p-[16px]">
                        {
                            categories.map((c) => (
                                <label key={c.key} className="inline-flex items-center font-[600] text-[16px] text-stone-500">
                                    <input type="radio" name="category" value={c.name} checked={category === c.name} onChange={() => handleCategoryChange(c.name)} className="form-radio h-[12px] w-[12px] appearance-none" />
                                    <span className={`${category === c.name ? 'bg-orange-500' : ''} inline-block h-3 w-3 rounded-full border border-gray-400 mr-4`}  ></span>
                                    <span className={category === c.name ? "text-orange-500" : ""}>{c.name}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className="p-3 flex flex-wrap gap-1 w-[100%] justify-items-start">
                    <Products products={products1}/>
                </div>
            </section>
        </>
    )
}
