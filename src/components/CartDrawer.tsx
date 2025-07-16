import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { shoes } from "@/mocks/shoes";

const initialCart = [
  { ...shoes[0], quantity: 2 },
  { ...shoes[1], quantity: 2 },
  { ...shoes[2], quantity: 1 },
  { ...shoes[3], quantity: 1 },
  { ...shoes[4], quantity: 1 },
];

type CartItem = (typeof initialCart)[number];

const CartDrawer: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-0 max-w-md w-full right-0 left-auto ml-auto h-screen flex flex-col">
        {/* Header */}
        <DrawerHeader className="sticky top-0 z-10 bg-white flex flex-row items-center justify-between px-6 py-4 border-b">
          <DrawerTitle className="text-xl font-bold">Giỏ hàng</DrawerTitle>
          <DrawerClose asChild>
            <button
              className="text-2xl text-gray-400 hover:text-black px-2"
              aria-label="Close"
            >
              ×
            </button>
          </DrawerClose>
        </DrawerHeader>
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
          {cart.length === 0 ? (
            <div className="text-lg text-gray-500 text-center py-6">
              Your cart is empty.
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded bg-gray-100 border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-base truncate">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-black">
                        {item.quantity}
                      </span>
                      <span className="mx-1">×</span>
                      <span className="font-semibold text-black">
                        {item.price.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors text-lg px-2"
                    title="Xóa"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Footer */}
        <DrawerFooter className="sticky bottom-0 z-10 bg-white px-6 pt-4 pb-8 border-t">
          <div className="flex justify-between items-center mb-5">
            <span className="text-base text-gray-500">Tổng tiền:</span>
            <span className="text-xl font-bold text-black">
              {total.toLocaleString()}đ
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="w-full bg-white text-black font-semibold rounded-none py-3 text-base border border-black hover:bg-gray-100 transition-colors disabled:opacity-60"
              disabled={cart.length === 0}
              onClick={() => (window.location.href = "/cart")}
            >
              Xem chi tiết
            </button>
            <button
              className="w-full bg-[color:var(--sneako-gold)] text-black font-semibold rounded-none py-3 text-base border border-black hover:bg-yellow-400 transition-colors disabled:opacity-60"
              disabled={cart.length === 0}
              onClick={() => (window.location.href = "/checkout")}
            >
              Thanh toán
            </button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
