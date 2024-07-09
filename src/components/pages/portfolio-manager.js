import React, { Component } from "react";
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {}
    };
    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this. handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }

  clearPortfolioToEdit() {
    this.setState({
      portfolioToEdit: {}
    });
  }

  handleEditClick(portfolioItem){
    this.setState({
      portfolioToEdit: portfolioItem
    })
  }

  handleDeleteClick(portfolioItem) {
   axios
      .delete(`https://alonsomarimar.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          portfolioItems: this.state.portfolioItems.filter(item => {
            return item.id !== portfolioItem.id;
          })
        });

        return response.data;
      })
      .catch(error => {
        console.log("handleDeleteClick error", error);
      });
  }

/*   handleSuccessfulFormSubmission(portfolioItem){
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    });
  }  */
 
  handleSuccessfulFormSubmission(portfolioItem) {
      this.setState(prevState => {
          const itemExists = prevState.portfolioItems.some(item => item.id === portfolioItem.id);
  
          if (itemExists) {
              return {
                  portfolioItems: prevState.portfolioItems.map(item => {
                      return item.id === portfolioItem.id ? portfolioItem : item;
                  })
              };
          } else {
              return {
                  portfolioItems:   [portfolioItem].concat(this.state.portfolioItems)
              };
          }0
      });
  }  

  handleFormSubmissionError(error){
    console.log("handleFormSubmissionError error ", error);
  }

  getPortfolioItems() {
    axios
      .get(`https://alonsomarimar.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc`, {
          withCredentials: true
        })
      .then(response => {
        this.setState({
          portfolioItems: [...response.data.portfolio_items]
        });
      })
      .catch(err => {
        console.log("error in getPortfolioItems", err);
      });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }
  
  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
            <PortfolioForm
              handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
              handleFormSubmissionError={this.handleFormSubmissionError}
              clearPortfolioToEdit = {this.clearPortfolioToEdit}
              portfolioToEdit = {this.state.portfolioToEdit}
            />
        </div>
        <div className="right-column">
          <PortfolioSidebarList 
            handleDeleteClick={this.handleDeleteClick}
            data= {this.state.portfolioItems}
            handleEditClick={this.handleEditClick}  
          />
        </div>
      </div>
    );
  }
}