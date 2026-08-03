import React from 'react'
import LandingPage from './pages/LandingPage'
// import axiosInstance from "./api/axiosInstance";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Tnc from './pages/Tnc';
import VerifyOtp from './pages/VerifyOtp';

const App = () => {

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tnc" element={<Tnc />} />
        <Route path="/verify-otp" element={<VerifyOtp/>}/>

      </Routes>
    </div>
  )
}

export default App;


 // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   const fetchMessage =  async () => {
  //     try{
  //       const res = await axiosInstance.get("/");
  //       setMessage(res.data.message)
  //     }
  //     catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchMessage();
  // }, []);
{/* VaultX 2.0
      <LandingPage/>
      <p>hii = {message}</p> */}
      