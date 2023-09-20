import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center">
      <div className="modal-open w-full flex justify-center items-center">
        <div className="modal-box py-8">
          <div className="flex flex-col">
            <h3 className="font-bold text-center text-4xl">Selamat Datang di</h3>
            <h3 className="font-bold text-center text-xl mt-3 mb-10">Shopping Notes App</h3>
          </div>
          <div className="flex flex-col mb-10">
            <p>Aplikasi ini merupakan aplikasi untuk memanajemen catatan belanja sehari-hari.</p>
            <p>Untuk menggunakan aplikasi ini, anda harus login terlebih dahulu.</p>
            <p>Apabila anda belum memiliki akun, silahkan mendaftar terlebih dahulu.</p>
          </div>
          <div className="flex justify-center w-full gap-3">
            <Link href="/login" className="w-1/2">
              <button className="btn btn-info w-full text-lg">Masuk</button>
            </Link>
            <Link href="/register" className="w-1/2">
              <button className="btn btn-success w-full text-lg">Daftar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
