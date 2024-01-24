import Logo from "../../assets/logo.png"

export default function Footer() {
    return (
        <footer className=" bg-blue-900 text-slate-100">
            <div>
                <img src={Logo} alt="Logo Irede" />
                <div>
                    <a href="http://">
                        {/* Facebook */}
                    </a>
                    <a href="http://">
                        {/* Instagram */}
                    </a>
                    <a href="http://">
                        {/* Whatsapp */}
                    </a>
                </div>
            </div>
            <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi molestiae consectetur doloremque laudantium quia</p>
            </div>
            <div>
                <h4>Informações</h4>
                <a href="">Sobre o E-Rede Store</a>
                <a href="">Segurança</a>
                <a href="">Lista de desejos</a>
                <a href="">Trabalhe Conosco</a>
            </div>
            <div>
                <h4>Informações</h4>
                <a href="">Tênis</a>
                <a href="">Camiseta</a>
                <a href="">Acessórios</a>
                <a href="">Esportivo</a>
            </div>
            <div>
                <p>Rua Martinho Rodrigues, 331
                    Bairro de Fátima, Fortaleza-CE
                </p>
            </div>
        </footer>
    )
}