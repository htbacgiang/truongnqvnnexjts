'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text } from 'troika-three-text';
import Head from 'next/head';

// Màu sắc đa dạng và rực rỡ
const COLORS = [
  '#FFFFFF', // Trắng sáng
  '#FF1493', // Hồng đậm
  '#00FFFF', // Cyan sáng
  '#FFD700', // Vàng kim
  '#FF69B4', // Hồng nóng
  '#7B68EE', // Tím xanh
  '#00FF00', // Xanh lá neon
  '#FF4500', // Cam đỏ
  '#BA55D3', // Tím hoa lan
  '#32CD32', // Xanh lá
  '#FF6347', // Đỏ cà chua
  '#4169E1', // Xanh hoàng gia
  '#FFB6C1', // Hồng nhạt
  '#00CED1', // Xanh ngọc đậm
  '#FFA500', // Cam
  '#DA70D6', // Tím hồng lan
  '#87CEEB', // Xanh trời
  '#FF1744', // Đỏ
  '#1E90FF', // Xanh dương
  '#FFFF00', // Vàng neon
  '#FF00FF', // Magenta
  '#00FA9A', // Xanh lục vừa
  '#F0E68C', // Vàng khaki
  '#E6E6FA', // Lavender
  '#FFE4E1', // Hồng sương
];

const PHRASES = [
  "Chúc mừng Trung thu", "Gửi Táo yêu quý", "Trăng tròn người tròn", 
  "Trung thu vui vẻ", "Tám xinh đẹp", "Tết đoàn viên", 
  "Ánh trăng soi đường", "Nhắn tin 3 ngày mới dép",
  "Chúc Tám hạnh phúc", "Mùa trăng tròn",
  "Tám rạng rỡ", "Tám luôn vui vẻ", "Táo Mèo đáng yêu"
];

