/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

// import { useEffect, useRef, useState } from "react";

// const defaultParams = {
//   patternScale: 2,
//   refraction: 0.015,
//   edge: 1,
//   patternBlur: 0.005,
//   liquid: 0.07,
//   speed: 0.3,
// };

// export function parseLogoImage(file) {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   return new Promise((resolve, reject) => {
//     if (!file || !ctx) {
//       reject(new Error("Invalid file or context"));
//       return;
//     }

//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = function () {
//       const MAX_SIZE = 1000;
//       let width = img.naturalWidth || MAX_SIZE;
//       let height = img.naturalHeight || MAX_SIZE;

//       if (width > MAX_SIZE || height > MAX_SIZE) {
//         if (width > height) {
//           height = Math.round((height * MAX_SIZE) / width);
//           width = MAX_SIZE;
//         } else {
//           width = Math.round((width * MAX_SIZE) / height);
//           height = MAX_SIZE;
//         }
//       }

//       canvas.width = width;
//       canvas.height = height;
//       ctx.drawImage(img, 0, 0, width, height);

//       const imageData = ctx.getImageData(0, 0, width, height);
//       canvas.toBlob((blob) => {
//         if (!blob) return reject(new Error("Failed to create PNG blob"));
//         resolve({ imageData, pngBlob: blob });
//       }, "image/png");
//     };

//     img.onerror = () => reject(new Error("Failed to load image"));
//     img.src = URL.createObjectURL(file);
//   });
// }


// export default function MetallicPaint({ imageData, params = defaultParams }) {
//   const canvasRef = useRef(null);
//   const [gl, setGl] = useState(null);
//   const [uniforms, setUniforms] = useState({});
//   const totalAnimationTime = useRef(0);
//   const lastRenderTime = useRef(0);

//   // Initialize WebGL + shaders
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const glCtx = canvas?.getContext("webgl2", { antialias: true, alpha: true });
//     if (!glCtx) return;

//     function createShader(gl, src, type) {
//       const shader = gl.createShader(type);
//       gl.shaderSource(shader, src);
//       gl.compileShader(shader);
//       if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         console.error(gl.getShaderInfoLog(shader));
//         gl.deleteShader(shader);
//         return null;
//       }
//       return shader;
//     }

//     const vShader = createShader(glCtx, vertexShaderSource, glCtx.VERTEX_SHADER);
//     const fShader = createShader(glCtx, liquidFragSource, glCtx.FRAGMENT_SHADER);
//     const program = glCtx.createProgram();
//     glCtx.attachShader(program, vShader);
//     glCtx.attachShader(program, fShader);
//     glCtx.linkProgram(program);

//     if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
//       console.error(glCtx.getProgramInfoLog(program));
//       return;
//     }

//     glCtx.useProgram(program);

//     const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
//     const buffer = glCtx.createBuffer();
//     glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buffer);
//     glCtx.bufferData(glCtx.ARRAY_BUFFER, verts, glCtx.STATIC_DRAW);

//     const posLoc = glCtx.getAttribLocation(program, "a_position");
//     glCtx.enableVertexAttribArray(posLoc);
//     glCtx.vertexAttribPointer(posLoc, 2, glCtx.FLOAT, false, 0, 0);

//     const uniformMap = {};
//     const uniformCount = glCtx.getProgramParameter(program, glCtx.ACTIVE_UNIFORMS);
//     for (let i = 0; i < uniformCount; i++) {
//       const name = glCtx.getActiveUniform(program, i)?.name;
//       if (name) uniformMap[name] = glCtx.getUniformLocation(program, name);
//     }

//     setGl(glCtx);
//     setUniforms(uniformMap);
//   }, []);

