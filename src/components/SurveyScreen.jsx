import StarRating from "./StarRating";
import React, { useState } from "react";
import questions from "../data/questions"; 

const SurveyScreen = ({ sessionId, onComplete }) => {
  const [index, setIndex] = useState(0); // Track current question index

  // Load previous answers from localStorage
  const [answers, setAnswers] = useState(() => {
    const session = JSON.parse(localStorage.getItem(sessionId));
    return session?.answers || {};
  });

  const currentQuestion = questions[index]

  // Save answer when user selects/enters it
  const handleAnswer = (value) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(updatedAnswers);

    // Save to localStorage
    localStorage.setItem(sessionId, JSON.stringify({
      status: "IN_PROGRESS",
      answers: updatedAnswers
    }));
  };

  // Move to next question
  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  // Move to previous question
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  // Skip question by saving null
  const handleSkip = () => {
    handleAnswer(null);
    handleNext();
  };

  // Submit survey
  const handleSubmit = () => {
    if (window.confirm("Do you want to submit the survey?")) {
      localStorage.setItem(sessionId, JSON.stringify({
        status: "COMPLETED",
        answers
      }));
      onComplete(); // Go to thank you screen
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <p style={{ fontSize: "30px", color: "black", }}>Questions{index + 1} / {questions.length}</p>
      <h3>{currentQuestion.text}</h3>

      {/* Rating type question */}
      {currentQuestion.type === "rating" && (
  <StarRating
    value={answers[currentQuestion.id] || 0}
    max={currentQuestion.scale}
    onChange={(val) => handleAnswer(val)}
  />
)}

      {/* Text type question */}
      {currentQuestion.type === "text" && (
        <textarea
          rows="4"
          cols="40"
          value={answers[currentQuestion.id] || ""}
          onChange={(e) => handleAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={index === 0}>Previous</button>
        <button onClick={handleNext} disabled={index === questions.length - 1}>Next</button>
        <button onClick={handleSkip}>Skip</button>
        {index === questions.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default SurveyScreen;
