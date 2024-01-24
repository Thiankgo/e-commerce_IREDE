import Logo from "../../assets/logo.png"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-center bg-blue-900 text-slate-100 text-[10px] p-4">
            <section className="flex flex-wrap border-b pb-4 gap-8">
                <div>
                    <img src={Logo} alt="Logo Irede" className="mb-4" />
                    <div className="flex justify-between">
                        <a href="http://">
                            <FaFacebook className="w-4 h-4" />
                        </a>
                        <a href="http://">
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a href="http://">
                            <FaWhatsapp className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                <div className=" w-[180px]">
                    <p className="font-[400] ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi molestiae consectetur doloremque laudantium quia</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className=" font-[600]">Informações</h4>
                    <a href="">Sobre o E-Rede Store</a>
                    <a href="">Segurança</a>
                    <a href="">Lista de desejos</a>
                    <a href="">Trabalhe Conosco</a>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className=" font-[600]">Informações</h4>
                    <a href="">Tênis</a>
                    <a href="">Camiseta</a>
                    <a href="">Acessórios</a>
                    <a href="">Esportivo</a>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className=" font-[600]">Localização</h4>
                    <p>Rua Martinho Rodrigues, 331</p>
                    <p>Bairro de Fátima, Fortaleza-CE</p>
                </div>
            </section>
            <div className="w-[100%]">
            <p className="mt-4 text-center">2023 Irede</p>

            </div>
        </footer>
    )
}