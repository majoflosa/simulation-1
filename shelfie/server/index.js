require( 'dotenv' ).config();
const express = require( 'express' ),
      {json} = require( 'body-parser' ),
      cors = require( 'cors' ),
      massive = require( 'massive' ),
      port = 3001;

const app = express();

massive( process.env.CONNECTION_STRING )
    .then( db => {
        console.log( 'Database connected successfully.' );
        app.set( 'db', db );
    } )
    .catch( db => {
        console.log( 'Retrying database connection.' );
        app.set( 'db', db );
    });

app.use( json() );
app.use( cors() );

// endpoints
const { getInventory, createProduct, updateProduct, deleteProduct } = require( `${__dirname}/controller.js` );
app.get( '/api/inventory', getInventory );
app.post( '/api/product', createProduct );
app.put( '/api/product/:id', updateProduct );
app.delete( '/api/product/:id', deleteProduct );

app.listen( port, () => console.log(`Server listening at port ${port}.`) );