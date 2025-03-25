import { useForm } from "react-hook-form"
import { useRoom } from "../Context/RoomContext";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSocket } from "@/Context/SocketContext";
import axiosInstance from "@/lib/axiosInstance";

type FormData = {
    username: string,
    roomId: string
}

export default function JoinRoom() {
    const { joinRoomRequest } = useSocket()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { addUser }: any = useRoom()
    const navigate = useNavigate()

    const joinRoom = (data: any) => {
        const { username, roomId } = data
        axiosInstance.post('/api/room/join', {
            username, roomId
        }).then((res) => {
            const roomId = res?.data?.roomId
            if (roomId) {
                addUser(roomId, username)
                joinRoomRequest(roomId, username)
                navigate(`/room/${roomId}`)
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(joinRoom)} className="flex p-2">
            <Input {...register('username')} placeholder="Username" required />
            <Input {...register('roomId')} placeholder="Room ID" required />
            <Button variant={'default'}>Join Room</Button>
        </form>
    )
}
