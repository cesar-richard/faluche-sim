# Spécifications Techniques — Simulateur de Faluche (Amiens)

## Stack technique

| Couche | Techno |
|--------|--------|
| Framework | React 19 |
| Bundler | Vite |
| Langage | TypeScript |
| Rendu faluche | SVG inline dans composants React |
| Tests | Vitest + React Testing Library |
| Export image | html-to-image |
| Style UI | Tailwind CSS |

## Périmètre MVP

- Ville unique : **Amiens**
- Une seule ville d'étude (pas de gestion des villes successives)
- Code national 136ème édition, sans variantes d'autres villes

## Anatomie d'une faluche

La faluche se compose de **deux parties** (Article V du code national) :

### 1. Le velours noir (vue de dessus)

Le cercle noir représente le béret vu de dessus. Il est divisé en **4 zones** (disposition amiénoise) :

- **Zone 1** (haut droite) — Partie officielle
- **Zone 2** (milieu droite) — Partie personnelle (insignes personnels)
- **Zone 3** (bas gauche + bas droite) — Séjours étudiants internationaux
- **Zone 4** (gauche) — Parties échanges

Le velours porte les **rubans pendants** qui partent du bord du cercle vers le centre :

| Lettre | Type | Position | Description |
|--------|------|----------|-------------|
| D/d | Ville d'étude | Gauche | Rubans aux couleurs d'Amiens (rouge et bleu roi) + écusson |
| E | Membre d'association | Gauche (frontal) | Ruban aux couleurs de l'asso |
| F | Bureau d'association | Gauche (frontal) | Ruban aux couleurs de l'asso |
| G | Association nationale | Gauche (frontal) | Spécifique Amiens |
| A/a | Ville de naissance | Droite | Ruban aux couleurs de la ville + écusson |
| B/b | Province de naissance | Droite | Ruban aux couleurs de la province + écusson |
| C | Élu | Occipital | Ruban jaune avec pendentif |

Le velours porte aussi : la **devise** (du frontal à l'occipital, à gauche du ruban de province natale), et des **insignes personnels** (zone 2).

### 2. Le ruban circulaire (projeté à plat en bas)

Le circulaire fait le tour de la tête. Il n'est pas visible sur la vue de dessus, donc il est projeté schématiquement comme un **rectangle horizontal** sous le cercle.

- **Couleur** : selon la discipline principale (voir tableau des filières)
- **Largeur réelle** : 3,7 cm pour un ruban simple
- **Contenu** (de gauche à droite) : oeillet, surnom, emblème de discipline, type de bac, année du bac, étoiles d'années, palmes de diplômes

### Spécificités Amiens

- **Tous les rubans sont en velours** (pas en satin) — Amiens est une "ville tisserande"
- Ruban supplémentaire **G** pour association nationale (absent du code national standard)
- Couleurs de la ville : **rouge et bleu roi**
- Province (Picardie) : **bleu et blanc**
- Blason : *De gueules au lierre d'argent ; au chef d'azur semé de fleurs de lis d'or*

## Filières et couleurs du circulaire

### Filières en velours (santé)

| Filière | Couleur |
|---------|---------|
| Chirurgie dentaire | Violet |
| Études courtes de santé | Blanc |
| Médecine | Rouge |
| Ostéopathie | Bleu roy |
| Paramédical | Rose |
| Pharmacie, Préparateur en pharmacie | Vert |
| Prépas santé | Marron |
| Sage-Femme | Fuchsia |
| Vétérinaire | Bordeaux |

### Filières en satin (autres)

| Filière | Couleur |
|---------|---------|
| AES | Vert clair |
| Architecture, Arts du spectacle, Arts numériques, Audiovisuel, Beaux-arts, Arts Plastiques | Bleu |
| Classes préparatoires | Marron |
| Droit | Rouge |
| Écoles de commerce, gestion, communication, journalisme | Rouge & vert |
| Écoles d'ingénieurs | Bleu & noir |
| MEEF 1er et 2nd degré | Gris |
| Filières sportives | Vert foncé |
| BUT, DUT, BTS, Bachelor | Blanc |
| Lettres, Langues, Sciences humaines et sociales | Jaune |
| Musique, Musicologie | Argenté |
| Oenologie | Saumon |
| Sciences | Violet |
| Sciences économiques, Gestion, IAE | Orange |
| Sciences politiques | Bleu & rouge |

## Emblèmes de discipline (sur le circulaire)

| Filière | Insigne |
|---------|---------|
| AES | "AES" |
| Archéologie | Tête de Sphinx |
| Architecture | Équerre & Compas |
| Arts du spectacle | Masque de comédie |
| Arts numériques | @ |
| Audiovisuel | Clap de cinéma |
| Beaux-arts, Arts plastiques | Palette & Pinceau |
| BTS | "BTS" |
| Chirurgie dentaire | Molaire |
| Classes préparatoires | Chouette bicéphale |
| Communication | Caducée Mercure |
| Droit | Glaive & Balance |
| DU | "DU" |
| DUT | "DUT" |
| Écoles de commerce | Caducée de Mercure |
| Écoles d'ingénieurs | Étoile & Foudre |
| Études courtes de santé | Squelette |
| Filières sportives | Coq |
| Géographie | Globe |
| Histoire | Casque de Périclès |
| Infirmier | Caducée infirmier |
| Langues | Livre ouvert & Plume |
| Lettres | Livre ouvert & Plume |
| Médecine | Caducée médecine |
| MEEF | Plume |
| Musique, Musicologie | Lyre |
| Oenologie | Grappe de raisin |
| Ostéopathie | Sphénoïde |
| Paramédical | Ciseaux |
| Pharmacie | Caducée de pharmacie |
| Philosophie | phi |
| Psychologie | psi |
| Sage-femme | Ankh |
| Sciences | Palmes croisées de chêne & de laurier + initiales |
| Sciences économiques, gestion | Caducée de Mercure |
| Sciences politiques | Parapluie |
| Sciences sociales | Initiales de la discipline |
| Sociologie | Grenouille |
| Vétérinaire | Tête de cheval |

## Types de bac (sur le circulaire)

| Type | Symbole |
|------|---------|
| Bac général | Gamma (Ɣ) |
| Bac international | Lettre "i" après le symbole du bac |
| Autres bacs | Lettres ou initiales correspondantes |
| Capacitaire | "C" |
| DAEU | "DAEU" |

## Cursus universitaire (sur le circulaire)

- Étoile **dorée** : par année d'études (placée en début d'année)
- Étoile **argentée** : année redoublée / 5/2 / 7/2
- **Zéro** : année blanche, sabbatique ou césure
- **"e"** : année validée par équivalence
- **"a"** sous l'étoile : année en alternance
- **Drapeau du pays** sous l'étoile : année à l'étranger
- **Large palme** à côté de l'étoile : major de promotion
- **Simple palme** : fin de cycle (sans diplôme)
- **Double palme croisée de lauriers** : diplôme obtenu
- **Tête de vache** : réussite aux rattrapages
- **Tête de mort** : abandon ou réorientation
- **Quille** : service militaire ou civique
- **Abeille** : cursus exemplaire

