"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useNavigate, Link } from "react-router-dom"

import { UserIcon, LogOutIcon, ChevronDownIcon, SettingsIcon } from '../components/Icons.jsx';

export function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        logout()
        navigate("/auth")
        setIsDropdownOpen(false)
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const getUserInitials = () => {
        if (!user?.username) return "U"
        return user.username.charAt(0).toUpperCase()
    }

    return (
        <header className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                            <img
                                className="h-9 w-auto"
                                src="/logo.png"
                                alt="App Logo"
                                onError={(e) => {
                                    e.target.style.display = "none"
                                    if (e.target.nextSibling) {
                                        e.target.nextSibling.style.display = "flex"
                                    }
                                }}
                            />
                            <div
                                className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                                style={{ display: "none" }}
                            >
                                LC
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
                                aria-expanded={isDropdownOpen ? "true" : "false"}
                                aria-haspopup="true"
                            >
                                <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-base shadow-sm">
                                    {getUserInitials()}
                                </div>
                                <span className="hidden md:block text-sm font-medium">{user?.username || "Account"}</span>
                                <ChevronDownIcon />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200 animate-fade-in-down">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user?.username || "User Name"}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</p>
                                    </div>
                                    <Link to="/manage-account" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md mx-2 my-1 transition-colors duration-150" onClick={() => setIsDropdownOpen(false)}>
                                        <UserIcon />
                                        <span className="ml-3">Manage Account</span>
                                    </Link>

                                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md mx-2 my-1 transition-colors duration-150" onClick={() => setIsDropdownOpen(false)}>
                                        <SettingsIcon />
                                        <span className="ml-3">Settings</span>
                                    </Link>

                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md mx-2 my-1 transition-colors duration-150"
                                        >
                                            <LogOutIcon />
                                            <span className="ml-3">Sign out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar