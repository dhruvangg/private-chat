import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { useRoom } from "../Context/RoomContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type FormData = {
    username: string
}

export default function CreateRoom() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { addUser }: any = useRoom();
    const createRoom = (data: any) => {
        const { username } = data
        axios.post('http://192.168.1.12:3000/api/room/create', {
            username
        }).then((res) => {
            const roomId = res?.data?.roomId
            if (roomId) {
                addUser(roomId, username)
                // socket.emit('ROOM_CREATED', roomId)
                navigate(`/room/${roomId}`, { replace: true })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(createRoom)} className="flex p-2">
            <Input {...register('username')} placeholder="Username" required />
            <Button variant={'default'}>Create Room</Button>
        </form>
    )
}
