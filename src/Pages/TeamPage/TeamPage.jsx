import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeamPage = () => {
  const [teamData, setTeamData] = useState(null);
  const { id } = useParams();

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

  return (
    <div>
      <h1>I am the team Page</h1>
      <h1>{teamData.full_name}</h1>
      <p>Abbreviation: {teamData.abbreviation}</p>
      <p>City: {teamData.city}</p>
      <p>Conference: {teamData.conference}</p>
      <p>Division: {teamData.division}</p>
      {/* Add more information as needed */}
    </div>
  );
};

export default TeamPage;