//   // Update uniforms when params or imageData changes
//   useEffect(() => {
//     if (!gl || !uniforms || !imageData) return;
//     gl.uniform1f(uniforms.u_edge, params.edge);
//     gl.uniform1f(uniforms.u_patternBlur, params.patternBlur);
//     gl.uniform1f(uniforms.u_patternScale, params.patternScale);
//     gl.uniform1f(uniforms.u_refraction, params.refraction);
//     gl.uniform1f(uniforms.u_liquid, params.liquid);
//     gl.uniform1f(uniforms.u_time, 0);

//     // Set ratios
//     const canvasEl = canvasRef.current;
//     const imgRatio = imageData.width / imageData.height;
//     gl.uniform1f(uniforms.u_img_ratio, imgRatio);
//     gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);

//     // Upload texture
//     const tex = gl.createTexture();
//     gl.activeTexture(gl.TEXTURE0);
//     gl.bindTexture(gl.TEXTURE_2D, tex);
//     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//     gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
//     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, imageData.width, imageData.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imageData.data);
//     gl.uniform1i(uniforms.u_image_texture, 0);
//   }, [gl, uniforms, params, imageData]);

//   // Render loop
//   useEffect(() => {
//     if (!gl || !uniforms) return;
//     let frameId;
//     function render(time) {
//       const dt = time - lastRenderTime.current;
//       lastRenderTime.current = time;
//       totalAnimationTime.current += dt * params.speed;
//       gl.uniform1f(uniforms.u_time, totalAnimationTime.current);
//       gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
//       frameId = requestAnimationFrame(render);
//     }
//     lastRenderTime.current = performance.now();
//     frameId = requestAnimationFrame(render);
//     return () => cancelAnimationFrame(frameId);
//   }, [gl, uniforms, params.speed]);

//   // Resize handling
//   useEffect(() => {
//     function resize() {
//       const canvasEl = canvasRef.current;
//       if (!canvasEl || !gl) return;
//       canvasEl.width = canvasEl.clientWidth * window.devicePixelRatio;
//       canvasEl.height = canvasEl.clientHeight * window.devicePixelRatio;
//       gl.viewport(0, 0, canvasEl.width, canvasEl.height);
//     }
//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, [gl]);

//   return <canvas ref={canvasRef} className="block w-full h-full" />;
// }

import { useEffect, useRef } from "react";


export const defaultParams = {
  patternScale: 2,
  refraction: 0.015,
  edge: 1,
  patternBlur: 0.005,
  liquid: 0.07,
  speed: 0.3,
};
const vertexShaderSource = `#version 300 es
precision mediump float;

in vec2 a_position;
out vec2 vUv;

void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const liquidFragSource = `#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_patternScale;
uniform float u_refraction;
uniform float u_edge;
uniform float u_patternBlur;
uniform float u_liquid;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
    m = m*m;
    m = m*m;
    vec3 x = 2. * fract(p * C.www) - 1.;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130. * dot(m, g);
}

