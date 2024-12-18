import { useSocket } from "@/Context/SocketContext";
import { useRoom } from "@/Context/RoomContext";
import { Label } from "./ui/label";
import Messagebox from "./Chat/Messagebox";
import Messages from "./Chat/Messages";

const ChatRoom = () => {
    const { messages }: any = useSocket()
    const { room }: any = useRoom()
    
    return (
        <div>
            <Label>{room.roomId}</Label>
            <Label>{room.username}</Label>
            <Messages messages={messages} />
            <Messagebox roomId={room.roomId} username={room.username}/>
        </div>
    )
}

export default ChatRoom;