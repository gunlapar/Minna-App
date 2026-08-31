import { useMemo, useState } from 'react';
import './KanaSelector.css';

export default function KanaSelector({ kanaSet, onStart, onBack }) {
  const allCharacters = useMemo(() => kanaSet.groups.flatMap((group) => group.characters), [kanaSet]);
  const [selectedIds, setSelectedIds] = useState(() => new Set(allCharacters.map((kana) => kana.id)));

  const toggleKana = (id) => setSelectedIds((previous) => {
    const next = new Set(previous);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    return next;
  });
  const updateGroup = (characters, shouldSelect) => setSelectedIds((previous) => {
    const next = new Set(previous);
    characters.forEach(({ id }) => shouldSelect ? next.add(id) : next.delete(id));
    return next;
  });
  const selectAll = () => setSelectedIds(new Set(allCharacters.map((kana) => kana.id)));
  const clearAll = () => setSelectedIds(new Set());
  const selectedKana = allCharacters.filter((kana) => selectedIds.has(kana.id));

  return (
    <section className="card kana-selector">
      <button className="btn btn-secondary back-button" onClick={onBack}>&larr; Kembali</button>
      <h2>{kanaSet.label}</h2>
      <p className="kana-selector-description">Pilih karakter yang ingin dilatih ({selectedKana.length} dipilih).</p>
      {kanaSet.groups.map((group) => (
        <div className="kana-group" key={group.label}>
          <div className="kana-group-header">
            <h3>{group.label}</h3>
            <div className="kana-group-actions">
              <button type="button" className="kana-group-button" onClick={() => updateGroup(group.characters, true)}>Pilih semua</button>
              <button type="button" className="kana-group-button" onClick={() => updateGroup(group.characters, false)}>Hapus semua</button>
            </div>
          </div>
          <div className="kana-grid">
            {group.characters.map((kana) => (
              <label className={`kana-option ${selectedIds.has(kana.id) ? 'selected' : ''}`} key={kana.id}>
                <input type="checkbox" checked={selectedIds.has(kana.id)} onChange={() => toggleKana(kana.id)} />
                <span className="kana-symbol">{kana.japanese}</span>
                <span className="kana-reading">{kana.meaning}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="kana-selector-actions">
        <button className="btn btn-secondary" onClick={selectAll}>Pilih semua</button>
        <button className="btn btn-secondary" onClick={clearAll}>Hapus pilihan</button>
        <button className="btn" onClick={() => onStart(selectedKana)} disabled={!selectedKana.length}>Lanjut ({selectedKana.length})</button>
      </div>
    </section>
  );
}