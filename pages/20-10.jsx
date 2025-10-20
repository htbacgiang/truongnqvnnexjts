import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function WomensDay() {
  const [stage, setStage] = useState(1); // 1: Welcome, 2: Flowers, 3: Message
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Tạo audio element khi component mount
    const audioElement = new Audio('/xinh-tuoi-viet-nam.mp3');
    audioElement.loop = true;
    audioElement.volume = 0.3; // Âm lượng nhẹ
    
    // Event listeners
    audioElement.addEventListener('play', () => setIsPlaying(true));
    audioElement.addEventListener('pause', () => setIsPlaying(false));
    audioElement.addEventListener('ended', () => setIsPlaying(false));
    
    setAudio(audioElement);

    // Cleanup khi component unmount
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);

  const handleImageClick = () => {
    if (stage === 1) {
      // Phát nhạc ngay khi click vào ảnh
      if (audio) {
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      setStage(2);
    }
  };

  const handleFlowerClick = () => {
    if (stage === 2) {
      setStage(3);
    }
  };

  return (
    <>
      <Head>
        <title>Chúc mừng ngày phụ nữ Việt Nam 20-10 - Trường NQ</title>
        <meta name="description" content="Trang chúc mừng ngày phụ nữ Việt Nam 20/10 với thiệp điện tử đẹp mắt, âm nhạc lãng mạn và lời chúc ý nghĩa dành cho những người phụ nữ đặc biệt." />
        <meta name="keywords" content="20/10, ngày phụ nữ Việt Nam, chúc mừng, thiệp điện tử, lãng mạn, Trường NQ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Trường NQ" />
        <meta name="language" content="vi" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Chúc mừng ngày phụ nữ Việt Nam 20-10 - Trường NQ" />
        <meta property="og:description" content="Trang chúc mừng ngày phụ nữ Việt Nam 20/10 với thiệp điện tử đẹp mắt, âm nhạc lãng mạn và lời chúc ý nghĩa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://truongnq.vn/20-10" />
        <meta property="og:image" content="https://truongnq.vn/2010/bo-hoa.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Trường NQ" />
        <meta property="og:locale" content="vi_VN" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chúc mừng ngày phụ nữ Việt Nam 20-10" />
        <meta name="twitter:description" content="Thiệp điện tử đẹp mắt với âm nhạc lãng mạn dành cho ngày 20/10" />
        <meta name="twitter:image" content="https://truongnq.vn/2010/bo-hoa.png" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#ffb3d9" />
        <meta name="msapplication-TileColor" content="#ffb3d9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="20/10 - Trường NQ" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://truongnq.vn/20-10" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Chúc mừng ngày phụ nữ Việt Nam 20-10",
              "description": "Trang chúc mừng ngày phụ nữ Việt Nam 20/10 với thiệp điện tử đẹp mắt",
              "url": "https://truongnq.vn/20-10",
              "author": {
                "@type": "Person",
                "name": "Trường NQ",
                "url": "https://truongnq.vn"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Trường NQ",
                "url": "https://truongnq.vn"
              },
              "datePublished": "2024-10-20",
              "dateModified": "2024-10-20",
              "inLanguage": "vi-VN"
            })
          }}
        />
      </Head>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Audio Control Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={() => {
            if (audio) {
              if (audio.paused) {
                audio.play().catch(e => console.log('Audio play failed:', e));
              } else {
                audio.pause();
              }
            }
          }}
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg transition-colors duration-300"
          style={{ boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)' }}
        >
          {isPlaying ? '🔊' : '🔇'}
        </motion.button>

        {/* Background gradient */}
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: stage === 1 
              ? 'linear-gradient(135deg, #ffd6e8 0%, #ffb3d9 25%, #ff9ed1 50%, #ffb3d9 75%, #ffd6e8 100%)'
              : stage === 2
              ? 'linear-gradient(135deg, #ffd6e8 0%, #ffb3d9 25%, #ff9ed1 50%, #ffb3d9 75%, #ffd6e8 100%)'
              : 'linear-gradient(135deg, #ffe5f1 0%, #ffd1e8 25%, #ffb8de 50%, #ffd1e8 75%, #ffe5f1 100%)'
          }}
        />

        {/* Stage 1: Welcome Screen */}
        <AnimatePresence>
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center justify-center px-4"
            >
              {/* Title */}
              <motion.h1
                initial={{ y: -30, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="text-5xl md:text-6xl font-bold mb-12"
                style={{
                  color: '#ffffff',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Tặng Tám nè
              </motion.h1>

              {/* Rabbit Image Container */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleImageClick}
                className="relative cursor-pointer mb-6"
                style={{
                  width: '280px',
                  height: '280px',
                  background: 'white',
                  borderRadius: '24px',
                  padding: '20px',
                  boxShadow: '0 20px 60px rgba(233, 30, 99, 0.3)',
                }}
              >
                {/* Cat Image */}
                <img 
                  src="/2010/meo.png" 
                  alt="Cute cat with flowers"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Caption */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.0, 
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-2xl md:text-3xl font-semibold italic"
                style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Click vào ảnh nhé
              </motion.p>

              {/* Floating hearts animation for stage 1 */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0.8, scale: 0 }}
                  animate={{ 
                    y: -200, 
                    opacity: 0,
                    scale: [0, 1, 1, 0.5]
                  }}
                  transition={{ 
                    delay: 1.5 + i * 0.4,
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: `${15 + i * 15}%`,
                    bottom: '10%'
                  }}
                >
                  💕
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: Flower Animation */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center justify-center px-4"
            >
              {/* Title */}
              <motion.h1
                initial={{ y: -30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center px-4"
                style={{
                  color: '#ffffff',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                Chúc mừng ngày phụ nữ<br />Việt Nam 20-10
              </motion.h1>

              {/* Flower Bouquet */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 15 }}
                onClick={handleFlowerClick}
                className="cursor-pointer relative"
              >
                <img 
                  src="/2010/bo-hoa.png" 
                  alt="Beautiful flower bouquet"
                  className="w-64 h-80 md:w-80 md:h-96 object-contain"
                />
              </motion.div>

              {/* Touch instruction */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.8, 
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-lg md:text-xl mt-4 font-medium"
                style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Chạm vào bông hoa nhá Tám 🌷
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: Message Box */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-2xl"
            >
              {/* Title */}
              <motion.h1
                initial={{ y: -30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                style={{
                  color: '#ffffff',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                Chúc mừng ngày phụ nữ<br />Việt Nam 20-10
              </motion.h1>

              {/* Message Card */}
              <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                className="relative mx-4"
                style={{
                  maxWidth: '500px',
                  background: 'linear-gradient(135deg, #fef7f0 0%, #f8f4f0 50%, #fef7f0 100%)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  boxShadow: '0 20px 60px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  border: '2px solid #d4af8c',
                  position: 'relative',
                  transform: 'rotate(-1deg)',
                }}
              >
                {/* Letter lines */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(139, 69, 19, 0.1) 24px, rgba(139, 69, 19, 0.1) 25px)',
                    borderRadius: '18px',
                    margin: '10px',
                  }}
                />
                
                {/* Decorative corner */}
                <div 
                  className="absolute top-4 right-4"
                  style={{
                    width: '30px',
                    height: '30px',
                    background: 'linear-gradient(45deg, #ff6b9d, #ff8fab)',
                    borderRadius: '50%',
                    opacity: 0.7,
                  }}
                />
                
                {/* Decorative border pattern */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{
                    background: 'linear-gradient(90deg, #ff6b9d, #ff8fab, #ffa6c1, #ff8fab, #ff6b9d)',
                    borderRadius: '18px 18px 0 0',
                  }}
                />
                
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2"
                  style={{
                    background: 'linear-gradient(90deg, #ff6b9d, #ff8fab, #ffa6c1, #ff8fab, #ff6b9d)',
                    borderRadius: '0 0 18px 18px',
                  }}
                />

                {/* Message Title */}
                <motion.h2
                  initial={{ x: -20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1.2, 
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 150,
                    damping: 10
                  }}
                  className="text-3xl md:text-4xl font-bold mb-6 text-center"
                  style={{ 
                    color: '#8b4513',
                    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  Gửi Tám
                </motion.h2>

                {/* Message Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 1.5, 
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="space-y-4"
                >
                  <p className="text-lg md:text-xl leading-relaxed" style={{ 
                    color: '#5d4037',
                    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)'
                  }}>
                    <strong>Nhân ngày 20/10, xin gửi đến Táo lời chúc tốt đẹp nhất 🌸</strong>
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed" style={{ 
                    color: '#6d4c41',
                    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
                  }}>
                    Chúc Táo luôn mạnh khỏe, vui vẻ, được yêu thương thật nhiều
                    và luôn giữ được trái tim ấm như bếp lửa mà chú vẫn nhóm lên cho mọi người 💖
                  </p>
                </motion.div>
              </motion.div>

              {/* Additional message with link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 2.0, 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="mt-8 text-center"
              >
                <p className="text-sm md:text-base" style={{ 
                  color: '#8b4513',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}>
                  Tám rảnh thì vô đây đọc những dòng tâm hự của Trường nhé, 
                  <br />
                  <Link 
                    href="/bai-viet"
                    className="underline hover:no-underline transition-all duration-300"
                    style={{ 
                      color: '#d2691e',
                      textDecorationColor: '#d2691e'
                    }}
                  >
                     https://truongnq.vn/bai-viet
                  </Link>
                </p>
              </motion.div>

              {/* Floating hearts animation */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0.8, scale: 0 }}
                  animate={{ 
                    y: -300, 
                    opacity: 0,
                    scale: [0, 1, 1, 0.5]
                  }}
                  transition={{ 
                    delay: 2 + i * 0.3,
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: `${20 + i * 10}%`,
                    bottom: '20%'
                  }}
                >
                  💕
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

