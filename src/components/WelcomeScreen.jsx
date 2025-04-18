
import React from "react";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to the Customer Survey</h1>
      <p style={{ color: "black" , font: "100px"}}>We appreciate your feedback</p>
      <button onClick={onStart}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
