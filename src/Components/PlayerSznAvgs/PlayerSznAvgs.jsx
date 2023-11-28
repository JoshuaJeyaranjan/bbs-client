import React, { useState, useEffect } from "react";
import "./PlayerSznAvgs.scss";
import Button from 'react-bootstrap/Button';

const PlayerSznAverages = ({ playerId }) => {
  const [seasonAverages, setSeasonAverages] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(new Date().getFullYear()); // Default to the current year

  useEffect(() => {
    const fetchSeasonAverages = async () => {
      try {
        const response = await fetch(
          `https://www.balldontlie.io/api/v1/season_averages?season=${currentSeason}&player_ids[]=${playerId}`
        );
        const data = await response.json();

        if (data.data.length === 0) {
          // If no data for the current season, move to the next season
          setCurrentSeason((prevSeason) => prevSeason + 1);
        } else {
          setSeasonAverages(data.data);
        }
      } catch (error) {
        console.error("Error fetching season averages:", error);
      }
    };

    fetchSeasonAverages();
  }, [currentSeason, playerId]);

  const handlePrevSeason = () => {
    setCurrentSeason((prevSeason) => prevSeason - 1);
  };

  const handleNextSeason = () => {
    setCurrentSeason((prevSeason) => prevSeason + 1);
  };

  return (
    <div className="szn_averages">
      <h2>Season Averages ({currentSeason})</h2>
      <div className="szn_averages__button-container">
        <Button className="back-button" variant="outline-primary" onClick={handlePrevSeason}>Previous Season</Button>
        <Button variant="outline-primary" onClick={handleNextSeason}>Next Season</Button>
      </div>

      {seasonAverages.length > 0 ? (
        <ul className="szn_averages__list">
          {seasonAverages.map((season) => (
            <li className="szn_averages__list" key={season.player_id}>
              <div className="container">
                <p>GP: {season.games_played}</p>
                <p>Mins: {season.min}</p>
              </div>
              <div className="container">
                <p>Pts: {season.pts}</p>
                <p>Ast: {season.ast}</p>
              </div>
              <div className="container">
                <p>O-Reb: {season.oreb}</p>
                <p>D-Reb: {season.dreb}</p>
              </div>
              <div className="container">
                <p>Sts: {season.stl}</p>
                <p>Blk: {season.blk}</p>
              </div>
              <div className="container">
                <p>FG%: {season.fg_pct}</p>
                <p>3PT%: {season.fg3_pct}</p>
              </div>
              <div className="container">
                <p>FT%: {season.ft_pct} </p>
                <p>More to come!</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No season averages available for the selected season.</p>
      )}

      
    </div>
  );
};

export default PlayerSznAverages;
