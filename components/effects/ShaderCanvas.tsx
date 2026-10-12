"use client";
import { useEffect, useRef, useState } from 'react';
import { VERTEX_SHADER } from '@/lib/shaders';

type Props = {
  fragment: string;
  /** Optional image sampled as u_texture (required by RIPPLE_FRAGMENT). */
  image?: string;
  className?: string;
  /** Pointer tracking area: the canvas itself, or the whole window. */
  pointer?: 'element' | 'window';
  /** Upper bound on device pixel ratio — shaders are fill-rate bound. */
  maxDpr?: number;
};

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== 'production') console.warn('[shader]', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * A GLSL surface. GSAP's ticker drives the clock, ScrollTrigger feeds u_scroll/u_velocity,
 * and the whole thing is skipped for reduced motion or when WebGL2 is unavailable —
 * whatever sits behind the canvas stays the fallback.
 */
export default function ShaderCanvas({ fragment, image, className = '', pointer = 'element', maxDpr = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!motion.matches) return;
    canvas.style.opacity = '0';

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    // getContext hands back the same context on a remount, so every async callback below
    // has to check this before touching objects a previous cleanup may have deleted.
    let disposed = false;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    if (!vertex || !fragmentShader || !program) {
      if (vertex) gl.deleteShader(vertex);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (process.env.NODE_ENV !== 'production') console.warn('[shader]', gl.getProgramInfoLog(program));
      gl.deleteShader(vertex); gl.deleteShader(fragmentShader); gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uResolution = uniform('u_resolution');
    const uMouse = uniform('u_mouse');
    const uTime = uniform('u_time');
    const uScroll = uniform('u_scroll');
    const uVelocity = uniform('u_velocity');
    const uEnter = uniform('u_enter');
    const uTexture = uniform('u_texture');
    const uImageSize = uniform('u_imageSize');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let textureReady = !image;
    let contextLost = false;
    let texture: WebGLTexture | null = null;
    if (image) {
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([200, 196, 180, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      if (uTexture) gl.uniform1i(uTexture, 0);
      if (uImageSize) gl.uniform2f(uImageSize, 1, 1);
      const bitmap = new Image();
      bitmap.crossOrigin = 'anonymous';
      bitmap.decoding = 'async';
      bitmap.src = image;
      void bitmap.decode().then(() => {
        if (disposed) return;
        gl.useProgram(program);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
        if (uImageSize) gl.uniform2f(uImageSize, bitmap.naturalWidth, bitmap.naturalHeight);
        textureReady = true;
      }).catch(() => {});
    }

    const state = { mouse: [0.5, 0.5], target: [0.5, 0.5], scroll: 0, velocity: 0, enter: 0, visible: false, width: 0, height: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (width === state.width && height === state.height) return;
      state.width = width; state.height = height;
      canvas.width = width; canvas.height = height;
      gl.viewport(0, 0, width, height);
      if (uResolution) gl.uniform2f(uResolution, width, height);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      state.target = [Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)), Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height))];
    };
    const target = pointer === 'window' ? window : (canvas.parentElement ?? canvas);
    target.addEventListener('pointermove', move as EventListener, { passive: true });

    const observer = new IntersectionObserver(entries => { state.visible = entries[0]?.isIntersecting ?? false; }, { rootMargin: '120px' });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let cleanupMotion: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: canvas,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => { state.scroll = self.progress; state.velocity = Math.max(-20, Math.min(20, self.getVelocity() / 100)); },
      });

      let lastDraw = 0;
      const render = (time: number) => {
        if (time - lastDraw < 1 / 30) return;
        lastDraw = time;
        if (disposed || contextLost || !textureReady || !motion.matches || !state.visible || document.hidden) return;
        canvas.style.opacity = '1';
        gl.useProgram(program);
        state.mouse[0] += (state.target[0] - state.mouse[0]) * 0.08;
        state.mouse[1] += (state.target[1] - state.mouse[1]) * 0.08;
        state.enter += (1 - state.enter) * 0.04;
        state.velocity *= 0.94;
        if (uTime) gl.uniform1f(uTime, time);
        if (uMouse) gl.uniform2f(uMouse, state.mouse[0], state.mouse[1]);
        if (uScroll) gl.uniform1f(uScroll, state.scroll);
        if (uVelocity) gl.uniform1f(uVelocity, state.velocity);
        if (uEnter) gl.uniform1f(uEnter, state.enter);
        if (texture) { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture); }
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      gsap.ticker.add(render);
      cleanupMotion = () => { gsap.ticker.remove(render); trigger.kill(); };
    })();

    const lost = (event: Event) => { event.preventDefault(); contextLost = true; canvas.style.opacity = '0'; };
    const restored = () => setGeneration(value => value + 1);
    const preference = () => { if (!motion.matches) canvas.style.opacity = '0'; };
    motion.addEventListener('change', preference);
    canvas.addEventListener('webglcontextlost', lost);
    canvas.addEventListener('webglcontextrestored', restored);

    return () => {
      disposed = true;
      cleanupMotion?.();
      observer.disconnect();
      resizeObserver.disconnect();
      target.removeEventListener('pointermove', move as EventListener);
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.removeEventListener('webglcontextrestored', restored);
      motion.removeEventListener('change', preference);
      if (texture) gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragmentShader);
      // Deliberately not loseContext(): getContext returns the same context for this
      // canvas, so losing it would leave a remount (StrictMode, Fast Refresh) with a
      // dead context and nothing on screen.
    };
  }, [fragment, image, pointer, maxDpr, generation]);

  return <canvas ref={canvasRef} className={`shader-canvas ${className}`} aria-hidden="true" />;
}
