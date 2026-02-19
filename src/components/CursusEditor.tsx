import { FILIERES } from '../data/filieres';
import { PAYS } from '../data/pays';
import type { Circulaire, CursusSegment, AnneeAnnotation, TypeBac } from '../data/types';

interface CursusEditorProps {
  circulaire: Circulaire;
  onChange: (circulaire: Circulaire) => void;
}

const veloursGroup = FILIERES.filter((f) => f.matiere === 'velours');
const satinGroup = FILIERES.filter((f) => f.matiere === 'satin');

const TYPE_BAC_OPTIONS: { value: TypeBac; label: string }[] = [
  { value: 'general', label: 'Général (Ɣ)' },
  { value: 'S', label: 'Bac S (ε)' },
  { value: 'international', label: 'International (Ɣi)' },
  { value: 'techno', label: 'Technologique (T)' },
  { value: 'pro', label: 'Professionnel (P)' },
  { value: 'capacitaire', label: 'Capacitaire (C)' },
  { value: 'daeu', label: 'DAEU' },
];

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

  function updateAnnotation(segIndex: number, yearIndex: number, patch: Partial<AnneeAnnotation>) {
    const seg = segments[segIndex];
    const annotations = { ...seg.annotations };
    const current = annotations[yearIndex] ?? {};
    const updated = { ...current, ...patch };
    // Remove falsy keys to keep clean
    for (const key of Object.keys(updated) as (keyof AnneeAnnotation)[]) {
      if (!updated[key]) delete updated[key];
    }
    if (Object.keys(updated).length === 0) {
      delete annotations[yearIndex];
    } else {
      annotations[yearIndex] = updated;
    }
    updateSegment(segIndex, { annotations: Object.keys(annotations).length > 0 ? annotations : undefined });
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
      <h3 className="font-display text-sm font-semibold text-accent">Circulaire — Cursus</h3>

      {/* Surnom + Initiales */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="surnom" className="text-xs text-gray-400">Surnom</label>
          <input
            id="surnom"
            type="text"
            value={surnom}
            onChange={(e) => update({ surnom: e.target.value })}
            placeholder="Ton surnom de baptême"
            className="rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-accent focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="initiales" className="text-xs text-gray-400">Initiales</label>
          <input
            id="initiales"
            type="text"
            value={circulaire.initiales}
            onChange={(e) => update({ initiales: e.target.value })}
            placeholder="C.D."
            className="rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-accent focus:outline-none w-20"
          />
        </div>
      </div>

      {/* Année du bac + type */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="anneeBac" className="text-xs text-gray-400">Année bac</label>
          <input
            id="anneeBac"
            type="number"
            value={anneeBac}
            onChange={(e) => update({ anneeBac: parseInt(e.target.value) || 0 })}
            min={1990}
            max={2030}
            className="rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-accent focus:outline-none w-24"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="typeBac" className="text-xs text-gray-400">Type de bac</label>
          <select
            id="typeBac"
            value={circulaire.typeBac ?? 'general'}
            onChange={(e) => update({ typeBac: e.target.value as TypeBac })}
            className="rounded border border-gray-700 bg-gray-900 px-2 py-1.5 text-xs text-white"
          >
            {TYPE_BAC_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Moivre */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Première année d'études</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
            <input
              type="radio"
              name="moivre"
              checked={(circulaire.moivre ?? 'public') === 'public'}
              onChange={() => update({ moivre: 'public' })}
              className="accent-blue-500"
            />
            <span className="inline-block h-3 w-3 rounded-sm border border-gray-500" style={{ backgroundColor: '#4169E1' }} />
            Public (État)
          </label>
          <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
            <input
              type="radio"
              name="moivre"
              checked={circulaire.moivre === 'prive'}
              onChange={() => update({ moivre: 'prive' })}
              className="accent-blue-500"
            />
            <span className="inline-block h-3 w-3 rounded-sm border border-gray-500" style={{ backgroundColor: '#FFFFFF' }} />
            Privé
          </label>
        </div>
      </div>

      {/* Segments */}
      <div className="flex flex-col gap-3">
        <label className="text-xs text-gray-400">Parcours (chronologique)</label>
        {segments.map((seg, i) => (
          <SegmentEditor
            key={i}
            seg={seg}
            index={i}
            isBapteme={i === baptemeIndex}
            isFirst={i === 0}
            isLast={i === segments.length - 1}
            segmentCount={segments.length}
            onFiliereChange={(nom) => handleFiliereChange(i, nom)}
            onAnneesChange={(v) => updateSegment(i, { annees: v })}
            onBaptemeSelect={() => update({ baptemeIndex: i })}
            onMove={(dir) => moveSegment(i, dir)}
            onRemove={() => removeSegment(i)}
            onSegmentUpdate={(patch) => updateSegment(i, patch)}
            onAnnotationUpdate={(yi, patch) => updateAnnotation(i, yi, patch)}
          />
        ))}

        <button
          onClick={addSegment}
          className="rounded-lg border border-dashed border-accent-dim py-2 text-xs text-gray-400 hover:border-accent hover:text-accent transition-colors"
        >
          + Ajouter un segment
        </button>
      </div>

      {/* Quille / Abeille */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400">Insignes spéciaux</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={!!circulaire.quille}
              onChange={(e) => update({ quille: e.target.checked || undefined })}
              className="accent-yellow-500"
            />
            Quille (service militaire/civique)
          </label>
          <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={!!circulaire.abeille}
              onChange={(e) => update({ abeille: e.target.checked || undefined })}
              className="accent-yellow-500"
            />
            Abeille (cursus exemplaire)
          </label>
        </div>
      </div>
    </div>
  );
}

// --- Segment sub-editor ---

function SegmentEditor({ seg, index: _index, isBapteme, isFirst, isLast, segmentCount, onFiliereChange, onAnneesChange, onBaptemeSelect, onMove, onRemove, onSegmentUpdate, onAnnotationUpdate }: {
  seg: CursusSegment;
  index: number;
  isBapteme: boolean;
  isFirst: boolean;
  isLast: boolean;
  segmentCount: number;
  onFiliereChange: (nom: string) => void;
  onAnneesChange: (v: number) => void;
  onBaptemeSelect: () => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  onSegmentUpdate: (patch: Partial<CursusSegment>) => void;
  onAnnotationUpdate: (yearIndex: number, patch: Partial<AnneeAnnotation>) => void;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border p-3 ${
        isBapteme ? 'border-accent bg-gray-900' : 'border-gray-800 bg-gray-900/50'
      }`}
    >
      {/* Filière selector */}
      <div className="flex items-center gap-2">
        <span
          className="h-4 w-4 shrink-0 rounded-full border border-gray-500"
          style={{ backgroundColor: seg.couleur }}
        />
        <select
          value={seg.filiere}
          onChange={(e) => onFiliereChange(e.target.value)}
          className="flex-1 rounded border border-gray-700 bg-gray-900 px-2 py-1 text-xs text-white"
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

      {/* Label diplôme + Années + baptême + move/delete */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1 text-xs text-gray-400">
          Label :
          <select
            value={seg.label ?? ''}
            onChange={(e) => onSegmentUpdate({ label: e.target.value || undefined })}
            className="w-20 rounded border border-gray-700 bg-gray-900 px-1 py-0.5 text-xs text-white"
          >
            <option value="">—</option>
            <option value="DUT">DUT</option>
            <option value="BUT">BUT</option>
            <option value="BTS">BTS</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="D">D</option>
          </select>
        </label>
        <label className="flex items-center gap-1 text-xs text-gray-400">
          Années :
          <input
            type="number"
            value={seg.annees}
            onChange={(e) => onAnneesChange(Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            max={10}
            className="w-14 rounded border border-gray-700 bg-gray-900 px-2 py-0.5 text-center text-xs text-white"
          />
        </label>

        <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
          <input
            type="radio"
            name="bapteme"
            checked={isBapteme}
            onChange={onBaptemeSelect}
            className="accent-yellow-500"
          />
          Baptême
        </label>

        <div className="ml-auto flex gap-1">
          <button
            onClick={() => onMove(-1)}
            disabled={isFirst}
            className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-700 disabled:opacity-30"
            title="Monter"
          >▲</button>
          <button
            onClick={() => onMove(1)}
            disabled={isLast}
            className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-700 disabled:opacity-30"
            title="Descendre"
          >▼</button>
          <button
            onClick={onRemove}
            disabled={segmentCount <= 1}
            className="rounded px-1.5 py-0.5 text-xs text-red-400 hover:bg-gray-700 disabled:opacity-30"
            title="Supprimer"
          >✕</button>
        </div>
      </div>

      {/* Segment-level markers */}
      <div className="flex flex-wrap gap-3 text-xs">
        <label className="flex items-center gap-1 text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={!!seg.diplome}
            onChange={(e) => onSegmentUpdate({ diplome: e.target.checked || undefined, palmeCycle: undefined })}
            className="accent-green-500"
          />
          Diplôme obtenu
        </label>
        <label className="flex items-center gap-1 text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={!!seg.palmeCycle}
            onChange={(e) => onSegmentUpdate({ palmeCycle: e.target.checked || undefined, diplome: undefined })}
            className="accent-green-500"
          />
          Fin de cycle
        </label>
        <label className="flex items-center gap-1 text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={!!seg.abandon}
            onChange={(e) => onSegmentUpdate({ abandon: e.target.checked || undefined })}
            className="accent-red-500"
          />
          Abandon
        </label>
      </div>

      {/* Per-year annotations */}
      {seg.annees > 0 && (
        <div className="flex flex-col gap-1 border-t border-gray-700 pt-2">
          <span className="text-xs text-gray-500">Détail par année :</span>
          {Array.from({ length: seg.annees }, (_, yi) => {
            const ann = seg.annotations?.[yi] ?? {};
            return (
              <div key={yi} className="flex flex-wrap items-center gap-2 text-xs text-gray-400 pl-2">
                <span className="w-12 text-gray-500">An {yi + 1}</span>
                <Toggle label="Redoub." checked={!!ann.redoublement} onChange={(v) => onAnnotationUpdate(yi, { redoublement: v || undefined })} />
                <Toggle label="Major" checked={!!ann.major} onChange={(v) => onAnnotationUpdate(yi, { major: v || undefined })} />
                <Toggle label="Rattrap." checked={!!ann.rattrapage} onChange={(v) => onAnnotationUpdate(yi, { rattrapage: v || undefined })} />
                <Toggle label="Altern." checked={!!ann.alternance} onChange={(v) => onAnnotationUpdate(yi, { alternance: v || undefined })} />
                <Toggle label="Equiv." checked={!!ann.equivalence} onChange={(v) => onAnnotationUpdate(yi, { equivalence: v || undefined, cesure: undefined })} />
                <Toggle label="Césure" checked={!!ann.cesure} onChange={(v) => onAnnotationUpdate(yi, { cesure: v || undefined, equivalence: undefined })} />
                <Toggle label="Annexe" checked={!!ann.annexe} onChange={(v) => onAnnotationUpdate(yi, { annexe: v || undefined })} />
                <div className="flex items-center gap-1">
                  <select
                    value={ann.etranger ?? ''}
                    onChange={(e) => onAnnotationUpdate(yi, { etranger: e.target.value || undefined })}
                    className="rounded border border-gray-700 bg-gray-900 px-1 py-0 text-xs text-white"
                  >
                    <option value="">Pays</option>
                    {PAYS.map((p) => (
                      <option key={p.code} value={p.drapeau}>{p.drapeau} {p.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-0.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-yellow-500 h-3 w-3"
      />
      <span className={checked ? 'text-yellow-400' : 'text-gray-500'}>{label}</span>
    </label>
  );
}
