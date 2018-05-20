import React, {Component} from 'react';
import axios from 'axios';

// components
import Product from '../Product/Product';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.deleteProduct = this.deleteProduct.bind( this );
    }

    deleteProduct( id ) {
        axios.delete( `/api/product/${id}` )
            .then( response => {
                console.log( 'deleteProduct successful on frontend' );
                this.props.getProducts();
            })
    }

    render() {
        console.log( 'inventory: ', this.props.inventory)
        let inventoryList = this.props.inventory.map( (item, ind) => {
            return (
                <Product 
                    key={ind} 
                    inventoryItem={item}
                    getProducts={this.props.getProducts}
                    deleteProduct={this.deleteProduct}
                    handleClickEdit={this.props.handleClickEdit}
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