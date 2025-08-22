import Image from "next/image";
import React from "react";

const NQWebHero = () => {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Dưới đây là những lý do nổi bật tại sao doanh nghiệp nên chọn Trường NQ Web
      </h2>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Cột bên trái: Nội dung giới thiệu */}
        <div className="md:w-1/2 md:pr-8 mb-8">
          {/* Danh sách các lý do */}
          <ul className="space-y-6 mb-8">
            <li className="flex items-start group transition-all duration-300 hover:translate-x-1">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2 mt-1 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414z" />
              </svg>
              <div>
                <strong className="block text-gray-800 mb-1 font-semibold">
                  Chuyên sâu và kinh nghiệm
                </strong>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Với nhiều năm hoạt động trong lĩnh vực thiết kế website, SEO tổng thể,
                  quảng cáo Google Ads và giải pháp Ladipage, Trường NQ Web đã tích lũy được
                  kiến thức chuyên môn sâu rộng và uy tín từ hàng loạt dự án thành công.
                </p>
              </div>
            </li>

            <li className="flex items-start group transition-all duration-300 hover:translate-x-1">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2 mt-1 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414z" />
              </svg>
              <div>
                <strong className="block text-gray-800 mb-1 font-semibold">
                  Tư duy kết hợp giữa công nghệ và marketing bền vững
                </strong>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Chúng tôi không chỉ tập trung vào giải pháp công nghệ tiên tiến
                  mà còn chú trọng xây dựng chiến lược marketing hiệu quả. Điều này
                  giúp doanh nghiệp phát triển nền tảng online vững chắc, không bị
                  lệ thuộc vào quảng cáo trả phí.
                </p>
              </div>
            </li>

            <li className="flex items-start group transition-all duration-300 hover:translate-x-1">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2 mt-1 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414z" />
              </svg>
              <div>
                <strong className="block text-gray-800 mb-1 font-semibold">
                  Giải pháp toàn diện
                </strong>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Từ việc thiết kế giao diện hiện đại, tối ưu trải nghiệm người dùng
                  cho đến tối ưu nội dung và chiến lược quảng cáo, Trường NQ Web cung cấp
                  một hệ sinh thái dịch vụ trọn gói, giúp doanh nghiệp tối ưu chuyển đổi
                  và đạt được hiệu quả kinh doanh cao nhất.
                </p>
              </div>
            </li>

            <li className="flex items-start group transition-all duration-300 hover:translate-x-1">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2 mt-1 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414z" />
              </svg>
              <div>
                <strong className="block text-gray-800 mb-1 font-semibold">
                  Tinh thần sáng tạo và cá nhân hóa
                </strong>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Chúng tôi hiểu rằng mỗi thương hiệu đều có một câu chuyện độc đáo.
                  Chính vì vậy, mỗi giải pháp được tùy chỉnh phù hợp với đặc thù và mục tiêu
                  riêng của doanh nghiệp, tạo nên sự khác biệt và nổi bật trên thị trường.
                </p>
              </div>
            </li>

            <li className="flex items-start group transition-all duration-300 hover:translate-x-1">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2 mt-1 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414z" />
              </svg>
              <div>
                <strong className="block text-gray-800 mb-1 font-semibold">
                  Cam kết chất lượng và phát triển dài hạn
                </strong>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Trường NQ Web không chỉ tập trung vào kết quả ngắn hạn mà còn đồng hành
                  cùng doanh nghiệp trên con đường phát triển bền vững, từ đó tạo ra
                  giá trị lâu dài cho thương hiệu.
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Cột bên phải: Hình ảnh */}
        <div className="md:w-1/2 md:mb-0 flex justify-center">
          <div className="relative group">
            <Image
              src="/images/why-choose-us.jpg"
              alt="Trường NQ Web"
              width={800}
              height={800}
              className="rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NQWebHero;
