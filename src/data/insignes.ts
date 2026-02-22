export type InsigneCategory = 'obligatoire_amiens' | 'auto' | 'partenaire' | 'grand_maitre' | 'regional';

export interface InsigneDef {
  id: string;
  label: string;
  category: InsigneCategory;
  defaultRetourne?: boolean;     // placed retourné (upside-down) by default
  labelEndroit?: string;
  hasAnnee?: boolean;
  hasNombreCousu?: boolean;      // ciseaux: nombre de faluches cousues (exposant)
  svgId?: string;                // maps to a different SVG component (e.g. both cochon entries → 'cochon')
}

export const CATEGORY_LABELS: Record<InsigneCategory, string> = {
  obligatoire_amiens: 'Obligatoires (Amiens)',
  auto: 'Auto-attribués',
  partenaire: 'Décernés par le/la partenaire',
  grand_maitre: 'Décernés par Grand Maître',
  regional: 'Régionaux',
};

export const INSIGNES_CATALOG: InsigneDef[] = [
  // --- Obligatoires Amiens ---
  { id: 'chameau_celibataire', label: 'Chameau ↑ (célibataire)', category: 'obligatoire_amiens', svgId: 'chameau', labelEndroit: 'Célibataire' },
  { id: 'chameau_couple', label: 'Chameau ↓ (en couple)', category: 'obligatoire_amiens', svgId: 'chameau', defaultRetourne: true, labelEndroit: 'En couple' },
  { id: 'cochon_integre', label: 'Cochon ↓ (a été intégré·e)', category: 'obligatoire_amiens', svgId: 'cochon', defaultRetourne: true, labelEndroit: 'A été intégré(e)' },
  { id: 'cochon_integrateur', label: 'Cochon ↑ (a intégré)', category: 'obligatoire_amiens', svgId: 'cochon', labelEndroit: 'A intégré quelqu\'un' },
  { id: 'squelette_endroit', label: 'Squelette ↑ (anatomie)', category: 'obligatoire_amiens', svgId: 'squelette', labelEndroit: 'Amour de l\'anatomie' },
  { id: 'squelette_retourne', label: 'Squelette ↓ (sexe opposé)', category: 'obligatoire_amiens', svgId: 'squelette', defaultRetourne: true, labelEndroit: 'Anatomie sexe opposé' },
  { id: 'ciseaux', label: 'Ciseaux', category: 'obligatoire_amiens', hasAnnee: true, hasNombreCousu: true, labelEndroit: 'A cousu sa faluche (année + nb cousues)' },

  // --- Auto-attribués ---
  { id: 'aigle', label: 'Aigle', category: 'auto', labelEndroit: 'Amour de l\'aviation' },
  { id: 'ancre', label: 'Ancre', category: 'auto', labelEndroit: 'Amour de la mer' },
  { id: 'lune', label: 'Lune', category: 'auto', labelEndroit: 'Grand Chambellan à la retraite' },
  { id: 'soleil', label: 'Soleil', category: 'auto', labelEndroit: 'Grand-Maître à la retraite' },
  { id: 'bacchus_troue', label: 'Bacchus troué', category: 'auto', labelEndroit: 'Personne abstème' },
  { id: 'casque_pericles', label: 'Casque de Périclès', category: 'auto', labelEndroit: 'Amour de l\'Histoire' },
  { id: 'chope_biere', label: 'Chope de bière', category: 'auto', labelEndroit: 'Amour de la bonne bière' },
  { id: 'chouette', label: 'Chouette', category: 'auto', labelEndroit: 'Oiseau de nuit' },
  { id: 'cocotte_papier', label: 'Cocotte en papier', category: 'auto', labelEndroit: 'Sécheur de cours' },
  { id: 'cornue_ballon', label: 'Cornue et ballon', category: 'auto', labelEndroit: 'Travail en laboratoire' },
  { id: 'cupidon', label: 'Cupidon', category: 'auto', labelEndroit: 'Fiancé(e)' },
  { id: 'ecureuil', label: 'Écureuil', category: 'auto', labelEndroit: 'Junior d\'entreprise' },
  { id: 'epi_ble', label: 'Épi de blé', category: 'auto', labelEndroit: 'Radin' },
  { id: 'epi_faucille', label: 'Épi de blé croisé faucille', category: 'auto', labelEndroit: 'Chanceux aux examens' },
  { id: 'etoile_foudre_perso', label: 'Étoile et foudre', category: 'auto', labelEndroit: 'Amour des nouvelles technologies' },
  { id: 'fer_cheval', label: 'Fer à cheval', category: 'auto', labelEndroit: 'Chanceux' },
  { id: 'feuille_vigne', label: 'Feuille de vigne', category: 'auto', labelEndroit: 'Perte de virginité masculine (pendant la vie falucharde)' },
  { id: 'fleur_lys', label: 'Fleur de Lys', category: 'auto', labelEndroit: 'Scout' },
  { id: 'fourchette', label: 'Fourchette', category: 'auto', labelEndroit: 'Amour des plaisirs de la table' },
  { id: 'fourchettes_croisees', label: 'Fourchettes croisées', category: 'auto', labelEndroit: 'Mange comme un porc' },
  { id: 'fraise', label: 'Fraise', category: 'auto', labelEndroit: 'Femme enceinte' },
  { id: 'grappe_raisin', label: 'Grappe de raisin ↑ (bon vin)', category: 'auto', labelEndroit: 'Amour du bon vin' },
  { id: 'grappe_raisin_retourne', label: 'Grappe de raisin ↓ (tous alcools)', category: 'auto', svgId: 'grappe_raisin', defaultRetourne: true, labelEndroit: 'Amour de tous les alcools' },
  { id: 'lacet_cuir', label: 'Lacet de cuir', category: 'auto', labelEndroit: 'Sado-maso' },
  { id: 'lyre', label: 'Lyre', category: 'auto', labelEndroit: 'Amour des arts musicaux' },
  { id: 'marteau_maillet', label: 'Marteau et maillet', category: 'auto', labelEndroit: 'Bricoleur' },
  { id: 'masque_comedie', label: 'Masque de comédie', category: 'auto', labelEndroit: 'Amour des arts de la scène' },
  { id: 'nounours', label: 'Nounours', category: 'auto', labelEndroit: 'Gros dormeur' },
  { id: 'palette', label: 'Palette vernie', category: 'auto', labelEndroit: 'Amour des arts plastiques' },
  { id: 'pendu', label: 'Pendu', category: 'auto', labelEndroit: 'Marié(e) ou pacsé(e)' },
  { id: 'plume', label: 'Plume', category: 'auto', labelEndroit: 'Amour des arts littéraires' },
  { id: 'raquette_ballon', label: 'Raquette / Ballon', category: 'auto', labelEndroit: 'Amour du sport' },
  { id: 'rose', label: 'Rose', category: 'auto', labelEndroit: 'Perte de virginité féminine (pendant la vie falucharde)' },
  { id: 'skis', label: 'Skis', category: 'auto', labelEndroit: 'Amour de la montagne' },
  { id: 'sphinx', label: 'Sphinx', category: 'auto', labelEndroit: 'Polyglotte' },
  { id: 'tete_taureau', label: 'Tête de taureau', category: 'auto', labelEndroit: 'Géniteur (ruban rose=fille, bleu=garçon)' },
  { id: 'voilier', label: 'Voilier', category: 'auto', labelEndroit: 'Amour de la navigation' },

  // --- Décernés par le/la partenaire ---
  { id: 'orchidee', label: 'Orchidée', category: 'partenaire', labelEndroit: 'Fine baiseuse (Amiens)' },
  { id: 'epee', label: 'Épée', category: 'partenaire', labelEndroit: 'Fin baiseur' },
  { id: 'fleche', label: 'Flèche', category: 'partenaire', labelEndroit: 'Éjaculateur précoce' },
  { id: 'lime', label: 'Lime', category: 'partenaire', labelEndroit: 'Acte laborieux et difficile' },
  { id: 'escargot', label: 'Escargot', category: 'partenaire', labelEndroit: 'Lent à la tâche' },
  { id: 'pensee', label: 'Pensée', category: 'partenaire', labelEndroit: 'Fine baiseuse (code national)' },

  // --- Décernés par Grand Maître ---
  { id: 'anneaux_olympiques', label: 'Anneaux olympiques', category: 'grand_maitre', labelEndroit: 'Excellence sportive universitaire' },
  { id: 'bacchus', label: 'Bacchus', category: 'grand_maitre', labelEndroit: 'Dignité dans l\'ivresse' },
  { id: 'bouteille_bordeaux', label: 'Bouteille de Bordeaux', category: 'grand_maitre', labelEndroit: 'Cuite certifiée' },
  { id: 'bouteille_champagne', label: 'Bouteille de Champagne', category: 'grand_maitre', labelEndroit: 'Coma éthylique certifié' },
  { id: 'chauve_souris', label: 'Chauve-souris', category: 'grand_maitre', labelEndroit: 'Nuit blanche pour motif associatif' },
  { id: 'cle_sol', label: 'Clé de sol', category: 'grand_maitre', labelEndroit: 'Digne chanteur de paillardes' },
  { id: 'coq', label: 'Coq', category: 'grand_maitre', labelEndroit: 'Grande gueule sachant l\'ouvrir' },
  { id: 'cor_chasse', label: 'Cor de chasse', category: 'grand_maitre', labelEndroit: 'Chasseur devant l\'éternel' },
  { id: 'epingle_ruban_noir', label: 'Épingle + ruban noir', category: 'grand_maitre', labelEndroit: 'Blâme' },
  { id: 'fourchette_bleue', label: 'Fourchette sur ruban bleu', category: 'grand_maitre', labelEndroit: 'Cordon bleu' },
  { id: 'hache', label: 'Hache', category: 'grand_maitre', labelEndroit: 'Prise de guerre' },
  { id: 'homard', label: 'Homard', category: 'grand_maitre', labelEndroit: 'Mène un grand train de vie' },
  { id: 'lime_ruban_noir', label: 'Lime + ruban noir', category: 'grand_maitre', labelEndroit: 'Non respect à Grand-Maître' },
  { id: 'lyre_tete_mort', label: 'Lyre + tête de mort', category: 'grand_maitre', labelEndroit: 'Chanteur minable (Amiens)' },
  { id: 'mammouth', label: 'Mammouth', category: 'grand_maitre', labelEndroit: 'Gardien des traditions' },
  { id: 'pachyderme', label: 'Pachyderme', category: 'grand_maitre', labelEndroit: 'Personne lourde' },
  { id: 'parapluie_ouvert', label: 'Parapluie ouvert', category: 'grand_maitre', labelEndroit: 'A vomi sur sa faluche' },
  { id: 'parapluie_ferme', label: 'Parapluie fermé (endroit)', category: 'grand_maitre', labelEndroit: 'A vomi dans sa faluche' },
  { id: 'parapluie_ferme_envers', label: 'Parapluie fermé (envers)', category: 'grand_maitre', labelEndroit: 'A vomi et remis la faluche' },
  { id: 'poule', label: 'Poule', category: 'grand_maitre', labelEndroit: 'Personne chaude' },
  { id: 'singe', label: 'Singe', category: 'grand_maitre', labelEndroit: 'Quémandeur d\'insignes' },
  { id: 'sou_troue', label: 'Sou troué', category: 'grand_maitre', labelEndroit: 'Nuit au poste pour motif estudiantin' },
  { id: 'volant', label: 'Volant', category: 'grand_maitre', labelEndroit: 'Conducteur de fin de soirée (SAM)' },

  // --- Régionaux ---
  { id: 'chardon', label: 'Chardon', category: 'regional', labelEndroit: 'Lorrain' },
  { id: 'cigale', label: 'Cigale', category: 'regional', labelEndroit: 'Provençal' },
  { id: 'cigogne', label: 'Cigogne', category: 'regional', labelEndroit: 'Alsacien' },
  { id: 'hermine', label: 'Hermine', category: 'regional', labelEndroit: 'Breton' },
  { id: 'houe', label: 'Houe', category: 'regional', labelEndroit: 'Limousin' },
  { id: 'lion_rampant', label: 'Lion rampant', category: 'regional', labelEndroit: 'Lyonnais' },
  { id: 'leopard', label: 'Léopard / Lion passant', category: 'regional', labelEndroit: 'Normand' },
  { id: 'sabot', label: 'Sabot', category: 'regional', labelEndroit: 'Breton monté à Paris' },
  { id: 'sanglier', label: 'Sanglier', category: 'regional', labelEndroit: 'Ardennais' },
  { id: 'taste_vin', label: 'Taste-vin', category: 'regional', labelEndroit: 'Bourguignon' },

  // --- Ajouts spec Amiens (indices stables, ne pas réordonner) ---
  { id: 'cochon_ruban_bleu', label: 'Cochon + ruban bleu', category: 'obligatoire_amiens', labelEndroit: 'Mange comme un porc (remplace fourchettes croisées)' },
  { id: 'faux', label: 'Faux', category: 'obligatoire_amiens', labelEndroit: 'Passage de vie à trépas (garde santé, Art. 9)' },
  { id: 'squelette_diamant', label: 'Squelette ↓ + diamant (même sexe)', category: 'obligatoire_amiens', svgId: 'squelette_diamant', defaultRetourne: true, labelEndroit: 'Anatomie du même sexe' },
  { id: 'squelette_rubis', label: 'Squelette ↓ + rubis (deux sexes)', category: 'obligatoire_amiens', svgId: 'squelette_rubis', defaultRetourne: true, labelEndroit: 'Anatomie des deux sexes' },
  { id: 'abeille_regionale', label: 'Abeille (régionale)', category: 'regional', svgId: 'abeille_regionale', labelEndroit: 'Ville impériale' },
  { id: 'fleur_lys_regionale', label: 'Fleur de Lys (régionale)', category: 'regional', svgId: 'fleur_lys', labelEndroit: 'Ville royale' },
];
