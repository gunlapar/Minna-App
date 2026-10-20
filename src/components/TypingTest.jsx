import { useEffect, useRef, useState } from 'react';
import './TypingTest.css';

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export default function TypingTest({ vocabList, isKana = false, isKanji = false, onRetry, onBack }) {
  const [questions] = useState(() => (isKana || isKanji) ? shuffle(vocabList) : vocabList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [mistakes, setMistakes] = useState(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef(null);
  const currentWord = questions[currentIndex];

  const feedbackTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [currentIndex]);
  const advance = () => { setInputValue(''); if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1); else setIsComplete(true); };
  const handleSubmit = (event) => {
    event.preventDefault();
    const answer = inputValue.trim().toLowerCase();
    if (!answer) return;
    const cleanAnswer = answer.replace(/\s*\(.*?\)\s*/g, '').trim();
    const acceptedAnswers = (currentWord.answers || [currentWord.japanese]).map((value) => value.trim().toLowerCase());
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);

    if (acceptedAnswers.includes(answer) || (cleanAnswer && acceptedAnswers.includes(cleanAnswer))) {
      setFeedback('correct');
      feedbackTimerRef.current = setTimeout(() => { setFeedback(null); advance(); }, 700);
    } else {
      setMistakes((previous) => new Set(previous).add(currentIndex));
      setFeedback('incorrect');
      feedbackTimerRef.current = setTimeout(() => setFeedback(null), 2500);
    }
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (feedback === 'incorrect') {
      setFeedback(null);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    }
  };
  const handleSkip = () => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setMistakes((previous) => new Set(previous).add(currentIndex));
    setFeedback(null);
    advance();
  };
  if (!currentWord && !isComplete) return <div>No words available.</div>;
  if (isComplete) {
    const correct = questions.length - mistakes.size;
    const accuracy = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    return <div className="typing-test-container"><div className="typing-card results-card"><p className="progress">Sesi selesai</p><h2 className="meaning-prompt">Hasil latihan</h2><div className="result-stats"><strong>{correct}</strong> benar · <strong>{mistakes.size}</strong> salah</div><p className="result-accuracy">Akurasi {accuracy}%</p><div className="result-actions"><button className="btn" onClick={onRetry || (() => window.location.reload())}>Ulangi</button>{onBack && <button className="btn btn-secondary" onClick={onBack}>Kembali</button>}</div></div></div>;
  }
  const isCharacterPrompt = isKana || isKanji;
  const placeholderText = isKanji ? 'Ketik salah satu: arti atau romaji...' : isKana ? 'Ketik romaji...' : 'Type the Japanese reading...';

  return (
    <div className="typing-test-container">
      <div className="typing-card">
        <div className="progress">{currentIndex + 1} / {questions.length}</div>
        <h2 className={`meaning-prompt ${isCharacterPrompt ? 'kana-prompt' : ''}`}>{isCharacterPrompt ? currentWord.japanese : currentWord.meaning}</h2>
        <form onSubmit={handleSubmit} className="typing-form">
          <input ref={inputRef} type="text" className={`typing-input ${feedback || ''}`} value={inputValue} onChange={handleInputChange} placeholder={placeholderText} disabled={feedback === 'correct'} autoComplete="off" />
          <button type="submit" className="btn" disabled={feedback === 'correct' || !inputValue.trim()}>Submit</button>
        </form>
        {feedback === 'incorrect' && (
          <div className="hint-container">
            <p className="hint-label">{isKanji ? 'Jawaban benar (cukup ketik salah satu):' : 'Correct answer:'}</p>
            <p className="hint-answer">{isCharacterPrompt ? currentWord.meaning : currentWord.japanese}</p>
            {isKanji && currentWord.romaji && (
              <p className="hint-sub">atau romaji: {currentWord.romaji}</p>
            )}
          </div>
        )}
      </div>
      <button className="btn btn-secondary" onClick={handleSkip}>Skip Word</button>
    </div>
  );
}