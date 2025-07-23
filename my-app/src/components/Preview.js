import React, { useState } from 'react';
import { templates } from '../templates';

const Preview = ({ endorsementData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  const handleTemplateChange = (e) => {
    const templateName = e.target.value;
    setSelectedTemplate(templateName);

    if (endorsementData && templateName) {
      const templateFunction = templates[templateName];
      const content = templateFunction(endorsementData);
      setPreviewContent(content);
    }
  };

  return (
    <div>
      <h2>Preview Endorsement</h2>
      <select onChange={handleTemplateChange} value={selectedTemplate}>
        <option value="">Select a Template</option>
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
        <option value="template3">Template 3</option>
        <option value="template4">Template 4</option>
        {/* Add more options as needed */}
      </select>
      <div>
        {previewContent ? (
          <div>
            <h3>Preview Content:</h3>
            <div dangerouslySetInnerHTML={{ __html: previewContent }} />
          </div>
        ) : (
          <p>Please select a template to preview the content.</p>
        )}
      </div>
    </div>
  );
};

export default Preview;
