import Logo from "../../assets/logo.png"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"
import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="footer1">
            <div className="flex flex-wrap justify-center bg-blue-900 text-slate-100 text-[10px] p-4">
                <section className="flex flex-wrap border-b pb-4 gap-8">
                    <div>
                        <img src={Logo} alt="Logo Irede" className="mb-4 w-[82px] h-[32px]" />
                        <div className="flex justify-between">
                            <Link to="/">
                                <FaFacebook className="w-4 h-4" />
                            </Link>
                            <Link to="/">
                                <FaInstagram className="w-4 h-4" />
                            </Link>
                            <Link to="/">
                                <FaWhatsapp className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <div className=" w-[180px]">
                        <p className="font-[400] ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi molestiae consectetur doloremque laudantium quia</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className=" font-[600]">Informações</h4>
                        <Link to="">Sobre o E-Rede Store</Link>
                        <Link to="">Segurança</Link>
                        <Link to="">Lista de desejos</Link>
                        <Link to="">Trabalhe Conosco</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className=" font-[600]">Informações</h4>
                        <Link to="/produtos?category=Tênis">Tênis</Link>
                        <Link to="/produtos?category=Camiseta">Camiseta</Link>
                        <Link to="/produtos?category=Acessórios">Acessórios</Link>
                        <Link to="/produtos?category=Esportivo">Esportivo</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className=" font-[600]">Localização</h4>
                        <p>Rua Martinho Rodrigues, 331</p>
                        <p>Bairro de Fátima, Fortaleza-CE</p>
                    </div>
                </section>
                <div className="w-full">
                    <p className="mt-4 text-center">2023 Irede</p>

                </div>
            </div>
        </footer>
    )
}