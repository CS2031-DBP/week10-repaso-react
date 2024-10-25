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
    <>
      <h1>{message}</h1>
    </>
  );
}

export default Profile;
