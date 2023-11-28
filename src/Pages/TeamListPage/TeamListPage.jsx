import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../../Components/Nav/Nav";
import './TeamListPage.scss'
import Button from 'react-bootstrap/Button';

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [useRetroLogos, setUseRetroLogos] = useState(false); // Added state for logo type

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

      console.log(response);

      if (response.status === 204) {
        // Update local state or take any additional actions on success
        console.log(`${type} removed from watchlist successfully`);
      } else {
        // Handle error from the server
        console.error(`Error removing ${type} from watchlist:`, response.data);
      }
    } catch (error) {
      // Handle network error or other unexpected issues
      console.error(`Error removing ${type} from watchlist:`, error);
    }
  };

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
        { teamId: teamId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      

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
      <li className="team-item" key={team.id}>
        <Link className="link" to={`/teams/${team.id}`}>
          {/* Use the selected logo type */}
          <img className="logo" src={useRetroLogos ? team.retroLogo : team.logo} alt="Team Logo" />
          {`${team.city} ${team.name}`}
        </Link>
        <Button className="button" variant="primary" onClick={() => addToWatchlist(team.id)}>
          Add to Watchlist
        </Button>
      </li>
    ));
  };

  return (
    <div className="team-list">
      <Nav isAuthenticated={user !== null} />

      {/* Add a button to toggle between regular and retro logos */}
      <Button
        className="logo-toggle-button"
        variant="secondary"
        onClick={() => setUseRetroLogos((prev) => !prev)}
      >
        {useRetroLogos ? "Use Regular Logos" : "Use Retro Logos"}
      </Button>

      <input
        className="search"
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="list-for-teams">
        {searchTerm === "" ? renderTeams(teams) : renderTeams(filteredTeams)}
      </ul>
    </div>
  );
};


export default TeamListPage;
