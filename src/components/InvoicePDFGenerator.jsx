const renderAddressHtml = (address, title) => {
    if (!address || (!address.address1 && !address.city && !address.province && !address.zipCode && !address.country)) {
        return ''; 
    }
    return `
        <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 8px; display: flex; align-items: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style="margin-right: 8px;">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                ${title}
            </h3>
            <p style="color: #374151;">${address.address1 || ''}</p>
            ${address.address2 ? `<p style="color: #374151;">${address.address2}</p>` : ''}
            <p style="color: #374151;">${address.city || ''}, ${address.province || ''} ${address.zipCode || ''}</p>
            <p style="color: #374151;">${address.country || ''}</p>
        </div>
    `;
};

export const generateInvoicePdf = async (invoiceToDownload) => {
    const loadHtml2canvas = () => {
        return new Promise((resolve, reject) => {
            if (window.html2canvas) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            script.onload = resolve;
            script.onerror = (error) => {
                console.error("Failed to load html2canvas script:", error);
                reject("Error loading PDF generation libraries. Please check your internet connection.");
            };
            document.body.appendChild(script);
        });
    };

    const loadJspdf = () => {
        return new Promise((resolve, reject) => {
            if (window.jspdf) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
            script.onload = resolve;
            script.onerror = (error) => {
                console.error("Failed to load jspdf script:", error);
                reject("Error loading PDF generation libraries. Please check your internet connection.");
            };
            document.body.appendChild(script);
        });
    };

    try {
        await Promise.all([loadHtml2canvas(), loadJspdf()]);
    } catch (error) {
        alert(error);
        return;
    }


    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px'; 
    tempDiv.style.width = '794px';
    tempDiv.style.padding = '30px';
    tempDiv.style.backgroundColor = '#ffffff'; 

    tempDiv.innerHTML = `
        <style>
            body { font-family: 'Inter', sans-serif; }
            .text-gray-900 { color: #1a202c; }
            .text-gray-800 { color: #2d3748; }
            .text-gray-700 { color: #4a5568; }
            .text-gray-600 { color: #718096; }
            .text-gray-500 { color: #a0aec0; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-medium { font-weight: 500; }
            .text-xl { font-size: 1.25rem; }
            .text-lg { font-size: 1.125rem; }
            .text-sm { font-size: 0.875rem; }
            .text-xs { font-size: 0.75rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .pb-4 { padding-bottom: 1rem; }
            .border-b { border-bottom-width: 1px; }
            .border-gray-200 { border-color: #edf2f7; }
            .bg-green-100 { background-color: #c6f6d5; }
            .text-green-800 { color: #22543d; }
            .rounded-full { border-radius: 9999px; }
            .inline-flex { display: inline-flex; }
            .items-center { align-items: center; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .px-2\.5 { padding-left: 0.625rem; padding-right: 0.625rem; }
            .py-0\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
            .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem; }
            .p-3 { padding: 0.75rem; }
            .bg-gray-50 { background-color: #f9fafb; }
            .rounded-md { border-radius: 0.375rem; }
            .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
            .border-t { border-top-width: 1px; }
            .pt-4 { padding-top: 1rem; }
            .mt-2 { margin-top: 0.5rem; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-4 { gap: 1rem; }
            .mr-2 { margin-right: 0.5rem; }
            .ml-2 { margin-left: 0.5rem; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .items-end { align-items: flex-end; }
            .w-full { width: 100%; }
            .max-w-xs { max-width: 20rem; } /* Tailwind default */
        </style>
        <div style="max-width: 768px; margin-left: auto; margin-right: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <span style="display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; background-color: #d1fae5; color: #065f46;">
                    ${invoiceToDownload.status}
                </span>
                <span style="font-size: 2.25rem; font-weight: 700; color: #1f2937;">$${invoiceToDownload.total.toFixed(2)}</span>
            </div>

            <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                <h2 style="font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 8px; display: flex; align-items: center;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style="margin-right: 8px;">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Customer Details
                </h2>
                <p style="font-size: 1.125rem; font-weight: 600; color: #1f2937;">${invoiceToDownload.customerName || "N/A"}</p>
                <p style="color: #4b5563;">${invoiceToDownload.customerEmail || "N/A"}</p>
            </div>

            ${renderAddressHtml(invoiceToDownload.billingAddress, "Billing Address")}

            ${renderAddressHtml(invoiceToDownload.shippingAddress, "Shipping Address")}

            <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                <div>
                    <h3 style="font-size: 1rem; font-weight: 600; color: #4a5568; margin-bottom: 4px; display: flex; align-items: center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style="margin-right: 4px;">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Invoice Date
                    </h3>
                    <p style="color: #374151;">${invoiceToDownload.invoiceDate}</p>
                </div>
                <div>
                    <h3 style="font-size: 1rem; font-weight: 600; color: #4a5568; margin-bottom: 4px; display: flex; align-items: center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style="margin-right: 4px;">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Due Date
                    </h3>
                    <p style="color: #374151;">${invoiceToDownload.dueDate || "N/A"}</p>
                </div>
            </div>

            <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                <h2 style="font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 16px; display: flex; align-items: center;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style="margin-right: 8px;">
                        <path d="M12.89 1.11l6.89 6.89-1.11 1.11-6.89-6.89zM19 12v7c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-7H3l9-9 9 9h-2z" />
                    </svg>
                    Items
                </h2>
                ${invoiceToDownload.items && invoiceToDownload.items.length > 0 ?
                    invoiceToDownload.items.map(item => `
                        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9fafb; padding: 12px; border-radius: 6px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); margin-bottom: 12px;">
                            <div>
                                <p style="font-weight: 500; color: #1f2937;">${item.name}</p>
                                ${item.productCode ? `<p style="font-size: 0.75rem; color: #6b7280;">Code: ${item.productCode}</p>` : ''}
                                <p style="font-size: 0.875rem; color: #4b5563;">Qty: ${item.quantity} @ $${parseFloat(item.price).toFixed(2)}</p>
                                ${item.discount > 0 ? `<p style="font-size: 0.75rem; color: #6b7280;">Discount: ${item.discountPercent ? `${item.discount}%` : `$${parseFloat(item.discount).toFixed(2)}`}</p>` : ''}
                            </div>
                            <span style="font-weight: 600; color: #374151;">$${parseFloat(item.amount).toFixed(2)}</span>
                        </div>
                    `).join('')
                    : '<p style="color: #6b7280; font-size: 0.875rem;">No items added to this invoice.</p>'
                }
            </div>

            <div style="display: flex; flex-direction: column; align-items: flex-end;">
                <div style="width: 100%; max-width: 320px; /* max-w-xs */">
                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: #4a5568; margin-bottom: 8px;">
                        <span>Subtotal</span>
                        <span>$${invoiceToDownload.subtotal.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: #4a5568; margin-bottom: 16px;">
                        <span>TAX(0%)</span>
                        <span>$${invoiceToDownload.tax.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.125rem; color: #1f2937; border-top: 1px solid #d1d5db; padding-top: 8px; margin-top: 8px;">
                        <span>Total</span>
                        <span>$${invoiceToDownload.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(tempDiv);

    try {
        const canvas = await window.html2canvas(tempDiv, {
            scale: 2, 
            useCORS: true, 
            windowWidth: tempDiv.scrollWidth,
            windowHeight: tempDiv.scrollHeight, 
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });

        const imgWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`invoice-${invoiceToDownload.id}.pdf`);
        alert("Invoice PDF downloaded successfully!");
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
    } finally {
        document.body.removeChild(tempDiv); 
    }
};