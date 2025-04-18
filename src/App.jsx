import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import SurveyScreen from "./components/SurveyScreen"; 

import ThankYouScreen from "./components/ThankYouScreen"; 
import { v4 as uuidv4 } from "uuid";


const App = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const startSurvey = () => {
    const id = uuidv4();
    setSessionId(id);
    localStorage.setItem(id, JSON.stringify({ status: "IN_PROGRESS", answers: {} }));
  };


  const completeSurvey = () => {
    setIsCompleted(true);
    setTimeout(() => {
      setIsCompleted(false);
      setSessionId(null);
    }, 5000);
  };

  if (isCompleted) return <ThankYouScreen />;
  if (!sessionId) return <WelcomeScreen onStart={startSurvey} />;
  return <SurveyScreen sessionId={sessionId} onComplete={completeSurvey} />;
};

export default App;
