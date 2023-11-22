import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const PlayerListPage = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  const getCurrentUser = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    // Get the data from the API
    axios
      .get("http://localhost:8080/api/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setFailedAuth(true);
      });
  };
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

  const addToWatchlist = async (playerId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/watchlist/player",
        playerId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        // Update local state or take any additional actions on success
        console.log("Player added to watchlist successfully");
      } else {
        // Handle error from the server
        console.error("Error adding player to watchlist:", response.data);
      }
    } catch (error) {
      // Handle network error or other unexpected issues
      console.error("Error adding player to watchlist:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);


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
            <button onClick={() => addToWatchlist(player.id)}>
          Add to Watchlist
        </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerListPage;
