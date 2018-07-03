// Setup basic express server
var express = require('express');
var moment = require('moment');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;



//-----------------------------------
var request = require("request");
var emiterQuestion = require('./emiterQuestion.js');

//url de la direccion de donde se obtendran los datos del consurso
var url = "http://192.168.1.73/appconcursos/usuarios/json.php";

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      server.listen(port, () => {
        console.log('Server listening at port %d', port);
      });

      //obtengo la fecha del JSON 
     var fecha1 = moment(body[7].fecha, "YYYY-MM-DD HH:mm:ss");

     //obtengo la fecha del sistema
     var fecha2 =  moment(getDateTime(), "YYYY-MM-DD HH:mm:ss");

     //calculo el tiempo que falta para el concurso en segundos
     var diff = fecha1.diff(fecha2, 's'); 

     //lo convierto milisegundos
     var miliseconds = diff*1000; 
    console.log(diff);
    console.log("Milisegundos"+ miliseconds);

// Routing
app.use(express.static(path.join(__dirname, 'public')));

//-----------------------------------
// Chatroom
var numUsers = 0;
var total = 0;

io.on('connection', (socket) => {
 var addedUser = false;

//---- ESTE PEDASITO ESTA DANDO LATA -----

 //cronometro que cuando terminan los milisegundos manda llamar la funcion timeOut
 var r = setInterval(timeOut, miliseconds);

    //funcion que manda a los usuarios a entrar al juego
    function timeOut() {
      console.log("inicio!!!! Antes");
      socket.broadcast.emit('login', {
        numUsers: total
      });
      console.log("Total: "+total);
      console.log("inicio!!!! Despues");
      //segun detiene el setInterval
      clearInterval(r);
      }

//--------------------FINISH--------------------


        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {
          // we tell the client to execute 'new message'
          socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
          });
        });
        // when the client emits 'new message', this listens and executes
        socket.on('changeQuestion', (data) => {
          if (data == 1 ) {
              emiterQuestion.sendQuestion(socket,0,body);
              console.log("ask: 1");   
          }
            else if (data == 2 ) {

              emiterQuestion.sendQuestion(socket,1,body);
              console.log("ask: 2");
              
          }else if( data == 3){

            emiterQuestion.sendQuestion(socket,2,body);
            console.log("ask: 3");
            
          }else if(data == 4){

            emiterQuestion.sendQuestion(socket,3,body);
            console.log("ask: 4");
          
          }else if( data ==5){

            emiterQuestion.sendQuestion(socket,4,body);
            console.log("ask: 5");
            
          }else if(data == 6){

            emiterQuestion.sendQuestion(socket,5,body);
            console.log("ask: 6");

          }else if(data == 7){
            
            emiterQuestion.sendQuestion(socket,6,body);
            console.log("ask: 7");

          } else if(data == 8){

                //server send question 
                socket.emit('finishGame',{
                  finishGame : 'finishGame'
                });
                console.log("llego peticion");
          }
        });
        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {
          if (addedUser) return;

          ++numUsers;
          total = numUsers;
          console.log('No. de usuarios ADD: '+numUsers);
          console.log("Total ADD: "+total);
          // we store the username in the socket session for this client
          socket.username = username;
          console.log(socket.username);
          addedUser = true;
    
        });

        
        socket.on('user update', () => {
        
          --total;
          total = total;
          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            numUsers: total
          });
          console.log("Salio! Total:" + total);
    
        });
        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
          if (addedUser) {
            --numUsers;
            // echo globally that this client has left
            socket.broadcast.emit('user left', {
              numUsers: numUsers
            });
          }
        });
      });
    } else if(error){
      console.log(error);
    }else{
      console.log("Rest page: "+response.statusMessage);
    }
});

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}