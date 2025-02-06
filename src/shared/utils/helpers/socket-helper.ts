import { Socket } from 'socket.io';
import { User } from '../../../domain/user/user-entity';

export interface ISocket {
    socket: Socket
    userID: number
}

interface IAddSocketProps {
    user: User
    socket: Socket
}

const SOCKETS: ISocket[] = [];

export class SocketAuthHelper {

    addSocket(props: IAddSocketProps):void {
        SOCKETS.push({
            socket: props.socket,
            userID: props.user.id
        })
    }

    removeSocket(id: string): void {
        const socketIndex = SOCKETS.findIndex(socket => socket.socket.id === id)

        if(socketIndex !== -1){
            SOCKETS.splice(socketIndex, 1);
        }
    }
}