import { setAutoToken } from "../../jasmin/token";
import { sendJasminRequest } from "../../jasmin/request"

setAutoToken();
sendJasminRequest("/sales/orders", "get").then((response) => {console.log(response.data)});

//getToken().then(token => {console.log(token)})


export default function PendingPicking() {

    return (    
        <span></span>
    )
}