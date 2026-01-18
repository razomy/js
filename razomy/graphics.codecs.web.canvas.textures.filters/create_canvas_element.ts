export function createCanvasElement(): HTMLCanvasElement {
  var canvas = document.createElement('canvas');
  // on some environments canvas.style is readonly
  try {
    (<any>canvas).style = canvas.style || {};
  } catch (e) {
    throw new Error('Canva tyle is rreadonly');
  }
  return canvas as HTMLCanvasElement;
}

