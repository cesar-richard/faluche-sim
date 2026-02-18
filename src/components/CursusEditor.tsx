import { FILIERES } from '../data/filieres';
import type { Circulaire, CursusSegment } from '../data/types';

interface CursusEditorProps {
  circulaire: Circulaire;
  onChange: (circulaire: Circulaire) => void;
}

const veloursGroup = FILIERES.filter((f) => f.matiere === 'velours');
const satinGroup = FILIERES.filter((f) => f.matiere === 'satin');

function newSegment(): CursusSegment {
  const f = FILIERES[0];
  return { filiere: f.nom, couleur: f.couleur, matiere: f.matiere, annees: 1 };
}

export function CursusEditor({ circulaire, onChange }: CursusEditorProps) {
  const { segments, baptemeIndex, surnom, anneeBac } = circulaire;

  function update(patch: Partial<Circulaire>) {
    onChange({ ...circulaire, ...patch });
  }

  function updateSegment(index: number, patch: Partial<CursusSegment>) {
    const next = segments.map((s, i) => (i === index ? { ...s, ...patch } : s));
    update({ segments: next });
  }

  function handleFiliereChange(index: number, nom: string) {
    const f = FILIERES.find((fl) => fl.nom === nom);
    if (f) updateSegment(index, { filiere: f.nom, couleur: f.couleur, matiere: f.matiere });
  }

  function addSegment() {
    update({ segments: [...segments, newSegment()] });
  }

  function removeSegment(index: number) {
    const next = segments.filter((_, i) => i !== index);
    let nextBapteme = baptemeIndex;
    if (index === baptemeIndex) nextBapteme = Math.max(0, next.length - 1);
    else if (index < baptemeIndex) nextBapteme = baptemeIndex - 1;
    update({ segments: next, baptemeIndex: nextBapteme });
  }

  function moveSegment(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= segments.length) return;
    const next = [...segments];
    [next[index], next[target]] = [next[target], next[index]];
    let nextBapteme = baptemeIndex;
    if (baptemeIndex === index) nextBapteme = target;
    else if (baptemeIndex === target) nextBapteme = index;
    update({ segments: next, baptemeIndex: nextBapteme });
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-gray-300">Circulaire — Cursus</h3>

      {/* Surnom */}
      <div className="flex flex-col gap-1">
        <label htmlFor="surnom" className="text-xs text-gray-400">Surnom</label>
        <input
          id="surnom"
          type="text"
          value={surnom}
          onChange={(e) => update({ surnom: e.target.value })}
          placeholder="Ton surnom de baptême"
          className="rounded border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-white"
        />
      </div>

      {/* Année du bac */}
      <div className="flex flex-col gap-1">
        <label htmlFor="anneeBac" className="text-xs text-gray-400">Année du bac</label>
        <input
          id="anneeBac"
          type="number"
          value={anneeBac}
          onChange={(e) => update({ anneeBac: parseInt(e.target.value) || 0 })}
          min={1990}
          max={2030}
          className="rounded border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-white w-24"
        />
      </div>

      {/* Segments */}
      <div className="flex flex-col gap-3">
        <label className="text-xs text-gray-400">Parcours (chronologique)</label>
        {segments.map((seg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 rounded-lg border p-3 ${
              i === baptemeIndex ? 'border-yellow-500 bg-gray-800' : 'border-gray-700 bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-gray-500"
                style={{ backgroundColor: seg.couleur }}
              />
              <select
                value={seg.filiere}
                onChange={(e) => handleFiliereChange(i, e.target.value)}
                className="flex-1 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-white"
              >
                <optgroup label="Santé (velours)">
                  {veloursGroup.map((f) => (
                    <option key={f.nom} value={f.nom}>{f.nom}</option>
                  ))}
                </optgroup>
                <optgroup label="Autres (satin)">
                  {satinGroup.map((f) => (
                    <option key={f.nom} value={f.nom}>{f.nom}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-xs text-gray-400">
                Années :
                <input
                  type="number"
                  value={seg.annees}
                  onChange={(e) => updateSegment(i, { annees: Math.max(1, parseInt(e.target.value) || 1) })}
                  min={1}
                  max={10}
                  className="w-14 rounded border border-gray-600 bg-gray-700 px-2 py-0.5 text-center text-xs text-white"
                />
              </label>

              <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
                <input
                  type="radio"
                  name="bapteme"
                  checked={i === baptemeIndex}
                  onChange={() => update({ baptemeIndex: i })}
                  className="accent-yellow-500"
                />
                Baptême
              </label>

              <div className="ml-auto flex gap-1">
                <button
                  onClick={() => moveSegment(i, -1)}
                  disabled={i === 0}
                  className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-700 disabled:opacity-30"
                  title="Monter"
                >▲</button>
                <button
                  onClick={() => moveSegment(i, 1)}
                  disabled={i === segments.length - 1}
                  className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-700 disabled:opacity-30"
                  title="Descendre"
                >▼</button>
                <button
                  onClick={() => removeSegment(i)}
                  disabled={segments.length <= 1}
                  className="rounded px-1.5 py-0.5 text-xs text-red-400 hover:bg-gray-700 disabled:opacity-30"
                  title="Supprimer"
                >✕</button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addSegment}
          className="rounded-lg border border-dashed border-gray-600 py-2 text-xs text-gray-400 hover:border-gray-400 hover:text-gray-300"
        >
          + Ajouter un segment
        </button>
      </div>
    </div>
  );
}
