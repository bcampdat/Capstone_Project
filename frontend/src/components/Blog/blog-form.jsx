import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import axios from "axios";
import { UserContext } from "../auth/userContext";
import RichTextEditor from "../modals/rich-text-editor";

const BlogForm = ({ post, isEdit, handleSuccessfulNewBlogSubmission }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    if (isEdit && post) {
      setTitle(post.title);
      setContent(post.content);
      setFeaturedImage(
        post.featured_image
          ? {
              file: {
                name: post.featured_image,
                preview: `http://localhost:3001${post.featured_image}`,
              },
            } // Asegura que tienes la URL completa
          : null
      );
    }
  }, [isEdit, post]);

  const handleImageChange = (files) => {
    setFeaturedImage(files[0]); // Guardamos  el archivo en el estado
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/posts/upload-editor-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.url; // Devolver la URL de la imagen subida
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("usuario_id", user.id_users); // Incluir el ID del usuario

      if (featuredImage && featuredImage.file instanceof File) {
        // Si es un archivo nuevo, lo subimos
        formData.append("featured_image", featuredImage.file);
      } else if (featuredImage && featuredImage.file.name) {
        // Si es la imagen existente, solo pasamos el nombre
        formData.append("featured_image", featuredImage.file.name);
      }

      let postId;
      if (isEdit) {
        await axios.put(
          `http://localhost:3001/api/posts/update/${post.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        postId = post.id;
      } else {
        const postResponse = await axios.post(
          "http://localhost:3001/api/posts/create",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        postId = postResponse.data.postId;
      }

      handleSuccessfulNewBlogSubmission({ id: postId, title, content });
    } catch (error) {
      console.error("Error al guardar el post:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-1xl border border-amber-300 mx-auto bg-transparent p-6 shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium dark:text-white">
          Título del Blog
        </label>
        <input
          className="mt-1 block w-full border border-amber-300 p-2 rounded-lg shadow-lg bg-transparent dark:text-white"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribe tu título...."
          required
        />
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium dark:text-white">
          Contenido
        </label>
        <div className="mt-1 block w-full border border-amber-300 p-2 rounded-lg shadow-lg ">
          <RichTextEditor
            value={content}
            onChange={setContent}
            onImageUpload={uploadImage}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium dark:text-white">
          Imagen Destacada
        </label>
        <div className="mt-1 block w-full border border-amber-300 p-2 rounded-lg shadow-lg">
          <Dropzone
            onChange={handleImageChange}
            maxFiles={1}
            accept="image/*"
            className="border dark:text-white border-amber-300 rounded-md p-2 shadow-md "
          >
            {featuredImage && (
              <FileMosaic
                file={featuredImage}
                alt="Imagen destacada"
                width="200px"
                height="300px"
                className="mt-2 rounded-md shadow-md border border-amber-300 dark:text-white"
              />
            )}
          </Dropzone>
        </div>
      </div>

      <button
        type="submit"
        className="bg-neutral-700 hover:bg-sky-300 shadow-lg font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        {isEdit ? "Actualizar Post" : "Crear Post"}
      </button>
    </form>
  );
};

// Validación de props con PropTypes
BlogForm.propTypes = {
  post: PropTypes.object, // 'post' es opcional pero debe ser un objeto si se proporciona
  isEdit: PropTypes.bool.isRequired, // 'isEdit' es obligatorio y debe ser booleano
  handleSuccessfulNewBlogSubmission: PropTypes.func.isRequired, // Función requerida
};

export default BlogForm;
