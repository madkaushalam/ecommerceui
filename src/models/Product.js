import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_image: { type: String, required: true },
    product_description: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);