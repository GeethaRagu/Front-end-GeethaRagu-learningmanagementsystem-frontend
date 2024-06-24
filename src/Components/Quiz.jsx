import React, { useState } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Rome", "Berlin"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the largest ocean in the world?",
      answers: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "What is the tallest mountain in the world?",
      answers: ["Mount Everest", "K2", "Mount Kilimanjaro", "Mount Denali"],
      correctAnswer: "Mount Everest",
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  
    setCurrentQuestionIndex(currentQuestionIndex + 1);
     
  };
  console.log(questions.length);
  return (
    <div>
      <h1>Quiz</h1>
      {questions && (
        <>
          
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer)}>
                {answer}
              </li>
            ))}
          </ul>
        </>
      )}
      <p>Score: {score}</p>
    </div>
  );
};

export default Quiz;
