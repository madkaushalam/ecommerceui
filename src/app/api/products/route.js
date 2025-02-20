import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export async function GET(req) {
    try {
        await connectDB();
        
        const ProductList = await Product.find({});
        return NextResponse.json({ products: ProductList }, { status: 200 })
    }
    catch(error) {
        console.error('Error fetching the Product', error);
        return NextResponse.json({ message: 'Error fetching the Product' }, { status: 500 });
    }
}