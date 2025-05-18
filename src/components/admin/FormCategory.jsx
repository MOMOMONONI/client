import React, { useState, useEffect } from "react";
import { createCategory, removeCategory } from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategory(token);
  }, [getCategory, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.warning("กรุณากรอกชื่อหมวดหมู่");
    }
    setLoading(true);
    try {
      const res = await createCategory(token, { name: name.trim() });
      toast.success(`เพิ่มหมวดหมู่ "${res.data.name}" สำเร็จ!`);
      setName("");
      getCategory(token);
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่");
    }
    setLoading(false);
  };

  const handleRemove = async (id) => {
    if (!window.confirm("คุณแน่ใจจะลบหมวดหมู่นี้หรือไม่?")) return;
    try {
      const res = await removeCategory(token, id);
      toast.success(`ลบหมวดหมู่ "${res.data.name}" สำเร็จ`);
      getCategory(token);
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold text-amber-900 mb-6">
        จัดการหมวดหมู่สินค้า
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="กรอกชื่อหมวดหมู่"
          className="flex-grow border border-amber-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded-md text-white font-medium transition 
            ${loading ? "bg-amber-300 cursor-not-allowed" : "bg-amber-700 hover:bg-amber-800"}`}
        >
          {loading ? "กำลังบันทึก..." : "เพิ่มหมวดหมู่"}
        </button>
      </form>

      <hr className="mb-6 border-amber-300" />

      <ul className="divide-y divide-amber-200">
        {categories.length === 0 && (
          <li className="text-center text-amber-500 py-4">
            ยังไม่มีหมวดหมู่
          </li>
        )}
        {categories.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center py-3"
          >
            <span className="text-amber-900">{item.name}</span>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
