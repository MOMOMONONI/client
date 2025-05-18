import React from "react";

const HeaderAdmin = () => {
  return (
    <header
      className="
        bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500
        h-16 flex items-center px-6 shadow-lg border-b-4 border-yellow-800
        text-[#3B2F2F] font-extrabold text-xl
        select-none
        relative
      "
    >
      {/* ไอคอนซ้ายสุดแบบโปร่งใสเพื่อจองพื้นที่ให้ข้อความกลาง */}
      <div className="w-8 h-8 opacity-0"></div>

      {/* ข้อความตรงกลางแบบกึ่งกลางแนวนอนด้วย flex-grow + text-center */}
      <div className="flex-grow text-center drop-shadow-md tracking-widest">
        Admin Panel
      </div>

      {/* ไอคอนขวาสุด ให้มีขนาดและสีทองอมส้ม พร้อมเอฟเฟกต์ hover */}
      <div className="w-8 h-8 text-yellow-900 transition-transform duration-300 hover:scale-110 hover:text-yellow-300 cursor-default select-none">
        {/* ใช้ SVG แทน UserCircle2 เพื่อไม่ต้องพึ่งไอคอนภายนอก */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
        </svg>
      </div>
    </header>
  );
};

export default HeaderAdmin;
