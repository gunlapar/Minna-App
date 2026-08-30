import { useState } from 'react';
import vocabData from './data/vocabulary.json';
import Flashcard from './components/Flashcard';
import TypingTest from './components/TypingTest';

function App() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [mode, setMode] = useState(null); // 'flashcard' or 'typing'

  const currentVocabList = selectedChapter ? vocabData[selectedChapter] : [];

  return (
    <div className="container">
      <header className="header">
        <h1>Minna no Nihongo</h1>
        <p>Master your Japanese vocabulary</p>
      </header>

      <main>
        {!selectedChapter ? (
          <div className="card">
            <h2>Select a Chapter</h2>
            <div className="chapter-grid">
              {Object.keys(vocabData).map((chapter) => (
                <button 
                  key={chapter} 
                  className="btn btn-secondary"
                  onClick={() => setSelectedChapter(chapter)}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        ) : !mode ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ textTransform: 'capitalize' }}>{selectedChapter}</h2>
            <p style={{ margin: '1rem 0 2rem', color: 'var(--text-secondary)' }}>
              Choose your study mode ({currentVocabList.length} words)
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn" onClick={() => setMode('flashcard')}>
                Flashcards
              </button>
              <button className="btn" onClick={() => setMode('typing')}>
                Typing Test
              </button>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ marginTop: '2rem' }}
              onClick={() => setSelectedChapter(null)}
            >
              Back to Chapters
            </button>
          </div>
        ) : (
          <div>
            <button 
              className="btn btn-secondary" 
              style={{ marginBottom: '1rem' }}
              onClick={() => setMode(null)}
            >
              &larr; Back
            </button>
            {mode === 'flashcard' ? (
              <Flashcard vocabList={currentVocabList} />
            ) : (
              <TypingTest vocabList={currentVocabList} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
