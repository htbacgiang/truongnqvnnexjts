import React, { useState, useEffect } from 'react';

const CompactTextCylinder = ({ 
  texts = [
    "Thiết kế Web",
    "Dịch vụ SEO", 
    "Landing Page",
    "Marketing"
  ],
  centerText = "TRƯỜNG NQ",
  size = "medium" // small, medium, large
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeConfig = {
    small: { radius: 80, fontSize: 12, centerSize: 10, containerSize: 200 },
    medium: { radius: 120, fontSize: 14, centerSize: 12, containerSize: 300 },
    large: { radius: 160, fontSize: 16, centerSize: 14, containerSize: 400 }
  };

  const config = sizeConfig[size];

  const createTextOrbits = () => {
    return texts.map((text, index) => {
      const orbitRadius = config.radius + (index * 30);
      const chars = text.split('');
      const angleStep = 360 / chars.length;

      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${orbitRadius * 2}px`,
            height: `${orbitRadius * 2}px`,
            transform: 'translate(-50%, -50%)',
            animation: `rotate${index % 2 === 0 ? 'Normal' : 'Reverse'} ${20 + index * 3}s linear infinite`
          }}
        >
          {chars.map((char, charIndex) => {
            const angle = charIndex * angleStep;
            return (
              <span
                key={charIndex}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  fontSize: `${config.fontSize}px`,
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: `
                    0 0 10px rgba(255, 255, 255, 0.8),
                    0 0 20px rgba(64, 196, 255, 0.6)
                  `,
                  transform: `
                    rotate(${angle}deg) 
                    translateY(-${orbitRadius}px) 
                    rotate(-${angle}deg)
                  `,
                  transformOrigin: 'center',
                  animation: `glow 3s ease-in-out infinite ${charIndex * 0.1}s`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      );
    });
  };

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: `${config.containerSize}px`,
        height: `${config.containerSize}px`,
        margin: '0 auto',
        background: 'radial-gradient(circle, rgba(10, 10, 35, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background stars */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 50px',
          animation: 'sparkle 15s linear infinite'
        }}
      />

      {/* Center sun */}
      <div
        style={{
          position: 'absolute',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffeb3b 0%, #ff9800 50%, #ff5722 100%)',
          boxShadow: `
            0 0 30px #ffeb3b,
            0 0 60px #ff9800
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'sunPulse 4s ease-in-out infinite',
          zIndex: 10
        }}
      >
        <span
          style={{
            fontSize: `${config.centerSize}px`,
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            whiteSpace: 'nowrap'
          }}
        >
          {centerText}
        </span>
      </div>

      {/* Text orbits */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {createTextOrbits()}
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes rotateNormal {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes rotateReverse {
          0% { transform: translate(-50%, -50%) rotate(360deg); }
          100% { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        @keyframes sunPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes glow {
          0%, 100% { 
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(64, 196, 255, 0.6);
          }
          50% { 
            text-shadow: 
              0 0 15px rgba(255, 255, 255, 1),
              0 0 25px rgba(64, 196, 255, 0.8);
          }
        }
        
        @keyframes sparkle {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-50px); }
        }
      `}</style>
    </div>
  );
};

export default CompactTextCylinder;
