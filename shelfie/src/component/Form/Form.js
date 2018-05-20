import React, {Component} from 'react';
import axios from 'axios';
import noImg from '../../noimage.jpeg';
import {Link} from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            productName: '',
            price: 0,
            formAddButton: 'Add to Inventory',
            // currentProduct: this.props.currentProduct,
            styles: {
                noImgStyle: { 
                    backgroundImage: noImg
                }
            }
        };

        this.updateImageField = this.updateImageField.bind( this );
        this.updateProductNameField = this.updateProductNameField.bind( this );
        this.updatePriceField = this.updatePriceField.bind( this );
        this.resetFields = this.resetFields.bind( this );
        this.createNewProduct = this.createNewProduct.bind( this );
        this.getProducts = this.getProducts.bind( this );
        this.saveUpdateChanges = this.saveUpdateChanges.bind( this );
    }

    // componentDidUpdate( oldProps ) {
    //     if ( oldProps.currentProduct !== this.props.currentProduct ) {
    //         this.setState({
    //             imageUrl: this.props.currentProduct.image_url,
    //             productName: this.props.currentProduct.product_name,
    //             price: this.props.currentProduct.price,
    //             formAddButton: 'Save Changes',
    //             styles: {
    //                 noImgStyle: {
    //                     backgroundImage: this.props.currentProduct.image_url 
    //                 }
    //             }
    //         });
            
    //         console.log( 'component did update.' );
    //     }
    // }

    componentDidUpdate( oldProps ) {
        if ( oldProps.match.params.id !== this.props.match.params.id ) {
            this.resetFields();
        }
    }

    componentDidMount() {
        if ( this.props.match.params.id ) {
            axios.get( `/api/product/${this.props.match.params.id}` )
                .then( response => {
                    console.log( 'product data: ', response.data );
                    let { image_url, product_name, price } = response.data[0];
                    this.setState({
                        imageUrl: image_url,
                        productName: product_name,
                        price: price,
                        styles: {
                            noImgStyle: {
                                backgroundImage: `url(${image_url})`
                            }
                        }
                    });
                });
        } else {
            this.resetFields();
        }

    }

    saveUpdateChanges() {
        // console.log( 'saveUpdateChanges is running: ', this.props.currentProduct.id );

        let reqBody = {
            id: this.props.match.params.id,
            image_url: this.state.imageUrl,
            product_name: this.state.productName,
            price: this.state.price,
        };

        axios.put( `/api/product/${this.props.match.params.id}`, reqBody )
            .then( response => {
                console.log( 'updated successfully on frontend: ', response.data );
                this.getProducts();
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

    createNewProduct() {
        let reqbody = {
            image_url: this.state.imageUrl,
            product_name: this.state.productName,
            price: this.state.price
        };

        axios.post( '/api/product', reqbody )
            .then( reponse => {
                this.getProducts();
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
            // currentProduct: null,
            formAddButton: 'Add to Inventory',
            styles: {
                noImgStyle: { 
                    backgroundImage: noImg
                }
            }
        });
    }
    
    render() {
        // console.log( 'current state: ', 
        //         `imageURL: ${this.state.imageUrl}, 
        //         productName: ${this.state.productName},
        //         price: ${this.state.price}` );

        // let formAction = this.props.currentProduct === null 
        //                     ? this.createNewProduct 
        //                     : this.saveUpdateChanges

        // let formActionButton;
        // let noImgDiv;
        
        // if ( this.props.currentProduct === null ) {
            //     // formAction = this.createNewProduct;
            //     formActionButton = (
                //         <button 
                //             onClick={ () => this.createNewProduct() } 
                //             className="btn">{this.state.formAddButton}
                //         </button>
                //     );
                
                //     noImgDiv = <div className="noimage" style={ { backgroundImage: noImg } }></div>
                // } else {
                    //     // formAction = this.saveUpdateChanges;
                    //     formActionButton = (
                        //         <button 
                        //             onClick={ () => this.saveUpdateChanges() } 
                        //             className="btn">{this.state.formAddButton}
                        //         </button>
                        //     );
                        
                        //     noImgDiv = <div className="noimage" style={ { backgroundImage: this.props.currentProduct.image_url } }></div>
                        // }
                        
        let formActionButton;
        if ( this.props.match.params.id ) {
            formActionButton = (
                <Link to="/">
                    <button onClick={ () => this.saveUpdateChanges() } className="btn">Save changes</button>
                </Link>
            );
        } else {
            // this.resetFields();
            formActionButton = (
                <Link to="/">
                    <button onClick={ () => this.createNewProduct() } className="btn">Add to Inventory</button>
                </Link>
            );
        }
    
        return (
            <div className="form-wrapper">
                <div className="noimage" style={this.state.styles.noImgStyle}></div>
                {/* {noImgDiv} */}

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
                    { formActionButton }
                    {/* <button 
                        onClick={ () => formAction() } 
                        className="btn">{this.state.formAddButton}
                    </button> */}
                </div>
            </div>
        );
    }

}

export default Form;