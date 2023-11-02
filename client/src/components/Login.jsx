import { useState } from "react"
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("");

    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await AuthService.login(email, password).then(() => {
                navigate('/home');
                window.location.reload()
            }, (error) => {
              console.log(error)
            });
        } catch (error) {
            console.log(error);
        }
        
    }


    return (
      <>
        <div>Login</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </>
    );
}

export default Login