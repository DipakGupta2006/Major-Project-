import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { useAuth } from '../context/AuthContext';
import LandingPageLogo from '../components/LandingPageLogo';


const Login = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();

  const { login, logout, accessToken } = useAuth();  // logout bhi lo
  useEffect(() => {
    if (accessToken) {
      logout();  // token delete, state clear
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [errorUserId, setErrorUserId] = useState(null);
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
        login(res.data.user, res.data.accessToken);
        navigate("/home");
      }
    } catch (err) {
      const data = err.response?.data;
      setErrorMsg(data?.message || "Something went wrong");
      setErrorCode(data?.code || "");
      setErrorUserId(data?.userId || null);
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
            <LandingPageLogo />
          </div>
          <h1 className="font-['Fraunces'] text-3xl mb-2">Welcome back</h1>
          <p className="text-[#8B94A0] text-sm">
            Log in to unlock your vault.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#131A22] border border-white/10 rounded-sm p-8 space-y-5">
          {errorMsg && (
            <div className="text-sm text-[#e07a5f] bg-[#e07a5f]/10 border border-[#e07a5f]/30 rounded-sm px-4 py-3 space-y-2">
              <p>{errorMsg}</p>

              {errorCode === "EMAIL_NOT_VERIFIED" && (
                <button
                  onClick={() => navigate("/verify-otp", { state: { userId: errorUserId } })}
                  className="text-[#C9A227] underline text-xs"
                >
                  → Click here to verify your email
                </button>
              )}

              {errorCode === "SECURITY_QUESTIONS_NOT_SET" && (
                <button
                  onClick={() => navigate("/security-questions", { state: { userId: errorUserId } })}
                  className="text-[#C9A227] underline text-xs"
                >
                  → Click here to set security questions
                </button>
              )}

              {errorCode === "MASTER_PASSWORD_NOT_SET" && (
                <button
                  onClick={() => navigate("/set-master-password", { state: { userId: errorUserId } })}
                  className="text-[#C9A227] underline text-xs"
                >
                  → Click here to set master password
                </button>
              )}
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

// meko apne project me ek change, user abhi kya kar rha hai-
// register - > email verify -> then security quest -> login to meko issme ek ye change karna hai ki jab user security quest dede tab uske baad set master password ka page khule (login se pehle) fir user matser paswd dale, confirm kare fir login kare.
// to flow kuch aesa ho
// register - > email verify -> then security quest -> set master paswd -> login -> home page
// aur master pawd ke page pe ye likha hoga ki ye paswd user q set kar rha hai mendetory q hai ye