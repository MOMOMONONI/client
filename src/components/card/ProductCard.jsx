import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.04, boxShadow: "0 10px 20px rgba(101, 67, 33, 0.2)" }}
      className="w-56 bg-[#f9f5f0] rounded-2xl shadow-md overflow-hidden border border-[#d3bfa3] flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-36 w-full overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-[#e0cfc2] text-[#5d3a1a] font-semibold text-lg">
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow space-y-1">
        <h3 className="text-md font-semibold text-[#4b2e19] truncate">{item.title}</h3>
        <p className="text-sm text-[#7a5a3b] line-clamp-2">{item.description}</p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-[#d3bfa3] flex items-center justify-between">
        <span className="text-[#4b2e19] font-bold text-lg">
          {numberFormat(item.price)}
        </span>
        <button
          onClick={() => actionAddtoCart(item)}
          className="p-2 bg-[#8b5e3c] hover:bg-[#6e4428] transition-all duration-200 text-white rounded-full shadow-sm"
          aria-label="Add to cart"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;