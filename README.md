# Simulateur de Faluche

Simulateur interactif de [faluche](https://fr.wikipedia.org/wiki/Faluche) etudiante francaise. L'utilisateur configure sa faluche (circulaire, insignes personnels, villes) et obtient un rendu SVG en temps reel.

Implemente le **Code Amienois** (base sur Amiens/Compiegne), conforme au code national 136e edition (Toulouse, juillet 2024).

## Qu'est-ce que la faluche ?

La faluche est le beret traditionnel des etudiants francais, porte depuis 1888. C'est un beret de velours noir orne d'insignes, de rubans et d'un **circulaire** (bande de tissu colore faisant le tour) qui retrace le parcours academique de son proprietaire.

Chaque element a une signification codifiee : la couleur du tissu indique la filiere d'etudes, les etoiles representent les annees, les insignes metalliques sur le velours racontent la vie etudiante (bapteme, integrations, vie amoureuse, voyages...).

## Fonctionnalites

- **Circulaire interactif** : multi-segments de cursus avec couleurs par filiere, emblemes SVG, etoiles d'annees, annotations (redoublement, major, rattrapage, alternance, etranger, equivalence, cesure)
- **Insignes personnels** : ~50 insignes du catalogue, drag-and-drop sur le velours, insignes retournables (deux sens = deux significations)
- **Rubans pendants** : ville d'etude (D), ville de naissance (A), province de naissance (B) avec ecussons bicolores heraldiques
- **145+ villes et 43 provinces** avec couleurs heraldiques
- **Sauvegarde/chargement** : export/import JSON
- **Liens de partage stateless** : toute la faluche encodee dans l'URL (compression deflate + base64url)
- **Responsive** : layout desktop (preview + sidebar accordeon) et mobile (bottom tabs Preview/Edition)

## Stack technique

| | |
|---|---|
| Framework | React 19 + TypeScript 5.9 (strict) |
| Build | Vite 7 |
| CSS | Tailwind CSS v4 (`@theme`) |
| Runtime | Bun |
| Rendu | 100% SVG inline (pas de canvas, pas de lib graphique) |
| Etat | `useState<Faluche>` dans App.tsx (pas de state manager) |
| Persistance | JSON download/upload + URL hash sharing |

## Demarrage

```bash
bun install
bun run dev       # http://localhost:5173
```

```bash
bun run build     # tsc + vite build → dist/
bun run lint      # eslint 9 flat config
```

## Structure du projet

```
src/
├── App.tsx                      # Composant racine, etat, layout responsive, accordeon
├── main.tsx                     # Point d'entree React
├── index.css                    # Tailwind + @theme (accent dore, serif)
│
├── components/
│   ├── FaluchePreview.tsx       # Canvas SVG principal (500x620 viewBox)
│   ├── CirculaireBar.tsx        # Bande horizontale du circulaire
│   ├── CursusEditor.tsx         # Panneau de config des segments de cursus
│   ├── Insignes.tsx             # Composants SVG des insignes (etoiles, palmes, emblemes)
│   ├── InsignesPersonnels.tsx   # Dispatch SVG des insignes personnels (cochon, chameau...)
│   ├── InsignesEditor.tsx       # Catalogue + gestion des insignes actifs
│   ├── Velours.tsx              # Cercle noir du beret + drag-and-drop
│   ├── RubanPendant.tsx         # Geometrie et rendu des rubans
│   ├── Ecusson.tsx              # Blason SVG bicolore sur les rubans
│   ├── VilleSelector.tsx        # Selecteurs ville d'etude / naissance / province
│   └── SaveLoadButtons.tsx      # Save JSON, Load JSON, Copier lien, Export PNG
│
├── data/
│   ├── types.ts                 # Types centraux (Faluche, Circulaire, Insigne...)
│   ├── filieres.ts              # 23 filieres avec couleurs et matieres
│   ├── insignes.ts              # ~50 insignes personnels (catalogue)
│   ├── pays.ts                  # 27 pays (drapeaux emoji pour annee a l'etranger)
│   └── villes.ts                # ~145 villes + 43 provinces, couleurs heraldiques
│
└── utils/
    └── sharing.ts               # Encodage/decodage compact pour liens de partage
```

## Modele de donnees

Le type central est `Faluche` (`src/data/types.ts`) :

```
Faluche
├── proprietaire: string
├── circulaire
│   ├── segments[]              # filiere, couleur, matiere, annees, annotations
│   ├── baptemeIndex            # quel segment = bapteme
│   ├── initiales, surnom
│   ├── anneeBac, typeBac       # Ɣ, T, P, C, DAEU...
│   └── moivre                  # public (bleu) / prive (blanc)
├── velours
│   ├── rubans[]                # type, couleurs, position
│   └── insignes[]              # id, position {x,y}, retourne?, annee?
├── villeEtude                  # nom + couleurs heraldiques
├── villeNaissance?
└── provinceNaissance?
```

## Regles metier — La faluche

### Anatomie

La faluche a deux parties :

1. **Le velours** (cercle noir, vu de dessus) — porte les insignes personnels, les rubans pendants, la devise
2. **Le circulaire** (bande faisant le tour) — represente comme un rectangle horizontal, retrace le cursus academique

### Le circulaire

De gauche a droite (sens occipital → frontal) :

```
[surnom] [initiales] [typeBac+annee] [segments pre-bapteme] | frontal | [annees bapteme] [segments post-bapteme]
```

- Le **fond** de toute la barre = couleur de la filiere de bapteme
- Les segments d'autres filieres sont superposes
- Le **frontal** (ligne pointillee) porte l'embleme de la filiere de bapteme
- Chaque annee = une **etoile doree** (argentee si redoublement)

### Filieres

23 filieres, chacune avec sa couleur et matiere (velours pour sante, satin pour les autres). Certaines sont bicolores (ingenieurs = bleu/noir, commerce = rouge/vert).

**Specificite Amiens** : Sciences = satin **rose** (pas violet comme le code national).

### Insignes personnels

Les insignes metalliques sur le velours racontent la vie de l'etudiant. Ils sont classes en categories :

| Categorie | Exemples |
|-----------|----------|
| Obligatoires (Amiens) | Chameau (celibat), cochon (integration), squelette (anatomie), ciseaux |
| Auto-attribues | Grappe de raisin, pomme, balance, 69, truelle... |
| Decernes par le partenaire | Etoile filante, coquillage, coeur, rose... |
| Decernes par Grand Maitre | Cle, fer a cheval, main, oeil... |
| Regionaux | Phoque (Picardie), bouchot (Picardie)... |

Certains insignes ont **deux sens** : a l'endroit et retourne, chacun avec une signification differente (ex: chameau endroit = celibataire, chameau retourne = en couple). Ils sont implementes comme deux entrees catalogue distinctes partageant le meme composant SVG via `svgId`.

### Rubans pendants

| Lettre | Type | Position |
|--------|------|----------|
| D | Ville d'etude | Gauche (Y) |
| A | Ville de naissance | Droite (diagonal) |
| B | Province de naissance | Droite (Y) |

Chaque ruban porte un ecusson aux couleurs heraldiques de la ville/province.

## Liens de partage

Toute la faluche est encodee dans le hash de l'URL (`#f=<data>`) :

1. **Serialisation compacte** : cles courtes (`p`, `c`, `i`, `ve`...), les couleurs/matieres sont derivees du catalogue de filieres au decodage
2. **Compression** : deflate-raw via l'API native `CompressionStream`
3. **Encodage** : base64url (sans padding, caracteres `-_` au lieu de `+/`)

Exemple : <http://localhost:5173/#f=fZFNTsMwEIWvUr0Nm6FK0lKQl5QDoAIrVFWOM20tpU5w4qqoyrriFN0huALbXqhHACdpKliwsfzzvjdvPFvkEBhzIW1votVS2gQEBbFFAfG8xRwCD0qzUVyAICEiQgqBu6dHEBKIsKJGdnhTWcpFL7nQZnH4NJqdbZlBoyRI460Dv8i0vmEIHPe79-N-94WKEHZvFSE6H6pqSohrRPvIExAKAwFfIYaIgjAglLHPC8LqxzZ3caqVN9V1L55TS7li6WYqc3nKIGwggv5oSHj1m_CafOMnGQi27bCGM7XMzEybkhe2g68GLTyIWriW_WGLF8cplyXPLJeZs-ZcPDrxYcN30v_Ky5Kd7SKErUX0O0JH6oKl25zkw6bdy6Af3jQzDaIRwfhaU8Laz2ScrXJ9-FjUOdf-o29ZurXUfqS5P99rJW2iGdU3>

## References

- [Code national 136e edition](https://faluche.app/codes/archives-national/136-toulouse-juillet-2024) (Toulouse, juillet 2024)
- [Guide du circulaire](https://faluche.app/couture/circulaire)
- [Disposition des rubans](https://faluche.app/couture/disposition-des-rubans)
- [Encyclopedie des insignes](https://faluche.app/codes/insignes)
- [Blasons par ville](https://faluche.app/couture/blasons)
