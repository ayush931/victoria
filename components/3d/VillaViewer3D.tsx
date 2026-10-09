"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box3DIcon } from "@/components/ui/Icons";

type LightingMode = "golden" | "noon" | "twilight";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyThree = any;

export default function VillaViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [lighting, setLighting] = useState<LightingMode>("golden");
  const [is3DActive, setIs3DActive] = useState(false);

  useEffect(() => {
    let renderer: AnyThree = null;
    let scene: AnyThree = null;
    let camera: AnyThree = null;
    let animId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let villaGroup: AnyThree = null;
    let poolMesh: AnyThree = null;
    let dirLight: AnyThree = null;
    let hemiLight: AnyThree = null;

    // Attempt to load Three.js dynamically
    import("three")
      .then((THREE) => {
        if (!containerRef.current || !canvasMountRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(
          lighting === "twilight" ? 0x08130f : lighting === "golden" ? 0xf4efe6 : 0xfbf9f5
        );

        camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
        camera.position.set(16, 12, 18);
        camera.lookAt(0, 1.5, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const mountNode = canvasMountRef.current;
        if (!mountNode) return;
        mountNode.innerHTML = "";
        mountNode.appendChild(renderer.domElement);

        // Lighting
        hemiLight = new THREE.HemisphereLight(0xffeedd, 0x08130f, 0.6);
        scene.add(hemiLight);

        dirLight = new THREE.DirectionalLight(
          lighting === "golden" ? 0xffb74d : lighting === "twilight" ? 0x90caf9 : 0xffffff,
          lighting === "twilight" ? 0.8 : 1.8
        );
        dirLight.position.set(14, 20, 10);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        // Villa Geometry Group
        villaGroup = new THREE.Group();

        // 1. Foundation Travertine Plinth
        const plinthGeo = new THREE.BoxGeometry(12, 0.8, 10);
        const travertineMat = new THREE.MeshStandardMaterial({
          color: 0xdfd7cb,
          roughness: 0.8,
          metalness: 0.1,
        });
        const plinth = new THREE.Mesh(plinthGeo, travertineMat);
        plinth.position.y = 0.4;
        plinth.receiveShadow = true;
        villaGroup.add(plinth);

        // 2. Reflection Plunge Pool
        const poolGeo = new THREE.PlaneGeometry(5, 3.5);
        const poolMat = new THREE.MeshStandardMaterial({
          color: 0x1b4332,
          roughness: 0.1,
          metalness: 0.9,
          transparent: true,
          opacity: 0.88,
        });
        poolMesh = new THREE.Mesh(poolGeo, poolMat);
        poolMesh.rotation.x = -Math.PI / 2;
        poolMesh.position.set(2.5, 0.82, 2);
        villaGroup.add(poolMesh);

        // 3. Main Living Glass Box
        const mainBoxGeo = new THREE.BoxGeometry(6.5, 3.8, 5.5);
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.45,
          roughness: 0.1,
          transmission: 0.6,
          thickness: 0.5,
        });
        const mainBox = new THREE.Mesh(mainBoxGeo, glassMat);
        mainBox.position.set(-2, 2.7, -1);
        villaGroup.add(mainBox);

        // 4. Teak Louvers / Columns
        const teakMat = new THREE.MeshStandardMaterial({
          color: 0x6f4e37,
          roughness: 0.6,
        });

        for (let i = -4.5; i <= 0.5; i += 1.2) {
          const colGeo = new THREE.BoxGeometry(0.15, 3.8, 0.15);
          const col = new THREE.Mesh(colGeo, teakMat);
          col.position.set(i, 2.7, 1.8);
          col.castShadow = true;
          villaGroup.add(col);
        }

        // 5. Cantilevered Timber Roof Slab
        const roofGeo = new THREE.BoxGeometry(8, 0.35, 7.5);
        const roof = new THREE.Mesh(roofGeo, teakMat);
        roof.position.set(-1.8, 4.8, -0.8);
        roof.castShadow = true;
        villaGroup.add(roof);

        // 6. Goan Laterite Accent Wall
        const lateriteGeo = new THREE.BoxGeometry(0.6, 3.8, 4);
        const lateriteMat = new THREE.MeshStandardMaterial({
          color: 0x934b35,
          roughness: 0.9,
        });
        const lateriteWall = new THREE.Mesh(lateriteGeo, lateriteMat);
        lateriteWall.position.set(-5.3, 2.7, -1);
        lateriteWall.castShadow = true;
        villaGroup.add(lateriteWall);

        // 7. Interior Warm Light Sphere
        const interiorLight = new THREE.PointLight(0xffa726, 2.5, 12);
        interiorLight.position.set(-2, 3, -1);
        villaGroup.add(interiorLight);

        scene.add(villaGroup);

        // Animation loop
        const animate = () => {
          animId = requestAnimationFrame(animate);

          // Gentle ambient float
          if (!isDragging && villaGroup) {
            villaGroup.rotation.y += 0.0015;
          }

          if (poolMesh) {
            poolMesh.material.opacity = 0.82 + Math.sin(Date.now() * 0.002) * 0.06;
          }

          renderer.render(scene, camera);
        };
        animate();
        setIs3DActive(true);

        // Drag to orbit interaction
        const onMouseDown = (e: MouseEvent) => {
          isDragging = true;
          previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseMove = (e: MouseEvent) => {
          if (!isDragging || !villaGroup) return;
          const deltaX = e.clientX - previousMousePosition.x;
          const deltaY = e.clientY - previousMousePosition.y;

          villaGroup.rotation.y += deltaX * 0.008;
          villaGroup.rotation.x = Math.max(-0.2, Math.min(0.5, villaGroup.rotation.x + deltaY * 0.005));

          previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseUp = () => {
          isDragging = false;
        };

        const dom = renderer.domElement;
        dom.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        // Handle resize
        const handleResize = () => {
          if (!containerRef.current) return;
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        return () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", handleResize);
          dom.removeEventListener("mousedown", onMouseDown);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
          if (renderer?.domElement && mountNode?.contains(renderer.domElement)) {
            mountNode.removeChild(renderer.domElement);
          }
          renderer?.dispose();
        };
      })
      .catch(() => {
        // Three.js not yet installed; fallback 2D elevation renders
        setIs3DActive(false);
      });
  }, [lighting]);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-sm overflow-hidden bg-[#FAF8F5] border border-[#121210]/10 flex flex-col justify-between">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        data-cursor="DRAG 3D"
      >
        <div ref={canvasMountRef} className="absolute inset-0 w-full h-full" />
        {!is3DActive && (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
            <div className="w-20 h-20 rounded-full border border-[#C5A880] flex items-center justify-center text-[#B38F5B] mb-6">
              <Box3DIcon size={36} />
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A880] mb-2 block">
              NATURE&apos;S COVE • ARCHITECTURAL ELEVATION
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-[#121210] max-w-md mb-4">
              Row Villa A — 4 BHK Plunge Pool Sanctuary
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#7E796E] max-w-lg mb-8 leading-relaxed">
              Featuring double-height living spaces, natural Goan laterite accents,
              cantilevered Burma teak eaves, and seamless indoor-outdoor water transition.
            </p>
            <div className="flex items-center gap-6 text-xs font-mono text-[#121210]/70 border-t border-[#121210]/10 pt-4">
              <span>PLOT: 4,200 SQ.FT</span>
              <span>•</span>
              <span>BUILT-UP: 480 SQ.M</span>
              <span>•</span>
              <span>CURTORIM, GOA</span>
            </div>
          </div>
        )}
      </div>

      {/* Top Floating Controls */}
      <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 bg-[#FAF8F5]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#121210]/10 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#B38F5B] animate-pulse" />
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#121210] font-medium">
            3D SPATIAL MODEL • NATURE&apos;S COVE
          </span>
        </div>

        {/* Lighting Atmosphere Toggles */}
        <div className="flex items-center gap-1 bg-[#FAF8F5]/90 backdrop-blur-md p-1 rounded-full border border-[#121210]/10 pointer-events-auto">
          <button
            type="button"
            onClick={() => setLighting("golden")}
            className={`px-3 py-1 text-[10px] tracking-wider uppercase font-sans rounded-full transition-all ${
              lighting === "golden"
                ? "bg-[#B38F5B] text-[#08130F] font-semibold"
                : "text-[#121210]/60 hover:text-[#121210]"
            }`}
          >
            Golden Hour
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
            Zenith
          </button>
          <button
            type="button"
            onClick={() => setLighting("twilight")}
            className={`px-3 py-1 text-[10px] tracking-wider uppercase font-sans rounded-full transition-all ${
              lighting === "twilight"
                ? "bg-[#08130F] text-[#FAF8F5] font-semibold"
                : "text-[#121210]/60 hover:text-[#121210]"
            }`}
          >
            Twilight
          </button>
        </div>
      </div>

      {/* Bottom Floating Stats Bar */}
      <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
        <div className="bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-sm border border-[#121210]/10 pointer-events-auto text-[11px] font-sans text-[#121210]/80">
          <span className="font-mono text-[#B38F5B]">360° ORBIT</span>: Click and drag to inspect volume
        </div>

        <div className="hidden sm:flex items-center gap-4 bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-sm border border-[#121210]/10 pointer-events-auto text-[11px] font-sans text-[#121210]">
          <span>Laterite Thermal Wall</span>
          <span className="text-[#B38F5B]">•</span>
          <span>Private Plunge Pool</span>
          <span className="text-[#B38F5B]">•</span>
          <span>Burma Teak Pergola</span>
        </div>
      </div>
    </div>
  );
}
