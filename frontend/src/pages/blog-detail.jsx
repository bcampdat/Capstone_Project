import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import BlogForm from '../components/Blog/blog-form'; 
import BlogFeaturedImage from '../components/Blog/blog-featured-image'; 
import { UserContext } from '../components/auth/userContext'; 

const BlogDetail = () => {
  const { currentId } = useParams(); 
  const [blogItem, setBlogItem] = useState({});
  const [editMode, setEditMode] = useState(true);  
  const { user } = useContext(UserContext); 
  

  // Función para obtener el blog actual basado en la URL
  const getBlogItem = () => {
    
    axios
      .get(`http://localhost:3001/api/posts/${currentId}`)
      .then((response) => {        
        setBlogItem(response.data.post);
      })
      .catch((error) => {
        console.log('getBlogItem  Detail error', error);
      });
  };

  // Similar a componentDidMount
  useEffect(() => {
    getBlogItem();
  }, [currentId]); 

  const handleUpdateFormSubmission = (post) => {
    setBlogItem(post);
    setEditMode(false);
  };

  const handleFeaturedImageDelete = () => {
    setBlogItem((prevState) => ({
      ...prevState,
      featured_image:"",
    }));
  };

  const handleEditClick = () => {
    if (user) { // Si el usuario está autenticado
      setEditMode(true);
    }
  };

  const contentManager = () => {
    if (editMode) {
      return (
        <BlogForm
          handleFeaturedImageDelete={handleFeaturedImageDelete}
          handleUpdateFormSubmission={handleUpdateFormSubmission}
          editMode={editMode}
          blog={blogItem}
        />
      );
    } else {
      return (
        <div className="content-container">
          <button onClick={handleEditClick}>{blogItem.title}</button>
          <BlogFeaturedImage img={blogItem.featured_image} />
          <div className="content">{ReactHtmlParser(blogItem.content)}</div>
        </div>
      );
    }
  };

  return <div className="blog-container">{contentManager()}</div>;
};

export default BlogDetail;