import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, [token]);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        const sortedOrders = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then(() => {
        toast.success("อัปเดตสถานะสำเร็จ!");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
        toast.error("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-amber-200 text-amber-800";
      case "Processing":
        return "bg-amber-300 text-amber-900";
      case "Completed":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusToThai = {
    "Not Process": "ยังไม่ดำเนินการ",
    "Processing": "กำลังดำเนินการ",
    "Completed": "สำเร็จแล้ว",
    "Cancelled": "ยกเลิกแล้ว",
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-md shadow-lg max-w-7xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-amber-100 border-b border-amber-300">
              <th className="px-4 py-2 text-amber-900 text-left">ลำดับ</th>
              <th className="px-4 py-2 text-amber-900 text-left">ผู้ใช้งาน</th>
              <th className="px-4 py-2 text-amber-900 text-left">วันที่</th>
              <th className="px-4 py-2 text-amber-900 text-left">สินค้า</th>
              <th className="px-4 py-2 text-amber-900 text-right">รวม</th>
              <th className="px-4 py-2 text-amber-900 text-center">สถานะ</th>
              <th className="px-4 py-2 text-amber-900 text-center">เปลี่ยนสถานะ</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-amber-700">
                  ไม่มีรายการสั่งซื้อ
                </td>
              </tr>
            ) : (
              orders.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-amber-200 hover:bg-amber-50"
                >
                  <td className="px-4 py-3 text-amber-900 text-center">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-amber-800">
                    <p>{item.orderedBy.email}</p>
                    <p className="text-sm text-amber-600">{item.orderedBy.address}</p>
                  </td>

                  <td className="px-4 py-3 text-amber-800">
                    {dateFormat(item.createdAt)}
                  </td>

                  <td className="px-4 py-3 text-amber-800">
                    <ul className="list-disc pl-5">
                      {item.products?.map((product, i) => (
                        <li key={i} className="mb-1">
                          {product.product.title}{" "}
                          <span className="text-sm text-amber-600">
                            {product.count} x {numberFormat(product.product.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-4 py-3 text-amber-900 text-right font-semibold">
                    {numberFormat(item.cartTotal)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold ${getStatusColor(
                        item.orderStatus
                      )}`}
                    >
                      {statusToThai[item.orderStatus] || item.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <select
                      className="border border-amber-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option value="Not Process">ยังไม่ดำเนินการ</option>
                      <option value="Processing">กำลังดำเนินการ</option>
                      <option value="Completed">สำเร็จแล้ว</option>
                      <option value="Cancelled">ยกเลิกแล้ว</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
