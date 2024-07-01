import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: true, // Inicializar como true para mostrar un mensaje de carga inicialmente
      data: []
    };
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  getPortfolioItems() {
    axios.get('https://alonsomarimar.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        this.setState({
          data: response.data.portfolio_items, // Asegúrate de que el nombre de la propiedad es correcto
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false }); // Maneja el estado de carga en caso de error
      });
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  render() {
    if(this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{this.state.pageTitle}</h2>
        <button onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
        <button onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
        <button onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>
        <div className="portfolio-items-wrapper"> {this.portfolioItems()} </div>
       
      </div>
    );
  }
}
