import { defaultItems } from "../pages/Main/ItemDummy";

const STORAGE_KEY = "kream_products_v1";

const normalizeProduct = (product) => ({
  ...product,
  price: formatPrice(product.price),
  review: String(product.review ?? "0"),
  rating: String(product.rating ?? "0"),
});

export const formatPrice = (value) => {
  const raw = String(value ?? "").replace(/[^0-9]/g, "");
  if (!raw) return "0원";
  return `${Number(raw).toLocaleString("ko-KR")}원`;
};

export const getProducts = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
    return defaultItems;
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("상품 데이터 형식 오류");
    return parsed;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
    return defaultItems;
  }
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find((product) => String(product.id) === String(id));
};

export const addProduct = (product) => {
  const products = getProducts();
  const nextId = products.length ? Math.max(...products.map((item) => Number(item.id))) + 1 : 1;
  const nextProduct = normalizeProduct({ ...product, id: nextId });
  localStorage.setItem(STORAGE_KEY, JSON.stringify([nextProduct, ...products]));
  return nextProduct;
};

export const updateProduct = (id, product) => {
  const products = getProducts();
  const updatedProduct = normalizeProduct({ ...product, id: Number(id) });
  const updatedProducts = products.map((item) => (String(item.id) === String(id) ? updatedProduct : item));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  return updatedProduct;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const updatedProducts = products.filter((item) => String(item.id) !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  return updatedProducts;
};
