// pages/dich-vu-seo.js (hoặc tên file bạn đã đặt cho trang này)

import Link from 'next/link'; // Import Link
import Head from 'next/head'; // Import Head để sử dụng JSON-LD nếu cần
import DefaultLayout from '../../components/layout/DefaultLayout';
import DemoProduct from '../../components/profiles/DemoProduct';
import WorkProcess from '../../components/profiles/WorkProcess';
import NQWebHero from '../../components/profiles/NQWebHero';
import SeoTheme from '../../components/profiles/SEOTheme';
import SEOValues from '../../components/profiles/SEOValues';

// Component chính cho trang Dịch vụ SEO
export default function SeoServicePage({ meta }) { // Nhận meta prop từ getServerSideProps
    // Đối tượng JSON-LD cho Structured Data (Schema.org) - Loại Service
    const jsonLdServiceData = {
        "@context": "https://schema.org",
        "@type": "Service", // Hoặc Product nếu bạn coi SEO là một sản phẩm cụ thể
        "serviceType": "Dịch vụ SEO Website",
        "name": "Dịch vụ SEO chuyên nghiệp | Trường NQ Web",
        "description": "Trường NQ Web cung cấp dịch vụ SEO chuyên nghiệp giúp website của bạn đạt thứ hạng cao trên Google, tăng lưu lượng truy cập và giảm chi phí quảng cáo. Liên hệ ngay để cải thiện hiệu quả kinh doanh và phát triển thương hiệu số!",
        "provider": {
            "@type": "Organization",
            "name": "Trường NQ Web",
            "url": "https://truongnq.vn",
            "logo": "https://truongnq.vn/logotruongnqvn.png", // Đảm bảo đường dẫn logo này là chính xác
            "sameAs": ["https://www.facebook.com/www.truongnq.vn"] // Các trang mạng xã hội khác
        },
        "url": "https://truongnq.vn/dich-vu-seo", // URL của trang dịch vụ SEO này
        "image": "https://truongnq.vn/dic-vu-seo.jpg", // URL của ảnh đại diện cho dịch vụ SEO
        "offers": { // Ví dụ về cấu trúc giá, có thể chi tiết hơn
            "@type": "Offer",
            "priceCurrency": "VND",
            "priceRange": "Liên hệ để báo giá", // Hoặc một khoảng giá cụ thể nếu có
            "availability": "https://schema.org/InStock",
            "eligibleRegion": {
                "@type": "Country",
                "name": "VN" // Phạm vi phục vụ
            }
        },
        "areaServed": [
            {
                "@type": "State", // Nếu phục vụ toàn quốc hoặc vùng cụ thể
                "name": "Việt Nam"
            }
        ]
    };

    return (
        // Truyền meta prop vào DefaultLayout để nó quản lý thẻ <head>
        <DefaultLayout meta={meta}>
            <Head>
                {/* JSON-LD Structured Data cho Service */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServiceData) }}
                />
            </Head>

            <div className="min-h-screen">
                <h1 className="hidden">
                    Trường NQ Web - Dịch vụ SEO chuyên nghiệp, Giải pháp Tối ưu Website & Thương hiệu số
                </h1>

                <SeoTheme /> {/* Giả định SeoTheme chứa h2 hoặc h3 chính */}

                {/* Section giới thiệu các dịch vụ & quy trình */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Đảm bảo các component này có các thẻ h2, h3 hợp lý */}
                        <DemoProduct />
                        <SEOValues />
                        <WorkProcess />
                        <NQWebHero />
                    </div>
                </section>

                {/* Call to Action - Kêu gọi liên hệ */}
                <section className="py-10 bg-blue-600 text-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        {/* Đây nên là h2 cho mục tiêu SEO cục bộ của section này */}
                        <h2 className="text-xl md:text-3xl font-bold mb-4">
                            Bạn đã sẵn sàng cải thiện thứ hạng website với dịch vụ SEO?
                        </h2>
                        <p className="text-lg mb-8">
                            Liên hệ với Trường NQ Web ngay hôm nay để nhận tư vấn miễn phí và giải pháp tối ưu giúp website của bạn bứt phá trên thị trường số!
                        </p>
                        {/* Sử dụng Next/Link để tối ưu SEO và chuyển hướng */}
                        <Link href="/lien-he" passHref>
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                                Bắt đầu ngay
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
}

// getServerSideProps để lấy dữ liệu meta và truyền vào component
export async function getServerSideProps() {
    const meta = {
        title: "Dịch vụ SEO - Tối ưu website & Nâng cao Thương hiệu số | Trường NQ Web",
        description:
            "Trường NQ Web cung cấp dịch vụ SEO chuyên nghiệp giúp website của bạn đạt thứ hạng cao trên Google, tăng lưu lượng truy cập và giảm chi phí quảng cáo. Liên hệ ngay để cải thiện hiệu quả kinh doanh và phát triển thương hiệu số!",
        keywords:
            "dịch vụ SEO, SEO chuyên nghiệp, tối ưu website, tăng thứ hạng Google, Trường NQ Web, thương hiệu số",
        author: "Trường NQ Web",
        robots: "index, follow",
        canonical: "https://truongnq.vn/dich-vu-seo",
        og: {
            title: "Dịch vụ SEO - Tối ưu website & Nâng cao Thương hiệu số | Trường NQ Web",
            description:
                "Trường NQ Web cung cấp dịch vụ SEO chuyên nghiệp giúp website đạt thứ hạng cao trên Google, tăng lưu lượng truy cập và phát triển thương hiệu số.",
            image: "https://truongnq.vn/dic-vu-seo.jpg", // Đảm bảo ảnh này tồn tại và được tối ưu
            imageWidth: "1200",
            imageHeight: "630",
            url: "https://truongnq.vn/dich-vu-seo",
            type: "website", // Dùng 'website' cho trang này hoặc 'product' nếu phù hợp hơn
            siteName: "Trường NQ Web",
        },
        twitter: {
            card: "summary_large_image",
            title: "Dịch vụ SEO - Tối ưu website & Nâng cao Thương hiệu số | Trường NQ Web",
            description:
                "Trường NQ Web - Dịch vụ SEO chuyên nghiệp giúp tăng thứ hạng website và phát triển thương hiệu số.",
            image: "https://truongnq.vn/dic-vu-seo.jpg", // Đảm bảo ảnh này tồn tại và được tối ưu
        },
    };

    return {
        props: {
            meta,
        },
    };
}