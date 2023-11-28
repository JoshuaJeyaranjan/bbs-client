import React from "react";

const PlayerCareerTotal = ({ careerStats }) => {
  // Check if careerStats is undefined, null, or an empty array
  if (careerStats == null || !careerStats.data || careerStats.data.length === 0) {
    return "Loading career stats..."; // or some loading indicator
  }

  // Extract the array of games from the object
  const gamesArray = careerStats.data || [];
  console.log(careerStats.data);
  console.log(gamesArray);

  // Check if gamesArray is an array
  if (!Array.isArray(gamesArray)) {
    return "Invalid career stats data"; // or some appropriate message
  }

  // Check if gamesArray.pts is undefined
  if (!gamesArray.every(game => 'pts' in game)) {
    return "Career stats format is invalid"; // or an appropriate message
  }
  console.log(careerStats.data);

  // Initialize totals for each category
  let totalPoints = 0;
  let totalAssists = 0;
  let totalOReb = 0;
  let totalDReb = 0;
  let totalBlocks = 0;
  let totalSteals = 0;
  let totalThreePtPercentage = 0;
  let totalFgPercentage = 0;
  let totalFtPercentage = 0;
  let totalGamesPlayed = gamesArray.length;
  let totalMinutes = 0;
  let totalFouls = 0;
  let totalTurnovers = 0;

  // Loop through each game and update totals
  gamesArray.forEach(game => {
    totalPoints += game.pts || 0;
    totalAssists += game.ast || 0;
    totalOReb += game.oreb || 0;
    totalDReb += game.dreb || 0;
    totalBlocks += game.blk || 0;
    totalSteals += game.stl || 0;
    totalThreePtPercentage += game.fg3_pct || 0;
    totalFgPercentage += game.fg_pct || 0;
    totalFtPercentage += game.ft_pct || 0;
    totalMinutes += calculateMinutes(game.min);
    totalFouls += game.pf || 0;
    totalTurnovers += game.turnover || 0;
  });

  // Function to calculate total minutes from the format "HH:MM"
  const calculateMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  return (
    <div className="totals">
      <div className="totals_header">Career Totals</div>
      <div className="upper-data-container">
        {/* Render each category with its corresponding total */}
        <div className="upper-data-container__points">
          <p className="data-header">Points</p>
          <p>Total Points: {totalPoints}</p>
        </div>

        <div className="upper-data-container__assists">
          <p className="data-header">Assists</p>
          <p>Total Assists: {totalAssists}</p>
        </div>

        <div className="upper-data-container__oreb">
          <p className="data-header">O-Reb</p>
          <p>Total Offensive Rebounds: {totalOReb}</p>
        </div>

        <div className="upper-data-container__dreb">
          <p className="data-header">D-Reb</p>
          <p>Total Defensive Rebounds: {totalDReb}</p>
        </div>

        <div className="upper-data-container__blocks">
          <p className="data-header">Blocks</p>
          <p>Total Blocks: {totalBlocks}</p>
        </div>

        <div className="upper-data-container__steals">
          <p className="data-header">Steals</p>
          <p>Total Steals: {totalSteals}</p>
        </div>
      </div>

      <div className="lower-data-container">
        <div className="lower-data-container__3pt%">
          <p className="data-header">3pt%</p>
          <p>Total 3-Point Percentage: {(totalThreePtPercentage / gamesArray.length).toFixed(3)}</p>
        </div>

        <div className="lower-data-container__fg%">
          <p className="data-header">Fg%</p>
          <p>Total Field Goal Percentage: {(totalFgPercentage / gamesArray.length).toFixed(3)}</p>
        </div>

        <div className="lower-data-container__ft%">
          <p className="data-header">Ft%</p>
          <p>Total Free Throw Percentage: {(totalFtPercentage / gamesArray.length).toFixed(3)}</p>
        </div>

        <div className="lower-data-container__games-played">
          <p className="data-header">GP</p>
          <p>Total Games Played: {totalGamesPlayed}</p>
        </div>

        <div className="lower-data-container__minutes">
          <p className="data-header">Mins.</p>
          <p>Total Minutes Played: {totalMinutes}</p>
        </div>

        <div className="lower-data-container__fouls">
          <p className="data-header">Fouls</p>
          <p>Total Fouls: {totalFouls}</p>
        </div>

        <div className="lower-data-container__turnovers">
          <p className="data-header">T/O</p>
          <p>Total Turnovers: {totalTurnovers}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCareerTotal;
