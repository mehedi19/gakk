"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleLogoEngine({ 
  particleCount = 2100, 
  dotSize = 0.22,
  dotColor = '#666666'
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const stateRef = useRef({
    mouseX: 9999,
    mouseY: 9999,
    targetRotX: 0,
    targetRotY: 0,
    particles: null,
    renderer: null,
    scene: null,
    camera: null,
    shockwave: 0,
    scrollDispersal: 0,
    targetScrollDispersal: 0,
    wheelImpulse: 0
  });

  const handlePointerLeave = () => {
    stateRef.current.mouseX = 9999;
    stateRef.current.mouseY = 9999;
    stateRef.current.targetRotX = 0;
    stateRef.current.targetRotY = 0;
  };

  if (typeof window !== 'undefined') {
    window.handlePointerLeave = handlePointerLeave;
    window.__gakkPointerState = stateRef.current;
  }

  useEffect(() => {
    let isMounted = true;

    const sampleLogoPositions = (totalPoints = 2100) => {
      const sampleCanvas = document.createElement('canvas');
      const size = 320;
      sampleCanvas.width = size;
      sampleCanvas.height = size;
      const ctx = sampleCanvas.getContext('2d');

      ctx.save();
      ctx.scale(size / 200, size / 200);

      // Base positive fill
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(100, 100, 72, 0, Math.PI * 2);
      ctx.rect(100, 28, 62, 40);
      ctx.rect(132, 78, 30, 30);
      ctx.fill();

      // Precise negative cutouts
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(100, 100, 38, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.rect(99, 68, 65, 10);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(162, 142, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.rect(162, 0, 40, 200);
      ctx.fill();

      ctx.restore();

      const imgData = ctx.getImageData(0, 0, size, size).data;
      const validPixels = [];

      for (let y = 0; y < size; y += 2) {
        for (let x = 0; x < size; x += 2) {
          const idx = (y * size + x) * 4;
          if (imgData[idx + 3] > 120) {
            validPixels.push({ x, y });
          }
        }
      }

      const points = [];
      const homeCoords = [];
      const velocities = [];
      const colors = [];
      const scatterVectors = [];
      const grayVal = 102 / 255;

      for (let i = 0; i < totalPoints; i++) {
        const randPixel = validPixels[Math.floor(Math.random() * validPixels.length)] || { x: size / 2, y: size / 2 };
        const isFuzz = Math.random() < 0.12;
        const fuzzX = isFuzz ? (Math.random() - 0.5) * 3.5 : (Math.random() - 0.5) * 1.1;
        const fuzzY = isFuzz ? (Math.random() - 0.5) * 3.5 : (Math.random() - 0.5) * 1.1;

        const posX = ((randPixel.x + fuzzX - size / 2) / (size / 2)) * 9.6;
        const posY = -((randPixel.y + fuzzY - size / 2) / (size / 2)) * 9.6;
        const posZ = (Math.random() - 0.5) * 0.8;

        points.push(posX, posY, posZ);
        homeCoords.push(posX, posY, posZ);
        velocities.push(0, 0, 0);
        colors.push(grayVal, grayVal, grayVal);

        const angle = Math.atan2(posY, posX) + (Math.random() - 0.5) * 0.6;
        const radMag = 1.0 + Math.random() * 2.8;
        scatterVectors.push(Math.cos(angle) * radMag, Math.sin(angle) * radMag, (Math.random() - 0.5) * 4.2);
      }

      return { points, homeCoords, velocities, colors, scatterVectors };
    };

    if (!isMounted || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const { points, homeCoords, velocities, colors, scatterVectors } = sampleLogoPositions(particleCount);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 64;
    circleCanvas.height = 64;
    const cCtx = circleCanvas.getContext('2d');
    cCtx.beginPath();
    cCtx.arc(32, 32, 28, 0, Math.PI * 2);
    cCtx.fillStyle = '#ffffff';
    cCtx.fill();
    const circleTexture = new THREE.CanvasTexture(circleCanvas);

    const material = new THREE.PointsMaterial({
      size: dotSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      map: circleTexture,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.renderer = renderer;
    stateRef.current.particles = {
      system: particleSystem,
      homeCoords,
      velocities,
      scatterVectors,
      count: points.length / 3
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = window.innerHeight * 0.9;
      stateRef.current.targetScrollDispersal = Math.min(Math.max(scrollY / heroHeight, 0), 1.6);
    };

    const handleWheel = (e) => {
      stateRef.current.wheelImpulse = Math.min(Math.abs(e.deltaY) * 0.003, 1.2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    let time = 0;
    const animate = () => {
      if (!isMounted) return;
      time += 0.016;

      const state = stateRef.current;
      const pState = state.particles;

      state.scrollDispersal += (state.targetScrollDispersal - state.scrollDispersal) * 0.08;
      state.wheelImpulse *= 0.91;
      state.shockwave *= 0.93;

      const combinedScatter = state.scrollDispersal * 3.4 + state.wheelImpulse * 2.5 + state.shockwave * 5.0;

      particleSystem.rotation.x += (state.targetRotX - particleSystem.rotation.x) * 0.06;
      particleSystem.rotation.y += (state.targetRotY - particleSystem.rotation.y) * 0.06;

      if (pState) {
        const positions = pState.system.geometry.attributes.position.array;
        const homes = pState.homeCoords;
        const vels = pState.velocities;
        const scatters = pState.scatterVectors;
        const count = pState.count;
        const mX = state.mouseX;
        const mY = state.mouseY;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          let px = positions[i3];
          let py = positions[i3 + 1];
          let pz = positions[i3 + 2];

          const breath = Math.sin(time * 1.5 + i * 0.02) * 0.08;
          const targetX = homes[i3] + scatters[i3] * combinedScatter;
          const targetY = homes[i3 + 1] + scatters[i3 + 1] * combinedScatter + breath;
          const targetZ = homes[i3 + 2] + scatters[i3 + 2] * combinedScatter;

          const dx = px - mX;
          const dy = py - mY;
          const distSq = dx * dx + dy * dy;

          if (distSq < 9.0) {
            const dist = Math.sqrt(distSq) || 0.01;
            const force = (1.0 - dist / 3.0) * 0.35;
            vels[i3] += (dx / dist) * force;
            vels[i3 + 1] += (dy / dist) * force;
            vels[i3 + 2] += (Math.random() - 0.5) * force * 1.5;
          }

          vels[i3] += (targetX - px) * 0.075;
          vels[i3 + 1] += (targetY - py) * 0.075;
          vels[i3 + 2] += (targetZ - pz) * 0.075;

          vels[i3] *= 0.86;
          vels[i3 + 1] *= 0.86;
          vels[i3 + 2] *= 0.86;

          positions[i3] += vels[i3];
          positions[i3 + 1] += vels[i3 + 1];
          positions[i3 + 2] += vels[i3 + 2];
        }

        pState.system.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer) renderer.dispose();
    };
  }, [particleCount, dotSize, dotColor]);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const yNorm = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    stateRef.current.mouseX = xNorm * 7.5;
    stateRef.current.mouseY = yNorm * 7.5;
    stateRef.current.targetRotY = xNorm * 0.35;
    stateRef.current.targetRotX = -yNorm * 0.35;
  };

  const handlePointerLeave2 = () => {
    stateRef.current.mouseX = 9999;
    stateRef.current.mouseY = 9999;
    stateRef.current.targetRotX = 0;
    stateRef.current.targetRotY = 0;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave2}
      onClick={() => { stateRef.current.shockwave = 1.0; }}
      className="w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] relative flex items-center justify-center cursor-crosshair select-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}
