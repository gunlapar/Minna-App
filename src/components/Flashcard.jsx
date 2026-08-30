import { useState } from 'react';
import './Flashcard.css';

export default function Flashcard({ vocabList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentWord = vocabList[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < vocabList.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150); // slight delay for flip
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
    }
  };

  if (!currentWord) return <div>No words available.</div>;

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flashcard-front">
          <h2 className="japanese-text">{currentWord.japanese}</h2>
          <p className="click-hint">Click to flip</p>
        </div>
        <div className="flashcard-back">
          <h2 className="meaning-text">{currentWord.meaning}</h2>
        </div>
      </div>
      
      <div className="flashcard-controls">
        <button className="btn btn-secondary" onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>
        <span className="progress">
          {currentIndex + 1} / {vocabList.length}
        </span>
        <button className="btn btn-secondary" onClick={handleNext} disabled={currentIndex === vocabList.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
