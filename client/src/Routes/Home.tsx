import CreateRoom from "@/Components/CreateRoom";
import JoinRoom from "@/Components/JoinRoom";
import { Label } from "@/Components/ui/label";

export const Home = () => {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <CreateRoom />
            <Label className="my-4">OR</Label>
            <JoinRoom />
        </div>
    )
}
