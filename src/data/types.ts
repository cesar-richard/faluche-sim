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

export interface CursusSegment {
  filiere: string;
  couleur: string;
  matiere: Matiere;
  annees: number;
}

export interface Circulaire {
  segments: CursusSegment[];
  baptemeIndex: number;
  surnom: string;
  anneeBac: number;
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
      segments: [
        { filiere: 'Sciences', couleur: '#7B2D8E', matiere: 'satin', annees: 2 },
        { filiere: "Écoles d'ingénieurs", couleur: '#4169E1', matiere: 'satin', annees: 3 },
      ],
      baptemeIndex: 1,
      surnom: '',
      anneeBac: 2018,
    },
    villeEtude: { nom: 'Compiègne', couleurs: ['#FFD700', '#4169E1'] },
    villeNaissance: { nom: 'Beauvais', couleurs: ['#CC0000', '#FFFFFF'] },
    provinceNaissance: { nom: 'Picardie', couleurs: ['#4169E1', '#FFFFFF'] },
    velours: {
      rubans: [],
      insignes: [],
    },
  };
}
