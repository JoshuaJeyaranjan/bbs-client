import React from "react";

const PlayerCareerTotal = () => {
  return (
    <div className="totals">
      <h1 className="totals_header">Career Totals</h1>
      <div className="upper-data-container">
        <div className="upper-data-container__points">
            <p className="data-header">Points</p>
    
        </div>

        <div className="upper-data-container__assists">
        <p className="data-header">Assists</p>
        </div>

        <div className="upper-data-container__oreb">
        <p className="data-header">O-Reb</p>
        </div>

        <div className="upper-data-container__dreb">
        <p className="data-header">D-Reb</p>
        </div>

        <div className="upper-data-container__blocks">
        <p className="data-header">Blocks</p>
        </div>
        <div className="upper-data-container__steals">
        <p className="data-header">Steals</p>
        </div>
      </div>
      <div className="lower-data-container">
        <div className="lower-data-container__3pt%">
        <p className="data-header">3pt%</p>
        </div>

        <div className="lower-data-container__fg%">
        <p className="data-header">Fg%</p>
        </div>

        <div className="lower-data-container__ft%">
        <p className="data-header">Ft%</p>
        </div>

        <div className="lower-data-container__games-played">
        <p className="data-header">GP</p>
        </div>

        <div className="lower-data-container__minutes">
        <p className="data-header">Mins.</p>
        </div>

        <div className="lower-data-container__fouls">
        <p className="data-header">Fouls</p>
        </div>

        <div className="lower-data-container__turnovers">
        <p className="data-header">T/O</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCareerTotal;
