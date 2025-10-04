import React from 'react';
import Head from 'next/head';
import RotatingTextCylinder from '../components/effects/RotatingTextCylinder';

const RotatingTextCylinderPage = () => {
  return (
    <>
      <Head>
        <title>Rotating Text Cylinder - Hiệu ứng Text xoay 360 độ</title>
        <meta name="description" content="Hiệu ứng text xoay 360 độ như các hành tinh quay quanh mặt trời - Rotating Text Cylinder Effect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="rotating text, cylinder effect, 3D text animation, planet orbit, solar system text" />
        <meta property="og:title" content="Rotating Text Cylinder - Hiệu ứng Text xoay 360 độ" />
        <meta property="og:description" content="Hiệu ứng text xoay 360 độ như các hành tinh quay quanh mặt trời" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://truongnq.vn/rotating-text-cylinder" />
      </Head>

      <RotatingTextCylinder 
        texts={[
          "Thiết kế Website chuyên nghiệp",
          "Dịch vụ SEO tối ưu Google", 
          "Landing Page chuyển đổi cao",
          "Tối ưu thứ hạng tìm kiếm",
          "Marketing Online hiệu quả",
          "Branding thương hiệu mạnh",
          "E-commerce bán hàng online",
          "Mobile App ứng dụng di động"
        ]}
        centerText="TRƯỜNG NQ"
        radius={180}
        speed={25}
      />
    </>
  );
};

export default RotatingTextCylinderPage;
