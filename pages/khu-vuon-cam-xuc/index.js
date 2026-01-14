import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AnhsGarden from "../../components/AnhsGarden";

export default function KhuVuonCamXucPage() {


  return (
    <div className="h-screen">
      {/* Page-only fonts (Designer touch) */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
     <AnhsGarden />
    </div>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Ánh's Rose Garden - Khu Vườn Hạnh Phúc",
    description:
      "Khu vườn của Ánh với những đóa hoa hồng đầy ý nghĩa. Khám phá lời chúc theo từng thời khắc trong ngày - sáng sớm, buổi sáng, chiều hoàng hôn và đêm yên tĩnh. Mỗi đóa hoa mang một thông điệp riêng về bình yên, khí chất, tình yêu và di sản.",
    keywords:
      "Ánh's Garden, khu vườn cảm xúc, hoa hồng, lời chúc, bình yên, khí chất, mãi mãi, di sản, truongnq.vn, khu vườn tương tác",
    robots: "noindex, nofollow",
    author: "Trường NQ",
    canonical: "https://truongnq.vn/khu-vuon-cam-xuc",
    og: {
      title: "Ánh's Rose Garden - Khu Vườn Hạnh Phúc",
      description:
        "Khám phá khu vườn của Ánh với những đóa hoa hồng đầy ý nghĩa. Mỗi đóa hoa mang một thông điệp riêng về bình yên, khí chất, tình yêu và di sản. Lời chúc thay đổi theo từng thời khắc trong ngày.",
      type: "website",
      image: "https://truongnq.vn/anh-gardent/bg-sang.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://truongnq.vn/khu-vuon-cam-xuc",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ánh's Rose Garden - Khu Vườn Hạnh Phúc",
      description:
        "Khám phá khu vườn của Ánh với những đóa hoa hồng đầy ý nghĩa. Lời chúc thay đổi theo từng thời khắc trong ngày.",
      image: "https://truongnq.vn/anh-gardent/bg-sang.jpg",
    },
  };

  return { props: { meta } };
}


