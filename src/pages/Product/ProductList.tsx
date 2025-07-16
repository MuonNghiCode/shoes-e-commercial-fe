import React, { useState } from "react";
import { shoes as shoesData } from "@/mocks/shoes";
import ShoeCard from "@/components/products/ShoeCard";
import { Particles } from "@/components";

const uniqueBrands = Array.from(new Set(shoesData.map((s) => s.brand)));
const uniqueCategories = Array.from(new Set(shoesData.map((s) => s.category)));
const uniqueSizes = Array.from(new Set(shoesData.flatMap((s) => s.sizes)));

const ProductList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const minPriceAll = Math.min(...shoesData.map((s) => s.price));
  const maxPriceAll = Math.max(...shoesData.map((s) => s.price));
  const [minPrice, setMinPrice] = useState(minPriceAll);
  const [maxPrice, setMaxPrice] = useState(maxPriceAll);
  const [sizes, setSizes] = useState<(string | number)[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filteredShoes = shoesData.filter((shoe) => {
    const matchesSearch = shoe.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesBrand = brands.length === 0 || brands.includes(shoe.brand);
    const matchesCategory =
      categories.length === 0 || categories.includes(shoe.category);
    const matchesSize =
      sizes.length === 0 || shoe.sizes.some((sz) => sizes.includes(sz));
    const matchesMin = shoe.price >= minPrice;
    const matchesMax = shoe.price <= maxPrice;
    return (
      matchesSearch &&
      matchesBrand &&
      matchesCategory &&
      matchesSize &&
      matchesMin &&
      matchesMax
    );
  });

  const totalPages = Math.ceil(filteredShoes.length / pageSize);
  const pagedShoes = filteredShoes.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <section className="min-h-screen w-full px-2 md:px-6 py-10 flex justify-center items-start bg-gradient-to-br from-[color:var(--sneako-beige,#f5f5dc)] via-white to-[color:var(--sneako-gold,#e6c066)] relative overflow-hidden">
      {/* Glassmorphism background overlay */}
      <Particles />
      <div className="relative w-full max-w-6xl flex gap-8 z-10">
        {/* Sidebar filter */}
        <aside className="w-full max-w-xs glass-card border-2 border-[color:var(--sneako-gold,#e6c066)]/70 shadow-2xl rounded-2xl p-6 h-[calc(100vh-20px)] min-h-[850px] pb-10 sticky top-8 self-start flex flex-col backdrop-blur-[18px] bg-white/20">
          <h2 className="text-xl font-bold text-[color:var(--sneako-brown,#3d2c18)] mb-4 tracking-wide drop-shadow-lg">
            Bộ lọc sản phẩm
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm tên giày..."
              className="px-4 py-2 rounded-lg border-2 border-[color:var(--sneako-gold,#e6c066)]/70 bg-white/20 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--sneako-gold,#e6c066)]/40 shadow-sm backdrop-blur-[8px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <div className="font-semibold text-[color:var(--sneako-brown,#3d2c18)] mb-1">
                Hãng
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {uniqueBrands.map((b) => (
                  <label
                    key={b}
                    className="text-sm bg-white/30 px-2 py-1 rounded-lg border border-[color:var(--sneako-gold,#e6c066)]/40 cursor-pointer select-none font-medium transition-colors duration-150"
                    style={{
                      color: brands.includes(b)
                        ? "var(--sneako-gold,#e6c066)"
                        : "inherit",
                      background: brands.includes(b)
                        ? "rgba(230,192,102,0.15)"
                        : undefined,
                      borderColor: brands.includes(b)
                        ? "var(--sneako-gold,#e6c066)"
                        : undefined,
                    }}
                    onClick={() =>
                      setBrands((prev) =>
                        prev.includes(b)
                          ? prev.filter((x) => x !== b)
                          : [...prev, b]
                      )
                    }
                  >
                    {b}
                  </label>
                ))}
              </div>
              <div className="font-semibold text-[color:var(--sneako-brown,#3d2c18)] mb-1 mt-2">
                Loại
              </div>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((c) => (
                  <label
                    key={c}
                    className="text-sm bg-white/30 px-2 py-1 rounded-lg border border-[color:var(--sneako-gold,#e6c066)]/40 cursor-pointer select-none font-medium transition-colors duration-150"
                    style={{
                      color: categories.includes(c)
                        ? "var(--sneako-gold,#e6c066)"
                        : "inherit",
                      background: categories.includes(c)
                        ? "rgba(230,192,102,0.15)"
                        : undefined,
                      borderColor: categories.includes(c)
                        ? "var(--sneako-gold,#e6c066)"
                        : undefined,
                    }}
                    onClick={() =>
                      setCategories((prev) =>
                        prev.includes(c)
                          ? prev.filter((x) => x !== c)
                          : [...prev, c]
                      )
                    }
                  >
                    {c}
                  </label>
                ))}
              </div>
              <div className="font-semibold text-[color:var(--sneako-brown,#3d2c18)] mb-1 mt-2">
                Size
              </div>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map((sz) => (
                  <label
                    key={sz}
                    className="text-sm bg-white/30 px-2 py-1 rounded-lg border border-[color:var(--sneako-gold,#e6c066)]/40 cursor-pointer select-none font-medium transition-colors duration-150"
                    style={{
                      color: sizes.includes(sz)
                        ? "var(--sneako-gold,#e6c066)"
                        : "inherit",
                      background: sizes.includes(sz)
                        ? "rgba(230,192,102,0.15)"
                        : undefined,
                      borderColor: sizes.includes(sz)
                        ? "var(--sneako-gold,#e6c066)"
                        : undefined,
                    }}
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes(sz)
                          ? prev.filter((x) => x !== sz)
                          : [...prev, sz]
                      )
                    }
                  >
                    {sz}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-full">
              <div className="flex gap-2 w-full max-w-full">
                <input
                  type="number"
                  placeholder="Giá từ"
                  className="w-1/2 max-w-[110px] px-3 py-2 rounded-lg border-2 border-[color:var(--sneako-gold,#e6c066)]/70 bg-white/20 focus:outline-none focus:ring-2 focus:ring-[color:var(--sneako-gold,#e6c066)]/40 shadow-sm backdrop-blur-[8px]"
                  value={minPrice}
                  min={minPriceAll}
                  max={maxPrice}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), minPriceAll);
                    setMinPrice(val > maxPrice ? maxPrice : val);
                  }}
                />
                <input
                  type="number"
                  placeholder="Đến"
                  className="w-1/2 max-w-[110px] px-3 py-2 rounded-lg border-2 border-[color:var(--sneako-gold,#e6c066)]/70 bg-white/20 focus:outline-none focus:ring-2 focus:ring-[color:var(--sneako-gold,#e6c066)]/40 shadow-sm backdrop-blur-[8px]"
                  value={maxPrice}
                  min={minPrice}
                  max={maxPriceAll}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), maxPriceAll);
                    setMaxPrice(val < minPrice ? minPrice : val);
                  }}
                />
              </div>
              {/* Double range slider for price */}
              <div className="flex flex-col gap-1 mt-2 w-full max-w-full">
                <div className="flex justify-between text-xs text-gray-500 mb-1 w-full max-w-full">
                  <span>{minPriceAll}₫</span>
                  <span>{maxPriceAll}₫</span>
                </div>
                <div
                  className="relative w-full max-w-full flex items-center"
                  style={{ height: 40, padding: "0 2px" }}
                >
                  <input
                    type="range"
                    min={minPriceAll}
                    max={maxPrice - 1}
                    value={minPrice}
                    onChange={(e) => {
                      const val = Math.min(
                        Number(e.target.value),
                        maxPrice - 1
                      );
                      setMinPrice(val);
                    }}
                    className="absolute w-full h-3 accent-[color:var(--sneako-gold,#e6c066)] bg-transparent pointer-events-auto z-20"
                    style={{
                      zIndex: 2,
                      WebkitAppearance: "none",
                      appearance: "none",
                    }}
                  />
                  <input
                    type="range"
                    min={minPrice + 1}
                    max={maxPriceAll}
                    value={maxPrice}
                    onChange={(e) => {
                      const val = Math.max(
                        Number(e.target.value),
                        minPrice + 1
                      );
                      setMaxPrice(val);
                    }}
                    className="absolute w-full h-3 accent-[color:var(--sneako-gold,#e6c066)] bg-transparent pointer-events-auto z-10"
                    style={{
                      zIndex: 1,
                      WebkitAppearance: "none",
                      appearance: "none",
                    }}
                  />
                  {/* Track background */}
                  <div
                    className="absolute w-full h-2 rounded-lg bg-white/40"
                    style={{ zIndex: 0, left: 0, right: 0 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-700 mt-1 w-full max-w-full">
                  <span>
                    Giá từ: <b>{minPrice}₫</b>
                  </span>
                  <span>
                    Đến: <b>{maxPrice}₫</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {/* Product grid */}
        <main className="flex-1">
          <h1 className="text-4xl font-extrabold text-[color:var(--sneako-gold,#e6c066)] mb-8 tracking-tight drop-shadow-lg">
            Tất cả sản phẩm
          </h1>
          {filteredShoes.length === 0 ? (
            <div className="text-lg text-gray-500 py-20 text-center">
              Không tìm thấy sản phẩm phù hợp.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 p-2 md:p-6 rounded-2xl bg-white/10 shadow-2xl backdrop-blur-[12px] border-2 border-[color:var(--sneako-gold,#e6c066)]/60">
                {pagedShoes.map((shoe) => (
                  <div
                    key={shoe.id}
                    className="cursor-pointer flex items-center justify-center "
                    tabIndex={0}
                    style={{ minHeight: 0 }}
                  >
                    <ShoeCard shoe={shoe} />
                  </div>
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 select-none">
                  <button
                    className="px-3 py-1 rounded-lg border-2 border-[color:var(--sneako-gold,#e6c066)] bg-white/60 text-[color:var(--sneako-gold,#e6c066)] font-bold disabled:opacity-40 transition"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        className={`px-3 py-1 rounded-lg border-2 font-bold transition-all duration-150 mx-1 ${
                          page === p
                            ? "bg-[color:var(--sneako-gold,#e6c066)] text-white border-[color:var(--sneako-gold,#e6c066)] scale-110 shadow-lg"
                            : "bg-white/60 text-[color:var(--sneako-gold,#e6c066)] border-[color:var(--sneako-gold,#e6c066)]/40 hover:bg-yellow-100"
                        }`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    className="px-3 py-1 rounded-lg border-2 border-[color:var(--sneako-gold,#e6c066)] bg-white/60 text-[color:var(--sneako-gold,#e6c066)] font-bold disabled:opacity-40 transition"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default ProductList;
