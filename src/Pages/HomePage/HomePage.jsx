import "./HomePage.scss";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Components/Nav/Nav";
import WatchedTeams from "../../Components/WatchedTeams/WatchedTeams";
import WatchedPlayer from "../../Components/WatchedPlayers/WatchedPlayer";
// import Generations from '../../assets/videos/generations.mp4'
import ScoringLeaders from "../../Components/ScoringLeaders/ScoringLeaders";
import Button from 'react-bootstrap/Button';
import kobe from '../../assets/images/kobe.jpg';

function HomePage() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        // Skip the first 3 seconds by setting currentTime to 3
        videoRef.current.currentTime = 3;
  
        // Remove the event listener after setting the initial currentTime
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  
    if (videoRef.current) {
      // Add an event listener for the 'loadedmetadata' event
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
  
    // Clean up the event listener when the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  useEffect(() => {
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
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setFailedAuth(true);
      });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <div className="HomePage">
<div className="background">
    {/* Video Background */}
    {/* <div className="video-container">
        <video ref={videoRef} autoPlay loop muted className="video">
            <source src={Generations} type="video/mp4" />
        </video>
    </div> */}
     <div className="video-container">
        <img src={kobe} alt="background kobe image " className="video"/>
    </div>

    {/* Overlay */}
    <div className="overlay"></div>
    <p className="HomePage__header">Better Basketball Stats</p>
    <p className="HomePage__slogan">
        The greatest source of historical NBA .
    </p>

    <div className="link_container">
    <Link className="HomePage__link" to="/login">
        <Button variant="success" className="HomePage__button">
            <p className="HomePage__button__text">Login</p>
        </Button>
    </Link>
    <Link className="HomePage__link" to="/signup">
        <Button  className="HomePage__button">
            <p className="HomePage__button__text">Signup</p>
        </Button>
    </Link>

    </div>

</div>
</div>
    );
  }
  

  if (user === null) {
    return (
        <div className="HomePage">
        <div className="background">
            {/* <div className="video-container">
                <video autoPlay loop muted className="video">
                    <source src={Generations} type="video/mp4" />
                </video>
            </div> */}
             <div className="video-container">
        <img src={kobe} alt="background kobe image " className="video"/>
    </div>
        
            <div className="overlay"></div>
            <p className="HomePage__header">Better Basketball Stats</p>
            <p className="HomePage__slogan">
                Test Test Test
            </p>
        
            <div className="link_container">
            <Link className="HomePage__link" to="/login">
                <Button className="HomePage__button">
                    Login 
                </Button>
            </Link>
            <Link className="HomePage__link" to="/signup">
                <Button className="HomePage__button">
                    Signup
                </Button>
            </Link>
        
            </div>
        
        </div>
        </div>
    );
  }

  return (
    
    <main className="dashboard">
          <Nav isAuthenticated={user !== null} />
   <div>
    <span><br /></span>
   </div>

        


    <div className="watched-container">
    <ScoringLeaders />
    <WatchedPlayer userId={user.id} />
    <WatchedTeams userId={user.id} />

    

    

    </div>
   
      
      
      <Button variant="outline-danger" className="dashboard__logout" onClick={handleLogout}>
        Log out
      </Button>
    </main>
  );
}

export default HomePage;
