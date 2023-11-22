import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
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

  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/teams");

      console.log(response);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    fetchTeams();
  }, []);

  // Filtered teams based on search term
  const filteredTeams = teams.filter((team) => {
    const teamName = `${team.city} ${team.name}`.toLowerCase();
    return teamName.includes(searchTerm.toLowerCase());
  });

  const addToWatchlist = async (teamId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/watchlist/team",
        teamId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        // Update local state or take any additional actions on success
        console.log("Team added to watchlist successfully");
      } else {
        // Handle error from the server
        console.error("Error adding team to watchlist:", response.data);
      }
    } catch (error) {
      // Handle network error or other unexpected issues
      console.error("Error adding team to watchlist:", error);
    }
  };

  const renderTeams = (teamsToRender) => {
    return teamsToRender.map((team) => (
      <li key={team.id}>
        <Link to={`/teams/${team.id}`}>{`${team.city} ${team.name}`}</Link>
        {/* Add button to add the team to the watchlist */}
        <button onClick={() => addToWatchlist(team.id)}>
          Add to Watchlist
        </button>
      </li>
    ));
  };

  return (
    <div>
      <h1>Team List</h1>
      <input
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {searchTerm === "" ? renderTeams(teams) : renderTeams(filteredTeams)}
      </ul>
    </div>
  );
};

export default TeamListPage;
