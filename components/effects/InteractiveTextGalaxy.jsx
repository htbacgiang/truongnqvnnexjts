import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../../styles/InteractiveTextGalaxy.module.css';

const InteractiveTextGalaxy = ({ 
  texts = [
    "Thiết kế Website chuyên nghiệp",
    "Dịch vụ SEO tối ưu Google", 
    "Landing Page chuyển đổi cao",
    "Tối ưu thứ hạng tìm kiếm",
    "Marketing Online hiệu quả",
    "Branding thương hiệu mạnh",
    "E-commerce bán hàng online",
    "Mobile App ứng dụng di động"
  ],
  centerText = "TRƯỜNG NQ"
}) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const containerRef = useRef(null);
  const galaxyRef = useRef(null);
  
  // Interactive states
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Hide instructions after 5 seconds
      setTimeout(() => setShowInstructions(false), 5000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.5
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMouse]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Resume auto rotation after 3 seconds
    setTimeout(() => setAutoRotate(true), 3000);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setAutoRotate(false);
      setLastMouse({ x: touch.clientX, y: touch.clientY });
    }
    e.preventDefault();
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMouse.x;
    const deltaY = touch.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.3)),
      y: prev.y + deltaX * 0.3
    }));
    
    setLastMouse({ x: touch.clientX, y: touch.clientY });
    e.preventDefault();
  }, [isDragging, lastMouse]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 3000);
  }, []);

  // Wheel zoom handler
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  }, []);

  // Pinch zoom for mobile
  const [lastPinchDistance, setLastPinchDistance] = useState(0);
  
  const handleTouchMoveZoom = useCallback((e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (lastPinchDistance > 0) {
        const delta = (distance - lastPinchDistance) * 0.01;
        setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
      }
      
      setLastPinchDistance(distance);
      e.preventDefault();
    }
  }, [lastPinchDistance]);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    // Global listeners for drag
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchmove', handleTouchMoveZoom, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchmove', handleTouchMoveZoom);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchMoveZoom]);

  // Create text orbits with 3D positioning
  const createTextOrbits = () => {
    const orbits = [];
    
    texts.forEach((text, orbitIndex) => {
      const orbitRadius = 200 + (orbitIndex * 80);
      const rotationSpeed = 20 + (orbitIndex * 5);
      const direction = orbitIndex % 2 === 0 ? 1 : -1;
      
      const chars = text.split('');
      const angleStep = 360 / chars.length;

      orbits.push(
        <div
          key={orbitIndex}
          className={styles.textOrbit}
          style={{
            '--orbit-radius': `${orbitRadius}px`,
            '--rotation-speed': `${rotationSpeed}s`,
            '--direction': direction,
            animationPlayState: isDragging ? 'paused' : 'running'
          }}
        >
          {chars.map((char, charIndex) => {
            const angle = charIndex * angleStep;
            const radians = (angle * Math.PI) / 180;
            
            // 3D positioning
            const x = Math.cos(radians) * orbitRadius;
            const z = Math.sin(radians) * orbitRadius;
            
            return (
              <div
                key={charIndex}
                className={styles.textChar}
                style={{
                  '--char-x': `${x}px`,
                  '--char-z': `${z}px`,
                  '--char-angle': `${angle}deg`,
                  animationDelay: `${charIndex * 0.1}s`
                }}
              >
                <span className={styles.char3d}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </div>
            );
          })}
        </div>
      );
    });

    return orbits;
  };

  // Create floating particles
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      
      particles.push(
        <div
          key={i}
          className={styles.particle}
          style={{
            '--particle-x': `${x}px`,
            '--particle-y': `${y}px`,
            '--particle-z': `${z}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      );
    }
    return particles;
  };

  if (!mounted) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Loading Screen */}
      {isLoading && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <h2>Creating your universe...</h2>
            <p>A galactic experience awaits you</p>
          </div>
        </div>
      )}

      {/* Instructions Overlay */}
      {showInstructions && !isLoading && (
        <div className={styles.instructionsOverlay}>
          <div className={styles.instructions}>
            <h3>🌟 Galactic Controls</h3>
            <div className={styles.controlsList}>
              <div>🖱️ Drag to rotate</div>
              <div>🔍 Scroll to zoom</div>
              <div>📱 Tap and swipe on mobile</div>
            </div>
            <button 
              className={styles.closeInstructions}
              onClick={() => setShowInstructions(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Background */}
      <div className={styles.spaceBackground}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
      </div>

      {/* Main Galaxy Container */}
      <div 
        className={styles.galaxyContainer}
        ref={galaxyRef}
        style={{
          transform: `
            perspective(1000px) 
            rotateX(${rotation.x}deg) 
            rotateY(${rotation.y}deg) 
            scale(${zoom})
          `,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        {/* Particles */}
        <div className={styles.particleSystem}>
          {createParticles()}
        </div>

        {/* Central Sun */}
        <div className={styles.centralSun}>
          <div className={styles.sunCore}>
            <div className={styles.sunGlow}></div>
            <div className={styles.centerText}>
              {centerText}
            </div>
          </div>
          <div className={styles.sunRays}></div>
        </div>

        {/* Text Orbits */}
        <div className={styles.textSystem}>
          {createTextOrbits()}
        </div>

        {/* Orbital Rings */}
        <div className={styles.orbitalRings}>
          {[1, 2, 3, 4, 5].map(i => (
            <div 
              key={i}
              className={styles.orbitalRing}
              style={{
                '--ring-size': `${200 + i * 80}px`,
                '--ring-opacity': 0.1 - i * 0.015
              }}
            />
          ))}
        </div>
      </div>

      {/* Status Info */}
      <div className={styles.statusInfo}>
        <div>Zoom: {(zoom * 100).toFixed(0)}%</div>
        <div>Rotation: {rotation.y.toFixed(0)}°</div>
        <div className={styles.autoRotateIndicator}>
          {autoRotate ? '🔄 Auto' : '⏸️ Manual'}
        </div>
      </div>

      {/* Reset Button */}
      <button 
        className={styles.resetButton}
        onClick={() => {
          setRotation({ x: 0, y: 0 });
          setZoom(1);
          setAutoRotate(true);
        }}
      >
        🔄 Reset View
      </button>
    </div>
  );
};

export default InteractiveTextGalaxy;
