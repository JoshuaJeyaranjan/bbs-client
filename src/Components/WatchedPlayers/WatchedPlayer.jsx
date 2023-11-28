import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WatchedPlayer.scss';
import Button from 'react-bootstrap/Button';

const WatchedPlayer = ({ userId }) => {
  const [watchedPlayers, setWatchedPlayers] = useState([]);

  useEffect(() => {
    const fetchWatchedPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/watched_players/${userId}`);
        setWatchedPlayers(response.data);
      } catch (error) {
        console.error('Error fetching watched players:', error);
      }
    };

    fetchWatchedPlayers();
  }, [userId]);

  const removeFromWatchlist = async (type, id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8080/api/watchlist/${type}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        // Update local state or take any additional actions on success
        console.log(`${type} removed from watchlist successfully`);

        // Remove the player from the local state
        setWatchedPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
      } else {
        // Handle error from the server
        console.error(`Error removing ${type} from watchlist:`, response.data);
      }
    } catch (error) {
      // Handle network error or other unexpected issues
      console.error(`Error removing ${type} from watchlist:`, error);
    }
  };

  useEffect(() => {
    // Fetch team information for each watched player
    const fetchTeamInfo = async () => {
      const updatedWatchedPlayers = await Promise.all(
        watchedPlayers.map(async (player) => {
          try {
            const teamResponse = await axios.get(`http://localhost:8080/api/teams/${player.team}`);
            return { ...player, teamName: teamResponse.data.full_name };
          } catch (error) {
            console.error('Error fetching team information:', error);
            return player; // Keep the original player object if there's an error
          }
        })
      );
      setWatchedPlayers(updatedWatchedPlayers);
    };

    fetchTeamInfo();
  }, [watchedPlayers]);

  return (
    <div className='watchedPlayers'>
      <h2 className='title '>Watched Players</h2>
      {watchedPlayers.length === 0 ? (
        <p>No players watched yet.</p>
      ) : (
        <ul className='list'>
          {watchedPlayers.map((player) => (
            <li className='player-item' key={player.id}>
              <Link className='card' to={`/players/${player.id}`}>
                
                {/* Fetch and display headshot for each watched player */}
                <img
                  className='headshot'
                  src={`https://www.basketball-reference.com/req/202106291/images/headshots/${player.last_name.substring(0, 5).toLowerCase()}${player.first_name.substring(0, 2).toLowerCase()}01.jpg`}
                  alt={`${player.first_name} ${player.last_name} headshot`}
                />
                <div className='watched-player-details'>

                <div className='watched-player-name'>{player.first_name} {player.last_name} </div> 
                
               {player.teamName} <br />
                Position: {player.position} <br />
                
                Height: {player.height_feet}ft. {player.height_inches}in. <br />
                Weight: {player.weight_pounds} lbs.

                </div>


              </Link>
              <Button variant="outline-danger" onClick={() => removeFromWatchlist('player', player.id)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchedPlayer;
