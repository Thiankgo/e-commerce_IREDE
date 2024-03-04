import { Link } from "react-router-dom"

export default function Banner() {
    return (
        <section className="relative w-full flex flex-col-reverse">
            <img alt="" srcSet="" className=" banner-img" />
            <Link to="/produtos/1">
                <button  className="absolute top-[80%] left-[50%] md:top-[50%] md:left-[82%] translate-x-[-50%] bg-orange-600 text-slate-100 font-[600] w-[70%] md:w-[30%] max-w-[320px] lg:h-[64px] h-10 text-[16px] lg:text-[20px] lg:rounded-md">Aproveitar Oferta</button>
            </Link>
        </section>
    )
}
