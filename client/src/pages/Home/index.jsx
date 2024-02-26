import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import Products from "../../components/Products";
import ProductImage from "../../assets/productimage.png";

export default function Home() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const mockProducts = [
                { key: 1, name: "Produto 1", image: ProductImage, price: 24.99, category: "Tênis" },
                { key: 2, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 3, name: "Produto 3", image: ProductImage, price: 19.99, category: "Sandálias" },
                { key: 4, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 5, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 6, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 7, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 8, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 9, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 10, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
                { key: 11, name: "Produto 2", image: ProductImage, price: 29.99, category: "Sapatos" },
            ];

            setProducts(mockProducts);
        }, 400);
    }, []);

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
