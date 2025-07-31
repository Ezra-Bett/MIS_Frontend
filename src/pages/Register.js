import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend will assign role = student by default
            await axios.post("/api/register/", formData);
            alert("Registration successful. Please log in.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed.");
        }
    };

    return (
        <div className="your-custom-register-ui">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" onChange={handleChange} />
                <input name="email" onChange={handleChange} />
                <input name="password" type="password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default Register;
