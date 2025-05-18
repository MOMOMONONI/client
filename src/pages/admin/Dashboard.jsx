import React, { useEffect, useState } from "react";
import { getOrdersAdmin } from "../../api/admin";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";
import useEcomStore from "../../store/ecom-store";

const COLORS = ["#FFBB28", "#FF8042", "#00C49F", "#8884d8", "#82ca9d"];

const Dashboard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = () => {
    getOrdersAdmin(token)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const filteredOrders = orders.filter((order) => {
    if (!startDate || !endDate) return true;
    const orderDate = new Date(order.createdAt);
    return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
  });

  const totalSales = filteredOrders.reduce((sum, order) => sum + order.cartTotal, 0);

  const productCount = {};
  filteredOrders.forEach((order) => {
    order.products.forEach((p) => {
      const title = p.product.title;
      if (!productCount[title]) {
        productCount[title] = 0;
      }
      productCount[title] += p.count;
    });
  });

  const topProducts = Object.entries(productCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-amber-700 mb-4">แดชบอร์ดคำสั่งซื้อ</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4 border border-amber-200">
          <p className="text-sm text-gray-600">เลือกวันที่เริ่มต้น</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div className="bg-white shadow rounded p-4 border border-amber-200">
          <p className="text-sm text-gray-600">เลือกวันที่สิ้นสุด</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div className="bg-white shadow rounded p-4 border border-amber-200">
          <p className="text-sm text-gray-600">ยอดขายทั้งหมด</p>
          <p className="text-xl font-bold text-green-700 mt-1">{numberFormat(totalSales)} บาท</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">สินค้าขายดี</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FFA726" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">สัดส่วนสินค้าขาย</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
