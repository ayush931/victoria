"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box3DIcon } from "@/components/ui/Icons";

type LightingMode = "golden" | "noon" | "twilight";
type LayerFocus = "all" | "roof" | "balcao" | "pool";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyThree = any;

export default function VillaViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [lighting, setLighting] = useState<LightingMode>("golden");
  const [activeLayer, setActiveLayer] = useState<LayerFocus>("all");
  const [is3DActive, setIs3DActive] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // References to dynamic 3D elements for layer isolation
  const roofGroupRef = useRef<AnyThree>(null);
  const balcaoGroupRef = useRef<AnyThree>(null);
  const poolGroupRef = useRef<AnyThree>(null);
  const bodyGroupRef = useRef<AnyThree>(null);

  useEffect(() => {
    let renderer: AnyThree = null;
    let scene: AnyThree = null;
    let camera: AnyThree = null;
    let animId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let villaRoot: AnyThree = null;
    let waterMesh: AnyThree = null;
    let dirLight: AnyThree = null;
    let hemiLight: AnyThree = null;
    let interiorGlow: AnyThree = null;
    let targetZoom = 29;
    let currentZoom = 29;
    let cleanup: (() => void) | undefined;

    import("three")
      .then((THREE) => {
        if (!containerRef.current || !canvasMountRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(
          lighting === "twilight" ? 0x09140f : lighting === "golden" ? 0xf5eee4 : 0xfcfaf7
        );

        camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
        camera.position.set(18, 13, 22);
        camera.lookAt(0, 3.1, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        const mountNode = canvasMountRef.current;
        if (!mountNode) return;
        mountNode.innerHTML = "";
        mountNode.appendChild(renderer.domElement);

        // --- Atmospheric Lighting ---
        hemiLight = new THREE.HemisphereLight(
          lighting === "golden" ? 0xffdfba : lighting === "twilight" ? 0x90caf9 : 0xffffff,
          lighting === "twilight" ? 0x0c1a14 : 0x2d3a30,
          lighting === "twilight" ? 0.7 : 0.85
        );
        scene.add(hemiLight);

        dirLight = new THREE.DirectionalLight(
          lighting === "golden" ? 0xffab40 : lighting === "twilight" ? 0x82b1ff : 0xfff8e7,
          lighting === "twilight" ? 0.8 : lighting === "golden" ? 2.1 : 1.9
        );
        dirLight.position.set(16, 22, 12);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.bias = -0.0005;
        scene.add(dirLight);

        // --- Villa Root Hierarchy ---
        villaRoot = new THREE.Group();

        // 1. Foundation Base & Terrace Plinth
        const baseGeo = new THREE.BoxGeometry(13.5, 0.8, 11);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0xdfd7cb,
          roughness: 0.88,
          metalness: 0.05,
        });
        const basePlinth = new THREE.Mesh(baseGeo, baseMat);
        basePlinth.position.y = 0.4;
        basePlinth.receiveShadow = true;
        villaRoot.add(basePlinth);

        // Pale stone path and stepping slabs connect the garden to the balcão.
        const pathMat = new THREE.MeshStandardMaterial({ color: 0xc8bca5, roughness: 0.93 });
        for (let i = 0; i < 8; i++) {
          const slab = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.11, 0.72), pathMat);
          slab.position.set(2.2 + (i % 2) * 0.25, 0.86, 5.9 + i * 0.82);
          slab.rotation.y = (i % 2 ? -0.08 : 0.06);
          slab.castShadow = true; slab.receiveShadow = true; villaRoot.add(slab);
        }

        // Raised garden beds with low tropical planting frame the approach.
        const planterMat = new THREE.MeshStandardMaterial({ color: 0x987b5d, roughness: 0.94 });
        const soilMat = new THREE.MeshStandardMaterial({ color: 0x40382a, roughness: 1 });
        const leafMats = [0x476344, 0x647a4d, 0x87905c, 0x345843].map((color) => new THREE.MeshStandardMaterial({ color, roughness: 0.88, side: THREE.DoubleSide }));
        const planterPositions = [[-5.55, 2.8], [5.45, 2.8], [-5.5, -5.2], [5.6, -5.1]];
        planterPositions.forEach(([px, pz], bedIndex) => {
          const box = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.45, 3.0), planterMat);
          box.position.set(px, 1.025, pz); box.castShadow = true; box.receiveShadow = true; villaRoot.add(box);
          const soil = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.08, 2.8), soilMat);
          soil.position.set(px, 1.28, pz); villaRoot.add(soil);
          for (let i = 0; i < 13; i++) {
            const x = px + Math.sin(i * 12.2 + bedIndex) * 0.43;
            const z = pz - 1.2 + i * 0.2;
            const plant = new THREE.Group();
            for (let leaf = 0; leaf < 5; leaf++) {
              const blade = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.72 + (leaf % 2) * 0.18, 5), leafMats[(leaf + i) % leafMats.length]);
              blade.position.y = 0.42; blade.rotation.z = -0.45 + leaf * 0.22; blade.rotation.y = leaf * 1.25; blade.castShadow = true; plant.add(blade);
            }
            plant.position.set(x, 1.33, z); villaRoot.add(plant);
          }
        });

        // 2. Body Group (Red Laterite & Ochre Plaster Walls)
        const bodyGroup = new THREE.Group();
        bodyGroupRef.current = bodyGroup;

        // Porous Goan Red Laterite Wall Block
        const lateriteGeo = new THREE.BoxGeometry(4.2, 3.8, 5.8);
        const lateriteMat = new THREE.MeshStandardMaterial({
          color: 0x9b4936, // authentic Goan ferruginous red laterite
          roughness: 0.92,
          metalness: 0.05,
        });
        const lateriteWing = new THREE.Mesh(lateriteGeo, lateriteMat);
        lateriteWing.position.set(-3.2, 2.7, -0.6);
        lateriteWing.castShadow = true;
        lateriteWing.receiveShadow = true;
        bodyGroup.add(lateriteWing);

        const jointMat = new THREE.MeshStandardMaterial({ color: 0x63382e, roughness: 1 });
        for (let row = 0; row < 8; row++) {
          const y = 0.95 + row * 0.48;
          const joint = new THREE.Mesh(new THREE.BoxGeometry(4.22, 0.025, 5.82), jointMat);
          joint.position.set(-3.2, y, -0.6); bodyGroup.add(joint);
          for (let col = 0; col < 7; col++) {
            const seam = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.47, 0.02), jointMat);
            seam.position.set(-5.15 + col * 0.63 + (row % 2) * 0.3, y + 0.23, 2.32); bodyGroup.add(seam);
          }
        }

        // Sun-Washed Portuguese Ochre Living Hall
        const ochreGeo = new THREE.BoxGeometry(5.8, 4.4, 5.2);
        const ochreMat = new THREE.MeshStandardMaterial({
          color: 0xd49b44, // traditional Fontainhas / Goan ochre
          roughness: 0.85,
        });
        const ochreHall = new THREE.Mesh(ochreGeo, ochreMat);
        ochreHall.position.set(1.5, 3.0, -0.9);
        ochreHall.castShadow = true;
        ochreHall.receiveShadow = true;
        bodyGroup.add(ochreHall);

        // Mother-of-Pearl Oyster Shell Windows (Carepas)
        const oysterMat = new THREE.MeshPhysicalMaterial({ color: 0xf1dfba, emissive: 0x8e6031, emissiveIntensity: 0.12, roughness: 0.24, metalness: 0.08, transmission: 0.15, thickness: 0.12 });
        const frameMat = new THREE.MeshStandardMaterial({ color: 0xe9d8bd, roughness: 0.74 });

        // Window frames on Laterite & Ochre wings
        for (let x = -4.5; x <= 3.5; x += 2.2) {
          const winGeo = new THREE.BoxGeometry(1.2, 1.8, 0.15);
          const win = new THREE.Mesh(winGeo, oysterMat);
          win.position.set(x, 2.8, 1.72);
          bodyGroup.add(win);
          const frame = new THREE.Mesh(new THREE.BoxGeometry(1.42, 2.02, 0.18), frameMat);
          frame.position.set(x, 2.8, 1.82); bodyGroup.add(frame);
          const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.8, 0.06), new THREE.MeshStandardMaterial({ color: 0x513624, roughness: 0.56 }));
          mullion.position.set(x, 2.8, 1.92); bodyGroup.add(mullion);
        }

        // Interior Candlelight Glow
        interiorGlow = new THREE.PointLight(0xffa726, lighting === "twilight" ? 3.5 : 2.0, 14);
        interiorGlow.position.set(1.5, 3.2, -0.5);
        bodyGroup.add(interiorGlow);

        villaRoot.add(bodyGroup);

        // 3. Portuguese Balcão Veranda Group
        const balcaoGroup = new THREE.Group();
        balcaoGroupRef.current = balcaoGroup;

        // Balcão Porch Plinth with built-in stone benches (Sofa de Pedra)
        const porchFloorGeo = new THREE.BoxGeometry(7.2, 0.3, 3.2);
        const porchFloorMat = new THREE.MeshStandardMaterial({
          color: 0xc87352, // Goan red terracotta oxide floor
          roughness: 0.75,
        });
        const porchFloor = new THREE.Mesh(porchFloorGeo, porchFloorMat);
        porchFloor.position.set(1.2, 0.95, 2.8);
        porchFloor.receiveShadow = true;
        balcaoGroup.add(porchFloor);

        // Stone Benching (Sofa de Pedra) around edge
        const benchMat = new THREE.MeshStandardMaterial({
          color: 0xe8e2d5,
          roughness: 0.85,
        });
        const benchL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 3.0), benchMat);
        benchL.position.set(-2.2, 1.3, 2.8);
        benchL.castShadow = true;
        balcaoGroup.add(benchL);

        const benchR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 3.0), benchMat);
        benchR.position.set(4.6, 1.3, 2.8);
        benchR.castShadow = true;
        balcaoGroup.add(benchR);

        // Classical Portuguese Pillars (Columns supporting Balcão roof)
        const pillarMat = new THREE.MeshStandardMaterial({
          color: 0xfaf6ee,
          roughness: 0.6,
        });

        const pillarPositions = [
          [-2.1, 1.4],
          [0.2, 1.4],
          [2.4, 1.4],
          [4.5, 1.4],
          [-2.1, 4.2],
          [4.5, 4.2],
        ];

        pillarPositions.forEach(([px, pz]) => {
          const colGeo = new THREE.CylinderGeometry(0.12, 0.16, 2.8, 12);
          const col = new THREE.Mesh(colGeo, pillarMat);
          col.position.set(px, 2.4, pz);
          col.castShadow = true;
          balcaoGroup.add(col);
        });

        // Balcão Overhanging Eaves Roof
        const balcaoRoofGeo = new THREE.BoxGeometry(7.6, 0.35, 3.6);
        const balcaoRoofMat = new THREE.MeshStandardMaterial({
          color: 0xb84a39, // Mangalore clay tile red
          roughness: 0.85,
        });
        const balcaoRoof = new THREE.Mesh(balcaoRoofGeo, balcaoRoofMat);
        balcaoRoof.position.set(1.2, 3.9, 2.8);
        balcaoRoof.rotation.x = 0.08;
        balcaoRoof.castShadow = true;
        balcaoGroup.add(balcaoRoof);

        // A teak dining set gives the veranda a human scale and lived-in feel.
        const furnitureWood = new THREE.MeshStandardMaterial({ color: 0x705035, roughness: 0.58 });
        const tabletop = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.12, 0.95), furnitureWood);
        tabletop.position.set(1.2, 1.82, 2.5); tabletop.castShadow = true; balcaoGroup.add(tabletop);
        for (const x of [0.55, 1.85]) for (const z of [2.18, 2.82]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.82, 0.09), furnitureWood);
          leg.position.set(x, 1.39, z); balcaoGroup.add(leg);
        }
        for (const chairX of [-0.1, 2.5]) {
          const seat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.65), furnitureWood);
          seat.position.set(chairX, 1.38, 2.5); balcaoGroup.add(seat);
          const back = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.8, 0.1), furnitureWood);
          back.position.set(chairX, 1.78, chairX < 1 ? 2.8 : 2.2); balcaoGroup.add(back);
        }
        const lanternMat = new THREE.MeshStandardMaterial({ color: 0xd49b44, emissive: 0xffb84d, emissiveIntensity: 0.35, roughness: 0.3 });
        for (const [lx, lz] of [[-2.1, 2.8], [4.5, 2.8]]) {
          const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.36, 0.22), lanternMat);
          lantern.position.set(lx, 2.9, lz); balcaoGroup.add(lantern);
          const glow = new THREE.PointLight(0xffb65a, 0.32, 3); glow.position.set(lx, 2.9, lz); balcaoGroup.add(glow);
        }

        villaRoot.add(balcaoGroup);

        // 4. Mangalore Tiled Gable Roof Group (Sloping pitched roof)
        const roofGroup = new THREE.Group();
        roofGroupRef.current = roofGroup;

        const tileMat = new THREE.MeshStandardMaterial({
          color: 0xb84a39, // authentic Goan terracotta Mangalore clay tile
          roughness: 0.88,
        });

        // Sloping Gable Roof Planes
        const makeGable = (cx: number, cz: number, halfWidth: number, length: number, eaveY: number, rise: number) => {
          for (const side of [-1, 1]) {
            const plane = new THREE.Mesh(new THREE.BoxGeometry(halfWidth * 2.3, 0.18, length), tileMat);
            plane.position.set(cx + side * halfWidth * 0.52, eaveY + rise * 0.5, cz);
            plane.rotation.z = side * Math.atan2(rise, halfWidth); plane.castShadow = true; plane.receiveShadow = true; roofGroup.add(plane);
            for (let row = 0; row < 7; row++) for (let col = 0; col < Math.floor(length / 0.42); col++) {
              const tile = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.07, 0.56), new THREE.MeshStandardMaterial({ color: (row + col) % 5 === 0 ? 0x9d4033 : (row + col) % 3 === 0 ? 0xc15a40 : 0xb34b39, roughness: 0.84 }));
              tile.position.set(cx + side * (0.3 + row * halfWidth / 7), eaveY + rise * (0.08 + row / 8) + 0.18, cz - length / 2 + 0.3 + col * 0.42);
              tile.rotation.z = side * Math.atan2(rise, halfWidth); tile.castShadow = true; roofGroup.add(tile);
            }
          }
          const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, length + 0.6, 10), new THREE.MeshStandardMaterial({ color: 0x9c3c31, roughness: 0.76 }));
          ridge.rotation.x = Math.PI / 2; ridge.position.set(cx, eaveY + rise + 0.05, cz); roofGroup.add(ridge);
        };
        makeGable(1.5, -0.9, 3.1, 5.8, 5.2, 2.35);
        makeGable(-3.2, -0.6, 2.2, 5.8, 4.6, 1.65);

        // Burma Teak Eaves Beam (Beirados)
        const timberMat = new THREE.MeshStandardMaterial({
          color: 0x4a2e1b,
          roughness: 0.7,
        });
        const ridgeBeam = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.25, 0.25), timberMat);
        ridgeBeam.position.set(-0.8, 7.3, -0.9);
        roofGroup.add(ridgeBeam);

        villaRoot.add(roofGroup);

        // 5. Sukabumi Stone Plunge Pool Group
        const poolGroup = new THREE.Group();
        poolGroupRef.current = poolGroup;

        // Coping Border
        const poolBorderGeo = new THREE.BoxGeometry(4.6, 0.2, 3.6);
        const poolBorderMat = new THREE.MeshStandardMaterial({
          color: 0xded5c8, // honed travertine edge
          roughness: 0.75,
        });
        const poolBorder = new THREE.Mesh(poolBorderGeo, poolBorderMat);
        poolBorder.position.set(-3.6, 0.82, 3.2);
        poolBorder.receiveShadow = true;
        poolGroup.add(poolBorder);

        // Crystalline Sukabumi Emerald Water Surface
        const waterGeo = new THREE.PlaneGeometry(4.0, 3.0);
        const waterMat = new THREE.MeshPhysicalMaterial({
          color: 0x48a995, // Sukabumi natural mineral green
          roughness: 0.16,
          metalness: 0.04,
          transparent: true,
          opacity: 0.88,
          transmission: 0.22,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
        });
        waterMesh = new THREE.Mesh(waterGeo, waterMat);
        waterMesh.rotation.x = -Math.PI / 2;
        waterMesh.position.set(-3.6, 0.86, 3.2);
        poolGroup.add(waterMesh);
        // Broad entry steps and a hand-finished inset line make the plunge pool read as built stonework.
        const stepMat = new THREE.MeshStandardMaterial({ color: 0xb7aa93, roughness: 0.82 });
        for (let i = 0; i < 3; i++) {
          const step = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.12, 0.42), stepMat);
          step.position.set(-3.6, 0.91 + i * 0.13, 4.62 + i * 0.38); step.receiveShadow = true; poolGroup.add(step);
        }
        const waterline = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.035, 0.045), new THREE.MeshStandardMaterial({ color: 0x91b4a2, roughness: 0.42 }));
        waterline.position.set(-3.6, 0.94, 1.71); poolGroup.add(waterline);

        villaRoot.add(poolGroup);

        // 6. Goan Coconut Palm Flora Accents
        const palmGroup = new THREE.Group();
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a4632, roughness: 0.9 });
        const frondMat = new THREE.MeshStandardMaterial({ color: 0x2d5a3f, roughness: 0.75, side: THREE.DoubleSide });

        const palmPositions = [
          [5.8, -4.2],
          [-5.8, -4.5],
          [6.4, 3.6],
        ];

        palmPositions.forEach(([px, pz]) => {
          const trunkGeo = new THREE.CylinderGeometry(0.16, 0.24, 7.5, 8);
          const trunk = new THREE.Mesh(trunkGeo, trunkMat);
          trunk.position.set(px, 3.75, pz);
          trunk.rotation.z = (Math.random() - 0.5) * 0.12;
          trunk.castShadow = true;
          palmGroup.add(trunk);

          // Starburst Fronds
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const frondGeo = new THREE.ConeGeometry(1.6, 0.25, 4);
            const frond = new THREE.Mesh(frondGeo, frondMat);
            frond.position.set(px + Math.cos(angle) * 1.0, 7.4, pz + Math.sin(angle) * 1.0);
            frond.rotation.z = Math.PI / 3;
            frond.rotation.y = angle;
            frond.castShadow = true;
            palmGroup.add(frond);
          }
        });
        villaRoot.add(palmGroup);

        roofGroup.visible = activeLayer === "all" || activeLayer === "roof";
        balcaoGroup.visible = activeLayer === "all" || activeLayer === "balcao";
        poolGroup.visible = activeLayer === "all" || activeLayer === "pool";
        scene.add(villaRoot);

        const gardenGround = new THREE.Mesh(
          new THREE.PlaneGeometry(200, 200),
          new THREE.MeshStandardMaterial({ color: lighting === "twilight" ? 0x26392d : 0x71805b, roughness: 1 })
        );
        gardenGround.rotation.x = -Math.PI / 2;
        gardenGround.position.y = -0.12;
        gardenGround.receiveShadow = true;
        scene.add(gardenGround);

        // --- Render Loop ---
        const animate = () => {
          animId = requestAnimationFrame(animate);

          // Gentle ambient Susegad orbit float
          if (autoRotateRef.current && !isDragging && villaRoot) {
            villaRoot.rotation.y += 0.0016;
          }

          currentZoom += (targetZoom - currentZoom) * 0.08;
          camera.position.set(currentZoom * 0.62, 3.1 + currentZoom * 0.37, currentZoom * 0.75);
          camera.lookAt(0, 3.1, 0);

          // Gentle water ripple shimmer
          if (waterMesh) {
            waterMesh.material.opacity = 0.85 + Math.sin(Date.now() * 0.0025) * 0.06;
          }

          renderer.render(scene, camera);
        };
        animate();
        setIs3DActive(true);

        // --- Mouse / Touch Orbit Controls ---
        const onMouseDown = (e: MouseEvent) => {
          isDragging = true;
          if (autoRotateRef.current) {
            autoRotateRef.current = false;
            setAutoRotate(false);
          }
          previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseMove = (e: MouseEvent) => {
          if (!isDragging || !villaRoot) return;
          const deltaX = e.clientX - previousMousePosition.x;
          const deltaY = e.clientY - previousMousePosition.y;

          villaRoot.rotation.y += deltaX * 0.0075;
          villaRoot.rotation.x = Math.max(-0.25, Math.min(0.55, villaRoot.rotation.x + deltaY * 0.0045));

          previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseUp = () => {
          isDragging = false;
        };

        const onWheel = (e: WheelEvent) => { e.preventDefault(); targetZoom = Math.max(20, Math.min(40, targetZoom + e.deltaY * 0.018)); };
        const onTouchStart = (e: TouchEvent) => { if (e.touches.length === 1) { isDragging = true; previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }; } };
        const onTouchMove = (e: TouchEvent) => {
          if (e.touches.length !== 1 || !villaRoot) return;
          e.preventDefault(); const touch = e.touches[0];
          villaRoot.rotation.y += (touch.clientX - previousMousePosition.x) * 0.0075;
          villaRoot.rotation.x = Math.max(-0.25, Math.min(0.55, villaRoot.rotation.x + (touch.clientY - previousMousePosition.y) * 0.0045));
          previousMousePosition = { x: touch.clientX, y: touch.clientY };
        };
        const onTouchEnd = () => { isDragging = false; };
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "ArrowLeft") villaRoot.rotation.y -= 0.12;
          if (e.key === "ArrowRight") villaRoot.rotation.y += 0.12;
          if (e.key === "+" || e.key === "=") targetZoom = Math.max(20, targetZoom - 2);
          if (e.key === "-") targetZoom = Math.min(40, targetZoom + 2);
        };

        const dom = renderer.domElement;
        dom.addEventListener("mousedown", onMouseDown);
        dom.addEventListener("wheel", onWheel, { passive: false });
        dom.addEventListener("touchstart", onTouchStart, { passive: true });
        dom.addEventListener("touchmove", onTouchMove, { passive: false });
        dom.addEventListener("touchend", onTouchEnd);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("keydown", onKeyDown);

        const handleResize = () => {
          if (!containerRef.current) return;
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        cleanup = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", handleResize);
          dom.removeEventListener("mousedown", onMouseDown);
          dom.removeEventListener("wheel", onWheel);
          dom.removeEventListener("touchstart", onTouchStart);
          dom.removeEventListener("touchmove", onTouchMove);
          dom.removeEventListener("touchend", onTouchEnd);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
          window.removeEventListener("keydown", onKeyDown);
          if (renderer?.domElement && mountNode?.contains(renderer.domElement)) {
            mountNode.removeChild(renderer.domElement);
          }
          renderer?.dispose();
        };
      })
      .catch((e) => {
        console.warn("Three.js initialization notice:", e);
        setIs3DActive(false);
      });
    return () => cleanup?.();
  }, [lighting]);

  // Handle Layer Focus Isolation
  useEffect(() => {
    const roof = roofGroupRef.current;
    const balcao = balcaoGroupRef.current;
    const pool = poolGroupRef.current;
    const body = bodyGroupRef.current;

    if (!roof || !balcao || !pool || !body) return;

    if (activeLayer === "all") {
      roof.visible = true;
      balcao.visible = true;
      pool.visible = true;
      body.visible = true;
    } else if (activeLayer === "roof") {
      roof.visible = true;
      balcao.visible = false;
      pool.visible = false;
      body.visible = true;
    } else if (activeLayer === "balcao") {
      roof.visible = false;
      balcao.visible = true;
      pool.visible = false;
      body.visible = true;
    } else if (activeLayer === "pool") {
      roof.visible = false;
      balcao.visible = false;
      pool.visible = true;
      body.visible = true;
    }
  }, [activeLayer, lighting]);

  return (
    <div className="relative w-full h-[540px] md:h-[660px] rounded-sm overflow-hidden bg-[#FAF8F5] border border-[#121210]/10 flex flex-col justify-between shadow-xl">
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        data-cursor="360° ORBIT"
      >
        <div ref={canvasMountRef} className="absolute inset-0 w-full h-full" />
        {!is3DActive && (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
            <div className="w-20 h-20 rounded-full border border-[#D49B44] flex items-center justify-center text-[#B84A39] mb-6">
              <Box3DIcon size={36} />
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#D49B44] mb-2 block font-semibold">
              SUSEGAD 3D SPATIAL MODEL • CURTORIM
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-[#121210] max-w-md mb-4">
              Row Villa A — Portuguese Balcão &amp; Sukabumi Pool
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#7A756B] max-w-lg mb-8 leading-relaxed font-light">
              Featuring Mangalore clay tiled gables, hand-dressed Goan red laterite stone,
              translucent carepas oyster shell windows, and a private natural plunge pool.
            </p>
          </div>
        )}
      </div>

      {/* Top Floating Controls Bar */}
      <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        {/* Spatial Badge */}
        <div className="flex items-center gap-3 bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#121210]/10 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#B84A39] animate-pulse" />
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#121210] font-semibold">
            3D SPATIAL MODEL • NATURE&apos;S COVE CURTORIM
          </span>
        </div>

        {/* Goan Lighting Atmosphere Toggles */}
        <div className="flex items-center gap-1 bg-[#FAF8F5]/90 backdrop-blur-md p-1 rounded-full border border-[#121210]/10 pointer-events-auto shadow-sm">
          <button
            type="button"
            onClick={() => setLighting("golden")}
            className={`px-3 py-1 text-[10px] tracking-wider uppercase font-sans rounded-full transition-all ${
              lighting === "golden"
                ? "bg-[#D49B44] text-[#0C1A14] font-semibold"
                : "text-[#121210]/60 hover:text-[#121210]"
            }`}
          >
            Susegad Sunset
          </button>
          <button
            type="button"
            onClick={() => setLighting("noon")}
            className={`px-3 py-1 text-[10px] tracking-wider uppercase font-sans rounded-full transition-all ${
              lighting === "noon"
                ? "bg-[#121210] text-[#FAF8F5] font-semibold"
                : "text-[#121210]/60 hover:text-[#121210]"
            }`}
          >
            Arabian Noon
          </button>
          <button
            type="button"
            onClick={() => setLighting("twilight")}
            className={`px-3 py-1 text-[10px] tracking-wider uppercase font-sans rounded-full transition-all ${
              lighting === "twilight"
                ? "bg-[#0C1A14] text-[#FAF8F5] font-semibold"
                : "text-[#121210]/60 hover:text-[#121210]"
            }`}
          >
            Monsoon Twilight
          </button>
        </div>
      </div>

      {/* Middle Left: Architectural Layer Focus (Dora / Spline style) */}
      <div className="relative z-10 px-6 py-2 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1.5 bg-[#FAF8F5]/90 backdrop-blur-md p-1.5 rounded-sm border border-[#121210]/10 pointer-events-auto">
          <span className="text-[9px] font-mono tracking-widest uppercase text-[#7A756B] px-2 py-0.5">
            LAYERS:
          </span>
          <button
            type="button"
            onClick={() => setActiveLayer("all")}
            className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider text-left rounded-xs transition-colors ${
              activeLayer === "all"
                ? "bg-[#0C1A14] text-[#FAF8F5] font-semibold"
                : "text-[#121210]/70 hover:text-[#121210]"
            }`}
          >
            Entire Villa
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("roof")}
            className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider text-left rounded-xs transition-colors ${
              activeLayer === "roof"
                ? "bg-[#B84A39] text-[#FAF8F5] font-semibold"
                : "text-[#121210]/70 hover:text-[#121210]"
            }`}
          >
            Mangalore Roof
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("balcao")}
            className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider text-left rounded-xs transition-colors ${
              activeLayer === "balcao"
                ? "bg-[#D49B44] text-[#0C1A14] font-semibold"
                : "text-[#121210]/70 hover:text-[#121210]"
            }`}
          >
            Portuguese Balcão
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("pool")}
            className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider text-left rounded-xs transition-colors ${
              activeLayer === "pool"
                ? "bg-[#1E5948] text-[#FAF8F5] font-semibold"
                : "text-[#121210]/70 hover:text-[#121210]"
            }`}
          >
            Sukabumi Pool
          </button>
        </div>

        {/* Auto-rotate Toggle */}
        <button
          type="button"
          onClick={() => {
            const nextAutoRotate = !autoRotateRef.current;
            autoRotateRef.current = nextAutoRotate;
            setAutoRotate(nextAutoRotate);
          }}
          className="bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#121210]/10 pointer-events-auto text-[10px] font-mono text-[#121210]/70 hover:text-[#121210] transition-colors"
        >
          {autoRotate ? "Orbit: Active" : "Orbit: Paused"}
        </button>
      </div>

      {/* Bottom Floating Architectural Annotation Bar */}
      <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-sm border border-[#121210]/10 pointer-events-auto text-[11px] font-sans text-[#121210]/80">
          <span className="font-mono text-[#B84A39]">360° SPATIAL MODEL</span>: Click and drag to orbit • Layer filters on left
        </div>

        <div className="hidden sm:flex items-center gap-4 bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-sm border border-[#121210]/10 pointer-events-auto text-[11px] font-sans text-[#121210]">
          <span>Red Laterite Stone</span>
          <span className="text-[#D49B44]">•</span>
          <span>Carepas Oyster Windows</span>
          <span className="text-[#D49B44]">•</span>
          <span>Balcão Stone Seating</span>
        </div>
      </div>
    </div>
  );
}
