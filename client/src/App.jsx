import React from 'react'
import LandingPage from './pages/LandingPage'
// import axiosInstance from "./api/axiosInstance";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Tnc from './pages/Tnc';
import VerifyOtp from './pages/VerifyOtp';
import SecurityQuestions from './pages/SecurityQuestions';
import Home from './pages/Home';
import PrivateRoute from './routes/PrivateRoute';
import SetMasterPassword from './pages/SetMasterPassword';
import Create from './pages/Create';
import Vault from './pages/Vault';
import Trash from './pages/Trash';
import Restore from './pages/Restore';
import Collections from './pages/Collections';
import Starred from './pages/Starred';
import Insights from './pages/Insights';
import Lab from './pages/Lab';
import Account from './pages/Account';


const App = () => {

  return (
    <div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tnc" element={<Tnc />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/security-questions" element={<SecurityQuestions />} />
        <Route path="/set-master-password" element={<SetMasterPassword />} />

        <Route path="/home" element={ <PrivateRoute> <Home /> </PrivateRoute> } />
        <Route path="/create" element={ <PrivateRoute> <Create /> </PrivateRoute> } />
        <Route path="/vault" element={ <PrivateRoute> <Vault /> </PrivateRoute> } />
        <Route path="/trash" element={ <PrivateRoute> <Trash /> </PrivateRoute> } />
        <Route path="/restore" element={ <PrivateRoute> <Restore /> </PrivateRoute> } />
        <Route path="/collections" element={ <PrivateRoute> <Collections /> </PrivateRoute> } />
        <Route path="/starred" element={ <PrivateRoute> <Starred /> </PrivateRoute> } />
        <Route path="/insights" element={ <PrivateRoute> <Insights /> </PrivateRoute> } />
        <Route path="/lab" element={ <PrivateRoute> <Lab /> </PrivateRoute> } />
        <Route path="/account" element={ <PrivateRoute> <Account /> </PrivateRoute> } />
        


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
