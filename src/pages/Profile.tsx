import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("loading...");
  const { token } = useToken();

  useEffect(() => {
    async function fetchMessage() {
      try {
        const res = await axios.get("http://localhost:8080/hello/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(res.data);
      } catch (error: unknown) {
        console.error(error);
        navigate("/");
      }
    }
    fetchMessage();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{message}</h1>
      <div className="mt-30 h-96 flex items-center justify-center animate-spin">
        <p className="text-xl text-blue-500 animate-move">bounce</p>
      </div>
    </div>
  );
}

export default Profile;
