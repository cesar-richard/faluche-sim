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

// --- V3 format (arrays + bitmasks) ---
// Top-level: { v:3, p, c, i, e, n? }
//   c (circulaire): [segments[], baptemeIdx, initiales, surnom, anneeBac, typeBacIdx, flags]
//     flags: bit0=moivrePrive, bit1=quille, bit2=abeille
//   segment: [filiereIdx, annees] or [filiereIdx, annees, label] or [..., label, flags] or [..., flags, ...annotations]
//     flags: bit0=diplome, bit1=palmeCycle, bit2=abandon
//     annotation: [yearIdx, bitmask] or [yearIdx, bitmask, paysIdx]
//       bitmask: bit0=redoublement, bit1=major, bit2=rattrapage, bit3=alternance, bit4=equivalence, bit5=cesure, bit6=annexe
//   insigne: [catalogIdx, x, y] or [catalogIdx, x, y, annee] or [catalogIdx, x, y, annee, nombreCousu]

type V3Annotation = [number, number] | [number, number, number];
type V3Segment = [number, number, ...unknown[]]; // [fIdx, annees, label?, flags?, ...annotations?]
type V3Insigne = [number, number, number, ...number[]]; // [catIdx, x, y, annee?, n?]
type V3Circulaire = [V3Segment[], number, string, string, number, number, number];

interface CompactFalucheV3 {
  v: 3;
  p: string;
  c: V3Circulaire;
  i: V3Insigne[];
  e: number;       // villeEtude index
  n?: number;      // villeNaissance index
}

// --- V3 Encode ---

const ANN_BITS = ['redoublement', 'major', 'rattrapage', 'alternance', 'equivalence', 'cesure', 'annexe'] as const;
const SEG_BITS = ['diplome', 'palmeCycle', 'abandon'] as const;

function encodeAnnotationV3(yearIdx: number, ann: AnneeAnnotation): V3Annotation {
  let bitmask = 0;
  for (let i = 0; i < ANN_BITS.length; i++) {
    if (ann[ANN_BITS[i]]) bitmask |= (1 << i);
  }
  if (ann.etranger) {
    return [yearIdx, bitmask, indexOf(PAYS, p => p.drapeau === ann.etranger)];
  }
  return [yearIdx, bitmask];
}

function encodeSegmentV3(seg: CursusSegment): V3Segment {
  const fIdx = indexOf(FILIERES, f => f.nom === seg.filiere);
  let flags = 0;
  for (let i = 0; i < SEG_BITS.length; i++) {
    if (seg[SEG_BITS[i]]) flags |= (1 << i);
  }

  const annotations: V3Annotation[] = [];
  if (seg.annotations) {
    for (const [k, v] of Object.entries(seg.annotations)) {
      annotations.push(encodeAnnotationV3(Number(k), v));
    }
  }

  // Variable-length: omit trailing empty fields
  if (annotations.length > 0) return [fIdx, seg.annees, seg.label ?? '', flags, ...annotations];
  if (flags > 0) return [fIdx, seg.annees, seg.label ?? '', flags];
  if (seg.label) return [fIdx, seg.annees, seg.label];
  return [fIdx, seg.annees];
}

function encodeInsigneV3(ins: Insigne): V3Insigne {
  const catIdx = indexOf(INSIGNES_CATALOG, d => d.id === ins.id);
  const x = Math.round(ins.position.x * 100);
  const y = Math.round(ins.position.y * 100);
  if (ins.rubanBizut) return [catIdx, x, y, ins.annee ?? 0, ins.nombreCousu ?? 0, 1];
  if (ins.nombreCousu != null && ins.nombreCousu > 0) return [catIdx, x, y, ins.annee ?? 0, ins.nombreCousu];
  if (ins.annee != null) return [catIdx, x, y, ins.annee];
  return [catIdx, x, y];
}

function encodeFalucheV3(f: Faluche): CompactFalucheV3 {
  const circ = f.circulaire;
  let circFlags = 0;
  if (circ.moivre === 'prive') circFlags |= 1;
  if (circ.quille) circFlags |= 2;
  if (circ.abeille) circFlags |= 4;

  const result: CompactFalucheV3 = {
    v: 3,
    p: f.proprietaire,
    c: [
      circ.segments.map(encodeSegmentV3),
      circ.baptemeIndex,
      circ.initiales,
      circ.surnom,
      circ.anneeBac,
      TYPE_BACS.indexOf(circ.typeBac),
      circFlags,
    ],
    i: f.velours.insignes.map(encodeInsigneV3),
    e: indexOf(VILLES, v => v.nom === f.villeEtude.nom),
  };
  if (f.villeNaissance) result.n = indexOf(VILLES, v => v.nom === f.villeNaissance!.nom);
  return result;
}

// --- V3 Decode ---

function decodeAnnotationV3(arr: V3Annotation): [number, AnneeAnnotation] {
  const [yearIdx, bitmask] = arr;
  const ann: AnneeAnnotation = {};
  for (let i = 0; i < ANN_BITS.length; i++) {
    if (bitmask & (1 << i)) (ann as Record<string, unknown>)[ANN_BITS[i]] = true;
  }
  if (arr.length > 2) ann.etranger = PAYS[arr[2] as number]?.drapeau ?? '';
  return [yearIdx, ann];
}

