import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";
import { FaClock, FaCheck, FaTimes, FaShippingFast } from "react-icons/fa";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        const sorted = res.data.orders.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setOrders(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusTag = (status) => {
    const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm";
    switch (status) {
      case "Not Process":
        return (
          <span className={`${base} bg-gray-200 text-gray-700`}>
            <FaClock className="mr-1" /> ยังไม่ดำเนินการ
          </span>
        );
      case "Processing":
        return (
          <span className={`${base} bg-blue-200 text-blue-800`}>
            <FaShippingFast className="mr-1" /> กำลังดำเนินการ
          </span>
        );
      case "Completed":
        return (
          <span className={`${base} bg-green-200 text-green-800`}>
            <FaCheck className="mr-1" /> เสร็จสิ้น
          </span>
        );
      case "Cancelled":
        return (
          <span className={`${base} bg-red-200 text-red-800`}>
            <FaTimes className="mr-1" /> ยกเลิกแล้ว
          </span>
        );
      default:
        return null;
    }
  };

  const filteredOrders = searchDate
    ? orders.filter((order) =>
        dateFormat(order.updatedAt).startsWith(searchDate)
      )
    : orders;

  return (
    <div className="space-y-6 px-4 md:px-8 py-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">ประวัติการสั่งซื้อ</h1>

      {/* Date Filter */}
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="searchDate" className="text-gray-700 font-medium">
          ค้นหาตามวันที่:
        </label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        />
        <button
          onClick={() => setSearchDate("")}
          className="text-blue-600 hover:underline text-sm"
        >
          ล้างการค้นหา
        </button>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">วันที่สั่งซื้อ</p>
                <p className="text-lg font-semibold text-gray-800">
                  {dateFormat(item.updatedAt)}
                </p>
              </div>
              <div>{getStatusTag(item.orderStatus)}</div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="py-2 px-4 text-left border-b">สินค้า</th>
                    <th className="py-2 px-4 text-left border-b">ราคา</th>
                    <th className="py-2 px-4 text-left border-b">จำนวน</th>
                    <th className="py-2 px-4 text-left border-b">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {item.products.map((product, i) => (
                    <tr key={i} className="text-gray-800 text-sm hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        {product.product.title}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {numberFormat(product.product.price)}
                      </td>
                      <td className="py-2 px-4 border-b">{product.count}</td>
                      <td className="py-2 px-4 border-b">
                        {numberFormat(product.count * product.product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="mt-4 text-right">
              <p className="text-gray-600 text-sm">ราคาสุทธิ</p>
              <p className="text-lg font-bold text-blue-600">
                {numberFormat(item.cartTotal)}
              </p>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            ไม่พบคำสั่งซื้อตามวันที่ที่ค้นหา
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
