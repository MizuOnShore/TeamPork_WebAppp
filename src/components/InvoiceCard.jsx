import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadIcon } from './Icons'; 

export default function InvoiceCard({ invoice, index, indexOfFirstInvoice, onDownloadPdf }) {
    const navigate = useNavigate();

    return (
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
                    onClick={() => onDownloadPdf(invoice)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <DownloadIcon className="mr-1 text-gray-500" />
                    Download
                </button>
            </div>
        </div>
    );
}