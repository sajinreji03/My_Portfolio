'use client';
/* eslint-disable react/no-unknown-property */
import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo } from 'react';

import * as THREE from 'three';

import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';

/**
 * extendMaterial: keep the same approach but ensure uniforms are plain { value: ... } objects,
 * and return a ShaderMaterial that can be disposed later.
 */
function extendMaterial(BaseMaterial, cfg) {
  const physical = THREE.ShaderLib.physical;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = physical.defines ?? {};

  const uniforms = THREE.UniformsUtils.clone(baseUniforms);

  const defaults = new BaseMaterial(cfg.material || {});

  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap;
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;

  // convert incoming cfg.uniforms into proper { value: ... } objects
  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] = u !== null && typeof u === 'object' && 'value' in u ? u : { value: u };
  });

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ''}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ''}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}\n${code}`);
  }
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}\n${code}`);
  }

  const mat = new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog,
    // enable vertex colors, transparent if user needs it etc - keep minimal for now
  });

  return mat;
}

const CanvasWrapper = ({ children, dpr = [1, 1.5], frameloop = 'always' }) => (
  <Canvas dpr={dpr} frameloop={frameloop} className="w-full h-full relative" gl={{ antialias: true }}>
    {children}
  </Canvas>
);

const hexToNormalizedRGB = hex => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

const noise = `
// (noise GLSL unchanged) ...
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

const Beams = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = '#ffffff',
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
  // new prop for segments (reduce to improve perf)
  heightSegments = 30,
  dpr = [1, 1.5],
  frameloop = 'always'
}) => {
  const meshRef = useRef(null);
  const beamMaterial = useMemo(
    () =>
      extendMaterial(THREE.MeshStandardMaterial, {
        header: `
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${noise}`,
        vertexHeader: `
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,
        fragmentHeader: '',
        vertex: {
          '#include <begin_vertex>': `transformed.z += getPos(transformed.xyz);`,
          '#include <beginnormal_vertex>': `objectNormal = getNormal(position.xyz);`
        },
        fragment: {
          '#include <dithering_fragment>': `
    float randomNoise = random(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15.0 * uNoiseIntensity;`
        },
        material: { fog: true },
        uniforms: {
          diffuse: new THREE.Color(...hexToNormalizedRGB('#000000')),
          time: { value: 0 },
          roughness: 0.3,
          metalness: 0.3,
          uSpeed: { value: speed },
          envMapIntensity: 1.0,
          uNoiseIntensity: { value: noiseIntensity },
          uScale: { value: scale }
        }
      }),
    // re-create material when these change
    [speed, noiseIntensity, scale]
  );

  return (
    <CanvasWrapper dpr={dpr} frameloop={frameloop}>
      <group rotation={[0, 0, degToRad(rotation)]}>
        <PlaneNoise
          ref={meshRef}
          material={beamMaterial}
          count={beamNumber}
          width={beamWidth}
          height={beamHeight}
          heightSegments={heightSegments}
        />
        <DirLight color={lightColor} position={[0, 3, 10]} />
      </group>
      <ambientLight intensity={1} />
      <color attach="background" args={['#000000']} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
    </CanvasWrapper>
  );
};

/**
 * Safely create BufferGeometry for stacked planes. Uses Uint16Array where possible.
 */
