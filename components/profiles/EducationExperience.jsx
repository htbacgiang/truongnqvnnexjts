import Link from "next/link";
import styles from "../../styles/introduction.module.css";

export default function EducationExperience() {
    return (
        <div className={styles.educationExperienceSection}>
            <div className={styles.educationExperienceContainer}>
                {/* Header */}
                <div className={styles.educationExperienceHeader}>
                    <h2 className={styles.educationExperienceTitle}>
                        Học vấn & Kinh nghiệm
                    </h2>
                    <h3 className={styles.educationExperienceSubtitle}>
                        Trau dồi Kiến thức và Kỹ năng
                    </h3>
                    <p className={styles.educationExperienceDescription}>
                        Hành trình học vấn và kinh nghiệm của tôi đã giúp tôi phát triển kỹ năng chuyên môn và khả năng sáng tạo trong nhiều lĩnh vực khác nhau.
                    </p>
                </div>
                
                <h3 className={styles.educationSectionTitle}>
                    Học vấn
                </h3>
                
                {/* Education & Experience Cards */}
                <div className={styles.educationExperienceGrid}>
                    {/* Card 1 - Kỹ sư Điện tử Máy tính */}
                    <div className={styles.educationCard}>
                        <h3 className={styles.educationCardTitle}>
                            Kỹ sư Điện tử Máy tính
                        </h3>
                        <p className={styles.educationCardSubtitle}>
                            Học viện Công nghệ Bưu chính Viễn thông
                        </p>
                        <p className={styles.educationCardDate}>2014-2020</p>
                        <p className={styles.educationCardDescription}>
                            Tôi đã hoàn thành chương trình Kỹ sư điện tử Máy tính, nơi tôi học được các kiến thức nền tảng về công nghệ và phát triển kỹ năng giải quyết vấn đề
                        </p>
                    </div>

                    {/* Card 2 - UNITAS Japanese Language School */}
                    <div className={styles.educationCard}>
                        <h3 className={styles.educationCardTitle}>
                            UNITAS Japanese Language School Kofu
                        </h3>
                        <p className={styles.educationCardDate}>2023</p>
                        <p className={styles.educationCardDescription}>
                            Tôi đã tham gia khóa học tiếng Nhật tại UNITAS, giúp tôi nâng cao khả năng giao tiếp và hiểu biết về văn hóa Nhật Bản, hỗ trợ trong các dự án quốc tế.
                        </p>
                    </div>

                    {/* Card 3 - Thạc sỹ Quản trị kinh doanh */}
                    <div className={styles.educationCard}>
                        <h3 className={styles.educationCardTitle}>
                            Thạc sỹ Quản trị kinh doanh
                        </h3>
                        <p className={styles.educationCardSubtitle}>
                            Học viện Công nghệ Bưu chính Viễn thông
                        </p>
                        <p className={styles.educationCardDate}>2023-2025</p>
                        <p className={styles.educationCardDescription}>
                            Tôi đang theo học chương trình Thạc sỹ Quản trị kinh doanh, tập trung vào phát triển kỹ năng quản lý và chiến lược kinh doanh để áp dụng vào các dự án khởi nghiệp
                        </p>
                    </div>

                    {/* Card 4 - Chuỗi các khóa học khác */}
                    <div className={styles.educationCard}>
                        <h3 className={styles.educationCardTitle}>
                            Chuỗi các khóa học khác
                        </h3>
                        <p className={styles.educationCardDescription}>
                            Tôi luôn tìm kiếm cơ hội học hỏi và phát triển để nâng cao chuyên môn và đóng góp giá trị cho cộng đồng
                        </p>
                        <ul className={styles.educationCardList}>
                            <li>
                                Chuỗi khóa học của diễn giả{" "}
                                <Link 
                                    href="https://www.maiquocbinh.com/"
                                    className={styles.educationCardLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mai Quốc Bình
                                </Link>{" "}
                                CEO Thế giới giấy
                            </li>
                            <li>
                                Chuỗi khóa học khởi sự cho doanh nghiệp 2024 do{" "}
                                <Link 
                                    href="https://vtcnetviet.com/"
                                    className={styles.educationCardLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    VTC NetViet tổ chức
                                </Link>
                            </li>
                            <li>
                                Lập trình web tại{" "}
                                <Link 
                                    href="https://fullstack.edu.vn/"
                                    className={styles.educationCardLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    F8 Fullstack
                                </Link>
                            </li>
                            <li>
                                Khóa học thiết kế - anh{" "}
                                <Link 
                                    href="https://www.facebook.com/trungbatigoltn"
                                    className={styles.educationCardLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Hoàng Hoa Trung
                                </Link>{" "}
                                sáng lập dự án Nuôi em
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}