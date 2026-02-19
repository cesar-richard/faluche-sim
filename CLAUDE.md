# CLAUDE.md — Simulateur de Faluche (Code Compiègne / Amiens)

## Projet

Simulateur interactif de faluche étudiante. L'utilisateur configure sa faluche (circulaire, rubans, insignes) et obtient un rendu SVG schématique. Cible le **Code Compiègne** (basé sur Amiens), code national 136ème édition (Toulouse juillet 2024).

## Stack

- **React 19** + **TypeScript 5.9** (strict) + **Vite 7** + **Tailwind CSS v4** + **Bun**
- Rendu 100% **SVG inline** dans des composants React (pas de canvas, pas de lib graphique)
- État : simple `useState<Faluche>` dans App.tsx, pas de state manager externe
- Persistance : JSON download/upload (FileReader API)
- Dev : `bun run dev` (port 5173)
- Build : `bun run build` (tsc + vite build)
- Lint : `bun run lint` (eslint 9 flat config)
- Tests : pas encore implémentés (Vitest prévu)

## Structure des fichiers

```
src/
├── App.tsx                    # Composant racine, état Faluche
├── main.tsx                   # Point d'entrée React
├── index.css                  # @import "tailwindcss"
├── components/
│   ├── FaluchePreview.tsx     # Canvas SVG principal (500x620 viewBox)
│   ├── CirculaireBar.tsx      # Bande horizontale du circulaire (rendu SVG)
│   ├── CursusEditor.tsx       # Panneau de config du circulaire
│   ├── Insignes.tsx           # Tous les composants SVG d'insignes (étoiles, palmes, emblèmes filière...)
│   ├── RubanPendant.tsx       # Géométrie et rendu des rubans pendants
│   ├── Ecusson.tsx            # Blason SVG sur les rubans
│   ├── Velours.tsx            # Cercle noir du béret
│   ├── VilleSelector.tsx      # Sélecteurs ville/province
│   └── SaveLoadButtons.tsx    # Import/export JSON
└── data/
    ├── types.ts               # Types TS centraux + createDefaultFaluche()
    ├── filieres.ts            # 23 filières avec couleurs et matières
    ├── pays.ts                # 27 pays (drapeaux emoji pour année à l'étranger)
    └── villes.ts              # ~145 villes + 43 provinces avec couleurs héraldiques
```

## Règles métier — Faluche

### Anatomie générale

La faluche a **deux parties** :
1. **Le velours** (cercle noir, vue de dessus) — porte les rubans pendants, la devise, les insignes personnels
2. **Le circulaire** (bande qui fait le tour) — représenté comme un rectangle horizontal sous le cercle

### Le circulaire (de gauche à droite, sens occipital → frontal)

Layout : `[oeillet] [surnom] [initiales] [typeBac+année] [segments pré-baptême] | frontal(emblème) | [années baptême] [segments post-baptême]`

- **Oeillet** : cercle doré à gauche
- **Surnom** : surnom de baptême en italique, sur fond couleur baptême
- **Initiales** : initiales du propriétaire (ex: "C.D."), en doré
- **Type de bac + année** : en doré, grande taille serif (ex: "Ɣ18" pour bac général 2018)
- **Segments pré-baptême** : filières d'études AVANT la filière de baptême, avec étoiles et labels (ex: DUT Sciences)
- **Frontal** : ligne pointillée verticale, **l'emblème de la filière de baptême est centré SUR cette ligne**
- **Années baptême** : étoiles de la filière de baptême, APRÈS le frontal
- **Segments post-baptême** : éventuels segments suivants

### Règle de placement du frontal (cursus varié)

Le fond de toute la barre = couleur de la filière de baptême. Les segments non-baptême sont overlayés par-dessus.

**Cas standard** : les années pré-baptême vont à gauche du frontal, l'emblème au frontal, les années de baptême à droite.

**Cas cursus long** : si les années pré-baptême sont trop nombreuses, l'emblème est placé au frontal en premier, puis le cursus se déroule dans l'ordre après le frontal.

### Labels de cursus

`DUT`, `BUT`, `BTS`, `L`, `M`, `D` ne sont PAS des filières — ce sont des **labels** affichés au début du segment. La couleur vient de la discipline (ex: DUT Sciences = satin rose).

### Types de bac

| Type | Symbole |
|------|---------|
| Général | Ɣ |
| Bac S (ancien) | ε |
| International | Ɣi |
| Technologique | T |
| Professionnel | P |
| Capacitaire | C |
| DAEU | DAEU |

### Annotations par année

| Annotation | Rendu |
|-----------|-------|
| Redoublement | Étoile **argentée** au lieu de dorée |
| Major | Grande **palme** à côté de l'étoile |
| Rattrapage | **Tête de vache** |
| Alternance | "a" sous l'étoile |
| Étranger | Drapeau du pays sous l'étoile |
| Équivalence | "e" au lieu de l'étoile |
| Césure | "0" au lieu de l'étoile |
| Annexe | Taille réduite (discipline annexe) |

### Marqueurs de fin de segment

| Marqueur | Rendu |
|----------|-------|
| Diplôme obtenu | **Couronne de laurier** (palmes croisées) |
| Fin de cycle (sans diplôme) | **Palme simple** |
| Abandon / réorientation | **Tête de mort** |

