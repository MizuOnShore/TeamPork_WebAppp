import React, { useState } from 'react';

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export default function CustomerModal({ showModal, onClose, onSelectCustomer, onNewCustomer }) {
    const [searchTerm, setSearchTerm] = useState('');

    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"> 
           
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col relative">

                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 z-10">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

              
                <div className="flex justify-between items-center mb-6 pr-10">
                    <div className="flex items-center">
                        <UserIcon />
                        <h2 className="text-xl font-bold ml-2">Customers</h2>
                    </div>
                    
                    <button
                        onClick={onNewCustomer} 
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-150"
                    >
                        <PlusIcon />
                        <span className="ml-1">New</span>
                    </button>
                </div>

                <p className="text-sm text-gray-500 mb-4">Select Billing Customer</p>

            
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Customer"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div className="flex-grow overflow-y-auto">
                    
                    <button
                        onClick={() => onSelectCustomer({ id: '1', name: 'John Doe', email: 'john.doe@example.com' })}
                        className="w-full text-left p-3 border-b border-gray-200 hover:bg-gray-50 flex items-center"
                    >
                        <UserIcon />
                        <div className="ml-3">
                            <p className="font-medium text-gray-900">John Doe</p>
                            <p className="text-sm text-gray-500">john.doe@example.com</p>
                        </div>
                    </button>
                   
                </div>

            </div>
        </div>
    );
}
