import React from 'react';

const BlogFeaturedImage = props => {

  if(!props.img){
    return null;
  }
  return (
      <div className='featured-image-wrapper '>
        <img src={props.img} alt="Featured" />
      </div>
  )
}

export default BlogFeaturedImage;
