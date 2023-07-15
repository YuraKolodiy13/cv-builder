import React from 'react';
import './Homepage.scss';
import {Button} from "@mui/material";

const Homepage = () => {
  return (
    <main className='Homepage'>
      <img src="https://storage.cloud.google.com/tech_company_logos/snowflake-logo.png" referrerPolicy="no-referrer" alt=""/>
      <img src="https://storage.cloud.google.com/tech_company_logos/snowflake-logo.png" alt=""/>
      <img src="https://storage.cloud.google.com/tech_company_logos/snowflake-logo.png" alt=""></img>
      <img src="https://storage.cloud.google.com/tech_company_logos/snowflake-logo.png" referrerPolicy="no-referrer" alt=""></img>
      <section className="hero">
        <div className="hero__leftGroup">
          <h1 className="hero__headline">Build your CV</h1>
          <p className="hero__tagline">Now it's extremely easy to create a CV and apply for a job</p>
          <Button variant='contained'>Let's try</Button>
        </div>
        <div className="hero__rightGroup">
          <p>some content will be here</p>
        </div>
      </section>
      <section id="stepsSection" className="section">
        <header className="section__header">
          <h2 className="section__title">How it works</h2>
        </header>
        <div className="section__steps">
          <div className="card">
            <div className="card__iconContainer">
              <img className="card__icon" src="assets/icons/edit.png" alt="pencil with paper"/>
                <div className="card__iconShape"/>
                <div className="card__iconAttribution">Icons made by Freepik from www.flaticon.com</div>
            </div>
            <h3 className="card__title">Create & Edit</h3>
            <p className="card__txt">Add and customize all the sections you want with our easy to fill out forms!</p>
          </div>
          <div className="card">
            <div className="card__iconContainer">
              <img className="card__icon" src="assets/icons/template.png" alt="template"/>
                <div className="card__iconShape3"/>
                <div className="card__iconAttribution">Icons made by Freepik from www.flaticon.com</div>
            </div>
            <h3 className="card__title">Select a Template</h3>
            <p className="card__txt">Get different template options and select the one that best suits you!</p>
          </div>
          <div className="card">
            <div className="card__iconContainer">
              <img className="card__icon" src="assets/icons/rocket.png" alt="rocket"/>
                <div className="card__iconShape2"/>
                <div className="card__iconAttribution">Icons made by Freepik from www.flaticon.com</div>
            </div>
            <h3 className="card__title">Start Sharing</h3>
            <p className="card__txt">Choose how to share your docs. Get personalized links or just download them!</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;