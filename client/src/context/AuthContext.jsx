import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        email: '',
        avatar: '',
        name: '',
        id: '',
        token: ''
    });

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            setAuth(JSON.parse(savedAuth));
        }
    }, []);

    function login(email, avatar, name, id, token) {
        const newAuth = { email, avatar, name, id, token };
        setAuth(newAuth);
        localStorage.setItem('auth', JSON.stringify(newAuth));
    }

    function logout() {
        setAuth({
            email: '',
            avatar: '',
            name: '',
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
