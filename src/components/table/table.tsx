import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Notes {
  id: number;
  item_name: string;
  quantity: string;
}

export default function Table({ props }: { props: Notes[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [itemId, setItemId] = useState(0);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    setItemId(id);
    setIsLoading(true);

    await axios.delete(`/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    router.reload();
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-success">
              <th className="font-bold text-xl text-black">#</th>
              <th className="font-bold text-black">Nama Barang</th>
              <th className="font-bold text-black">Jumlah</th>
              <th className="font-bold text-black text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {props.map((item, index) => (
              <tr key={item.id} className={`${index % 2 ? 'bg-green-100' : ''}`}>
                <td className="font-bold">{index + 1}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td className="flex items-center justify-center">
                  <button
                    className="btn btn-error btn-sm bg-opacity-70 border-opacity-70"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Image
                      className={isLoading && itemId === item.id ? 'hidden' : 'block'}
                      src="/trash.svg"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                    <span
                      className={`${
                        isLoading && itemId === item.id ? 'block' : 'hidden'
                      } loading loading-spinner loading-sm`}
                    ></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
