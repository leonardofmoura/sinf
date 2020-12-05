import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

const IndexPage = () => {
    const [cookies, ] = useCookies(['loginState']);

    if (cookies.loginState) {
        return <Redirect to="/inventory" />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default IndexPage;