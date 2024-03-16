// Dependencias
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require ('cors')

app.use(express.json())
app.use(cors())

//Ejercutar servidor
app.listen(3002, ()=>{
    console.log('El servidor esta corriendo en el port 3002')
})

//Ejercutar la base de datos(mysql)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'plantdb'
})

//Ahora creemos un enrutador(router) para el servidor que registrará un usuario
app.post('/register', (req,res)=>{
    //Necesitamos obtener variables enviadas desde el formulario.
    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password

    //Vamos a crear una declaración SQL para insertar el usuario en la tabla de usuarios de la base de datos.
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)' //vamos a ingresar estos valores a través de una variable
    const Values = [sentEmail, sentUserName, sentPassword]

    //consulta para ejecutar la instrucción SQL indicada anteriormente
    db.query(SQL, Values, (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('Usuario insertado exitosamente')
            res.send({message: 'User added!'})
            //
        }
    })


})

//Ahora necesitamos iniciar sesión con estas credenciales de un usuario registrado.
// Despues creamos otra ruta

app.post('/login', (req, res)=>{
    const sentloginUserName = req.body.LoginUserName
    const sentloginPassword = req.body.LoginPassword

    //Vamos a crear una declaración SQL para insertar el usuario en la tabla de usuarios de la base de datos.
    const SQL = 'SELECT * FROM users WHERE username = ? && password = ?' //vamos a ingresar estos valores a través de una variable
    const Values = [sentloginUserName, sentloginPassword]

    db.query(SQL, Values, (err, results)=>{
       if(err){
        res.send({error: err})
       }
       if(results.length > 0){
        res.send(results)
       }
       else{
        res.send({message: '¡Las credenciales no coinciden'})
       }
    })

})