"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getCart,
  getCartSummary,
  updateQuantityCart,
  deleteCart,
  addCart,
} from "@/services/cart";
interface CartItem {
  id: number;
  product_name: string;
  product_thumbnail_image: string;
  variation: string;
  price: number;
  currency_symbol: string;
  tax: number;
  shipping_cost: number;
  quantity: number;
  lower_limit: number;
  upper_limit: number;
  in_stock: number;
}
interface CartPrice {
  sub_total: string;
  tax: string;
  shipping_cost: string;
  discount: string;
  grand_total: string;
  grand_total_value: number;
  coupon_code: string | null;
  coupon_applied: false;
}
interface CartContextType {
  isOpen: boolean;
  cartItems: CartItem[];
  cartPrice: CartPrice;
  openCart: () => void;
  closeCart: () => void;
  fetchCart: () => Promise<void>;
  addToCart: (
    productId: number,
    variant: string,
    quantity: number
  ) => Promise<void>;
  updateQuantity: (id: number, newQuantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartPrice, setCartPrice] = useState<CartPrice>({
    sub_total: "",
    tax: "",
    shipping_cost: "",
    discount: "",
    grand_total: "",
    grand_total_value: 0,
    coupon_code: null,
    coupon_applied: false,
  });

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.length > 0 ? res[0].cart_items : []);
      const summary = await getCartSummary();
      setCartPrice(summary);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const addToCart = async (
    productId: number,
    variant: string,
    quantity: number
  ) => {
    await addCart(productId, variant, quantity);
    await fetchCart();
    setIsOpen(true); // ✅ open cart after adding
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    await updateQuantityCart(id, newQuantity);
    await fetchCart();
  };

  const removeItem = async (id: number) => {
    await deleteCart(id);
    await fetchCart();
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        cartItems,
        cartPrice,
        openCart,
        closeCart,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
