import { useState, useRef, useEffect } from 'react';
import './TypingTest.css';

export default function TypingTest({ vocabList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | null
  const inputRef = useRef(null);

  const currentWord = vocabList[currentIndex];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (inputValue.trim().toLowerCase() === currentWord.japanese.toLowerCase()) {
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        setInputValue('');
        if (currentIndex < vocabList.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          alert("Great job! You've finished this chapter.");
        }
      }, 1000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const handleSkip = () => {
    setFeedback(null);
    setInputValue('');
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("You've finished this chapter.");
    }
  };

  if (!currentWord) return <div>No words available.</div>;

  return (
    <div className="typing-test-container">
      <div className="typing-card">
        <div className="progress">
          {currentIndex + 1} / {vocabList.length}
        </div>
        <h2 className="meaning-prompt">{currentWord.meaning}</h2>
        
        <form onSubmit={handleSubmit} className="typing-form">
          <input
            ref={inputRef}
            type="text"
            className={`typing-input ${feedback || ''}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type the Japanese reading..."
            disabled={feedback === 'correct'}
            autoComplete="off"
          />
          <button type="submit" className="btn" disabled={feedback === 'correct' || !inputValue.trim()}>
            Submit
          </button>
        </form>
        
        {feedback === 'incorrect' && (
          <div className="hint-container">
            <p className="hint-label">Correct answer:</p>
            <p className="hint-answer">{currentWord.japanese}</p>
          </div>
        )}
      </div>
      
      <button className="btn btn-secondary" onClick={handleSkip}>
        Skip Word
      </button>
    </div>
  );
}
