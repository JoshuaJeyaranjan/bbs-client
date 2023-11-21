
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlayerListPage = () => {
    const [players, setPlayers] = useState([]);

      // Fetch teams data from the server on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/players'); // Adjust the endpoint based on your server setup
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []); // Empty dependency array ensures this runs only once on mount


    return (
        <div>
            <h1>I am the Player List Page</h1>
            <ul>
        {/* Map through teams and create list items with links */}
        {players.map((player) => (
          <li key={player.id}>
            {/* Use Link component to create a link to individual team page */}
            <Link to={`/players/${player.id}`}>
              {/* Display the city and name of each team */}
              {`${player.first_name}${player.last_name}`}
            </Link>
          </li>
        ))}
      </ul>
        </div>
    );
};

export default PlayerListPage;