import type { Faluche, CursusSegment, AnneeAnnotation, Insigne, TypeBac } from '../data/types';
import { FILIERES } from '../data/filieres';
import { INSIGNES_CATALOG } from '../data/insignes';
import { VILLES } from '../data/villes';
import { PAYS } from '../data/pays';

// --- Lookup helpers ---

const TYPE_BACS: TypeBac[] = ['general', 'international', 'S', 'techno', 'pro', 'capacitaire', 'daeu'];

function indexOf<T>(arr: readonly T[], pred: (item: T) => boolean): number {
  const idx = arr.findIndex(pred);
  return idx === -1 ? 0 : idx;
}

// --- V1 types (legacy, decode only) ---

interface CompactFalucheV1 {
  p: string;
  c: { s: CompactSegmentV1[]; b: number; i: string; sn: string; ab: number; tb: string; m: string; q?: 1; a?: 1 };
  i: CompactInsigneV1[];
  ve: string;
  vn?: string;
  pn?: string;
}
interface CompactSegmentV1 {
  f: string; a: number; l?: string; an?: Record<string, CompactAnnotationV1>; d?: 1; pc?: 1; ab?: 1;
}
interface CompactAnnotationV1 {
  r?: 1; m?: 1; ra?: 1; al?: 1; e?: string; eq?: 1; c?: 1; an?: 1;
}
interface CompactInsigneV1 {
  i: string; s?: string; r?: 1; x: number; y: number; a?: number; n?: number;
}

// --- V2 types (current, numeric indices) ---

interface CompactFalucheV2 {
  v: 2;
  p: string;                    // proprietaire
  c: CompactCirculaireV2;
  i: CompactInsigneV2[];
  ve: number;                   // villeEtude index in VILLES
  vn?: number;                  // villeNaissance index in VILLES
  // province derived from ville de naissance
}

interface CompactCirculaireV2 {
  s: CompactSegmentV2[];
  b: number;                    // baptemeIndex
  i: string;                    // initiales
  sn: string;                   // surnom
  ab: number;                   // anneeBac
  tb: number;                   // typeBac index in TYPE_BACS
  m: number;                    // 0=public, 1=prive
  q?: 1;
  a?: 1;
}

interface CompactSegmentV2 {
  f: number;                    // filiere index in FILIERES
  a: number;                    // annees
  l?: string;                   // label
  an?: Record<string, CompactAnnotationV2>;
  d?: 1;
  pc?: 1;
  ab?: 1;
}

interface CompactAnnotationV2 {
  r?: 1; m?: 1; ra?: 1; al?: 1;
  e?: number;                   // etranger: index in PAYS
  eq?: 1; c?: 1; an?: 1;
}

interface CompactInsigneV2 {
  i: number;                    // index in INSIGNES_CATALOG
  x: number;                    // position.x * 100, rounded
  y: number;                    // position.y * 100, rounded
  a?: number;                   // annee
  n?: number;                   // nombreCousu
  // retourne + svgId derived from catalog entry
}

// --- V2 Encode ---

function compactAnnotationV2(ann: AnneeAnnotation): CompactAnnotationV2 {
  const c: CompactAnnotationV2 = {};
  if (ann.redoublement) c.r = 1;
  if (ann.major) c.m = 1;
  if (ann.rattrapage) c.ra = 1;
  if (ann.alternance) c.al = 1;
  if (ann.etranger) c.e = indexOf(PAYS, p => p.drapeau === ann.etranger);
  if (ann.equivalence) c.eq = 1;
  if (ann.cesure) c.c = 1;
  if (ann.annexe) c.an = 1;
  return c;
}

function compactSegmentV2(seg: CursusSegment): CompactSegmentV2 {
  const c: CompactSegmentV2 = {
    f: indexOf(FILIERES, f => f.nom === seg.filiere),
    a: seg.annees,
  };
  if (seg.label) c.l = seg.label;
  if (seg.diplome) c.d = 1;
  if (seg.palmeCycle) c.pc = 1;
  if (seg.abandon) c.ab = 1;
  if (seg.annotations) {
    const cann: Record<string, CompactAnnotationV2> = {};
    for (const [k, v] of Object.entries(seg.annotations)) {
      const ca = compactAnnotationV2(v);
      if (Object.keys(ca).length > 0) cann[k] = ca;
    }
    if (Object.keys(cann).length > 0) c.an = cann;
  }
  return c;
}

