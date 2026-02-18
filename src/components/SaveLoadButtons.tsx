import type { Faluche } from '../data/types';

interface SaveLoadButtonsProps {
  faluche: Faluche;
  onLoad: (faluche: Faluche) => void;
}

export function SaveLoadButtons({ faluche, onLoad }: SaveLoadButtonsProps) {
  function handleSave() {
    const json = JSON.stringify(faluche, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faluche-${faluche.proprietaire || 'sans-nom'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleLoad() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string) as Faluche;
          onLoad(data);
        } catch {
          alert('Fichier JSON invalide');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleSave}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Sauvegarder JSON
      </button>
      <button
        onClick={handleLoad}
        className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Charger JSON
      </button>
    </div>
  );
}
