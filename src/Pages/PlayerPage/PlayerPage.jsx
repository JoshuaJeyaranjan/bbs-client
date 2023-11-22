// components/PlayerPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCareerTotal from '../../Components/PlayerCareerTotal/PlayerCareerTotal';
import axios from 'axios'; // Import axios
import { getAllStats } from '../../utils/api';
import './PlayerPage.scss';

const PlayerPage = () => {
  const [playerData, setPlayerData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/players/${id}`);
        setPlayerData(response.data);
        // Fetch all stats for the player
        const allStats = await getAllStats(response.data.id);
        console.log(allStats); // Do something with allStats
      } catch (error) {
        console.error('Error fetching player data', error);
      }
    };
    fetchPlayerData();
  }, [id]);

  return (
    <div>
      {playerData && (
        <>
          <h1>{playerData.first_name} {playerData.last_name}</h1>
          <p>Position: {playerData.position}</p>
          <div className='height_container'>
            <p>Height: {playerData.height_feet}ft.</p>
            <p>{playerData.height_inches}</p>
          </div>

          <p>Weight: {playerData.weight_pounds}lbs.</p>

          {/* Pass playerData.id to fetch all stats */}
          <PlayerCareerTotal playerId={playerData.id} />
        </>
      )}
    </div>
  );
};

export default PlayerPage;

