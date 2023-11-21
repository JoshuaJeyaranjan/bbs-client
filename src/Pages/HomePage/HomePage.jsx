import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div>
            <h1>I am the homepage</h1>
            <Link to="/teams">Teams</Link>
            <Link to="/players">Players</Link>
        </div>
    );
};

export default HomePage;