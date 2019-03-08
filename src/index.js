import express from 'express';
import { PORT } from './config';
import cors from 'cors';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';
import { EventEmitter } from 'events';


const app       = express();
const server    = http.createServer( app );
const io        = socketIO.listen( server );
const emitter   = new EventEmitter();    

// MIDDLEWARES

app.use( express.json() );
app.use( cors( { origin: '*' } ) );
app.use('/static', express.static( path.join( __dirname, 'public' ) ) ); 
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/js"));


// ROUTES
app.get('/socket.io.js' , function(req,res){
    res.sendfile( path.resolve( __dirname,'./../node_modules/socket.io-client/dist/socket.io.js'));
});

app.get( '/', ( req, res ) => 
{
    res.sendFile(`${ __dirname }/views/index.html`);
});


app.post('/data', ( req, res ) => 
{
    const data = req.body;


    emitter.emit('data:received', data );
    res.json( { ok: true } );
});



// SOCKETS

io.on('connection', ( socket ) => 
{
    
});

emitter.on('data:received', ( data ) => 
{
    io.sockets.emit('data', data)
});



// Start

server.listen( PORT, ( ) => console.log( 'Server running on port', PORT ) ); 