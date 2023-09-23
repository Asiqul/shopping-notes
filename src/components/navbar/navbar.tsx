import Image from 'next/image';
import axios from 'axios';
import { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ name }: { name: string | null }) {
    const router = useRouter();
    const handleLogout = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const logout = await axios.delete('/api/logout', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            });
            if (logout.status === 200) {
                localStorage.removeItem('userToken');
                localStorage.removeItem('name');
                router.push('/login');
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <div className="mb-3 z-50">
            <div className="container mx-auto navbar bg-base-100 rounded-lg shadow-md px-5 fixed z-50">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl">ShoppingNotes</a>
                </div>

                <div className="navbar-end">
                    <div className="flex items-center mr-6">
                        <h1 className="text-xl text-black font-bold">{`Hi, ${name}`}</h1>
                    </div>
                    <button className="btn btn-error" onClick={handleLogout}>
                        <Image src="/logout.svg" alt="logout" width={20} height={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
