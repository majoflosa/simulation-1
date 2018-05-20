import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import noImg from './noimage.jpeg';

import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';
import Header from './component/Header/Header';

class App extends Component {
  constructor() {
    super();

    this.state = {
        // inventory: [],
        // currentProduct: null
    }

    // this.getProducts = this.getProducts.bind(this);
    // this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  getProducts() {
    axios.get( '/api/inventory' )
      .then( response => {
        this.setState({ inventory: response.data })
        console.log( 'response: ', response )
      })
      .catch( response => {
        console.log('getProducts failed on front end: ', response);
      } );
  }

  // handleClickEdit( product ) {
  //   this.setState({ currentProduct: product });
  // }
  
  // componentDidMount() {
  //   this.getProducts();
  //   console.log( 'component did mount' );
  // }
  
  render() {
    // console.log( 'currentProduct: ', this.state.currentProduct );
    return (
      <HashRouter>
      <div className="App">
        <Header />
        
        {/* <Dashboard 
          inventory={this.state.inventory} 
          getProducts={this.getProducts}
          handleClickEdit={this.handleClickEdit}
        />

        <Form 
          getProducts={this.getProducts}
          currentProduct={this.state.currentProduct}
        /> */}

      {routes}
      </div>
      </HashRouter>
    );
  }
}

export default App;

/* 
*/