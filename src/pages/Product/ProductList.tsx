const shoes = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 3200000,
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/6b1e2e2d-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-270-shoe-KkLcGR.png",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    price: 3500000,
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e_9366/Ultraboost_21_Shoes_White_FY0377_01_standard.jpg",
  },
  {
    id: 3,
    name: "Converse Chuck Taylor",
    price: 1500000,
    image:
      "https://www.converse.com/on/demandware.static/-/Sites-converse-master-catalog/default/dw2e2e2e2e/images/a_107/162050C_A_107X1.jpg",
  },
];
export default function ProductList() {
  return (
    <div>
      <h1>Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {shoes.map((shoe) => (
          <div
            key={shoe.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <img
              src={shoe.image}
              alt={shoe.name}
              className="w-40 h-40 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 text-center">
              {shoe.name}
            </h2>
            <div className="text-blue-600 font-bold mb-2">
              {shoe.price.toLocaleString()} đ
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
