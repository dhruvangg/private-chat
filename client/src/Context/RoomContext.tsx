import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const RoomContext = createContext(null);

export function useRoom() {
    return useContext(RoomContext)
}

type RoomProviderProps = {
    children: ReactNode;
};

type RoomState = {
    roomId: string,
    username: string
}

export default function RoomProvider({ children }: RoomProviderProps) {
    const [room, setRoom] = useState<RoomState>(() => {
        const room = localStorage.getItem('room');
        if (room) {
            return JSON.parse(room);
        }
        return { roomId: '', username: '' };
    })

    useEffect(() => {
        if (room) {
            localStorage.setItem("room", JSON.stringify(room));
        }
    }, [room]);

    const addUser = (roomId: string, username: string) => {        
        setRoom({ roomId, username });
    }

    return (
        <RoomContext.Provider value={{ room, addUser }}>
            {children}
        </RoomContext.Provider>
    )
}

