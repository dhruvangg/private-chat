// import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

type SocketContextType = {
    socket: any;
    messages: MessagesType[];
    joinRoomRequest: (roomId: string, username: string) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
    return React.useContext(SocketContext)
}

type SocketProviderProps = {
    children: React.ReactNode
}

type MessagesType = {
    message: string,
    username: string,
    timestamp: number
}

export default function SocketProvider({ children }: SocketProviderProps) {
    const { current: socket }: any = useRef(io(import.meta.env.VITE_BACKEND_URI, {
        autoConnect: false,
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    }))
    const [messages, setMessages] = useState<MessagesType[]>([])
    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log('Connected to server');
        })
        socket.on('receive-message', (data: any) => {
            console.log('receive-message', data);
            setMessages((prevMessages) => [...prevMessages, data])
        })

        socket.on('user-joined', (data: any) => {
            console.log('user-joined', data);
            setMessages([...messages, { ...data, message: 'joined', timestamp: Date.now() }])
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receive-message');
            socket.off('user-joined');
            socket.disconnect();
        }
    }, [])

    const joinRoomRequest = (roomId: string, username: string) => socket.emit('join-room', { roomId, username })

    console.log('rerender', messages)
    return (
        <SocketContext.Provider value={{ socket, messages, joinRoomRequest }}>
            {children}
        </SocketContext.Provider>
    )
}