### Insignes spéciaux du circulaire

- **Quille** : service militaire ou civique
- **Abeille** : cursus exemplaire (insigne napoléonienne)
- **Moivre** : bande diagonale sur la première année — bleu ciel (#87CEEB) si public, blanc si privé

### Couleurs des filières — OVERRIDE AMIENS

**Sciences = satin ROSE** (`#EC4899`) à Amiens, pas violet comme dans le code national. C'est une spécificité locale confirmée.

### Filières bicolores (segment divisé horizontalement haut/bas)

- Écoles d'ingénieurs : bleu (#4169E1) / noir (#000000)
- Écoles de commerce : rouge (#CC0000) / vert (#228B22)
- Sciences politiques : bleu (#4169E1) / rouge (#CC0000)

### Emblèmes de filière (insignes SVG sur le circulaire)

Tous les emblèmes sont rendus en **doré** (#FFD700 + stroke #B8860B), jamais en blanc ou autre couleur.

| Filière | Insigne |
|---------|---------|
| Écoles d'ingénieurs | **Étoile et Foudre** (étoile + chevrons rayonnants) |
| Médecine | Caducée (bâton + serpent) |
| Pharmacie | Coupe d'Hygie (coupe + serpent) |
| Droit / AES | Balance de justice |
| Sciences | Atome |
| Commerce | Dollar |
| Lettres / Langues / SHS | Plume |
| MEEF | Crayon |
| Architecture / Arts | Fleur |
| Musique | Note de musique |
| Vétérinaire | Patte |
| Sage-Femme | Bébé |
| Chirurgie dentaire | Dent |
| etc. | (voir `Insignes.tsx` pour la liste complète) |

### Les rubans pendants

| Lettre | Type | Position |
|--------|------|----------|
| D/d | Ville d'étude | Gauche (Y-shaped) |
| A/a | Ville de naissance | Droite (diagonal) |
| B/b | Province de naissance | Droite (Y-shaped) |
| E | Membre d'asso | Gauche (frontal) |
| F | Bureau d'asso | Gauche (frontal) |
| G | Asso nationale | Gauche (frontal) — spécifique Amiens |
| C | Élu | Occipital |

**Spécificité Amiens** : tous les rubans sont en **velours** (pas en satin).

### Spécificités Amiens

- Couleurs de la ville : **rouge et bleu roi**
- Province (Picardie) : **bleu et blanc**
- Ruban G supplémentaire (association nationale)
- Tous les rubans en velours
- Sciences = satin rose (pas violet)

## Conventions de code

- Tous les insignes SVG sont dans `Insignes.tsx`, centrés sur (cx, cy) avec paramètre `size`
- Interface commune `InsigneProps { cx, cy, size, color?, stroke? }`
- Le `FiliereEmbleme` mappe les noms de filières aux composants SVG
- Les insignes sont toujours dorés (#FFD700 fill, #B8860B stroke) sauf mention contraire
- Le circulaire utilise un système de **slots** pondérés (year=1.0, label=0.7, annexe=0.6, marker=0.5, end=0.5)
- Les zones fixes du circulaire : OEILLET=6%, SURNOM=15%, INITIALES=6%, BAC=10%
- Le frontal est calculé dynamiquement = bord gauche du premier slot du segment de baptême
- Les rectangles de fond des segments sont dérivés des positions des slots (pas des proportions d'années brutes)

## État d'avancement (roadmap)

- [x] V0.1 — Base : velours + circulaire simple + sauvegarde JSON
- [x] V0.2 — Rubans pendants D, A, B + écussons + sélecteurs ville/province
- [x] V0.3 — Circulaire détaillé : multi-segments, étoiles, palmes, surnom, bac, emblèmes SVG, moivre, annotations
- [ ] V0.4 — Insignes personnels sur le velours (zone 2)
- [ ] V0.5 — Rubans d'association (E, F, G, C) + export PNG + partage

## Références

- **Code national 136ème édition** : https://faluche.app/codes/archives-national/136-toulouse-juillet-2024
- **Disposition rubans (national)** : https://faluche.app/couture/disposition-des-rubans
- **Disposition rubans (Amiens)** : https://faluche.app/couture/autres-dispositions
- **Guide circulaire** : https://faluche.app/couture/circulaire
- **Encyclopédie insignes** : https://faluche.app/codes/insignes — galerie de photos des vrais insignes en métal doré
- **Blasons par ville** : https://faluche.app/couture/blasons
- **Image de référence** : `specifications/FAL.png`
- **Specs techniques détaillées** : `specifications/SpecsTechniques.md`

## Notes techniques

- Le `clipPath id="clip-circulaire"` est hardcodé — à rendre unique si on veut plusieurs circulaires
- Le champ `embleme` dans `filieres.ts` contient encore des emojis Unicode mais n'est **plus utilisé** pour le rendu — `FiliereEmbleme` dans `Insignes.tsx` mappe directement par nom de filière
- Les drapeaux pays dans `pays.ts` utilisent des emojis Unicode (flag sequences) — OK car ils sont dans des `<option>` HTML, pas dans le SVG
- Province auto-détectée depuis la ville de naissance dans `VilleSelector.tsx`
