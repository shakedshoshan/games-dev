# Fill in the Blanks Game

A multiplayer word game built with the MERN stack, where players take turns filling in blanks to create hilarious and nonsensical sentences.

## Description

"Fill in the Blanks" is a digital adaptation of the classic Mad Libs game. Players are presented with sentences containing blanks for different parts of speech (e.g., nouns, adjectives, verbs). They take turns filling in these blanks with random words, resulting in often funny and absurd sentences.

### Gameplay

1. The game provides sentences with blanks (e.g., "The [noun] jumped over the [adjective] [noun].").
2. Players take turns filling in the blanks with random words.
3. Once all blanks are filled, the complete sentence is revealed.
4. Points can be awarded for the funniest, most creative, or most absurd sentences.

![image](https://github.com/user-attachments/assets/00f69e2b-55c1-4f54-b394-80f2be611172)

![image](https://github.com/user-attachments/assets/53232268-6b45-430b-8e73-ba1f6216036c)

![image](https://github.com/user-attachments/assets/16fff8d4-b4f8-40ec-97c2-9ffe1dc12cae)


## Tech Stack

### Frontend
- React
- Vite (for fast development and optimized builds)
- TailwindCSS (for responsive and customizable styling)
- shadcn (for pre-built UI components)

### Backend
- Node.js
- Express (for RESTful API and server-side logic)
- Socket.io (for real-time multiplayer functionality)

### Database
- MongoDB (to store sentences, words, and game data)


### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fill-in-the-blanks-game.git
   cd fill-in-the-blanks-game
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `server` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development servers:
   In the `client` directory:
   ```
   npm run dev
   ```
   In the `server` directory:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to play the game.

## Features

- Real-time multiplayer gameplay
- Custom sentence creation and storage
- User authentication and profiles
- Leaderboard and scoring system
- Responsive design for desktop and mobile play

## Contributing

We welcome contributions to improve the game! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

