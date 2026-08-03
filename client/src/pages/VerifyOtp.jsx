import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import LandingPageLogo from '../components/LandingPageLogo';

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId;

    const [otp, setOtp] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [infoMsg, setInfoMsg] = useState("");

    useEffect(() => {
        if (!userId) {
            navigate("/register");
            return;
        }
        const sendInitialOtp = async () => {
            try {
                await axiosInstance.post("/send-otp", { userId });
                setInfoMsg("OTP sent to your registered email address");
            } catch (err) {
                setErrorMsg("Failed to send OTP, please try refreshing");
            }
        };

        sendInitialOtp();
    }, []);

    const handleResend = async () => {
        setErrorMsg("");
        setInfoMsg("");
        try {
            await axiosInstance.post("/send-otp", { userId });
            setInfoMsg("OTP resent to your registered email address");
        } catch (err) {
            setErrorMsg("Failed to resend OTP, please try again");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            await axiosInstance.post("/verify-otp", { userId, otp });
            navigate("/set-security-questions", { state: { userId } });
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Invalid OTP, please try again");
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
                    <h1 className="font-['Fraunces'] text-3xl mb-2">Verify your email</h1>
                    <p className="text-[#8B94A0] text-sm">
                        Enter the 6-digit code we sent to your email address.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#131A22] border border-white/10 rounded-sm p-8 space-y-5">
                    {errorMsg && (
                        <div className="text-sm text-[#e07a5f] bg-[#e07a5f]/10 border border-[#e07a5f]/30 rounded-sm px-4 py-3">
                            {errorMsg}
                        </div>
                    )}

                    {infoMsg && (
                        <div className="text-sm text-[#3FA796] bg-[#3FA796]/10 border border-[#3FA796]/30 rounded-sm px-4 py-3">
                            {infoMsg}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs text-[#8B94A0] mb-2 tracking-wide">
                            One-Time Password
                        </label>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-center text-lg tracking-[0.5em] font-['JetBrains_Mono'] focus:outline-none focus:border-[#C9A227]/60 transition-colors"
                            placeholder="------"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-sm bg-[#C9A227] text-[#0B0F14] font-medium hover:bg-[#dbb537] transition-colors"
                    >
                        Verify
                    </button>

                    <button
                        type="button"
                        onClick={handleResend}
                        className="w-full text-center text-sm text-[#8B94A0] hover:text-[#E8E6DF] transition-colors"
                    >
                        Didn't get the code? Resend
                    </button>
                </form>

                <p className="text-center text-sm text-[#8B94A0] mt-6">
                    Wrong email?{" "}
                    <Link to="/register" className="text-[#C9A227] hover:underline">
                        Register again
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default VerifyOtp;