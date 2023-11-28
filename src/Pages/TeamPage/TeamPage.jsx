import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../Components/Nav/Nav';
import Roster from '../../Components/Roster/Roster';
import './TeamPage.scss';
import Button from 'react-bootstrap/Button';

const TeamPage = () => {
  const [teamData, setTeamData] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [useRetroImages, setUseRetroImages] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return setFailedAuth(true);
    }

    // Get the data from the API
    axios
      .get('http://localhost:8080/api/current', {
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
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/teams/${id}`);
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [id]);

  if (!teamData) {
    return <p>Loading...</p>;
  }

  const toggleImages = () => {
    setUseRetroImages((prev) => !prev);
  };

  return (
    <div className="team-page">
      <Nav isAuthenticated={user !== null} />
      <Button variant="secondary" className='logo-toggle-button' onClick={toggleImages}>
                {useRetroImages ? 'Use Current Images' : 'Use Retro Images'}
              </Button>
      <div className="team-overlay">
        <div className="banner" style={{ backgroundImage: `url(${useRetroImages ? teamData.retroBanner : teamData.banner})` }}>
          <div className="overlay-content">
            <div className="team-overview">
              <h1>{teamData.full_name}</h1>
              <img className="logo" src={useRetroImages ? teamData.retroLogo : teamData.logo} alt="" />
              <p>Abbreviation: {teamData.abbreviation}</p>
              <p>City: {teamData.city}</p>
              <p>Conference: {teamData.conference}</p>
              <p>Division: {teamData.division}</p>
             
            </div>
            <Roster teamId={teamData.id} />
            {/* Add more information as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
