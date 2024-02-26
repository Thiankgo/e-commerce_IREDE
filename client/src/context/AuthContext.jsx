import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        email: '',
        avatar: '',
        nome: '',
        id: '',
        token: ''
    });

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            setAuth(JSON.parse(savedAuth));
        }
    }, []);

    function login(email, avatar, nome, id, token) {
        const newAuth = { email, avatar, nome, id, token };
        setAuth(newAuth);
        localStorage.setItem('auth', JSON.stringify(newAuth));
    }

    function logout() {
        setAuth({
            email: '',
            avatar: '',
            nome: '',
            id: '',
            token: ''
        });
        localStorage.removeItem('auth');
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
