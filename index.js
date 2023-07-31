import express from 'express'; //importamos Express
import { agregarContacto, obtenerContactos, borarContacto } from './src/mysql_conexion.js';
let todos;


const app = express();//iniciamos express

app.listen('8000', function(){//inicimos servidor en el puerto 8000
    console.log('Inicia en el puerto 8000');

}); 

//configuracion de pug: para nuestras plantillas, node.js
app.set('views', './vistas');
app.set('view engine', 'pug');

//configuracion de archivos estaticos
app.use(express.static('./vistas'));
app.use(express.static('./src'));
app.use(express.static('./css'));


app.get('/', function(req, res){
    //res.send('aplicacion iniciada, se ejecuta correctamente');
    // conectar();
    todos = obtenerContactos()
    res.render('index', {titulo: 'Aplicacion Contactos', contactos:todos });
});

app.get('/agregar/:nombre/:numero', function(req, res){
    let nombre = req.params.nombre;
    let numero = req.params.numero;
    agregarContacto(numero, nombre);
    res.redirect('/');

    console.log(nombre, numero);
})

app.get('/borrar/:id', function(req, res){
    let id = req.params.id
    borarContacto(id)
    res.redirect('/')
})