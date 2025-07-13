import React from "react";

type Shoe = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type ViewProductProps = {
  shoe: Shoe;
  onClose: () => void;
};

const ViewProduct: React.FC<ViewProductProps> = ({ shoe, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
          position: "relative",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            fontSize: 18,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={shoe.image}
          alt={shoe.name}
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
            marginBottom: 16,
          }}
        />
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>{shoe.name}</h2>
        <p style={{ color: "#2563eb", fontWeight: 700, fontSize: 18 }}>
          {shoe.price.toLocaleString()} đ
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;
