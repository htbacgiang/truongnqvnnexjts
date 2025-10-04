import React from 'react';
import Head from 'next/head';
import InteractiveTextGalaxy from '../components/effects/InteractiveTextGalaxy';

const InteractiveGalaxyPage = () => {
  return (
    <>
      <Head>
        <title>Interactive Text Galaxy - Trải nghiệm Galactic tương tác</title>
        <meta name="description" content="Trải nghiệm galactic tương tác với hiệu ứng text 3D - drag để xoay, scroll để zoom, tap và swipe trên mobile" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="keywords" content="interactive galaxy, 3D text effect, drag rotate, zoom, mobile touch, galactic experience" />
        <meta property="og:title" content="Interactive Text Galaxy - Trải nghiệm Galactic tương tác" />
        <meta property="og:description" content="Khám phá vũ trụ text 3D với khả năng tương tác đầy ấn tượng" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://truongnq.vn/interactive-galaxy" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* Disable zoom on mobile for better interaction */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* PWA meta tags */}
        <meta name="theme-color" content="#0a0a23" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <InteractiveTextGalaxy 
        texts={[
          "🌟 Thiết kế Website chuyên nghiệp",
          "🚀 Dịch vụ SEO tối ưu Google", 
          "💎 Landing Page chuyển đổi cao",
          "📈 Tối ưu thứ hạng tìm kiếm",
          "🎯 Marketing Online hiệu quả",
          "🏆 Branding thương hiệu mạnh",
          "🛒 E-commerce bán hàng online",
          "📱 Mobile App ứng dụng di động",
          "⚡ Tối ưu tốc độ website",
          "🔒 Bảo mật website an toàn"
        ]}
        centerText="TRƯỜNG NQ"
      />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Interactive Text Galaxy",
            "description": "Trải nghiệm galactic tương tác với hiệu ứng text 3D",
            "url": "https://truongnq.vn/interactive-galaxy",
            "applicationCategory": "Entertainment",
            "operatingSystem": "Web Browser",
            "author": {
              "@type": "Person",
              "name": "Trường NQ",
              "url": "https://truongnq.vn"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "VND"
            }
          })
        }}
      />
    </>
  );
};

export default InteractiveGalaxyPage;
