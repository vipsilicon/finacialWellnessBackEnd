import { config } from 'dotenv';
config();
import http from 'http';
import socket from 'socket.io';
import { makeApp } from './app';
import { createConn } from './infra/create-conn';
import { SocketAuthHelper } from './shared/utils/helpers/socket-helper';
import { User } from './domain/user/user-entity';


async function bootstrap(){

    await createConn();

    console.log(`Connected to ${process.env.DB_NAME}`);
    
    const app = makeApp();
    const server = http.createServer(app.express);
    const PORT = 8081;

    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    })
}

bootstrap();

function initiaizeSocket(server: http.Server){

    const io = new socket.Server(server);
    const socketAuth = new SocketAuthHelper();

    io.on('connection', (socket) => {
        
        let user: User

        try{
            // user =  
        }
        catch(e){

        }
    })
}

// function getSocketUser(token: string): User{

    
// }