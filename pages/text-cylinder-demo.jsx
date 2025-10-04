import React, { useState } from 'react';
import Head from 'next/head';
import RotatingTextCylinder from '../components/effects/RotatingTextCylinder';

const TextCylinderDemo = () => {
  const [config, setConfig] = useState({
    centerText: "TRƯỜNG NQ",
    radius: 180,
    speed: 25,
    selectedTheme: 'business'
  });

  const themes = {
    business: [
      "Thiết kế Website chuyên nghiệp",
      "Dịch vụ SEO tối ưu Google", 
      "Landing Page chuyển đổi cao",
      "Tối ưu thứ hạng tìm kiếm",
      "Marketing Online hiệu quả",
      "Branding thương hiệu mạnh",
      "E-commerce bán hàng online",
      "Mobile App ứng dụng di động"
    ],
    love: [
      "Yêu thương vô điều kiện",
      "Tình yêu bất tận mãi mãi", 
      "Hạnh phúc cùng nhau",
      "Kỷ niệm ngọt ngào",
      "Lời hứa suốt đời",
      "Trái tim kết nối",
      "Giấc mơ chung hai ta",
      "Tương lai rực rỡ"
    ],
    space: [
      "Khám phá vũ trụ bao la",
      "Hành tinh xa xôi", 
      "Ngôi sao sáng chói",
      "Thiên hà Milky Way",
      "Hố đen bí ẩn",
      "Sao băng lướt qua",
      "Mặt trăng tròn đầy",
      "Ánh sáng vĩnh cửu"
    ],
    tech: [
      "Artificial Intelligence",
      "Machine Learning", 
      "Blockchain Technology",
      "Cloud Computing",
      "Internet of Things",
      "Virtual Reality",
      "Augmented Reality",
      "Quantum Computing"
    ]
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const [showControls, setShowControls] = useState(false);

  return (
    <>
      <Head>
        <title>Text Cylinder Demo - Tùy chỉnh hiệu ứng Text xoay 360 độ</title>
        <meta name="description" content="Demo tùy chỉnh hiệu ứng text xoay 360 độ như các hành tinh quay quanh mặt trời" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Controls Panel */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        minWidth: '250px',
        transform: showControls ? 'translateX(0)' : 'translateX(calc(100% - 50px))',
        transition: 'transform 0.3s ease'
      }}>
        <button
          onClick={() => setShowControls(!showControls)}
          style={{
            position: 'absolute',
            left: '-40px',
            top: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px 0 0 5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {showControls ? '→' : '←'}
        </button>

        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Tùy chỉnh hiệu ứng</h3>
        
        {/* Theme Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Chủ đề:
          </label>
          <select
            value={config.selectedTheme}
            onChange={(e) => handleConfigChange('selectedTheme', e.target.value)}
            style={{
              width: '100%',
              padding: '5px',
              borderRadius: '5px',
              border: 'none',
              background: '#333',
              color: 'white'
            }}
          >
            <option value="business">Kinh doanh</option>
            <option value="love">Tình yêu</option>
            <option value="space">Vũ trụ</option>
            <option value="tech">Công nghệ</option>
          </select>
        </div>

        {/* Center Text */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Text trung tâm:
          </label>
          <input
            type="text"
            value={config.centerText}
            onChange={(e) => handleConfigChange('centerText', e.target.value)}
            style={{
              width: '100%',
              padding: '5px',
              borderRadius: '5px',
              border: 'none',
              background: '#333',
              color: 'white'
            }}
          />
        </div>

        {/* Radius */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Bán kính: {config.radius}px
          </label>
          <input
            type="range"
            min="100"
            max="300"
            value={config.radius}
            onChange={(e) => handleConfigChange('radius', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {/* Speed */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Tốc độ: {config.speed}s
          </label>
          <input
            type="range"
            min="10"
            max="60"
            value={config.speed}
            onChange={(e) => handleConfigChange('speed', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {/* Instructions */}
        <div style={{ 
          fontSize: '12px', 
          color: '#ccc', 
          marginTop: '20px',
          borderTop: '1px solid #555',
          paddingTop: '10px'
        }}>
          <p>💡 Mẹo:</p>
          <p>• Hover vào text để xem hiệu ứng 3D</p>
          <p>• Thử các chủ đề khác nhau</p>
          <p>• Điều chỉnh tốc độ và bán kính</p>
        </div>
      </div>

      {/* Main Effect */}
      <RotatingTextCylinder 
        texts={themes[config.selectedTheme]}
        centerText={config.centerText}
        radius={config.radius}
        speed={config.speed}
      />

      {/* Info Panel */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '10px',
        fontSize: '14px',
        maxWidth: '300px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>🌟 Rotating Text Cylinder</h4>
        <p style={{ margin: '0 0 5px 0' }}>
          Hiệu ứng text xoay 360° như các hành tinh quay quanh mặt trời
        </p>
        <p style={{ margin: '0', fontSize: '12px', color: '#ccc' }}>
          Được tạo bởi Trường NQ - truongnq.vn
        </p>
      </div>
    </>
  );
};

export default TextCylinderDemo;
