import { useState, useEffect } from "react";
import CategoryCard from "../../components/CategoryCard";
import { Link } from "react-router-dom";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/category') 
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false); 
            })
            .catch(error => console.log('Erro categorias:', error));
    }, []);

    if (loading) {
        return <div className="flex justify-center mt-10 h-[100vh] w-full">Carregando...</div>;
    }

    return (
        <>
            <main className="max-w-[1100px] flex flex-col md:flex-row justify-center m-auto p-6 gap-4">
                <div className="flex flex-wrap gap-4 lg:gap-8 justify-items-start justify-evenly">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Link to={`/produtos?category=${category.name}`} key={category.id}>
                                <CategoryCard category={category}></CategoryCard>
                            </Link>
                        ))
                    ) : (
                        <p>Sem categorias</p>
                    )}
                </div>
            </main>
        </>
    );
}
