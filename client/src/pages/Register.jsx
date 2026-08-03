import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Link } from 'react-router-dom'
import LandingPageLogo from '../components/LandingPageLogo';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    accepted_terms: false,
    captchaAnswer: "",
  });

  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCaptcha = async () => {
    try {
      const res = await axiosInstance.get("/captcha");
      setCaptchaSvg(res.data.svg);
      setCaptchaId(res.data.captchaId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.accepted_terms) {
      setErrorMsg("Please accept the Terms & Conditions");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setErrorMsg("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axiosInstance.post("/register", { ...formData, captchaId });

      if (res.data.success) {
        navigate("/verify-otp", { state: { userId: res.data.userId } });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong, please try again");
      fetchCaptcha();
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E8E6DF] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <LandingPageLogo/>
          </div>
          <h1 className="font-['Fraunces'] text-3xl mb-2">Create your account</h1>
          <p className="text-[#8B94A0] text-sm">
            Your vault stays locked behind a master password you set later.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#131A22] border border-white/10 rounded-sm p-8 space-y-5">
          {errorMsg && (
            <div className="text-sm text-[#e07a5f] bg-[#e07a5f]/10 border border-[#e07a5f]/30 rounded-sm px-4 py-3">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs text-[#8B94A0] mb-2 tracking-wide">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="w-full bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors"
              placeholder="dipak123"
            />
          </div>

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
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8B94A0] mb-2 tracking-wide">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              onChange={handleChange}
              value={formData.confirm_password}
              className="w-full bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors"
              placeholder="Re-enter your password"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8B94A0] mb-2 tracking-wide">Captcha</label>
            <div
              className="bg-[#0B0F14] border border-white/10 rounded-sm p-2 mb-2 flex justify-center [&_svg]:h-[60px]"
              dangerouslySetInnerHTML={{ __html: captchaSvg }}
            />
            <div className="flex gap-2">
              <input
                type="text"
                name="captchaAnswer"
                onChange={handleChange}
                value={formData.captchaAnswer}
                className="flex-1 bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors"
                placeholder="Enter the text shown above"
              />
              <button
                type="button"
                onClick={fetchCaptcha}
                className="px-3 rounded-sm border border-white/15 text-xs text-[#8B94A0] hover:border-white/30 hover:text-[#E8E6DF] transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-[#8B94A0] pt-1">
            <input
              type="checkbox"
              name="accepted_terms"
              onChange={handleChange}
              checked={formData.accepted_terms}
              className="mt-0.5 accent-[#C9A227]"
            />
            I agree to the{" "}
            <Link to="/tnc" rel="noopener noreferrer" className="text-[#C9A227] hover:underline">
              Terms & Conditions
            </Link>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-sm bg-[#C9A227] text-[#0B0F14] font-medium hover:bg-[#dbb537] transition-colors"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-[#8B94A0] mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#C9A227] hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register