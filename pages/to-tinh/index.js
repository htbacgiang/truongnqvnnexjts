'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text } from 'troika-three-text';
import Head from 'next/head';

const COLORS = [
  '#FF4365', '#23C9FF', '#8EFF7B', '#FFF95D', '#845EC2',
  '#F9C80E', '#FF6F91', '#41EAD4', '#FB3640', '#5F6CAF'
];

const PHRASES = [
  "Yêu em nhiều lắm", "Luôn nhớ em", "Em là tất cả", "Yêu em",
  "Bên em là đủ", "Anh cần em", "Vì em, anh tồn tại", "Em là định mệnh",
  "Chỉ yêu mỗi mình em", "truongnq.vn", "Nếu là anh"
];

function createHeartTexture(color = '#ff44aa') {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.clearRect(0, 0, size, size);

  ctx.translate(size / 2, size / 2 - 18);
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;

  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.bezierCurveTo(0, -22, -48, -18, -45, 18);
  ctx.bezierCurveTo(-45, 44, 0, 58, 0, 70);
  ctx.bezierCurveTo(0, 58, 45, 44, 45, 18);
  ctx.bezierCurveTo(48, -18, 0, -22, 0, 18);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.86;
  ctx.fill();
  ctx.restore();
  return new THREE.CanvasTexture(canvas);
}

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function Home() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const heartTextures = useMemo(() => COLORS.map((c) => createHeartTexture(c)), []);

  useEffect(() => {
    let renderer, scene, camera, controls, animationId;
    const canvas = canvasRef.current;

    let N_TEXT = PHRASES.length * 2;
    let N_HEART = PHRASES.length * 5;
    let spreadX = 20;
    let spreadZ = 12;
    let minY = -12, maxY = 15;

    function getResponsiveParams() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = width / height;
      const area = width * height;

      const base = Math.max(10, Math.min(30, width / 80));
      N_TEXT = Math.floor(PHRASES.length * (area < 300000 ? 1.5 : area < 600000 ? 2 : 3));
      N_HEART = Math.min(PHRASES.length * (area < 300000 ? 3 : area < 600000 ? 5 : 8), 120);

      spreadX = ratio > 1 ? base * 3.5 : base * 2.2;
      spreadZ = base * (ratio > 1 ? 1.8 : 2.5);
      minY = -base * 1.0;
      maxY = base * 1.4;

      return { spreadX, spreadZ, minY, maxY };
    }

    const updateParams = () => {
      const p = getResponsiveParams();
      spreadX = p.spreadX;
      spreadZ = p.spreadZ;
      minY = p.minY;
      maxY = p.maxY;
    };
    updateParams();

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 100
    );
    camera.position.set(0, 0, Math.max(spreadX, spreadZ) * 1.8);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const spot = new THREE.PointLight(0xffffff, 1.15);
    spot.position.set(0, 8, 10);
    scene.add(spot);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = window.innerWidth < 600 ? 5 : 8;
    controls.maxDistance = window.innerWidth < 600 ? 20 : 40;
    controls.enablePan = false;

    let textMeshes = [];
    let heartMeshes = [];

    function createObjects() {
      for (let obj of textMeshes) {
        scene.remove(obj.mesh);
        obj.mesh.dispose();
      }
      for (let obj of heartMeshes) {
        scene.remove(obj.mesh);
        obj.mesh.material.dispose();
        obj.mesh.material.map.dispose();
      }
      textMeshes = [];
      heartMeshes = [];

      for (let i = 0; i < N_TEXT; i++) {
        const text = new Text();
        text.text = PHRASES[i % PHRASES.length];
        const fontSize = (window.innerWidth < 600 ? 0.6 : 0.8) + Math.random() * 1.0;
        text.fontSize = fontSize;
        const color = randomColor();
        const x = (Math.random() - 0.5) * spreadX;
        const z = (Math.random() - 0.5) * spreadZ;
        text.position.set(x, Math.random() * (maxY - minY) + minY, z);
        text.color = color;
        text.fontWeight = "bold";
        text.anchorX = "center";
        text.anchorY = "middle";
        text.sync();
        textMeshes.push({
          mesh: text,
          speed: 0.01 + Math.random() * 0.04,
          fontSize,
          color,
          lane: [x, z]
        });
        scene.add(text);
      }

      for (let i = 0; i < N_HEART; i++) {
        const size = (window.innerWidth < 600 ? 0.4 : 0.6) + Math.random() * 1.0;
        const mat = new THREE.SpriteMaterial({
          map: heartTextures[Math.floor(Math.random() * heartTextures.length)],
          transparent: true
        });
        const sprite = new THREE.Sprite(mat);
        const x = (Math.random() - 0.5) * spreadX;
        const z = (Math.random() - 0.5) * spreadZ;
        sprite.scale.set(size, size, 1);
        sprite.position.set(x, Math.random() * (maxY - minY) + minY, z);
        heartMeshes.push({
          mesh: sprite,
          speed: 0.01 + Math.random() * 0.04,
          size,
          lane: [x, z]
        });
        scene.add(sprite);
      }
    }

    createObjects();

    function animate() {
      for (let obj of textMeshes) {
        obj.mesh.position.y -= obj.speed;
        if (obj.mesh.position.y < minY) {
          obj.mesh.position.y = maxY;
          obj.mesh.position.x = (Math.random() - 0.5) * spreadX;
          obj.mesh.position.z = (Math.random() - 0.5) * spreadZ;
          obj.lane = [obj.mesh.position.x, obj.mesh.position.z];
        }
      }
      for (let obj of heartMeshes) {
        obj.mesh.position.y -= obj.speed;
        if (obj.mesh.position.y < minY) {
          obj.mesh.position.y = maxY;
          obj.mesh.position.x = (Math.random() - 0.5) * spreadX;
          obj.mesh.position.z = (Math.random() - 0.5) * spreadZ;
          obj.lane = [obj.mesh.position.x, obj.mesh.position.z];
        }
      }
      controls.update();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      updateParams();
      camera.position.set(0, 0, Math.max(spreadX, spreadZ) * 1.8);
      createObjects();
    };
    window.addEventListener('resize', handleResize);

    const audio = audioRef.current;
    if (audio && audioStarted) {
      audio.muted = isMuted;
      audio.play().catch((err) => console.error('Audio playback failed:', err));
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      heartTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, [audioStarted, isMuted]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!audioStarted) {
        audio.muted = false;
        audio.play().then(() => {
          setAudioStarted(true);
          setIsMuted(false);
        }).catch((err) => {
          console.error('Audio playback failed:', err);
        });
      } else {
        setIsMuted(!isMuted);
        audio.muted = !isMuted;
      }
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      <Head>
        <title>Tỏ tình lãng mạn  - Trường NQ</title>
        <meta
          name="description"
          content="Trải nghiệm 3D lãng mạn với những trái tim và lời yêu thương rơi nhẹ nhàng, kèm âm nhạc ngọt ngào. Tạo khoảnh khắc đặc biệt với thiết kế độc đáo." />
        <meta
          name="keywords"
          content="tỏ tình, 3D lãng mạn, trái tim 3D, lời yêu thương, WebGL, Three.js, React, cảnh tình yêu, truongnq.vn"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tỏ tình lãng mạn - Trường NQ" />
        <meta
          property="og:description"
          content="Trải nghiệm 3D lãng mạn với những trái tim và lời yêu thương rơi nhẹ nhàng, kèm âm nhạc ngọt ngào. Tạo khoảnh khắc đặc biệt với thiết kế độc đáo." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="stylesheet" href="/fonts.css" />
      </Head>
      <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh", display: "block" }} />
      <audio ref={audioRef} src="/neu-la-anh.mp3" loop hidden />
      <button
        onClick={toggleAudio}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded opacity-40"
      >
        {audioStarted ? (isMuted ? "Tắt tiếng" : "Bật tiếng") : "Phát nhạc"}
      </button>
    </div>
  );
}