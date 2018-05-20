const getInventory = ( req, res, next ) => {
    if ( req.app.get( 'db' ) === undefined ) {
        console.log( 'req.app.get(db) is undefined' );
        // console.log( req.app );
        return res.status(500).json({ app: req.app, message: 'req.app.get(db) is undefined' });
    }

    req.app.get( 'db' )
        .getInventoryQuery()
        .then( response => {
            console.log( 'getInventory successful' );
            return res.status(200).json(response);
        })
        .catch( response => {
            console.log( 'getInventory failed' );
            return res.status(500).json(response);
        });
}

const getProduct = ( req, res, next ) => {
    req.app.get( 'db' )
        .getProductQuery( req.params.id )
        .then( response => {
            console.log( 'getProduct successful' );
            return res.status(200).json( response );
        })
        .catch( response => {
            console.log( 'getProduct failed' );
            return res.status(500).json( response );
        })
}

const createProduct = ( req, res, next ) => {
    req.app.get( 'db' )
        .createProductQuery( [req.body.image_url, req.body.product_name, req.body.price] )
        .then( response => {
            console.log( 'createProduct successful' );
            return res.status(200).json(response);
        })
        .catch( response => {
            console.log( 'createProduct failed' );
            return res.status(500).json(response);
        });
}

const updateProduct = (req, res, next ) => {
    req.app.get( 'db' )
        .updateProductQuery( [req.body.id, req.body.image_url, req.body.product_name, req.body.price] )
        .then( response => {
            console.log( 'updateProduct successfull: ', req.body );
            return res.status(200).json(response);
        })
        .catch( response => {
            console.log( 'updateProduct failed.' );
        });
}

const deleteProduct = ( req, res, next ) => {
    req.app.get( 'db' )
        .deleteProductQuery( req.params.id )
        .then( response => {
            console.log( 'deleteProduct successful' );
            return res.status(200).json(response);
        })
        .catch( response => {
            console.log( 'deleteProduct failed' );
            return res.status(500).json(response);
        })
}

module.exports = {
    getInventory: getInventory,
    getProduct: getProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}