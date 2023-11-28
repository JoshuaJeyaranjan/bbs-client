import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ScoringLeaders.scss';
import Button from 'react-bootstrap/Button';

const ScoringLeaders = () => {
  const [scoringLeaders, setScoringLeaders] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(2023); // Initial season
  const seasons = [2022, 2023, 2024]; // Example seasons, replace with your actual seasons

  useEffect(() => {
    // Fetch scoring leaders data from the backend API for the current season
    fetch(`http://localhost:8080/api/scoring-leaders/${currentSeason}`)
      .then((response) => response.json())
      .then((data) => setScoringLeaders(data))
      .catch((error) => console.error('Error fetching scoring leaders:', error));
  }, [currentSeason]);

  const handleSeasonChange = (newSeason) => {
    setCurrentSeason(newSeason);
  };

  return (
    <div className='scoring-leaders'>
      <h2>Scoring Leaders - {currentSeason}</h2>
      <div className='button-container'>
        <Button variant="outline-primary" onClick={() => handleSeasonChange(currentSeason - 1)}>Previous Season</Button>
        <Button variant="outline-primary" onClick={() => handleSeasonChange(currentSeason + 1)}>Next Season</Button>
      </div>
      <ul className='list'>
        {scoringLeaders.map((leader) => (
          <li className='player-item' key={leader.player_id}>
            <Link className='card' to={`/players/${leader.player_id}`}>
            <img
              className='headshot'
              src={`https://www.basketball-reference.com/req/202106291/images/headshots/${leader.last_name.substring(0, 5).toLowerCase()}${leader.first_name.substring(0, 2).toLowerCase()}01.jpg`}
              alt={`${leader.first_name} ${leader.last_name} headshot`}
            />
            <div className='leader-details'>
           <div className='leader-name'> {leader.first_name} {leader.last_name} </div>
          

            {leader.pts} points <br />
            {leader.ast} assists <br />
            {leader.reb} rebounds <br />
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoringLeaders;
