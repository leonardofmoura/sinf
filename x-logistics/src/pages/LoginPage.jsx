import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";
import Login from '../components/login/Login/Login';

const LoginPage = () => {

    const [, setCookie] = useCookies(['loginState']);
    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setCookie('loginState', true, { path: '/' });
        setLogin(true);
    }

    if (login) {
        return <Redirect to="/inventory" />
    } else {
        return <Login onClick={handleLogin} />
    }
}

export default LoginPage;