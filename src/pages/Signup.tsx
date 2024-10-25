import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../hooks/useToken";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 1 | 0;
};

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useToken();
  const navigate = useNavigate();

  async function handleRegister() {
    const user: User = {
      firstName,
      lastName,
      email,
      password,
      role: 0,
    };

    console.log(user);

    const res = await axios.post("http://localhost:8080/auth/signup", user);

    console.log(res.data);

    setToken(res.data.token);
  }

  return (
    <>
      <div className="flex flex-col space-y-5 max-w-md mx-auto">
        <h1 className="text-xl text-center">Sign up</h1>

        <input
          className="outline rounded p-2"
          placeholder="nombre"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="outline rounded p-2"
          placeholder="apellido"
          onChange={(e) => setLastName(e.target.value)}
        />
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
          onClick={handleRegister}
        >
          Registrate
        </button>

        <button
          className="text-blue-500 hover:text-blue-400 text-sm"
          type="button"
          onClick={() => navigate("/")}
        >
          Already have an account? Log in
        </button>
      </div>
    </>
  );
}

export default Signup;
