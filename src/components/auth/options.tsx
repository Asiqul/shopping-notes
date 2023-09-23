import Link from 'next/link';

export default function Options({ type }: { type: string }) {
    if (type === 'login') {
        return (
            <>
                <div className="mb-10">
                    <h3 className="text-center">
                        Belum mempunyai akun?{' '}
                        <Link
                            href="/register"
                            className="text-blue-600 font-semibold hover:border-b-2 hover:border-blue-600 transition duration-400 ease-in-out"
                        >
                            Daftar
                        </Link>
                    </h3>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="mb-10">
                    <h3 className="text-center">
                        Sudah mempunya akun?{' '}
                        <Link
                            href="/login"
                            className="text-blue-600 font-semibold hover:border-b-2 hover:border-blue-600 transition duration-400 ease-in-out"
                        >
                            Masuk
                        </Link>
                    </h3>
                </div>
            </>
        );
    }
}
