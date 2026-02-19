import type { Matiere } from './filieres';

export type TypeBac =
  | 'general'        // Ɣ
  | 'international'  // Ɣi  
  | 'S'              // E
  | 'techno'         // T
  | 'pro'            // P
  | 'capacitaire'    // C
  | 'daeu';          // DAEU

export interface AnneeAnnotation {
  redoublement?: boolean;  // étoile argentée au lieu de dorée
  major?: boolean;         // large palme à côté de l'étoile
  rattrapage?: boolean;    // tête de vache
  alternance?: boolean;    // "a" sous l'étoile
  etranger?: string;       // code pays (drapeau sous l'étoile)
  equivalence?: boolean;   // "e" au lieu de l'étoile
  cesure?: boolean;        // "0" au lieu de l'étoile
  annexe?: boolean;        // taille plus petite (discipline annexe)
}

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
  label?: string;          // ex: "DUT", "BUT", "BTS", "L", "M", "D" — affiché au début du segment
  annotations?: Record<number, AnneeAnnotation>;  // clé = index de l'année (0-based)
  diplome?: boolean;       // double palme croisée de lauriers (diplôme obtenu)
  palmeCycle?: boolean;    // simple palme (fin de cycle sans diplôme)
  abandon?: boolean;       // tête de mort (abandon / réorientation)
}

export interface Circulaire {
  segments: CursusSegment[];
  baptemeIndex: number;
  initiales: string;            // initiales du propriétaire (ex: "C.D.")
  surnom: string;
  anneeBac: number;
  typeBac: TypeBac;
  moivre: 'public' | 'prive';  // bleu = État/public, blanc = privé
  quille?: boolean;             // service militaire/civique
  abeille?: boolean;            // cursus exemplaire
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
  svgId?: string;                       // maps to SVG component when different from id
  retourne?: boolean;
  position: { x: number; y: number };  // normalized [-1, 1] relative to circle center/radius
  annee?: number;                       // for ciseaux: year of baptism
  nombreCousu?: number;                 // for ciseaux: number of faluches sewn (superscript)
}

export function createDefaultFaluche(): Faluche {
  return {
    proprietaire: '',
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      segments: [],
      baptemeIndex: 0,
      initiales: '',
      surnom: '',
      anneeBac: new Date().getFullYear(),
      typeBac: 'general',
      moivre: 'public',
    },
    villeEtude: {
      nom: '',
      couleurs: ['#000000', '#000000'],
    },
    velours: {
      rubans: [],
      insignes: [],
    },
  };
}
