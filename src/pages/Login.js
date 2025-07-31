import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:8000'; // Update if needed

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/api/token/`, {
                username,
                password,
            });

            const token = response.data.access;
            localStorage.setItem('token', token);

            const decoded = jwtDecode(token);
            const role = decoded.role;

            console.log('Login successful. Role:', role);

            // Redirect based on role
            if (role === 'admin') {
                navigate('/dashboard/admin');
            } else if (role === 'teacher') {
                navigate('/dashboard/teacher');
            } else {
                navigate('/dashboard/student');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid username or password');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;
