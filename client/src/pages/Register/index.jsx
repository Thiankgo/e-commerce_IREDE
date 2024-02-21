import Logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'

export default function Register() {


    function handleRegister(e) {
        e.preventDefault()
    }

    function handleUser(e) {

    }

    return (
        <main className="h-[100vh] w-[100%] flex flex-row">
            <div className="flex flex-col h-[100%] w-[100%] md:w-[50vw] bg-blue-900 md:bg-slate-100 items-center md:justify-center">
                <img src={Logo} alt="Logo E-Commece IREDE" className="w-[72px] h-[28px] my-8 block md:hidden" />

                <div className="flex flex-col w-[95%] max-w-[450px] mx-auto p-4 justify-center bg-white">
                    <h1 className=" text-[24px] font-[600] text-black text-center my-2">Cadastre-se</h1>
                    <form onSubmit={handleRegister} className=" flex flex-col">
                        <label htmlFor="name" className=" text-[16px] font-[600] text-black ml-2 mb-2">
                            Nome:*
                        </label>
                        <input onChange={handleUser} type="text" name="name" id="name" placeholder="Digite seu nome" className="w-full px-4 py-2 rounded-md bg-slate-100 text-stone-500 mb-4" />
                        <label htmlFor="email" className=" text-[16px] font-[600] text-black ml-2 mb-2">
                            E-mail:*
                        </label>
                        <input onChange={handleUser} type="email" name="email" id="email" placeholder="Digite seu e-mail" className="w-full px-4 py-2 rounded-md bg-slate-100 text-stone-500 mb-4" />
                        <label htmlFor="password" className=" text-[16px] font-[600] text-black ml-2 mb-2">
                            Senha:*
                        </label>
                        <input onChange={handleUser} type="password" name="password" id="password" placeholder="Digite sua senha" className="w-full px-4 py-2 rounded-md bg-slate-100 text-stone-500 mb-4" />
                        <button type="submit" className="w-[260px] h-[60px] bg-orange-500 text-[16px] text-white font-[600] mx-auto rounded-md">Cadastrar</button>
                    </form>
                    <div className="font-[400] text-[16px] gap-2 mx-auto text-black flex flex-row">
                        Já possui cadastro? <Link to="/login" className="text-orange-500"> Clique aqui!</Link>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center md:w-[50vw]  h-[100%] bg-blue-900">
                <h1 className=" max-w-[390px] w-[100%] text-[32px] text-white font-[400]">Sua nova experiência em compras online</h1>
                <img src={Logo} alt="Logo E-Commece IREDE" className="w-[383px]" />
            </div>
        </main>
    )
}