### **1. Frontend (React.js)**

- **Home Page:**
    - Display two buttons:
        1. **Create Room**: Opens a modal or form to enter a username. Generates a unique `roomId` and navigates to `/room/xxxx`.
        2. **Join Room**: Opens a modal or form to enter a username and `roomId`. Validates `roomId` and navigates to `/room/xxxx`.
- **Chatroom Page (`/room/:roomId`):**
    - Show a real-time chat interface:
        - List of messages.
        - Input field for new messages.
        - Display the username and `roomId`.
- **Routing:**
    - `/` → Home Page
    - `/room/:roomId` → Chatroom Page

---

### **2. Backend (Express.js + MongoDB)**

- **Endpoints:**
    1. **POST /api/rooms/create**
        - Generates a unique `roomId` and stores it in the database.
        - Returns the `roomId`.
    2. **POST /api/rooms/join**
        - Validates the `roomId` against the database.
        - Returns success or failure.
- **WebSocket Communication (Socket.IO):**
    - Handle real-time communication for:
        - Broadcasting messages to all users in a room.
        - Notifying users when someone joins or leaves the room.
- **Database Models:**
    - **Room:**
        
        ```
        {
          roomId: String, // Unique identifier
          users: [String], // List of usernames
          messages: [{ username: String, message: String, timestamp: Date }] // Chat history
        }
        
        ```
        

---

### **3. Database (MongoDB)**

- Store chat history and room information.
- Collections:
    - `rooms`: Stores `roomId`, active users, and chat messages.

---

### **4. Key Features**

1. **Room Creation:**
    - On the "Create Room" button click:
        - Generate a random `roomId` using `uuid` or similar libraries.
        - Save the room details to the database.
        - Redirect to `/room/:roomId`.
2. **Room Joining:**
    - On the "Join Room" button click:
        - Validate `roomId` from the backend.
        - If valid, redirect to `/room/:roomId`.
3. **Real-time Messaging:**
    - Use `Socket.IO` to establish WebSocket communication.
    - Events:
        - `join-room`: Notify other users when someone joins.
        - `send-message`: Broadcast messages to all users in the room.
        - `leave-room`: Notify users when someone leaves.
4. **Chatroom Persistence:**
    - Store messages in the `rooms` collection for persistence.

### **Tech Stack**

- **Frontend**: React.js, React Router, Axios.
- **Backend**: Node.js, Express.js, Socket.IO.
- **Database**: MongoDB.
- **Utilities**: `uuid` for generating unique room IDs.

---

**Description:**  
The **Anonymous Private Chat Application** allows users to create or join private chat rooms effortlessly—no login, no accounts, just instant messaging! This app is designed for fast, secure, and real-time communication with an emphasis on simplicity and user privacy.  

**Key Features:**  
1. **Anonymous Chat**:  
   - No account or sign-up required.  
   - Users can enter a chatroom with just a username, keeping the experience completely anonymous.  

2. **Private Rooms**:  
   - Create a unique chatroom with a randomly generated `roomId`.  
   - Share the `roomId` with friends to join the conversation.  

3. **Real-Time Messaging**:  
   - Powered by **Socket.IO** for seamless, instant communication.  
   - Messages are broadcast to all users in the room with zero delay.  

4. **Chat History Persistence**:  
   - Chat history is saved in the database, ensuring that no message is lost if a user refreshes the page.  

5. **User-Friendly Interface**:  
   - Clean and responsive design using **Tailwind CSS** and **shadcn/ui** for a modern look.  
   - Simple navigation with two core pages: Home and Chatroom.  

---

**How It Works:**  
1. **Home Page**:  
   - Click **Create Room** to generate a new private chatroom and navigate to it.  
   - Click **Join Room** to enter an existing chatroom using the `roomId`.  

2. **Chatroom**:  
   - Start chatting in real time! See all messages, the `roomId`, and the usernames of participants.  

---

**Why Anonymous Chat?**  
In today’s world, not everyone wants to go through the hassle of creating accounts or logging in just to chat. This app focuses on providing a **fast and frictionless experience**, making it perfect for casual, temporary conversations without compromising user privacy.  

**#AnonymousChat #RealTimeMessaging #ReactJS #ExpressJS #SocketIO #WeekendProject #WebDevelopment**