function createStackedPlanesBufferGeometry(n, width, height, spacing, heightSegments) {
  const geometry = new THREE.BufferGeometry();
  const vertsPerPlane = (heightSegments + 1) * 2; // two vertices per row
  const numVertices = n * vertsPerPlane;
  const numFaces = n * heightSegments * 2; // two quads per row -> 2 triangles per quad
  const positions = new Float32Array(numVertices * 3);
  const uvs = new Float32Array(numVertices * 2);

  // choose index type based on vertex count
  const indicesCount = numFaces * 3;
  let indexArray;
  if (numVertices > 65535) {
    indexArray = new Uint32Array(indicesCount);
  } else {
    indexArray = new Uint16Array(indicesCount);
  }

  let vertexOffset = 0;
  let indexOffset = 0;
  let uvOffset = 0;
  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    // smaller random offsets are fine; avoid huge UV offsets that produce precision issues
    const uvXOffset = Math.random() * 10.0;
    const uvYOffset = Math.random() * 10.0;

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      const v0x = xOffset;
      const v0y = y;
      const v0z = 0;
      const v1x = xOffset + width;
      const v1y = y;
      const v1z = 0;

      positions[vertexOffset * 3 + 0] = v0x;
      positions[vertexOffset * 3 + 1] = v0y;
      positions[vertexOffset * 3 + 2] = v0z;

      positions[vertexOffset * 3 + 3] = v1x;
      positions[vertexOffset * 3 + 4] = v1y;
      positions[vertexOffset * 3 + 5] = v1z;

      const uvY = j / heightSegments;
      uvs[uvOffset + 0] = uvXOffset;
      uvs[uvOffset + 1] = uvY + uvYOffset;
      uvs[uvOffset + 2] = uvXOffset + 1;
      uvs[uvOffset + 3] = uvY + uvYOffset;

      if (j < heightSegments) {
        const a = vertexOffset;
        const b = vertexOffset + 1;
        const c = vertexOffset + 2;
        const d = vertexOffset + 3;
        // triangles: a,b,c and c,b,d
        indexArray[indexOffset + 0] = a;
        indexArray[indexOffset + 1] = b;
        indexArray[indexOffset + 2] = c;
        indexArray[indexOffset + 3] = c;
        indexArray[indexOffset + 4] = b;
        indexArray[indexOffset + 5] = d;
        indexOffset += 6;
      }
      vertexOffset += 2;
      uvOffset += 4;
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));
  geometry.computeVertexNormals();
  return geometry;
}

const MergedPlanes = forwardRef(({ material, width, count, height, heightSegments = 30 }, ref) => {
  const mesh = useRef(null);
  useImperativeHandle(ref, () => mesh.current);

  const geometry = useMemo(
    () => createStackedPlanesBufferGeometry(count, width, height, 0, heightSegments),
    [count, width, height, heightSegments]
  );

  // update time uniform safely, with null checks and a small throttle
  const last = useRef(0);
  useFrame((_, delta) => {
    if (!mesh.current || !mesh.current.material || !mesh.current.material.uniforms) return;
    // throttle update a bit (avoid huge uniform writes on low-power devices)
    last.current += delta;
    if (last.current > 0.016) {
      // increment time (smaller multiplier reduces stress)
      mesh.current.material.uniforms.time.value += 0.08 * last.current;
      last.current = 0;
    }
  });

  // cleanup geometry/material on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      try {
        geometry.dispose?.();
        // material might be shared externally; avoid disposing if caller still uses it
        // but if it's unique, it's safe to dispose here if you created it inside this module.
        // Do not forcibly dispose external shared materials.
      } catch (e) {
        // ignore disposal errors
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  return <mesh ref={mesh} geometry={geometry} material={material} />;
});
MergedPlanes.displayName = 'MergedPlanes';

const PlaneNoise = forwardRef((props, ref) => (
  <MergedPlanes
    ref={ref}
    material={props.material}
    width={props.width}
    count={props.count}
    height={props.height}
    heightSegments={props.heightSegments}
  />
));
PlaneNoise.displayName = 'PlaneNoise';

const DirLight = ({ position, color }) => {
  const dir = useRef(null);
  useEffect(() => {
    if (!dir.current) return;
    const cam = dir.current.shadow?.camera;
    if (!cam) return;
    cam.top = 24;
    cam.bottom = -24;
    cam.left = -24;
    cam.right = 24;
    cam.far = 64;
    dir.current.shadow.bias = -0.004;
  }, []);
  return <directionalLight ref={dir} color={color} intensity={1} position={position} castShadow />;
};

export default Beams;
