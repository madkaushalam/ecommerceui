'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) throw new Error(await res.text());

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            if (result.error) throw new Error(result.error);
            router.push('/');
        } catch (error) {
            toast.error(error.message);
        }
    };  

    return (
        <div className='flex justify-center m-24'>
            <div className="w-full max-w-lg p-8 bg-white border border-gray-200 rounded-lg shadow-lg shadow-purple-400">
                <h5 className="text-2xl font-medium text-purple-600 mb-4">Create a new account</h5>
                <form onSubmit={handleSubmit} className="space-y-8 mt-10">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-purple-600">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-purple-600">Your email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-purple-600">Your password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5">Sign Up</button>
                    <div className="text-sm font-medium text-gray-500 text-center">
                        Already have an account? <Link href="/auth/login" className="text-purple-700 hover:underline">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
