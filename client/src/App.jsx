import React, { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import axiosInstance from "./api/axiosInstance";

const App = () => {

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage =  async () => {
      try{
        const res = await axiosInstance.get("/");
        setMessage(res.data.message)
      }
      catch (err) {
        console.error(err);
      }
    };
    fetchMessage();

  }, []);


  return (
    <div>
      VaultX 2.0
      <LandingPage/>
      <p>hii = {message}</p>
    </div>
  )
}

export default App;
