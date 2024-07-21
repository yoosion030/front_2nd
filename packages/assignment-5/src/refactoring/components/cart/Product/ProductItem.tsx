import type { Product } from "types";
import { useCartContext } from "provider/cart/useCartContext";
import { getMaxDiscount, getRemainingStock } from "hooks/utils/cartUtils";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { cartList, addToCart } = useCartContext();

  const remainingStock = getRemainingStock({ product, cartList });
  const hasDiscount = product.discounts.length > 0;

  return (
    <div
      key={product.id}
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">
          {product.price.toLocaleString()}원
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <span
          className={`font-medium ${
            remainingStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          재고: {remainingStock}개
        </span>
        {hasDiscount && (
          <span className="ml-2 font-medium text-blue-600">
            최대
            {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
          </span>
        )}
      </div>
      {hasDiscount && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {product.discounts.map((discount, index) => (
            <li key={index}>
              {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}%
              할인
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => addToCart(product)}
        className={`w-full px-3 py-1 rounded ${
          remainingStock > 0
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={remainingStock <= 0}
      >
        {remainingStock > 0 ? "장바구니에 추가" : "품절"}
      </button>
    </div>
  );
};

export default ProductItem;
