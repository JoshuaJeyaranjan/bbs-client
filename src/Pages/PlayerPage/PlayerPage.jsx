import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCareerTotal from '../../Components/PlayerCareerTotal/PlayerCareerTotal';
import './PlayerPage.scss'

const PlayerPage = () => {
    const [playerData, setPlayerData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/players/${id}`);
                setPlayerData(response.data);
            } catch (error) {
                console.error('Error fetching player data', error);
            }
        };
        fetchPlayerData();
    }, [id]);

    // Conditionally render content when playerData is not null
    return (
        <div>
            {playerData && (
                <>
                    <h1>{playerData.first_name} {playerData.last_name}</h1>
                    <p>Position:{playerData.position}</p>
                    <div className='height_container'>
                    <p>Height:{playerData.height_feet}ft.</p>
                    <p>{playerData.height_inches}</p>
                    </div>
                    
                    <p>Weight:{playerData.weight_pounds}lbs.</p>
                    
                    <PlayerCareerTotal />
                </>
            )}
        </div>
    );
};

export default PlayerPage;
