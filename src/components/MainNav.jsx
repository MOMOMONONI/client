import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

function MainNav() {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-between items-center h-16">
          {/* โลโก้ด้านซ้าย */}
          <Link
            to={"/"}
            className="text-3xl font-extrabold tracking-wider text-amber-900 drop-shadow-md hover:text-amber-800 transition-colors duration-300"
          >
            Bannwallpaper
          </Link>

          {/* เมนูตรงกลาง: หน้าแรก ร้านค้า ตะกร้า */}
          <div className="flex gap-8 text-amber-900 font-semibold text-base">
            {[
              { path: "/", label: "หน้าแรก" },
              { path: "/shop", label: "ร้านค้า" },
              { path: "/cart", label: "ตะกร้า" },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg transition-colors duration-300
                  ${
                    isActive
                      ? "bg-amber-300 text-amber-900 shadow-inner shadow-amber-400"
                      : "hover:bg-amber-200 hover:text-amber-900"
                  }`
                }
              >
                {label === "ตะกร้า" ? (
                  <>
                    {label}
                    {carts.length > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 shadow-lg animate-pulse">
                        {carts.length}
                      </span>
                    )}
                  </>
                ) : (
                  label
                )}
              </NavLink>
            ))}
          </div>

          {/* เมนูด้านขวา: แสดงผู้ใช้หรือลิงก์เข้าสู่ระบบ */}
          {user ? (
            <div className="relative flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-amber-200 rounded-lg px-4 py-2 hover:bg-amber-300 shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <img
                  className="w-9 h-9 rounded-full border-2 border-amber-400 shadow-sm"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-professor-avatars-flat-icons-pack-people-456317.png?f=webp&w=256"
                  alt="รูปโปรไฟล์"
                />
                <ChevronDown className={`text-amber-700 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
              </button>

              {isOpen && (
                <div className="absolute right-0 top-16 bg-white rounded-lg shadow-xl w-44 ring-1 ring-amber-300 ring-opacity-50 z-50 py-2">
                  <Link
                    to={"/user/history"}
                    className="block px-5 py-3 text-amber-900 font-medium hover:bg-amber-100 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    ประวัติการสั่งซื้อ
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-5 py-3 text-amber-900 font-medium hover:bg-amber-100 transition-colors duration-200"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-5">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300
                  ${
                    isActive
                      ? "bg-amber-700 text-white shadow-amber-900"
                      : "bg-amber-600 text-white hover:bg-amber-800 shadow-amber-700"
                  }`
                }
              >
                สมัครสมาชิก
              </NavLink>

              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300
                  ${
                    isActive
                      ? "bg-amber-700 text-white shadow-amber-900"
                      : "bg-amber-600 text-white hover:bg-amber-800 shadow-amber-700"
                  }`
                }
              >
                เข้าสู่ระบบ
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
