import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import axiosInstance from "@/lib/axiosInstance"

type UsersProps = {
    roomId: string
}

const Users = ({ roomId }: UsersProps) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = () => {
            axiosInstance.get(`/api/room/${roomId}`)
                .then((res) => setUsers(res.data.users))
                .catch((err) => console.log(err))
        }
        fetchUsers()
    }, [])

    return (
        <ul className="space-y-2">
            {users.length > 0 ?
                users.map((user: string) => <li key={user}><Label>{user}</Label></li>)
                : <li><Label>No users</Label></li>}
        </ul>
    )
}

export default Users;