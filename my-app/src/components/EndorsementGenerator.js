import React, { useState } from 'react';
import Modal from 'react-modal';
import templates from '../templates';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import '../css/EndorsementGenerator.css';
import styles from '../css/EndorsementGenerator.module.css'; // 导入 CSS 模块

function EndorsementGenerator() {
  const [instructorName, setInstructorName] = useState('');
  const [instructorCertNumber, setInstructorCertNumber] = useState('');
  const [instructorCertExpDate, setInstructorCertExpDate] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentCertNumber, setStudentCertNumber] = useState('');
  const [date, setDate] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClearSelection = () => {
    setSelectedTemplates([]); // 清空所选模板
  };
  
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const sanitizeText = (text) => {
    return text.replace(/\t/g, ' ').replace(/[\u{0080}-\u{FFFF}]/gu, ''); // Replace tabs with spaces and remove non-standard characters
  };

  const splitTextIntoLines = (text, font, fontSize, maxWidth) => {
    const paragraphs = text.split('\n');
    const lines = [];

    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(' ');
      let currentLine = '';

      words.forEach((word) => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      lines.push(''); // Add an empty line to separate paragraphs
    });

    return lines;
  };

  const handleGeneratePDF = async () => {
    if (selectedTemplates.length === 0) {
      alert('Please select at least one template before generating the PDF.');
      return;
    }
  
    const userConfirmed = window.confirm(`
      Please verify the information before generating the PDF:
      Instructor Name: ${instructorName}
      Instructor Cert Number: ${instructorCertNumber}
      Instructor Cert Exp Date: ${instructorCertExpDate}
      Student Name: ${studentName}
      Student Cert Number: ${studentCertNumber}
      Date: ${date}
    `);
  
    if (!userConfirmed) {
      return;
    }
  
    try {
      const doc = await PDFDocument.create();
      let page = doc.addPage([612, 792]); // 8.5 x 11 inches
      const { height } = page.getSize();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;
      const margin = 50;
      const maxWidth = 288; // 4 inches in points
      const boxWidth = 295; // Box width (slightly more than text width)
      const boxPadding = 5; // Padding between text and box
      let currentY = height - margin; // Start from the top of the page
  
      for (const templateKey of selectedTemplates) {
        let content = templates[templateKey];
        content = content
          .replace(/{studentName}/g, studentName)
          .replace(/{studentCertNumber}/g, studentCertNumber)
          .replace(/{date}/g, date)
          .replace(/{instructorName}/g, instructorName)
          .replace(/{instructorCertNumber}/g, instructorCertNumber)
          .replace(/{instructorCertExpDate}/g, instructorCertExpDate);
  
        // Sanitize content
        content = sanitizeText(content);
  
        const lines = splitTextIntoLines(content, font, fontSize, maxWidth);
        const lineHeight = 1.2 * fontSize;
        const textHeight = lines.length * lineHeight;
  
        // Calculate box height
        const boxHeight = textHeight + 0.9 * boxPadding;
  
        if (currentY - boxHeight < margin) {
          // Add a new page if current page is full
          page = doc.addPage([612, 792]);
          currentY = height - margin;
        }
  
        // Draw the black border box
        page.drawRectangle({
          x: margin - boxPadding,
          y: currentY - boxHeight - boxPadding,
          width: boxWidth,
          height: boxHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1, // Black border
        });
  
        // Draw the text inside the box
        lines.forEach((line) => {
          page.drawText(line, {
            x: margin,
            y: currentY - lineHeight,
            size: fontSize,
            font: font,
            maxWidth: maxWidth,
          });
          currentY -= lineHeight;
        });
  
        currentY -= lineHeight + boxPadding; // Add extra space between templates
      }
  
      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      console.log('PDF generated successfully:', url);
  
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handlePreview = () => {
    if (!pdfUrl) {
      alert('Please generate the PDF first.');
      return;
    }
    const previewWindow = window.open(pdfUrl, '_blank');
    if (!previewWindow) {
      alert('Failed to open preview window.');
    }
  };

  const handlePrint = () => {
    if (!pdfUrl) {
      alert('Please generate the PDF first.');
      return;
    }
    const printWindow = window.open(pdfUrl, '_blank');
    if (!printWindow) {
      alert('Failed to open print window.');
    } else {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTemplateSelection = (templateKey) => {
    setSelectedTemplates((prevSelected) =>
      prevSelected.includes(templateKey)
        ? prevSelected.filter((key) => key !== templateKey) // Deselect if already selected
        : [...prevSelected, templateKey] // Select if not already selected
    );
  };

  const handleDeselectTemplate = (templateKey) => {
    setSelectedTemplates((prev) => prev.filter(template => template !== templateKey));
  };
  
  const handleConfirmSelection = () => {
    if (selectedTemplates.length === 0) {
      alert('Please select at least one template before confirming.');
      return;
    }
    closeModal();
  };

  return (
    <>
      <div className={styles.inputSection}>
      <input
        type="text"
        placeholder="Instructor Name"
        value={instructorName}
        onChange={(e) => setInstructorName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Instructor Cert Number"
        value={instructorCertNumber}
        onChange={(e) => setInstructorCertNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Instructor Cert Exp Date (MM/DD/YYYY)"
        value={instructorCertExpDate}
        onChange={(e) => setInstructorCertExpDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Student Cert Number (optional)"
        value={studentCertNumber}
        onChange={(e) => setStudentCertNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date (MM/DD/YYYY)"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      </div>
      <div className={styles.buttonSection}>
      <button onClick={openModal}>Select Endorsement</button>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
      <button onClick={handlePreview}>Preview</button>
      <button onClick={handlePrint}>Print</button>
      </div>
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Select Template"
  className="Modal"
  overlayClassName="Overlay"
>
  <div className="ModalHeader">
    <div className="HeaderContent">
      <h2>Select Templates</h2>
    </div>
    <div className="HeaderButtons">
      <button onClick={handleClearSelection} className="ClearSelectionButton">Clear</button>
      <button onClick={handleConfirmSelection} className="ConfirmButton">Confirm</button>
      <button onClick={closeModal} className="CloseButton">X</button>
    </div>
  </div>

  <div className="SelectedTemplates">
    {selectedTemplates.length > 0 && (
      <ul>
        {selectedTemplates.map((template) => (
          <li key={template} className="SelectedTemplate">
            {template}
            <button onClick={() => handleDeselectTemplate(template)} className="DeselectButton">x</button>
          </li>
        ))}
      </ul>
    )}
  </div>

  <ul className="TemplateList">
    {Object.keys(templates).map((templateKey) => (
      <li
        key={templateKey}
        className={selectedTemplates.includes(templateKey) ? 'SelectedTemplate' : ''}
        onClick={() => handleTemplateSelection(templateKey)}
      >
        {templateKey}
      </li>
    ))}
  </ul>
</Modal>
    </>
  );
}

export default EndorsementGenerator;
