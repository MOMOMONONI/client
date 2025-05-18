import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#f5f1ea] text-[#5a3e1b]">

      {/* SearchBar */}
      <aside className="w-1/4 p-6 bg-white rounded-tr-xl rounded-br-xl shadow-lg sticky top-0 h-screen flex flex-col">
        <h2 className="text-xl font-semibold mb-6 border-b border-[#d1bfa7] pb-2">🔍 ค้นหาสินค้า</h2>
        <SearchCard />
      </aside>

      {/* Product List */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-6 border-b border-[#d1bfa7] pb-3">
          <h1 className="text-3xl font-extrabold tracking-wide">สินค้าทั้งหมด</h1>
          <p className="text-sm text-[#8c6b3f] mt-1">พบ {products.length} รายการ</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </section>
      </main>

      {/* Cart */}
      <aside className="w-1/4 p-6 bg-white rounded-tl-xl rounded-bl-xl shadow-lg sticky top-0 h-screen flex flex-col">
        <h2 className="text-xl font-semibold mb-6 border-b border-[#d1bfa7] pb-2">🛒 ตะกร้าสินค้า</h2>
        <CartCard />
      </aside>

    </div>
  )
}

export default Shop
