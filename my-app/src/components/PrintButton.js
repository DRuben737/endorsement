import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PrintButton = ({ template, formData }) => {
  const printPDF = () => {
    const doc = new jsPDF();
    const templateContent = template.replace(/{{(\w+)}}/g, (_, key) => formData[key] || '');
    doc.text(templateContent, 10, 10);
    doc.save('endorsement.pdf');
  };

  return (
    <button onClick={printPDF}>Print PDF</button>
  );
};

export default PrintButton;
