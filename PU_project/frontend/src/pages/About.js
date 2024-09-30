import React, { useState, useEffect } from 'react';
import './About.css';
import Navbar from '../components/Navbar';
import { useCookies } from "react-cookie";

function About() {
    const [signedIn, setSignedIn] = useState(true);
    const [token, setToken, removeToken] = useCookies("mytoken");

    useEffect(() => {
        if (!token["mytoken"]) {
          console.log("Signed in set to true");
          setSignedIn(false);
        }
    }, []);

  return (
    <React.Fragment>
        <Navbar signedIn={signedIn}/>
        <br></br>
    <div className="about-container">
      <h1>About Us</h1>
      <p>We are a team of passionate individuals who strive to create the best products for our customers.</p>
      <div className="team-members-container">
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Team Member" />
          <h2>John Doe</h2>
          <p>Founder &amp; CEO</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Team Member" />
          <h2>Jane Smith</h2>
          <p>Chief Marketing Officer</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Team Member" />
          <h2>Bob Johnson</h2>
          <p>Chief Technology Officer</p>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default About;
