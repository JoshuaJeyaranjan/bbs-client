import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../Components/Input/Input';
// import hero from '../../assets/videos/hero.mp4';
import './SignUpPage.scss';
import Button from 'react-bootstrap/Button';
import magic from '../../assets/images/magic.jpg'



function SignUpPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const videoRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios
      .post("http://localhost:8080/api/register", {
        email: event.target.email.value,
        password: event.target.password.value,
        first_name: event.target.first_name.value,
      })
      .then(() => {
        setSuccess(true);
        setError("");
        event.target.reset();
  
        // Delay the navigation for 2 seconds (adjust as needed)
        setTimeout(() => {
          // Redirect to the homepage after the delay
          navigate('/login'); // Change the path to match your homepage route
        }, 2000);
      })
      .catch((error) => {
        setSuccess(false);
        setError(error.response?.data || "An error occurred");
      });
  };
  
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        // Skip the first 5 seconds by setting currentTime to 5
        videoRef.current.currentTime = 7;

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
    <main className="signup-page">
      <div className="background">
        {/* Video Background */}
        {/* <div className="video-container">
          <video ref={videoRef} autoPlay loop muted className="video">
            <source src={hero} type="video/mp4" />
          </video>
        </div> */}

<div className="video-container">
        <img src={magic} alt="background kobe image " className="video"/>
    </div>

        {/* Overlay */}
        <div className="overlay"></div>
        <p className="signup-page__header">Sign Up</p>
        <p className='signup-page__slogan'>We will never send you spam or share your email. Ever.</p>

        <form className="signup" onSubmit={handleSubmit}>
          <Input className="form-input" type="text" name="first_name" label="First name" />
          <Input className="form-input" type="text" name="email" label="Email" />
          <Input className="form-input" type="password" name="password" label="Password" />

          <button className="signup__button"> <p className='signup__button__text'>Sign Up</p> </button>

          {success && <div className="signup__message">Signed up!</div>}
          {error && <div className="signup__message">{error}</div>}
        </form>
        <div className="link_container">
            <p className='signup-page__slogan login-text'>Already have an account?</p>
          <Link className="HomePage__link" to="/login">
              <Button className="HomePage__link HomePage__button__text HomePage__button" variant="success">Login</Button>{' '}
          </Link>
          
        </div>

        
      </div>
    </main>
  );
}

export default SignUpPage;