function compactInsigneV2(ins: Insigne): CompactInsigneV2 {
  const c: CompactInsigneV2 = {
    i: indexOf(INSIGNES_CATALOG, d => d.id === ins.id),
    x: Math.round(ins.position.x * 100),
    y: Math.round(ins.position.y * 100),
  };
  if (ins.annee != null) c.a = ins.annee;
  if (ins.nombreCousu != null && ins.nombreCousu > 0) c.n = ins.nombreCousu;
  return c;
}

function compactFalucheV2(f: Faluche): CompactFalucheV2 {
  const circ = f.circulaire;
  const c: CompactFalucheV2 = {
    v: 2,
    p: f.proprietaire,
    c: {
      s: circ.segments.map(compactSegmentV2),
      b: circ.baptemeIndex,
      i: circ.initiales,
      sn: circ.surnom,
      ab: circ.anneeBac,
      tb: TYPE_BACS.indexOf(circ.typeBac),
      m: circ.moivre === 'public' ? 0 : 1,
      ...(circ.quille ? { q: 1 as const } : {}),
      ...(circ.abeille ? { a: 1 as const } : {}),
    },
    i: f.velours.insignes.map(compactInsigneV2),
    ve: indexOf(VILLES, v => v.nom === f.villeEtude.nom),
  };
  if (f.villeNaissance) c.vn = indexOf(VILLES, v => v.nom === f.villeNaissance!.nom);
  return c;
}

// --- V2 Decode ---

function expandAnnotationV2(ca: CompactAnnotationV2): AnneeAnnotation {
  const a: AnneeAnnotation = {};
  if (ca.r) a.redoublement = true;
  if (ca.m) a.major = true;
  if (ca.ra) a.rattrapage = true;
  if (ca.al) a.alternance = true;
  if (ca.e != null) a.etranger = PAYS[ca.e]?.drapeau ?? '';
  if (ca.eq) a.equivalence = true;
  if (ca.c) a.cesure = true;
  if (ca.an) a.annexe = true;
  return a;
}

function expandSegmentV2(cs: CompactSegmentV2): CursusSegment {
  const filiere = FILIERES[cs.f];
  const seg: CursusSegment = {
    filiere: filiere?.nom ?? 'Sciences',
    couleur: filiere?.couleur ?? '#888888',
    matiere: filiere?.matiere ?? 'satin',
    annees: cs.a,
  };
  if (cs.l) seg.label = cs.l;
  if (cs.d) seg.diplome = true;
  if (cs.pc) seg.palmeCycle = true;
  if (cs.ab) seg.abandon = true;
  if (cs.an) {
    const annotations: Record<number, AnneeAnnotation> = {};
    for (const [k, v] of Object.entries(cs.an)) {
      annotations[Number(k)] = expandAnnotationV2(v);
    }
    seg.annotations = annotations;
  }
  return seg;
}

function expandInsigneV2(ci: CompactInsigneV2): Insigne {
  const def = INSIGNES_CATALOG[ci.i];
  const ins: Insigne = {
    id: def?.id ?? 'unknown',
    label: def?.label ?? 'unknown',
    position: { x: ci.x / 100, y: ci.y / 100 },
  };
  if (def?.svgId) ins.svgId = def.svgId;
  if (def?.defaultRetourne) ins.retourne = true;
  if (ci.a != null) ins.annee = ci.a;
  if (ci.n != null) ins.nombreCousu = ci.n;
  return ins;
}

function expandFalucheV2(cf: CompactFalucheV2): Faluche {
  const villeEtude = VILLES[cf.ve];
  const villeNaissance = cf.vn != null ? VILLES[cf.vn] : undefined;
  return {
    proprietaire: cf.p,
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      segments: cf.c.s.map(expandSegmentV2),
      baptemeIndex: cf.c.b,
      initiales: cf.c.i,
      surnom: cf.c.sn,
      anneeBac: cf.c.ab,
      typeBac: TYPE_BACS[cf.c.tb] ?? 'general',
      moivre: cf.c.m === 0 ? 'public' : 'prive',
      ...(cf.c.q ? { quille: true } : {}),
      ...(cf.c.a ? { abeille: true } : {}),
    },
    velours: {
      rubans: [],
      insignes: cf.i.map(expandInsigneV2),
    },
    villeEtude: villeEtude
      ? { nom: villeEtude.nom, couleurs: villeEtude.couleurs }
      : { nom: 'Amiens', couleurs: ['#CC0000', '#4169E1'] },
    ...(villeNaissance ? {
      villeNaissance: { nom: villeNaissance.nom, couleurs: villeNaissance.couleurs },
      provinceNaissance: (() => {
        const prov = villeNaissance.province;
        // Province couleurs resolved by App.tsx resolveVilleCouleurs
        return { nom: prov, couleurs: ['#888', '#888'] as [string, string] };
      })(),
    } : {}),
  };
}

