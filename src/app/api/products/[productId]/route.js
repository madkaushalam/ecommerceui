import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        await connectDB();
        const productId = (await params).productId;
        const productDetail = await Product.findOne({product_id: productId })

        if (!productDetail) {   
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ productDetail },{status:200},{message:"hello"})
    } catch (error) {
        console.error('Error fetching the Product', error);
        return NextResponse.json({ message: 'Error fetching the Product' }, { status: 500 });
    }
}