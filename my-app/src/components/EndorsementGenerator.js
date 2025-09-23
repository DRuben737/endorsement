import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import templates from '../templates';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import '../css/EndorsementGenerator.css';
import styles from '../css/EndorsementGenerator.module.css'; // 导入 CSS 模块

function EndorsementGenerator() {
  const [formData, setFormData] = useState({
    instructorName: '',
    instructorCertNumber: '',
    instructorCertExpDate: '',
    studentName: '',
    studentCertNumber: '',
    date: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClearSelection = () => {
    setSelectedTemplates([]); // 清空所选模板
  };
  
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const canvasRef = useRef(null);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.style.width = canvas.offsetWidth + 'px';
  canvas.style.height = canvas.offsetHeight + 'px';
  ctx.scale(ratio, ratio);
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#000';

  let drawing = false;

  const getOffset = (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDraw = (e) => {
    e.preventDefault();
    drawing = true;
    const { x, y } = getOffset(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const { x, y } = getOffset(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = (e) => {
    e.preventDefault();
    drawing = false;
    ctx.closePath();
  };

  // 鼠标事件
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);

  // 触控事件
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', endDraw, { passive: false });
  canvas.addEventListener('touchcancel', endDraw, { passive: false });

  return () => {
    canvas.removeEventListener('mousedown', startDraw);
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', endDraw);
    canvas.removeEventListener('mouseleave', endDraw);

    canvas.removeEventListener('touchstart', startDraw);
    canvas.removeEventListener('touchmove', draw);
    canvas.removeEventListener('touchend', endDraw);
    canvas.removeEventListener('touchcancel', endDraw);
  };
}, []);

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
  
    const {
      instructorName,
      instructorCertNumber,
      instructorCertExpDate,
      studentName,
      studentCertNumber,
      date,
    } = formData;
  
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
      const fontSize = 7;
      const margin = 30;
      const maxWidth = 270;
      const boxWidth = 280;
      const boxPadding = 5; // Padding between text and box

      // Embed signature image from canvas
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png');
      const signatureImageBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
      const signatureImage = await doc.embedPng(signatureImageBytes);
      const signatureDims = signatureImage.scale(0.5);

      // 2-column layout, dynamic row count per page
      let x = margin;
      let y = height - margin;
      const columns = 2;
      const boxSpacingX = 20;
      const boxSpacingY = 20;
      let col = 0;

      for (const templateKey of selectedTemplates) {
        let content = templates[templateKey];
        content = content
          .replace(/{studentName}/g, studentName)
          .replace(/{studentCertNumber}/g, studentCertNumber)
          .replace(/{date}/g, date)
          .replace(/{instructorName}/g, instructorName)
          .replace(/{instructorCertNumber}/g, instructorCertNumber)
          .replace(/{instructorCertExpDate}/g, instructorCertExpDate);
        content = sanitizeText(content);
        const lines = splitTextIntoLines(content, font, fontSize, maxWidth);
        const lineHeight = 1.15 * fontSize;
        const textHeight = lines.length * lineHeight;
        const boxHeight = textHeight + 2 * boxPadding;

        // Center the two-column layout
        const pageWidth = 612;
        const totalBoxWidth = columns * boxWidth + (columns - 1) * boxSpacingX;
        const horizontalOffset = (pageWidth - totalBoxWidth) / 2;

        // Check if adding this box would exceed the page bottom
        const willExceedPage = y - (boxHeight + boxSpacingY) < margin;
        if (willExceedPage || (col >= columns)) {
          page = doc.addPage([612, 792]);
          y = height - margin;
          col = 0;
        }

        x = horizontalOffset + col * (boxWidth + boxSpacingX);

        page.drawRectangle({
          x: x - boxPadding,
          y: y - boxHeight - boxPadding,
          width: boxWidth,
          height: boxHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });

        let textY = y;
        for (let i = 0; i < lines.length; i++) {
          page.drawText(lines[i], {
            x: x,
            y: textY - lineHeight,
            size: fontSize,
            font: font,
          });
          textY -= lineHeight;
        }

        // 找到最后一行的位置
        const finalLineY = textY - lineHeight;

        // 在末尾写入 “Signature:” 字样
        page.drawText("Signature:", {
          x: x,
          y: finalLineY,
          size: fontSize,
          font: font,
        });

        // 缩小签名图像尺寸
        const scaledWidth = 50;
        const scaledHeight = (signatureDims.height / signatureDims.width) * scaledWidth;

        // 插入签名图像在 “Signature:” 后面
        page.drawImage(signatureImage, {
          x: x + 55,  // “Signature:” 之后约5mm处
          y: finalLineY - 2,
          width: scaledWidth,
          height: scaledHeight,
        });

        col++;
        if (col >= columns) {
          col = 0;
          y -= (boxHeight + boxSpacingY);
        }
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

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <>
      <div className={styles.inputSection}>
      <input
        type="text"
        placeholder="Instructor Name"
        value={formData.instructorName}
        onChange={handleChange('instructorName')}
      />
      <input
        type="text"
        placeholder="Instructor Cert Number"
        value={formData.instructorCertNumber}
        onChange={handleChange('instructorCertNumber')}
      />
      <input
        type="text"
        placeholder="Instructor Cert Exp Date (MM/DD/YYYY)"
        value={formData.instructorCertExpDate}
        onChange={handleChange('instructorCertExpDate')}
      />
      <input
        type="text"
        placeholder="Student Name"
        value={formData.studentName}
        onChange={handleChange('studentName')}
      />
      <input
        type="text"
        placeholder="Student Cert Number (optional)"
        value={formData.studentCertNumber}
        onChange={handleChange('studentCertNumber')}
      />
      <input
        type="text"
        placeholder="Date (MM/DD/YYYY)"
        value={formData.date}
        onChange={handleChange('date')}
      />
      </div>

      <div className={styles.signatureContainer}>
        <p className={styles.signatureLabel}>Draw your signature (or leave blank and sign on paper):</p>
        <div className={styles.signatureWrapper}>
          <canvas
            ref={canvasRef}
            className={styles.signatureCanvas}
            width={800}
            height={300}
          />
        </div>
        <button className={styles.clearButton} onClick={() => {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }}>
          Clear
        </button>
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