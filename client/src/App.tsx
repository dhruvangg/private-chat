import { BrowserRouter, Route, Routes } from 'react-router'
import RoomProvider from './Context/RoomContext'
import Timer from './Components/Timer.tsx'
import SocketProvider from './Context/SocketContext.tsx'
import ChatRoom from './Components/ChatRoom.tsx'
import { Home } from './Routes'

export default function App() {
  console.log('App rerender')
  return (
    <SocketProvider>
      <RoomProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<ChatRoom />} />
            <Route path="/timer" element={<Timer />} />
          </Routes>
        </BrowserRouter>
      </RoomProvider>
    </SocketProvider>
  )
}
