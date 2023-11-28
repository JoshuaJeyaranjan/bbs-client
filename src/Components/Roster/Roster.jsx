import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Roster.scss'

const Roster = ({ teamId }) => {
  const [roster, setRoster] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(2023); // Default to the most recent season
  const [uniquePlayerIds, setUniquePlayerIds] = useState(new Set());

  const fetchRoster = (season) => {
    fetch(`http://localhost:8080/api/team-roster/${teamId}/${season}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter out duplicate players using uniquePlayerIds set
        const filteredRoster = data.filter((player) => !uniquePlayerIds.has(player.player_id));

        // Update the uniquePlayerIds set with the new player IDs
        const newPlayerIds = new Set([...uniquePlayerIds, ...filteredRoster.map((player) => player.player_id)]);
        setUniquePlayerIds(newPlayerIds);

        // Update the roster state with the filtered data
        setRoster(filteredRoster);
      })
      .catch((error) => console.error('Error fetching roster:', error));
  };

  useEffect(() => {
    // Fetch initial roster for the default season
    fetchRoster(currentSeason);
  }, [currentSeason, teamId]); // Include teamId as a dependency

  const handleSeasonChange = (newSeason) => {
    // Update the current season and fetch the roster for the new season
    setCurrentSeason(newSeason);
  };

  return (
    <div className='roster'>
      <h2>Team Roster</h2>
      <div>
        <label>Select Season:</label>
        <select onChange={(e) => handleSeasonChange(e.target.value)} value={currentSeason}>
          {/* Generate a list of seasons, you may fetch this from the backend if needed */}
          <option value={2023}>2023</option>
          {/* Add more options for other seasons */}
        </select>
      </div>
      <ul className='roster-list'>
        {roster.map((player) => (
           <li className='roster-list__item' key={player.player_id}>
           <Link to={`/players/${player.id}`}>
             {player.first_name} {player.last_name} 
           </Link>
           
           
           {/* Add a conditional check for the "position" field */}
           <p>Position: {player.position || 'Position not available'}</p>
         </li>
        ))}
      </ul>
    </div>
  );
};

export default Roster;
