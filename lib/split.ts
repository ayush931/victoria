/**
 * DOM text splitting for GSAP, without a plugin. Walks text nodes only, so nested
 * markup (<em>, <span>, <br>) survives, and returns a revert that restores the
 * original markup — which has to run before React next touches the element.
 */
export type Split = { targets: HTMLElement[]; revert: () => void };

export function splitText(element: HTMLElement, mode: 'chars' | 'words'): Split {
  const original = element.innerHTML;
  const probe = element.cloneNode(true) as HTMLElement;
  probe.querySelectorAll('br').forEach(lineBreak => lineBreak.replaceWith(' '));
  const label = (probe.textContent ?? '').replace(/\s+/g, ' ').trim();
  const targets: HTMLElement[] = [];

  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        if (!text.trim()) continue;
        const fragment = document.createDocumentFragment();
        for (const part of text.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { const space = document.createElement('span'); space.className = 'vx-space'; space.textContent = ' '; space.setAttribute('aria-hidden', 'true'); fragment.appendChild(space); continue; }
          const word = document.createElement('span');
          word.className = 'vx-w';
          word.setAttribute('aria-hidden', 'true');
          if (mode === 'chars') {
            for (const character of Array.from(part)) {
              const unit = document.createElement('span');
              unit.className = 'vx-c';
              unit.textContent = character;
              word.appendChild(unit);
              targets.push(unit);
            }
          } else {
            const unit = document.createElement('span');
            unit.className = 'vx-c';
            unit.textContent = part;
            word.appendChild(unit);
            targets.push(unit);
          }
          fragment.appendChild(word);
        }
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    }
  };

  element.setAttribute('aria-label', label);
  walk(element);
  return {
    targets,
    revert: () => { element.innerHTML = original; element.removeAttribute('aria-label'); },
  };
}

/** Scrambles an element's text into place. Restores the exact original on completion. */
const GLYPHS = '/\\_+-=0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
export function scramble(element: HTMLElement, duration = 0.9) {
  const original = element.textContent ?? '';
  const start = performance.now();
  let frame = 0;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / (duration * 1000));
    const settled = Math.floor(t * original.length);
    let out = '';
    for (let index = 0; index < original.length; index += 1) {
      const character = original[index];
      out += index < settled || character === ' ' ? character : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    element.textContent = out;
    if (t < 1) frame = requestAnimationFrame(tick);
    else element.textContent = original;
  };
  frame = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(frame); element.textContent = original; };
}
