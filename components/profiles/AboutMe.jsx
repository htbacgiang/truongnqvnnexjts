import Image from "next/image";

const AboutMe = () => {
    return (
        <div className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 ">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fdf2f8' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fdf2f8' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                   
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 uppercase">
                        Giới thiệu về Trường
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                        Khám phá câu chuyện và hành trình của tôi trong lĩnh vực công nghệ và marketing
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="relative">
                            <Image
                                src="/truongnqvn.jpg"
                                width={500}
                                height={600}
                                alt="Trường NQ - Founder"
                                className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition duration-300"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        {/* Who Am I Section */}
                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">Tôi là ai?</h3>
                            </div>

                            <div className="space-y-4 text-base leading-relaxed">
                                <p className="text-gray-700">
                                    Tôi là <span className="font-bold text-pink-600">Trường – Founder của Trường NQ Web</span>, đơn vị chuyên cung cấp giải pháp thiết kế Website, SEO tổng thể, Ladipage và quảng cáo Google Ads.
                                </p>
                                <p className="text-gray-700">
                                    Với tư duy kết hợp giữa <span className="font-bold text-pink-600">công nghệ</span> và <span className="font-bold text-pink-600">marketing bền vững</span>, tôi giúp doanh nghiệp xây dựng nền tảng online chuyên nghiệp, tối ưu chuyển đổi và phát triển dài hạn, không phụ thuộc hoàn toàn vào quảng cáo trả phí.
                                </p>
                                <p className="text-gray-700">
                                    Tôi tin rằng mỗi thương hiệu đều có một câu chuyện xứng đáng được kể theo cách sáng tạo và hiệu quả nhất. Và tôi ở đây để biến điều đó thành hiện thực – qua từng dòng code, từng giao diện, từng chiến lược nội dung.
                                </p>
                            </div>
                        </div>

                        {/* Personal Info Section */}
                        <div className="bg-white p-5 rounded-3xl shadow-xl border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Phone */}
                                <div className="flex items-center p-2 bg-gray-50 rounded-2xl hover:bg-gray-100 transition duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center bg-pink-500 rounded-full mr-4 shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Số điện thoại</p>
                                        <p className="text-gray-900 font-bold">0866 572 271</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center bg-pink-500 rounded-full mr-4 shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Email</p>
                                        <p className="text-gray-900 font-bold">truong@truongnq.vn</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center bg-pink-500 rounded-full mr-4 shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Địa chỉ</p>
                                        <p className="text-gray-900 font-bold">Ứng Hòa, Hà Nội</p>
                                    </div>
                                </div>

                                {/* Birthday */}
                                <div className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center bg-pink-500 rounded-full mr-4 shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Ngày sinh</p>
                                        <p className="text-gray-900 font-bold">27/01/1996</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;