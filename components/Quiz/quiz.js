 "use client";
import { useEffect, useState } from "react";
import "./quiz.css"
import axios from "axios";


export default function Quiz() {
  let [questions, setQuestions] = useState([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [selectedAnswer, setSelectedAnswer] = useState(null);
  let [score, setScore] = useState(0);
  let [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const resp = await axios.get("https://quizapi.io/api/v1/questions", {
          params: {
            apiKey: "yrYBsAuTVRTST2z1hPyavpbojdmbSzs2ATn7B3ht",
            limit: 8,
          },
        });
        setQuestions(resp.data);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);
  
  
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
  };

 const handleNext = () => {
    if (selectedAnswer !== null) { // Only move to the next question if an answer is selected
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null); // Reset selection for the new question
      } else {
        setIsFinished(true);
      }
    }
  };
const handlePrevious=()=>{
  const previousQuestion = currentQuestion - 1;
 if (previousQuestion >= 0) {
       setCurrentQuestion(previousQuestion);
       setanswerFeedback(null);

}

};
  const handleAnswerSelection = (selected, correctAnswer) => {
    if (selectedAnswer) return; // Prevent re-selection
    setSelectedAnswer(selected); // Mark the button as selected
  
    const isCorrect = correctAnswer === "true";
  
    if (isCorrect) {
      setScore(score + 1); // Update score for correct answers
    }
  };

 
  if (isFinished) {
    return (
      <div className="quiz-completed">
        <h2>Quiz Completed</h2>
        <p>Thank you for completing the quiz!</p>
        <div className="score">
          Your Score: <span>{score}</span> / {questions.length}
        </div>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

 
  

  if (questions.length === 0) {
    return <p>Questions are loading...</p>;
  }

  const question = questions[currentQuestion];
  const answers = Object.entries(question.answers).filter(([key, value]) => value !== null);
  return (
<div className="quiz-container">
  <h2>{question.question}</h2>
  <div className="answers">
    {answers.map(([key, answer], index) => {
      const isCorrect = question.correct_answers[key + "_correct"] === "true";
      const feedbackClass =
        selectedAnswer === answer
          ? isCorrect
            ? "green"
            : "red"
          : "";

      return (
        <button
          onClick={() => handleAnswerSelection(answer, question.correct_answers[key + "_correct"])}
          className={`answer-btn ${feedbackClass}`}
          key={index}
          disabled={selectedAnswer !== null} // Disable buttons after selection
        >
          {answer}
        </button>
      );
    })}
  </div>
  <button className="next-btn" onClick={handleNext}>Next</button>
  <button className="previous-btn" onClick={handlePrevious}>Previous</button>
</div>

  )
}

// "use client";
// import { useEffect, useState } from "react";
// import "./quiz.css"
// import axios from "axios";


// export default function Quiz() {
//   let [questions, setQuestions] = useState([]);
//   let [currentQuestion, setCurrentQuestion] = useState(0);
//   let [selectedAnswer, setSelectedAnswer] = useState(null);
//   let [score, setScore] = useState(0);
//   let [isFinished, setIsFinished] = useState(false);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const resp = await axios.get("https://quizapi.io/api/v1/questions", {
//           params: {
//             apiKey: "yrYBsAuTVRTST2z1hPyavpbojdmbSzs2ATn7B3ht",
//             limit: 5,
//           },
//         });
//         setQuestions(resp.data);
//       } catch (error) {
//         console.log("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleNext = () => {
//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//       setSelectedAnswer(null); // Reset selection for the new question
//     } else {
//       setIsFinished(true);
//     }
//   };
// const handlePrevious=()=>{
//   const previousQuestion = currentQuestion - 1;
//  if (previousQuestion >= 0) {
//        setCurrentQuestion(previousQuestion);
//        setanswerFeedback(null);

// }

// }
//   const handleAnswerSelection = (selected, correctAnswer) => {
//     if (selectedAnswer) return; // Prevent re-selection
//     setSelectedAnswer(selected); // Mark the button as selected
  
//     const isCorrect = correctAnswer === "true";
  
//     if (isCorrect) {
//       setScore(score + 1); // Update score for correct answers
//     }
//   };

//   if (isFinished) {
//     return (
//       <div>
//         <h2>Quiz Finished</h2>
//         <p>Your Score: {score}/{questions.length}</p>
//       </div>
//     );
//   }

//   if (questions.length === 0) {
//     return <p>Questions are loading...</p>;
//   }

//   const question = questions[currentQuestion];
//   const answers = Object.entries(question.answers).filter(([key, value]) => value !== null);

//   return (
//     <div>
//       <h2>{question.question}</h2>
//       <div className="answers">
//         {answers.map(([key, answer], index) => {
//           const isCorrect = question.correct_answers[key + "_correct"] === "true";
//           const feedbackClass =
//             selectedAnswer === answer
//               ? isCorrect
//                 ? "green"
//                 : "red"
//               : "";

//           return (
//             <button
//               onClick={() => handleAnswerSelection(answer, question.correct_answers[key + "_correct"])}
//               className={`answer-btn ${feedbackClass}`}
//               key={index}
//               disabled={selectedAnswer !== null} // Disable all buttons after a selection
//             >
//               {answer}
//             </button>
//           );
//         })}
//       </div>

//       <button className="next-btn" onClick={handleNext} disabled={selectedAnswer === null}>
//         Next
//       </button>
//       <button className="next-btn" onClick={handlePrevious} disabled={selectedAnswer === null}>
//        Previous
//       </button>
//     </div>
//   );
// }





// "use client";

// import axios from "axios";
// import "./quiz.css";
// import { useEffect, useState } from "react";

// export default function Quiz(){
// let [ questions,setQuestions]= useState([]);
// let [currentQuestion,setCurrentQuestion] = useState(0);
// let [selectedAnswer,setSelectedAnswer] = useState(null);
// let [score,setScore] = useState(0);
// let [isFinished,setIsFinished] = useState(false);
// let [answerFeedback,setanswerFeedback] = useState(null)



//   useEffect(()=>{

//    const fetchQuestions= async()=>{
//     try{
//       const resp = await axios.get("https://quizapi.io/api/v1/questions", {
//         params:{
//           apiKey:"yrYBsAuTVRTST2z1hPyavpbojdmbSzs2ATn7B3ht",
//           limit:5,
//         }
//       });
//       console.log(resp.data);
      
//       setQuestions(resp.data);
      
//     }
//     catch(error){
// console.log("error");
//     } 
//     };

// fetchQuestions();
//   },[])

// const handleNext=()=>{
//   const nextQuestion = currentQuestion + 1;
//  if (nextQuestion < questions.length) {
//        setCurrentQuestion(nextQuestion);
//        setanswerFeedback(null);
// }

// else{
//   setIsFinished(true);
// }
// }
// const handlePrevious=()=>{
//   const previousQuestion = currentQuestion - 1;
//  if (previousQuestion >= 0) {
//        setCurrentQuestion(previousQuestion);
//        setanswerFeedback(null);

// }
// }
// const handleDelete = (selected, correctAnswer) => {
//   setSelectedAnswer(selected);

//   const isCorrect = correctAnswer === "true"; 

//   if (isCorrect) {
//     setScore(score+1);
//     setanswerFeedback("correct");
//     // console.log("yesssss");  
//   } else {
//     console.log("nooo"); 
//     setanswerFeedback("incorrect");

//   }
// };
// if(isFinished){
//   return <div>
//     <h2>Quiz Finished</h2>
//     <p>your Score : {score}/{questions.length}</p>
//     </div>
// }


//   if(questions.length === 0){

//     return <p>question is loading.....</p>
//   }

//   const question = questions[currentQuestion];
//    const answers =  Object.entries(question.answers).filter(([key,value])=> value !== null );


//   return <div>
//   <h2>{question.question}</h2>
//   <div className="answers">

//   {answers.map(([key, answer], index) => {
//     const feedbackClass =
//     selectedAnswer === answer
//       ? answerFeedback === "correct"
//         ? "green"
//         : "red"
//       : ""; // Dynamic class based on feedback
//   return (
//     <button
//       onClick={() => handleDelete(answer, question.correct_answers[key + "_correct"])}
//       className={`answer-btn ${feedbackClass}`}
//       key={index}
//     >
//       {answer}
//     </button>
//   );
// })}
//       </div>

//     <button className="next-btn" onClick={handleNext}>Next</button>
//     <button className="previous-btn" onClick={handlePrevious}>Previous</button>


//     </div>
// }

