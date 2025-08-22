'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function TestimonialSection() {
  const testimonials = [
    {
      image: '/images/mc-hong-quyen-1.webp',
      name: 'MC Hồng Quyên',
      position: 'Trung Tâm Đào Tạo MC Q&K Bắc Giang',
      company: 'Website: mcbacgiang.com',
      project: 'Website giáo dục',
      review:
      'Tôi rất ấn tượng với sự chuyên nghiệp và hiệu quả của dịch vụ SEO. Giao diện website mcbacgiang.com cũng được thiết kế rất đẹp mắt, thu hút, giúp học viên dễ dàng tìm hiểu và đăng ký khóa học. Nhờ đó, trung tâm đã thu hút được nhiều học viên hơn, và tôi rất hài lòng với kết quả này. Cảm ơn đội ngũ đã hỗ trợ tận tình!',
      rating: 5,
    },
    {
        image: '/images/anh-ky.jpg',
        name: 'Anh Lê Ngọc Kỳ',
        position: 'Greenla Home',
        company: 'Website: greenlahome.vn',
        project: 'Tư Vấn Thiết Kế Nội Thất',
        review:
          'Website greenlahome.vn được thiết kế rất chuyên nghiệp, giao diện đẹp mắt và dễ sử dụng, giúp tôi dễ dàng tìm hiểu các ý tưởng thiết kế nội thất phù hợp cho không gian sống của mình. Đội ngũ tư vấn tận tình, sáng tạo, đã mang đến cho gia đình tôi một không gian sống tiện nghi, sang trọng và đúng với sở thích. Tôi rất ấn tượng và sẽ tiếp tục ủng hộ trong tương lai!',
        rating: 5,
      },
      {
        image: '/images/giang-noi-tiet.jpg',
        name: 'Chị Hương Giang',
        position: 'Chuyên trang bệnh nội tiết',
        company: 'Website: benhnoithet.com',
        project: 'Tư Vấn Sức Khỏe',
        review:
          'Website benhnoithet.com có giao diện rất hiện đại và thân thiện, giúp tôi dễ dàng tìm kiếm thông tin cần thiết. Nội dung được trình bày rõ ràng, chuyên nghiệp, mang lại cảm giác tin cậy ngay từ lần truy cập đầu tiên. Tôi rất hài lòng với sự hỗ trợ nhiệt tình từ đội ngũ của website, họ đã giúp tôi giải đáp nhiều thắc mắc một cách chi tiết. Đây là một địa chỉ đáng tin cậy mà tôi sẽ giới thiệu cho bạn bè và người thân!',
        rating: 4,
      },
      {
        image: '/images/chi-bao-yen-univisport.jpg',
        name: 'Chị Bảo Yến',
        position: 'UnviSport',
        company: 'Website: unvisport.com',
        project: 'Đồng Phục PT Gym',
        review:
          'Đồng phục PT Gym mà tôi đặt tại unvisport.com thực sự rất chất lượng, thiết kế đẹp và chuyên nghiệp, đúng với mong đợi của tôi. Giao diện website unvisport.com rất bắt mắt, dễ sử dụng, giúp tôi nhanh chóng tìm được mẫu đồng phục phù hợp cho đội nhóm của mình. Đội ngũ hỗ trợ tư vấn rất nhiệt tình, giao hàng đúng hẹn, và tôi rất hài lòng với trải nghiệm mua sắm tại đây. Tôi chắc chắn sẽ tiếp tục hợp tác trong các dự án sắp tới!',
        rating: 5,
      },
  ];

  // State để theo dõi testimonial hiện tại
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm điều hướng
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Những đánh giá chân thành từ khách hàng đã tin tưởng và hợp tác cùng chúng tôi
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="flex justify-center">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-6xl">
            {/* Left: Image and Info */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <div className="relative w-72 h-96 mb-6">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentTestimonial.name}
                </h3>
                <p className="text-pink-600 font-semibold mb-1">
                  {currentTestimonial.position}
                </p>
                <p className="text-gray-500 text-sm italic">
                  {currentTestimonial.company}
                </p>
              </div>
            </div>

            {/* Right: Testimonial Text */}
            <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full lg:w-[600px] border border-gray-100">
              {/* Decorative quote icon */}
              <div className="absolute -top-6 left-10">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
              </div>

              {/* Project title */}
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentTestimonial.project}
                </h4>
                <div className="w-16 h-1 bg-pink-500 rounded-full"></div>
              </div>

              {/* Review text */}
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 italic">
              &quot;{currentTestimonial.review}&quot;
              </blockquote>

              {/* Star Rating */}
              <div className="flex items-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-5 h-5 ${
                        index < currentTestimonial.rating
                          ? 'text-yellow-400 drop-shadow-sm'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-gray-500">
                  {currentTestimonial.rating}/5 sao
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute bottom-6 right-6 flex space-x-3">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-110 transition duration-200 shadow-lg"
                >
                  <FaArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-110 transition duration-200 shadow-lg"
                >
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-bl-3xl rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-500/10 rounded-tr-3xl rounded-bl-3xl "></div>
            </div>
          </div>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-pink-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}