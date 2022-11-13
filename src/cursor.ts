import { createPortalElement } from './portal';
import { style } from './style';

let cursor: HTMLDivElement;
let DEFAULT_CURSOR_SIZE: string;
let CursorLockedMode: 'button' | 'select' | 'icon' | false = false;
let CursorHolding = false;

const Cursor = {
  start() {
    if (!document.body) {
      console.warn(`Unable to initialise, document.body does not exist.`);
      return;
    }

    // Inject default style
    document.body.insertAdjacentHTML('afterbegin', style);

    // Create cursor container
    cursor = createPortalElement('cursor');
    document.body.appendChild(cursor);
    cursor.appendChild(createPortalElement('content'));

    DEFAULT_CURSOR_SIZE = cursor.style.getPropertyValue('--height');

    // Initalize the styled cursors
    handleCursorMove();
    handleButtonCursor();
    handleSelectCursor();
    handleIconCursor();
  }
};

const handleCursorReset = () => {
  CursorLockedMode = false;
  cursor.style.setProperty('--translateY', `0px`);
  cursor.style.setProperty('--width', DEFAULT_CURSOR_SIZE);
  cursor.style.setProperty('--height', DEFAULT_CURSOR_SIZE);
};

const handleCursorMove = () => {
  document.addEventListener('mousedown', () => {
    if (!CursorLockedMode) {
      cursor.style.setProperty('--scale', '0.9');
    }
  });

  document.addEventListener('mouseup', () => {
    if (!CursorLockedMode) {
      cursor.style.setProperty('--scale', '1');
    }
  });

  document.addEventListener('mousemove', ({ pageX: x, pageY: y }) => {
    if (CursorLockedMode !== 'button') {
      cursor.style.setProperty('--top', y + 'px');
      cursor.style.setProperty('--left', x + 'px');
    }
  });
};

const handleButtonCursor = () => {
  document.querySelectorAll('button').forEach((btn) => {
    let rect: DOMRect;

    btn.addEventListener(
      'mouseenter',
      (e) => {
        CursorLockedMode = 'button';
        const target = e.target as HTMLElement;
        if (target) {
          rect = target.getBoundingClientRect();

          cursor.classList.add('is-locked', 'locked-mode__button');
          cursor.style.setProperty(
            '--top',
            window.scrollY + rect.top + rect.height / 2 + 'px'
          );
          cursor.style.setProperty(
            '--left',
            window.scrollX + rect.left + rect.width / 2 + 'px'
          );
          cursor.style.setProperty('--width', rect.width + 'px');
          cursor.style.setProperty('--height', rect.height + 'px');

          target.style.setProperty('--scale', '1.05');
        }
      },
      { passive: true }
    );

    btn.addEventListener(
      'mousemove',
      (e) => {
        const target = e.target as HTMLElement;
        if (target) {
          const halfHeight = rect.height / 2;
          const topOffset = (e.y - rect.top - halfHeight) / halfHeight;
          const halfWidth = rect.width / 2;
          const leftOffset = (e.x - rect.left - halfWidth) / halfWidth;

          cursor.style.setProperty('--translateX', `${leftOffset * 3}px`);
          cursor.style.setProperty('--translateY', `${topOffset * 3}px`);

          target.style.setProperty('--translateX', `${leftOffset * 5}px`);
          target.style.setProperty('--translateY', `${topOffset * 3}px`);
        }
      },
      { passive: true }
    );

    btn.addEventListener(
      'mouseleave',
      (e) => {
        CursorLockedMode = false;
        const target = e.target as HTMLElement;
        if (target) {
          cursor.classList.remove('is-locked', 'locked-mode__button');

          cursor.style.setProperty('--width', DEFAULT_CURSOR_SIZE);
          cursor.style.setProperty('--height', DEFAULT_CURSOR_SIZE);
          cursor.style.setProperty('--translateX', '0');
          cursor.style.setProperty('--translateY', '0');

          target.style.setProperty('--translateX', '0');
          target.style.setProperty('--translateY', '0');
          target.style.setProperty('--scale', '1');
        }
      },
      { passive: true }
    );
  });
};

