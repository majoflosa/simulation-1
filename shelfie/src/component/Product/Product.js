import React from 'react';

function Product(props) {
    return (
        <div className="product-item-wrap">
            <img className="product-image" src={props.inventoryItem.image_url} alt=""/>
            <div className="product-info">
                <p className="product-name">{props.inventoryItem.product_name}</p>
                <p className="product-price">${props.inventoryItem.price}</p>
                <div className="product-buttons">
                    <button onClick={ () => props.deleteProduct(props.inventoryItem.id) } className="btn">Delete</button>
                    <button onClick={ () => props.handleClickEdit(props.inventoryItem) } className="btn">Edit</button>
                </div>
            </div>
        </div>
    );
}

export default Product;