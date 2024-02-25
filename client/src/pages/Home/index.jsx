import Banner from "../../components/Banner"
import Products from "../../components/Products"

export default function Home() {
    return (
        <>
            <Banner />
            <section className="max-w-[1100px] flex justify-center m-auto">
                <div className="p-3 flex flex-wrap gap-1 w-[100%] justify-items-start">
                    <h1 className="w-[100%] font-[600] text-[20px] text-blue-900">Destaques</h1>
                    <Products />
                </div>
            </section>
        </>
    )
}