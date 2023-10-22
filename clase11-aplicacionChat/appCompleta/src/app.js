import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';

// Importacion de los modulos necesarios

const app = express();
const httpServer = app.listen(8000, () => {
    console.log("listening")
});

const io = new Server(httpServer);

// Creacion de la aplicacion Express y el servidor HTTP.

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Configuracion del motor de plantillas Handlebars.

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Configuracion del middleware para el manejo de JSON y URL encoded

app.use('/', viewsRouter);

// Base de datos de mensajes
const messages = [];

// Configuracion del enrutador para las vistas

io.on('connection', (socket) => {
    console.log('Cliente conectado en el back');

    // Evento que se dispara cuando un cliente se conecta al servidor

    socket.on('message', (data)=> {
        console.log(data);
        messages.push(data);
        io.emit('messageLogs', messages);
    });
    // Evento que se dispara cuando se recibe un mensaje del cliente
    socket.broadcast.emit('user_connected', `User ${socket.id} has connected`);

    // Emite un mensaje ba todos los clientes excepto al que se acaba de conectar
    socket.emit('individual', 'Bienvenido');

});