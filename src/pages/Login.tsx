import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../hooks/useToken";

type LoginDto = {
  email: string;
  password: string;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useToken();
  const navigate = useNavigate();

  async function handleLogin() {
    const loginDto: LoginDto = {
      email,
      password,
    };

    console.log(loginDto);
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        loginDto
      );

      console.log(res.data);
      setToken(res.data.token);
      
      navigate('/profile')
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-5 max-w-md mx-auto">
        <h1 className="text-xl text-center">Log in</h1>

        <input
          className="outline rounded p-2"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="outline rounded p-2"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="text-blue-500 hover:text-blue-400"
          type="button"
          onClick={handleLogin}
        >
          Log in
        </button>

        <button
          className="text-blue-500 hover:text-blue-400 text-sm"
          onClick={() => navigate("/signup")}
          type="button"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </>
  );
}

export default Login;
