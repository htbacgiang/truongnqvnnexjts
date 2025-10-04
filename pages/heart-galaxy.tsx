import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/HeartGalaxy.module.css';

const HeartGalaxy = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tạo các tia sáng cho trái tim
  const createHeartRays = () => {
    const rays = [];
    const numRays = 200;
    
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2;
      const t = angle;
      
      // Phương trình trái tim: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      rays.push(
        <div
          key={i}
          className={styles.heartRay}
          style={{
            left: `calc(50% + ${x * 3}px)`,
            top: `calc(30% + ${y * 3}px)`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        />
      );
    }
    return rays;
  };

  // Tạo các vòng chữ Galaxy
  const createGalaxyRings = () => {
    const rings = [];
    const texts = [
      "Love • Yêu • Amore • 愛 • حب • Любовь • प्रेम • ",
      "Heart • Trái tim • Corazón • 心 • قلب • Сердце • दिल • ",
      "Forever • Mãi mãi • Para siempre • 永远 • إلى الأبد • Навсегда • हमेशा • ",
      "Together • Cùng nhau • Juntos • 一起 • معا • Вместе • साथ • ",
      "Dream • Giấc mơ • Sueño • 梦想 • حلم • Мечта • सपना • "
    ];

    for (let i = 0; i < 5; i++) {
      const radius = 150 + i * 80;
      const text = texts[i];
      const chars = text.split('');
      
      rings.push(
        <div
          key={i}
          className={styles.galaxyRing}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            animationDuration: `${20 + i * 5}s`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
          }}
        >
          {chars.map((char, charIndex) => {
            const angle = (charIndex / chars.length) * 360;
            return (
              <span
                key={charIndex}
                className={styles.galaxyChar}
                style={{
                  transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                  animationDelay: `${charIndex * 0.1}s`
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      );
    }
    return rings;
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Heart Galaxy - Hiệu ứng Trái tim và Galaxy</title>
        <meta name="description" content="Trang web với hiệu ứng trái tim bằng tia sáng nhấp nháy và các vòng chữ quay như Galaxy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        {/* Phần trái tim với tia sáng */}
        <div className={styles.heartSection}>
          <div className={styles.heartContainer}>
            {createHeartRays()}
            <div className={styles.heartCore}>
              <div className={styles.heartGlow}></div>
            </div>
          </div>
        </div>

        {/* Phần Galaxy với các vòng chữ */}
        <div className={styles.galaxySection}>
          <div className={styles.galaxyContainer}>
            {createGalaxyRings()}
            <div className={styles.galaxyCenter}>
              <div className={styles.centerStar}></div>
            </div>
          </div>
        </div>

        {/* Các ngôi sao nền */}
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
      </div>
    </>
  );
};

export default HeartGalaxy;

