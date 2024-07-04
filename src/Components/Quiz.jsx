import { Button } from "flowbite-react";
import React, { useState, useRef } from "react";

const Quiz = () => {
  const items = [
    {
      question: "Find the missing terms in multiple of 3: 3, 6, 9, __, 15",
      answers: ["10", "11", "12", "13"],
      correctAnswer: "12",
    },
    {
      question: "The largest 4 digit number is:",
      answers: [
        "9999",
        "1000",
        "9990",
        "9991",
      ],
      correctAnswer: "9999",
    },
    {
      question: "Animal that only eat plants",
      answers: ["Carnivore", "Omnivore", "Servivore", "Herbivore"],
      correctAnswer: "Herbivore",
    },
    {
      question:"Which of the following can make their own food.",
      answers: ["Plants", "Mammals", "Repltiles", "Insects"],
      correctAnswer: "Plants",
    },
    {
      question:"Which of the following animal is a carnivore.",
      answers: ["Goat", "Cow", "Tiger", "Worm"],
      correctAnswer: "Tiger",
    }
  ];
  let [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(items[index]);
  const [optionselected, setOptionSelected] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  // console.log("items", items);
  //console.log(questions);
  const checkAnswer = (e, answer) => {
    if (optionselected === false) {
      if (questions.correctAnswer === answer) {
        e.target.classList.add("correctoption");
        setOptionSelected(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrongoption");
        setOptionSelected(true);
        //console.log(questions.correctAnswer);
        //console.log(questions.answers.indexOf(questions.correctAnswer));
        option_array[
          questions.answers.indexOf(questions.correctAnswer)
        ].current.classList.add("correctoption");
      }
    }
  };
  const next = () => {
    if (optionselected === true) {
      if (index === items.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestions(items[index]);
      setOptionSelected(false);
      option_array.map((opt) => {
        opt.current.classList.remove("wrongoption");
        opt.current.classList.remove("correctoption");
        return null;
      });
    }
  };
  return (
    <div className="min-h-screen mb-5">
      <div className="pt-5 px-5 text-white">
        <h1 className="font-bold text-3xl pb-5 pt-5">Quiz</h1>
        <hr />
        {!result ? (
          <>
            <h2 className="font-semibold text-2xl pb-5 pt-5">
              {index + 1} . {questions.question}
            </h2>
            <ul className=" text-lg">
              <li
                ref={option1}
                onClick={(e) => {
                  checkAnswer(e, questions.answers[0]);
                }}
                className="flex align-center h-8 pl-7 border border-white mb-8 cursor-pointer "
              >
                {questions.answers[0]}
              </li>
              <li
                ref={option2}
                onClick={(e) => {
                  checkAnswer(e, questions.answers[1]);
                }}
                className="flex align-center h-8 pl-7 border border-white mb-8 cursor-pointer"
              >
                {questions.answers[1]}
              </li>
              <li
                ref={option3}
                onClick={(e) => {
                  checkAnswer(e, questions.answers[2]);
                }}
                className="flex align-center h-8 pl-7 border border-white mb-8 cursor-pointer"
              >
                {questions.answers[2]}
              </li>
              <li
                ref={option4}
                onClick={(e) => {
                  checkAnswer(e, questions.answers[3]);
                }}
                className="flex align-center h-8 pl-7 border border-white mb-8 cursor-pointer"
              >
                {questions.answers[3]}
              </li>
            </ul>
            <Button
              className="mx-auto w-20 h-10 cursor-pointer border border-blue-700"
              onClick={next}
            >
              Next
            </Button>
            <div className="mx-auto font-semibold text-2xl pb-5 pt-5">
              {index + 1} out of {items.length} questions
            </div>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-2xl pb-5 pt-5">
              You scored {score} out of {items.length}
            </h2>

            {score === items.length && (
              <>
                <h2 className="font-semibold text-lg pb-5 pt-5">Congrats! Well done</h2>
              </>
            )}
            {score === 0 && (
              <>
                <h2>Better luck next time!</h2>
              </>
            )}
            {score !== 0 && score < items.length / 2 && (
              <>
                <h2>Good!</h2>
              </>
            )}
            
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
