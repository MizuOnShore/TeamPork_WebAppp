import React, { useState } from 'react';

const UserDetailsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <line x1="22" y1="12" x2="16" y2="12" />
        <line x1="8" y1="12" x2="2" y2="12" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const LocationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);


export default function NewCustomerModal({ showModal, onClose, onSaveNewCustomer }) {
    const [customerDetails, setCustomerDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        taxRegNo: '',
        note: '',
        billingAddress: {
            address1: '',
            address2: '',
            city: '',
            province: '',
            zipCode: '',
            country: ''
        },
        shippingAddress: {
            address1: '',
            address2: '',
            city: '',
            province: '',
            zipCode: '',
            country: ''
        },
    });

    const [showBillingAddress, setShowBillingAddress] = useState(false);
    const [showShippingAddress, setShowShippingAddress] = useState(false);

    if (!showModal) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e, addressType) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({
            ...prev,
            [addressType]: {
                ...prev[addressType], 
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveNewCustomer(customerDetails);
    };

    const BillingAddressForm = () => (
        <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <LocationIcon />
                    <h3 className="text-lg font-semibold ml-2">Billing Address</h3>
                </div>
                <button type="button" onClick={() => {
                    setShowBillingAddress(false);
                    setCustomerDetails(prev => ({ ...prev, billingAddress: { address1: '', address2: '', city: '', province: '', zipCode: '', country: '' } }));
                }} className="text-gray-500 hover:text-gray-700">
                    <TrashIcon />
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="billingAddress1" className="block text-sm font-medium text-gray-700">Address 1</label>
                    <input type="text" id="billingAddress1" name="address1" value={customerDetails.billingAddress.address1} onChange={(e) => handleAddressChange(e, 'billingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Address 1" />
                </div>
                <div>
                    <label htmlFor="billingAddress2" className="block text-sm font-medium text-gray-700">Address 2</label>
                    <input type="text" id="billingAddress2" name="address2" value={customerDetails.billingAddress.address2} onChange={(e) => handleAddressChange(e, 'billingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Address 2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" id="billingCity" name="city" value={customerDetails.billingAddress.city} onChange={(e) => handleAddressChange(e, 'billingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="City" />
                    </div>
                    <div>
                        <label htmlFor="billingProvince" className="block text-sm font-medium text-gray-700">Province</label>
                        <input type="text" id="billingProvince" name="province" value={customerDetails.billingAddress.province} onChange={(e) => handleAddressChange(e, 'billingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Province" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="billingZipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input type="text" id="billingZipCode" name="zipCode" value={customerDetails.billingAddress.zipCode} onChange={(e) => handleAddressChange(e, 'billingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="ZIP Code" />
                    </div>
                    <div>
                        <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700">Country</label>
                        <input type="text" id="billingCountry" name="country" value={customerDetails.billingAddress.country} onChange={(e) => handleAddressChange(e, 'billingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Country" />
                    </div>
                </div>
            </div>
        </div>
    );

    const ShippingAddressForm = () => (
        <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <LocationIcon />
                    <h3 className="text-lg font-semibold ml-2">Shipping Address</h3>
                </div>
                <button type="button" onClick={() => {
                    setShowShippingAddress(false);
                    setCustomerDetails(prev => ({ ...prev, shippingAddress: { address1: '', address2: '', city: '', province: '', zipCode: '', country: '' } }));
                }} className="text-gray-500 hover:text-gray-700">
                    <TrashIcon />
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="shippingAddress1" className="block text-sm font-medium text-gray-700">Address 1</label>
                    <input type="text" id="shippingAddress1" name="address1" value={customerDetails.shippingAddress.address1} onChange={(e) => handleAddressChange(e, 'shippingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Address 1" />
                </div>
                <div>
                    <label htmlFor="shippingAddress2" className="block text-sm font-medium text-gray-700">Address 2</label>
                    <input type="text" id="shippingAddress2" name="address2" value={customerDetails.shippingAddress.address2} onChange={(e) => handleAddressChange(e, 'shippingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Address 2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="shippingCity" className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" id="shippingCity" name="city" value={customerDetails.shippingAddress.city} onChange={(e) => handleAddressChange(e, 'shippingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="City" />
                    </div>
                    <div>
                        <label htmlFor="shippingProvince" className="block text-sm font-medium text-gray-700">Province</label>
                        <input type="text" id="shippingProvince" name="province" value={customerDetails.shippingAddress.province} onChange={(e) => handleAddressChange(e, 'shippingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Province" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="shippingZipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input type="text" id="shippingZipCode" name="zipCode" value={customerDetails.shippingAddress.zipCode} onChange={(e) => handleAddressChange(e, 'shippingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="ZIP Code" />
                    </div>
                    <div>
                        <label htmlFor="shippingCountry" className="block text-sm font-medium text-gray-700">Country</label>
                        <input type="text" id="shippingCountry" name="country" value={customerDetails.shippingAddress.country} onChange={(e) => handleAddressChange(e, 'shippingAddress')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Country" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-bold">New Customer</h2>
                    <button
                        type="submit"
                        form="new-customer-form"
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Save
                        <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-6-1V7m0 0l-3 3m3-3l3 3m7-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2v-3" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                    <form id="new-customer-form" onSubmit={handleSubmit}>
                        <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <UserDetailsIcon />
                                <h3 className="text-lg font-semibold ml-2">Customer Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" id="firstName" name="firstName" value={customerDetails.firstName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Alberto" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" value={customerDetails.lastName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Cansado" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" value={customerDetails.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="2021jacansado@live.mcl.edu.ph" />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <input type="text" id="contactNumber" name="contactNumber" value={customerDetails.contactNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="+63 0899834312" />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="taxRegNo" className="block text-sm font-medium text-gray-700">Tax Reg No.</label>
                                <input type="text" id="taxRegNo" name="taxRegNo" value={customerDetails.taxRegNo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Tax Reg No." />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
                                <textarea id="note" name="note" value={customerDetails.note} onChange={handleChange} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" placeholder="Note"></textarea>
                            </div>
                        </div>

                        {showBillingAddress ? (
                            <BillingAddressForm />
                        ) : (
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={() => setShowBillingAddress(true)}
                                    className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 rounded-lg text-blue-600 hover:bg-gray-100 font-medium shadow-sm"
                                >
                                    <PlusIcon />
                                    <span className="ml-2">Add Billing Address</span>
                                </button>
                            </div>
                        )}

                        {showShippingAddress ? (
                            <ShippingAddressForm />
                        ) : (
                            <div className="mb-6">
                                <button
                                    type="button"
                                    onClick={() => setShowShippingAddress(true)}
                                    className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 rounded-lg text-blue-600 hover:bg-gray-100 font-medium shadow-sm"
                                >
                                    <PlusIcon />
                                    <span className="ml-2">Add Shipping Address</span>
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
