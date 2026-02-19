export type Matiere = 'velours' | 'satin';

export interface Filiere {
  nom: string;
  couleur: string;
  matiere: Matiere;
  label: string;
  embleme: string;
}

export const FILIERES: Filiere[] = [
  // Velours (santé)
  { nom: 'Chirurgie dentaire', couleur: '#7B2D8E', matiere: 'velours', label: 'Velours violet', embleme: '🦷' },
  { nom: 'Études courtes de santé', couleur: '#FFFFFF', matiere: 'velours', label: 'Velours blanc', embleme: '✚' },
  { nom: 'Médecine', couleur: '#CC0000', matiere: 'velours', label: 'Velours rouge', embleme: '☤' },
  { nom: 'Ostéopathie', couleur: '#1E3A8A', matiere: 'velours', label: 'Velours bleu roy', embleme: '🦴' },
  { nom: 'Paramédical', couleur: '#F4A6C0', matiere: 'velours', label: 'Velours rose', embleme: '⚕' },
  { nom: 'Pharmacie', couleur: '#228B22', matiere: 'velours', label: 'Velours vert', embleme: '⚗' },
  { nom: 'Prépas santé', couleur: '#6B3A2A', matiere: 'velours', label: 'Velours marron', embleme: '✚' },
  { nom: 'Sage-Femme', couleur: '#FF00FF', matiere: 'velours', label: 'Velours fuchsia', embleme: '👶' },
  { nom: 'Vétérinaire', couleur: '#722F37', matiere: 'velours', label: 'Velours bordeaux', embleme: '🐾' },

  // Satin (autres)
  { nom: 'AES', couleur: '#90EE90', matiere: 'satin', label: 'Satin vert clair', embleme: '⚖' },
  { nom: 'Architecture / Arts / Beaux-arts', couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu', embleme: '✿' },
  { nom: 'Classes préparatoires', couleur: '#6B3A2A', matiere: 'satin', label: 'Satin marron', embleme: '📖' },
  { nom: 'Droit', couleur: '#CC0000', matiere: 'satin', label: 'Satin rouge', embleme: '⚖' },
  { nom: 'Écoles de commerce', couleur: '#CC0000', matiere: 'satin', label: 'Satin rouge & vert', embleme: '💰' },
  { nom: "Écoles d'ingénieurs", couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu & noir', embleme: '⚙' },
  { nom: 'MEEF', couleur: '#808080', matiere: 'satin', label: 'Satin gris', embleme: '✏' },
  { nom: 'Filières sportives', couleur: '#006400', matiere: 'satin', label: 'Satin vert foncé', embleme: '⚽' },
  { nom: 'Lettres / Langues / SHS', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune', embleme: '✎' },
  { nom: 'Musique / Musicologie', couleur: '#C0C0C0', matiere: 'satin', label: 'Satin argenté', embleme: '♪' },
  { nom: 'Oenologie', couleur: '#FA8072', matiere: 'satin', label: 'Satin saumon', embleme: '🍷' },
  { nom: 'Sciences', couleur: '#EC4899', matiere: 'satin', label: 'Satin rose', embleme: '⚛' },
  { nom: 'Sciences économiques / Gestion / IAE', couleur: '#FF8C00', matiere: 'satin', label: 'Satin orange', embleme: '📊' },
  { nom: 'Sciences politiques', couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu & rouge', embleme: '🏛' },
];

// Couleurs secondaires pour les filières bicolores
export const BICOLORES: Record<string, string[]> = {
  'Écoles de commerce': ['#CC0000', '#228B22'],
  "Écoles d'ingénieurs": ['#4169E1', '#000000'],
  'Sciences politiques': ['#4169E1', '#CC0000'],
};