## Insignes personnels (sur le velours — zone 2)

### Symboles (auto-attribués)

| Insigne | Signification |
|---------|---------------|
| Appareil photo | Amour de la photographie |
| Bacchus troué | Personne abstème |
| Casque de Périclès | Amour de l'Histoire |
| Chameau (endroit) | Célibataire |
| Chameau (envers) | Coeur pris |
| Chope de bière | Amour de la bonne bière |
| Chouette | Oiseau de nuit |
| Cochon (endroit) | Non intégré(e) |
| Cochon (envers) | Intégré(e) |
| Épi de blé | Radin |
| Épi de blé croisé faucille | Chanceux aux examens |
| Étoile et foudre | Amour des nouvelles technologies |
| Fer à cheval | Chanceux |
| Feuille de vigne | Perte de la virginité |
| Fourchette | Amour des plaisirs de la table |
| Globe sur ruban vert | Engagement écologique |
| Grappe de raisin | Amour du bon vin |
| Lyre | Amour des arts musicaux |
| Masque de comédie | Amour des arts de la scène |
| Palette vernie | Amour des arts plastiques |
| Pendu | Marié(e) ou pacsé(e) |
| Plume | Amour des arts littéraires |
| Sphinx | Polyglotte |

### Décernés par le/la partenaire

| Insigne | Signification |
|---------|---------------|
| Épée | Fin baiseur |
| Flèche | Éjaculateur précoce |
| Lime | Acte laborieux |
| Pensée | Experte |

### Décernés par un Grand Maître

| Insigne | Signification |
|---------|---------------|
| Anneaux olympiques | Excellence sportive universitaire |
| Bacchus | Dignité dans l'ivresse |
| Bouteille de Bordeaux | Cuite certifiée |
| Bouteille de Champagne | Coma éthylique certifié |
| Clé de sol | Digne chanteur de paillarde |
| Coq | Grande gueule sachant l'ouvrir |
| Cor de chasse | Grand chasseur |
| Fourchette sur ruban bleu | Cordon bleu |
| Hache | Prise de guerre |
| Mammouth | Gardien des traditions |
| Pachyderme | Personne lourde |
| Parapluie ouvert | A vomi dans sa faluche |
| Parapluie fermé | A vomi et remis la faluche |
| Poule | Personne très chaude |
| Singe | Quémandeur d'insignes |
| Sou troué | Nuit au poste pour motif étudiant |
| Volant | Conducteur de fin de soirée |

## Modèle de données TypeScript

