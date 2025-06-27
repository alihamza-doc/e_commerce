import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      name: String,
      address: String,
      phone: String,
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" },
    paymentMethod: {
      type: String,
      enum: ['cod', 'stripe', 'paypal'],
      required: true,
      default: 'cod',
},
  status: { type: String, default: "Pending", enum: ["Pending", "Processing", "Shipped", "Delivered"] },


  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
