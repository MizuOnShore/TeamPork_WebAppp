"use client"

import { LoginForm } from "../components/LoginForm.jsx"
import { RegisterForm } from "../components/RegisterForm.jsx"
import { useState } from "react"


export default function AuthPage() {
    const [activeForm, setActiveForm] = useState("login")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to LiveCart</h2>
                    
                </div>

                <div className="card bg-white rounded-lg shadow-lg p-8">
                    <div className="tabs w-full">
                       
                        {activeForm === "login" && (
                            <div className="tabs-content mt-6"> {/* Added margin-top to separate from button */}
                                <div className="card-header text-center mb-6">
                                    <h3 className="card-title text-2xl font-bold text-gray-800">Sign In</h3>
                                    <p className="card-description text-gray-600">Enter your credentials to access your account</p>
                                </div>
                                <div className="card-content">
                                    <LoginForm />
                                </div>
                                <div className="mt-6 text-center"> {/* Adjusted margin-top */}
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setActiveForm("register")}
                                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                                        >
                                            Create an account
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeForm === "register" && (
                            <div className="tabs-content mt-6"> 
                                <div className="card-header text-center mb-6">
                                    <h3 className="card-title text-2xl font-bold text-gray-800">Create Account</h3>
                                    <p className="card-description text-gray-600">Fill in your information to create a new account</p>
                                </div>
                                <div className="card-content">
                                    <RegisterForm />
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Already have an account.?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setActiveForm("login")}
                                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                                        >
                                            Sign In
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
