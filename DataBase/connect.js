
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password:'',
	database: 'appconcurso'
});

connection.connect((err)=> {
	if (err) {
		console.log('Error de conexion a DB');
	}else{
		connection.query("SELECT * FROM preguntas", function (err, result, fields) {
    	if (err) throw err;
    	console.log(result);

  		});
		connection.query("SELECT * FROM respuestas", function (err, result, fields) {
    	if (err) throw err;
    	console.log("-------------------");
    	console.log(result);
    	
		  });
		  return connection;

	}
	console.log('Connected!!');
});


