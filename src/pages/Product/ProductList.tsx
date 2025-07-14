import { useNavigate } from "react-router-dom";
type Shoe = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const shoes: Shoe[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 3200000,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIWFRMWFhUbFRgVFhUYExYZFhcWGBcbExgcHSohGBolGxYWITEhJSkrMC8uFx8zODMtNygtLisBCgoKDg0NFQ8PFSsZFx0tKzctKystNy0rLS0tLS0rLTcrKystLS0rKzc3KystNy0tNy0tLSsrLTctNystNysrLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAMFBgcIAgH/xABGEAACAQIDBAcDBwgKAwEAAAABAgADEQQhMQUSQVEGBxNhcYGRIjKhI0JSkrHR8BQVM2JygsHhCERTVGNzk7LC8aLS4kP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAZEQEBAQEBAQAAAAAAAAAAAAAAEQEhMRL/2gAMAwEAAhEDEQA/AN4xEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARIf51odqKHbU+2N7U99d82AYgLe9wCDbkbyZAREQEREBERAREQEREBERAREQEREBERARPNRwoLE2ABJJ0AGZmtNv9cmFpi2GRq7He9pgadMWyB9r2mHcANNRAynpt0yobNpq1W71KlxSpr7z2tck/NUXFz35AnKab211oY6uWK1OwTglIgWFs71CN5j3i2oyHHE9t7Rq4mq9TEV2qvrcsABc+6i/NXkBkL8byv0L2CcfjKWFW+43t12HzaS23vC9wBrm6yjonq4r1qmzcK9di9Rqd95iSzKWJplicySm5mdZkk8UqYVQqgBVAAA0AGQAnuQIiICRtp4rsqNSr/Zo7cfmqTwz4STMf6wKu7szGte1sNWt4lGA+MCDiMJbZ+E/tBWwD7w1NR8RRaq/i2/U3uYducy6YF0c2ga7bMw4v8AJYGliq3K7UhRoo3iXqvb/DUzPYCIiAiIgIiICIiAiIgIiICIiAiIgJB23talhaD4is27TQXPEkkgKFHFiSABzMj9JekWHwNE18Q+6t7KALu5sTZF4mwJ5C2c0p1h9Zf5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",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    price: 3500000,
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    name: "Converse Chuck Taylor",
    price: 1500000,
    image:
      "data:image/jpeg;base64,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",
  },
];

const ProductList = () => {
  const navigate = useNavigate();

  const handleViewDetails = (shoe: Shoe) => {
    navigate(`/product/${shoe.id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: 0,
      }}
    >
      {/* Breadcrumb
      <div style={{ padding: "24px 0 0 0", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ fontSize: 18, color: "#222", marginBottom: 8 }}>
          <span style={{ color: "#888" }}>Shoes</span>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "#888" }}>Air Max</span>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ fontWeight: 700 }}>Air Max 270</span>
        </div>
        <h1
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: "#222",
            marginBottom: 0,
          }}
        >
          Air Max 270 Shoes <span style={{ color: "#bfa046" }}>(5)</span>
        </h1>
      </div> */}

      {/* Main layout: sidebar + content */}
      <div
        style={{
          display: "flex",
          maxWidth: 1400,
          margin: "32px auto 0 auto",
          gap: 32,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 240,
            minWidth: 180,
            background: "#faf9f6",
            borderRadius: 18,
            boxShadow: "0 2px 8px #e5d7b633",
            padding: 24,
            height: "fit-content",
            maxHeight: 520,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#222",
              marginBottom: 12,
              textDecoration: "underline",
              padding: "2px 0",
            }}
          >
            Air Max 270
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max Dn8
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max Dn
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max 1
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max 90
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max 95
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max 97
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max Pulse
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max Plus
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            VaporMax
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#222",
              marginBottom: 12,
            }}
          >
            Air Max Koko
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Filter & Sort bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 32,
              marginBottom: 24,
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: "#222",
                fontWeight: 600,
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Hide Filters
              <span style={{ fontSize: 20 }}>⚙️</span>
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#222",
                fontWeight: 600,
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Sort By <span style={{ fontSize: 20 }}>▼</span>
            </button>
          </div>

          {/* Product grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center"
            style={{ width: "100%", margin: 0 }}
          >
            {shoes.map((shoe) => (
              <div
                key={shoe.id}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  boxShadow:
                    "0 8px 24px 0 rgba(191,160,70,0.10), 0 1.5px 0 #bfa046",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  minHeight: 420,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  overflow: "hidden",
                }}
                className="hover:scale-105 hover:shadow-xl"
              >
                {/* Image + Badge container (clickable) */}
                <div
                  style={{
                    width: "100%",
                    background: "#fff",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 220,
                    marginBottom: 0,
                    borderBottom: "1.5px solid #f7f3ea",
                    cursor: "pointer",
                  }}
                  onClick={() => handleViewDetails(shoe)}
                  title="Xem chi tiết"
                >
                  {/* Badge NEW overlays image */}
                  <span
                    style={{
                      position: "absolute",
                      top: 18,
                      right: 24,
                      background: "#f7f3ea",
                      color: "#bfa046",
                      fontWeight: 700,
                      fontSize: 16,
                      borderRadius: 16,
                      padding: "4px 18px",
                      boxShadow: "0 2px 8px #e5d7b6",
                      letterSpacing: 1,
                      zIndex: 2,
                    }}
                  >
                    NEW
                  </span>
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    style={{
                      width: 210,
                      height: 180,
                      objectFit: "contain",
                      filter: "drop-shadow(0 8px 24px #bfa04633)",
                      zIndex: 1,
                      background: "#fff",
                    }}
                  />
                </div>
                {/* Card content */}
                <div
                  style={{
                    padding: 28,
                    paddingTop: 18,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#bfa046",
                      textShadow: "0 2px 8px #e5d7b6, 0 1.5px 0 #fff",
                      marginBottom: 8,
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {shoe.name}
                  </h2>
                  <div
                    style={{
                      color: "#bfa046",
                      fontWeight: 700,
                      fontSize: 20,
                      marginBottom: 18,
                      textShadow: "0 2px 8px #e5d7b6",
                    }}
                  >
                    {shoe.price.toLocaleString()}đ
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
