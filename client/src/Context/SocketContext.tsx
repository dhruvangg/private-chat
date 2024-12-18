import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext<React.MutableRefObject<any>>(null)

export const useSocket = () => {
    return React.useContext(SocketContext)
}

type SocketProviderProps = {
    children: React.ReactNode
}

export default function SocketProvider({ children }: SocketProviderProps) {
    const { current: socket }: any = useRef(io('http://192.168.1.12:3000', {
        autoConnect: false,
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    }))
    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log('Connected to server');
        })
        socket.on('receive-message', (data: any) => {
            console.log('receive-message', data);
            setMessages([...messages, data])
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

    console.log('rerender')
    return (
        <SocketContext.Provider value={{ socket, messages, joinRoomRequest }}>
            {children}
        </SocketContext.Provider>
    )
}