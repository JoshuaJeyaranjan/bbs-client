import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch teams data from the server on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filtered teams based on search term
  const filteredTeams = teams.filter((team) => {
    const teamName = `${team.city} ${team.name}`.toLowerCase();
    return teamName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Team List</h1>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {/* Map through filtered teams or all teams if search term is empty */}
        {(searchTerm === '' ? teams : filteredTeams).map((team) => (
          <li key={team.id}>
            {/* Use Link component to create a link to the individual team page */}
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
