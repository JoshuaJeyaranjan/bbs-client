import './LoginPage.scss';
import Input from "../../Components/Input/Input";
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import retro from '../../assets/videos/retro.mp4'
import Button from 'react-bootstrap/Button';
import jordan from '../../assets/images/jordan.jpg'

function LoginPage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);

    const videoRef = useRef(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post("http://localhost:8080/api/login", {
            email: event.target.email.value,
            password: event.target.password.value
        })
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                navigate('/');
            })
            .catch((error) => {
                setError(error.response?.data || "An error occurred");
            });
    };

    useEffect(() => {
        const handleLoadedMetadata = () => {
          if (videoRef.current) {
            // Skip the first 5 seconds by setting currentTime to 5
            videoRef.current.currentTime = 1;
    
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

    return (
        <main className="login-page">

<div className="background">
        {/* Video Background */}
        {/* <div className="video-container">
          <video ref={videoRef} autoPlay loop muted className="video">
            <source src={retro} type="video/mp4" />
          </video>
        </div> */}

<div className="video-container">
        <img src={jordan} alt="background kobe image " className="video"/>
    </div>

        {/* Overlay */}
        <div className="overlay"></div>
        <p className="signup-page__header">Log In</p>
        <p className='signup-page__slogan'>We will never send you spam or share your email. Ever.</p>

         <form className="signup" onSubmit={handleSubmit}>

                <Input className="form-input" type="text" name="email" label="Email" />
                <Input className="form-input" type="password" name="password" label="Password" />

                <button className="signup__button">
                    <p className='signup__button__text'>Log in</p>
                </button>

                {error && <div className="login__message">{error}</div>}
            </form>
        <div className="link_container">
            <p className='signup-page__slogan login-text'>Need an account?</p>
          <Link className="HomePage__link" to="/signup">
            <Button variant='primary' className="HomePage__button">
              <p className="HomePage__button__text">Sign Up</p>
            </Button>
          </Link>
        </div>

        
      </div>
        </main>
    );
}

export default LoginPage;
