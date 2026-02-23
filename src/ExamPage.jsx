import React, { useState, useRef, useEffect } from "react";

function ExamPage() {

  const EXAM_DURATION = 120; 


  const [answer, setAnswer] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);


  const inputRef = useRef(null);

  const timerRef = useRef(null);


  useEffect(() => {

    inputRef.current.focus();

  }, []);


  useEffect(() => {

    timerRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timerRef.current);

          alert("Time is up!");

          setIsSubmitted(true);

          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timerRef.current);

  }, []);



  function handleSubmit() {

    clearInterval(timerRef.current);

    setIsSubmitted(true);

    alert("Exam Submitted!");

  }


  function formatTime(seconds) {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;

  }


  return (

    <div style={{ padding: "20px" }}>

      <h1>Online Exam</h1>

      <h2>Time Remaining: {formatTime(timeLeft)}</h2>


      <textarea

        ref={inputRef}

        placeholder="Write your answer..."

        value={answer}

        onChange={(e) => setAnswer(e.target.value)}

        disabled={isSubmitted}

        rows="5"
        cols="40"

      />

      <br /><br />


      <button

        onClick={handleSubmit}

        disabled={isSubmitted}

      >

        {isSubmitted ? "Submitted" : "Submit"}

      </button>


    </div>

  );

}

export default ExamPage;