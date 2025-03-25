# Chat App Project Setup Guide

## Backend Setup

Follow these steps to set up and run the backend server:

### 1. Configure Environment Variables
Copy the `.env.example` file to `.env` and update the MongoDB URI:

```sh
cp .env.example .env
```

Open `.env` in a text editor and update the `MONGODB_URI` variable accordingly.

### 2. Navigate to the Server Directory
Change into the `server` directory:

```sh
cd server
```

### 3. Install Dependencies
Run the following command to install the required dependencies:

```sh
npm install
```

### 4. Start the Backend Server
Launch the backend in development mode:

```sh
npm run dev
```

### 5. Connect Frontend to Backend
Copy the provided backend URL and update the `BACKEND_URI` variable in the frontend `.env` file accordingly.


---

## Frontend Setup

Follow these steps to set up and run the React project:

## 1. Configure Environment Variables
Copy the `.env.example` file to `.env` and update the backend URI as needed:

```sh
cp .env.example .env
```

Open `.env` in a text editor and update the `BACKEND_URI` variable accordingly.

## 2. Navigate to the Client Directory
Change into the `client` directory:

```sh
cd client
```

## 3. Install Dependencies
Run the following command to install the required dependencies:

```sh
npm install
```

## 4. Start the Development Server
Launch the project in development mode:

```sh
npm run dev
```

Your Frontend project should now be running. Open the provided URL in your browser to see the application.

[System Design](System-Design.md)