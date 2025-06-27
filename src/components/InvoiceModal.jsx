import React, { useState } from 'react';
import CustomerModal from './CustomerModal'; 
import NewCustomerModal from './NewCustomerModal'; 

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const LogOutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16,17 21,12 16,7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);
const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6,9 12,15 18,9" />
    </svg>
);
const SettingsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 01-8 0 4 4 0 018 0zM7 12a4 4 0 01-8 0 4 4 0 018 0z" />
    </svg>
);


export default function InvoiceModal({ showModal, onClose, onSave }) {
    const [invoiceData, setInvoiceData] = useState({
        invoiceDate: '',
        dueDate: '',
        customerName: '',
        customerEmail: '',
        customerAddress: '',
            billingAddress: {
            address1: '', address2: '', city: '', province: '', zipCode: '', country: ''
        },
        shippingAddress: {
            address1: '', address2: '', city: '', province: '', zipCode: '', country: ''
        },
        items: [],
        subtotal: 0.00,
        tax: 0.00,
        total: 0.00,
    });

    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

    if (!showModal) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(invoiceData); 
    };

    const handleSelectCustomer = (customer) => {
        setInvoiceData(prevData => ({
            ...prevData,
            customerName: customer.name,
            customerEmail: customer.email,
            customerAddress: customer.address || '', 
            billingAddress: customer.billingAddress || { address1: '', address2: '', city: '', province: '', zipCode: '', country: '' },
            shippingAddress: customer.shippingAddress || { address1: '', address2: '', city: '', province: '', zipCode: '', country: '' },
        }));
        setShowCustomerModal(false); 
    };

    const handleSaveNewCustomer = (newCustomerDetails) => {
        console.log("Saving new customer and setting invoice data:", newCustomerDetails);
        setInvoiceData(prevData => ({
            ...prevData,
            customerName: `${newCustomerDetails.firstName} ${newCustomerDetails.lastName}`,
            customerEmail: newCustomerDetails.email,
            customerAddress: newCustomerDetails.billingAddress.address1 || '', 
            billingAddress: newCustomerDetails.billingAddress,
            shippingAddress: newCustomerDetails.shippingAddress,
        }));
        setShowNewCustomerModal(false);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Add New Invoice</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSave}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Invoice Date */}
                        <div>
                            <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700">Invoice Date</label>
                            <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white">
                                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="date"
                                    id="invoiceDate"
                                    name="invoiceDate"
                                    value={invoiceData.invoiceDate}
                                    onChange={handleChange}
                                    className="block w-full focus:outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                            <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white">
                                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={invoiceData.dueDate}
                                    onChange={handleChange}
                                    className="block w-full focus:outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Customer Section */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
                        {invoiceData.customerName ? (
                            <div className="flex justify-between items-center text-sm">
                                <div>
                                    <p className="font-semibold">{invoiceData.customerName}</p>
                                    <p className="text-gray-600">{invoiceData.customerEmail}</p>
                                    {/* You can display the billing address here as a single line, or access specific fields */}
                                    {invoiceData.billingAddress.address1 && (
                                        <p className="text-gray-600">
                                            {invoiceData.billingAddress.address1}
                                            {invoiceData.billingAddress.city && `, ${invoiceData.billingAddress.city}`}
                                            {invoiceData.billingAddress.zipCode && `, ${invoiceData.billingAddress.zipCode}`}
                                            {invoiceData.billingAddress.country && `, ${invoiceData.billingAddress.country}`}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setInvoiceData(prev => ({
                                        ...prev,
                                        customerName: '',
                                        customerEmail: '',
                                        customerAddress: '',
                                        billingAddress: { address1: '', address2: '', city: '', province: '', zipCode: '', country: '' },
                                        shippingAddress: { address1: '', address2: '', city: '', province: '', zipCode: '', country: '' },
                                    }))}
                                    className="text-red-500 hover:text-red-700 text-xs font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                onClick={() => setShowCustomerModal(true)} // Open CustomerModal
                            >
                                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Customer
                            </button>
                        )}
                    </div>

                    {/* Items Section */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Items</label>
                            <span className="text-blue-600 text-sm font-medium">Quantity</span>
                        </div>
                        {invoiceData.items.length === 0 ? (
                            <p className="text-center text-gray-500 text-xs mb-3">Tap & hold to re-sort items</p>
                        ) : (
                            <div></div>
                        )}
                        <button
                            type="button"
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium border border-dashed border-gray-300 rounded-md w-full py-2 justify-center"
                            // onClick={() => console.log('Add Item clicked')}
                        >
                            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Item
                        </button>
                    </div>

                    {/* Total Section */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-base font-semibold text-gray-800">Total</h3>
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.82 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.82 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.82-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.82-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Subtotal</span>
                            <span>${invoiceData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                            <span>TAX(0%)</span>
                            <span>${invoiceData.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-gray-900">
                            <span>Total</span>
                            <span>${invoiceData.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* Render CustomerModal */}
            <CustomerModal
                showModal={showCustomerModal}
                onClose={() => setShowCustomerModal(false)}
                onSelectCustomer={handleSelectCustomer}
                onNewCustomer={() => {
                    setShowCustomerModal(false); 
                    setShowNewCustomerModal(true); 
                }}
            />

            <NewCustomerModal
                showModal={showNewCustomerModal}
                onClose={() => setShowNewCustomerModal(false)}
                onSaveNewCustomer={handleSaveNewCustomer}
            />
        </div>
    );
}