import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from "../api/axiosInstance";

const Register = () => {

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

    if (!formData.accepted_terms) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axiosInstance.post("/register", { ...formData, captchaId, });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        Username:
        <input type="text" name="username" onChange={handleChange} value={formData.username} id="" /><br />
        Email:
        <input type="email" name="email" onChange={handleChange} value={formData.email} id="" /><br />
        password:
        <input type="password" name="password" onChange={handleChange} value={formData.password} id="" /><br />
        confirm_password:
        <input type="password" name="confirm_password" onChange={handleChange} value={formData.confirm_password} id="" /><br />
        TnC:
        <input type="checkbox" name="accepted_terms" onChange={handleChange} checked={formData.accepted_terms} id="" /><br />

        Captcha:
        <div dangerouslySetInnerHTML={{ __html: captchaSvg }} />
        <input
          type="text"
          name="captchaAnswer"
          onChange={handleChange}
          value={formData.captchaAnswer}
          placeholder="Enter the text shown above"
        />
        <button type="button" onClick={fetchCaptcha}>Refresh Captcha</button>
        <br />

        <input type="submit" value="submit" />

      </form>

    </div>
  )
}

export default Register
