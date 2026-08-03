import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/login", formData);

      if (res.data.success) {
        // abhi ke liye temporary storage, AuthContext banne ke baad isko refactor karenge
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E8E6DF] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <span className="font-['Fraunces'] text-xl tracking-wide">VaultX</span>
          </div>
          <h1 className="font-['Fraunces'] text-3xl mb-2">Welcome back</h1>
          <p className="text-[#8B94A0] text-sm">
            Log in to unlock your vault.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#131A22] border border-white/10 rounded-sm p-8 space-y-5">
          {errorMsg && (
            <div className="text-sm text-[#e07a5f] bg-[#e07a5f]/10 border border-[#e07a5f]/30 rounded-sm px-4 py-3">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs text-[#8B94A0] mb-2 tracking-wide">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8B94A0] mb-2 tracking-wide">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-sm bg-[#C9A227] text-[#0B0F14] font-medium hover:bg-[#dbb537] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-[#8B94A0] mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#C9A227] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;