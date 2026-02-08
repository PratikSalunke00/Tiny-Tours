import { useEffect } from "react";
import { setPageTitle } from "../utils.jsx";

function Login() {
    useEffect(() => {
      setPageTitle("Login - TinyTours");
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default Login
