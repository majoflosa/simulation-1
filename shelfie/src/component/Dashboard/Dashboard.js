import React, {Component} from 'react';
import axios from 'axios';

// components
import Product from '../Product/Product';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inventory: []
        }

        this.deleteProduct = this.deleteProduct.bind( this );
        this.getProducts = this.getProducts.bind( this );
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

    componentDidMount() {
        this.getProducts();
        console.log( 'component did mount' );
    }

    deleteProduct( id ) {
        axios.delete( `/api/product/${id}` )
            .then( response => {
                console.log( 'deleteProduct successful on frontend' );
                this.getProducts();
            })
    }

    render() {
        console.log( 'inventory: ', this.props.inventory)
        let inventoryList = this.state.inventory.map( (item, ind) => {
            return (
                <Product 
                    key={ind} 
                    inventoryItem={item}
                    getProducts={this.props.getProducts}
                    deleteProduct={this.deleteProduct}
                    // handleClickEdit={this.props.handleClickEdit}
                    // saveChanges={this.save}
                />
            );
        })
        return (
            <div className="products-wrap">
                {/* <h1>Dashboard</h1> */}
                {inventoryList}
            </div>
        );
    }

}

export default Dashboard;