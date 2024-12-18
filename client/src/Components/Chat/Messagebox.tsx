import { useSocket } from "@/Context/SocketContext"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const Messagebox = ({ roomId, username }: any) => {
    const { socket }: any = useSocket()
    const { register, handleSubmit } = useForm()
    const sendMessage = (data: any) => {
        console.log('send-message', data, socket.id);
        
        const { message } = data
        socket.emit('send-message', { message, roomId, username })
    }

    return (
        <form onSubmit={handleSubmit(sendMessage)}>
            <div>
                <Input {...register('message')} placeholder="Message" required />
                <Button>Send</Button>
            </div>
        </form>
    )
}

export default Messagebox;