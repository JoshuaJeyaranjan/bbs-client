// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Make sure to have react-router-dom installed

const TeamListPage = () => {
  // State to store the teams data
  const [teams, setTeams] = useState([]);

  // Fetch teams data from the server on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/teams'); // Adjust the endpoint based on your server setup
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Team List</h1>
      <ul>
        {/* Map through teams and create list items with links */}
        {teams.map((team) => (
          <li key={team.id}>
            {/* Use Link component to create a link to individual team page */}
            <Link to={`/teams/${team.id}`}>
              {/* Display the city and name of each team */}
              {`${team.city} ${team.name}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamListPage;
