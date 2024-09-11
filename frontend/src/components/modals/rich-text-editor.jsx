import React, { useState, useEffect } from "react";
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

export default RichTextEditor;
