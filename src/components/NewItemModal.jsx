import React, { useState, useEffect } from 'react';

const BoxIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12.89 1.11l6.89 6.89-1.11 1.11-6.89-6.89zM19 12v7c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-7H3l9-9 9 9h-2z" />
    </svg>
);

const BarcodeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 2a2 2 0 00-2 2v16a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2zM4 4a2 2 0 00-2 2v12a2 2 0 002 2h1a2 2 0 002-2V4a2 2 0 00-2-2H4zM20 4a2 2 0 00-2 2v12a2 2 0 002 2h1a2 2 0 002-2V4a2 2 0 00-2-2h-1z" />
    </svg>
);

const DollarSignIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
);

const HashIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
);

const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export default function NewItemModal({ showModal, onClose, onSaveNewItem }) {
    const [itemDetails, setItemDetails] = useState({
        name: '',
        productCode: '',
        price: '',
        quantity: '',
        discount: '',
        discountPercent: false,
        amount: 0,
    });

    useEffect(() => {
        const price = parseFloat(itemDetails.price) || 0;
        const quantity = parseInt(itemDetails.quantity) || 0;
        const discount = parseFloat(itemDetails.discount) || 0;

        let calculatedAmount = price * quantity;

        if (itemDetails.discountPercent) {
            calculatedAmount -= (calculatedAmount * (discount / 100));
        } else {
            calculatedAmount -= discount;
        }

        setItemDetails(prev => ({
            ...prev,
            amount: Math.max(0, calculatedAmount).toFixed(2) // Ensure amount is not negative
        }));
    }, [itemDetails.price, itemDetails.quantity, itemDetails.discount, itemDetails.discountPercent]);


    if (!showModal) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setItemDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveNewItem(itemDetails);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[95vh] overflow-y-auto flex flex-col"> {/* Increased max-w for more space */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-bold">New Item</h2>
                    <button
                        type="submit"
                        form="new-item-form"
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Save
                        <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-6-1V7m0 0l-3 3m3-3l3 3m7-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2v-3" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                    <form id="new-item-form" onSubmit={handleSubmit}>
                        <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <BoxIcon />
                                <h3 className="text-lg font-semibold ml-2">Item Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="itemName" className="sr-only">Item Name</label> {/* Hidden label for accessibility */}
                                    <div className="relative mt-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BoxIcon className="text-gray-400" />
                                        </div>
                                        <input type="text" id="itemName" name="name" value={itemDetails.name} onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Item Name" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="productCode" className="sr-only">Product Code</label>
                                    <div className="relative mt-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BarcodeIcon className="text-gray-400" />
                                        </div>
                                        <input type="text" id="productCode" name="productCode" value={itemDetails.productCode} onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Product Code" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="itemPrice" className="sr-only">Price</label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <DollarSignIcon className="text-gray-400" />
                                            </div>
                                            <input type="number" id="itemPrice" name="price" value={itemDetails.price} onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Item Price" step="0.01" min="0" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="itemQuantity" className="sr-only">Quantity</label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <HashIcon className="text-gray-400" />
                                            </div>
                                            <input type="number" id="itemQuantity" name="quantity" value={itemDetails.quantity} onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Qty" min="0" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="itemDiscount" className="sr-only">Discount</label>
                                    <div className="relative mt-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ClockIcon className="text-gray-400" />
                                        </div>
                                        <input type="number" id="itemDiscount" name="discount" value={itemDetails.discount} onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Discount" min="0" />
                                    </div>
                                </div>

                                <div className="flex justify-end items-center mt-4">
                                    <span className="text-sm text-gray-700 mr-2">Percent</span>
                                    <label htmlFor="discountPercentToggle" className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id="discountPercentToggle"
                                            name="discountPercent"
                                            checked={itemDetails.discountPercent}
                                            onChange={handleChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex justify-between items-center bg-green-50 p-4 rounded-md mt-6">
                                    <span className="text-lg font-semibold text-gray-800">Amount</span>
                                    <span className="text-lg font-bold text-green-700">${itemDetails.amount}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
