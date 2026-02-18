import { FILIERES, type Filiere } from '../data/filieres';

interface DisciplineSelectorProps {
  selected: string;
  onChange: (filiere: Filiere) => void;
}

export function DisciplineSelector({ selected, onChange }: DisciplineSelectorProps) {
  const veloursGroup = FILIERES.filter((f) => f.matiere === 'velours');
  const satinGroup = FILIERES.filter((f) => f.matiere === 'satin');

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const filiere = FILIERES.find((f) => f.nom === e.target.value);
    if (filiere) onChange(filiere);
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="discipline" className="text-sm font-semibold text-gray-300">
        Discipline principale
      </label>
      <select
        id="discipline"
        value={selected}
        onChange={handleChange}
        className="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white"
      >
        <option value="">-- Choisir une discipline --</option>
        <optgroup label="Santé (velours)">
          {veloursGroup.map((f) => (
            <option key={f.nom} value={f.nom}>
              {f.nom} — {f.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Autres (satin)">
          {satinGroup.map((f) => (
            <option key={f.nom} value={f.nom}>
              {f.nom} — {f.label}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
