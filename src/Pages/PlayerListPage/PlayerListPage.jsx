import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../../Components/Nav/Nav";
import Button from "react-bootstrap/Button";
import "./PlayerListPage.scss";

const PlayerListPage = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        const response = await fetch("http://localhost:8080/api/players");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
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
        { playerId },
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
    <div className="player-list-page">
      <Nav isAuthenticated={user !== null} />
      

      {/* Search bar */}
      <input
      className="player-searchbar"
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="list-for-players">
        {/* Map through filtered players or all players if search term is empty */}
        {(searchTerm === "" ? players : filteredPlayers).map((player) => (
          <li className="player-item for-list" key={player.id}>
            <Link className="card" to={`/players/${player.id}`}>
              {/* Fetch and display headshot for each watched player */}
              <img
                className="headshot"
                src={`https://www.basketball-reference.com/req/202106291/images/headshots/${player.last_name
                  .substring(0, 5)
                  .toLowerCase()}${player.first_name
                  .substring(0, 2)
                  .toLowerCase()}01.jpg`}
                alt={`${player.first_name} ${player.last_name} headshot`}
              />
               <div className="player-list-details">
               <div className="player-list-name">
                {player.first_name} {player.last_name} 
                    </div>
              
              {/* Team: {player.teamName} */}
              Position: {player.position} <br />
              Height: {player.height_feet}ft. {player.height_inches}in. <br />
              Weight: {player.weight_pounds} lbs.

               </div>
                
            </Link>
            <Button
              variant="outline-primary"
              onClick={() => addToWatchlist(player.id)}
            >
              Add to Watchlist
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerListPage;
