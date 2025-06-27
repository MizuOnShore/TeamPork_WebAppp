import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer"; 
import { useNavigate } from "react-router-dom";
import { DownloadIcon } from "../components/Icons"; 
import { generateInvoicePdf } from "../components/InvoicePDFGenerator"; 
export default function Dashboard() {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 5;

    useEffect(() => {
        const storedInvoices = localStorage.getItem('invoices');
        if (storedInvoices) {
            try {
                setInvoices(JSON.parse(storedInvoices));
            } catch (e) {
                console.error("Failed to parse invoices from localStorage", e);
                setInvoices([]);
            }
        }
    }, []);

    const indexOfLastInvoice = currentPage * invoicesPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
    const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
    const totalPages = Math.ceil(invoices.length / invoicesPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleDownloadInvoice = (invoice) => {
        generateInvoicePdf(invoice);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Recent Invoices</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage and track your invoices
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={() => navigate('/invoices/new')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg
                                    className="-ml-1 mr-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Add Invoice
                            </button>
                        </div>
                    </div>
                    {invoices.length === 0 ? (
                        <div className="border-4 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
                            <p className="text-gray-500">No invoices yet. Click "Add Invoice" to create one.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-4">
                                {currentInvoices.map((invoice, index) => (
                                    <div key={invoice.id || index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center">
                                                <span className="text-xl font-bold text-gray-800 mr-2">#{indexOfFirstInvoice + index + 1}</span>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {invoice.status}
                                                </span>
                                            </div>
                                            <span className="text-2xl font-bold text-gray-900">${invoice.total.toFixed(2)}</span>
                                        </div>
                                        <p className="text-gray-700 font-medium">{invoice.customerName || "No Customer"}</p>
                                        <p className="text-sm text-gray-500 mb-4">{invoice.invoiceDate}</p>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => navigate(`/invoices/${invoice.id}`)}
                                                className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                <svg className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View
                                            </button>
                                            <button className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                <svg className="h-5 w-5 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.913 9.913 0 01-3.003-.544M12 21c4.97 0 9-3.582 9-8s-4.03-8-9-8-9 3.582-9 8 4.03 8 9 8z" />
                                                </svg>
                                                Send
                                            </button>
                                            <button
                                                onClick={() => handleDownloadInvoice(invoice)} // Use the new handler
                                                className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                <DownloadIcon className="mr-1 text-gray-500" />
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-2 mt-6">
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm font-medium text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}