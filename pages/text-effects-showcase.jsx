import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CompactTextCylinder from '../components/effects/CompactTextCylinder';

const TextEffectsShowcase = () => {
  const [selectedDemo, setSelectedDemo] = useState(null);

  const demos = [
    {
      id: 'interactive-galaxy',
      title: '🌟 Interactive Galaxy (NEW!)',
      description: 'Trải nghiệm galactic hoàn toàn mới - drag để xoay, scroll để zoom, touch controls cho mobile',
      link: '/interactive-galaxy',
      preview: 'Khám phá Galaxy tương tác →',
      featured: true
    },
    {
      id: 'full',
      title: 'Full Screen Effect',
      description: 'Hiệu ứng toàn màn hình với nhiều orbit text và hành tinh',
      link: '/rotating-text-cylinder',
      preview: 'Xem demo toàn màn hình →'
    },
    {
      id: 'interactive',
      title: 'Interactive Demo',
      description: 'Demo tương tác với panel điều khiển và nhiều chủ đề',
      link: '/text-cylinder-demo',
      preview: 'Thử nghiệm tương tác →'
    }
  ];

  return (
    <>
      <Head>
        <title>Text Effects Showcase - Bộ sưu tập hiệu ứng Text xoay 360°</title>
        <meta name="description" content="Bộ sưu tập các hiệu ứng text xoay 360 độ như hệ mặt trời - Rotating Text Cylinder Effects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a23 0%, #1a1a3a 50%, #000000 100%)',
        color: 'white',
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          paddingTop: '50px'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ffeb3b, #ff9800, #ff5722)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            textShadow: '0 0 30px rgba(255, 235, 59, 0.5)'
          }}>
            🌟 Text Effects Showcase
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#ccc',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Bộ sưu tập hiệu ứng text xoay 360° như các hành tinh quay quanh mặt trời
          </p>
        </div>

        {/* Compact Demos Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto 60px auto'
        }}>
          {/* Small Size */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#ffeb3b' }}>Kích thước nhỏ</h3>
            <CompactTextCylinder 
              texts={["Web", "SEO", "App", "Brand"]}
              centerText="NQ"
              size="small"
            />
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#ccc' }}>
              Phù hợp cho sidebar hoặc widget nhỏ
            </p>
          </div>

          {/* Medium Size */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#ff9800' }}>Kích thước vừa</h3>
            <CompactTextCylinder 
              texts={["Thiết kế Web", "Dịch vụ SEO", "Landing Page", "Marketing"]}
              centerText="TRƯỜNG NQ"
              size="medium"
            />
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#ccc' }}>
              Lý tưởng cho section hero hoặc giới thiệu
            </p>
          </div>

          {/* Large Size */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            gridColumn: 'span 2'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#ff5722' }}>Kích thước lớn</h3>
            <CompactTextCylinder 
              texts={[
                "Website chuyên nghiệp", 
                "SEO tối ưu Google", 
                "Landing Page hiệu quả", 
                "Marketing Online", 
                "Branding mạnh mẽ",
                "E-commerce thành công"
              ]}
              centerText="TRƯỜNG NQ"
              size="large"
            />
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#ccc' }}>
              Hoàn hảo cho trang chủ hoặc showcase chính
            </p>
          </div>
        </div>

        {/* Full Demos */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            marginBottom: '40px',
            color: '#ffeb3b'
          }}>
            🚀 Demo toàn màn hình
          </h2>

          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {demos.map(demo => (
              <div
                key={demo.id}
                style={{
                  background: demo.featured 
                    ? 'linear-gradient(135deg, rgba(255, 235, 59, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  padding: '25px',
                  border: demo.featured 
                    ? '2px solid rgba(255, 235, 59, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = demo.featured 
                    ? '0 15px 40px rgba(255, 235, 59, 0.3)'
                    : '0 10px 30px rgba(255, 235, 59, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {demo.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'linear-gradient(45deg, #ffeb3b, #ff9800)',
                    color: '#000',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    HOT 🔥
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '10px',
                      color: '#fff'
                    }}>
                      {demo.title}
                    </h3>
                    <p style={{ 
                      color: '#ccc', 
                      marginBottom: '15px',
                      lineHeight: '1.5'
                    }}>
                      {demo.description}
                    </p>
                  </div>
                </div>
                
                <Link href={demo.link}>
                  <a style={{
                    display: 'inline-block',
                    background: 'linear-gradient(45deg, #ffeb3b, #ff9800)',
                    color: '#000',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}>
                    {demo.preview}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Guide */}
        <div style={{
          maxWidth: '800px',
          margin: '60px auto 0 auto',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: '#ffeb3b',
            textAlign: 'center'
          }}>
            📖 Hướng dẫn sử dụng
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div>
              <h4 style={{ color: '#ff9800', marginBottom: '10px' }}>
                🎯 Component Compact
              </h4>
              <pre style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#ccc',
                overflow: 'auto'
              }}>{`<CompactTextCylinder 
  texts={["Text 1", "Text 2"]}
  centerText="CENTER"
  size="medium"
/>`}</pre>
            </div>
            
            <div>
              <h4 style={{ color: '#ff9800', marginBottom: '10px' }}>
                🌟 Component Full
              </h4>
              <pre style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#ccc',
                overflow: 'auto'
              }}>{`<RotatingTextCylinder 
  texts={["Long text 1", "Long text 2"]}
  centerText="CENTER"
  radius={180}
  speed={25}
/>`}</pre>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(255, 235, 59, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 235, 59, 0.3)'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#fff' }}>
              💡 <strong>Lưu ý:</strong> Các hiệu ứng này sử dụng CSS animations và transform 3D. 
              Đảm bảo trình duyệt hỗ trợ CSS3 để có trải nghiệm tốt nhất.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          paddingTop: '30px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ color: '#ccc', fontSize: '14px' }}>
            Được tạo bởi <strong style={{ color: '#ffeb3b' }}>Trường NQ</strong> - 
            <Link href="/">
              <a style={{ color: '#ff9800', textDecoration: 'none', marginLeft: '5px' }}>
                truongnq.vn
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default TextEffectsShowcase;
