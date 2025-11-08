import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function ThuChoTam() {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Hiệu ứng mở thư
    setTimeout(() => setIsVisible(true), 300);
    setTimeout(() => setShowContent(true), 800);

    // Lấy kích thước window
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Setup audio event listeners
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  };

  // Lấy ngày tháng năm hiện tại
  const dateStr = `Hà Nội, ngày ... tháng ... năm ...`;

  return (
    <>
      <Head>
        <title>Thư gửi Tám - Trường NQ</title>
        <meta name="description" content="Lá thư chân thành gửi đến Tám" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Audio element - Ẩn, chỉ dùng để phát audio */}
      <audio 
        ref={audioRef}
        src="/thu-cho-tam.mp3"
        preload="metadata"
        style={{ display: 'none' }}
      />

      <div className="min-h-screen flex items-center justify-center py-8 px-4 relative overflow-hidden">
        {/* Background với texture giấy cũ */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5b7 50%, #f5e6d3 100%)',
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(160, 82, 45, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(101, 67, 33, 0.02) 0%, transparent 50%)
            `
          }}
        />

        {/* Container lá thư */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ 
            scale: isVisible ? 1 : 0.8, 
            opacity: isVisible ? 1 : 0,
            rotateY: isVisible ? 0 : -15
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-3xl"
          style={{
            perspective: '1000px',
            zIndex: 10,
            position: 'relative',
          }}
        >
          {/* Lá thư chính */}
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative p-6 md:p-12 lg:p-16"
            style={{
              background: 'linear-gradient(to bottom, #fef9f3 0%, #faf5eb 100%)',
              borderRadius: '8px',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(139, 69, 19, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8)
              `,
              position: 'relative',
              transform: 'rotate(-0.5deg)',
              border: '2px solid #d4af8c',
            }}
          >
            {/* Hiệu ứng giấy cũ - các vết ố */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 15% 25%, rgba(139, 69, 19, 0.1) 0%, transparent 40%),
                  radial-gradient(circle at 85% 75%, rgba(160, 82, 45, 0.08) 0%, transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(101, 67, 33, 0.05) 0%, transparent 60%)
                `,
                borderRadius: '6px',
              }}
            />

            {/* Đường kẻ ngang như giấy viết thư */}
            <div 
              className="absolute inset-0 pointer-events-none m-6 md:m-12 lg:m-16"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(139, 69, 19, 0.08) 31px, rgba(139, 69, 19, 0.08) 32px)',
                borderRadius: '6px',
              }}
            />

            {/* Viền trang trí */}
            <div 
              className="absolute top-0 left-0 w-full h-1"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #d4af8c 20%, #c9a67a 50%, #d4af8c 80%, transparent 100%)',
                borderRadius: '6px 6px 0 0',
              }}
            />
            <div 
              className="absolute bottom-0 left-0 w-full h-1"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #d4af8c 20%, #c9a67a 50%, #d4af8c 80%, transparent 100%)',
                borderRadius: '0 0 6px 6px',
              }}
            />

            {/* Nội dung thư */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10"
              style={{
                fontFamily: '"SVN Dancing Script", "Dancing Script", "Arial", "Helvetica", cursive',
                color: '#3e2723',
                lineHeight: '1.9',
                fontSize: 'clamp(16px, 4vw, 20px)',
                fontWeight: '400',
                position: 'relative',
              }}
            >
              {/* Ngày tháng */}
              <div 
                className="text-left mb-6 md:mb-8"
                style={{ 
                  color: '#5d4037',
                  fontSize: '16px',
                  fontStyle: 'italic',
                  fontWeight: '500'
                }}
              >
                {dateStr}
              </div>

              {/* Nút nghe thu âm */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.9 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="mb-6 md:mb-8 mt-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleAudio}
                  className="w-full flex items-center justify-center gap-3 px-6 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: isPlaying 
                      ? 'linear-gradient(135deg, #ff6b6b, #ff8e8e)'
                      : 'linear-gradient(135deg, #d4af8c, #c9a67a)',
                    color: '#fff',
                    boxShadow: isPlaying
                      ? '0 8px 20px rgba(255, 107, 107, 0.4)'
                      : '0 4px 12px rgba(139, 69, 19, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                    className="text-2xl"
                  >
                    {isPlaying ? '🎵' : '🔊'}
                  </motion.div>
                  <span className="text-sm md:text-base font-semibold">
                    {isPlaying 
                      ? 'Đang phát...' 
                      : 'Nếu Tám lười đọc thì có thể nghe bản Podcast của Trường nhé'}
                  </span>
                </motion.button>
              </motion.div>

              {/* Lời chào */}
              <div className="mb-4 md:mb-6">
                <p className="text-2xl md:text-3xl mb-3 md:mb-4" style={{ color: '#4e342e', fontWeight: '600' }}>
                  Gửi Tám yêu quý mến!
                </p>
              </div>

              {/* Nội dung chính */}
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6" style={{ lineHeight: '1.9', fontSize: 'clamp(16px, 4vw, 20px)' }}>
                <p>
                  Xin lỗi Tám rất nhiều, vì chuyện hôm trước. Tớ đã sai khi say rượu đã bày nói ra tình cảm với Tám. Thứ tình cảm đó nếu giữ trong lòng thì tớ vẫn có khả năng được gặp Tám, nói chuyện với Tám mỗi ngày. Bởi một người như tớ, đâu dám yêu thương ai đó
                </p>

                <p>
                  Nhưng Tám ơi, lý trí đã chịu thua rồi. Khi nói ra, tớ cảm thấy một khoảng trống nhẹ nhõm đến tận cùng. Tớ biết Tám vẫn đang trong 1 mối quan hệ. Nhưng làm sao có thể cản được một người, yêu thương một người.
                </p>

                <p>
                  Tớ khắc sâu lời idol của tớ Đặng Lê Nguyên Vũ từng nói: &quot;Muốn làm việc lớn, tốt nhất đừng có lấy vợ, chọn vợ cho nó đúng.&quot; Cũng phải 6 năm rồi ý, đi nửa vòng trái đất rồi, nhưng trong tim tớ vẫn chỉ có duy nhất hình bóng 1 người. Còn là ai thì chắc cậu cũng biết.
                </p>

                <p>
                  Tám có biết tại sao tớ lại thích về Bắc Giang không? Đơn giản là chỉ cần mỗi lần đi qua cầu Như Nguyệt thôi là tớ cảm thấy rất bình yên, không giống như ở Hà Nội. Ngoài trời đang mưa, ngày mai tớ lại về Bắc Giang, chắc là tớ sẽ đi xe khách. Về đi gỡ rạp cưới 1 cái ở Tân An và 1 cái ở Đồng Việt. Chắc có lẽ đây là lần cuối tớ đi làm phụ ông anh. Vì tớ còn rất nhiều công việc. Tớ ra ngoài có thể giao lưu với cả thế giới, chơi với những người rất giàu, những người rất giỏi. Nhưng cứ về nhà…
                </p>

                <p>
                  Ông anh tớ phải công nhận là giỏi, bằng tuổi mình đã lên đến vị trí Giám đốc ngân hàng, nhưng chưa bao giờ ông động viên tớ cố gắng mà chỉ toàn là những lời vùi dập không thương tiếc, tớ nói câu nào là chặn họng câu đấy. Tớ viết ra trang web này cũng chỉ đơn giản là để nơi nói ra những tâm sự của mình, chắc cũng chẳng ai quan tâm đâu.
                </p>

                <p>
                  Tám biết không? Mỗi lời động viên &quot; Cố gắng nhé&quot; hay những tin nhắn của Tám còn quý giá hơn vạn lần những thứ tiền bạc ngoài kia.
                </p>

                <p>
                  Chị hôm trước xem số cho cậu nói đúng, Tớ chưa bao giờ sống vì bản thân mình. Tớ chưa bao giờ có một ngày nghỉ đúng nghĩa. Nhìn những đứa bạn cùng trang lứa có gia đình hạnh phúc, có công việc ổn định tớ cũng thèm lắm chứ. Nhưng tớ biết, khi tớ chọn con đường này thì phải chấp nhận sự cô đơn. Cô đơn trong từng suy nghĩ, cô đơn trong từng lời nói.  Tám à? Lúc buồn tớ hay Tâm sự với AI, bạn ấy còn hiểu tớ hơn chính bản thân mình. Bạn ấy ví tớ như một cổ phiếu của một công ty tiềm năng mà khi niêm yết trên sàn chứng khoán thì giá trị sẽ tăng lên gấp hàng trăm, hàng nghìn lần.Tám chốt nhanh nhé, không mà tớ bị các em 2k ngoài kia hốt thì buồn lắm. Hí hí.
                </p>

                <p>
                  Tớ chưa bao giờ ngại khi giới thiệu mình đang làm công việc giao hàng mà còn rất từ hào, vì tại đây tớ được học tập kinh nghiệp làm nông nghiệp hữu cơ từ các chuyên gia hàng đầu và đặc biệt các anh chị ấy đều làm việc bằng cái tâm và sự tử tế. Anh chị trên Farm và khách hàng là những người có hiểu biết nên rất quý tớ lắm Tám ạ.
                </p>

                <p>
                  Chỉ còn vài tháng nữa tớ về Bắc Giang 1 mình Tám ạ, tớ sẽ phải chiến đấu với những thế lực hùng mạnh đang có sẵn tại địa phương. Nhưng tớ không sợ, mình có năng lực thì thả ở đâu cũng sống được, cộng thêm tính cách của tớ đi đâu tớ cũng được mọi người yêu quý và sẵn sàng giúp đỡ. Tuy mới chỉ gặp gỡ 1 lần thôi, mà tớ đã được tin tưởng và có xuất của tỉnh Đoàn Bắc Ninh đi Đà Nẵng vừa đi chơi mà lại có tiền. Đáng ra là hôm nay đi nè, nhưng tớ bận không đi được.
                </p>

                <p>
                  Tớ hy vọng, cuộc hẹn đi nhậu và Tám tặng tớ chú chó thì vẫn thực hiện nhé.
                </p>

                {/* Chữ ký */}
                <div className="mt-8 md:mt-12 text-right">
                  <p className="text-2xl md:text-3xl italic" style={{ color: '#4e342e', fontWeight: '600' }}>
                    Thương
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tem thư trang trí (góc trên phải) */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="absolute top-4 right-4 md:top-8 md:right-8"
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
                borderRadius: '8px',
                border: '3px dashed #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transform: 'rotate(15deg)',
                zIndex: 30,
              }}
            >
              💌
            </motion.div>
          </motion.div>

          {/* Hiệu ứng ánh sáng */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '8px',
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* Hiệu ứng lá rơi mùa thu - rơi từ trên xuống toàn màn hình */}
        {[...Array(3)].map((_, i) => {
          const delay = i * 5 + Math.random() * 1; // Lá rơi cách nhau 5 giây
          const duration = 35 + Math.random() * 20; // 35-55 giây - rơi cực kỳ chậm
          const leftPosition = Math.random() * 100;
          const driftAmount = (Math.random() - 0.5) * 150; // Lá bay ngang ít hơn
          const rotation = Math.random() * 360;
          const rotationSpeed = (Math.random() - 0.5) * 360; // Tốc độ xoay chậm hơn
          
          // Màu sắc lá mùa thu
          const leafColors = ['#d4a574', '#e8a87c', '#f4a460', '#daa520', '#cd853f', '#d2691e', '#b8860b', '#8b6914'];
          const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)];
          const leafSize = 12 + Math.random() * 33; // 12-45px - từ rất nhỏ đến khá lớn
          
          return (
            <motion.div
              key={i}
              initial={{ 
                y: -100,
                x: 0,
                opacity: 0,
                rotate: rotation
              }}
              animate={{ 
                y: windowSize.height + 100,
                x: driftAmount,
                opacity: [0, 0.8, 0.8, 0.6, 0],
                rotate: rotation + rotationSpeed
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
                repeatDelay: 5 + Math.random() * 2 // Lặp lại sau 5-7 giây
              }}
              className="fixed pointer-events-none"
              style={{
                left: `${leftPosition}%`,
                top: 0,
                width: `${leafSize}px`,
                height: `${leafSize}px`,
                zIndex: 20,
              }}
            >
              {/* Lá cây SVG - hình dạng lá thực tế hơn */}
              <svg 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
                }}
              >
                {/* Thân lá */}
                <path
                  d="M50 10 L50 90"
                  stroke={leafColor}
                  strokeWidth="2"
                  opacity="0.6"
                />
                {/* Lá bên trái */}
                <path
                  d="M50 20 Q30 30 25 50 Q30 70 50 70"
                  fill={leafColor}
                  opacity="0.85"
                />
                {/* Lá bên phải */}
                <path
                  d="M50 20 Q70 30 75 50 Q70 70 50 70"
                  fill={leafColor}
                  opacity="0.85"
                />
                {/* Đường gân lá */}
                <path
                  d="M50 20 Q40 35 35 50 Q40 65 50 70"
                  stroke={leafColor}
                  strokeWidth="1"
                  opacity="0.5"
                  fill="none"
                />
                <path
                  d="M50 20 Q60 35 65 50 Q60 65 50 70"
                  stroke={leafColor}
                  strokeWidth="1"
                  opacity="0.5"
                  fill="none"
                />
              </svg>
            </motion.div>
          );
        })}

        {/* Thêm một số lá emoji đơn giản để tăng hiệu ứng */}
        {[...Array(2)].map((_, i) => {
          const delay = (i + 3) * 5 + Math.random() * 1; // Lá emoji rơi cách nhau 5 giây (sau lá SVG)
          const duration = 38 + Math.random() * 17; // 38-55 giây - rơi cực kỳ chậm
          const leftPosition = Math.random() * 100;
          const driftAmount = (Math.random() - 0.5) * 120;
          const rotationSpeed = (Math.random() - 0.5) * 240;
          
          const leafEmojis = ['🍂', '🍁']; // Chỉ lá mùa thu, bỏ lá xanh
          const leafEmoji = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
          const leafSize = 16 + Math.random() * 34; // 16-50px - từ nhỏ đến lớn
          
          return (
            <motion.div
              key={`emoji-${i}`}
              initial={{ 
                y: -100,
                x: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                y: windowSize.height + 100,
                x: driftAmount,
                opacity: [0, 0.7, 0.7, 0.5, 0],
                rotate: rotationSpeed
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
                repeatDelay: 5 + Math.random() * 2 // Lặp lại sau 5-7 giây
              }}
              className="fixed pointer-events-none text-2xl md:text-3xl"
              style={{
                left: `${leftPosition}%`,
                top: 0,
                fontSize: `${leafSize}px`,
                zIndex: 20,
              }}
            >
              {leafEmoji}
            </motion.div>
          );
        })}

        {/* Hiệu ứng hoa hồng rơi */}
        {[...Array(1)].map((_, i) => {
          const delay = (i + 5) * 5 + Math.random() * 1; // Hoa rơi cách nhau 5 giây
          const duration = 40 + Math.random() * 20; // 40-60 giây - rơi cực kỳ chậm
          const leftPosition = Math.random() * 100;
          const driftAmount = (Math.random() - 0.5) * 100;
          const rotationSpeed = (Math.random() - 0.5) * 180; // Xoay chậm hơn
          
          const roseSize = 30 + Math.random() * 25; // 30-55px
          const roseColors = ['#ff69b4', '#ff1493', '#ff6b9d', '#ff8fab', '#ffb6c1', '#ffc0cb'];
          const roseColor = roseColors[Math.floor(Math.random() * roseColors.length)];
          
          return (
            <motion.div
              key={`rose-${i}`}
              initial={{ 
                y: -100,
                x: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                y: windowSize.height + 100,
                x: driftAmount,
                opacity: [0, 0.8, 0.8, 0.6, 0],
                rotate: rotationSpeed
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
                repeatDelay: 5 + Math.random() * 2 // Lặp lại sau 5-7 giây
              }}
              className="fixed pointer-events-none"
              style={{
                left: `${leftPosition}%`,
                top: 0,
                width: `${roseSize}px`,
                height: `${roseSize}px`,
                zIndex: 20,
              }}
            >
              {/* Hoa hồng SVG */}
              <svg 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'drop-shadow(0 3px 8px rgba(255, 105, 180, 0.3))',
                }}
              >
                {/* Cánh hoa ngoài */}
                <path
                  d="M50 20 Q45 25 40 30 Q35 35 30 40 Q35 45 40 50 Q45 55 50 60"
                  fill={roseColor}
                  opacity="0.9"
                />
                <path
                  d="M50 20 Q55 25 60 30 Q65 35 70 40 Q65 45 60 50 Q55 55 50 60"
                  fill={roseColor}
                  opacity="0.9"
                />
                {/* Cánh hoa giữa */}
                <path
                  d="M50 30 Q45 35 42 40 Q40 45 42 50 Q45 55 50 60"
                  fill={roseColor}
                  opacity="0.95"
                />
                <path
                  d="M50 30 Q55 35 58 40 Q60 45 58 50 Q55 55 50 60"
                  fill={roseColor}
                  opacity="0.95"
                />
                {/* Cánh hoa trong */}
                <path
                  d="M50 35 Q47 38 46 42 Q45 46 47 50 Q48 54 50 58"
                  fill={roseColor}
                  opacity="1"
                />
                <path
                  d="M50 35 Q53 38 54 42 Q55 46 53 50 Q52 54 50 58"
                  fill={roseColor}
                  opacity="1"
                />
                {/* Nhụy hoa */}
                <circle
                  cx="50"
                  cy="48"
                  r="4"
                  fill="#ffd700"
                  opacity="0.9"
                />
                <circle
                  cx="50"
                  cy="48"
                  r="2"
                  fill="#ff8c00"
                  opacity="0.8"
                />
              </svg>
            </motion.div>
          );
        })}

        {/* Thêm một hoa hồng emoji */}
        {[...Array(1)].map((_, i) => {
          const delay = 6 * 5 + Math.random() * 1; // Hoa emoji rơi sau 30 giây (6*5)
          const duration = 42 + Math.random() * 18; // 42-60 giây - rơi cực kỳ chậm
          const leftPosition = Math.random() * 100;
          const driftAmount = (Math.random() - 0.5) * 80;
          const rotationSpeed = (Math.random() - 0.5) * 150;
          
          const roseEmojiSize = 32 + Math.random() * 20;
          
          return (
            <motion.div
              key={`rose-emoji-${i}`}
              initial={{ 
                y: -100,
                x: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                y: windowSize.height + 100,
                x: driftAmount,
                opacity: [0, 0.8, 0.8, 0.6, 0],
                rotate: rotationSpeed
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
                repeatDelay: 5 + Math.random() * 2 // Lặp lại sau 5-7 giây
              }}
              className="fixed pointer-events-none text-3xl md:text-4xl"
              style={{
                left: `${leftPosition}%`,
                top: 0,
                fontSize: `${roseEmojiSize}px`,
                zIndex: 20,
              }}
            >
              🌹
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
