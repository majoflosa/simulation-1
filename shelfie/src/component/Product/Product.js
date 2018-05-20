import React from 'react';
import {Link} from 'react-router-dom';

function Product(props) {
    return (
        <div className="product-item-wrap">
            <img className="product-image" src={props.inventoryItem.image_url} alt=""/>
            <div className="product-info">
                <p className="product-name">{props.inventoryItem.product_name}</p>
                <p className="product-price">${props.inventoryItem.price}</p>
                <div className="product-buttons">
                    <Link to="/">
                        <button onClick={ () => props.deleteProduct(props.inventoryItem.id) } className="btn">Delete</button>
                    </Link>
                    <Link to={`/edit-product/${props.inventoryItem.id}`}>
                        <button className="btn">Edit</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Product;