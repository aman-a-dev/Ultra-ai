import React, { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaSignOutAlt
} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Auth.css";
// components
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
const Loader = React.lazy(() => import("../components/Loader.jsx"));


const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [authSuccess, setAuthSuccess] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
        // Clear auth messages when user types
        if (authError) setAuthError(null);
        if (authSuccess) setAuthSuccess(null);
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = "Name is required";
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setAuthError(null);
        setAuthSuccess(null);

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const endpoint = isLogin ? "/api/login" : "/api/signin";
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : {
                      name: formData.name,
                      email: formData.email,
                      password: formData.password
                  };

            const response = await axios.post(endpoint, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Handle successful authentication
            setAuthSuccess(
                isLogin ? "Login successful!" : "Account created successfully!"
            );
            console.log("Auth response:", response.data);

            // Store token if received
            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                // You might want to redirect or update app state here
            }

            // Reset form after successful submission
            if (!isLogin) {
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                setFormData({
                    ...formData,
                    password: ""
                });
            }
        } catch (error) {
            console.error("Auth error:", error.response?.data || error.message);
            setAuthError(
                error.response?.data?.message ||
                    (isLogin
                        ? "Login failed. Please try again."
                        : "Signup failed. Please try again.")
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setAuthError(null);
        setAuthSuccess(null);
    };

    return (
       <>
       <Nav/>
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className={`auth-toggle ${isLogin ? "active" : ""}`}>
                        <button onClick={toggleAuthMode}>
                            <FaSignInAlt /> Login
                        </button>
                    </div>
                    <div className={`auth-toggle ${!isLogin ? "active" : ""}`}>
                        <button onClick={toggleAuthMode}>
                            <FaSignOutAlt /> Sign Up
                        </button>
                    </div>
                </div>

                <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
                <p className="auth-subtitle">
                    {isLogin ? "Log in to continue" : "Sign up to get started"}
                </p>

                {/* Auth Messages */}
                {authError && (
                    <div className="auth-message error">{authError}</div>
                )}
                {authSuccess && (
                    <div className="auth-message success">{authSuccess}</div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <div className="input-container">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? "error" : ""}
                                />
                            </div>
                            {errors.name && (
                                <span className="error-message">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <div className="input-container">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "error" : ""}
                            />
                        </div>
                        {errors.email && (
                            <span className="error-message">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? "error" : ""}
                            />
                        </div>
                        {errors.password && (
                            <span className="error-message">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <div className="input-container">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={
                                        errors.confirmPassword ? "error" : ""
                                    }
                                />
                            </div>
                            {errors.confirmPassword && (
                                <span className="error-message">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    )}

                    {isLogin && (
                        <div className="auth-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#forgot" className="forgot-password">
                                Forgot password?
                            </a>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="spinner"></span>
                        ) : isLogin ? (
                            "Log In"
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                onClick={toggleAuthMode}
                                className="text-button"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={toggleAuthMode}
                                className="text-button"
                            >
                                Log in
                            </button>
                        </>
                    )}
                    <h4>
                        <Link to="/">Back to home</Link>
                    </h4>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Auth;
