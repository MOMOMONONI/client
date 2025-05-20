import React, { useState, useEffect } from "react";
import { listUserCart } from "../../api/user";
import { currentUser } from "../../api/auth";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [user, setUser] = useState({ name: "", address: "", phone: "" });

  const [addressOption, setAddressOption] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUserCart(token);
      fetchUserProfile(token);
    }
  }, [token]);

  const fetchUserCart = async (token) => {
    try {
      const res = await listUserCart(token);
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const res = await currentUser(token);
      const data = res.data;
      setUser(data);

      // ตั้งค่า default ที่อยู่ (ถ้ามี)
      if (data?.address) {
        setAddressOption(data.address);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleSaveAddress = () => {
    const addressToSave = addressOption === "อื่นๆ" ? customAddress : addressOption;

    if (!addressToSave) {
      return toast.warning("กรุณาเลือกหรือกรอกที่อยู่");
    }

    setAddressSaved(true);
    toast.success("บันทึกที่อยู่เรียบร้อยแล้ว");
  };

  const handleProceedToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณาบันทึกที่อยู่ก่อน");
    }
    navigate("/user/payment");
  };

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Address Section */}
        <div className="w-full md:w-2/5 bg-white border shadow-lg p-5 rounded-xl space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">ที่อยู่ในการจัดส่ง</h1>

          <select
            value={addressOption}
            onChange={(e) => setAddressOption(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="">
              {user?.address
                ? `${user.name} | ${user.address} | โทร: ${user.phone}`
                : "-- กรุณาเลือกที่อยู่ --"}
            </option>
            <option value="อื่นๆ">อื่นๆ (กรอกเอง)</option>
          </select>

          {addressOption === "อื่นๆ" && (
            <textarea
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="w-full p-3 border rounded-md"
              placeholder="กรอกที่อยู่ของคุณ"
              rows={4}
            />
          )}

          <button
            onClick={handleSaveAddress}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            บันทึกที่อยู่
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:w-2/5 bg-white border shadow-lg p-5 rounded-xl space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">คำสั่งซื้อของคุณ</h1>

          {products.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <div>
                <p>{item.product?.title}</p>
                <p className="text-sm text-gray-600">
                  จำนวน: {item.count} x {numberFormat(item.product?.price)}
                </p>
              </div>
              <p className="text-red-500 font-bold">
                {numberFormat(item.count * item.product?.price)}
              </p>
            </div>
          ))}

          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>ยอดรวมสุทธิ:</span>
            <span className="text-red-500">{numberFormat(cartTotal)}</span>
          </div>

          <button
            onClick={handleProceedToPayment}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            ดำเนินการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
