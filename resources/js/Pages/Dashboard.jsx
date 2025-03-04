import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import TextDisplay from '@/Components/TextDisplay';
import Nav from '@/Components/Nav';
import Results from '@/Components/Results';
import TimeLimit from '@/Components/TimeLimit';
import Pause from '@/Components/Pause';



export default function Dashboard({ auth, activeQuestions }) {

  const [texts, setTexts] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [romajiArray, setRomajiArray] = useState([]);
  const [items, setItems] = useState(false);
  const [timeLimit, setTimeLimit] = useState();
  const [ModalLimitOpen, setModalLimitOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [Mode, setMode] = useState(false);
  const [modetimed, setModeTimed] = useState();
  const [result, setResult] = useState(false);
  const [modal, setModal] = useState(false);
  const [gameStarted, setgameStarted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [PausedTime, setPausedTime] = useState(0);
  const [TypingTime, setTypingTime] = useState(0);
  const [TypingTimer, setTypingTimer] = useState(false);


  // useEffect(() => {
  //   const handleKeyDown = (event) => {


  //     if (event.key === 'Enter') {
  //       if (romajiArray.length === 0) {
  //         if (gameStarted) {
  //           setTexts(shuffleArray(activeQuestions));
  //           setModalLimitOpen(true);
  //           setMode(true);
  //           setgameStarted(false);
  //         }
  //       }
  //     }

  //     if (romajiArray.length === 0) return;

  //     if (result) return;


  //     if (event.key === 'Escape') {
  //       setIsPaused(true);
  //       setTypingTimer(false);
  //       return;
  //     }


  //     if (isPaused) return;


  //     const currentText = romajiArray[currentTextIndex] || '';
  //     const nextChar = currentText[input.length];

  //     if (event.key === nextChar) {

  //       settyping((prev) => prev + 1);
  //       setInput((prev) => prev + event.key);

  //       if (input + event.key === currentText) {
  //         if (currentTextIndex < romajiArray.length) {
  //           setCurrentTextIndex(currentTextIndex + 1);
  //           setInput('');
  //           if (texts.length === currentTextIndex + 1) {
  //             setresult(true);
  //             setTypingTimer(false);
  //           }
  //         }
  //       }
  //     } else {

  //       if (event.key === "Shift")  return;

  //       setMistakes((prev) => prev + 1);

  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [input, romajiArray, currentTextIndex, result, gameStarted, isPaused, PausedTime]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
  
      const isInitialStart = romajiArray.length === 0;
      const currentText = romajiArray[currentTextIndex] || '';
      const nextChar = currentText[input.length];
      const isCurrentTextComplete = input + key === currentText;
  
      if (key === 'Enter' && isInitialStart) {
        handleGameOver();
        return;
      }
  
      if (result || isPaused || isInitialStart) return;
  
      if (key === 'Escape') {
        pauseGame();
        return;
      }
  
      if (key === nextChar) {
        handleCorrectInput(key, isCurrentTextComplete);
      } else if (key !== 'Shift') {
        handleMistake();
      }
    };
  
    const handleGameOver = () => {
      if (gameStarted) {
        setTexts(shuffleArray(activeQuestions));
        setModalLimitOpen(true);
        setMode(true);
        setgameStarted(false);
      }
    };
  
    const pauseGame = () => {
      setIsPaused(true);
      setTypingTimer(false);
    };
  
    const handleCorrectInput = (key, isCurrentTextComplete) => {
      setTyping((prev) => prev + 1);
      setInput((prev) => prev + key);
  
      if (isCurrentTextComplete) {
        if (currentTextIndex < romajiArray.length - 1) {
          setCurrentTextIndex(currentTextIndex + 1);
          setInput('');
        } else {
          endGame();
        }
      }
    };
  
    const handleMistake = () => {
      setMistakes((prev) => prev + 1);
    };
  
    const endGame = () => {
      setResult(true);
      setTypingTimer(false);
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, romajiArray, currentTextIndex, result, gameStarted, isPaused, PausedTime]);

  useEffect(() => {

    let timer;

    if (isPaused) {
      clearInterval(timer);
      return;
    }
    if (timeLeft > 0 && items) {

      if (!TypingTimer) {
        clearInterval(timer);
        return;
      }
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {

      if (timeLimit) {
        clearInterval(timer);
        setTypingTimer(false);
        setResult(true);
      }

    }

    return () => clearInterval(timer);

  }, [timeLeft, items, isPaused]);

  useEffect(() => {

    let typingtimer;

    if (TypingTimer) {
      typingtimer = setInterval(() => {
        setTypingTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(typingtimer);
    }

    return () => clearInterval(typingtimer);

  }, [TypingTimer, TypingTime]);


  const handleConvert = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/convert', { texts });
      setRomajiArray(response.data);
      setItems(true);
      setModeTimed(false);
      setMode(false);
      setModalLimitOpen(false);
      setTimeLeft(timeLimit);
      setTypingTimer(true);
      setModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const Restart = () => {
    setTypingTime(0);
    setResult(false);
    setInput('');
    setCurrentTextIndex(0);
    setMistakes(0);
    setTimeLeft(timeLimit);
    setTyping(0);
    setPausedTime(0);
    setTypingTimer(true);
  };

  const Home = () => {
    setTimeLimit();
    setTimeLeft(timeLimit);
    setResult(false);
    setItems(false);
    setInput('');
    setCurrentTextIndex(0);
    setMistakes(0);
    setTyping(0);
    setgameStarted(true);
    setRomajiArray([]);
    setIsPaused(false);
    setTypingTime(0);
    setModal(false);
  };


  const Resume = () => {
    setTypingTimer(true);
    setIsPaused(false);
  };

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <>
      <Head title="Dashboard" />

      <div className="App">
        <Nav timeLimit={timeLimit} modal={modal} />

        <div className="bg-lime-300  min-h-screen flex flex-col items-center justify-center w-100 h-28">
          <div>
            {items && timeLeft ? <p>残り{timeLeft}秒</p> : ""}
          </div>

          <div className="flex items-center justify-center">
            <img src="/images/chara01.png" alt="Chara 1" className="w-48 mx-16" />
            <div className="bg-white min-h-[50vh] min-w-[90vh] flex flex-col items-center justify-center">

              {items &&
                <div className="text-2xl">{texts[currentTextIndex]}</div>
              }

              {items &&
                <TextDisplay text={romajiArray[currentTextIndex] || ''} userinput={input} />
              }

              {gameStarted &&
                <div className="font-bold py-2 px-4  text-center">エンターキーを押してね！</div>
              }

              <Pause isPaused={isPaused} Home={Home} Resume={Resume} />

              <TimeLimit ModalLimitOpen={ModalLimitOpen} TimeLimit={timeLimit} setTimeLimit={setTimeLimit} setModalLimitOpen={setModalLimitOpen} Mode={Mode} setMode={setMode} modetimed={modetimed} setModeTimed={setModeTimed} userid={auth.user.id} handleConvert={handleConvert} />

              <Results Restart={Restart} Home={Home} texts={typing} mistakes={mistakes} handleConvert={handleConvert} result={result} TypingTime={TypingTime} />

            </div>
            <img src="/images/chara02.png" alt="Chara 2" className="w-40 mx-16" />
          </div>
        </div>
      </div>
    </>
  );
}
