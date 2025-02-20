import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cartItems: [
        {
            product_id: { type: String, required: true },
            product_name: { type: String, required: true },
            product_price: { type: Number, required: true },
            product_image: { type: String, required: true },
            product_description: { type: String, required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});



export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
