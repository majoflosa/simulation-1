import React, {Component} from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            productName: '',
            price: 0,
            formAddButton: 'Add to Inventory',
            currentProduct: this.props.currentProduct
        };

        this.updateImageField = this.updateImageField.bind( this );
        this.updateProductNameField = this.updateProductNameField.bind( this );
        this.updatePriceField = this.updatePriceField.bind( this );
        this.resetFields = this.resetFields.bind( this );
        this.createNewProduct = this.createNewProduct.bind( this );
        this.saveUpdateChanges = this.saveUpdateChanges.bind( this );
    }

    componentDidUpdate( oldProps ) {
        if ( oldProps.currentProduct !== this.props.currentProduct ) {
            this.setState({
                imageUrl: this.props.currentProduct.image_url,
                productName: this.props.currentProduct.product_name,
                price: this.props.currentProduct.price,
                formAddButton: 'Save Changes'
            });

            

            console.log( 'component did update.' );
        }
    }

    saveUpdateChanges() {
        console.log( 'saveUpdateChanges is running: ', this.props.currentProduct.id );

        let reqBody = {
            id: this.props.currentProduct.id,
            image_url: this.state.imageUrl,
            product_name: this.state.productName,
            price: this.state.price,
        };

        axios.put( `/api/product/${this.props.currentProduct.id}`, reqBody )
            .then( response => {
                console.log( 'updated successfully on frontend: ', response.data );
                this.props.getProducts();
            })
            .catch( () => console.log( 'update failed on frontend' ) );
    }

    updateImageField(e) {
        this.setState({ imageUrl: e.target.value });
    }
    
    updateProductNameField(e) {
        this.setState({ productName: e.target.value });
    }
    
    updatePriceField(e) {
        this.setState({ price: e.target.value });
    }

    createNewProduct() {
        let reqbody = {
            image_url: this.state.imageUrl,
            product_name: this.state.productName,
            price: this.state.price
        };

        axios.post( '/api/product', reqbody )
            .then( reponse => {
                this.props.getProducts();
                this.resetFields();
                console.log( 'Product created successfully' );
            })
            .catch( response => console.log( 'Product creation failed.' ) );
    }

    resetFields() {
        this.setState({
            imageUrl: '',
            productName: '',
            price: 0,
            currentProduct: null
        });
    }
    
    render() {
        console.log( 'current state: ', 
                `imageURL: ${this.state.imageUrl}, 
                productName: ${this.state.productName},
                price: ${this.state.price}` );

        let formAction = this.state.formAddButton === 'Add to Inventory' 
                            ? this.createNewProduct 
                            : this.saveUpdateChanges
    
        return (
            <div className="form-wrapper">
                <div className="noimage"></div>

                <div className="form-field">
                    <label htmlFor="image_url">Image URL:</label>
                    <input 
                        onChange={ (e) => this.updateImageField(e) } 
                        type="text" 
                        id="image_url" 
                        value={this.state.imageUrl}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="product_name">Product Name:</label>
                    <input 
                        onChange={ (e) => this.updateProductNameField(e) } 
                        type="text" 
                        id="product_name" 
                        value={this.state.productName}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="price">Price:</label>
                    <input 
                        onChange={ (e) => this.updatePriceField(e) } 
                        type="text" 
                        id="price" 
                        value={this.state.price}
                    />
                </div>

                <div className="form-buttons">
                    <button onClick={ this.resetFields } className="btn">Cancel</button>
                    <button 
                        onClick={ () => formAction() } 
                        className="btn">{this.state.formAddButton}</button>
                </div>
            </div>
        );
    }

}

export default Form;