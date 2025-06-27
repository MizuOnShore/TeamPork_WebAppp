import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ManageAccountPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [accountDetails, setAccountDetails] = useState({
        userName: '',
        position: '',
        companyEmail: '',
        companyName: '',
        companyAddress: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (user) {
            setAccountDetails({
                userName: user.username || '',
                position: user.position || '',
                companyEmail: user.companyEmail || '',
                companyName: user.companyName || '',
                companyAddress: user.companyAddress || '',
                phoneNumber: user.phoneNumber || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Saving changes:", accountDetails);
        // In a real application, you'd send this data to your backend API
        // and handle success/error states.
        alert("Changes saved successfully!");
        // Optionally, navigate back or show a success message
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <nav className="text-sm text-gray-500 mb-6">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="/dashboard" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="text-blue-600 hover:text-blue-800">Dashboard</a>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <a href="/settings" onClick={(e) => { e.preventDefault(); navigate('/settings'); }} className="text-blue-600 hover:text-blue-800">Settings</a>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                            Manage Account
                        </li>
                    </ol>
                </nav>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Manage Your Account</h1>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center mb-10 border-b pb-6 border-gray-200">
                            <div className="h-28 w-28 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-6xl font-semibold border-4 border-blue-300">
                                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="ml-6">
                                <h2 className="text-2xl font-bold text-gray-900">{user?.username || 'User Name'}</h2>
                                <p className="text-md text-gray-600">{user?.email || 'user@example.com'}</p>
                                <p className="text-sm text-gray-500 mt-1">{accountDetails.position || 'Position Not Set'} at {accountDetails.companyName || 'Company Not Set'}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="md:col-span-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-5">Personal Details</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                                        <input
                                            type="text"
                                            id="userName"
                                            name="userName"
                                            value={accountDetails.userName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                            placeholder="Benjamin B. Benson"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            value={accountDetails.position}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                            placeholder="Founder & CEO"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700">Company Email</label>
                                        <input
                                            type="email"
                                            id="companyEmail"
                                            name="companyEmail"
                                            value={accountDetails.companyEmail}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                            placeholder="hello@mycompany.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-5">Company Details</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            value={accountDetails.companyName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                            placeholder="My Company Inc."
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
                                        <input
                                            type="text"
                                            id="companyAddress"
                                            name="companyAddress"
                                            value={accountDetails.companyAddress}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                            placeholder="123 Business Rd, Suite 456"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={accountDetails.phoneNumber}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex justify-end pt-6 border-t mt-8 border-gray-200">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}