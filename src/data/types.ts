import type { Matiere } from './filieres';

export interface Faluche {
  proprietaire: string;
  ville: 'amiens';
  dateCreation: string;
  circulaire: Circulaire;
  velours: Velours;
  villeEtude: { nom: string; couleurs: [string, string] };
  villeNaissance?: { nom: string; couleurs: [string, string] };
  provinceNaissance?: { nom: string; couleurs: [string, string] };
}

export interface Circulaire {
  discipline: string;
  couleurPrincipale: string;
  matiere: Matiere;
}

export interface Velours {
  rubans: RubanPendant[];
  insignes: Insigne[];
  devise?: string;
}

export interface RubanPendant {
  type: 'ville_etude' | 'ville_naissance' | 'province_naissance'
      | 'association' | 'bureau_association' | 'asso_nationale' | 'elu';
  couleurs: string[];
  ecusson?: string;
  position: 'gauche' | 'droite';
}

export interface Insigne {
  id: string;
  label: string;
  retourne?: boolean;
  position: { x: number; y: number };
}

export function createDefaultFaluche(): Faluche {
  return {
    proprietaire: '',
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      discipline: "Écoles d'ingénieurs",
      couleurPrincipale: '#4169E1',
      matiere: 'satin',
    },
    villeEtude: { nom: 'Compiègne', couleurs: ['#4169E1', '#CC0000'] },
    villeNaissance: { nom: 'Beauvais', couleurs: ['#CC0000', '#4169E1'] },
    provinceNaissance: { nom: 'Picardie', couleurs: ['#4169E1', '#FFFFFF'] },
    velours: {
      rubans: [],
      insignes: [],
    },
  };
}