vec2 get_img_uv() {
    vec2 img_uv = vUv;
    img_uv -= .5;
    if (u_ratio > u_img_ratio) {
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;
    } else {
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;
    }
    float scale_factor = 1.;
    img_uv *= scale_factor;
    img_uv += .5;
    img_uv.y = 1. - img_uv.y;
    return img_uv;
}
vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {
    float ch = c2;
    float border = 0.;
    float blur = u_patternBlur + extra_blur;
    ch = mix(ch, c1, smoothstep(.0, blur, stripe_p));
    border = w[0];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));
    b = smoothstep(.2, .8, b);
    border = w[0] + .4 * (1. - b) * w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));
    border = w[0] + .5 * (1. - b) * w[1];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));
    border = w[0] + w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));
    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
    float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));
    return ch;
}
float get_img_frame_alpha(vec2 uv, float img_frame_width) {
    float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);
    img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);
    return img_frame_alpha;
}
void main() {
    vec2 uv = vUv;
    uv.y = 1. - uv.y;
    uv.x *= u_ratio;
    float diagonal = uv.x - uv.y;
    float t = .001 * u_time;
    vec2 img_uv = get_img_uv();
    vec4 img = texture(u_image_texture, img_uv);
    vec3 color = vec3(0.);
    float opacity = 1.;
    vec3 color1 = vec3(.98, 0.98, 1.);
    vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, uv.x + uv.y));
    float edge = img.r;
    vec2 grad_uv = uv;
    grad_uv -= .5;
    float dist = length(grad_uv + vec2(0., .2 * diagonal));
    grad_uv = rotate(grad_uv, (.25 - .2 * diagonal) * PI);
    float bulge = pow(1.8 * dist, 1.2);
    bulge = 1. - bulge;
    bulge *= pow(uv.y, .3);
    float cycle_width = u_patternScale;
    float thin_strip_1_ratio = .12 / cycle_width * (1. - .4 * bulge);
    float thin_strip_2_ratio = .07 / cycle_width * (1. + .4 * bulge);
    float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);
    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;
    opacity = 1. - smoothstep(.9 - .5 * u_edge, 1. - .5 * u_edge, edge);
    opacity *= get_img_frame_alpha(img_uv, 0.01);
    float noise = snoise(uv - t);
    edge += (1. - edge) * u_liquid * noise;
    float refr = 0.;
    refr += (1. - bulge);
    refr = clamp(refr, 0., 1.);
    float dir = grad_uv.x;
    dir += diagonal;
    dir -= 2. * noise * diagonal * (smoothstep(0., 1., edge) * smoothstep(1., 0., edge));
    bulge *= clamp(pow(uv.y, .1), .3, 1.);
    dir *= (.1 + (1.1 - edge) * bulge);
    dir *= smoothstep(1., .7, edge);
    dir += .18 * (smoothstep(.1, .2, uv.y) * smoothstep(.4, .2, uv.y));
    dir += .03 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));
    dir *= (.5 + .5 * pow(uv.y, 2.));
    dir *= cycle_width;
    dir -= t;
    float refr_r = refr;
    refr_r += .03 * bulge * noise;
    float refr_b = 1.3 * refr;
    refr_r += 5. * (smoothstep(-.1, .2, uv.y) * smoothstep(.5, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(1., .4, bulge));
    refr_r -= diagonal;
    refr_b += (smoothstep(0., .4, uv.y) * smoothstep(.8, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(.8, .4, bulge));
    refr_b -= .2 * edge;
    refr_r *= u_refraction;
    refr_b *= u_refraction;
    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
    w[1] -= .02 * smoothstep(.0, 1., edge + bulge);
    float stripe_r = mod(dir + refr_r, 1.);
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + .03 * u_refraction * bulge, bulge);
    float stripe_g = mod(dir, 1.);
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1. - diagonal), bulge);
    float stripe_b = mod(dir - refr_b, 1.);
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, .01, bulge);
    color = vec3(r, g, b);
    color *= opacity;
    fragColor = vec4(color, opacity);
}
`;
export async function parseLogoImage(file) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  return new Promise((resolve, reject) => {
    if (!file || !ctx) {
      reject(new Error("Invalid file or context"));
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      const MAX_SIZE = 1000;
      const MIN_SIZE = 500;
      let width = img.naturalWidth || MAX_SIZE;
      let height = img.naturalHeight || MAX_SIZE;

      if (width > MAX_SIZE || height > MAX_SIZE || width < MIN_SIZE || height < MIN_SIZE) {
        if (width > height) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Failed to create PNG blob"));
        resolve({ imageData, pngBlob: blob });
      });
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function MetallicPaint({ imageData, params }) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    glRef.current = gl;

    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, liquidFragSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      imageData
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    textureRef.current = tex;

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    function render(time) {
      time *= 0.001; // ms to seconds
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // You can set uniforms here if needed:
      // gl.uniform1f(gl.getUniformLocation(program, "u_time"), time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationRef.current = requestAnimationFrame(render);
    }

    animationRef.current = requestAnimationFrame(render);

    function resize() {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resize);
    resize();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [imageData, params]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}
