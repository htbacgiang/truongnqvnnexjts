import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../../components/layout/DefaultLayout";

const AlbumList = () => {
  const albums = [
    { 
      slug: "viet-nam-que-huong-toi",
      title: "Việt Nam quê hương tôi", 
      image: "/blog/blogpost1.jpg",
      description: "Khám phá vẻ đẹp của Việt Nam qua những khoảnh khắc đáng nhớ"
    },
    { 
      slug: "ha-tay-que-lua",
      title: "Hà Tây quê lụa", 
      image: "/blog/blogpost2.jpg",
      description: "Những hình ảnh đẹp về quê lụa Hà Tây"
    },
    { 
      slug: "truong-va-friends",
      title: "Trường và Friends", 
      image: "/blog/blogpost3.jpg",
      description: "Những khoảnh khắc vui vẻ cùng bạn bè"
    },
    { 
      slug: "bsa",
      title: "BSA", 
      image: "/blog/blogpost4.jpg",
      description: "Album về BSA"
    },
    { 
      slug: "xe-bus-ha-noi",
      title: "Xe bus Hà Nội", 
      image: "/blog/blogpost5.jpg",
      description: "Những hình ảnh về xe bus Hà Nội"
    },
    { 
      slug: "nhat-ban-den-va-yeu",
      title: "Nhật Bản đến và yêu", 
      image: "/blog/blogpost8.jpg",
      description: "Hành trình khám phá Nhật Bản"
    },
  ];

  return (
    <DefaultLayout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Phần danh mục album */}
          <div className="py-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-pink-500 uppercase mb-2 tracking-wider">
                Album ảnh
              </h3>
              <h2 className="text-2xl md:text-4xl font-bold font-heading">
                Online Albums{" "}
                <span className="text-teal-500">lưu giữ những kỷ niệm</span>
              </h2>
            </div>

            {/* Grid cho các danh mục */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {albums.map((album, index) => (
                <Link
                  key={index}
                  href={`/album/${album.slug}`}
                  className="group relative flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white hover:bg-gray-50 border-2 border-transparent"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 ring-2 ring-gray-200 group-hover:ring-pink-200">
                    <Image
                      src={album.image}
                      width={64}
                      height={64}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <h4 className="text-sm font-semibold text-center leading-tight transition-colors duration-300 text-gray-700 group-hover:text-pink-600">
                    {album.title}
                  </h4>
                  
                  <p className="text-xs text-gray-500 text-center mt-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {album.description}
                  </p>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  const meta = {
    title: "Album Ảnh - Trường NQ Web",
    description:
      "Khám phá bộ sưu tập album ảnh tuyệt đẹp tại Trường NQ Web, lưu giữ những khoảnh khắc đáng nhớ từ Việt Nam quê hương tôi, Hà Tây quê lụa, đến Nhật Bản đến và yêu.",
    keywords:
      "album ảnh, Trường NQ Web, Việt Nam quê hương tôi, Hà Tây quê lụa, Nhật Bản đến và yêu, kỷ niệm",
    robots: "index, follow",
    canonical: "https://truongnq.vn/album",
    og: {
      title: "Album Ảnh - Trường NQ Web",
      description:
        "Khám phá bộ sưu tập album ảnh tuyệt đẹp tại Trường NQ Web, lưu giữ những khoảnh khắc đáng nhớ.",
      type: "website",
      url: "https://truongnq.vn/album",
      image: "https://truongnq.vn/baner-web.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      siteName: "Trường NQ Web",
    },
    twitter: {
      card: "summary_large_image",
      title: "Album Ảnh - Trường NQ Web",
      description:
        "Khám phá bộ sưu tập album ảnh tuyệt đẹp tại Trường NQ Web.",
      image: "https://truongnq.vn/baner-web.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}

export default AlbumList;