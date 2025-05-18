import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ?")) {
      try {
        await deleteProduct(token, id);
        toast.success("ลบสินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (err) {
        console.error(err);
        toast.error("เกิดข้อผิดพลาดในการลบสินค้า");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-[#FAF9F6] min-h-screen rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-extrabold text-[#7B5E57] border-b-4 border-[#A47551] pb-2 mb-6">
          เพิ่มข้อมูลสินค้า
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A47551] transition"
            value={form.title}
            onChange={handleOnChange}
            placeholder="ชื่อสินค้า"
            name="title"
            required
          />
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A47551] transition"
            value={form.description}
            onChange={handleOnChange}
            placeholder="รายละเอียด"
            name="description"
            required
          />
          <input
            type="number"
            min={0}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A47551] transition"
            value={form.price}
            onChange={handleOnChange}
            placeholder="ราคา"
            name="price"
            required
          />
          <input
            type="number"
            min={0}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A47551] transition"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="จำนวน"
            name="quantity"
            required
          />
          <select
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A47551] transition"
            name="categoryId"
            onChange={handleOnChange}
            value={form.categoryId}
            required
          >
            <option value="" disabled>
              เลือกหมวดหมู่
            </option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upload file */}
        <Uploadfile form={form} setForm={setForm} />

        <button
          type="submit"
          className="bg-[#A47551] hover:bg-[#8B5E3C] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1"
        >
          เพิ่มสินค้า
        </button>

        <hr className="my-8 border-t-2 border-[#A47551]" />

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[#E9E4D4] text-[#5C4033]">
              <tr>
                <th className="py-3 px-4 text-left">No.</th>
                <th className="py-3 px-4 text-left">รูปภาพ</th>
                <th className="py-3 px-4 text-left">ชื่อสินค้า</th>
                <th className="py-3 px-4 text-left">รายละเอียด</th>
                <th className="py-3 px-4 text-left">ราคา</th>
                <th className="py-3 px-4 text-left">จำนวน</th>
                <th className="py-3 px-4 text-left">ขายได้</th>
                <th className="py-3 px-4 text-left">อัปเดต</th>
                <th className="py-3 px-4 text-left">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-[#F9F8F6]" : "bg-white"
                  } hover:bg-[#FAF4E3] transition-colors`}
                >
                  <td className="py-3 px-4 align-middle">{index + 1}</td>
                  <td className="py-3 px-4 align-middle">
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 align-middle">{item.title}</td>
                  <td className="py-3 px-4 align-middle truncate max-w-xs">
                    {item.description}
                  </td>
                  <td className="py-3 px-4 align-middle">{numberFormat(item.price)}</td>
                  <td className="py-3 px-4 align-middle">{item.quantity}</td>
                  <td className="py-3 px-4 align-middle">{item.sold}</td>
                  <td className="py-3 px-4 align-middle">{dateFormat(item.updatedAt)}</td>
                  <td className="py-3 px-4 align-middle flex gap-3">
                    <Link
                      to={`/admin/product/${item.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md shadow-md transition-transform hover:scale-110"
                      aria-label={`แก้ไขสินค้า ${item.title}`}
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition-transform hover:scale-110"
                      aria-label={`ลบสินค้า ${item.title}`}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-400">
                    ไม่มีข้อมูลสินค้า
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
