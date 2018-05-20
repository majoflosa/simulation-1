import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {HashRouter} from 'react-router-dom';
import routes from './routes';

// components
import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';
import Header from './component/Header/Header';

class App extends Component {
  constructor() {
    super();

    this.state = {
        inventory: [],
        currentProduct: null
    }

    this.getProducts = this.getProducts.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }//

  getProducts() {
    axios.get( '/api/inventory' )
      .then( response => {
        this.setState({ inventory: response.data })
        console.log( 'response: ', response )
      })
      .catch( response => {
        console.log('getProducts failed on front end: ', response);

        axios.get( '/api/inventory' )
          .then( response => {
            console.log( 'Trying again: ', response );
            this.setState({ inventory: response.data });
            console.log( 'response: ', response );
          })
          .catch( () => console.log('getProducts failed on front end: ', response) );
      } );
  }

  handleClickEdit( product ) {
    this.setState({ currentProduct: product });
  }
  
  componentDidMount() {
    this.getProducts();
  }
  
  render() {
    console.log( 'currentProduct: ', this.state.currentProduct );
    return (
      <HashRouter>
      <div className="App">
        <Header />
        
        <Dashboard 
          inventory={this.state.inventory} 
          getProducts={this.getProducts}
          handleClickEdit={this.handleClickEdit}
        />

        <Form 
          getProducts={this.getProducts}
          currentProduct={this.state.currentProduct}
        />

      {/* {routes} */}
      </div>
      </HashRouter>
    );
  }
}

export default App;

/* 
[
          { 
              product_name: 'Magazine 1', 
              image_url: 'https://images-na.ssl-images-amazon.com/images/I/71vguYqA03L._AC_SY200_.jpg',
              price: 3.99
          },
          { 
              product_name: 'Magazine 2', 
              image_url: 'https://images-na.ssl-images-amazon.com/images/I/71vguYqA03L._AC_SY200_.jpg',
              price: 2.99
          },
          { 
              product_name: 'Magazine 3', 
              image_url: 'https://images-na.ssl-images-amazon.com/images/I/71vguYqA03L._AC_SY200_.jpg',
              price: 1.99
          }
      ]
*/