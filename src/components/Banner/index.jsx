import BannerImage from "../../assets/banner.png"
import BannerImageLg from "../../assets/banner2.png"

export default function Banner() {
    function handleBannerOffer(e) {
        //console.log(e)
    }
    return (
        <section className="relative w-[100%] flex flex-col-reverse">
            <img alt="" srcset="" className=" banner-img" />
            <div className="flex absolute w-[100%] bottom-4 justify-center">
                <button onClick={handleBannerOffer} className="bg-orange-600 text-slate-100 font-[600] w-[70%] max-w-[320px] max-h-[64px] h-10">Aproveitar Oferta</button>
            </div>
        </section>
    )
}