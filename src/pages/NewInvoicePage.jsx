import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerModal from '../components/CustomerModal';
import NewCustomerModal from '../components/NewCustomerModal';
import ItemsModal from '../components/ItemsModal';
import NewItemModal from '../components/NewItemModal';

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const ArrowLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);
const BoxIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12.89 1.11l6.89 6.89-1.11 1.11-6.89-6.89zM19 12v7c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-7H3l9-9 9 9h-2z" />
    </svg>
);


export default function NewInvoicePage() {
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState({
        invoiceDate: '',
        dueDate: '',
        customerName: '',
        customerEmail: '',
        billingAddress: {}, 
        shippingAddress: {}, 
        items: [],
        subtotal: 0.00,
        tax: 0.00,
        total: 0.00,
    });

    const [availableItems, setAvailableItems] = useState([]);


    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
    const [showItemsModal, setShowItemsModal] = useState(false);     
    const [showNewItemModal, setShowNewItemModal] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const calculateTotals = (currentItems) => {
        let newSubtotal = 0;
        currentItems.forEach(item => {
            newSubtotal += parseFloat(item.amount || 0);
        });
        const newTax = 0.00;
        const newTotal = newSubtotal + newTax;

        setInvoiceData(prev => ({
            ...prev,
            subtotal: newSubtotal,
            tax: newTax,
            total: newTotal
        }));
    };

    const handleAddItem = () => {
        setShowItemsModal(true); 
    };

    const handleRemoveItem = (indexToRemove) => {
        setInvoiceData(prev => {
            const updatedItems = prev.items.filter((_, index) => index !== indexToRemove);
            calculateTotals(updatedItems); 
            return { ...prev, items: updatedItems };
        });
    };

    const handleSaveInvoice = (e) => {
        e.preventDefault();

        const formatDateForDisplay = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString + 'T00:00:00'); 
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            let formattedDate = date.toLocaleDateString('en-US', options);

            const day = date.getDate();
            if (day > 3 && day < 21) formattedDate = formattedDate.replace(/(\d+)/, '$1th');
            else {
                switch (day % 10) {
                    case 1:  formattedDate = formattedDate.replace(/(\d+)/, '$1st'); break;
                    case 2:  formattedDate = formattedDate.replace(/(\d+)/, '$1nd'); break;
                    case 3:  formattedDate = formattedDate.replace(/(\d+)/, '$1rd'); break;
                    default: formattedDate = formattedDate.replace(/(\d+)/, '$1th'); break;
                }
            }
            return formattedDate;
        };

        const finalInvoice = {
            ...invoiceData, 
            id: Date.now(), 
            status: 'Paid', 
            subtotal: parseFloat(invoiceData.subtotal),
            tax: parseFloat(invoiceData.tax),
            total: parseFloat(invoiceData.total),
            invoiceDate: formatDateForDisplay(invoiceData.invoiceDate),
        };
        console.log("Saving invoice:", finalInvoice);

        const storedInvoices = localStorage.getItem('invoices');
        let invoicesArray = [];
        if (storedInvoices) {
            try {
                invoicesArray = JSON.parse(storedInvoices);
            } catch (e) {
                console.error("Failed to parse existing invoices from localStorage", e);
            }
        }
        invoicesArray.push(finalInvoice);
        localStorage.setItem('invoices', JSON.stringify(invoicesArray));

        alert("Invoice saved! Returning to Dashboard.");
        navigate('/dashboard'); 
    };


    const handleSelectCustomer = (customer) => {
        setInvoiceData(prevData => ({
            ...prevData,
            customerName: customer.name,
            customerEmail: customer.email,
            billingAddress: customer.billingAddress || {}, 
            shippingAddress: customer.shippingAddress || {}, 
           
        }));
        setShowCustomerModal(false);
    };

    const handleSaveNewCustomer = (newCustomerDetails) => {
        console.log("Saving new customer:", newCustomerDetails);
        setInvoiceData(prevData => ({
            ...prevData,
            customerName: `${newCustomerDetails.firstName} ${newCustomerDetails.lastName}`,
            customerEmail: newCustomerDetails.email,
            billingAddress: newCustomerDetails.billingAddress || {}, 
            shippingAddress: newCustomerDetails.shippingAddress || {}, 
            
        }));
        setShowNewCustomerModal(false);
        setShowCustomerModal(false);
    };

    const handleSelectItem = (selectedItem) => {
        setInvoiceData(prev => {
            const itemToAdd = { ...selectedItem, id: Date.now() + Math.random() };
            const updatedItems = [...prev.items, itemToAdd];
            calculateTotals(updatedItems);
            return { ...prev, items: updatedItems };
        });
        setShowItemsModal(false); 
    };

    const handleSaveNewItem = (newItemDetails) => {
        console.log("Saving new item:", newItemDetails);
        const newItemWithId = { ...newItemDetails, id: Date.now() + Math.random() };
        setAvailableItems(prev => [...prev, newItemWithId]); 

        setInvoiceData(prev => {
            const updatedItems = [...prev.items, newItemWithId];
            calculateTotals(updatedItems);
            return { ...prev, items: updatedItems };
        });

        setShowNewItemModal(false); 
        setShowItemsModal(false);   
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center">
                <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-gray-900 mr-4">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold">New Invoice</h1>
            </header>

            <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <form onSubmit={handleSaveInvoice} className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        {invoiceData.customerName ? (
                            <div className="flex justify-between items-center text-sm">
                                <div>
                                    <p className="font-semibold">{invoiceData.customerName}</p>
                                    <p className="text-gray-600">{invoiceData.customerEmail}</p>
                                    {invoiceData.billingAddress?.address1 && <p className="text-gray-600">{invoiceData.billingAddress.address1}</p>}
                                    {invoiceData.billingAddress?.city && <p className="text-gray-600">{invoiceData.billingAddress.city}, {invoiceData.billingAddress.province} {invoiceData.billingAddress.zipCode}</p>}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setInvoiceData(prev => ({ ...prev, customerName: '', customerEmail: '', billingAddress: {}, shippingAddress: {} }))} // Clear all customer details
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

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Items</label>
                            <span className="text-blue-600 text-sm font-medium">Quantity</span>
                        </div>
                        {invoiceData.items.length === 0 ? (
                            <p className="text-center text-gray-500 text-xs mb-3">Tap & hold to re-sort items</p>
                        ) : (
                            <div className="space-y-3 mb-4">
                                {invoiceData.items.map((item, index) => (
                                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md shadow-sm">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity} @ ${parseFloat(item.price).toFixed(2)}</p>
                                            {item.discount > 0 && (
                                                <p className="text-xs text-gray-500">
                                                    Discount: {item.discountPercent ? `${item.discount}%` : `$${parseFloat(item.discount).toFixed(2)}`}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-gray-800">${parseFloat(item.amount).toFixed(2)}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(index)}
                                                className="text-red-500 hover:text-red-700"
                                                aria-label="Remove item"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            type="button"
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium border border-dashed border-gray-300 rounded-md w-full py-2 justify-center"
                            onClick={handleAddItem} 
                        >
                            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Item
                        </button>
                    </div>

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

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium"
                        >
                            Save Invoice
                        </button>
                    </div>
                </form>
            </main>

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

            <ItemsModal
                showModal={showItemsModal}
                onClose={() => setShowItemsModal(false)}
                onSelectItem={handleSelectItem}
                onNewItem={() => {
                    setShowItemsModal(false); 
                    setShowNewItemModal(true); 
                }}
                items={availableItems}
            />

            <NewItemModal
                showModal={showNewItemModal}
                onClose={() => setShowNewItemModal(false)}
                onSaveNewItem={handleSaveNewItem}
            />
        </div>
    );
}