// --- V1 Decode (legacy) ---

function expandAnnotationV1(ca: CompactAnnotationV1): AnneeAnnotation {
  const a: AnneeAnnotation = {};
  if (ca.r) a.redoublement = true;
  if (ca.m) a.major = true;
  if (ca.ra) a.rattrapage = true;
  if (ca.al) a.alternance = true;
  if (ca.e) a.etranger = ca.e;
  if (ca.eq) a.equivalence = true;
  if (ca.c) a.cesure = true;
  if (ca.an) a.annexe = true;
  return a;
}

function expandSegmentV1(cs: CompactSegmentV1): CursusSegment {
  const filiere = FILIERES.find(f => f.nom === cs.f);
  const seg: CursusSegment = {
    filiere: cs.f,
    couleur: filiere?.couleur ?? '#888888',
    matiere: filiere?.matiere ?? 'satin',
    annees: cs.a,
  };
  if (cs.l) seg.label = cs.l;
  if (cs.d) seg.diplome = true;
  if (cs.pc) seg.palmeCycle = true;
  if (cs.ab) seg.abandon = true;
  if (cs.an) {
    const annotations: Record<number, AnneeAnnotation> = {};
    for (const [k, v] of Object.entries(cs.an)) {
      annotations[Number(k)] = expandAnnotationV1(v);
    }
    seg.annotations = annotations;
  }
  return seg;
}

function expandInsigneV1(ci: CompactInsigneV1): Insigne {
  const def = INSIGNES_CATALOG.find(d => d.id === ci.i);
  const ins: Insigne = {
    id: ci.i,
    label: def?.label ?? ci.i,
    position: { x: ci.x, y: ci.y },
  };
  if (ci.s) ins.svgId = ci.s;
  if (ci.r) ins.retourne = true;
  if (ci.a != null) ins.annee = ci.a;
  if (ci.n != null) ins.nombreCousu = ci.n;
  return ins;
}

function expandFalucheV1(cf: CompactFalucheV1): Faluche {
  return {
    proprietaire: cf.p,
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      segments: cf.c.s.map(expandSegmentV1),
      baptemeIndex: cf.c.b,
      initiales: cf.c.i,
      surnom: cf.c.sn,
      anneeBac: cf.c.ab,
      typeBac: cf.c.tb as Faluche['circulaire']['typeBac'],
      moivre: cf.c.m as 'public' | 'prive',
      ...(cf.c.q ? { quille: true } : {}),
      ...(cf.c.a ? { abeille: true } : {}),
    },
    velours: {
      rubans: [],
      insignes: cf.i.map(expandInsigneV1),
    },
    villeEtude: { nom: cf.ve, couleurs: ['#888', '#888'] },
    ...(cf.vn ? { villeNaissance: { nom: cf.vn, couleurs: ['#888', '#888'] as [string, string] } } : {}),
    ...(cf.pn ? { provinceNaissance: { nom: cf.pn, couleurs: ['#888', '#888'] as [string, string] } } : {}),
  };
}

// --- Compression (deflate-raw via CompressionStream API) ---

async function compress(data: Uint8Array): Promise<Uint8Array> {
  const cs = new CompressionStream('deflate-raw');
  const writer = cs.writable.getWriter();
  writer.write(data as Uint8Array<ArrayBuffer>);
  writer.close();
  const reader = cs.readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

async function decompress(data: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream('deflate-raw');
  const writer = ds.writable.getWriter();
  writer.write(data as Uint8Array<ArrayBuffer>);
  writer.close();
  const reader = ds.readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

// --- Base64url ---

function toBase64url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64url(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// --- Public API ---

export async function encodeFaluche(faluche: Faluche): Promise<string> {
  const compact = compactFalucheV2(faluche);
  const json = JSON.stringify(compact);
  const bytes = new TextEncoder().encode(json);
  const compressed = await compress(bytes);
  return toBase64url(compressed);
}

export async function decodeFaluche(encoded: string): Promise<Faluche> {
  const compressed = fromBase64url(encoded);
  const bytes = await decompress(compressed);
  const json = new TextDecoder().decode(bytes);
  const compact = JSON.parse(json);
  // V2 has a `v` field, V1 does not
  if (compact.v === 2) {
    return expandFalucheV2(compact as CompactFalucheV2);
  }
  return expandFalucheV1(compact as CompactFalucheV1);
}

export function getShareHash(): string | null {
  const hash = window.location.hash;
  if (!hash.startsWith('#f=')) return null;
  return hash.slice(3);
}

export function setShareHash(encoded: string) {
  window.history.replaceState(null, '', `#f=${encoded}`);
}
