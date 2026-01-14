import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image'; // Sử dụng component Image của Next.js để tối ưu

const AnhsGarden = () => {
  const [selectedRose, setSelectedRose] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('auto'); // 'auto', 'early-morning', 'morning', 'afternoon', 'night'
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMorningPopup, setShowMorningPopup] = useState(false);
  const [showNightPopup, setShowNightPopup] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Hàm xác định thời gian trong ngày dựa trên giờ hiện tại
  const getTimeOfDayFromHour = (hour) => {
    if (hour >= 0 && hour < 3) {
      return 'early-morning'; // Sáng sớm (0h - 3h)
    } else if (hour >= 6 && hour < 12) {
      return 'morning'; // Sáng (6h - 12h)
    } else if (hour >= 12 && hour < 18) {
      return 'afternoon'; // Chiều (12h - 18h)
    } else {
      return 'night'; // Đêm (18h - 24h và 3h - 6h)
    }
  };

  // Hàm lấy đường dẫn ảnh nền dựa trên thời gian
  const getBackgroundImage = () => {
    let timeToUse = timeOfDay;
    
    if (timeOfDay === 'auto') {
      timeToUse = getTimeOfDayFromHour(currentTime.getHours());
    }

    switch (timeToUse) {
      case 'early-morning':
        return '/anh-gardent/bg-dem.jpg'; // Sáng sớm vẫn dùng ảnh đêm
      case 'morning':
        return '/anh-gardent/bg-sang.jpg';
      case 'afternoon':
        return '/anh-gardent/bg-hoang-hon.jpg';
      case 'night':
        return '/anh-gardent/bg-dem.jpg';
      default:
        return '/anh-gardent/bg-sang.jpg';
    }
  };

  // Hàm lấy lớp phủ màu dựa trên thời gian
  const getOverlayClass = () => {
    let timeToUse = timeOfDay;
    
    if (timeOfDay === 'auto') {
      timeToUse = getTimeOfDayFromHour(currentTime.getHours());
    }

    switch (timeToUse) {
      case 'early-morning':
        return 'bg-black/20'; // Sáng sớm: màu tối nhẹ
      case 'morning':
        return ''; // Sáng: không có overlay
      case 'afternoon':
        return 'bg-amber-500/10'; // Chiều hoàng hôn: màu vàng ấm
      case 'night':
        return 'bg-blue-900/30'; // Đêm: màu tối xanh đậm
      default:
        return '';
    }
  };

  // Hàm lấy đường dẫn nhạc dựa trên thời gian
  const getMusicPath = () => {
    let timeToUse = timeOfDay;
    
    if (timeOfDay === 'auto') {
      timeToUse = getTimeOfDayFromHour(currentTime.getHours());
    }

    switch (timeToUse) {
      case 'early-morning':
        return '/anh-gardent/music-dem.mp3'; // Sáng sớm: nhạc đêm
      case 'morning':
        return '/anh-gardent/music-sang.mp3'; // Sáng: nhạc sáng
      case 'afternoon':
        return '/anh-gardent/xinh-tuoi-viet-nam.mp3'; // Chiều: nhạc chiều
      case 'night':
        return '/anh-gardent/music-dem.mp3'; // Đêm: nhạc đêm
      default:
        return '/anh-gardent/music-sang.mp3';
    }
  };

  // Hàm phát/dừng nhạc
  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(err => {
          console.error('Lỗi phát nhạc:', err);
        });
        setIsPlaying(true);
      }
    } else {
      // Khởi tạo audio mới
      const musicPath = getMusicPath();
      const newAudio = new Audio(musicPath);
      newAudio.loop = true;
      newAudio.volume = 0.5; // Đặt volume 50%
      
      newAudio.play().catch(err => {
        console.error('Lỗi phát nhạc:', err);
      });
      
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  // Hàm tự động phát nhạc (không dừng nếu đang phát)
  const playMusicAuto = () => {
    if (audio) {
      if (!isPlaying) {
        audio.play().catch(err => {
          console.error('Lỗi phát nhạc:', err);
        });
        setIsPlaying(true);
      }
    } else {
      // Khởi tạo audio mới
      const musicPath = getMusicPath();
      const newAudio = new Audio(musicPath);
      newAudio.loop = true;
      newAudio.volume = 0.5; // Đặt volume 50%
      
      newAudio.play().catch(err => {
        console.error('Lỗi phát nhạc:', err);
      });
      
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  // Cập nhật thời gian mỗi phút nếu đang dùng chế độ tự động
  useEffect(() => {
    if (timeOfDay === 'auto') {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000); // Cập nhật mỗi phút

      return () => clearInterval(interval);
    }
  }, [timeOfDay]);

  // Tự động đổi nhạc khi thời gian thay đổi (nếu đang phát)
  useEffect(() => {
    if (audio && isPlaying) {
      // Lấy đường dẫn nhạc mới dựa trên thời gian hiện tại
      const newMusicPath = getMusicPath();
      
      // Lấy tên file nhạc hiện tại và nhạc mới để so sánh
      const currentSrc = audio.src.split('/').pop();
      const newSrc = newMusicPath.split('/').pop();
      
      // Chỉ đổi nhạc nếu nhạc khác nhau (tránh đổi không cần thiết)
      if (currentSrc !== newSrc) {
        audio.pause();
        const newAudio = new Audio(newMusicPath);
        newAudio.loop = true;
        newAudio.volume = 0.5;
        newAudio.play().catch(err => {
          console.error('Lỗi phát nhạc:', err);
        });
        setAudio(newAudio);
      }
      // Nếu nhạc trùng thì tiếp tục phát (không làm gì)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOfDay, currentTime, isPlaying]);

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Kiểm tra và hiển thị popup buổi sáng
  useEffect(() => {
    const checkMorningPopup = () => {
      let timeToUse = timeOfDay;
      let hour = currentTime.getHours();
      
      if (timeOfDay === 'auto') {
        timeToUse = getTimeOfDayFromHour(hour);
        // Chỉ hiện popup nếu là buổi sáng (6h-12h) trong chế độ tự động
        if (timeToUse === 'morning' && hour >= 6 && hour < 12) {
          const today = new Date().toDateString();
          const lastShownDate = localStorage.getItem('morningPopupDate');
          
          // Nếu chưa hiện hôm nay thì hiện popup
          if (lastShownDate !== today) {
            setShowMorningPopup(true);
            setCountdown(5);
            localStorage.setItem('morningPopupDate', today);
          }
        }
      } else if (timeOfDay === 'morning') {
        // Nếu chọn thủ công buổi sáng, hiện popup
        setShowMorningPopup(true);
        setCountdown(30);
      }
    };

    checkMorningPopup();
  }, [timeOfDay, currentTime]);

  // Kiểm tra và hiển thị popup ban đêm (24h)
  useEffect(() => {
    const checkNightPopup = () => {
      let timeToUse = timeOfDay;
      let hour = currentTime.getHours();
      
      if (timeOfDay === 'auto') {
        timeToUse = getTimeOfDayFromHour(hour);
        // Chỉ hiện popup nếu là 24h (0h) trong chế độ tự động
        if (timeToUse === 'night' && hour === 0) {
          setShowNightPopup(true);
          setCountdown(5);
        }
      } else if ( timeOfDay === 'early-morning') {
        // Nếu chọn thủ công ban đêm hoặc sáng sớm, hiện popup
        setShowNightPopup(true);
        setCountdown(30);
      }
    };

    checkNightPopup();
  }, [timeOfDay, currentTime]);

  // Timer đếm ngược cho popup ban đêm
  useEffect(() => {
    if (showNightPopup && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showNightPopup && countdown === 0) {
      setShowNightPopup(false);
    }
  }, [showNightPopup, countdown]);

  // Timer đếm ngược cho popup buổi sáng
  useEffect(() => {
    if (showMorningPopup && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showMorningPopup && countdown === 0) {
      setShowMorningPopup(false);
    }
  }, [showMorningPopup, countdown]);


  // Dữ liệu các đóa hoa (Vị trí, hình ảnh, lời chúc theo thời gian, kích thước)
  const roses = [
    { 
      id: 1, 
      name: 'Bình Yên (Gốc Hồng Trắng)', 
      // Vị trí tương đối trên màn hình
      top: '73%', left: '-4%', 
      // Ảnh PNG hoa tách nền anh đã chuẩn bị
      imgSrc: '/anh-gardent/7.png', 
      // Kích thước hoa (có thể tùy chỉnh cho từng hoa)
      width: '120px', 
      height: '120px',
      // Lời chúc theo từng khung thời gian
      message: {
        earlyMorning: 'Đêm khuya rồi, mong Ánh luôn được bao bọc bởi sự tĩnh lặng và dịu dàng nhất của khu vườn.',
        morning: 'Chúc Ánh một sáng mai trong lành và nhẹ nhàng như sắc trắng của đóa hồng này.',
        afternoon: 'Nắng chiều đang nhạt dần, Ánh hãy gác lại âu lo để tận hưởng khoảnh khắc hoàng hôn của riêng mình.',
        night: 'Ngày dài đã khép lại, chúc Ánh ngủ thật ngon và để mọi muộn phiền tan biến vào màn đêm.'
      }
    },
    { 
      id: 2, 
      name: 'Bình Yên (Gốc Hồng Trắng)', 
      // Vị trí tương đối trên màn hình
      top: '72%', left: '12%', 
      // Ảnh PNG hoa tách nền anh đã chuẩn bị
      imgSrc: '/anh-gardent/8.png', 
      // Kích thước hoa (có thể tùy chỉnh cho từng hoa)
      width: '120px', 
      height: '120px',
      // Lời chúc theo từng khung thời gian
      message: {
        earlyMorning: 'Mong giấc ngủ của Ánh thật sâu và êm đềm trong không gian tĩnh mịch này.',
        morning: 'Hít một hơi thật sâu và bắt đầu ngày mới với tâm thế tự do, không gồng gánh nhé.',
        afternoon: 'Mong một nhành hoa nhỏ và làn gió chiều mang đến cho Ánh sự thư thái tuyệt đối.',
        night: 'Đêm nay gió rất mát, chúc Ánh có những giấc mơ thật đẹp và bình yên.'
      }
    },
    { 
      id: 3, 
      name: 'Khí Chất (Gốc Hồng Vàng)', 
      top: '20%', left: '58%', 
      imgSrc: '/anh-gardent/5.png',
      // Kích thước hoa (có thể tùy chỉnh cho từng hoa)
      width: '180px', 
      height: '180px',
      // Lời chúc theo từng khung thời gian
      message: {
        earlyMorning: 'Ngay cả khi vạn vật đang ngủ say, bản lĩnh thầm lặng của Ánh vẫn luôn rạng rỡ.',
        morning: 'Chào ngày mới! Chúc Ánh luôn tự tin và tỏa sáng với khí chất đặc biệt của riêng mình.',
        afternoon: 'Mong ánh nắng hoàng hôn tôn thêm vẻ đẹp dịu dàng nhưng đầy nội lực của Ánh.',
        night: 'Hãy tự hào về một ngày đã qua, Ánh đã rất tuyệt vời rồi. Nghỉ ngơi thôi!'
      }
    },
    { 
      id: 4, 
      name: 'Mãi Mãi (Gốc Hồng Đỏ)', 
      top: '53%', left: '77%', 
      imgSrc: '/anh-gardent/4.png',
      // Kích thước hoa (có thể tùy chỉnh cho từng hoa)
      width: '120px', 
      height: '120px',
      // Lời chúc theo từng khung thời gian
      message: {
        earlyMorning: 'Mong những điều tốt đẹp và bền vững nhất sẽ luôn ở lại bên cạnh Ánh.',
        morning: 'Ngày mới vui vẻ! Chúc nụ cười rạng rỡ sẽ luôn nở trên môi Ánh thật lâu.',
        afternoon: 'Như mặt trời luôn mọc vào mỗi sáng, hy vọng niềm hạnh phúc của Ánh sẽ luôn bền bỉ.',
        night: 'Chúc tâm hồn Ánh luôn được tưới mát bằng tình yêu và sự chân thành mãi mãi.'
      }
    },
     { 
      id: 5, 
      name: 'Di Sản (Gốc Hồng Nhung)', 
      top: '63%', left: '45%', 
      imgSrc: '/anh-gardent/1.png',
      // Kích thước hoa (có thể tùy chỉnh cho từng hoa)
      width: '130px', 
      height: '130px',
      // Lời chúc theo từng khung thời gian
      message: {
        earlyMorning: 'Khu vườn này sẽ luôn là nơi yên bình nhất, canh giữ giấc ngủ cho Ánh đêm nay.',
        morning: 'Ngày mới rực rỡ! Hãy cùng ngắm nhìn khu vườn của Ánh đang phát triển từng ngày.',
        afternoon: 'Khu vườn hoa hồng đầy tâm huyết này chắc chắn sẽ là nơi ấm áp nhất để Ánh trở về sau giờ làm việc.',
        night: 'Khép lại một ngày, chúc Ánh tìm thấy sự an nhiên trong từng hơi thở nhẹ nhàng.'
      }
    },
    { 
      id: 6, 
      name: 'Di Sản (Gốc Hồng Nhung)', 
      top: '74%', left: '71%', 
      imgSrc: '/anh-gardent/3.png',
      // Kích thước hoa (có thể tùy chỉnh cho từng hoa)
      width: '120px', 
      height: '120px',
      // Lời chúc theo từng khung thời gian
      message: {
        earlyMorning: 'Một ngày mới đang dần tới, chúc Ánh phục hồi năng lượng để đón nhận điều kỳ diệu.',
        morning: 'Chúc ngày mới tràn đầy hy vọng. Những gốc hồng Ánh tự tay trồng đang bắt đầu nở rộ.',
        afternoon: 'Nắng chiều qua khung cửa sổ, mong Ánh luôn thấy tự hào về hành trình đã đi qua.',
        night: 'Hãy để không gian riêng tư này xoa dịu mọi áp lực. Ánh xứng đáng được yêu thương.'
      }
    },
    { 
      id: 7, 
      name: 'Di Sản (Gốc Hồng Nhung)', 
      top: '75%', left: '45%', 
      imgSrc: '/anh-gardent/2.png',
      // Kích thước hoa (có thể tùy chỉnh cho từng hoa)
      width: '130px', 
      height: '130px',
      // Lời chúc theo từng khung thời gian
      message: {
        earlyMorning: 'Một ngày mới đang dần tới, hãy nghỉ ngơi để đón nhận những điều kỳ diệu sắp đến.',
        morning: 'Chúc một ngày làm việc thật hiệu quả nhưng đừng quên dành thời gian cho bản thân nhé.',
        afternoon: 'Hoa hồng vẫn rung rinh trong nắng chiều, mong Ánh luôn giữ được sự lạc quan này.',
        night: 'Về nhà rồi, hãy trút bỏ mọi muộn phiền ngoài cánh cửa và nghỉ ngơi thật sâu.'
      }
    },
  ];

  // Hàm lấy thời gian hiện tại đang được chọn
  const getCurrentTimeOfDay = () => {
    if (timeOfDay === 'auto') {
      return getTimeOfDayFromHour(currentTime.getHours());
    }
    return timeOfDay;
  };

  // Hàm lấy message phù hợp với thời gian hiện tại
  const getMessageForCurrentTime = (rose) => {
    const currentTimeKey = getCurrentTimeOfDay();
    
    // Nếu message là object (có nhiều message theo thời gian)
    if (typeof rose.message === 'object' && rose.message !== null) {
      switch (currentTimeKey) {
        case 'early-morning':
          return rose.message.earlyMorning || rose.message.morning || '';
        case 'morning':
          return rose.message.morning || '';
        case 'afternoon':
          return rose.message.afternoon || '';
        case 'night':
          return rose.message.night || '';
        default:
          return rose.message.morning || '';
      }
    }
    
    // Nếu message là string (backward compatibility)
    return rose.message || '';
  };

  const handleRoseClick = (rose) => {
      setSelectedRose(rose);
      // Nếu muốn nhạc phát khi click vào hoa lần đầu:
      // if (audio && audio.paused) audio.play();
  };


  return (
    <>
      <Head>
        <title>Ánh&apos;s Garden - Nơi Hạnh Phúc Nở Hoa</title>
      </Head>
      {/* Container chính: rộng full màn hình; chiều cao theo đúng tỉ lệ ảnh nền */}
      <div className="relative w-screen overflow-hidden">
        {/* LỚP 1: Ảnh nền (giữ nguyên tỉ lệ ảnh gốc) */}
        <Image
          key={getBackgroundImage()}
          src={getBackgroundImage()}
          alt="Khu vườn của Ánh"
          width={2551}
          height={3579}
          sizes="100vw"
          priority
          className="w-full h-auto transition-opacity duration-500"
        />

        {/* LỚP 1.5: Lớp phủ màu theo thời gian (Overlay Layer) */}
        <div 
          className={`absolute inset-0 z-10 transition-all duration-700 ${getOverlayClass()}`}
        />

        {/* LỚP 2: Các đóa hoa tương tác (Interactive Layer) */}
        {roses.map((rose) => (
          <button
            key={rose.id}
            onClick={() => handleRoseClick(rose)}
            // Tailwind classes cho hiệu ứng:
            // absolute: Định vị tự do
            // hover:scale-110: Phóng to nhẹ khi di chuột
            // transition-all duration-500: Chuyển động mượt mà
            // drop-shadow-2xl: Tạo bóng đổ để hoa tách biệt khỏi nền
            // animate-pulse (tùy chọn): Tạo hiệu ứng nhịp đập nhẹ nhàng
            className="absolute z-20 transition-all duration-500 ease-in-out transform hover:scale-110 group animate-float"
            style={{ top: rose.top, left: rose.left, width: rose.width || '120px', height: rose.height || '120px' }} // Kích thước hoa được tùy chỉnh trong mảng roses
          >
            <div className="relative w-full h-full drop-shadow-2xl">
              <Image
                src={rose.imgSrc}
                alt={rose.name}
                layout="fill"
                objectFit="contain"
                className="group-hover:brightness-110 animate-glow" // Sáng lên một chút khi hover
              />
              {/* Hiệu ứng ánh sáng xung quanh */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-400/30 to-pink-400/20 rounded-full animate-shimmer"></div>
              </div>
            </div>
          </button>
        ))}

        {/* LỚP 3: Modal hiển thị lời chúc (Popup Layer) */}
        {selectedRose && (
          // backdrop-blur-md: Tạo hiệu ứng mờ nền đằng sau popup
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-300">
            <div 
                className="bg-white/95 rounded-3xl p-8 max-w-md text-center shadow-2xl border-t-8 border-rose-400 transform transition-all scale-100"
                style={{animation: 'fadeInUp 0.4s ease-out'}}
            >
             
              <p className="text-gray-800 text-lg leading-relaxed italic mb-8">
                &ldquo;{getMessageForCurrentTime(selectedRose)}&rdquo;
              </p>
              <button 
                onClick={() => {
                  setSelectedRose(null);
                  playMusicAuto();
                }}
                className="text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all active:scale-95"
                style={{background: 'linear-gradient(to right, #fb7185, #e11d48)'}}
              >
                Cảm ơn người làm vườn nhé!
              </button>
            </div>
          </div>
        )}

        {/* LỚP 3.5: Popup chúc buổi sáng (Morning Popup) */}
        {showMorningPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-300">
            <div 
              className="bg-white/95 rounded-3xl p-8 max-w-md text-center shadow-2xl border-t-8 border-yellow-400 transform transition-all scale-100"
              style={{animation: 'fadeInUp 0.4s ease-out'}}
            >
              <h3 className="text-3xl font-bold text-yellow-600 mb-4"> Chúc mừng ngày mới!</h3>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Chúc chị Ánh 1 ngày mới tràn đầy niềm vui và hạnh phúc nhé!              </p>
              <p className="text-gray-600 text-sm mb-6">
                Tự động đóng sau <span className="font-bold text-yellow-600">{countdown}</span> giây...
              </p>
              <button 
                onClick={() => setShowMorningPopup(false)}
                className="text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all active:scale-95"
                style={{background: 'linear-gradient(to right, #facc15, #ca8a04)'}}
              >
                Hí hí... Chị Ánh cảm ơn!
              </button>
            </div>
          </div>
        )}

        {/* LỚP 3.6: Popup ban đêm (Night Popup) */}
        {showNightPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-300">
            <div 
              className="bg-white/95 rounded-3xl p-8 max-w-md text-center shadow-2xl border-t-8 border-indigo-600 transform transition-all scale-100"
              style={{animation: 'fadeInUp 0.4s ease-out'}}
            >
              <h3 className="text-3xl font-bold text-indigo-600 mb-4">Đã khuya rồi!</h3>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                Chị Ánh sao giờ này chị còn thức vậy, đi ngủ sớm đi chị. Anh Trường biết, anh ấy sẽ buồn đó.
              </p>
              <p className="text-gray-600 text-sm mb-6">
                Tự động đóng sau <span className="font-bold text-indigo-600">{countdown}</span> giây...
              </p>
              <button 
                onClick={() => {
                  setShowNightPopup(false);
                  playMusicAuto();
                }}
                className="text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all active:scale-95"
                style={{background: 'linear-gradient(to right, #818cf8, #4f46e5)'}}
              >
                Oki, chị đi ngủ luôn đây! 
              </button>
            </div>
          </div>
        )}

        {/* LỚP 4.5: Nút phát nhạc (Music Player) */}
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 z-30 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-black/90 transition-all hover:scale-110"
          aria-label={isPlaying ? 'Dừng nhạc' : 'Phát nhạc'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* LỚP 4: Nút chọn khung thời gian (Time Selector) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
          <button
            onClick={() => setTimeOfDay('auto')}
            className={`px-4 py-4 rounded-full text-sm font-semibold transition-all ${
              timeOfDay === 'auto'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => setTimeOfDay('early-morning')}
            className={`px-4 py-4 rounded-full text-sm font-semibold transition-all ${
              timeOfDay === 'early-morning'
                ? 'bg-indigo-700 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Đêm
          </button>
          <button
            onClick={() => setTimeOfDay('morning')}
            className={`px-4 py-4 rounded-full text-sm font-semibold transition-all ${
              timeOfDay === 'morning'
                ? 'bg-yellow-400 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sáng
          </button>
          <button
            onClick={() => setTimeOfDay('afternoon')}
            className={`px-4 py-4 rounded-full text-sm font-semibold transition-all ${
              timeOfDay === 'afternoon'
                ? 'bg-orange-400 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Chiều
          </button>
          <button
            onClick={() => setTimeOfDay('night')}
            className={`px-4 py-4 rounded-full text-sm font-semibold transition-all ${
              timeOfDay === 'night'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tối
          </button>
        </div>
      </div>
      
      {/* Thêm keyframe animation tùy chỉnh cho Tailwind */}
      <style jsx global>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-bounce-slow {
            animation: bounce 3s infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(251, 113, 133, 0.5)); }
            50% { filter: drop-shadow(0 0 15px rgba(251, 113, 133, 0.8)); }
        }
        .animate-glow {
            animation: glow 2s ease-in-out infinite;
        }
        @keyframes sparkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            25% { transform: scale(1.1) rotate(90deg); opacity: 0.9; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
            75% { transform: scale(1.1) rotate(270deg); opacity: 0.9; }
        }
        .animate-sparkle {
            animation: sparkle 2s ease-in-out infinite;
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        .animate-shimmer {
            animation: shimmer 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default AnhsGarden;