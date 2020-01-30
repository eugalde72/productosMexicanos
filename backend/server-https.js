var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'eugalde',
    host: '127.0.0.1',
    database: 'produccion',
    password: 'aDministrar01-',
    port:'5432'
})

// ESTA ES LA SOLUCION PARA ACTIVAR CORS Y ELIMAR EL ERROR DE ACCESS-CONTROL-ALLOW-ORIGIN
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');



    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/api/hw', function (req, res) {
  res.send('hello world')
})

app.post('/productosmexicanos',(req,res)=>{
    //console.log(req.body);
    //console.log(req.body.dominio);
    //console.log(req.body.textarea);
    var vproductos = req.body.productos;
       pool.query("INSERT INTO productosmexicanos(pais,productos,ip,xciudad,xpais) VALUES ('"+req.body.pais+"','"+req.body.productos+"','"+req.body.ip+"','"+req.body.xciudad+"','"+req.body.xpais+"')", (error, results) => {
         if (error) {
           throw error
         }
         //response.status(200).json(results.rows)
   //	pool.end();
       })
    res.send('Post Request Received');
   });

   var port = process.env.port || 560;

/*
	var server = app.listen(port, function(){
		console.log("Server is running....(Port"+port+")"); 
})

*/


   https.createServer({
      key: fs.readFileSync('/etc/ssl/certs/myserver.key'),
      cert: fs.readFileSync('/etc/ssl/certs/myserver.cert')
    // Los certificados se pueden consultar en /etc/apache2/sites-enabled/000-default-le-ssl.conf
 //     key: fs.readFileSync('/etc/letsencrypt/live/ezequielugalde.com/privkey.pem'),
 //     cert: fs.readFileSync('/etc/letsencrypt/live/ezequielugalde.com/fullchain.pem')
    }, app)
    .listen(port, function () {
      console.log('Example app listening on port '+port+'! Go to https://localhost:'+port+'/api')
    })
