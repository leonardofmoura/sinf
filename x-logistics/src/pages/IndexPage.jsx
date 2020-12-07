import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";
import { setAutoToken} from "../jasmin/token";

const IndexPage = () => {
    setAutoToken();

    const [cookies, ] = useCookies(['loginState']);

    if (cookies.loginState) {
        return <Redirect to="/inventory" />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default IndexPage;