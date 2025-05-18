import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([1000, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  // Step 1 Search Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // Step 2 Search by Category
  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  // Step 3 Search by Price
  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6 text-[#4b3b2a]">
      <h1 className="text-2xl font-bold text-[#5c3a21] mb-2">ค้นหาสินค้า</h1>

      {/* Search by Text */}
      <div>
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="ค้นหาสินค้า..."
          className="border border-[#d8c3a5] px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
        />
      </div>

      <hr className="border-[#e0d6cc]" />

      {/* Search by Category */}
      <div>
        <h2 className="text-lg font-semibold mb-2">หมวดหมู่สินค้า</h2>
        <div className="flex flex-col gap-2">
          {categories.map((item, index) => (
            <label key={index} className="inline-flex items-center gap-2 text-sm">
              <input
                onChange={handleCheck}
                value={item.id}
                type="checkbox"
                className="accent-[#a0522d]"
              />
              {item.name}
            </label>
          ))}
        </div>
      </div>

      <hr className="border-[#e0d6cc]" />

      {/* Search by Price */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ค้นหาราคา</h2>
        <div className="flex justify-between text-sm mb-2">
          <span>Min: {numberFormat(price[0])}</span>
          <span>Max: {numberFormat(price[1])}</span>
        </div>
        <Slider
          onChange={handlePrice}
          range
          min={0}
          max={100000}
          defaultValue={[1000, 30000]}
          trackStyle={[{ backgroundColor: "#a0522d" }]}
          handleStyle={[
            { borderColor: "#a0522d", backgroundColor: "#a0522d" },
            { borderColor: "#a0522d", backgroundColor: "#a0522d" }
          ]}
          railStyle={{ backgroundColor: "#eee3d6" }}
        />
      </div>
    </div>
  );
};

export default SearchCard;
