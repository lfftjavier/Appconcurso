
var request = require("request")

var url = "http://192.168.1.74/appconcursos/usuarios/json.php"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})