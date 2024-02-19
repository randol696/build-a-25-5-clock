
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Session');

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Switch session type between 'Session' and 'Break'
            setSessionType(prevType => (prevType === 'Session' ? 'Break' : 'Session'));
            // Reset time based on session type
            setMinutes(prevMinutes => (prevMinutes === 0 ? (sessionType === 'Session' ? 24 : 4) : prevMinutes - 1));
            setSeconds(59);
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds, sessionType]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    setSessionType('Session');
  };
  return (
   <>
   <div id="break-label">Break Length</div>
   <div id="session-label">Session Length</div>
   <button id="break-decrement"></button>
   <button id="break-decrement"></button>
   <button id="session-increment"></button>
   <button id="session-increment"></button>

   <div>
      <h1>25 + 5 Clock</h1>
      <div>
        <div>
          <p>{sessionType}</p>
          <p>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>
      </div>
      <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
   </>
  );
}

export default App;



