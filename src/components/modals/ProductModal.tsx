import { useState } from "react";
import { Plus, Edit2, X, Save } from "@/lib/icons";

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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
  brands: string[];
  categories: string[];
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product = null,
  brands,
  categories,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || 0,
    name: product?.name || "",
    brand: product?.brand || "",
    price: product?.price || 0,
    category: product?.category || "",
    stock: product?.stock || 0,
    image: product?.image || "/shoes.webp",
    description: product?.description || "",
  });

  const isEdit = !!product;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.brand && formData.price > 0) {
      onSave(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <button
        className="absolute inset-0 bg-black/30 backdrop-blur-sm border-0 p-0 w-full h-full"
        onClick={onClose}
        aria-label="Close modal"
        type="button"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto m-4 p-6 rounded-xl shadow-2xl"
        style={{
          background: "var(--sneako-beige)",
          border: "2px solid var(--sneako-gold)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {isEdit ? (
              <Edit2 size={24} style={{ color: "var(--sneako-gold)" }} />
            ) : (
              <Plus size={24} style={{ color: "var(--sneako-gold)" }} />
            )}
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--sneako-dark)" }}
            >
              {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} style={{ color: "var(--sneako-dark)" }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--sneako-dark)" }}
            >
              Tên sản phẩm *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
              style={{
                borderColor: "var(--sneako-gold)",
              }}
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--sneako-dark)" }}
            >
              Thương hiệu *
            </label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
              style={{ borderColor: "var(--sneako-gold)" }}
            >
              <option value="">Chọn thương hiệu</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--sneako-dark)" }}
            >
              Danh mục *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
              style={{ borderColor: "var(--sneako-gold)" }}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--sneako-dark)" }}
              >
                Giá (VND) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                style={{ borderColor: "var(--sneako-gold)" }}
                placeholder="0"
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--sneako-dark)" }}
              >
                Tồn kho *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                style={{ borderColor: "var(--sneako-gold)" }}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--sneako-dark)" }}
            >
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
              style={{ borderColor: "var(--sneako-gold)" }}
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all hover:scale-105"
              style={{
                background: "var(--sneako-gold)",
                color: "var(--sneako-dark)",
              }}
            >
              <Save size={18} />
              {isEdit ? "Cập nhật" : "Thêm sản phẩm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border rounded-lg font-medium transition-all hover:bg-gray-50"
              style={{
                borderColor: "var(--sneako-gold)",
                color: "var(--sneako-dark)",
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
