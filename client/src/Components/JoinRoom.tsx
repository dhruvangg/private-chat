import { useForm } from "react-hook-form"
import { useRoom } from "../Context/RoomContext";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useSocket } from "@/Context/SocketContext";

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
        axios.post('http://192.168.1.12:3000/api/room/join', {
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
