export type Matiere = 'velours' | 'satin';

export interface Filiere {
  nom: string;
  couleur: string;
  matiere: Matiere;
  label: string;
  embleme: string;
}

// IMPORTANT: les indices 0-37 ne doivent PAS changer (backward compat sharing V3).
// Ajouter les nouvelles filières à la fin du tableau uniquement.
export const FILIERES: Filiere[] = [
  // --- Indices 0-8 : Velours (santé) — NE PAS RÉORDONNER ---
  /* 0  */ { nom: 'Chirurgie dentaire', couleur: '#7B2D8E', matiere: 'velours', label: 'Velours violet', embleme: 'Molaire supérieure' },
  /* 1  */ { nom: 'Études courtes de santé', couleur: '#FFFFFF', matiere: 'velours', label: 'Velours blanc', embleme: 'Croix' },
  /* 2  */ { nom: 'Médecine', couleur: '#722F37', matiere: 'velours', label: 'Velours bordeaux (Amiens)', embleme: 'Caducée Médecine' },
  /* 3  */ { nom: 'Ostéopathie', couleur: '#1E3A8A', matiere: 'velours', label: 'Velours bleu', embleme: 'Sphénoïde' },
  /* 4  */ { nom: 'Paramédical', couleur: '#F4A6C0', matiere: 'velours', label: 'Velours rose', embleme: 'Ciseaux' },
  /* 5  */ { nom: 'Pharmacie', couleur: '#228B22', matiere: 'velours', label: 'Velours vert', embleme: 'Caducée Pharmacie' },
  /* 6  */ { nom: 'Prépas santé', couleur: '#6B3A2A', matiere: 'velours', label: 'Velours marron', embleme: 'Tête de mort sur fémurs croisés' },
  /* 7  */ { nom: 'Sage-Femme', couleur: '#7B2D8E', matiere: 'velours', label: 'Velours violet (Amiens)', embleme: 'Ânkh' },
  /* 8  */ { nom: 'Vétérinaire', couleur: '#722F37', matiere: 'velours', label: 'Velours bordeaux', embleme: 'Tête de cheval' },

  // --- Indices 9-37 : Satin — NE PAS RÉORDONNER ---
  /* 9  */ { nom: 'AES', couleur: '#90EE90', matiere: 'satin', label: 'Satin vert clair', embleme: 'Lettres AES' },
  /* 10 */ { nom: 'Architecture / Arts / Beaux-arts', couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu roy', embleme: 'Palette & Pinceau' },
  /* 11 */ { nom: 'Classes préparatoires', couleur: '#6B3A2A', matiere: 'satin', label: 'Satin marron', embleme: 'Insigne de la discipline' },
  /* 12 */ { nom: 'Droit', couleur: '#CC0000', matiere: 'satin', label: 'Satin rouge', embleme: 'Glaive et balance' },
  /* 13 */ { nom: 'Écoles de commerce', couleur: '#CC0000', matiere: 'satin', label: 'Satin rouge & vert', embleme: 'Caducée de Mercure' },
  /* 14 */ { nom: "Écoles d'ingénieurs", couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu roy & noir', embleme: 'Étoile et foudre' },
  /* 15 */ { nom: 'MEEF', couleur: '#808080', matiere: 'satin', label: 'Satin gris', embleme: 'Lettres MEEF' },
  /* 16 */ { nom: 'Filières sportives', couleur: '#006400', matiere: 'satin', label: 'Satin vert foncé', embleme: 'Coq' },
  /* 17 */ { nom: 'Lettres / Langues / SHS', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: 'Livre ouvert et plume' },
  /* 18 */ { nom: 'Musique / Musicologie', couleur: '#C0C0C0', matiere: 'satin', label: 'Satin argenté', embleme: 'Lyre' },
  /* 19 */ { nom: 'Oenologie', couleur: '#FA8072', matiere: 'satin', label: 'Satin saumon', embleme: 'Grappe de raisin' },
  /* 20 */ { nom: 'Sciences', couleur: '#9333EA', matiere: 'satin', label: 'Satin violet', embleme: 'Palme de chêne et laurier' },
  /* 21 */ { nom: 'Sciences économiques / Gestion / IAE', couleur: '#FF8C00', matiere: 'satin', label: 'Satin orange', embleme: 'Caducée de Mercure' },
  /* 22 */ { nom: 'Sciences politiques', couleur: '#4169E1', matiere: 'satin', label: 'Satin rouge & bleu', embleme: 'Parapluie fermé horizontal' },

  // --- Indices 23+ : Nouvelles filières (ajouts) ---

  // Santé (détail)
  { nom: 'Infirmier', couleur: '#F4A6C0', matiere: 'velours', label: 'Velours rose', embleme: 'Caducée infirmier' },
  { nom: 'Kinésithérapie', couleur: '#F4A6C0', matiere: 'velours', label: 'Velours rose', embleme: 'Ciseaux + Caducée de Mercure' },
  { nom: 'Préparateur en pharmacie', couleur: '#228B22', matiere: 'velours', label: 'Velours vert', embleme: 'Mortier et pilon' },

  // Satin jaune (disciplines distinctes par emblème)
  { nom: 'Archéologie', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: 'Tête de sphinx' },
  { nom: 'Géographie', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: 'Globe terrestre' },
  { nom: 'Histoire', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: 'Casque de Périclès' },
  { nom: 'Philosophie', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: 'Phi φ' },
  { nom: 'Psychologie', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: 'Psi Ψ' },
  { nom: 'Sociologie', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: 'Grenouille' },

  // Arts (éclatés, Amiens : jaune et bleu roy)
  { nom: 'Arts', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune & bleu roy (Amiens)', embleme: 'Palette & Pinceau' },
  { nom: 'Architecture', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune & bleu roy (Amiens)', embleme: 'Équerre et compas' },
  { nom: 'Arts du spectacle / Théâtre', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune & bleu roy (Amiens)', embleme: 'Masque de comédie' },
  { nom: 'Arts numériques', couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu roy', embleme: 'Arobase @' },
  { nom: 'Cinéma', couleur: '#FFFFFF', matiere: 'satin', label: 'Satin blanc & noir (Amiens)', embleme: 'Clap de cinéma' },

  // Autres filières manquantes
  { nom: 'BTS', couleur: '#FFFFFF', matiere: 'satin', label: 'Satin blanc', embleme: 'Lettres BTS' },
  { nom: 'Communication / Journalisme', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune (Amiens)', embleme: 'Caducée de Mercure' },
  { nom: 'DU', couleur: '#808080', matiere: 'satin', label: 'Couleurs UFR', embleme: 'Lettres DU' },
  { nom: 'IAE', couleur: '#FF8C00', matiere: 'satin', label: 'Satin orange', embleme: 'Lettres IAE' },
  { nom: 'IUT', couleur: '#F4A6C0', matiere: 'satin', label: 'Satin rose (Amiens)', embleme: 'Lettres IUT' },
  { nom: 'Militaire', couleur: '#4169E1', matiere: 'satin', label: 'Satin tricolore', embleme: 'Initiales du régiment' },
  { nom: 'Notariat', couleur: '#CC0000', matiere: 'satin', label: 'Satin rouge & noir', embleme: 'Glaive et balance' },
  { nom: 'Thanatologie', couleur: '#FFFFFF', matiere: 'satin', label: 'Satin blanc', embleme: 'Squelette' },
  { nom: 'Théologie', couleur: '#FFFFFF', matiere: 'satin', label: 'Satin blanc & rouge', embleme: 'Insigne de la religion' },

  // Spécificités Amiens
  { nom: 'Assistante sociale', couleur: '#DAA520', matiere: 'velours', label: 'Velours jaune (Amiens)', embleme: 'Lettres AS' },
  { nom: 'Science de l\'éducation', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune (Amiens)', embleme: 'Lettres SDE' },
];

// Couleurs secondaires pour les filières bicolores
export const BICOLORES: Record<string, string[]> = {
  'Écoles de commerce': ['#CC0000', '#228B22'],
  "Écoles d'ingénieurs": ['#4169E1', '#000000'],
  'Sciences politiques': ['#4169E1', '#CC0000'],
  'Notariat': ['#CC0000', '#000000'],
  'Théologie': ['#FFFFFF', '#CC0000'],
  'Cinéma': ['#FFFFFF', '#000000'],
  'Arts': ['#FFD700', '#4169E1'],
  'Architecture': ['#FFD700', '#4169E1'],
  'Arts du spectacle / Théâtre': ['#FFD700', '#4169E1'],
  'Militaire': ['#002395', '#FFFFFF', '#ED2939'],
};
