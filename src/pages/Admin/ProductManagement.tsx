import { useState } from "react";
import { ProductModal } from "../../components/modals";
import { Plus, Edit2, Trash2 } from "../../lib/icons";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Air Max 270",
      brand: "Nike",
      price: 2500000,
      category: "Sneakers",
      stock: 25,
      image: "/shoes.webp",
      description: "Giày thể thao Nike Air Max 270 với thiết kế hiện đại",
    },
    {
      id: 2,
      name: "Ultraboost 22",
      brand: "Adidas",
      price: 3200000,
      category: "Running",
      stock: 18,
      image: "/shoes.webp",
      description: "Giày chạy bộ Adidas Ultraboost với công nghệ Boost",
    },
    {
      id: 3,
      name: "Chuck Taylor All Star",
      brand: "Converse",
      price: 1200000,
      category: "Casual",
      stock: 40,
      image: "/shoes.webp",
      description: "Giày canvas cổ điển Converse Chuck Taylor",
    },
    {
      id: 4,
      name: "RS-X",
      brand: "Puma",
      price: 1800000,
      category: "Sneakers",
      stock: 12,
      image: "/shoes.webp",
      description: "Giày thể thao Puma RS-X với thiết kế retro",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = ["Sneakers", "Running", "Casual", "Formal", "Sports"];
  const brands = ["Nike", "Adidas", "Converse", "Puma", "Vans", "New Balance"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleSaveProduct = (productData: Omit<Product, "id"> | Product) => {
    if ("id" in productData) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === productData.id ? productData : product
        )
      );
    } else {
      // Add new product
      const id = Math.max(...products.map((p) => p.id)) + 1;
      setProducts([...products, { ...productData, id }]);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { text: "Hết hàng", color: "bg-red-100 text-red-800" };
    if (stock < 10)
      return { text: "Sắp hết", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Còn hàng", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sneako-gray)" }}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--sneako-dark)" }}
            >
              Quản lý sản phẩm
            </h1>
            <p className="text-lg" style={{ color: "var(--sneako-dark)" }}>
              Quản lý danh mục sản phẩm giày dép
            </p>
          </div>
          <button
            className="sneako-cta flex items-center gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            Thêm sản phẩm
          </button>
        </div>

        {/* Search and Filter */}
        <div
          className="mb-6 p-6 rounded-lg shadow-sm border"
          style={{
            background: "var(--sneako-beige)",
            borderColor: "var(--sneako-gold)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc thương hiệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  borderColor: "var(--sneako-gold)",
                }}
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  borderColor: "var(--sneako-gold)",
                }}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div
                key={product.id}
                className="rounded-lg shadow-sm border overflow-hidden"
                style={{
                  background: "var(--sneako-beige)",
                  borderColor: "var(--sneako-gold)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="mb-2">
                    <h3
                      className="font-bold text-lg"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      {product.brand}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p
                      className="font-bold text-xl"
                      style={{ color: "var(--sneako-gold)" }}
                    >
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${stockStatus.color}`}
                      >
                        {stockStatus.text}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--sneako-dark)" }}
                      >
                        SL: {product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span
                      className="px-2 py-1 rounded text-xs border"
                      style={{
                        borderColor: "var(--sneako-gold)",
                        color: "var(--sneako-dark)",
                      }}
                    >
                      {product.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 text-sm font-medium rounded border hover:opacity-80 transition-opacity"
                      style={{
                        borderColor: "var(--sneako-gold)",
                        color: "var(--sneako-dark)",
                        background: "var(--sneako-gray)",
                      }}
                      title="Sửa"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-sm font-medium rounded bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div
          className="p-6 rounded-lg shadow-sm border"
          style={{
            background: "var(--sneako-beige)",
            borderColor: "var(--sneako-gold)",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "var(--sneako-dark)" }}
          >
            Thống kê sản phẩm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {products.length}
              </p>
              <p className="text-sm" style={{ color: "var(--sneako-dark)" }}>
                Tổng sản phẩm
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {products.filter((p) => p.stock > 0).length}
              </p>
              <p className="text-sm" style={{ color: "var(--sneako-dark)" }}>
                Còn hàng
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {products.filter((p) => p.stock === 0).length}
              </p>
              <p className="text-sm" style={{ color: "var(--sneako-dark)" }}>
                Hết hàng
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {products.reduce((sum, p) => sum + p.stock, 0)}
              </p>
              <p className="text-sm" style={{ color: "var(--sneako-dark)" }}>
                Tổng tồn kho
              </p>
            </div>
          </div>
        </div>

        {/* Product Modal */}
        <ProductModal
          isOpen={showAddModal}
          onClose={closeModal}
          product={editingProduct}
          onSave={handleSaveProduct}
          brands={brands}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
