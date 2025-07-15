
export type Shoe = {
  id: number;
  name: string;
  price: number;
  description?: string;
  brand: string;
  sizes: string[];
  stock: number;
  images: string[];
  category: string;
  averageRating?: number;
  numOfReviews?: number;
  review?: string[];
};

export const shoes: Shoe[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 3200000,
    description: "Nike Air Max 270 là mẫu sneaker nổi bật với thiết kế hiện đại, đệm khí êm ái, phù hợp cho cả thể thao và thời trang.",
    brand: "Nike",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    stock: 20,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png"
    ],
    category: "Sneakers",
    averageRating: 4.5,
    numOfReviews: 12,
    review: [],
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    price: 3500000,
    description: "Adidas Ultraboost 21 với công nghệ Boost mang lại cảm giác êm ái, năng động cho người dùng.",
    brand: "Adidas",
    sizes: ["39", "40", "41", "42", "43"],
    stock: 15,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ab9c92c2-eddb-4265-975a-63c892ccf527/M+AIR+MAX+ALPHA+TRAINER+6.png"
    ],
    category: "Running",
    averageRating: 4.7,
    numOfReviews: 8,
    review: [],
  },
  {
    id: 3,
    name: "Converse Chuck Taylor",
    price: 1500000,
    description: "Converse Chuck Taylor - biểu tượng của phong cách cổ điển, phù hợp với mọi outfit.",
    brand: "Converse",
    sizes: ["38", "39", "40", "41", "42"],
    stock: 30,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/365a36f8-2439-426c-8d6d-870463e26e77/M+ZOOM+GP+CHALLENGE+1+CLY.png"
    ],
    category: "Casual",
    averageRating: 4.2,
    numOfReviews: 5,
    review: [],
  },
  {
    id: 4,
    name: "Nike Air Force 1 '07",
    price: 2800000,
    description: "Nike Air Force 1 '07 - thiết kế huyền thoại, chất liệu cao cấp, dễ phối đồ.",
    brand: "Nike",
    sizes: ["40", "41", "42", "43", "44"],
    stock: 10,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png"
    ],
    category: "Sneakers",
    averageRating: 4.6,
    numOfReviews: 10,
    review: [],
  },
  {
    id: 5,
    name: "Adidas Stan Smith",
    price: 2200000,
    description: "Adidas Stan Smith - mẫu giày tennis kinh điển, đơn giản nhưng tinh tế.",
    brand: "Adidas",
    sizes: ["38", "39", "40", "41", "42", "43"],
    stock: 18,
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers"
    ],
    category: "Tennis",
    averageRating: 4.3,
    numOfReviews: 7,
    review: [],
  },
  {
    id: 6,
    name: "Puma Suede Classic",
    price: 1800000,
    description: "Puma Suede Classic - phong cách retro, chất liệu da lộn mềm mại.",
    brand: "Puma",
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: 12,
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers"
    ],
    category: "Retro",
    averageRating: 4.1,
    numOfReviews: 4,
    review: [],
  },
  {
    id: 7,
    name: "New Balance 574",
    price: 2700000,
    description: "New Balance 574 - sự kết hợp giữa cổ điển và hiện đại, phù hợp cho mọi hoạt động.",
    brand: "New Balance",
    sizes: ["38", "39", "40", "41", "42", "43"],
    stock: 14,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png"
    ],
    category: "Lifestyle",
    averageRating: 4.4,
    numOfReviews: 6,
    review: [],
  },
  {
    id: 8,
    name: "Vans Old Skool",
    price: 1600000,
    description: "Vans Old Skool - biểu tượng của văn hóa đường phố, thiết kế trẻ trung.",
    brand: "Vans",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    stock: 22,
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers"
    ],
    category: "Skateboarding",
    averageRating: 4.0,
    numOfReviews: 3,
    review: [],
  },
  {
    id: 9,
    name: "Balenciaga Triple S",
    price: 18500000,
    description: "Balenciaga Triple S - chunky sneaker cao cấp, nổi bật và cá tính.",
    brand: "Balenciaga",
    sizes: ["41", "42", "43", "44"],
    stock: 5,
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers"
    ],
    category: "Luxury",
    averageRating: 4.8,
    numOfReviews: 2,
    review: [],
  },
  {
    id: 10,
    name: "Alexander McQueen Oversized",
    price: 14500000,
    description: "Alexander McQueen Oversized - thiết kế tối giản, đế giày dày nổi bật.",
    brand: "Alexander McQueen",
    sizes: ["40", "41", "42", "43", "44"],
    stock: 7,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png"
    ],
    category: "Luxury",
    averageRating: 4.9,
    numOfReviews: 1,
    review: [],
  },
];


// Tạo shoeLines theo category, mỗi category chỉ xuất hiện 1 lần
export const shoeLines = Array.from(
  shoes.reduce((map, shoe) => {
    if (!map.has(shoe.category)) {
      map.set(shoe.category, {
        category: shoe.category,
        image: shoe.images[0],
      });
    }
    return map;
  }, new Map()),
  ([, value]) => value
);

