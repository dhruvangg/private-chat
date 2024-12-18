import { Label } from "../ui/label";

const Messages = ({messages}: any) => {
    return <ul>
        {messages.map((message: any) => <li key={message.timestamp}><Label>{message.username}: {message.message}</Label></li>)}
    </ul>
}

export default Messages;