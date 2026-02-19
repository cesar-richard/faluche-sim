import { useState } from 'react';
import type { Faluche } from '../data/types';

interface SaveLoadButtonsProps {
  faluche: Faluche;
  onLoad: (faluche: Faluche) => void;
  onShare: () => Promise<void>;
}

export function SaveLoadButtons({ faluche, onLoad, onShare }: SaveLoadButtonsProps) {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function handleShare() {
    try {
      await onShare();
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch {
      setShareStatus('error');
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  }
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
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-gray-950 hover:bg-accent-hover transition-colors"
        >
          Sauvegarder JSON
        </button>
        <button
          onClick={handleLoad}
          className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
        >
          Charger JSON
        </button>
      </div>
      <button
        onClick={handleShare}
        className="rounded-lg border border-accent/40 bg-gray-900 px-4 py-2 text-sm font-medium text-accent hover:border-accent hover:bg-gray-800 transition-colors"
      >
        {shareStatus === 'copied' ? 'Lien copié !' : shareStatus === 'error' ? 'Erreur' : 'Copier le lien de partage'}
      </button>
      <button
        disabled
        className="rounded-lg border border-gray-800 px-4 py-2 text-sm text-gray-600 cursor-not-allowed"
        title="Bientôt disponible"
      >
        Exporter PNG (bientôt)
      </button>
    </div>
  );
}
