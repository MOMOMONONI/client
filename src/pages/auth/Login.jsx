// rafce
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("ยินดีต้อนรับกลับมา!");
    } catch (err) {
      const errMsg = err.response?.data?.message || "เกิดข้อผิดพลาด";
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-brown-200">
        <h1 className="text-3xl text-center font-extrabold text-brown-700 mb-6">
          เข้าสู่ระบบ
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <input
              placeholder="อีเมล"
              className="w-full px-4 py-3 rounded-lg border border-brown-300 text-brown-700
                focus:outline-none focus:ring-2 focus:ring-brown-400
                focus:border-transparent transition duration-300"
              onChange={handleOnChange}
              name="email"
              type="email"
              required
            />

            <input
              placeholder="รหัสผ่าน"
              className="w-full px-4 py-3 rounded-lg border border-brown-300 text-brown-700
                focus:outline-none focus:ring-2 focus:ring-brown-400
                focus:border-transparent transition duration-300"
              onChange={handleOnChange}
              name="password"
              type="password"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-brown-600 hover:bg-brown-700 border-red-500 font-semibold rounded-lg 
              transition duration-300 shadow-md hover:shadow-xl"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-brown-500 mt-6">
          ยังไม่มีบัญชี?{" "}
          <span className="text-brown-700 font-medium cursor-pointer hover:underline">
            ลงทะเบียน
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
