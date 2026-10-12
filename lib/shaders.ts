/** GLSL used by ShaderCanvas. All shaders share the uniform block declared in VERTEX_SHADER's pair. */

export const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const COMMON = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_scroll;
uniform float u_velocity;
uniform float u_enter;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float total = 0.0, amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    total += noise(p) * amplitude;
    p *= 2.02;
    amplitude *= 0.5;
  }
  return total;
}
`;

/** Tidewater: layered caustics over a deep-green lagoon, pushed by pointer and scroll. */
export const TIDE_FRAGMENT = `${COMMON}
void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 p = uv * aspect;
  vec2 pointer = u_mouse * aspect;

  float swell = u_time * 0.045 + u_scroll * 0.6;
  float pull = exp(-distance(p, pointer) * 3.2) * 0.22;

  vec2 drift = vec2(fbm(p * 2.4 + swell), fbm(p * 2.4 - swell + 4.7));
  vec2 warped = p + (drift - 0.5) * (0.34 + pull) + normalize(p - pointer + 0.0001) * pull * 0.5;

  float caustic = 0.0;
  for (int i = 0; i < 3; i++) {
    float layer = float(i) + 1.0;
    vec2 q = warped * (3.2 * layer) + vec2(swell * layer, -swell * layer * 0.6);
    float ridge = 1.0 - abs(sin(q.x + fbm(q)) * cos(q.y - fbm(q.yx)));
    caustic += pow(ridge, 5.0) / layer;
  }
  caustic = clamp(caustic * 0.52, 0.0, 1.0);

  float depth = smoothstep(0.0, 1.0, uv.y + (drift.x - 0.5) * 0.25);
  vec3 deep = vec3(0.047, 0.157, 0.133);
  vec3 shallow = vec3(0.106, 0.286, 0.251);
  vec3 sand = vec3(0.929, 0.859, 0.722);
  vec3 color = mix(deep, shallow, depth);
  color = mix(color, sand, caustic * (0.42 + 0.3 * depth));

  float glint = pow(max(0.0, 1.0 - distance(p, pointer) * 1.6), 3.0);
  color += vec3(0.93, 0.84, 0.66) * glint * 0.22;
  color += vec3(0.08, 0.05, 0.0) * clamp(abs(u_velocity) * 0.012, 0.0, 0.35);

  float vignette = smoothstep(1.25, 0.25, length(uv - 0.5) * 1.6);
  color *= 0.55 + 0.45 * vignette;
  color += (hash(uv * u_resolution + u_time) - 0.5) * 0.035;

  outColor = vec4(color, u_enter);
}`;

/** Sea-glass: a textured plane that ripples away from the pointer with a light chromatic split. */
export const RIPPLE_FRAGMENT = `${COMMON}
uniform sampler2D u_texture;
uniform vec2 u_imageSize;

