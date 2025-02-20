import Cart from "@/models/Cart";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import  {authOptions} from "@/app/api/auth/[...nextauth]/route"

export const GET = async (req) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const userCart = await Cart.findOne({ userId: session.user.id });

        if (!userCart) {
            return NextResponse.json({ cartItems: [] }, { status: 200 });
        }

        return NextResponse.json({ cartItems: userCart.cartItems }, { status: 200 });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json({ message: "Error fetching cart" }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { cartItems } = await req.json();

        if (!cartItems) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }
        console.log(cartItems)
        let userCart = await Cart.findOne({ userId: session.user.id });

        if (!userCart) {
            userCart = new Cart({ userId: session.user.id, cartItems });
        } else {
            userCart.cartItems = cartItems;
        }
        console.log(cartItems)
        await userCart.save();
        return NextResponse.json({ message: "Cart updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ message: "Error updating cart" }, { status: 500 });
    }
};
