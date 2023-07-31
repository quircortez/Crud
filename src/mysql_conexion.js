import mysql from 'mysql';
let todos;

//Crea la conexion 
const conector = mysql.createConnection(
    {
        host: 'localhost',
        user: 'eleazar',
        password: '20234321',
        database: 'agenda_contactos'
    }
)

//Verificacion si se realizo la conexion
const conectar = () => {
    conector.connect(err => {
        if(err) throw err
        console.log('Conexcion establecida');
    });
}


const agregarContacto = (numero, nombre) => {
    const sql = `INSERT INTO agenda (id_agenda, numero_contacto, nombre_contacto) VALUES (${null}, ${numero},"${nombre}")`
    conector.query(sql, function(err, result, filed){
        if(err)throw err
        console.log(result);
    })
}

const obtenerContactos = () => {
    const sql = 'SELECT * FROM agenda'
    conector.query(sql, function(err, result, field){
        todos = result;  

    })
    return todos;
}

const borarContacto = id => {
    const sql = `DELETE FROM agenda where id_agenda=${id}`
    conector.query(sql)

}

export { agregarContacto, obtenerContactos, borarContacto}