const handleSelectCursor = () => {
  let rect: DOMRect;
  let inRange = false;

  const handleDeSelect = () => {
    handleCursorReset();
    cursor.style.setProperty('--scale', '1');
    cursor.classList.remove('locked-mode__select');
  };

  const selectorList = ['p', 'input'];

  document.querySelectorAll(selectorList.join(',')).forEach((p) => {
    p.addEventListener(
      'mouseenter',
      (e) => {
        CursorLockedMode = 'select';
        inRange = true;
        const target = e.target as HTMLElement;
        cursor.classList.add('locked-mode__select');
        if (target) {
          rect = target.getBoundingClientRect();
        }
      },
      { passive: true }
    );

    p.addEventListener(
      'mousedown',
      (e) => {
        if (CursorLockedMode === 'select') {
          CursorHolding = true;
          cursor.style.setProperty('--scale', '0.8');
        }
      },
      {
        passive: true
      }
    );

    p.addEventListener('mouseup', () => {
      cursor.style.setProperty('--scale', '1');
    });

    p.addEventListener(
      'mousemove',
      (e: any) => {
        const halfHeight = rect.height / 2;
        const topOffset = (e.y - rect.top - halfHeight) / halfHeight;

        cursor.style.setProperty('--translateY', `${-topOffset * 5 + 0.7}px`);
        cursor.style.setProperty('--width', '0.2em');
        cursor.style.setProperty('--height', '1.5em');
      },
      { passive: true }
    );

    p.addEventListener(
      'mouseleave',
      () => {
        inRange = false;
        if (CursorHolding) return;
        handleDeSelect();
      },
      { passive: true }
    );

    document.addEventListener('mouseup', () => {
      if (CursorLockedMode === 'select') {
        CursorHolding = false;
        if (!inRange) handleDeSelect();
      }
    });
  });
};

const handleIconCursor = () => {
  document.querySelectorAll('#icon').forEach((icon) => {
    let rect: DOMRect;

    icon.addEventListener(
      'mouseenter',
      (e) => {
        CursorLockedMode = 'icon';
        const target = e.target as HTMLElement;
        if (target) {
          rect = target.getBoundingClientRect();

          cursor.classList.add('locked-mode__icon');
          cursor.style.setProperty('--top', rect.top + rect.height / 2 + 'px');
          cursor.style.setProperty('--left', rect.left + rect.width / 2 + 'px');
          // cursor.style.setProperty('--width', rect.width + 'px');
          // cursor.style.setProperty('--height', rect.height + 'px');
          // cursor.style.opacity = '0';

          target.style.setProperty('--scale', '1.1');
        }
      },
      { passive: true }
    );

    icon.addEventListener(
      'mousemove',
      (e: any) => {
        const target = e.target as HTMLElement;
        if (target) {
          const halfHeight = rect.height / 2;
          const topOffset = (e.y - rect.top - halfHeight) / halfHeight;
          const halfWidth = rect.width / 2;
          const leftOffset = (e.x - rect.left - halfWidth) / halfWidth;

          cursor.style.setProperty('--translateX', `${leftOffset * 3}px`);
          cursor.style.setProperty('--translateY', `${topOffset * 3}px`);

          target.style.setProperty('--translateX', `${leftOffset * 5}px`);
          target.style.setProperty('--translateY', `${topOffset * 3}px`);
        }
      },
      { passive: true }
    );

    icon.addEventListener(
      'mouseleave',
      (e) => {
        CursorLockedMode = false;
        const target = e.target as HTMLElement;
        if (target) {
          cursor.classList.remove('locked-mode__icon');

          cursor.style.setProperty('--width', DEFAULT_CURSOR_SIZE);
          cursor.style.setProperty('--height', DEFAULT_CURSOR_SIZE);
          cursor.style.setProperty('--translateX', '0');
          cursor.style.setProperty('--translateY', '0');

          target.style.setProperty('--translateX', '0');
          target.style.setProperty('--translateY', '0');
          target.style.setProperty('--scale', '1');
          // cursor.style.opacity = '1';
        }
      },
      { passive: true }
    );
  });
};

export default Cursor;
