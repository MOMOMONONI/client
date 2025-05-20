import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";

const registerSchema = z
  .object({
    email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
    password: z.string().min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
    confirmPassword: z.string(),
    phone: z.string().min(9, { message: "เบอร์โทรไม่ถูกต้อง" }),
    address: z.string().min(5, { message: "กรุณากรอกที่อยู่" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    const password = watch().password || "";
    return zxcvbn(password).score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5001/api/register", data);
      toast.success("สมัครสมาชิกสำเร็จ");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg || "เกิดข้อผิดพลาดในการสมัคร");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-brown-200">
        <h2 className="text-3xl text-center font-extrabold text-brown-700 mb-6">สมัครสมาชิก</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("email")}
              placeholder="อีเมล"
              className={`w-full px-4 py-3 rounded-lg border border-brown-300 text-brown-700
                focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent
                transition duration-300 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="รหัสผ่าน"
              className={`w-full px-4 py-3 rounded-lg border border-brown-300 text-brown-700
                focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent
                transition duration-300 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            {watch().password?.length > 0 && (
              <div className="flex mt-2">
                {Array.from(Array(5).keys()).map((_, index) => (
                  <span className="w-1/5 px-1" key={index}>
                    <div
                      className={`h-2 rounded ${
                        passwordScore <= 2
                          ? "bg-red-500"
                          : passwordScore < 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              className={`w-full px-4 py-3 rounded-lg border border-brown-300 text-brown-700
                focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent
                transition duration-300 ${errors.confirmPassword ? "border-red-500" : ""}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* ฟิลด์ใหม่: phone */}
          <div>
            <input
              {...register("phone")}
              placeholder="เบอร์โทร"
              className={`w-full px-4 py-3 rounded-lg border border-brown-300 text-brown-700
                focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent
                transition duration-300 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* ฟิลด์ใหม่: address */}
          <div>
            <input
              {...register("address")}
              placeholder="ที่อยู่"
              className={`w-full px-4 py-3 rounded-lg border border-brown-300 text-brown-700
                focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent
                transition duration-300 ${errors.address ? "border-red-500" : ""}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brown-600 hover:bg-brown-700 border-red-500 font-semibold rounded-lg 
            transition duration-300 shadow-md hover:shadow-xl"
          >
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
