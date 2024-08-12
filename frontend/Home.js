
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Flashcards</h1>
      <nav>
        <ul>
          <li><Link to="/flashcards">View Flashcards</Link></li>
          <li><Link to="/create">Create Flashcard</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
