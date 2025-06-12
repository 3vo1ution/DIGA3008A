document.addEventListener("DOMContentLoaded", function() {
    // Configure PDF.js API
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    
    // Get DOM elements
    const canvas = document.getElementById('PdfCanvas');
    const ctx = canvas.getContext('2d');
    const pageNumElem = document.getElementById('PdfPageNum');
    const pageCountElem = document.getElementById('PdfPageCount');
    const prevBtn = document.getElementById('PdfPrevPage');
    const nextBtn = document.getElementById('PdfNextPage');
    const errorElem = document.getElementById('PdfError');
    
    // PDF state
    let pdfDoc = null;
    let currentPage = 1;
    const scale = 1.5;
    
    // Load PDF
    const pdfPath = 'https://3vo1ution.github.io/DIGA3008A/Portfolio/PortfolioImages/PDFs/2023CreativePortfolio.pdf';
    
    pdfjsLib.getDocument(pdfPath).promise
        .then(pdf => {
            pdfDoc = pdf;
            pageCountElem.textContent = pdf.numPages;
            renderPage(currentPage);
        })
        .catch(error => {
            console.error("PDF Error:", error);
            errorElem.style.display = 'block';
            errorElem.textContent = `Error loading PDF: ${error.message}`;
        });
    
    // Render function
    function renderPage(num) {
        pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            page.render({
                canvasContext: ctx,
                viewport
            });
            
            pageNumElem.textContent = num;
        });
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        if (currentPage <= 1) return;
        currentPage--;
        renderPage(currentPage);
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage >= pdfDoc.numPages) return;
        currentPage++;
        renderPage(currentPage);
    });
});