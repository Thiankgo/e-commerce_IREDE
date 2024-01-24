import BannerImage from "../../assets/banner.png"

export default function Banner() {
    function handleBannerOffer(e) {
        //console.log(e)
    }
    return (
        <section className="banner-img w-[100%] h-[354px] flex flex-col-reverse">
            <button onClick={handleBannerOffer} className="bg-orange-600 text-slate-100 font-[600] w-[70%] h-10 mx-auto mb-3">Aproveitar Oferta</button>
        </section>
    )
}