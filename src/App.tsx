import { useState, useEffect, useRef, useCallback } from 'react';
import type { Faluche, Circulaire, Insigne } from './data/types';
import { createDefaultFaluche } from './data/types';
import type { Ville, Province } from './data/villes';
import { VILLES, PROVINCES } from './data/villes';
import { FaluchePreview } from './components/FaluchePreview';
import { CursusEditor } from './components/CursusEditor';
import { VilleSelector } from './components/VilleSelector';
import { InsignesEditor } from './components/InsignesEditor';
import { SaveLoadButtons } from './components/SaveLoadButtons';
import { encodeFaluche, decodeFaluche, getShareHash, setShareHash } from './utils/sharing';
import { exportSvgAsPng } from './utils/exportPng';

type MobileTab = 'preview' | 'edition';
type Section = 'cursus' | 'insignes' | 'villes' | 'fichier';

function App() {
  const [faluche, setFaluche] = useState<Faluche>(createDefaultFaluche);
  const [selectedInsigneId, setSelectedInsigneId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<MobileTab>('preview');
  const [activeSection, setActiveSection] = useState<Section>('cursus');
  const svgRef = useRef<SVGSVGElement>(null);

  const handleExportPng = useCallback(() => {
    if (!svgRef.current) return;
    const name = faluche.proprietaire || 'sans-nom';
    exportSvgAsPng(svgRef.current, `faluche-${name}.png`);
  }, [faluche.proprietaire]);

  function handleCirculaireChange(circulaire: Circulaire) {
    setFaluche((prev) => ({ ...prev, circulaire }));
  }

  function handleInsignesChange(insignes: Insigne[]) {
    setFaluche((prev) => ({
      ...prev,
      velours: { ...prev.velours, insignes },
    }));
  }

  function handleMoveInsigne(id: string, position: { x: number; y: number }) {
    setFaluche((prev) => ({
      ...prev,
      velours: {
        ...prev.velours,
        insignes: prev.velours.insignes.map((ins) =>
          ins.id === id ? { ...ins, position } : ins
        ),
      },
    }));
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

  function resolveVilleCouleurs(f: Faluche): Faluche {
    const villeEtude = VILLES.find((v) => v.nom === f.villeEtude.nom);
    if (villeEtude) f.villeEtude = { nom: villeEtude.nom, couleurs: villeEtude.couleurs };
    if (f.villeNaissance) {
      const villeN = VILLES.find((v) => v.nom === f.villeNaissance!.nom);
      if (villeN) f.villeNaissance = { nom: villeN.nom, couleurs: villeN.couleurs };
    }
    if (f.provinceNaissance) {
      const prov = PROVINCES.find((p) => p.nom === f.provinceNaissance!.nom);
      if (prov) f.provinceNaissance = { nom: prov.nom, couleurs: prov.couleurs };
    }
    return f;
  }

  function handleLoad(loaded: Faluche) {
    if (loaded.velours) {
      loaded.velours.insignes = loaded.velours.insignes ?? [];
      const MIGRATIONS: Record<string, { endroit: { id: string; label: string }; retourne: { id: string; label: string; svgId: string } }> = {
        cochon: { endroit: { id: 'cochon_integrateur', label: 'Cochon ↑ (a intégré)' }, retourne: { id: 'cochon_integre', label: 'Cochon ↓ (a été intégré·e)', svgId: 'cochon' } },
        chameau: { endroit: { id: 'chameau_celibataire', label: 'Chameau ↑ (célibataire)' }, retourne: { id: 'chameau_couple', label: 'Chameau ↓ (en couple)', svgId: 'chameau' } },
        squelette: { endroit: { id: 'squelette_endroit', label: 'Squelette ↑ (anatomie)' }, retourne: { id: 'squelette_retourne', label: 'Squelette ↓ (sexe opposé)', svgId: 'squelette' } },
        grappe_raisin: { endroit: { id: 'grappe_raisin', label: 'Grappe de raisin ↑ (bon vin)' }, retourne: { id: 'grappe_raisin_retourne', label: 'Grappe de raisin ↓ (tous alcools)', svgId: 'grappe_raisin' } },
      };
      loaded.velours.insignes = loaded.velours.insignes.map((ins) => {
        const migration = MIGRATIONS[ins.id];
        if (migration) {
          const target = ins.retourne ? migration.retourne : migration.endroit;
          return { ...ins, ...target };
        }
        return ins;
      });
    }
    setFaluche(resolveVilleCouleurs(loaded));
  }

  // Load from URL hash on mount
  useEffect(() => {
    const hash = getShareHash();
    if (!hash) return;
    decodeFaluche(hash).then((decoded) => {
      handleLoad(decoded);
    }).catch(() => {
      // Invalid hash, ignore
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleShare() {
    const encoded = await encodeFaluche(faluche);
    setShareHash(encoded);
    await navigator.clipboard.writeText(window.location.href);
  }

  // Accordion section badges
  const cursusBadge = `${faluche.circulaire.segments.length} segment${faluche.circulaire.segments.length > 1 ? 's' : ''}`;
  const insignesBadge = faluche.velours.insignes.length > 0 ? `${faluche.velours.insignes.length}` : '';
  const villesBadge = faluche.villeEtude.nom;

  const previewBlock = (
    <FaluchePreview
      ref={svgRef}
      faluche={faluche}
      selectedInsigneId={selectedInsigneId}
      onSelectInsigne={setSelectedInsigneId}
      onMoveInsigne={handleMoveInsigne}
    />
  );

  const editorBlock = (
    <div className="flex flex-col">
      <AccordionSection
        id="cursus"
        title="Cursus"
        badge={cursusBadge}
        active={activeSection}
        onToggle={(id) => setActiveSection(id as Section)}
      >
        <CursusEditor
          circulaire={faluche.circulaire}
          onChange={handleCirculaireChange}
        />
      </AccordionSection>

      <AccordionSection
        id="insignes"
        title="Insignes"
        badge={insignesBadge}
        active={activeSection}
        onToggle={(id) => setActiveSection(id as Section)}
      >
        <InsignesEditor
          insignes={faluche.velours.insignes}
          onChange={handleInsignesChange}
          selectedId={selectedInsigneId}
          onSelect={setSelectedInsigneId}
        />
      </AccordionSection>

      <AccordionSection
        id="villes"
        title="Villes & Provinces"
        badge={villesBadge}
        active={activeSection}
        onToggle={(id) => setActiveSection(id as Section)}
      >
        <VilleSelector
          villeEtude={faluche.villeEtude.nom}
          villeNaissance={faluche.villeNaissance?.nom ?? ''}
          provinceNaissance={faluche.provinceNaissance?.nom ?? ''}
          onVilleEtudeChange={handleVilleEtudeChange}
          onVilleChange={handleVilleChange}
          onProvinceChange={handleProvinceChange}
        />
      </AccordionSection>

      <AccordionSection
        id="fichier"
        title="Fichier"
        active={activeSection}
        onToggle={(id) => setActiveSection(id as Section)}
      >
        <SaveLoadButtons faluche={faluche} onLoad={handleLoad} onShare={handleShare} onExportPng={handleExportPng} />
      </AccordionSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-3 lg:px-6">
        <h1 className="font-display text-xl font-bold tracking-tight text-accent lg:text-2xl">
          Simulateur de Faluche
        </h1>
        <p className="text-xs text-gray-500">Code Amienois</p>
      </header>

      {/* Desktop layout */}
      <main className="mx-auto hidden max-w-6xl gap-6 p-6 lg:flex">
        <section className="flex flex-1 items-start justify-center">
          {previewBlock}
        </section>
        <aside className="w-[400px] shrink-0">
          {editorBlock}
        </aside>
      </main>

      {/* Mobile layout */}
      <div className="flex flex-col lg:hidden" style={{ height: 'calc(100dvh - 56px)' }}>
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'preview' && (
            <div className="flex items-start justify-center p-4">
              {previewBlock}
            </div>
          )}
          {activeTab === 'edition' && (
            <div className="p-4">
              {editorBlock}
            </div>
          )}
        </div>

        {/* Bottom tab bar */}
        <nav className="flex border-t border-gray-800 bg-gray-950">
          <TabButton
            label="Preview"
            icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            active={activeTab === 'preview'}
            onClick={() => setActiveTab('preview')}
          />
          <TabButton
            label="Edition"
            icon="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            active={activeTab === 'edition'}
            onClick={() => setActiveTab('edition')}
          />
        </nav>
      </div>
    </div>
  );
}

function TabButton({ label, icon, active, onClick }: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
        active ? 'text-accent' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {label}
    </button>
  );
}

function AccordionSection({ id, title, badge, active, onToggle, children }: {
  id: string;
  title: string;
  badge?: string;
  active: string;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  const isOpen = active === id;
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={() => onToggle(isOpen ? '' : id)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-900/50"
      >
        <span className="font-display text-sm font-semibold text-gray-200">{title}</span>
        {badge && (
          <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">{badge}</span>
        )}
        <svg
          className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default App;
