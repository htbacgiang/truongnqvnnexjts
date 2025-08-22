import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AlbumBsa from "../../components/album/listAlbum/BSA";
import AlbumTruong from "../../components/album/listAlbum/Truong";
import AlbumNB from "../../components/album/listAlbum/NhatBan";
import AlbumBusHN from "../../components/album/listAlbum/BusHN";
import AlbumVN from "../../components/album/listAlbum/Vietnam";
import AlbumHT from "../../components/album/listAlbum/HaTay";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Link from "next/link";

const AlbumDetail = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [albumData, setAlbumData] = useState(null);

    const albums = [
        {
            slug: "viet-nam-que-huong-toi",
            title: "Việt Nam quê hương tôi",
            image: "/blog/blogpost1.jpg",
            description: "Khám phá vẻ đẹp của Việt Nam qua những khoảnh khắc đáng nhớ",
            seoDescription: "Album ảnh Việt Nam quê hương tôi - Bộ sưu tập hình ảnh đẹp về đất nước, con người và văn hóa Việt Nam. Những khoảnh khắc đáng nhớ từ Bắc vào Nam, từ miền núi đến đồng bằng.",
            keywords: "Việt Nam, quê hương, album ảnh, văn hóa Việt Nam, du lịch Việt Nam, phong cảnh Việt Nam, con người Việt Nam"
        },
        {
            slug: "ha-tay-que-lua",
            title: "Hà Tây quê lụa",
            image: "/blog/blogpost2.jpg",
            description: "Những hình ảnh đẹp về quê lụa Hà Tây",
            seoDescription: "Album ảnh Hà Tây quê lụa - Khám phá vẻ đẹp của vùng đất Hà Tây với nghề dệt lụa truyền thống, phong cảnh làng quê yên bình và những giá trị văn hóa đặc trưng.",
            keywords: "Hà Tây, quê lụa, dệt lụa, làng nghề, văn hóa Hà Tây, phong cảnh Hà Tây, lụa Vạn Phúc"
        },
        {
            slug: "truong-va-friends",
            title: "Trường và Friends",
            image: "/blog/blogpost3.jpg",
            description: "Những khoảnh khắc vui vẻ cùng bạn bè",
            seoDescription: "Album ảnh Trường và Friends - Lưu giữ những khoảnh khắc đáng nhớ cùng bạn bè, đồng nghiệp. Những buổi gặp gỡ, tiệc tùng và hoạt động tập thể thú vị.",
            keywords: "bạn bè, đồng nghiệp, tiệc tùng, hoạt động tập thể, kỷ niệm, gặp gỡ bạn bè"
        },
        {
            slug: "bsa",
            title: "BSA",
            image: "/blog/blogpost4.jpg",
            description: "Album về BSA",
            seoDescription: "Album ảnh BSA - Hội sinh viên Bắc Giang tại Hà Nội. Những hoạt động, sự kiện và khoảnh khắc đáng nhớ của cộng đồng sinh viên Bắc Giang học tập và sinh sống tại thủ đô.",
            keywords: "BSA, hội sinh viên Bắc Giang, sinh viên Bắc Giang Hà Nội, hoạt động sinh viên, cộng đồng Bắc Giang"
        },
        {
            slug: "xe-bus-ha-noi",
            title: "Xe bus Hà Nội",
            image: "/blog/blogpost5.jpg",
            description: "Những hình ảnh về xe bus Hà Nội",
            seoDescription: "Album ảnh xe bus Hà Nội - Bộ sưu tập hình ảnh về hệ thống xe bus công cộng của thủ đô. Những khoảnh khắc thú vị trên xe bus, cảnh đẹp Hà Nội qua cửa sổ xe và cuộc sống đô thị.",
            keywords: "xe bus Hà Nội, giao thông Hà Nội, xe bus công cộng, cuộc sống Hà Nội, giao thông đô thị"
        },
        {
            slug: "nhat-ban-den-va-yeu",
            title: "Nhật Bản đến và yêu",
            image: "/blog/blogpost8.jpg",
            description: "Hành trình khám phá Nhật Bản",
            seoDescription: "Album ảnh Nhật Bản đến và yêu - Hành trình khám phá đất nước mặt trời mọc. Những khoảnh khắc đẹp về văn hóa, ẩm thực, phong cảnh và con người Nhật Bản qua chuyến du lịch đáng nhớ.",
            keywords: "Nhật Bản, du lịch Nhật Bản, văn hóa Nhật Bản, ẩm thực Nhật Bản, phong cảnh Nhật Bản, đất nước mặt trời mọc"
        },
    ];

    useEffect(() => {
        if (slug) {
            const album = albums.find(album => album.slug === slug);
            setAlbumData(album);
        }
    }, [slug]);

    const renderAlbumComponent = () => {
        if (!albumData) return null;

        switch (albumData.title) {
            case "Việt Nam quê hương tôi":
                return <AlbumVN />;
            case "Hà Tây quê lụa":
                return <AlbumHT />;
            case "Trường và Friends":
                return <AlbumTruong />;
            case "BSA":
                return <AlbumBsa />;
            case "Xe bus Hà Nội":
                return <AlbumBusHN />;
            case "Nhật Bản đến và yêu":
                return <AlbumNB />;
            default:
                return null;
        }
    };

    if (!albumData) {
        return (
            <DefaultLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Album không tồn tại</h1>
                            <Link href="/album" className="text-pink-500 hover:text-pink-700">
                                ← Quay lại trang album
                            </Link>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="py-12">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-8">
                    </div>
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-semibold text-pink-500 uppercase mb-2 tracking-wider">
                            Album ảnh
                        </h3>
                        <h2 className="text-2xl md:text-4xl font-bold font-heading">
                            Online Albums{" "}
                            <span className="text-teal-500">lưu giữ những kỷ niệm</span>
                        </h2>
                    </div>

                    {/* Phần danh mục album */}
                    <div className="mb-8">
                        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {albums.map((album, index) => (
                                <Link
                                    key={index}
                                    href={`/album/${album.slug}`}
                                    className={`group relative flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${albumData.slug === album.slug
                                        ? "bg-gradient-to-br from-pink-100 to-teal-100 border-2 border-pink-300 shadow-lg"
                                        : "bg-white hover:bg-gray-50 border-2 border-transparent"
                                        }`}
                                >
                                    {/* Active indicator */}
                                    {albumData.slug === album.slug && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}

                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 ${albumData.slug === album.slug
                                        ? "ring-3 ring-pink-300 ring-opacity-50"
                                        : "ring-1 ring-gray-200 group-hover:ring-pink-200"
                                        }`}>
                                        <Image
                                            src={album.image}
                                            width={48}
                                            height={48}
                                            alt={album.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <h4 className={`text-xs font-medium text-center leading-tight transition-colors duration-300 ${albumData.slug === album.slug
                                        ? "text-pink-700"
                                        : "text-gray-700 group-hover:text-pink-600"
                                        }`}>
                                        {album.title}
                                    </h4>

                                    {/* Hover effect overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Album Content */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        {renderAlbumComponent()}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export async function getStaticPaths() {
    const albums = [
        { slug: "viet-nam-que-huong-toi" },
        { slug: "ha-tay-que-lua" },
        { slug: "truong-va-friends" },
        { slug: "bsa" },
        { slug: "xe-bus-ha-noi" },
        { slug: "nhat-ban-den-va-yeu" },
    ];

    const paths = albums.map((album) => ({
        params: { slug: album.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const albums = [
        {
            slug: "viet-nam-que-huong-toi",
            title: "Việt Nam quê hương tôi",
            image: "/blog/blogpost1.jpg",
            description: "Khám phá vẻ đẹp của Việt Nam qua những khoảnh khắc đáng nhớ",
            seoDescription: "Album ảnh Việt Nam quê hương tôi - Bộ sưu tập hình ảnh đẹp về đất nước, con người và văn hóa Việt Nam. Những khoảnh khắc đáng nhớ từ Bắc vào Nam, từ miền núi đến đồng bằng.",
            keywords: "Việt Nam, quê hương, album ảnh, văn hóa Việt Nam, du lịch Việt Nam, phong cảnh Việt Nam, con người Việt Nam"
        },
        {
            slug: "ha-tay-que-lua",
            title: "Hà Tây quê lụa",
            image: "/blog/blogpost2.jpg",
            description: "Những hình ảnh đẹp về quê lụa Hà Tây",
            seoDescription: "Album ảnh Hà Tây quê lụa - Khám phá vẻ đẹp của vùng đất Hà Tây với nghề dệt lụa truyền thống, phong cảnh làng quê yên bình và những giá trị văn hóa đặc trưng.",
            keywords: "Hà Tây, quê lụa, dệt lụa, làng nghề, văn hóa Hà Tây, phong cảnh Hà Tây, lụa Vạn Phúc"
        },
        {
            slug: "truong-va-friends",
            title: "Trường và Friends",
            image: "/blog/blogpost3.jpg",
            description: "Những khoảnh khắc vui vẻ cùng bạn bè",
            seoDescription: "Album ảnh Trường và Friends - Lưu giữ những khoảnh khắc đáng nhớ cùng bạn bè, đồng nghiệp. Những buổi gặp gỡ, tiệc tùng và hoạt động tập thể thú vị.",
            keywords: "bạn bè, đồng nghiệp, tiệc tùng, hoạt động tập thể, kỷ niệm, gặp gỡ bạn bè"
        },
        {
            slug: "bsa",
            title: "BSA",
            image: "/blog/blogpost4.jpg",
            description: "Album về BSA",
            seoDescription: "Album ảnh BSA - Hội sinh viên Bắc Giang tại Hà Nội. Những hoạt động, sự kiện và khoảnh khắc đáng nhớ của cộng đồng sinh viên Bắc Giang học tập và sinh sống tại thủ đô.",
            keywords: "BSA, hội sinh viên Bắc Giang, sinh viên Bắc Giang Hà Nội, hoạt động sinh viên, cộng đồng Bắc Giang"
        },
        {
            slug: "xe-bus-ha-noi",
            title: "Xe bus Hà Nội",
            image: "/blog/blogpost5.jpg",
            description: "Những hình ảnh về xe bus Hà Nội",
            seoDescription: "Album ảnh xe bus Hà Nội - Bộ sưu tập hình ảnh về hệ thống xe bus công cộng của thủ đô. Những khoảnh khắc thú vị trên xe bus, cảnh đẹp Hà Nội qua cửa sổ xe và cuộc sống đô thị.",
            keywords: "xe bus Hà Nội, giao thông Hà Nội, xe bus công cộng, cuộc sống Hà Nội, giao thông đô thị"
        },
        {
            slug: "nhat-ban-den-va-yeu",
            title: "Nhật Bản đến và yêu",
            image: "/blog/blogpost8.jpg",
            description: "Hành trình khám phá Nhật Bản",
            seoDescription: "Album ảnh Nhật Bản đến và yêu - Hành trình khám phá đất nước mặt trời mọc. Những khoảnh khắc đẹp về văn hóa, ẩm thực, phong cảnh và con người Nhật Bản qua chuyến du lịch đáng nhớ.",
            keywords: "Nhật Bản, văn hóa Nhật Bản, ẩm thực Nhật Bản, phong cảnh Nhật Bản, đất nước mặt trời mọc"
        },
    ];

    const album = albums.find(album => album.slug === params.slug);

    if (!album) {
        return {
            notFound: true,
        };
    }

    const meta = {
        title: `${album.title} - Album Ảnh - Trường NQ Web`,
        description: album.seoDescription || album.description,
        keywords: album.keywords || `album ảnh, ${album.title}, Trường NQ Web, kỷ niệm`,
        robots: "index, follow",
        canonical: `https://truongnq.vn/album/${params.slug}`,
        og: {
            title: `${album.title} - Album Ảnh - Trường NQ Web`,
            description: album.seoDescription || album.description,
            type: "website",
            url: `https://truongnq.vn/album/${params.slug}`,
            image: `https://truongnq.vn${album.image}`,
            imageWidth: "1200",
            imageHeight: "630",
            siteName: "Trường NQ Web",
        },
        twitter: {
            card: "summary_large_image",
            title: `${album.title} - Album Ảnh - Trường NQ Web`,
            description: album.seoDescription || album.description,
            image: `https://truongnq.vn${album.image}`,
        },
    };

    return {
        props: {
            album,
            meta,
        },
    };
}

export default AlbumDetail;
