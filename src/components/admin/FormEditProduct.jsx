import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  readProduct,
  updateProduct,
} from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "Core i7",
  description: "desc",
  price: 200,
  quantity: 20,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id);
  }, []);

  const fetchProduct = async (token, id) => {
    try {
      const res = await readProduct(token, id);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data", err);
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`แก้ไขข้อมูลสินค้า ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูลสินค้า");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-yellow-700 border-b-4 border-yellow-500 pb-2">
        แก้ไขข้อมูลสินค้า
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="title">
            ชื่อสินค้า
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleOnChange}
            placeholder="ชื่อสินค้า"
            className="w-full border border-yellow-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="description">
            รายละเอียดสินค้า
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleOnChange}
            placeholder="รายละเอียดสินค้า"
            className="w-full border border-yellow-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="price">
              ราคาสินค้า (บาท)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleOnChange}
              placeholder="ราคา"
              className="w-full border border-yellow-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="quantity">
              จำนวนสินค้า
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleOnChange}
              placeholder="จำนวน"
              className="w-full border border-yellow-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="categoryId">
            หมวดหมู่สินค้า
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleOnChange}
            className="w-full border border-yellow-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            required
          >
            <option value="" disabled>
              -- กรุณาเลือกหมวดหมู่ --
            </option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="border-yellow-300" />

        <Uploadfile form={form} setForm={setForm} />

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 transition text-white font-bold py-3 rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          แก้ไขสินค้า
        </button>
      </form>
    </div>
  );
};

export default FormEditProduct;
