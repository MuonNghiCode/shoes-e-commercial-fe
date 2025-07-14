import { useParams } from "react-router-dom";
import type { Shoe } from "../../mocks/shoes";
import { shoes } from "../../mocks/shoes";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const shoeId = Number(id);
  const shoe = shoes.find((s) => s.id === shoeId);

  if (!shoe) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 24px 0 rgba(191,160,70,0.10)",
        padding: 32,
      }}
    >
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <img
          src={shoe.image}
          alt={shoe.name}
          style={{
            width: 320,
            height: 260,
            objectFit: "contain",
            borderRadius: 12,
            background: "#faf9f6",
            boxShadow: "0 2px 8px #e5d7b633",
          }}
        />
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#bfa046",
              marginBottom: 12,
            }}
          >
            {shoe.name}
          </h1>
          <div
            style={{
              color: "#bfa046",
              fontWeight: 700,
              fontSize: 26,
              marginBottom: 18,
            }}
          >
            {shoe.price.toLocaleString()}đ
          </div>
          <button
            style={{
              background: "#bfa046",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              border: "none",
              borderRadius: 8,
              padding: "12px 32px",
              cursor: "pointer",
              marginTop: 16,
            }}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
