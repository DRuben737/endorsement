import { PDFDocument, StandardFonts } from 'pdf-lib';

const generatePDF = async (templateName, data) => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // 8.5 x 11 inches
  const { width, height } = page.getSize();

  // Load a font
  const font = await doc.embedFont(StandardFonts.Helvetica);

  // Define text content based on template
  let text = '';
  if (templateName === 'default') {
    text = `
      I certify that ${data.studentName} ${data.studentCertNumber} has received and logged training time within 2 calendar-months preceding the month of application in preparation for the practical test and ${data.studentName} is prepared for the required practical test for the issuance of _________certificate.

      Date: ${data.date}    Signature:
      ${data.instructorName} ${data.instructorCertNumber} Exp. ${data.instructorCertExpDate}
    `;
  }
  // 添加更多模板内容...

  // Define the text size and margins
  const fontSize = 10;
  const margin = 50;
  const textWidth = 4 * 72; // 4 inches in points

  // Calculate text height
  const lines = text.split('\n');
  const lineHeight = 1.2 * fontSize;
  const textHeight = lines.length * lineHeight;

  // Draw the text inside the page
  page.drawText(text, {
    x: margin,
    y: height - margin - textHeight,
    size: fontSize,
    font: font,
    lineHeight: lineHeight,
    maxWidth: textWidth,
  });

  // Save the document
  const pdfBytes = await doc.save();
  const url = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));

  return { pdfBytes, url };
};

export { generatePDF };