function decodeSegmentV3(arr: V3Segment): CursusSegment {
  const [fIdx, annees] = arr;
  const filiere = FILIERES[fIdx as number];
  const seg: CursusSegment = {
    filiere: filiere?.nom ?? 'Sciences',
    couleur: filiere?.couleur ?? '#888888',
    matiere: filiere?.matiere ?? 'satin',
    annees: annees as number,
  };

  const label = arr[2] as string | undefined;
  if (label) seg.label = label;

  const flags = (arr[3] as number) ?? 0;
  if (flags & 1) seg.diplome = true;
  if (flags & 2) seg.palmeCycle = true;
  if (flags & 4) seg.abandon = true;

  // Remaining elements are annotations
  if (arr.length > 4) {
    const annotations: Record<number, AnneeAnnotation> = {};
    for (let i = 4; i < arr.length; i++) {
      const [yearIdx, ann] = decodeAnnotationV3(arr[i] as V3Annotation);
      annotations[yearIdx] = ann;
    }
    seg.annotations = annotations;
  }
  return seg;
}

function decodeInsigneV3(arr: V3Insigne): Insigne {
  const [catIdx, x, y] = arr;
  const def = INSIGNES_CATALOG[catIdx];
  const ins: Insigne = {
    id: def?.id ?? 'unknown',
    label: def?.label ?? 'unknown',
    position: { x: x / 100, y: y / 100 },
  };
  if (def?.svgId) ins.svgId = def.svgId;
  if (def?.defaultRetourne) ins.retourne = true;
  if (arr.length > 3) ins.annee = arr[3];
  if (arr.length > 4) ins.nombreCousu = arr[4];
  if (arr.length > 5 && arr[5]) ins.rubanBizut = true;
  return ins;
}

function decodeFalucheV3(cf: CompactFalucheV3): Faluche {
  const [segments, baptemeIdx, initiales, surnom, anneeBac, typeBacIdx, circFlags] = cf.c;
  const villeEtude = VILLES[cf.e];
  const villeNaissance = cf.n != null ? VILLES[cf.n] : undefined;

  return {
    proprietaire: cf.p,
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      segments: segments.map(decodeSegmentV3),
      baptemeIndex: baptemeIdx,
      initiales,
      surnom,
      anneeBac,
      typeBac: TYPE_BACS[typeBacIdx] ?? 'general',
      moivre: (circFlags & 1) ? 'prive' : 'public',
      ...((circFlags & 2) ? { quille: true } : {}),
      ...((circFlags & 4) ? { abeille: true } : {}),
    },
    velours: {
      rubans: [],
      insignes: cf.i.map(decodeInsigneV3),
    },
    villeEtude: villeEtude
      ? { nom: villeEtude.nom, couleurs: villeEtude.couleurs }
      : { nom: 'Amiens', couleurs: ['#CC0000', '#4169E1'] },
    ...(villeNaissance ? {
      villeNaissance: { nom: villeNaissance.nom, couleurs: villeNaissance.couleurs },
      provinceNaissance: { nom: villeNaissance.province, couleurs: ['#888', '#888'] as [string, string] },
    } : {}),
  };
}

// --- V1 types (legacy, decode only) ---

interface CompactFalucheV1 {
  p: string;
  c: { s: { f: string; a: number; l?: string; an?: Record<string, CompactAnnotationV1>; d?: 1; pc?: 1; ab?: 1 }[]; b: number; i: string; sn: string; ab: number; tb: string; m: string; q?: 1; a?: 1 };
  i: { i: string; s?: string; r?: 1; x: number; y: number; a?: number; n?: number }[];
  ve: string;
  vn?: string;
  pn?: string;
}
interface CompactAnnotationV1 { r?: 1; m?: 1; ra?: 1; al?: 1; e?: string; eq?: 1; c?: 1; an?: 1 }

