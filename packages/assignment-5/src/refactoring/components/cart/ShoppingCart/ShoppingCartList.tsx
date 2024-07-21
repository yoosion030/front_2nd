import { getAppliedDiscount } from "hooks/utils/cartUtils";
import { useCartContext } from "provider/cart/useCartContext";

const ShoppingCartList = () => {
  const { removeFromCart, updateQuantity, cartList } = useCartContext();

  return (
    <div className="space-y-2">
      {cartList.map((cart) => {
        const appliedDiscount = getAppliedDiscount(cart);

        return (
          <div
            className="flex justify-between items-center bg-white p-3 rounded shadow"
            key={cart.product.id}
          >
            <div>
              <span className="font-semibold">{cart.product.name}</span>
              <br />
              <span className="text-sm text-gray-600">
                {cart.product.price}원 x {cart.quantity}
                {appliedDiscount > 0 && (
                  <span className="text-green-600 ml-1" data-testid="discount">
                    ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
                  </span>
                )}
              </span>
            </div>
            <div>
              <button
                data-testid="minus-button"
                onClick={() =>
                  updateQuantity(cart.product.id, cart.quantity - 1)
                }
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
              >
                -
              </button>
              <button
                data-testid="plus-button"
                onClick={() =>
                  updateQuantity(cart.product.id, cart.quantity + 1)
                }
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
              >
                +
              </button>
              <button
                data-testid="remove-button"
                onClick={() => removeFromCart(cart.product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingCartList;
