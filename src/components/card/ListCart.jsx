import React from "react";
import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    try {
      const res = await createUserCart(token, { cart });
      toast.success("บันทึกตะกร้าเรียบร้อยแล้ว!", { position: "top-center" });
      navigate("/checkout");
    } catch (err) {
      toast.warning(err.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="bg-[#f6f0e7] p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ListCheck size={32} className="text-[#8B5E3C]" />
        <h2 className="text-2xl font-semibold text-[#5C3D2E]">
          ตะกร้าของคุณ ({cart.length} รายการ)
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Product List */}
        <div className="col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow flex items-center justify-between gap-4"
            >
              {/* Image */}
              <div className="flex gap-4 items-center">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-20 h-20 bg-[#ddd5cc] flex items-center justify-center rounded-lg text-[#8B5E3C] font-medium">
                    No Image
                  </div>
                )}
                {/* Details */}
                <div>
                  <p className="font-bold text-[#5C3D2E]">{item.title}</p>
                  <p className="text-sm text-[#8B5E3C]">
                    {numberFormat(item.price)} x {item.count}
                  </p>
                </div>
              </div>

              {/* Total Price */}
              <div className="text-right text-[#A0522D] font-semibold text-lg">
                {numberFormat(item.price * item.count)}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-xl p-6 shadow space-y-4">
          <h3 className="text-xl font-bold text-[#5C3D2E]">สรุปคำสั่งซื้อ</h3>
          <div className="flex justify-between text-[#4B3621] font-medium">
            <span>รวมทั้งหมด</span>
            <span className="text-xl font-bold">{numberFormat(getTotalPrice())}</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {user ? (
              <button
                onClick={handleSaveCart}
                disabled={cart.length < 1}
                className={`w-full py-2 rounded-lg text-white font-semibold transition 
                  ${cart.length < 1
                    ? "bg-[#c2a68d] cursor-not-allowed"
                    : "bg-[#A0522D] hover:bg-[#8B4513]"} 
                `}
              >
                ดำเนินการสั่งซื้อ
              </button>
            ) : (
              <Link to="/login">
                <button className="w-full py-2 rounded-lg bg-[#6B4F3A] text-white font-semibold hover:bg-[#543D2D] transition">
                  เข้าสู่ระบบ
                </button>
              </Link>
            )}

            <Link to="/shop">
              <button className="w-full py-2 rounded-lg border border-[#A0522D] text-[#A0522D] font-semibold hover:bg-[#f1e6d6] transition">
                กลับไปแก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
