'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const handleCartClick = () => {
        router.push('/cart');
    }
    const handleSignoutClick = () => {
        signOut();
    }
    const handleSignupClick = () => {
        router.push('/auth/signup');
    }
    const handleSigninClick = () => {
        router.push('/auth/login');
    }
    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-purple-900 text-white">
                <Link href="/">
                    <h1 className="text-xl font-bold first-letter:text-purple-100 border border-white p-3">MadMart</h1>
                </Link>
                <div>
                    {session ? (
                        <>
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 mr-2" onClick={handleSignoutClick}>
                                SignOut
                            </button>
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 mr-2" onClick={handleCartClick}>
                                My Cart
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 mr-2" onClick={handleSignupClick}>
                                SignUp
                            </button>
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 mr-2" onClick={handleSigninClick}>
                                SignIn
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;