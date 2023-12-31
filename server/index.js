//importing the require module

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import AuthRoutes from './routes/AuthRoutes.js';
import FoodRoutes from './routes/FoodRoutes.js';
import CartRoutes from './routes/CartRoute.js';
import SearchRoute from './routes/SearchRoute.js';
import { Server } from "socket.io";
import http from "http";
import PaymentRoutes from './routes/PaymentRoute.js';
import NotificationRoute from './routes/NotificationRoute.js';
import ReviewRoutes from './routes/ReviewRoutes.js';



//Loading environment variables from a .env file
dotenv.config();
const app = express();

const server=http.createServer(app);
const io= new Server(server,{
cors:{
    origin: "*",
    method:["GET", "POST"]
}
});

connectDB();


// Creating an instance of the Express application

app.use(express.json());
app.use(cors());
app.use('/ItemImage',express.static('ItemImage'));


app.use('/api/hawa', AuthRoutes)
app.use('/api/hawa', FoodRoutes)
app.use('/api/hawa',CartRoutes);
app.use('/api/hawa',SearchRoute);
app.use('/api/hawa',PaymentRoutes);
app.use('/api/hawa',NotificationRoute);
app.use('/api/hawa',ReviewRoutes);


io.on('connection', (socket) => {
    console.log('User Connected');

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})

// Getting the port number from the environment variables

const port = process.env.PORT;

// Starting the server and listening on the specified port

server.listen(port, () => {
 console.log(`Server is starting at port ${port}`);

});