import { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import Intro from "../../components/about/Intro";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Image from "next/image";
import AboutMe from "../../components/profiles/AboutMe";
import EducationExperience from "../../components/profiles/EducationExperience";
import Experience from "../../components/profiles/Experience";
import styles from "../../styles/introduction.module.css";

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleOverlayClick = () => {
    setIsPlaying(false);
  };

  return (
    <DefaultLayout>
      <div className="h-[80px] bg-white"></div>
      <AboutMe />
      
      {/* Vision & Mission Section */}
      <div className={styles.visionMissionSection}>
        <div className={styles.visionMissionContent}>
          {/* Text Content */}
          <div className={styles.visionMissionText}>
            <h2 className={styles.visionMissionTitle}>
              🎯 Tầm nhìn & Sứ mệnh
            </h2>
            <p>
              <strong>Tầm nhìn:</strong> Trở thành đơn vị thiết kế web & marketing đáng tin cậy cho các cá nhân, doanh nghiệp vừa và nhỏ tại Việt Nam, nơi bạn không cần biết công nghệ vẫn có thể phát triển mạnh mẽ trên nền tảng số.
            </p>
            <p>
              <strong>Sứ mệnh:</strong> Tạo ra những website đơn giản – tinh tế – hiệu quả, giúp khách hàng xây dựng hình ảnh chuyên nghiệp và tiếp cận khách hàng mục tiêu một cách tự nhiên, bền vững.
            </p>
          </div>

          {/* Video Section */}
          <div className={styles.videoSection}>
            <Image
              src="/images/you-tube.jpg"
              alt="Dịch vụ thiết kế website và marketing của Trường NQ Web"
              layout="responsive"
              width={800}
              height={450}
              className={styles.videoImage}
            />

            {/* Play Button */}
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className={styles.playButton}
              >
                <FaYoutube size={40} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div
          className={styles.videoModal}
          onClick={handleOverlayClick}
        >
          <div
            className={styles.videoModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/d8pdu6nQz0A?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              onClick={handleOverlayClick}
              className={styles.closeButton}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <EducationExperience />
      <Experience />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Trường NQ Web: Thiết Kế Website & Marketing Hiệu Quả",
    description:
      "Trường NQ Web - thiết kế website, SEO tổng thể, Ladipage, quảng cáo Google Ads, giải pháp bán hàng và marketing hiệu quả.",
    keywords:
      "Trường NQ Web, thiết kế website, SEO tổng thể, Ladipage, quảng cáo Google Ads, marketing online, phát triển bền vững",
    author: "Trường NQ Web",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1.0",
    canonical: "https://truongnq.vn/gioi-thieu",
    og: {
      title: "Trường NQ Web: Thiết Kế Website & Marketing Hiệu Quả",
      description:
        "Trường NQ Web - thiết kế website, SEO tổng thể, Ladipage, quảng cáo Google Ads, giải pháp bán hàng và marketing hiệu quả.",
      image: "https://truongnq.vn/baner-web.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://truongnq.vn/gioi-thieu",
      type: "website",
      locale: "vi_VN",
      siteName: "Trường NQ Web",
    },
    twitter: {
      card: "summary_large_image",
      title: "Trường NQ Web: Thiết Kế Website & Marketing Hiệu Quả",
      description:
        "Trường NQ Web - thiết kế website, SEO, Ladipage, Google Ads, giải pháp marketing hiệu quả.",
      image: "https://truongnq.vn/baner-web.jpg",
    },
    favicon: "/favicon.ico",
  };

  return {
    props: {
      meta,
    },
  };
}