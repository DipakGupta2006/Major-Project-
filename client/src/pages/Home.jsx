import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'


const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E8E6DF] flex items-center justify-center px-6">
      <Navbar/>
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-3xl mb-4">Welcome, {user?.username}</h1>
        <button
          onClick={logout}
          className="px-6 py-3 rounded-sm border border-white/15 hover:border-white/30 transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default Home