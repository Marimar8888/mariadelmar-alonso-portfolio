import React, { Component } from 'react';
import NavigationContainer from './navigation/navigation-container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from "./portfolio/portfolio-detail";
import noMatch from './pages/no-match';


export default class App extends Component {

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={noMatch}/>
            </Switch>
          </div>
        </Router> 
      </div>
    );
  }
}
