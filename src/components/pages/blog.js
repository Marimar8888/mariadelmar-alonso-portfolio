import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";


class Blog extends Component {
  constructor() {
    super();
    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      modalBlogIsOpen: false
    }
    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleModalBlockClick = this.handleModalBlockClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({
      modalBlogIsOpen: false
    });
  }

  handleModalBlockClick(){
    this.setState({
      modalBlogIsOpen: true
    });
  }

  onScroll() {
    if (
      this.state.isLoading ||
      this.state.blogItems.length === this.state.totalCount
    ) {
      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.getBlogItems();
      this.setState({
        isLoading: true
      });
    }
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });

    axios.get(`https://alonsomarimar.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {
      withCredentials: true
    })
      .then(response => {
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
          totalCount: response.data.meta.total_records,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("getBlogItems error", error);
      });
  }

  componentDidMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });
    return (
      <div className='blog-container'>
        <BlogModal 
          modalIsOpen={this.state.modalBlogIsOpen} 
          handleModalClose={this.handleModalClose}
        />
        <a onClick={this.handleModalBlockClick}>Open Modal!</a>
        <div className='content-container'>{blogRecords}</div>
        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Blog;