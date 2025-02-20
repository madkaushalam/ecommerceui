import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    await connectDB();
    const { name, email, password } = await req.json();
    if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'User already exists' });
    }
    else {
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });
            await user.save();
            return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
        } catch (error) {
            console.error('Error in signup:', error);
            return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
        }
    }
}