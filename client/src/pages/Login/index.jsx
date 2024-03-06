import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/logo.png"
import { AuthContext } from '../../context/AuthContext'

export default function Login() {
    const navigate = useNavigate();
    const { auth, login } = useContext(AuthContext)
    const [formData, setFormData] = useState({ email: '', password: '' })

    useEffect(() => {
        if (auth.token){
            navigate("/")
        }
    }, [])

    function handleLogin(e) {
        e.preventDefault();

        const { email, password } = formData;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, avatar: 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' })
        })
            .then(response => {
                if (response.ok) return response.json();
                return response.json().then(response => { throw { ...response } })
            })
            .then(data => {
                const { id, token, avatar, name } = data;
                login(email, avatar, name, id, token)
                navigate(-1);
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                alert(error.message)
            });
    }


    function handleUser(e) {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <main className="h-[100vh] w-full flex flex-row">
            <div className="flex flex-col h-[100%] w-full md:w-[50vw] bg-blue-900 md:bg-slate-100 items-center md:justify-center">
                <Link to="/">
                    <img src={Logo} alt="Logo E-Commece IREDE" className="w-[72px] h-[28px] my-8 block md:hidden" />
                </Link>
                <div className="flex flex-col w-[95%] max-w-[450px] mx-auto p-4 justify-center bg-white">
                    <h1 className=" text-[24px] font-[600] text-black text-center my-2">Login</h1>
                    <form onSubmit={handleLogin} className=" flex flex-col">
                        <label htmlFor="email" className=" text-[16px] font-[600] text-black ml-2 mb-2">
                            E-mail:*
                        </label>
                        <input onChange={handleUser} type="email" name="email" id="email" placeholder="Digite seu e-mail" className="w-full px-4 py-2 rounded-md bg-slate-100 text-stone-500 mb-4" />
                        <label htmlFor="password" className=" text-[16px] font-[600] text-black ml-2 mb-2">
                            Senha:*
                        </label>
                        <input onChange={handleUser} type="password" name="password" id="password" placeholder="Digite sua senha" className="w-full px-4 py-2 rounded-md bg-slate-100 text-stone-500 mb-4" />
                        <button type="submit" className="w-[260px] h-[60px] bg-orange-500 text-[16px] text-white font-[600] mx-auto rounded-md">Fazer Login</button>
                    </form>
                    <div className="font-[400] text-[16px] gap-2 mx-auto text-black flex flex-row">
                        Não se cadastrou? <Link to="/cadastrar" className="text-orange-500"> Clique aqui!</Link>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center md:w-[50vw]  h-[100%] bg-blue-900">
                <h1 className=" max-w-[390px] w-full text-[32px] text-white font-[400]">Sua nova experiência em compras online</h1>
                <Link to="/">
                    <img src={Logo} alt="Logo E-Commece IREDE" className="w-[383px]" />
                </Link>
            </div>
        </main>
    )
}