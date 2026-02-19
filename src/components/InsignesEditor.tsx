import { useState } from 'react';
import type { Insigne } from '../data/types';
import { INSIGNES_CATALOG, CATEGORY_LABELS, type InsigneCategory, type InsigneDef } from '../data/insignes';
import { InsignePersonnel } from './InsignesPersonnels';

interface InsignesEditorProps {
  insignes: Insigne[];
  onChange: (insignes: Insigne[]) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const CATEGORIES: InsigneCategory[] = ['obligatoire_amiens', 'auto', 'partenaire', 'grand_maitre', 'regional'];

function defaultPosition(existingCount: number): { x: number; y: number } {
  const col = existingCount % 3;
  const row = Math.floor(existingCount / 3);
  return {
    x: 0.25 + col * 0.22,
    y: -0.35 + row * 0.25,
  };
}

export function InsignesEditor({ insignes, onChange, selectedId, onSelect }: InsignesEditorProps) {
  const [openCategory, setOpenCategory] = useState<InsigneCategory | null>('obligatoire_amiens');
  const activeIds = new Set(insignes.map(i => i.id));

  function addInsigne(def: InsigneDef) {
    if (activeIds.has(def.id)) return;
    const newInsigne: Insigne = {
      id: def.id,
      label: def.label,
      ...(def.svgId ? { svgId: def.svgId } : {}),
      position: defaultPosition(insignes.length),
      ...(def.defaultRetourne ? { retourne: true } : {}),
      ...(def.hasAnnee ? { annee: new Date().getFullYear() } : {}),
    };
    onChange([...insignes, newInsigne]);
    onSelect(def.id);
  }

  function removeInsigne(id: string) {
    onChange(insignes.filter(i => i.id !== id));
    if (selectedId === id) onSelect(null);
  }

  function updateAnnee(id: string, annee: number) {
    onChange(insignes.map(i => i.id === id ? { ...i, annee } : i));
  }

  function updateNombreCousu(id: string, nombreCousu: number) {
    onChange(insignes.map(i => i.id === id ? { ...i, nombreCousu } : i));
  }

  function getDef(id: string): InsigneDef | undefined {
    return INSIGNES_CATALOG.find(d => d.id === id);
  }

  function getSignification(insigne: Insigne): string {
    const def = getDef(insigne.id);
    if (!def) return '';
    return def.labelEndroit ?? '';
  }

  return (
    <div className="text-sm">
      <h3 className="mb-3 font-display text-sm font-semibold text-accent">Insignes personnels</h3>

      {/* Active insignes */}
      {insignes.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-xs font-medium text-gray-400">Sur le velours :</p>
          {insignes.map((insigne) => {
            const def = getDef(insigne.id);
            const isSelected = selectedId === insigne.id;
            return (
              <div
                key={insigne.id}
                className={`flex items-center gap-2 rounded p-1.5 ${isSelected ? 'bg-accent/10 ring-1 ring-accent' : 'bg-gray-900/50'}`}
                onClick={() => onSelect(insigne.id)}
              >
                <svg width={24} height={24} viewBox="-14 -14 28 28">
                  <InsignePersonnel id={insigne.id} svgId={insigne.svgId} retourne={insigne.retourne} cx={0} cy={0} size={22} annee={insigne.annee} nombreCousu={insigne.nombreCousu} />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-200 truncate">{insigne.label}</div>
                  <div className="text-xs text-gray-400 truncate">{getSignification(insigne)}</div>
                </div>
                {def?.hasAnnee && (
                  <input
                    type="number"
                    className="w-14 rounded bg-gray-600 px-1 py-0.5 text-xs text-gray-200"
                    value={insigne.annee ?? new Date().getFullYear()}
                    onChange={(e) => updateAnnee(insigne.id, parseInt(e.target.value) || 0)}
                    onClick={(e) => e.stopPropagation()}
                    title="Année de baptême"
                  />
                )}
                {def?.hasNombreCousu && (
                  <input
                    type="number"
                    min={0}
                    className="w-10 rounded bg-gray-600 px-1 py-0.5 text-xs text-gray-200"
                    value={insigne.nombreCousu ?? 0}
                    onChange={(e) => updateNombreCousu(insigne.id, parseInt(e.target.value) || 0)}
                    onClick={(e) => e.stopPropagation()}
                    title="Nombre de faluches cousues"
                  />
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeInsigne(insigne.id); }}
                  className="text-red-400 hover:text-red-300 text-xs font-bold"
                  title="Retirer"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Catalog */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-400 mb-1">Catalogue :</p>
        {CATEGORIES.map((cat) => {
          const items = INSIGNES_CATALOG.filter(d => d.category === cat);
          const isOpen = openCategory === cat;
          return (
            <div key={cat}>
              <button
                className="flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs font-semibold text-gray-300 hover:bg-gray-800"
                onClick={() => setOpenCategory(isOpen ? null : cat)}
              >
                <span>{CATEGORY_LABELS[cat]} ({items.length})</span>
                <span>{isOpen ? '▾' : '▸'}</span>
              </button>
              {isOpen && (
                <div className="ml-1 space-y-0.5 pb-1">
                  {items.map((def) => {
                    const isActive = activeIds.has(def.id);
                    return (
                      <div
                        key={def.id}
                        className={`flex items-center gap-2 rounded px-2 py-1 ${isActive ? 'opacity-40' : 'hover:bg-gray-800 cursor-pointer'}`}
                        onClick={() => !isActive && addInsigne(def)}
                      >
                        <svg width={20} height={20} viewBox="-12 -12 24 24">
                          <InsignePersonnel id={def.id} svgId={def.svgId} retourne={def.defaultRetourne} cx={0} cy={0} size={18} />
                        </svg>
                        <span className="flex-1 text-xs text-gray-300 truncate">
                          {def.label}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[120px]">
                          {def.labelEndroit}
                        </span>
                        {isActive
                          ? <span className="text-green-500 text-xs">✓</span>
                          : <span className="text-accent text-xs font-bold">+</span>
                        }
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
