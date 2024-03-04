import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import Products from "../../components/Products";
import ProductImage from "../../assets/productimage.png";

export default function Home() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/products') 
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.log('Erro produtos:', error));
    }, [])

    return (
        <>
            <Banner />
            <section className="max-w-[1100px] flex justify-center m-auto">
                <div className="p-3 flex flex-wrap gap-1 w-full justify-items-start">
                    <h1 className="w-full font-[600] text-[20px] text-blue-900">Destaques</h1>
                    <Products products={products} />
                </div>
            </section>
        </>
    );
}
