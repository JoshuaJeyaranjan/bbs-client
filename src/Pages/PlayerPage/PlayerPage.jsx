import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PlayerCareerTotal from '../../Components/PlayerCareerTotal/PlayerCareerTotal';
import axios from 'axios';
import { getAllStats } from '../../utils/api';
import './PlayerPage.scss';
import Nav from '../../Components/Nav/Nav';
import PlayerSznAverages from '../../Components/PlayerSznAvgs/PlayerSznAvgs';

const PlayerPage = () => {
  const [playerData, setPlayerData] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [headshotUrl, setHeadshotUrl] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Assuming you have an endpoint to get team details by team ID
        const teamResponse = await axios.get(`http://localhost:8080/api/teams/${playerData.team}`);
        setTeamInfo(teamResponse.data);
      } catch (error) {
        console.error('Error fetching team data', error);
      }
    };

    if (playerData) {
      fetchTeamData();
    }
  }, [playerData]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    axios
      .get("http://localhost:8080/api/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setFailedAuth(true);
      });
  }, []);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/players/${id}`);
        setPlayerData(response.data);

        // Fetch all stats for the player
        const allStats = await getAllStats(response.data.id);
        console.log(allStats); // Do something with allStats

        // Set headshot URL
        const headshotUrl = `https://www.basketball-reference.com/req/202106291/images/headshots/${response.data.last_name.substring(0, 5).toLowerCase()}${response.data.first_name.substring(0, 2).toLowerCase()}01.jpg`;
        setHeadshotUrl(headshotUrl);
      } catch (error) {
        console.error('Error fetching player data', error);
      }
    };

    fetchPlayerData();
  }, [id]);

  return (
    <div className='player-page'>
      {playerData && (
        <>
          <Nav isAuthenticated={user !== null} />
          <div className='main-container'>
            <div className='overview'>
              <h1 className='player-page__name'>{playerData.first_name} {playerData.last_name}</h1>
              {headshotUrl && <img className='player-page__headshot' src={headshotUrl} alt={`${playerData.first_name} ${playerData.last_name} headshot`} />}
              <>
                {teamInfo && (
                  <div className='team-info' >
                    <p > <span className='bolded'>Team:</span>  <Link className='player-page__team-name'  to={`/teams/${teamInfo.id}`}>{teamInfo.full_name}</Link></p>
                    <img className='player-logo' src={teamInfo.logo} alt="" />
                    <p>Conference: {teamInfo.conference}</p>
                  </div>
                )}
              </>
              <p>Position: {playerData.position}</p>
              <div className='height_container'>
                <p>Height: {playerData.height_feet}ft.</p>
                <p>{playerData.height_inches}</p>
              </div>
              <p>Weight: {playerData.weight_pounds}lbs.</p>
            </div>
            {/* <PlayerCareerTotal playerId={playerData.id} /> */}
            <PlayerSznAverages playerId={playerData.id} />
          </div>
          {teamInfo && teamInfo.banner && <img className='player-banner' src={teamInfo.banner} alt="" />}
        </>
      )}
    </div>
  );
};

export default PlayerPage;
