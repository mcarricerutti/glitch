import express from 'express'
import productRouter from "./routes/product.routes.js"
import multer from 'multer'
import { _dirname } from './path.js'
import { engine } from "express-handlebars"
import * as path from "path"
import {Server} from 'socket.io'

//Configuracion de express
const app = express()
const PORT = 4000
const storage = multer.diskStorage({
    destination: (req,file,cb) => { //destino de mis imagenes cargadas
        cb(null, "src/public/img")
    },
    filename: (req,file,cd) => {
        cd(null,`${file.originalname}`)
    }
})

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
    })

app.engine("handlebars", engine())//Voy a trabajar con handlebars
app.set("view engine", "handlebars")//Mis vistas son de hbs
app.set("views", path.resolve(_dirname, "./views"))//src/views path.resolve lo que hace es una concatenacion

//middleware
app.use(express.json()) //Permite ejecutar JSON en mi app
app.use(express.urlencoded({ extended: true })) //Permite poder realizar consultas en la URL (req.query)
const upload = (multer({storage: storage}))//Instancio un objeto

//ServerIO
const io = new Server(server);

const mensajes = [];

io.on('connection', (socket) => {
    console.log("Cliente conectado");
    socket.on("mensaje", info => {
        console.log(info);
        mensajes.push(info);
        io.emit("mensajes", mensajes)//Le envio todos los mensajes guardados
    })
})

// io.on('connection', (socket) => {//cuando se establezca la conexion, ejecutar la siguiente funcion
//     console.log('Cliente conectado')

//     socket.on("mensaje", info => {
//         console.log(info)
//     })

//     socket.on('user', info => {
//         console.log(info)
//         //consulto si es un usuario valido
//         socket.emit('confirmacionAcceso', "Acceso concedido")
//     })

//     //Mensaje que se envia a todos los clientes conectados a otros sockets pero no al mio  => "broadcast"
//     socket.broadcast.emit("mensaje-socket-propio", "Datos juadores" )
// })


//Routes
app.use("/product", productRouter)
app.use("/", express.static(_dirname + "/public")) //Defino la ruta de mi carpeta publica
app.post("/upload", upload.single("product"), (req,res) => {
    //Imagenes
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")
})

//HBS

app.get("/", (req,res) => {
    res.render('index')
});

/*app.get("/", (req,res) => {
    const tutor = {
        nombre: "Luciana",
        email: "lu@lu.com",
        rol: "Tutor"
    }

    const cursos = [
        {numero: "123", nombre: "Programacion Backend", dia: "LyM", horario: "Mañana"},
        {numero: "456", nombre: "React", dia: "S", horario: "Mañana"},
        {numero: "789", nombre: "Angular", dia: "MyJ", horario: "Tarde"}
    ]

    res.render("home",{//Primer parametro indico la vista a utilizar
        titulo: "51225 Backend",
        mensaje: "Hola, buenos días!",
        user: tutor,
        isTutor: tutor.rol === "Tutor",
        cursos: cursos
    })
})

// app.listen(PORT, () => {
//   console.log(`Server on port ${PORT}`)
// })

// const users = [
//     {
//         nombre: "Francisco",
//         apellido: "Pugh",
//         id: 1,
//         cargo: "Profesor"
//     },
//     {
//         nombre: "Alex",
//         apellido: "Terrussi",
//         id: 2,
//         cargo: "Tutor"
//     },
//     {
//         nombre: "Daniel",
//         apellido: "Perco",
//         id: 3,
//         cargo: "Tutor"
//     }
// ]

// app.get("/user", (req, res) => {
//     res.send(users)
// })

// app.get("/user/:idUser", (req, res) => {
//     const user = users.find(user => user.id === parseInt(req.params.idUser))
//     res.send(user)
// })

// app.post("/user", (req, res) => {
//     const { nombre, apellido, id, cargo } = req.body //Consulto los datos enviados por postman
//     users.push({ nombre: nombre, apellido: apellido, id: id, cargo: cargo }) //Creo y guardo un nuevo objeto
//     res.send("Usuario creado")
// })

// app.put("/user/:idUser", (req, res) => {
//     const idUser = parseInt(req.params.idUser)
//     const { nombre, apellido, cargo } = req.body //Consulto los datos enviados por postman

//     let indice = users.findIndex(user => user.id === idUser)
//     console.log(indice)
//     if (indice != -1) {
//         users[indice].nombre = nombre
//         users[indice].apellido = apellido
//         users[indice].cargo = cargo
//         res.send("Usuario actualizado") //Return implicitado
//     }

//     res.send("Usuario no encontrado")
// })

// app.delete("/user/:idUser", (req, res) => {
//     const indice = users.findIndex(user => user.id === parseInt(req.params.idUser))
//     users.splice(indice, 1)
//     res.send("Usuario eliminado")
// })

// app.listen(PORT, () => {
//     console.log(`Server on port ${PORT}`)
// })
*/