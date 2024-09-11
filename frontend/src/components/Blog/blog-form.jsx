import React, { useState, useContext, useEffect } from "react";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import axios from "axios";
import { UserContext } from "../auth/userContext";
import RichTextEditor from "../modals/rich-text-editor";

const BlogForm = ({ post, isEdit, handleSuccessfulNewBlogSubmission }) => {
  const { user } = useContext(UserContext); // Obtener usuario logueado del contexto
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    if (isEdit && post) {
      setTitle(post.title);
      setContent(post.content);
      setFeaturedImage(
        post.featured_image ? { file: { name: post.featured_image } } : null
      );
    }
  }, [isEdit, post]);

  const handleImageChange = (files) => {
    setFeaturedImage(files[0].file);
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
      formData.append("usuario_id", user.id_users); // Asegúrate de que el user ID se incluye

      if (featuredImage) {
        formData.append("featured_image", featuredImage); // Agregar imagen destacada si existe
      }

      let postId;
      if (isEdit) {
        // Si es edición, usar PUT
        await axios.put(
          `http://localhost:3001/api/posts/update/${post.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        postId = post.id;
      } else {
        // Si es creación, usar POST
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

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/posts/delete/${postId}`,
        {
          data: { usuario_id: user.id_users },
        }
      );
      if (response.status === 200) {
        console.log("Post eliminado con éxito");
        // Aquí puedes actualizar la interfaz de usuario para reflejar la eliminación
      }
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-1xl border border-amber-300 mx-auto bg-transparent p-6 shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm bg-transparent font-medium dark:text-white">
          Título del Blog
        </label>
        <input
          className="mt-1 block w-full border border-amber-300 shadow-lg bg-transparent dark:text-white"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="mt-1 block w-full border border-amber-300 shadow-lg bg-transparent dark:text-white">
          Contenido
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          onImageUpload={uploadImage}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm border border-amber-300 shadow-lg font-medium bg-transparent dark:text-white">
          Imagen Destacada
        </label>
        <Dropzone
          onChange={handleImageChange}
          maxFiles={1}
          accept="image/*"
          className="border-dashed border-2 border-amber-300 p-4 rounded-lg shadow-lg dark:text-white"
        >
          {featuredImage && (
            <FileMosaic
              file={featuredImage}
              alt="Imagen destacada"
              width="200px"
              height="200px"
              className="mt-4 rounded-lg shadow-lg border border-amber-300"
            />
          )}
        </Dropzone>
      </div>

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        {isEdit ? "Actualizar Post" : "Crear Post"}
      </button>
    </form>
  );
};

export default BlogForm;
