import React, { useState, useRef } from 'react';

const defaultSessionLength = 25;
const defaultBreakLength = 5;

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef(null);

  const reset = () => {
    setIsRunning(false);
    setSessionLength(defaultSessionLength);
    setBreakLength(defaultBreakLength);
    setTimerLabel('Session');
    setTimeLeft(defaultSessionLength * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (timerLabel === 'Session') {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  const incrementSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (timerLabel === 'Session') {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const decrementBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (timerLabel === 'Break') {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  };

  const incrementBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (timerLabel === 'Break') {
        setTimeLeft((breakLength + 1) * 60);
      }
    }
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };
//new 
  const formatTime = (timeLeft) => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  };

  const countdown = () => {
    if (isRunning) {
      if (timeLeft === 0) {
        audioRef.current.play();
        if (timerLabel === 'Session') {
          setTimerLabel('Break');
          setTimeLeft(breakLength * 60);
        } else {
          setTimerLabel('Session');
          setTimeLeft(sessionLength * 60);
        }
      } else {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }
  };

  React.useEffect(() => {
    const timer = setInterval(countdown, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return (
    <div className="main-container">
      <div className='center-text'>
        <h1>25 + 5 Clock</h1>
      </div>
      <div className="clock-container">
        <div className="box">
          <p id="break-label"className='center-text'>Break Length</p>
          <div className='box'>
            <button className='button-control' id="break-decrement" onClick={decrementBreakLength}>-</button>
            <span id="break-length">{breakLength}</span>
            <button className='button-control' id="break-increment" onClick={incrementBreakLength}>+</button>
          </div>
        </div>
        <div className="box">
          <p id="session-label"className='center-text'>Session Length</p>
          <div className='box'>
            <button className='button-control' id="session-decrement" onClick={decrementSessionLength}>-</button>
            <span id="session-length">{sessionLength}</span>
            <button className='button-control' id="session-increment" onClick={incrementSessionLength}>+</button>
          </div>
        </div>
      </div>
      <div className="time-box">
        <div className='center-text'>
          <p id="timer-label">{timerLabel}</p>
          <p id="time-left">{formatTime(timeLeft)}</p>
        </div>
        <div className='center-text'>
          <button className='button-control' id="start_stop" onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
          <button className='button-control' id="reset" onClick={reset}>Reset</button>
        </div>
      </div>
      <audio id="beep" ref={audioRef} src="https://www.soundjay.com/button/beep-01a.mp3" />
    </div>
  );
};

export default Clock;