function expandFalucheV1(cf: CompactFalucheV1): Faluche {
  return {
    proprietaire: cf.p,
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      segments: cf.c.s.map(cs => {
        const filiere = FILIERES.find(f => f.nom === cs.f);
        const seg: CursusSegment = { filiere: cs.f, couleur: filiere?.couleur ?? '#888888', matiere: filiere?.matiere ?? 'satin', annees: cs.a };
        if (cs.l) seg.label = cs.l;
        if (cs.d) seg.diplome = true;
        if (cs.pc) seg.palmeCycle = true;
        if (cs.ab) seg.abandon = true;
        if (cs.an) {
          const annotations: Record<number, AnneeAnnotation> = {};
          for (const [k, v] of Object.entries(cs.an)) {
            const a: AnneeAnnotation = {};
            if (v.r) a.redoublement = true; if (v.m) a.major = true; if (v.ra) a.rattrapage = true;
            if (v.al) a.alternance = true; if (v.e) a.etranger = v.e; if (v.eq) a.equivalence = true;
            if (v.c) a.cesure = true; if (v.an) a.annexe = true;
            annotations[Number(k)] = a;
          }
          seg.annotations = annotations;
        }
        return seg;
      }),
      baptemeIndex: cf.c.b, initiales: cf.c.i, surnom: cf.c.sn, anneeBac: cf.c.ab,
      typeBac: cf.c.tb as TypeBac, moivre: cf.c.m as 'public' | 'prive',
      ...(cf.c.q ? { quille: true } : {}), ...(cf.c.a ? { abeille: true } : {}),
    },
    velours: {
      rubans: [],
      insignes: cf.i.map(ci => {
        const def = INSIGNES_CATALOG.find(d => d.id === ci.i);
        const ins: Insigne = { id: ci.i, label: def?.label ?? ci.i, position: { x: ci.x, y: ci.y } };
        if (ci.s) ins.svgId = ci.s; if (ci.r) ins.retourne = true;
        if (ci.a != null) ins.annee = ci.a; if (ci.n != null) ins.nombreCousu = ci.n;
        return ins;
      }),
    },
    villeEtude: { nom: cf.ve, couleurs: ['#888', '#888'] },
    ...(cf.vn ? { villeNaissance: { nom: cf.vn, couleurs: ['#888', '#888'] as [string, string] } } : {}),
    ...(cf.pn ? { provinceNaissance: { nom: cf.pn, couleurs: ['#888', '#888'] as [string, string] } } : {}),
  };
}

// --- V2 types (legacy, decode only) ---

interface CompactFalucheV2 {
  v: 2;
  p: string;
  c: { s: { f: number; a: number; l?: string; an?: Record<string, CompactAnnotationV2>; d?: 1; pc?: 1; ab?: 1 }[]; b: number; i: string; sn: string; ab: number; tb: number; m: number; q?: 1; a?: 1 };
  i: { i: number; x: number; y: number; a?: number; n?: number }[];
  ve: number;
  vn?: number;
}
interface CompactAnnotationV2 { r?: 1; m?: 1; ra?: 1; al?: 1; e?: number; eq?: 1; c?: 1; an?: 1 }

function expandFalucheV2(cf: CompactFalucheV2): Faluche {
  const villeEtude = VILLES[cf.ve];
  const villeNaissance = cf.vn != null ? VILLES[cf.vn] : undefined;
  return {
    proprietaire: cf.p,
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      segments: cf.c.s.map(cs => {
        const filiere = FILIERES[cs.f];
        const seg: CursusSegment = { filiere: filiere?.nom ?? 'Sciences', couleur: filiere?.couleur ?? '#888888', matiere: filiere?.matiere ?? 'satin', annees: cs.a };
        if (cs.l) seg.label = cs.l;
        if (cs.d) seg.diplome = true; if (cs.pc) seg.palmeCycle = true; if (cs.ab) seg.abandon = true;
        if (cs.an) {
          const annotations: Record<number, AnneeAnnotation> = {};
          for (const [k, v] of Object.entries(cs.an)) {
            const a: AnneeAnnotation = {};
            if (v.r) a.redoublement = true; if (v.m) a.major = true; if (v.ra) a.rattrapage = true;
            if (v.al) a.alternance = true; if (v.e != null) a.etranger = PAYS[v.e]?.drapeau ?? '';
            if (v.eq) a.equivalence = true; if (v.c) a.cesure = true; if (v.an) a.annexe = true;
            annotations[Number(k)] = a;
          }
          seg.annotations = annotations;
        }
        return seg;
      }),
      baptemeIndex: cf.c.b, initiales: cf.c.i, surnom: cf.c.sn, anneeBac: cf.c.ab,
      typeBac: TYPE_BACS[cf.c.tb] ?? 'general', moivre: cf.c.m === 0 ? 'public' : 'prive',
      ...(cf.c.q ? { quille: true } : {}), ...(cf.c.a ? { abeille: true } : {}),
    },
    velours: {
      rubans: [],
      insignes: cf.c.s.length === 0 ? [] : cf.i.map(ci => {
        const def = INSIGNES_CATALOG[ci.i];
        const ins: Insigne = { id: def?.id ?? 'unknown', label: def?.label ?? 'unknown', position: { x: ci.x / 100, y: ci.y / 100 } };
        if (def?.svgId) ins.svgId = def.svgId; if (def?.defaultRetourne) ins.retourne = true;
        if (ci.a != null) ins.annee = ci.a; if (ci.n != null) ins.nombreCousu = ci.n;
        return ins;
      }),
    },
    villeEtude: villeEtude ? { nom: villeEtude.nom, couleurs: villeEtude.couleurs } : { nom: 'Amiens', couleurs: ['#CC0000', '#4169E1'] },
    ...(villeNaissance ? {
      villeNaissance: { nom: villeNaissance.nom, couleurs: villeNaissance.couleurs },
      provinceNaissance: { nom: villeNaissance.province, couleurs: ['#888', '#888'] as [string, string] },
    } : {}),
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
  const compact = encodeFalucheV3(faluche);
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
  if (compact.v === 3) return decodeFalucheV3(compact as CompactFalucheV3);
  if (compact.v === 2) return expandFalucheV2(compact as CompactFalucheV2);
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
