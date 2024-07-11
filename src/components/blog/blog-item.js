import React from 'react';


const blogItem = props => {
  const {
    id,
    title,
    content,
    blog_status,
    featured_image

  }= props.blogItem
  
  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  );
};

export default blogItem;
