import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    if (value) {
      setEditorValue(value);
    }
  }, [value]);

  const handleChange = (content) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <ReactQuill
      value={editorValue}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
      }}
      placeholder="Escribe tu contenido aquí..."
    />
  );
};

// Validación de props con PropTypes
RichTextEditor.propTypes = {
  value: PropTypes.string, // 'value' es opcional pero debe ser string si se proporciona
  onChange: PropTypes.func.isRequired, // 'onChange' es obligatorio y debe ser una función
};

export default RichTextEditor;
