import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import RichTextEditor from "../modals/rich-editor";

const BlogForm = ({ editMode, posts, handleUpdateFormSubmission, handleSuccessfullFormSubmission, deleteImage }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [apiUrl, setApiUrl] = useState("http://localhost:3001/posts");
  const [apiAction, setApiAction] = useState("post");

  const featuredImageRef = useRef(null);

  useEffect(() => {
    if (editMode && posts) {
      setId(posts.id);
      setTitle(posts.title);
      setContent(posts.content);
      setApiUrl(`http://localhost:3001/api/posts/${posts.id}`);
      setApiAction("patch");
    }
  }, [editMode, posts]);

  const componentConfig = {
    iconFiletypes: [".jpg", ".png"],
    showFiletypeIcon: true,
    postUrl: "http://httpbin.org/post",
  };

  const djsConfig = {
    addRemoveLinks: true,
    maxFiles: 1,
  };

  const handleFeaturedImageDrop = {
    addedfile: (file) => setFeaturedImage(file),
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
        featuredImageRef.current.dropzone.removeAllFiles();
      }

      setTitle("");
      setContent("");
      setFeaturedImage("");

      if (editMode) {
        handleUpdateFormSubmission(response.data.post);
      } else {
        handleSuccessfullFormSubmission(response.data.post);
      }
    } catch (error) {
      console.log("Error handling form submission", error);
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
          contentToEdit={editMode && posts.content ? posts.content : null}
        />
      </div>

      <div className="image-uploaders">
        {editMode && posts.featured_image ? (
          <div className="portfolio-manager-image-wrapper">
            <img src={posts.featured_image} alt="Featured" />
            <div className="image-removal-link">
              <button onClick={() => deleteImage("featured_image")}>Remove file</button>
            </div>
          </div>
        ) : (
          <DropzoneComponent
            ref={featuredImageRef}
            config={componentConfig}
            djsConfig={djsConfig}
            eventHandlers={handleFeaturedImageDrop}
          >
            <div className="dz-message">Featured Image</div>
          </DropzoneComponent>
        )}
      </div>

      <button className="btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default BlogForm;
