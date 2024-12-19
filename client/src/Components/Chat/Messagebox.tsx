import { useSocket } from "@/Context/SocketContext"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Send } from 'lucide-react'
import Messages from "./Messages"


const Messagebox = ({ roomId, username }: any) => {
    const { socket, messages }: any = useSocket()
    const { register, handleSubmit, setValue } = useForm()
    const sendMessage = (data: any) => {
        console.log('send-message', data, socket.id);

        const { message } = data
        socket.emit('send-message', { message, roomId, username })
        setValue('message', '')
    }

    return (
        <div className="min-h-screen p-2">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Private Chat</CardTitle>
                </CardHeader>
                <CardContent>
                    <Messages messages={messages} />
                </CardContent>
                <CardFooter className="p-3">
                    <form onSubmit={handleSubmit(sendMessage)} className="flex w-full items-center space-x-2">
                        <Input
                            {...register('message')}
                            placeholder="Type your message..."
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Messagebox;