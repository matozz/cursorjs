import { PortalTypes } from './type';

export function createPortalElement(
  type: PortalTypes,
  options?: Partial<CSSStyleDeclaration>
): HTMLDivElement {
  let portal: HTMLDivElement = document.createElement('div');
  if (type == 'cursor') {
    portal.classList.add(`cursor-js`);
    for (const key in options) {
      portal.style[key] = options[key];
    }
    return portal;
  } else {
    portal.classList.add(`cursor-js__${type}`);
    for (const key in options) {
      portal.style[key] = options[key];
    }
    return portal;
  }
}
