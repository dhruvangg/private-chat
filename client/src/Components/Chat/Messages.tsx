import { useRoom } from "@/Context/RoomContext";
import { ScrollArea } from "../ui/scroll-area"
import { useEffect, useRef } from "react";

const Messages = ({ messages }: any) => {
    const { room }: any = useRoom()
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return <ScrollArea className="h-[400px] w-full pr-4">
        {messages.map((message: any) => (
            <div
                key={message.timestamp}
                className={`mb-4 ${message.username !== room.username ? 'text-right' : 'text-left'
                    }`}
            >
                <div className="mb-1 text-sm text-gray-500">
                    {message.username}
                </div>
                <div
                    className={`inline-block p-2 rounded-lg ${message.username !== room.username
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                        }`}
                >
                    {message.message}
                </div>
            </div>
        ))}
        <div ref={messagesEndRef} />
    </ScrollArea>
}

export default Messages;