vec2 cover(vec2 uv, vec2 plane, vec2 image) {
  float planeRatio = plane.x / max(plane.y, 1.0);
  float imageRatio = image.x / max(image.y, 1.0);
  vec2 scale = planeRatio > imageRatio ? vec2(1.0, imageRatio / planeRatio) : vec2(planeRatio / imageRatio, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = cover(v_uv, u_resolution, u_imageSize);
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 p = v_uv * aspect;
  vec2 pointer = u_mouse * aspect;

  float reach = distance(p, pointer);
  float ring = sin(reach * 26.0 - u_time * 2.4) * exp(-reach * 5.0);
  vec2 direction = normalize(p - pointer + 0.0001);

  float grain = fbm(v_uv * 3.0 + u_time * 0.03) - 0.5;
  vec2 offset = direction * ring * 0.022 + vec2(grain) * 0.006;
  offset.y += u_velocity * 0.00022;

  float split = (0.0016 + abs(u_velocity) * 0.00012) * (0.4 + abs(ring) * 2.0);
  float r = texture(u_texture, uv + offset + vec2(split, 0.0)).r;
  float g = texture(u_texture, uv + offset).g;
  float b = texture(u_texture, uv + offset - vec2(split, 0.0)).b;
  vec3 color = vec3(r, g, b);

  color *= 0.93 + ring * 0.16;
  color = mix(color, color * vec3(1.03, 0.99, 0.92), 0.5);
  color += (hash(v_uv * u_resolution + u_time) - 0.5) * 0.028;

  float reveal = smoothstep(0.0, 1.0, u_enter * 1.6 - v_uv.y * 0.6);
  outColor = vec4(color, reveal);
}`;

/** Veil: drifting mist, a soft light that follows the pointer, and fine film grain. Sits over video. */
export const VEIL_FRAGMENT = `${COMMON}
void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 p = uv * aspect;
  vec2 pointer = u_mouse * aspect;

  float drift = u_time * 0.02 + u_scroll * 0.4;
  float mist = fbm(p * 1.6 + vec2(drift, -drift * 0.6));
  mist = smoothstep(0.42, 0.9, mist);

  float light = exp(-distance(p, pointer) * 2.4);
  float sweep = smoothstep(0.0, 1.0, 1.0 - abs(uv.x - fract(u_time * 0.018 + u_scroll * 0.5)) * 3.0);

  float grain = hash(uv * u_resolution + fract(u_time) * 91.7) - 0.5;
  float scan = 0.5 + 0.5 * sin(uv.y * u_resolution.y * 1.2);

  vec3 warm = vec3(1.0, 0.94, 0.84);
  vec3 cool = vec3(0.86, 0.93, 0.94);
  vec3 color = mix(cool, warm, light * 0.8 + sweep * 0.3);
  float alpha = mist * 0.1 + light * 0.1 + sweep * 0.03 + abs(grain) * 0.1 + scan * 0.008;

  outColor = vec4(color + grain * 0.1, alpha * u_enter);
}`;

/** Monsoon: three wind-driven rain planes, with scroll velocity bending the fall. */
export const MONSOON_FRAGMENT = `${COMMON}
void main() {
  vec2 p = v_uv * vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  float rain = 0.0;
  float wind = 0.12 + clamp(u_velocity * 0.003, -0.08, 0.08);
  for (int i = 0; i < 3; i++) {
    float layer = float(i) + 1.0;
    vec2 q = p * vec2(65.0 + layer * 22.0, 7.0 + layer * 3.0);
    q.x += p.y * wind * 45.0;
    q.y += u_time * (2.0 + layer * 0.7);
    vec2 cell = floor(q);
    float seed = hash(vec2(cell.x, layer));
    q.y += seed * 8.0;
    vec2 f = fract(q);
    float streak = (1.0 - smoothstep(0.01, 0.05, abs(f.x - 0.5)))
      * smoothstep(0.05, 0.85, f.y) * (1.0 - smoothstep(0.85, 1.0, f.y));
    rain += streak * step(0.45, seed) / layer;
  }
  float mist = fbm(p * 2.0 + vec2(u_time * 0.025, -u_scroll));
  outColor = vec4(vec3(0.80, 0.90, 0.93), (rain * 0.28 + mist * 0.06) * u_enter);
}`;

/** Architectural glass: straight refractive bands instead of circular water ripples. */
export const GLASS_FRAGMENT = `${COMMON}
uniform sampler2D u_texture;
uniform vec2 u_imageSize;
void main() {
  float planeRatio = u_resolution.x / max(u_resolution.y, 1.0);
  float imageRatio = u_imageSize.x / max(u_imageSize.y, 1.0);
  vec2 fit = planeRatio > imageRatio ? vec2(1.0, imageRatio / planeRatio) : vec2(planeRatio / imageRatio, 1.0);
  vec2 uv = (v_uv - 0.5) * fit + 0.5;
  float focus = exp(-abs(v_uv.x - u_mouse.x) * 9.0);
  float flute = sin(v_uv.x * 110.0 + u_scroll * 2.0) * 0.006 * focus;
  uv.x += flute;
  uv.y += clamp(u_velocity, -15.0, 15.0) * 0.00025 * focus;
  vec3 color = texture(u_texture, clamp(uv, 0.001, 0.999)).rgb;
  color += vec3(0.045, 0.035, 0.025) * focus * (0.5 + 0.5 * cos(v_uv.x * 110.0));
  outColor = vec4(color, u_enter);
}`;
