// Import required libraries
const fs = require('fs');
const PDFParser = require('pdf2json');
const PDFDocument = require('pdfkit');
const extract = require('pdf-text-extract');
const pdfjsLib = require('pdfjs-dist');

// Function to parse PDF file using pdf2json
function parsePDFWithPdf2json(filePath) {
    return new Promise((resolve, reject) => {
        let pdfParser = new PDFParser();

        pdfParser.loadPDF(filePath);

        pdfParser.on('pdfParser_dataReady', function(pdfData) {
            resolve(pdfData);
        });

        pdfParser.on('pdfParser_dataError', function(err) {
            reject(err);
        });
    });
}

// Function to extract text from PDF using pdf-text-extract
function extractTextFromPDF(filePath) {
    return new Promise((resolve, reject) => {
        extract(filePath, (err, pages) => {
            if (err) {
                reject(err);
            } else {
                resolve(pages.join('\n'));
            }
        });
    });
}

// Function to Chat PDF document using pdfkit
function generatePDF() {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('output.pdf'));

    doc.fontSize(20).text('Hello, World!');
    doc.end();
}

// Function to Chat-PDF using pdf.js
async function parsePDFWithPdfjs(filePath) {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const loadingTask = pdfjsLib.getDocument(data);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const textContent = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join('\n');
        textContent.push(pageText);
    }

    return textContent.join('\n');
}

// Example usage
const pdfFilePath = 'example.pdf';

parsePDFWithPdf2json(pdfFilePath)
    .then(pdfData => {
        console.log('PDF parsed successfully using pdf2json:', pdfData);
        // Your further processing logic here
    })
    .catch(error => {
        console.error('Error parsing PDF using pdf2json:', error);
    });

extractTextFromPDF(pdfFilePath)
    .then(text => {
        console.log('Text extracted successfully:', text);
        // Your further processing logic here
    })
    .catch(error => {
        console.error('Error extracting text from PDF:', error);
    });

generatePDF();

parsePDFWithPdfjs(pdfFilePath)
    .then(text => {
        console.log('PDF parsed successfully using pdf.js:', text);
        // Your further processing logic here for chatpdf
    })
    .catch(error => {
        console.error('Error parsing PDF using pdf.js:', error);
    });
