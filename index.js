const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const wildcard = require('socketio-wildcard');

const logger = require('./logger/logger')
const Ride = require('./models/ride')


const PORT = process.env.PORT || 3002;

const activeConnections = new Set();


//middleware
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



io.use(wildcard());

io.on('connection', (socket) => {
    logger.info('a user connected');

    activeConnections.add(socket);

    logger.info('Total active connections:', activeConnections.size);

    socket.on("*", (packet) => {
        const [eventName, eventData] = packet.data;
        logger.info({
          eventName,
          eventData,
          socketId: socket.id,
        });
    });


    socket.on('createRide', async ({ user,source,destination }) => {
        
        try {
        let ride = new Ride();
        let currentUser = {
            socketID: socket.id,
            name: user.name,
            email:user.email,
            mobile:user.mobile
        };

        let userSource = {
            lat:source.lat,
            lng:source.lng
        }
        let userDestination = {
            lat:destination.lat,
            lng:destination.lng
        }

        ride.user = currentUser;
        ride.source = userSource;
        ride.destination = userDestination;

        ride = await ride.save();

        const rideID = room._id.toString();
        socket.join(rideID);
        
        
        io.to(rideID).emit('createRideSuccess', ride);
            
        } catch (error) {
            logger.error(error);
        }
    })
    socket.on('acceptRide', async ({ driver }) => {

    })


    socket.on('reachingUserLocation', async ({ driver }) => {


    })


    socket.on('disconnect', () => {
        logger.info('user disconnected');
        activeConnections.delete(socket);
        logger.info('Total active connections:', activeConnections.size);
    });
});






  
server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});