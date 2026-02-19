import type { Faluche, CursusSegment, AnneeAnnotation, Insigne } from '../data/types';
import { FILIERES } from '../data/filieres';
import { INSIGNES_CATALOG } from '../data/insignes';

// --- Compact representation types (short keys to minimize size) ---

interface CompactFaluche {
  p: string;                          // proprietaire
  c: CompactCirculaire;
  i: CompactInsigne[];                // insignes
  ve: string;                         // villeEtude nom
  vn?: string;                        // villeNaissance nom
  pn?: string;                        // provinceNaissance nom
}

interface CompactCirculaire {
  s: CompactSegment[];
  b: number;                          // baptemeIndex
  i: string;                          // initiales
  sn: string;                         // surnom
  ab: number;                         // anneeBac
  tb: string;                         // typeBac
  m: string;                          // moivre
  q?: 1;                              // quille
  a?: 1;                              // abeille
}

interface CompactSegment {
  f: string;                          // filiere name (couleur+matiere derived)
  a: number;                          // annees
  l?: string;                         // label
  an?: Record<string, CompactAnnotation>;
  d?: 1;                              // diplome
  pc?: 1;                             // palmeCycle
  ab?: 1;                             // abandon
}

interface CompactAnnotation {
  r?: 1;   // redoublement
  m?: 1;   // major
  ra?: 1;  // rattrapage
  al?: 1;  // alternance
  e?: string; // etranger
  eq?: 1;  // equivalence
  c?: 1;   // cesure
  an?: 1;  // annexe
}

interface CompactInsigne {
  i: string;                          // id
  s?: string;                         // svgId
  r?: 1;                              // retourne
  x: number;                          // position.x (rounded)
  y: number;                          // position.y (rounded)
  a?: number;                         // annee
  n?: number;                         // nombreCousu
}

// --- Encode ---

function compactAnnotation(ann: AnneeAnnotation): CompactAnnotation {
  const c: CompactAnnotation = {};
  if (ann.redoublement) c.r = 1;
  if (ann.major) c.m = 1;
  if (ann.rattrapage) c.ra = 1;
  if (ann.alternance) c.al = 1;
  if (ann.etranger) c.e = ann.etranger;
  if (ann.equivalence) c.eq = 1;
  if (ann.cesure) c.c = 1;
  if (ann.annexe) c.an = 1;
  return c;
}

function compactSegment(seg: CursusSegment): CompactSegment {
  const c: CompactSegment = { f: seg.filiere, a: seg.annees };
  if (seg.label) c.l = seg.label;
  if (seg.diplome) c.d = 1;
  if (seg.palmeCycle) c.pc = 1;
  if (seg.abandon) c.ab = 1;
  if (seg.annotations) {
    const cann: Record<string, CompactAnnotation> = {};
    for (const [k, v] of Object.entries(seg.annotations)) {
      const ca = compactAnnotation(v);
      if (Object.keys(ca).length > 0) cann[k] = ca;
    }
    if (Object.keys(cann).length > 0) c.an = cann;
  }
  return c;
}

function compactInsigne(ins: Insigne): CompactInsigne {
  const c: CompactInsigne = {
    i: ins.id,
    x: Math.round(ins.position.x * 100) / 100,
    y: Math.round(ins.position.y * 100) / 100,
  };
  if (ins.svgId) c.s = ins.svgId;
  if (ins.retourne) c.r = 1;
  if (ins.annee != null) c.a = ins.annee;
  if (ins.nombreCousu != null && ins.nombreCousu > 0) c.n = ins.nombreCousu;
  return c;
}

function compactFaluche(f: Faluche): CompactFaluche {
  const circ = f.circulaire;
  const c: CompactFaluche = {
    p: f.proprietaire,
    c: {
      s: circ.segments.map(compactSegment),
      b: circ.baptemeIndex,
      i: circ.initiales,
      sn: circ.surnom,
      ab: circ.anneeBac,
      tb: circ.typeBac,
      m: circ.moivre,
      ...(circ.quille ? { q: 1 as const } : {}),
      ...(circ.abeille ? { a: 1 as const } : {}),
    },
    i: f.velours.insignes.map(compactInsigne),
    ve: f.villeEtude.nom,
  };
  if (f.villeNaissance) c.vn = f.villeNaissance.nom;
  if (f.provinceNaissance) c.pn = f.provinceNaissance.nom;
  return c;
}

// --- Decode ---

function expandAnnotation(ca: CompactAnnotation): AnneeAnnotation {
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

function expandSegment(cs: CompactSegment): CursusSegment {
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
      annotations[Number(k)] = expandAnnotation(v);
    }
    seg.annotations = annotations;
  }
  return seg;
}

function expandInsigne(ci: CompactInsigne): Insigne {
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

function expandFaluche(cf: CompactFaluche): Faluche {
  // Ville/province lookups are done by the caller via handleLoad migration
  // Here we just reconstruct the structure with nom only (couleurs filled by App)
  return {
    proprietaire: cf.p,
    ville: 'amiens',
    dateCreation: new Date().toISOString(),
    circulaire: {
      segments: cf.c.s.map(expandSegment),
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
      insignes: cf.i.map(expandInsigne),
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
  writer.write(data);
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
  writer.write(data);
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
  const compact = compactFaluche(faluche);
  const json = JSON.stringify(compact);
  const bytes = new TextEncoder().encode(json);
  const compressed = await compress(bytes);
  return toBase64url(compressed);
}

export async function decodeFaluche(encoded: string): Promise<Faluche> {
  const compressed = fromBase64url(encoded);
  const bytes = await decompress(compressed);
  const json = new TextDecoder().decode(bytes);
  const compact = JSON.parse(json) as CompactFaluche;
  return expandFaluche(compact);
}

export function getShareHash(): string | null {
  const hash = window.location.hash;
  if (!hash.startsWith('#f=')) return null;
  return hash.slice(3);
}

export function setShareHash(encoded: string) {
  window.history.replaceState(null, '', `#f=${encoded}`);
}
