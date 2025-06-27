import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ArrowLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const BoxIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12.89 1.11l6.89 6.89-1.11 1.11-6.89-6.89zM19 12v7c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-7H3l9-9 9 9h-2z" />
    </svg>
);
const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);
const LocationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export default function ViewInvoicePage() {
    const { invoiceId } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const storedInvoices = localStorage.getItem('invoices');
        if (storedInvoices) {
            try {
                const invoicesArray = JSON.parse(storedInvoices);
                const foundInvoice = invoicesArray.find(inv => inv.id === parseInt(invoiceId));

                if (foundInvoice) {
                    setInvoice({
                        ...foundInvoice,
                        // Ensure these are always objects, even if empty
                        billingAddress: foundInvoice.billingAddress || {},
                        shippingAddress: foundInvoice.shippingAddress || {}
                    });
                } else {
                    setInvoice(null);
                }
                console.log("ViewInvoicePage: Loaded Invoice Data:", foundInvoice);
            } catch (e) {
                console.error("Failed to parse invoices from localStorage", e);
                setInvoice(null);
            }
        }
    }, [invoiceId]);

    if (!invoice) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <p className="text-lg text-gray-700 mb-4">Invoice not found or loading...</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    // Helper function to render an address block
    const renderAddressBlock = (address, title) => {
        // Check if the address object exists and has at least one significant field
        const hasAddressData = address && (
            address.address1 ||
            address.address2 ||
            address.city ||
            address.province ||
            address.zipCode ||
            address.country
        );

        if (!hasAddressData) {
            console.log(`ViewInvoicePage: ${title} is empty or all fields are empty, not rendering.`);
            return (
                <div className="mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                        <LocationIcon className="mr-2" />
                        {title}
                    </h3>
                    <p className="text-gray-500 italic">None provided</p>
                </div>
            );
        }

        return (
            <div className="mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                    <LocationIcon className="mr-2" />
                    {title}
                </h3>
                {address.address1 && <p className="text-gray-700">{address.address1}</p>}
                {address.address2 && <p className="text-gray-700">{address.address2}</p>}
                {(address.city || address.province || address.zipCode) && (
                    <p className="text-gray-700">
                        {address.city}{address.city && (address.province || address.zipCode) ? ', ' : ''}
                        {address.province}{address.province && address.zipCode ? ' ' : ''}
                        {address.zipCode}
                    </p>
                )}
                {address.country && <p className="text-gray-700">{address.country}</p>}
            </div>
        );
    };

    // Determine status badge colors
    const statusBgColor = invoice.status === 'Paid' ? 'bg-green-100' :
                          invoice.status === 'Pending' ? 'bg-yellow-100' :
                          'bg-gray-100';
    const statusTextColor = invoice.status === 'Paid' ? 'text-green-800' :
                            invoice.status === 'Pending' ? 'text-yellow-800' :
                            'text-gray-800';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            
            <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
                <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-gray-900">
                    <ArrowLeftIcon />
                </button>
                
            </header>

            <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                        <div>
                            <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Invoice Number</p>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">#{invoice.id}</h2>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusBgColor} ${statusTextColor}`}>
                                {invoice.status}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Total Amount</p>
                            <span className="text-4xl font-extrabold text-blue-700">${invoice.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="mb-6 pb-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                            <UserIcon className="mr-2" />
                            Customer Details
                        </h2>
                        <p className="text-lg font-semibold text-gray-900">{invoice.customerName || "N/A"}</p>
                        <p className="text-gray-600">{invoice.customerEmail || "N/A"}</p>
                    </div>

                    {/* Addresses side-by-side on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-6">
                        {renderAddressBlock(invoice.billingAddress, "Billing Address")}
                        {renderAddressBlock(invoice.shippingAddress, "Shipping Address")}
                    </div>

                    {/* Invoice Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-4 border-b border-gray-200">
                        <div>
                            <h3 className="text-md font-semibold text-gray-700 mb-1 flex items-center">
                                <CalendarIcon className="mr-1" />
                                Invoice Date
                            </h3>
                            <p className="text-gray-800">{invoice.invoiceDate || "N/A"}</p>
                        </div>
                        <div>
                            <h3 className="text-md font-semibold text-gray-700 mb-1 flex items-center">
                                <CalendarIcon className="mr-1" />
                                Due Date
                            </h3>
                            <p className="text-gray-800">{invoice.dueDate || "N/A"}</p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="mb-6 pb-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <BoxIcon className="mr-2" />
                            Items
                        </h2>
                        {invoice.items && invoice.items.length > 0 ? (
                            <div className="space-y-3">
                                {/* Table Header for items */}
                                <div className="hidden sm:grid grid-cols-5 text-sm font-semibold text-gray-600 pb-2 border-b border-gray-200">
                                    <span className="col-span-2">Item</span>
                                    <span className="text-right">Qty</span>
                                    <span className="text-right">Price</span>
                                    <span className="text-right">Amount</span>
                                </div>
                                {invoice.items.map((item, index) => (
                                    <div key={item.id || index} className="grid grid-cols-2 sm:grid-cols-5 items-center bg-gray-50 p-3 rounded-md shadow-sm">
                                        <div className="col-span-2">
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            {item.productCode && <p className="text-xs text-gray-500">Code: {item.productCode}</p>}
                                            {item.discount > 0 && (
                                                <p className="text-xs text-gray-500">
                                                    Discount: {item.discountPercent ? `${item.discount}%` : `$${parseFloat(item.discount).toFixed(2)}`}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right text-sm text-gray-600 sm:block hidden">{item.quantity}</div>
                                        <div className="text-right text-sm text-gray-600 sm:block hidden">${parseFloat(item.price).toFixed(2)}</div>
                                        <div className="text-right font-semibold text-gray-800 text-base col-span-1 sm:col-span-1">${parseFloat(item.amount).toFixed(2)}</div>
                                        {/* Visible on small screens for quantity and price */}
                                        <div className="sm:hidden text-xs text-gray-600 mt-1">Qty: {item.quantity} @ ${parseFloat(item.price).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No items added to this invoice.</p>
                        )}
                    </div>

                    {/* Totals Summary */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-sm bg-gray-50 p-5 rounded-lg shadow-inner">
                            <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
                                <span className="font-medium">Subtotal:</span>
                                <span className="font-semibold text-gray-800">${invoice.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
                                <span className="font-medium">TAX (0%):</span>
                                <span className="font-semibold text-gray-800">${invoice.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t-2 border-gray-300 pt-4 mt-4">
                                <span>Grand Total:</span>
                                <span className="text-blue-700">${invoice.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}