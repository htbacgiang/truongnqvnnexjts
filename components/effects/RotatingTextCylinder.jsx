import React, { useState, useEffect } from 'react';
import styles from '../../styles/RotatingTextCylinder.module.css';

const RotatingTextCylinder = ({ 
  texts = [
    "Thiết kế Website",
    "Dịch vụ SEO", 
    "Landing Page",
    "Tối ưu Google",
    "Marketing Online",
    "Branding",
    "E-commerce",
    "Mobile App"
  ],
  centerText = "TRƯỜNG NQ",
  radius = 200,
  speed = 20
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tạo các orbit với text xoay 360 độ
  const createTextOrbits = () => {
    const orbits = [];
    const numOrbits = texts.length;

    texts.forEach((text, orbitIndex) => {
      const orbitRadius = radius + (orbitIndex * 60);
      const rotationSpeed = speed + (orbitIndex * 5);
      const direction = orbitIndex % 2 === 0 ? 'normal' : 'reverse';
      
      // Chia text thành các ký tự để tạo hiệu ứng cylinder
      const chars = text.split('');
      const angleStep = 360 / chars.length;

      orbits.push(
        <div
          key={orbitIndex}
          className={styles.textOrbit}
          style={{
            width: `${orbitRadius * 2}px`,
            height: `${orbitRadius * 2}px`,
            animationDuration: `${rotationSpeed}s`,
            animationDirection: direction,
            '--orbit-radius': `${orbitRadius}px`
          }}
        >
          {chars.map((char, charIndex) => {
            const angle = charIndex * angleStep;
            const delay = charIndex * 0.1;
            
            return (
              <div
                key={charIndex}
                className={styles.textChar}
                style={{
                  '--char-angle': `${angle}deg`,
                  '--char-radius': `${orbitRadius}px`,
                  animationDelay: `${delay}s`,
                  transform: `
                    rotate(${angle}deg) 
                    translateY(-${orbitRadius}px) 
                    rotateY(0deg)
                  `
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

  // Tạo các hành tinh nhỏ quay quanh
  const createPlanets = () => {
    const planets = [];
    const planetCount = 8;

    for (let i = 0; i < planetCount; i++) {
      const planetRadius = 300 + (i * 80);
      const planetSpeed = 30 + (i * 10);
      const angle = (i / planetCount) * 360;

      planets.push(
        <div
          key={`planet-${i}`}
          className={styles.planetOrbit}
          style={{
            width: `${planetRadius * 2}px`,
            height: `${planetRadius * 2}px`,
            animationDuration: `${planetSpeed}s`,
            transform: `rotate(${angle}deg)`
          }}
        >
          <div 
            className={styles.planet}
            style={{
              '--planet-color': `hsl(${i * 45}, 70%, 60%)`
            }}
          >
            <div className={styles.planetGlow}></div>
          </div>
        </div>
      );
    }

    return planets;
  };

  // Tạo các particle bay xung quanh
  const createParticles = () => {
    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 4;

      particles.push(
        <div
          key={`particle-${i}`}
          className={styles.particle}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    }

    return particles;
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      {/* Background với hiệu ứng không gian */}
      <div className={styles.spaceBackground}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
      </div>

      {/* Particles bay xung quanh */}
      <div className={styles.particleContainer}>
        {createParticles()}
      </div>

      {/* Mặt trời trung tâm */}
      <div className={styles.centerSun}>
        <div className={styles.sunCore}>
          <div className={styles.sunGlow}></div>
          <div className={styles.centerTextContainer}>
            <h1 className={styles.centerText}>{centerText}</h1>
          </div>
        </div>
        <div className={styles.sunRays}></div>
      </div>

      {/* Các orbit text xoay */}
      <div className={styles.textSystem}>
        {createTextOrbits()}
      </div>

      {/* Các hành tinh quay xung quanh */}
      <div className={styles.planetSystem}>
        {createPlanets()}
      </div>

      {/* Hiệu ứng ánh sáng trung tâm */}
      <div className={styles.centralLight}></div>
    </div>
  );
};

export default RotatingTextCylinder;
