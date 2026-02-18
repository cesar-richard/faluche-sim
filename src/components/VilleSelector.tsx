import { VILLES, PROVINCES, type Ville, type Province } from '../data/villes';

interface VilleSelectorProps {
  villeEtude: string;
  villeNaissance: string;
  provinceNaissance: string;
  onVilleEtudeChange: (ville: Ville) => void;
  onVilleChange: (ville: Ville) => void;
  onProvinceChange: (province: Province) => void;
}

export function VilleSelector({
  villeEtude,
  villeNaissance,
  provinceNaissance,
  onVilleEtudeChange,
  onVilleChange,
  onProvinceChange,
}: VilleSelectorProps) {
  function handleVilleEtudeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const ville = VILLES.find((v) => v.nom === e.target.value);
    if (ville) onVilleEtudeChange(ville);
  }

  function handleVilleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const ville = VILLES.find((v) => v.nom === e.target.value);
    if (ville) {
      onVilleChange(ville);
      const province = PROVINCES.find((p) => p.nom === ville.province);
      if (province) onProvinceChange(province);
    }
  }

  function handleProvinceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const province = PROVINCES.find((p) => p.nom === e.target.value);
    if (province) onProvinceChange(province);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="ville-etude" className="text-sm font-semibold text-gray-300">
          Ville d'étude
        </label>
        <select
          id="ville-etude"
          value={villeEtude}
          onChange={handleVilleEtudeChange}
          className="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        >
          {VILLES.map((v) => (
            <option key={v.nom} value={v.nom}>{v.nom}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ville-naissance" className="text-sm font-semibold text-gray-300">
          Ville de naissance
        </label>
        <select
          id="ville-naissance"
          value={villeNaissance}
          onChange={handleVilleChange}
          className="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        >
          <option value="">-- Choisir --</option>
          {VILLES.map((v) => (
            <option key={v.nom} value={v.nom}>{v.nom}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="province-naissance" className="text-sm font-semibold text-gray-300">
          Province de naissance
        </label>
        <select
          id="province-naissance"
          value={provinceNaissance}
          onChange={handleProvinceChange}
          className="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        >
          <option value="">-- Choisir --</option>
          {PROVINCES.map((p) => (
            <option key={p.nom} value={p.nom}>{p.nom}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
