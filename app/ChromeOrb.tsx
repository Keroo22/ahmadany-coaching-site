'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export default function ChromeOrb() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.devicePixelRatio < 2, powerPreference: 'low-power' });
    } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, container.clientWidth / container.clientHeight, .1, 30);
    camera.position.z = 5.1;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
    scene.environment = environment;
    const key = new THREE.DirectionalLight(0xf6ffe5, 4.2); key.position.set(-3, 4, 4); scene.add(key);
    const fill = new THREE.PointLight(0xe21b2d, 13, 9); fill.position.set(3, -1, 2); scene.add(fill);
    const rim = new THREE.PointLight(0xe9f2ff, 10, 10); rim.position.set(-4, -2, -2); scene.add(rim);
    const group = new THREE.Group(); scene.add(group);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.16, 96, 96), new THREE.MeshPhysicalMaterial({ color: 0xcad0c6, metalness: .93, roughness: .17, clearcoat: 1, clearcoatRoughness: .12, envMapIntensity: 1.7 }));
    group.add(sphere);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.34, .012, 12, 180), new THREE.MeshBasicMaterial({ color: 0xe21b2d, transparent: true, opacity: .72 }));
    ring.rotation.set(.92, .25, -.25); group.add(ring);
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.39, .004, 8, 160), new THREE.MeshBasicMaterial({ color: 0xf5f6f2, transparent: true, opacity: .42 }));
    innerRing.rotation.set(.92, .25, -.25); group.add(innerRing);
    const pointer = new THREE.Vector2();
    const target = new THREE.Vector2();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let active = true;
    const onPointer = (event: PointerEvent) => { target.x = (event.clientX / window.innerWidth - .5) * .34; target.y = (event.clientY / window.innerHeight - .5) * .24; };
    const resize = new ResizeObserver(() => { if (!container.clientWidth || !container.clientHeight) return; camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); });
    resize.observe(container);
    window.addEventListener('pointermove', onPointer, { passive: true });
    const draw = () => {
      if (!active) return;
      frame = requestAnimationFrame(draw);
      if (!reducedMotion) {
        pointer.lerp(target, .035);
        const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
        group.rotation.y += .0015;
        group.rotation.y += (pointer.x + scroll * .11 - group.rotation.y) * .015;
        group.rotation.x += (-pointer.y + scroll * .06 - group.rotation.x) * .015;
        ring.rotation.z += .001;
      }
      renderer.render(scene, camera);
    };
    draw();
    return () => { active = false; cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('pointermove', onPointer); scene.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); const material = object.material; if (Array.isArray(material)) material.forEach(m => m.dispose()); else material.dispose(); } }); environment.dispose(); pmrem.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={host} className="chrome-orb" aria-hidden="true"/>;
}
