#!/usr/bin/env node

/**
 * COMP229-015    Group 7
 * Group Project  Part 2 First Release
 * Project Name:  Survey Donkey
 * 
 * Members (name/student ID):
 * Akash Arora – 300849838
 * Alina Fadeeva – 301249589
 * Nadia Velikaia – 301244426
 * Nithiyavany Vijai – 301212774
 * Terence Chu – 301220117
 * Zhihao Yu – 301305633
 * 
 * File name:     server.js
 * Description:   Contains module dependencies
 */

/**
 * Module dependencies.
 */

 var app = require('./server/config/app');
 var debug = require('debug')('03-02:server');
 var http = require('http');
 
 /*
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || '3000');
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }
 