```typescript
// === DISCIPLINES & COULEURS ===
type Matiere = 'velours' | 'satin';

interface CouleurCirculaire {
  filiere: string;
  couleur: string;          // hex
  matiere: Matiere;
  label: string;
}

// === CIRCULAIRE ===
interface Circulaire {
  discipline: string;
  couleurPrincipale: string;
  matiere: Matiere;
  surnom: string;
  embleme: string;
  bac: TypeBac;
  annees: AnneeEtude[];
}

type TypeBac =
  | { type: 'general' }
  | { type: 'international' }
  | { type: 'capacitaire' }
  | { type: 'daeu' }
  | { type: 'autre'; initiales: string };

interface AnneeEtude {
  numero: number;
  type: 'normale' | 'redoublee' | 'blanche' | 'equivalence' | 'alternance';
  etranger?: string;
  major?: boolean;
  rattrapage?: boolean;
  reorientation?: boolean;
  diplome?: 'palme' | 'double_palme';
}

// === RUBANS PENDANTS ===
interface RubanPendant {
  type: 'ville_etude' | 'ville_naissance' | 'province_naissance'
      | 'association' | 'bureau_association' | 'asso_nationale' | 'elu';
  couleurs: string[];
  ecusson?: string;
  position: 'gauche' | 'droite';
}

// === INSIGNES ===
interface Insigne {
  id: string;
  label: string;
  retourne?: boolean;
  position: { x: number; y: number };
}

// === FALUCHE COMPLÈTE ===
interface Faluche {
  proprietaire: string;
  ville: 'amiens';
  dateCreation: string;

  circulaire: Circulaire;
  velours: {
    rubans: RubanPendant[];
    insignes: Insigne[];
    devise?: string;
  };
}
```

## Architecture des composants React

```
<App>
  ├── <FalucheEditor>              // Page principale
  │   ├── <FaluchePreview>         // Rendu SVG
  │   │   ├── <Velours>            // Cercle noir
  │   │   │   ├── <RubanPendant>   // x N rubans verticaux
  │   │   │   ├── <Ecusson>        // x N écussons sur rubans
  │   │   │   └── <InsigneIcon>    // x N insignes personnels
  │   │   └── <CirculaireBar>      // Rectangle du bas
  │   │       ├── <Oeillet>
  │   │       ├── <Surnom>
  │   │       ├── <Embleme>
  │   │       ├── <Bac>
  │   │       └── <EtoilesAnnees>
  │   │
  │   └── <ConfigPanel>            // Panneau de configuration
  │       ├── <DisciplineSelector>
  │       ├── <SurnomInput>
  │       ├── <BacSelector>
  │       ├── <AnneesEditor>
  │       ├── <RubansEditor>
  │       └── <InsignesSelector>
  │
  ├── <ExportButton>               // Export PNG (V0.5)
  └── <SaveLoadButtons>            // JSON save/load
```

## Roadmap MVP

### V0.1 — La base amiénoise
- Cercle noir (velours) vue de dessus
- Rectangle de circulaire en bas (couleur selon discipline)
- Sélecteur de discipline → changement de couleur du circulaire
- Sauvegarde/chargement JSON

**Critères d'acceptance :**
- [ ] Un cercle noir s'affiche (le velours)
- [ ] Un rectangle s'affiche en dessous (le circulaire)
- [ ] L'utilisateur peut choisir une discipline dans une liste déroulante
- [ ] Le circulaire change de couleur selon la discipline choisie
- [ ] Le JSON est sauvegardable (bouton → téléchargement .json)
- [ ] Un fichier .json peut être chargé et restaure l'état
- [ ] Le rendu est responsive

### V0.2 — Les rubans pendants
- Rubans D (ville d'étude), A (ville naissance), B (province naissance)
- Écussons sur les rubans
- Tous en velours (spécificité Amiens)

### V0.3 — Le circulaire détaillé
- Surnom, emblème de discipline, type de bac
- Étoiles d'années (dorées/argentées)
- Palmes pour diplômes

### V0.4 — Les insignes personnels
- Sélection et placement des insignes sur le velours (zone 2)
- Insignes auto-attribués, décernés par partenaire, décernés par GM

### V0.5 — Rubans d'association + export
- Rubans E, F, G (association) et C (élu)
- Export PNG
- Partage

## Références

- Code national 136ème édition : https://faluche.app/codes/archives-national/136-toulouse-juillet-2024
- Disposition des rubans (national) : https://faluche.app/couture/disposition-des-rubans
- Disposition des rubans (Amiens) : https://faluche.app/couture/autres-dispositions
- Guide du circulaire : https://faluche.app/couture/circulaire
- Encyclopédie d'insignes : https://faluche.app/codes/insignes
- Blasons par ville : https://faluche.app/couture/blasons
- Image de référence : ./FAL.png
