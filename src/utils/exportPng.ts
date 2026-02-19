const SCALE = 2; // 2x for retina quality

/**
 * Export an SVG element as a PNG file and trigger a download.
 *
 * The function clones the SVG to avoid mutating the displayed element,
 * serializes it, renders it onto a canvas at 2x resolution, and downloads
 * the resulting PNG blob.
 */
export async function exportSvgAsPng(
  svgElement: SVGSVGElement,
  filename: string,
): Promise<void> {
  // Read the viewBox to determine intrinsic dimensions
  const viewBox = svgElement.viewBox.baseVal;
  const width = viewBox.width || svgElement.clientWidth;
  const height = viewBox.height || svgElement.clientHeight;

  // Clone the SVG so we don't mutate the one in the DOM
  const clone = svgElement.cloneNode(true) as SVGSVGElement;

  // Ensure the clone has proper XML namespace and explicit dimensions
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));

  // Remove any CSS class that controls sizing via Tailwind
  clone.removeAttribute('class');

  // Serialize to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);

  // Build a Blob and object URL
  const svgBlob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(svgBlob);

  try {
    const pngBlob = await renderSvgBlobToPng(url, width, height);
    triggerDownload(pngBlob, filename);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function renderSvgBlobToPng(
  svgUrl: string,
  width: number,
  height: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width * SCALE;
      canvas.height = height * SCALE;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas 2D context'));
        return;
      }
      ctx.scale(SCALE, SCALE);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('canvas.toBlob returned null'));
        }
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('Failed to load SVG as image'));
    img.src = svgUrl;
  });
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
