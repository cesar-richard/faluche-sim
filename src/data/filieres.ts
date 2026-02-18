export type Matiere = 'velours' | 'satin';

export interface Filiere {
  nom: string;
  couleur: string;
  matiere: Matiere;
  label: string;
}

export const FILIERES: Filiere[] = [
  // Velours (santé)
  { nom: 'Chirurgie dentaire', couleur: '#7B2D8E', matiere: 'velours', label: 'Velours violet' },
  { nom: 'Études courtes de santé', couleur: '#FFFFFF', matiere: 'velours', label: 'Velours blanc' },
  { nom: 'Médecine', couleur: '#CC0000', matiere: 'velours', label: 'Velours rouge' },
  { nom: 'Ostéopathie', couleur: '#1E3A8A', matiere: 'velours', label: 'Velours bleu roy' },
  { nom: 'Paramédical', couleur: '#F4A6C0', matiere: 'velours', label: 'Velours rose' },
  { nom: 'Pharmacie', couleur: '#228B22', matiere: 'velours', label: 'Velours vert' },
  { nom: 'Prépas santé', couleur: '#6B3A2A', matiere: 'velours', label: 'Velours marron' },
  { nom: 'Sage-Femme', couleur: '#FF00FF', matiere: 'velours', label: 'Velours fuchsia' },
  { nom: 'Vétérinaire', couleur: '#722F37', matiere: 'velours', label: 'Velours bordeaux' },

  // Satin (autres)
  { nom: 'AES', couleur: '#90EE90', matiere: 'satin', label: 'Satin vert clair' },
  { nom: 'Architecture / Arts / Beaux-arts', couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu' },
  { nom: 'Classes préparatoires', couleur: '#6B3A2A', matiere: 'satin', label: 'Satin marron' },
  { nom: 'Droit', couleur: '#CC0000', matiere: 'satin', label: 'Satin rouge' },
  { nom: 'Écoles de commerce', couleur: '#CC0000', matiere: 'satin', label: 'Satin rouge & vert' },
  { nom: "Écoles d'ingénieurs", couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu & noir' },
  { nom: 'MEEF', couleur: '#808080', matiere: 'satin', label: 'Satin gris' },
  { nom: 'Filières sportives', couleur: '#006400', matiere: 'satin', label: 'Satin vert foncé' },
  { nom: 'BUT / DUT / BTS / Bachelor', couleur: '#F4A6C0', matiere: 'satin', label: 'Satin rose' },
  { nom: 'Lettres / Langues / SHS', couleur: '#FFD700', matiere: 'satin', label: 'Satin jaune' },
  { nom: 'Musique / Musicologie', couleur: '#C0C0C0', matiere: 'satin', label: 'Satin argenté' },
  { nom: 'Oenologie', couleur: '#FA8072', matiere: 'satin', label: 'Satin saumon' },
  { nom: 'Sciences', couleur: '#7B2D8E', matiere: 'satin', label: 'Satin violet' },
  { nom: 'Sciences économiques / Gestion / IAE', couleur: '#FF8C00', matiere: 'satin', label: 'Satin orange' },
  { nom: 'Sciences politiques', couleur: '#4169E1', matiere: 'satin', label: 'Satin bleu & rouge' },
];

// Couleurs secondaires pour les filières bicolores
export const BICOLORES: Record<string, string[]> = {
  'Écoles de commerce': ['#CC0000', '#228B22'],
  "Écoles d'ingénieurs": ['#4169E1', '#000000'],
  'Sciences politiques': ['#4169E1', '#CC0000'],
};
