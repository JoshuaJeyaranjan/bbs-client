import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlayerListPage = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch players data from the server on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/players');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filtered players based on search term
  const filteredPlayers = players.filter((player) => {
    const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>I am the Player List Page</h1>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {/* Map through filtered players or all players if search term is empty */}
        {(searchTerm === '' ? players : filteredPlayers).map((player) => (
          <li key={player.id}>
            {/* Use Link component to create a link to the individual player page */}
            <Link to={`/players/${player.id}`}>
              {/* Display the first and last name of each player */}
              {`${player.first_name} ${player.last_name}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerListPage;
