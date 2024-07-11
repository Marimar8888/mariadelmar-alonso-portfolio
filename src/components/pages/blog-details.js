import React, { Component } from 'react';
import axios from 'axios';
import blogItem from '../blog/blog-item';

export default class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {}
    };
  }

  getBlogItem() {
    axios
      .get(`https://alonsomarimar.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`

      )
      .then(response => {
        this.setState({
          blogItem: response.data.portfolio_blog
        });
      })
      .catch(error => {
        console.log("getBlogItem error", error);
      });
  }

  
  componentDidMount() {
    this.getBlogItem();
  }


  render() {
    const {
      title,
      content,
      featured_image_url,
      blog_status
    } = this.state.blogItem;

    return (
      <div>
        <h1>{title}</h1>

        <img src={featured_image_url} alt="Featured" />
        <div>
          {content}
        </div>
      </div>
    )
  }
}
