import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaRegUser, FaHeart, FaFacebook, FaTwitter, FaLinkedin, FaInstagram,FaChevronUp,FaAngleDown  } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import logo from "../../public/logotruongnqvn.png";

const ResponsiveMenu = ({ isOpen, toggleMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuItems = [
    { name: "Trang chủ", link: "/" },
    { name: "Về TrườngNQ", link: "/gioi-thieu" },
    { name: "Bài viết", link: "/bai-viet" },
    {
      name: "Dịch vụ",
      dropdown: [
        { name: "Thiết kế web", link: "/thiet-ke-web" },
        { name: "Website Wordpress", link: "/wordpress" },
        { name: "Dịch vụ SEO", link: "/dich-vu-seo" },
        { name: "LadiPage", link: "/ladipage" },


      ],
    },
    { name: "Album ảnh", link: "/album" },

    { name: "Liên hệ", link: "/lien-he" },
  ];

  return (
    <>
      {/* Overlay with blur effect */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-80 h-full max-h-full overflow-y-auto bg-white/95 backdrop-blur-md z-50 transform shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-500 ease-out`}
      >
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-pink-500 to-pink-600 p-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex justify-between items-center">
            <Image src={logo} alt="Logo" width={150} height={70} className="" />
            <button
              onClick={toggleMenu}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
            >
              <AiOutlineClose
                size={20}
                className="text-white group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {/* Search with enhanced styling */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Menu Items with enhanced styling */}
        <div className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index} className="group">
                {!item.dropdown ? (
                  <Link 
                    href={item.link} 
                    className="flex items-center px-4 py-3 text-gray-700 font-medium rounded-2xl hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 group-hover:translate-x-2"
                    onClick={toggleMenu}
                  >
                    <span className="text-base">{item.name}</span>
                  </Link>
                ) : (
                  <div className="space-y-1">
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 font-medium rounded-2xl hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 group-hover:translate-x-2"
                      onClick={() => toggleDropdown(index)}
                      aria-expanded={activeDropdown === index}
                    >
                      <span className="text-base">{item.name}</span>
                      <div className={`transform transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : 'rotate-0'}`}>
                        <FaAngleDown size={16} className="text-gray-400 group-hover:text-pink-500" />
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        activeDropdown === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="ml-6 space-y-1 py-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.link}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 transform hover:translate-x-2"
                              onClick={toggleMenu}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links with enhanced styling */}
        <div className="p-6 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
            Kết nối với chúng tôi
          </h3>
          <div className="flex justify-center space-x-4">
            <Link 
              href="https://facebook.com/www.truongnq.vn" 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaFacebook size={18} />
            </Link>
            <Link 
              href="https://twitter.com" 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaTwitter size={18} />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/truongnq-vn" 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaLinkedin size={18} />
            </Link>
            <Link 
              href="https://instagram.com/truongtl27.ht" 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram size={18} />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              © 2024 Trường NQ Web. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;
