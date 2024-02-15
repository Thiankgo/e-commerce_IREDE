export default function Register() {


    function handleRegister(e) {
        e.preventDefault()
    }

    function handleUser(e) {
       
    }

    return (
        <main className="">
            <div>
                <div>
                    <h1>Cadastre-se</h1>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="name">
                            Nome:*
                            <input onChange={handleUser} type="text" name="name" id="name" placeholder="Digite seu nome" />
                        </label>
                        <label htmlFor="email">
                            E-mail:*
                            <input onChange={handleUser} type="email" name="email" id="email" placeholder="Digite seu e-mail" />
                        </label>
                        <label htmlFor="password">
                            Senha:*
                            <input onChange={handleUser} type="password" name="password" id="password" placeholder="Digite sua senha" />
                        </label>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
            <div></div>
        </main>
    )
}