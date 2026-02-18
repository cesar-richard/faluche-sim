import { useState } from 'react';
import type { Faluche, Circulaire } from './data/types';
import { createDefaultFaluche } from './data/types';
import type { Ville, Province } from './data/villes';
import { FaluchePreview } from './components/FaluchePreview';
import { CursusEditor } from './components/CursusEditor';
import { VilleSelector } from './components/VilleSelector';
import { SaveLoadButtons } from './components/SaveLoadButtons';

function App() {
  const [faluche, setFaluche] = useState<Faluche>(createDefaultFaluche);

  function handleCirculaireChange(circulaire: Circulaire) {
    setFaluche((prev) => ({ ...prev, circulaire }));
  }

  function handleVilleEtudeChange(ville: Ville) {
    setFaluche((prev) => ({
      ...prev,
      villeEtude: { nom: ville.nom, couleurs: ville.couleurs },
    }));
  }

  function handleVilleChange(ville: Ville) {
    setFaluche((prev) => ({
      ...prev,
      villeNaissance: { nom: ville.nom, couleurs: ville.couleurs },
    }));
  }

  function handleProvinceChange(province: Province) {
    setFaluche((prev) => ({
      ...prev,
      provinceNaissance: { nom: province.nom, couleurs: province.couleurs },
    }));
  }

  function handleLoad(loaded: Faluche) {
    setFaluche(loaded);
  }

  const bapteme = faluche.circulaire.segments[faluche.circulaire.baptemeIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-700 px-6 py-4">
        <h1 className="text-2xl font-bold">Simulateur de Faluche — Code Compiegne</h1>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 p-6 lg:flex-row">
        {/* Preview */}
        <section className="flex flex-1 items-start justify-center">
          <FaluchePreview faluche={faluche} />
        </section>

        {/* Config panel */}
        <aside className="flex w-full flex-col gap-6 lg:w-80">
          <CursusEditor
            circulaire={faluche.circulaire}
            onChange={handleCirculaireChange}
          />

          <VilleSelector
            villeEtude={faluche.villeEtude.nom}
            villeNaissance={faluche.villeNaissance?.nom ?? ''}
            provinceNaissance={faluche.provinceNaissance?.nom ?? ''}
            onVilleEtudeChange={handleVilleEtudeChange}
            onVilleChange={handleVilleChange}
            onProvinceChange={handleProvinceChange}
          />

          <SaveLoadButtons faluche={faluche} onLoad={handleLoad} />

          {/* Summary */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm">
            <p className="mb-2 font-semibold text-gray-300">Résumé</p>
            {bapteme && (
              <p>
                <span className="text-gray-400">Baptême :</span>{' '}
                {bapteme.filiere}
                <span
                  className="ml-2 inline-block h-3 w-3 rounded-full border border-gray-500"
                  style={{ backgroundColor: bapteme.couleur }}
                />
              </p>
            )}
            <p>
              <span className="text-gray-400">Cursus :</span>{' '}
              {faluche.circulaire.segments.map(s => s.filiere).join(' → ')}
            </p>
            <p>
              <span className="text-gray-400">Ville d'étude :</span>{' '}
              {faluche.villeEtude.nom}
            </p>
            {faluche.villeNaissance && (
              <p>
                <span className="text-gray-400">Ville de naissance :</span>{' '}
                {faluche.villeNaissance.nom}
              </p>
            )}
            {faluche.provinceNaissance && (
              <p>
                <span className="text-gray-400">Province :</span>{' '}
                {faluche.provinceNaissance.nom}
              </p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
