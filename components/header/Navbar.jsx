import React, { useState, useEffect, useRef } from "react";
import logo from "../../public/logotruongnqvn.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ContactForm from "../profiles/ContactForm";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const { data: session } = useSession();

  const dropdownRef = useRef(null);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleContactPopup = () => {
    setContactPopupOpen(!contactPopupOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full p-5 h-20 z-50 transition-all duration-500 ${
        isSticky ? "shadow-lg bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width="150"
            height="45"
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-gray-700 uppercase hover:text-green-600 font-heading font-semibold"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/gioi-thieu"
                className="text-gray-700 uppercase hover:text-green-600 font-heading font-semibold"
              >
                Về TrườngNQ
              </Link>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <p className="text-gray-700 cursor-pointer uppercase hover:text-green-600 font-heading font-semibold">
                Dịch vụ
              </p>
              {aboutDropdownOpen && (
                <ul className="absolute top-6 left-0 bg-white rounded-md shadow-md z-50 w-60 max-w-60 border-t-4 border-green-600">
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="/thiet-ke-web">Thiết kế website</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="/">Website Wordpress</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="/dich-vu-seo">Dịch vụ SEO</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="/ladipage">Ladipage</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                href="/bai-viet"
                className="text-gray-700 uppercase hover:text-green-600 font-heading font-semibold"
              >
                Bài viết & Chia sẻ
              </Link>
            </li>
            <li>
              <Link
                href="/album"
                className="text-gray-700 uppercase hover:text-green-600 font-heading font-semibold"
              >
                Album Ảnh
              </Link>
            </li>
            <li>
              <Link
                href="/lien-he"
                className="text-gray-700 uppercase hover:text-green-600 font-heading font-semibold"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="https://instagram.com/truongtl27.ht" target="_blank">
            <div className="bg-white p-3 rounded-full shadow hover:bg-pink-500 hover:text-white cursor-pointer">
              <FaInstagram />
            </div>
          </Link>
          <Link href="https://www.linkedin.com/in/truongnq-vn" target="_blank">
            <div className="bg-white p-3 rounded-full shadow hover:bg-pink-500 hover:text-white cursor-pointer">
              <FaLinkedinIn />
            </div>
          </Link>
          <Link href="https://x.com/your_profile" target="_blank">
            <div className="bg-white p-3 rounded-full shadow hover:bg-pink-500 hover:text-white cursor-pointer">
              <FaTwitter />
            </div>
          </Link>
          <Link href="https://facebook.com/www.truongnq.vn" target="_blank">
            <div className="bg-white p-3 rounded-full shadow hover:bg-pink-500 hover:text-white cursor-pointer">
              <FaFacebookF />
            </div>
          </Link>
          <button
            onClick={toggleContactPopup}
            className="bg-green-600 animate-blink py-3 font-heading text-white px-4 rounded font-semibold uppercase"
          >
            Đăng ký tư vấn
          </button>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden cursor-pointer pl-24" onClick={toggleMenu}>
          <AiOutlineMenu size={25} />
        </div>
      </div>

      {/* Mobile Menu */}
      <ResponsiveNavbar isOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-start justify-center"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-[800px] bg-white h-[50px] flex items-center px-4 mt-20 rounded-full shadow-lg animate-fall"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, danh mục, bài viết..."
              className="w-full border-none outline-none text-gray-700"
            />
          </div>
        </div>
      )}

      {/* Contact Popup */}
      {contactPopupOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={toggleContactPopup}
        >
          <div
            className="bg-white rounded-2xl shadow-lg max-w-5xl w-full mx-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-pink-500 uppercase text-center w-full">
                Đăng ký nhận tư vấn website miễn phí
              </h2>
              <AiOutlineClose
                className="cursor-pointer"
                size={25}
                onClick={toggleContactPopup}
              />
            </div>
            <div className="p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;