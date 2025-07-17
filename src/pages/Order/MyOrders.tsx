const orders = [
  {
    id: 1,
    product: "Nike Air Max 270",
    date: "2025-07-01",
    price: 3200000,
    status: "Hoàn thành",
  },
  {
    id: 2,
    product: "Adidas Ultraboost 21",
    date: "2025-06-20",
    price: 3500000,
    status: "Chờ xử lý",
  },
  {
    id: 3,
    product: "Converse Chuck Taylor",
    date: "2025-06-10",
    price: 1500000,
    status: "Đang giao",
  },
];

const statusColor: Record<string, string> = {
  "Hoàn thành": "bg-green-100 text-green-700",
  "Chờ xử lý": "bg-yellow-100 text-yellow-700",
  "Đang giao": "bg-blue-100 text-blue-700",
};

const MyOrders = () => {
  return (
    <div className="min-h-screen bg-[#F5E6C5] py-8 px-2 md:px-8">
      <div className="max-w-4xl mx-auto bg-[#FFF8ED] rounded-2xl shadow p-8 border border-[#E6D4B6]">
        <h1 className="text-2xl font-bold text-[#2D1A10] mb-6">
          Đơn hàng của tôi
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-[#2D1A10]">
            <thead>
              <tr className="bg-[#E6D4B6] text-[#2D1A10]">
                <th className="py-3 px-4 text-left font-semibold">Mã đơn</th>
                <th className="py-3 px-4 text-left font-semibold">Sản phẩm</th>
                <th className="py-3 px-4 text-left font-semibold">Ngày đặt</th>
                <th className="py-3 px-4 text-left font-semibold">Giá</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[#E6D4B6] last:border-0"
                >
                  <td className="py-3 px-4 font-medium">#{order.id}</td>
                  <td className="py-3 px-4">{order.product}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    {order.price.toLocaleString()} đ
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColor[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
