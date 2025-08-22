import Image from 'next/image';
import Link from 'next/link';
import styles from "../../styles/introduction.module.css";

export default function Experience() {
  return (
    <div className={styles.experienceSection}>
      <div className={styles.experienceContainer}>
        {/* Left Section: Experience Details */}
        <div className={styles.experienceContent}>
          <h3 className={styles.experienceTitle}>
            Kinh nghiệm
          </h3>

          {/* Experience 1 */}
          <div className={styles.experienceItem}>
            <h3 className={styles.experienceItemTitle}>
              Giá Kệ Tân Phát <span>[2020-2024]</span>
            </h3>
            <p className={styles.experienceItemRole}>
              Founder
            </p>
            <p className={styles.experienceItemDescription}>
              Giá kệ siêu thị Tân Phát, chuyên cung cấp kệ để hàng cho siêu thị, tạp hóa tại khu vực các tỉnh miền Bắc, mang đến giải pháp lưu trữ hiệu quả và tối ưu cho khách hàng.
            </p>
          </div>

          {/* Experience 2 */}
          <div className={styles.experienceItem}>
            <h3 className={styles.experienceItemTitle}>
              Eco Bắc Giang & TruongNQ Web <span>[2025]</span>
            </h3>
            <p className={styles.experienceItemRole}>
              Founder
            </p>
            <p className={styles.experienceItemDescription}>
              <Link 
                href="https://ecobacgiang.vn"
                className={styles.experienceItemLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Eco Bắc Giang
              </Link>{" "}
              là dự án khởi nghiệp nông nghiệp thông minh, tập trung vào phát triển thực phẩm hữu cơ theo hướng bền vững.{" "}
              <Link 
                href="https://truongnq.vn"
                className={styles.experienceItemLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                TruongNQ Web
              </Link>{" "}
              cung cấp dịch vụ thiết kế web theo yêu cầu (code tay, WordPress, LadiPage) và SEO, giúp website lên top tìm kiếm Google, giảm phụ thuộc vào quảng cáo.
            </p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className={styles.experienceImage}>
          <Image
            src="/images/founder-ecobacgiang.jpg"
            alt="Experience Image"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}