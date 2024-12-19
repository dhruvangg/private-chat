import { useRoom } from "@/Context/RoomContext";
import Messagebox from "./Chat/Messagebox";

const ChatRoom = () => {
    const { room }: any = useRoom()
    
    return (
        <div className="max-w-md mx-auto min-h-screen">
            <Messagebox roomId={room.roomId} username={room.username}/>
        </div>
    )
}

export default ChatRoom;