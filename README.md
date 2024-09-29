# Fill in the Blanks (Mad Libs Style) Game

A fun, interactive MERN stack application where players take turns filling in blanks in sentences to create hilarious and nonsensical stories.

## Description

"Fill in the Blanks" is a digital adaptation of the classic Mad Libs game. Players are presented with sentences containing blanks for different parts of speech (nouns, adjectives, verbs, etc.). They take turns filling in these blanks with random words, resulting in often humorous and absurd sentences.

### Features

- Multiplayer gameplay (2 or more players)
- Random sentence generation with blanks
- Turn-based word submission
- Reveal completed sentences
- Optional scoring system for creativity and humor

## Tech Stack

- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB
- State Management: [Your choice, e.g., Redux, Context API]
- Styling: [Your choice, e.g., CSS Modules, Styled Components]

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fill-in-the-blanks.git
   cd fill-in-the-blanks
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the `server` directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```
   cd server
   npm start
   ```

2. In a new terminal, start the frontend:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
fill-in-the-blanks/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## API Endpoints

- `GET /api/sentences`: Fetch a random sentence with blanks
- `POST /api/words`: Submit a word for a blank
- `GET /api/completed`: Retrieve completed sentences

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, or request features.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Inspired by the classic Mad Libs game
- Thanks to all contributors and players!
