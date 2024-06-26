import React from "react";
import { Link } from "react-router-dom";

export default function PortfolioItem(props) {
  // Data that we'll need:
  // - background image: thumb_image_url
  // - logo
  // - description: description
  // - id: id

  const { id, description,  thumb_image_url, logo } = props.item;
  return (
    <div className="portfolio-item-wrapper">
      <div
        className="portfolio-img-background"
        style={{
          backgroundImage: "url(" + thumb_image_url + ")"
        }}
      />
      <img src={logo}/>
      <div>{description}</div>
      
      <Link to={`/portfolio/${id}`}>Link</Link>
    </div>
  );
}


