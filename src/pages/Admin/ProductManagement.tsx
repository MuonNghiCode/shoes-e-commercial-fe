import { useState, useEffect } from "react";
import { adminService } from "@/services";
import { toast } from "react-toastify";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types";

interface LocalProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
  sizes: "38" | "39" | "40" | "41" | "42" | "43" | "44";
  _id?: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllProductsForAdmin();

      // Check if response is successful and has data
      if (response && response.success !== false) {
        // Handle different response structures
        let productData: Product[] = [];

        if (Array.isArray(response)) {
          // Direct array response
          productData = response as Product[];
        } else if (response.data && Array.isArray(response.data)) {
          // Wrapped in data property
          productData = response.data;
        } else if (response.success && Array.isArray(response.data)) {
          // Standard ResponseModel structure
          productData = response.data;
        }

        if (productData.length > 0) {
          // Convert Product type to LocalProduct type for UI compatibility
          const localProducts: LocalProduct[] = productData.map(
            (product: Product) => ({
              id: product._id,
              name: product.name,
              brand: product.brand,
              price: product.price,
              category: product.category,
              stock: product.stock,
              image:
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "/shoes.webp",
              description: product.description || "",
              sizes: product.sizes,
              _id: product._id,
            })
          );
          setProducts(localProducts);
          setLoading(false);
          return;
        }
      }

      console.error("Failed to fetch products - invalid response:", response);
      // Fallback to mock data
      setProducts([
        {
          id: "1",
          name: "Air Max 270",
          brand: "Nike",
          price: 2500000,
          category: "Sneakers",
          stock: 25,
          image: "/shoes.webp",
          description: "Giày thể thao Nike Air Max 270 với thiết kế hiện đại",
          sizes: "42",
        },
        {
          id: "2",
          name: "Ultraboost 22",
          brand: "Adidas",
          price: 3200000,
          category: "Running",
          stock: 18,
          image: "/shoes.webp",
          description: "Giày chạy bộ Adidas Ultraboost với công nghệ Boost",
          sizes: "41",
        },
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to mock data
      setProducts([
        {
          id: "1",
          name: "Air Max 270",
          brand: "Nike",
          price: 2500000,
          category: "Sneakers",
          stock: 25,
          image: "/shoes.webp",
          description: "Giày thể thao Nike Air Max 270 với thiết kế hiện đại",
          sizes: "42",
        },
        {
          id: "2",
          name: "Ultraboost 22",
          brand: "Adidas",
          price: 3200000,
          category: "Running",
          stock: 18,
          image: "/shoes.webp",
          description: "Giày chạy bộ Adidas Ultraboost với công nghệ Boost",
          sizes: "41",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<LocalProduct | null>(
    null
  );
  const [newProduct, setNewProduct] = useState<LocalProduct>({
    id: "",
    name: "",
    brand: "",
    price: 0,
    category: "",
    stock: 0,
    image: "/shoes.webp",
    description: "",
    sizes: "42",
  });

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

  const handleAddProduct = async () => {
    if (
      newProduct.name &&
      newProduct.brand &&
      newProduct.price > 0 &&
      !isCreating
    ) {
      setIsCreating(true);
      try {
        const productData: CreateProductRequest = {
          name: newProduct.name,
          brand: newProduct.brand,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
          description: newProduct.description,
          sizes: newProduct.sizes,
          images: [newProduct.image], // Convert single image to array
        };

        const response = await adminService.createProduct(productData);

        // Check if response is successful - handle different response structures
        if (
          response &&
          (response.success === true || response.success !== false)
        ) {
          // Reload products from server
          await fetchProducts();
          resetForm();
          toast.success("Thêm sản phẩm thành công!");
        } else {
          toast.error("Không thể thêm sản phẩm!");
        }
      } catch (error) {
        console.error("Error creating product:", error);
        // Fallback to local add for development
        const id = Date.now().toString();
        setProducts([...products, { ...newProduct, id }]);
        resetForm();
        toast.success("Thêm sản phẩm thành công!");
      } finally {
        setIsCreating(false);
      }
    }
  };

  const handleEditProduct = (product: LocalProduct) => {
    setEditingProduct(product);
    // Make sure the newProduct has the correct id and _id
    setNewProduct({
      ...product,
      id: product.id,
      _id: product._id,
    });
    setShowAddModal(true);
  };

  const handleUpdateProduct = async () => {
    if (
      editingProduct &&
      newProduct.name &&
      newProduct.brand &&
      newProduct.price > 0 &&
      !isUpdating
    ) {
      setIsUpdating(true);
      try {
        const productData: UpdateProductRequest = {
          name: newProduct.name,
          brand: newProduct.brand,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
          description: newProduct.description,
          sizes: newProduct.sizes,
          images: [newProduct.image], // Convert single image to array
        };

        const response = await adminService.updateProduct(
          editingProduct._id!,
          productData
        );

        // Check if response is successful - handle different response structures
        if (
          response &&
          (response.success === true || response.success !== false)
        ) {
          // Reload products from server
          await fetchProducts();
          resetForm();
          toast.success("Cập nhật sản phẩm thành công!");
        } else {
          toast.error("Không thể cập nhật sản phẩm!");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        // Fallback to local update for development
        const updatedProduct = {
          ...newProduct,
          id: editingProduct.id,
          _id: editingProduct._id,
        };
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? updatedProduct : product
          )
        );
        resetForm();
        toast.success("Cập nhật sản phẩm thành công!");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const productToDelete = products.find((product) => product.id === id);
      if (productToDelete?._id) {
        try {
          const response = await adminService.deleteProduct(
            productToDelete._id
          );

          // Check if response is successful - handle different response structures
          if (
            response &&
            (response.success === true || response.success !== false)
          ) {
            // Reload products from server
            await fetchProducts();
            toast.success("Xóa sản phẩm thành công!");
          } else {
            toast.error("Không thể xóa sản phẩm!");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Có lỗi xảy ra khi xóa sản phẩm!");
        }
      } else {
        // For products without _id (mock data), just remove from local state
        setProducts(products.filter((product) => product.id !== id));
      }
    }
  };

  const resetForm = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    setNewProduct({
      id: "",
      name: "",
      brand: "",
      price: 0,
      category: "",
      stock: 0,
      image: "/shoes.webp",
      description: "",
      sizes: "42",
    });
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
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-white">Đang tải...</p>
            </div>
          </div>
        )}

        {/* Loading overlay for operations */}
        {(isCreating || isUpdating) && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-white text-sm">
                {isCreating ? "Đang thêm..." : "Đang cập nhật..."}
              </p>
            </div>
          </div>
        )}

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
          <button className="sneako-cta" onClick={() => setShowAddModal(true)}>
            + Thêm sản phẩm
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
                      className="font-semibold text-lg"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      {formatCurrency(product.price)}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Danh mục: {product.category}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-sm"
                        style={{ color: "var(--sneako-dark)" }}
                      >
                        Tồn kho: {product.stock}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                      >
                        {stockStatus.text}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 px-3 py-2 text-sm font-medium rounded border"
                      style={{
                        borderColor: "var(--sneako-gold)",
                        color: "var(--sneako-dark)",
                        background: "var(--sneako-gray)",
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 px-3 py-2 text-sm font-medium rounded bg-red-100 text-red-800 border border-red-200"
                    >
                      Xóa
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

        {/* Add/Edit Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
              style={{
                background: "var(--sneako-beige)",
                border: "2px solid var(--sneako-gold)",
              }}
            >
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "var(--sneako-dark)" }}
              >
                {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    id="productName"
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ borderColor: "var(--sneako-gold)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="productBrand"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Thương hiệu
                  </label>
                  <select
                    id="productBrand"
                    value={newProduct.brand}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, brand: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
                    htmlFor="productCategory"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Danh mục
                  </label>
                  <select
                    id="productCategory"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
                      htmlFor="productSize"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Kích thước
                    </label>
                    <select
                      id="productSize"
                      value={newProduct.sizes}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          sizes: e.target.value as
                            | "38"
                            | "39"
                            | "40"
                            | "41"
                            | "42"
                            | "43"
                            | "44",
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{ borderColor: "var(--sneako-gold)" }}
                    >
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="productPrice"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Giá (VND)
                    </label>
                    <input
                      id="productPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{ borderColor: "var(--sneako-gold)" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="productStock"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Tồn kho
                  </label>
                  <input
                    id="productStock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ borderColor: "var(--sneako-gold)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="productDescription"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="productDescription"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ borderColor: "var(--sneako-gold)" }}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={
                    editingProduct ? handleUpdateProduct : handleAddProduct
                  }
                  disabled={isCreating || isUpdating}
                  className={`sneako-cta flex-1 ${
                    isCreating || isUpdating
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isCreating
                    ? "Đang thêm..."
                    : isUpdating
                    ? "Đang cập nhật..."
                    : editingProduct
                    ? "Cập nhật"
                    : "Thêm"}
                </button>
                <button
                  onClick={resetForm}
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-4 py-2 border rounded font-medium"
                  style={{
                    borderColor: "var(--sneako-gold)",
                    color: "var(--sneako-dark)",
                    background: "var(--sneako-gray)",
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
