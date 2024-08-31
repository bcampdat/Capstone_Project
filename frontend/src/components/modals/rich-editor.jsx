import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Importa los estilos CSS

const RichTextEditor = ({ editMode, contentToEdit, handleRichTextEditorChange }) => {
  // Estado del editor utilizando useState
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Efecto para inicializar el editor con contenido existente si estamos en modo edición
  useEffect(() => {
    if (editMode && contentToEdit) {
      const blocksFromHtml = htmlToDraft(contentToEdit);
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      }
    }
  }, [editMode, contentToEdit]);

  // Función de cambio del estado del editor usando useCallback
  const onEditorStateChange = useCallback(
    (newEditorState) => {
      setEditorState(newEditorState);
      handleRichTextEditorChange(
        draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
      );
    },
    [handleRichTextEditorChange]
  );

  // Función para convertir la imagen en base64
  const getBase64 = useCallback((file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error('Error converting file to base64', error);
  }, []);

  // Función para manejar la subida de archivos
  const uploadFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      getBase64(file, (data) => resolve({ data: { link: data } }));
    });
  }, [getBase64]);

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadFile,
            alt: { present: true, mandatory: false },
            previewImage: true,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg+xml",
          },
        }}
      />
    </div>
  );
};

// Define PropTypes para validar las propiedades
RichTextEditor.propTypes = {
  editMode: PropTypes.bool,
  contentToEdit: PropTypes.string,
  handleRichTextEditorChange: PropTypes.func.isRequired,
};

export default RichTextEditor;
