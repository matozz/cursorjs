export const style = `
<style>
*,
*:hover {
  cursor: none;
}

button {
  border: none;
  background-color: transparent;
  color: #007aff;
  font-size: 1em;
  display: inline-block;
  padding: 0.6em 0.8em;
  position: relative;
  text-decoration: none;
  -webkit-transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));
          transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));
  -webkit-transition-duration: 0.1s;
          transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-out;
          transition-timing-function: ease-out;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  transition-property: opacity, transform, -webkit-transform;
  z-index: 1;
  --scale: 1;
  --translateX: 0;
  --translateY: 0;
}

button:not(:hover) {
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  transition-property: transform, opacity;
  transition-property: transform, opacity, -webkit-transform;
}

button:active {
  opacity: 0.5;
  -webkit-transform: translate(var(--translateX), var(--translateY)) scale(1);
          transform: translate(var(--translateX), var(--translateY)) scale(1);
}

#icon {
  -webkit-transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));
          transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));
  -webkit-transition-duration: 0.1s;
          transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-out;
          transition-timing-function: ease-out;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  transition-property: opacity, transform, -webkit-transform;
}

.cursor-js {
  height: var(--height);
  left: var(--left);
  pointer-events: none;
  top: var(--top);
  -webkit-transform: translate(-50%, -50%) scale(var(--scale));
          transform: translate(-50%, -50%) scale(var(--scale));
  -webkit-transition-property: width, height;
  transition-property: width, height, opacity;
  width: var(--width);
  --top: -1em;
  --left: -1em;
  --width: 1em;
  --height: 1em;
  --scale: 1;
  --translateX: 0;
  --translateY: 0;
}

.cursor-js.is-locked {
  -webkit-transition-property: width, height, left, top;
  transition-property: width, height, left, top, opacity;
}

.cursor-js.is-locked .cursor-js__content {
  opacity: 0.06;
}

.cursor-js, .cursor-js__content {
  position: absolute;
  -webkit-transition-duration: 0.2s;
          transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-out;
          transition-timing-function: ease-out;
}

.cursor-js__content {
  background-color: #000;
  border-radius: 0.6em;
  bottom: 0;
  left: 0;
  opacity: 0.3;
  right: 0;
  top: 0;
  -webkit-transform: translate(var(--translateX), var(--translateY));
          transform: translate(var(--translateX), var(--translateY));
  -webkit-transition-property: 'opacity';
  transition-property: 'opacity';
}
</style>
`;