// Thêm danh sách hình ảnh và lời chúc - bạn có thể thay đổi
// Thêm danh sách hình ảnh và lời chúc - phiên bản thân thiện
const IMAGES = [
  { url: '/tam/1.png', message: '🌕 Trung thu năm nay, Trường gửi đến Tám chiếc bánh trung thu đặc biệt này. Chúc Tám luôn rạng rỡ như trăng tròn!' },
  { url: '/tam/2.png', message: '⭐ Chúc Tám luôn là một ngôi sao sáng, tỏa sáng theo cách riêng và đạt được những ước mơ của mình.' },
  { url: '/tam/3.png', message: '🎑 Trăng tròn đêm rằm, thật tuyệt khi nghĩ về những người bạn quý mến. Chúc Tám Trung thu vui vẻ và hạnh phúc bên gia đình!' },
  { url: '/tam/4.png', message: '✨ Như ánh trăng soi sáng đêm Trung thu, mong Tám luôn lan tỏa năng lượng tích cực và rạng rỡ.' },
  { url: '/tam/5.png', message: '🏮 Đèn lồng lung linh, bánh trung thu ngọt ngào, nhưng không gì bằng nụ cười của Tám. Chúc Tám vui vẻ!' },
  { url: '/tam/6.png', message: '🌙 Trung thu là dịp đoàn viên, Trường chúc Tám có những giây phút thật ấm cúng và ý nghĩa bên gia đình.' },
  { url: '/tam/7.png', message: '🎁 Một món quà nhỏ Trường gửi tặng Táo. Chúc Tám một mùa Trung thu thật ấm áp và đáng nhớ!' },
  { url: '/tam/8.png', message: '💫 Trung thu này, Trường chúc Tám nhận được thật nhiều niềm vui và những điều tốt đẹp.' },
  { url: '/tam/9.png', message: '🌸 Táo thân yêu, mỗi chiếc lá thu rơi là một lời chúc Trường gửi đến. Chúc Tám Trung thu an lành!' },
  { url: '/tam/10.png', message: '🎋 Tám ơi, trăng tròn rồi đấy! Trường chúc Tám có một đêm Trung thu thật tuyệt vời bên người thân!' },
  { url: '/tam/11.png', message: '🌟 Nếu trăng là ánh sáng của đêm Trung thu, chúc Tám cũng luôn tìm thấy ánh sáng dẫn lối trên con đường của riêng mình.' },
  { url: '/tam/12.png', message: '🎐 Gió thu nhẹ nhàng, trăng tròn sáng rỡ, Trường gửi lời chúc đến Tám: Luôn vui, luôn xinh, luôn hạnh phúc!' },
  { url: '/tam/13.png', message: '🌺 Mùa Trung thu này, Trường chúc Tám mọi điều tốt đẹp nhất. Tám xứng đáng nhận được những điều tuyệt vời.' },
  { url: '/tam/14.png', message: '🎆 Pháo hoa rực rỡ không bằng nụ cười của Tám. Chúc Tám Trung thu tràn ngập niềm vui!' },
  { url: '/tam/15.png', message: '🌼 Trăng tròn như biểu tượng cho hạnh phúc đủ đầy. Chúc Tám luôn vui vẻ và cảm thấy trọn vẹn mỗi ngày!' },
  { url: '/tam/16.png', message: '🎪 Đêm hội trăng rằm thật náo nhiệt. Chúc Tám một mùa Trung thu thật ngọt ngào như bánh dẻo!' },
  { url: '/tam/17.png', message: '🌻 Tám là một người bạn đặc biệt, xứng đáng nhận mọi điều tuyệt vời. Chúc Tám Trung thu thật hạnh phúc!' },
  { url: '/tam/18.png', message: '🎨 Trường vẽ nên những lời chúc đẹp nhất gửi đến Tám. Chúc Tám luôn tươi sáng như mặt trăng!' },
  { url: '/tam/19.png', message: '🌈 Cầu vồng sau mưa không đẹp bằng Tám. Trường chúc Tám Trung thu an yên, hạnh phúc bên người thân!' },
  { url: '/tam/20.png', message: '🎭 Trung thu là ngày của những điều kỳ diệu. Chúc Tám sẽ gặp thật nhiều điều kỳ diệu và may mắn trong cuộc sống!' },
  { url: '/tam/21.png', message: '🌿 Tám thân yêu, như chiếc lá xanh tươi trong vườn thu. Trường chúc Tám luôn khỏe mạnh và tràn đầy năng lượng!' },
  { url: '/tam/22.png', message: '🎯 Mục tiêu của Trường trong mùa Trung thu này: Làm Tám cười thật nhiều! Chúc Tám vui vẻ nhé!' },
  { url: '/tam/23.png', message: '🌾 Thu về lá vàng rơi, nhưng mong rằng tình bạn của chúng ta thì mãi xanh tươi. Chúc Tám một mùa lễ hội ý nghĩa!' },
  { url: '/tam/24.png', message: '🎪 Đêm hội trăng rằm, Trường gửi đến Tám muôn vàn lời chúc tốt đẹp. Chúc Tám luôn rạng ngời!' },
  { url: '/tam/25.png', message: '🌠 Mỗi vì sao trên trời là một điều ước tốt lành Trường dành cho Tám. Chúc Tám Trung thu an lành!' },
  { url: '/tam/26.png', message: '🎀 Chúc Tám nhận được nhiều món quà ý nghĩa trong mùa Trung thu ấm áp này!' },
  { url: '/tam/27.png', message: '🌏 Dù ở đâu, Trường cũng nhớ đến Tám trong đêm Trung thu này. Chúc Tám luôn hạnh phúc bên gia đình!' },
  { url: '/tam/28.png', message: '🎵 Giai điệu của mùa Trung thu là tiếng cười của Tám. Trường chúc Tám luôn vui vẻ, tràn đầy yêu thương!' },
  { url: '/tam/29.png', message: '💝 Trung thu là tết thiếu nhi, cớ sao người lớn lại đi Quảng Ninh'},
];
function createStarTexture(color = '#ffffff', points = 5) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.clearRect(0, 0, size, size);

  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = 45;
  const innerRadius = 18;

  // Vẽ glow effect bên ngoài
  ctx.shadowColor = color;
  ctx.shadowBlur = 40;

  // Vẽ vì sao
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / points;
    const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
    const y = centerY + Math.sin(angle - Math.PI / 2) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();

  // Tạo gradient rực rỡ cho vì sao
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, outerRadius);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.3, color);
  gradient.addColorStop(0.8, color);
  gradient.addColorStop(1, color);
  
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 1;
  ctx.fill();
  
  // Vẽ viền sáng màu
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.8;
  ctx.stroke();
  
  // Vẽ thêm glow layer
  ctx.shadowBlur = 25;
  ctx.globalAlpha = 0.4;
  ctx.stroke();

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState('');

  const starTextures = useMemo(() => {
    const textures = [];
    COLORS.forEach((color) => {
      // Tạo vì sao với nhiều loại khác nhau
      textures.push(createStarTexture(color, 5)); // Vì sao 5 cánh
      textures.push(createStarTexture(color, 4)); // Vì sao 4 cánh
      textures.push(createStarTexture(color, 6)); // Vì sao 6 cánh
    });
    return textures;
  }, []);

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
    // Nền đen với chút tím của dải ngân hà
    renderer.setClearColor(0x0a0520, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene = new THREE.Scene();
    // Thêm fog nhẹ để tạo chiều sâu ngân hà
    scene.fog = new THREE.FogExp2(0x0a0520, 0.015);
    
    camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 100
    );
    camera.position.set(0, 0, Math.max(spreadX, spreadZ) * 1.8);

    // Ánh sáng dịu hơn cho không gian ngân hà
    scene.add(new THREE.AmbientLight(0xaaaaff, 0.8));
    const spot = new THREE.PointLight(0xccccff, 1.0);
    spot.position.set(0, 8, 10);
    scene.add(spot);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = window.innerWidth < 600 ? 5 : 8;
    controls.maxDistance = window.innerWidth < 600 ? 20 : 40;
    controls.enablePan = false;

    let textMeshes = [];
    let starMeshes = [];
    let imageMeshes = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function createObjects() {
      for (let obj of textMeshes) {
        scene.remove(obj.mesh);
        obj.mesh.dispose();
      }
      for (let obj of starMeshes) {
        scene.remove(obj.mesh);
        obj.mesh.material.dispose();
        obj.mesh.material.map.dispose();
      }
      for (let obj of imageMeshes) {
        scene.remove(obj.mesh);
        obj.mesh.material.dispose();
        if (obj.mesh.material.map) obj.mesh.material.map.dispose();
      }
      textMeshes = [];
      starMeshes = [];
      imageMeshes = [];

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

      // Tạo vì sao lấp lánh như dải ngân hà
      for (let i = 0; i < N_HEART; i++) {
        const size = (window.innerWidth < 600 ? 0.3 : 0.5) + Math.random() * 0.8;
        const mat = new THREE.SpriteMaterial({
          map: starTextures[Math.floor(Math.random() * starTextures.length)],
          transparent: true,
          blending: THREE.AdditiveBlending, // Hiệu ứng phát sáng ngân hà
          depthWrite: false
        });
        const sprite = new THREE.Sprite(mat);
        const x = (Math.random() - 0.5) * spreadX;
        const z = (Math.random() - 0.5) * spreadZ;
        sprite.scale.set(size, size, 1);
        sprite.position.set(x, Math.random() * (maxY - minY) + minY, z);
        starMeshes.push({
          mesh: sprite,
          speed: 0.008 + Math.random() * 0.03, // Rơi chậm hơn một chút
          size,
          lane: [x, z],
          rotationSpeed: (Math.random() - 0.5) * 0.02, // Xoay ngẫu nhiên
          twinklePhase: Math.random() * Math.PI * 2 // Pha lấp lánh
        });
        scene.add(sprite);
      }

      // Tạo hình ảnh rơi với hiệu ứng tròn và phát sáng
      const textureLoader = new THREE.TextureLoader();
      const N_IMAGES = Math.min(IMAGES.length * 2, 15); // Số lượng hình ảnh
      for (let i = 0; i < N_IMAGES; i++) {
        const imageData = IMAGES[i % IMAGES.length];
        const imageUrl = imageData.url;
        const imageMessage = imageData.message;
        
        // Tạo canvas với hiệu ứng tròn và glow - kích thước lớn hơn để nét hơn
        const canvasSize = 1024;
        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d', { 
          alpha: true,
          desynchronized: false,
          willReadFrequently: false
        });
        
        // Load hình ảnh và vẽ lên canvas
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Clear canvas - đảm bảo trong suốt hoàn toàn
          ctx.clearRect(0, 0, canvasSize, canvasSize);
          
          const centerX = canvasSize / 2;
          const centerY = canvasSize / 2;
          const imageRadius = canvasSize * 0.25;
          const glowRadius = canvasSize * 0.38;
          
          // Vẽ glow effect bằng radial gradient (chỉ hình tròn)
          const glowGradient = ctx.createRadialGradient(
            centerX, centerY, imageRadius,
            centerX, centerY, glowRadius
          );
          glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          glowGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
          glowGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
          glowGradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.1)');
          glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          // Vẽ glow circle
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
          ctx.restore();
          
          // Vẽ viền trắng sáng
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, imageRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
          ctx.lineWidth = 6;
          ctx.shadowColor = 'rgba(255, 255, 255, 1)';
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.restore();
          
          // Vẽ hình ảnh vào hình tròn
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, imageRadius - 3, 0, Math.PI * 2);
          ctx.clip();
          
          // Vẽ hình ảnh căn giữa với chất lượng cao
          const imgSize = (imageRadius - 3) * 2;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 
            centerX - imgSize/2, 
            centerY - imgSize/2, 
            imgSize, 
            imgSize
          );
          ctx.restore();
          
          // Update texture
          texture.needsUpdate = true;
        };
        img.src = imageUrl;
        
        const texture = new THREE.CanvasTexture(canvas);
        // Cài đặt để hình ảnh nét hơn, không bị blur
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        
        const size = (window.innerWidth < 600 ? 1.5 : 2.8) + Math.random() * 0.8;
        const mat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthTest: true,
          depthWrite: false
        });
        const sprite = new THREE.Sprite(mat);
        const x = (Math.random() - 0.5) * spreadX;
        const z = (Math.random() - 0.5) * spreadZ;
        sprite.scale.set(size, size, 1);
        sprite.position.set(x, Math.random() * (maxY - minY) + minY, z);
        sprite.userData = { 
          imageUrl, 
          imageMessage, 
          clickable: true 
        };
        imageMeshes.push({
          mesh: sprite,
          speed: 0.008 + Math.random() * 0.02,
          size,
          lane: [x, z],
          imageUrl,
          imageMessage
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
      // Vì sao rơi và lấp lánh như dải ngân hà
      for (let obj of starMeshes) {
        obj.mesh.position.y -= obj.speed;
        
        // Xoay vì sao
        obj.mesh.material.rotation += obj.rotationSpeed;
        
        // Hiệu ứng lấp lánh (twinkle)
        obj.twinklePhase += 0.05;
        const twinkle = 0.7 + Math.sin(obj.twinklePhase) * 0.3;
        obj.mesh.material.opacity = twinkle;
        
        // Scale thay đổi nhẹ để tạo hiệu ứng sáng tắt
        const scaleVariation = 1 + Math.sin(obj.twinklePhase * 0.5) * 0.15;
        obj.mesh.scale.set(obj.size * scaleVariation, obj.size * scaleVariation, 1);
        
        if (obj.mesh.position.y < minY) {
          obj.mesh.position.y = maxY;
          obj.mesh.position.x = (Math.random() - 0.5) * spreadX;
          obj.mesh.position.z = (Math.random() - 0.5) * spreadZ;
          obj.lane = [obj.mesh.position.x, obj.mesh.position.z];
        }
      }
      for (let obj of imageMeshes) {
        obj.mesh.position.y -= obj.speed;
        // Thêm hiệu ứng xoay nhẹ
        obj.mesh.material.rotation += 0.002;
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

    // Xử lý click vào hình ảnh
    const handleClick = (event) => {
      // Tính toán vị trí chuột trong normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Cập nhật raycaster
      raycaster.setFromCamera(mouse, camera);

      // Kiểm tra giao điểm với các hình ảnh
      const imageSprites = imageMeshes.map(obj => obj.mesh);
      const intersects = raycaster.intersectObjects(imageSprites);

      if (intersects.length > 0) {
        const clickedSprite = intersects[0].object;
        if (clickedSprite.userData.clickable) {
          setSelectedImage(clickedSprite.userData.imageUrl);
          setSelectedMessage(clickedSprite.userData.imageMessage || '');
        }
      }
    };

    window.addEventListener('click', handleClick);

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
      window.removeEventListener('click', handleClick);
      starTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, [audioStarted, isMuted, starTextures]);

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
        <title>Quà tặng Trung thu cho Tám - Món quà đặc biệt</title>
        <meta
          name="description"
          content="Món quà Trung thu đặc biệt 3D với những ngôi sao lấp lánh, lời chúc ngọt ngào và hình ảnh kỷ niệm. Một không gian ngân hà đầy màu sắc dành tặng Tám yêu quý." />
        <meta
          name="keywords"
          content="quà trung thu, tặng quà 3D, ngôi sao lấp lánh, không gian ngân hà, WebGL, Three.js, React, món quà đặc biệt, truongnq.vn"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Quà tặng Trung thu cho Tám - Món quà đặc biệt" />
        <meta
          property="og:description"
          content="Món quà Trung thu đặc biệt 3D với những ngôi sao lấp lánh, lời chúc ngọt ngào và hình ảnh kỷ niệm. Một không gian ngân hà đầy màu sắc dành tặng Tám yêu quý." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/tam/1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="stylesheet" href="/fonts.css" />
        <link rel="stylesheet" href="/to-tinh.css" />
      </Head>
      <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh", display: "block" }} />
      <audio ref={audioRef} src="/ruoc-den-thang-tam.mp3" loop hidden />
      <button
        onClick={toggleAudio}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded opacity-40 hover:opacity-80 transition-opacity z-10"
      >
        {audioStarted ? (isMuted ? "Tắt tiếng" : "Bật tiếng") : "Phát nhạc"}
      </button>

      {/* Modal hiển thị hình ảnh lớn */}
      {selectedImage && (
        <div 
          className="modal-overlay fixed inset-0  bg-opacity-20 flex items-center justify-center z-50 p-4"
          style={{ backdropFilter: 'blur(10px)' }}
          onClick={() => {
            setSelectedImage(null);
            setSelectedMessage('');
          }}
        >
          <div 
            className="modal-content relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hình ảnh */}
            <div className="relative w-full inline-block">
              <img 
                src={selectedImage} 
                alt="Hình ảnh phóng to" 
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: '70vh' }}
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedMessage('');
                }}
                className="close-button absolute -top-3 -right-3 hover:text-white bg-white bg-opacity-95 text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-gray-200 hover:scale-110 transition-all z-10"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            
            {/* Lời chúc */}
            {selectedMessage && (
              <div className="mt-6 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 px-6 rounded-2xl shadow-2xl max-w-2xl w-full">
                <p className="text-white text-xl md:text-xl font-medium text-center leading-relaxed">
                  {selectedMessage}
                </p>
      
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}