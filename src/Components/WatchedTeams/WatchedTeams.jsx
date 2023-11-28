import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './WatchedTeams.scss'
import Button from 'react-bootstrap/Button';

const WatchedTeams = ({ userId }) => {
  const [watchedTeams, setWatchedTeams] = useState([]);
  console.log('watched', watchedTeams);

  useEffect(() => {
    const fetchWatchedTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/watched_teams/${userId}`);
        setWatchedTeams(response.data);
      } catch (error) {
        console.error('Error fetching watched teams:', error);
      }
    };

    fetchWatchedTeams();
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

        // Remove the team from the local state
        setWatchedTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
      } else {
        // Handle error from the server
        console.error(`Error removing ${type} from watchlist:`, response.data);
      }
    } catch (error) {
      // Handle network error or other unexpected issues
      console.error(`Error removing ${type} from watchlist:`, error);
    }
  };

  return (
    <div className='watchedTeams'>
  <h2 className='title'>Watched Teams</h2>
  {watchedTeams.length === 0 ? (
    <p>No teams watched yet.</p>
  ) : (
    <ul className='team-list'>
      {watchedTeams.map((team) => (
        <li key={team.id} className='team-list-item'>
          <img className='mini-logo' src={team.logo} alt="team logo" />
          <Link className='team-name' to={`/teams/${team.id}`}>{team.full_name}</Link>
          
          <Button variant="outline-danger" className='remove-button' onClick={() => removeFromWatchlist('team', team.id)}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default WatchedTeams;
