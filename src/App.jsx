import { useState } from 'react';
import vocabData from './data/vocabulary.json';
import Flashcard from './components/Flashcard';
import TypingTest from './components/TypingTest';
import KanaSelector from './components/KanaSelector';
import { kanaSets } from './data/kana';

function App() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [mode, setMode] = useState(null);
  const [selectedKanaType, setSelectedKanaType] = useState(null);
  const [selectedKana, setSelectedKana] = useState([]);
  const [kanaSessionId, setKanaSessionId] = useState(0);
  const currentVocabList = selectedChapter ? vocabData[selectedChapter] : [];

  return (
    <div className="container">
      <header className="header"><h1>Minna no Nihongo</h1><p>Master your Japanese vocabulary</p></header>
      <main>
        {selectedKanaType && !selectedKana.length ? (
          <KanaSelector kanaSet={kanaSets[selectedKanaType]} onStart={setSelectedKana} onBack={() => setSelectedKanaType(null)} />
        ) : selectedKanaType && !mode ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <button className="btn btn-secondary" style={{ marginBottom: '1.5rem' }} onClick={() => setSelectedKana([])}>&larr; Kembali</button>
            <h2>{kanaSets[selectedKanaType].label}</h2>
            <p style={{ margin: '1rem 0 2rem', color: 'var(--text-secondary)' }}>Pilih mode latihan ({selectedKana.length} karakter)</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}><button className="btn" onClick={() => setMode('flashcard')}>Flashcards</button><button className="btn" onClick={() => setMode('typing')}>Typing Test</button></div>
          </div>
        ) : selectedKanaType ? (
          <div>
            <button className="btn btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => setMode(null)}>&larr; Kembali</button>
            {mode === 'flashcard' ? <Flashcard vocabList={selectedKana} /> : <TypingTest key={kanaSessionId} vocabList={selectedKana} isKana onRetry={() => setKanaSessionId((id) => id + 1)} onBack={() => { setMode(null); setSelectedKana([]); }} />}
          </div>
        ) : !selectedChapter ? (
          <div className="card">
            <h2>Select a Chapter</h2>
            <div className="kana-entry-grid">{Object.entries(kanaSets).map(([type, kanaSet]) => <button key={type} className="btn" onClick={() => setSelectedKanaType(type)}>{kanaSet.label}</button>)}</div>
            <div className="chapter-grid">{Object.keys(vocabData).map((chapter) => <button key={chapter} className="btn btn-secondary" onClick={() => setSelectedChapter(chapter)}>{chapter}</button>)}</div>
          </div>
        ) : !mode ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ textTransform: 'capitalize' }}>{selectedChapter}</h2><p style={{ margin: '1rem 0 2rem', color: 'var(--text-secondary)' }}>Choose your study mode ({currentVocabList.length} words)</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}><button className="btn" onClick={() => setMode('flashcard')}>Flashcards</button><button className="btn" onClick={() => setMode('typing')}>Typing Test</button></div>
            <button className="btn btn-secondary" style={{ marginTop: '2rem' }} onClick={() => setSelectedChapter(null)}>Back to Chapters</button>
          </div>
        ) : (
          <div><button className="btn btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => setMode(null)}>&larr; Back</button>{mode === 'flashcard' ? <Flashcard vocabList={currentVocabList} /> : <TypingTest vocabList={currentVocabList} />}</div>
        )}
      </main>
    </div>
  );
}
export default App;