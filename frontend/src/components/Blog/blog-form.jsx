import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import RichTextEditor from "../modals/rich-editor";

const BlogForm = ({ post, editMode, handleUpdateFormSubmission, handleSuccessfullFormSubmission, handleFeaturedImageDelete }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [apiUrl, setApiUrl] = useState("http://localhost:3001/api/posts");
  const [apiAction, setApiAction] = useState("post");

  const dropzoneRef = useRef(null);

  useEffect(() => {
    if (editMode) {
      setTitle(post.title);
      setContent(post.content);
      setApiUrl(`http://localhost:3001/api/posts/${post.id}`);
      setApiAction("patch");
    }
  }, [editMode, post]);

  const handleDrop = (acceptedFiles) => {
    setFeaturedImage(acceptedFiles[0]);
  };

  const buildForm = () => {
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[content]", content);

    if (featuredImage) {
      formData.append("post[featured_image]", featuredImage);
    }

    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: apiAction,
        url: apiUrl,
        data: buildForm(),
        withCredentials: true,
      });

      if (featuredImage) {
        dropzoneRef.current.removeAllFiles();
      }

      // Reset state after submission
      setTitle("");
      setContent("");
      setFeaturedImage(null);

      if (editMode) {
        handleUpdateFormSubmission(response.data.post);
      } else {
        handleSuccessfullFormSubmission(response.data.post);
      }
    } catch (error) {
      console.error("handleSubmit for blog error", error);
    }
  };

  const deleteImage = async (imageType) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/posts/${post.id}?image_type=${imageType}`,
        { withCredentials: true }
      );
      handleFeaturedImageDelete();
    } catch (error) {
      console.error("deleteImage error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form-wrapper">
      <div className="two-column">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="Blog Title"
          value={title}
        />
      </div>

      <div className="one-column">
        <RichTextEditor
          handleRichTextEditorChange={setContent}
          editMode={editMode}
          contentToEdit={editMode ? post.content : null}
        />
      </div>

      <div className="image-uploaders">
        {editMode && post.featured_image ? (
          <div className="blog-manager-image-wrapper">
            <img src={post.featured_image} alt="Featured" />
            <div className="image-removal-link">
              <button type="button" onClick={() => deleteImage("featured_image")}>
                Remove file
              </button>
            </div>
          </div>
        ) : (
          <Dropzone
            ref={dropzoneRef}
            onDrop={handleDrop}
            accept=".jpg, .png"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dz-message">
                <input {...getInputProps()} />
                {featuredImage ? "File selected: " + featuredImage.name : "Featured Image"}
              </div>
            )}
          </Dropzone>
        )}
      </div>

      <button type="submit" className="btn">Save</button>
    </form>
  );
};

export default BlogForm;
