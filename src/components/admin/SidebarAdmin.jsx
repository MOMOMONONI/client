import React from "react";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className="bg-[#3B2F2F] w-64 text-[#D4AF37] flex flex-col h-screen shadow-lg border-r border-yellow-700">
      <div className="h-24 bg-[#2F241F] flex items-center justify-center text-3xl font-extrabold tracking-widest drop-shadow-lg select-none">
        ADMIN PANEL
      </div>

      <nav className="flex-1 px-6 py-8 space-y-4">
        {[
          { to: "/admin", label: "แดชบอร์ด" },
          { to: "manage", label: "จัดการข้อมูล" },
          { to: "category", label: "หมวดหมู่" },
          { to: "product", label: "สินค้า" },
          { to: "orders", label: "คำสั่งซื้อ" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `block rounded-md px-5 py-3 font-semibold tracking-wide transition 
              ${
                isActive
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-[#3B2F2F] shadow-lg"
                  : "hover:bg-yellow-600 hover:text-white hover:shadow-lg"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 pb-8 border-t border-yellow-700">
        <NavLink
          to={"/"}
          className="block rounded-md px-5 py-3 font-semibold tracking-wide text-yellow-400
          hover:bg-red-700 hover:text-white hover:shadow-lg transition"
        >
           ออกจากระบบ
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
