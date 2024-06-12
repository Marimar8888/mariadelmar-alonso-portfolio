import React, { Component } from 'react';
import moment from 'moment';
import PorfolioContainer from './portfolio-container';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Maria del Mar Alonso Porfolio</h1>
        <PorfolioContainer/>
        <PorfolioContainer/>
        <PorfolioContainer/>
        <h2>{moment().format("MMMM Do YYYY, h:mm:ss a")}</h2>
      </div>
    );
  }
}
