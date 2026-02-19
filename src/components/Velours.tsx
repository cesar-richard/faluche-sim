import { useState, useCallback } from 'react';
import type { Insigne } from '../data/types';
import { InsignePersonnel } from './InsignesPersonnels';

const INSIGNE_SIZE = 28;

interface VeloursProps {
  cx: number;
  cy: number;
  radius: number;
  insignes: Insigne[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, pos: { x: number; y: number }) => void;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

export function Velours({ cx, cy, radius, insignes, selectedId, onSelect, onMove, svgRef }: VeloursProps) {
  const [dragging, setDragging] = useState<string | null>(null);

  const toNormalized = useCallback((clientX: number, clientY: number): { x: number; y: number } => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgPt = pt.matrixTransform(ctm.inverse());
    let nx = (svgPt.x - cx) / radius;
    let ny = (svgPt.y - cy) / radius;
    // Clamp inside circle
    const dist = Math.sqrt(nx * nx + ny * ny);
    if (dist > 0.85) {
      nx = (nx / dist) * 0.85;
      ny = (ny / dist) * 0.85;
    }
    return { x: nx, y: ny };
  }, [svgRef, cx, cy, radius]);

  function handlePointerDown(e: React.PointerEvent, id: string) {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(id);
    onSelect(id);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const pos = toNormalized(e.clientX, e.clientY);
    onMove(dragging, pos);
  }

  function handlePointerUp() {
    setDragging(null);
  }

  function handleBgClick() {
    onSelect(null);
  }

  return (
    <g
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Black circle */}
      <circle
        cx={cx} cy={cy} r={radius}
        fill="#1a1a1a" stroke="#333" strokeWidth={2}
        onClick={handleBgClick}
      />

      {/* Insignes */}
      {insignes.map((insigne) => {
        const ix = cx + insigne.position.x * radius;
        const iy = cy + insigne.position.y * radius;
        const isSelected = selectedId === insigne.id;
        const isDragging = dragging === insigne.id;

        return (
          <g
            key={insigne.id}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onPointerDown={(e) => handlePointerDown(e, insigne.id)}
          >
            <InsignePersonnel
              id={insigne.id}
              svgId={insigne.svgId}
              retourne={insigne.retourne}
              cx={ix}
              cy={iy}
              size={INSIGNE_SIZE}
              annee={insigne.annee}
              nombreCousu={insigne.nombreCousu}
            />
            {isSelected && (
              <circle
                cx={ix} cy={iy} r={INSIGNE_SIZE * 0.65}
                fill="none" stroke="#60A5FA" strokeWidth={1.5} strokeDasharray="4 3"
              />
            )}
          </g>
        );
      })}
    </g>
  );
}
