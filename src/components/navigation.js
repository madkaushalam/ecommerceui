'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();
    const handleCartClick = () => {
        router.push('/cart');
    }
    const handleCheckoutClick = () => {
        router.push('/checkout');
    }
    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <Link href="/">
                    <h1 className="text-xl font-bold">Ecommerce</h1>
                </Link>
                <div>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 mr-2" onClick={handleCartClick}>
                        My Cart
                    </button>
                    {/* <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700" onClick={handleCheckoutClick}>
                        Checkout
                    </button> */}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;