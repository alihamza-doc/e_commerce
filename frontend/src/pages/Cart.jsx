import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart , increaseQuantity, decreaseQuantity } = useCart();


  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. <Link to="/">Go shopping</Link>
        </div>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product._id}>
                  <td>{item.product?.name || "Unknown"}</td>
                  <td>
                    <img
                      src={
                        item.product?.image || "https://via.placeholder.com/60"
                      }
                      alt={item.product?.name || "No Image"}
                      style={{ height: "60px" }}
                    />
                  </td>
                  <td>${item.product?.price || 0}</td>

                  <td>{item.quantity}</td>
                  <td>${item.product.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => decreaseQuantity(item.product._id)}
                    >
                      −
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() => increaseQuantity(item.product._id)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <div className="text-end">
              <h4>Total: ${total}</h4>
              <Link to="/checkout" className="btn btn-primary mt-2">
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
