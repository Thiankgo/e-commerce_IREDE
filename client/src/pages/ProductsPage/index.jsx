import Products from "../../components/Products"
import { IoMdArrowDropdown } from "react-icons/io"

import React, { useState } from 'react';

export default function ProductsPage() {
    const categories = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'];

    const [category, setCategory] = useState("Tênis");

    const handleCategoryChange = (c) => {
        setCategory(c);
    };

    return (
        <>
            <section className="max-w-[1100px] flex flex-col md:flex-row justify-center mx-auto py-[32px]">
                <button className="block md:hidden relative bg-orange-500 font-[600] text-slate-100 rounded-lg w-[100%] h-[48px] max-w-[270px] mx-auto mb-[16px]">{category}
                    <IoMdArrowDropdown className="absolute w-8 h-8 right-[5%] top-[20%] m-auto" />
                </button>
                <div className=" p-4">

                    <div className="hidden md:flex flex-col gap-4 w-[250px] shadow-md shadow-stone-300 rounded text-orange-500 p-[16px]">
                        {
                            categories.map((c, index) => (
                                <label key={index} className="inline-flex items-center font-[600] text-[16px] text-stone-500">
                                    <input type="radio" name="category" value={c} checked={category === c} onChange={() => handleCategoryChange(c)} className="form-radio h-[12px] w-[12px] appearance-none" />
                                    <span className={`${category === c ? 'bg-orange-500' : ''} inline-block h-3 w-3 rounded-full border border-gray-400 mr-4`}  ></span>
                                    <span className={category === c ? "text-orange-500" : ""}>{c}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className="p-3 flex flex-wrap gap-1 w-[100%] justify-items-start">
                    <Products />
                </div>
            </section>
        </>
    )
}