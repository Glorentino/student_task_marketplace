import React from "react";
import techchomp from './images/tech-comp.jpg';

const Home = () => {
    return (
        <div>
            <title>Tech | Home </title>
            <h1>The Tech Marketplace</h1>
            <img className="home-photo" src={techchomp}></img>
            <h3 className="home-motto">
        "Where Innovation is our primary concern"
      </h3>
        <footer className="foot">
            <div className="footer-txt" >Tech Company</div>
        </footer>
        </div>
        
    );
};
export default Home;