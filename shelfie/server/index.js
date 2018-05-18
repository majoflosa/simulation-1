require( 'dotenv' ).config();
const express = require( 'express' ),
      {json} = require( 'body-parser' ),
      cors = require( 'cors' ),
      massive = require( 'massive' ),
      port = process.env.PORT || 3001;

const app = express();

massive( process.env.CONNECTION_STRING ).then( db => app.set( 'db', db ) );

app.use( json() );
app.use( cors() );

// endpoints
// const { controller methods } = require( 'controller' );

app.listen( port, () => console.log(`Server listening at port ${port}.`) );