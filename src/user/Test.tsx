import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Test = () => {

    const [username , setUsername] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if(token){
            const userData = jwtDecode(token);
            console.log(userData);
            setUsername(userData.sub+"");
        }

    }, []);

    return (
        <div>
            <h1>Test</h1>
            <p>{username}</p>
        </div>
    )
}
export default Test;